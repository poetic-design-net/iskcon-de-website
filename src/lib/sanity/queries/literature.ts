import { client } from '../client';
import type { 
  Literature, 
  Chapter, 
  Verse, 
  SanskritTerm, 
  LiteratureFilters, 
  LiteratureQueryOptions,
  LiteratureStats 
} from '../../types';
import {
  LITERATURE_BASE_PROJECTION,
  LITERATURE_DETAIL_PROJECTION,
  LITERATURE_CHAPTER_PROJECTION,
  LITERATURE_VERSE_PROJECTION,
  LITERATURE_FEATURED_PROJECTION,
  SANSKRIT_TERM_PROJECTION
} from './projections';

// Alle Literature-Einträge abrufen mit optionaler Filterung
export async function getAllLiterature(
  filters: LiteratureFilters = {},
  options: LiteratureQueryOptions = {}
): Promise<Literature[]> {
  const {
    bookType,
    difficulty,
    author,
    availability,
    languages,
    tags,
    isFeatured
  } = filters;

  const {
    limit = 20,
    offset = 0,
    sortBy = 'title',
    sortOrder = 'asc'
  } = options;

  let filterConditions = '_type == "literature"';

  // Filter-Bedingungen aufbauen
  if (bookType) {
    filterConditions += ` && bookType == "${bookType}"`;
  }
  if (difficulty) {
    filterConditions += ` && difficulty == "${difficulty}"`;
  }
  if (author) {
    filterConditions += ` && author._ref == "${author}"`;
  }
  if (availability) {
    if (availability.includes('physical')) {
      filterConditions += ` && availability.physical == true`;
    }
    if (availability.includes('digital')) {
      filterConditions += ` && availability.digital == true`;
    }
    if (availability.includes('audio')) {
      filterConditions += ` && availability.audio == true`;
    }
  }
  if (languages && languages.length > 0) {
    const languageFilter = languages.map((lang: string) => `"${lang}" in languages`).join(' || ');
    filterConditions += ` && (${languageFilter})`;
  }
  if (tags && tags.length > 0) {
    const tagFilter = tags.map((tag: string) => `"${tag}" in tags`).join(' || ');
    filterConditions += ` && (${tagFilter})`;
  }
  if (isFeatured !== undefined) {
    filterConditions += ` && isFeatured == ${isFeatured}`;
  }

  const sortDirection = sortOrder === 'desc' ? 'desc' : 'asc';
  const orderBy = `order(${sortBy} ${sortDirection})`;

  const query = `*[${filterConditions}] | ${orderBy} [${offset}...${offset + limit}] ${LITERATURE_BASE_PROJECTION}`;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error('Fehler beim Abrufen der Literature-Einträge:', error);
    return [];
  }
}

// Featured Books für Homepage
export async function getFeaturedBooks(limit: number = 6): Promise<Literature[]> {
  const query = `*[_type == "literature" && isFeatured == true] | order(publishedAt desc) [0...${limit}] ${LITERATURE_FEATURED_PROJECTION}`;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error('Fehler beim Abrufen der Featured Books:', error);
    return [];
  }
}

// Einzelnes Buch nach Slug
export async function getBookBySlug(slug: string): Promise<Literature | null> {
  const query = `*[_type == "literature" && slug.current == $slug][0] ${LITERATURE_DETAIL_PROJECTION}`;

  try {
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error('Fehler beim Abrufen des Buchs:', error);
    return null;
  }
}

// Bücher nach Typ
export async function getBooksByType(
  bookType: string,
  limit: number = 10
): Promise<Literature[]> {
  const query = `*[_type == "literature" && bookType == $bookType] | order(title asc) [0...${limit}] ${LITERATURE_BASE_PROJECTION}`;

  try {
    return await client.fetch(query, { bookType });
  } catch (error) {
    console.error('Fehler beim Abrufen der Bücher nach Typ:', error);
    return [];
  }
}

// Bücher nach Schwierigkeitsgrad
export async function getBooksByDifficulty(
  difficulty: string,
  limit: number = 10
): Promise<Literature[]> {
  const query = `*[_type == "literature" && difficulty == $difficulty] | order(title asc) [0...${limit}] ${LITERATURE_BASE_PROJECTION}`;

  try {
    return await client.fetch(query, { difficulty });
  } catch (error) {
    console.error('Fehler beim Abrufen der Bücher nach Schwierigkeit:', error);
    return [];
  }
}

// Bücher suchen
export async function searchBooks(
  searchTerm: string,
  filters: LiteratureFilters = {},
  limit: number = 20
): Promise<Literature[]> {
  const {
    bookType,
    difficulty,
    author,
    languages
  } = filters;

  let filterConditions = '_type == "literature"';
  
  // Basis-Suchbedingungen
  const searchConditions = [
    `title match "${searchTerm}*"`,
    `description match "${searchTerm}*"`,
    `tags[] match "${searchTerm}*"`,
    `author->name match "${searchTerm}*"`,
    `sanskritTerms[]->sanskrit match "${searchTerm}*"`,
    `sanskritTerms[]->transliteration match "${searchTerm}*"`
  ].join(' || ');

  filterConditions += ` && (${searchConditions})`;

  // Zusätzliche Filter
  if (bookType) {
    filterConditions += ` && bookType == "${bookType}"`;
  }
  if (difficulty) {
    filterConditions += ` && difficulty == "${difficulty}"`;
  }
  if (author) {
    filterConditions += ` && author._ref == "${author}"`;
  }
  if (languages && languages.length > 0) {
    const languageFilter = languages.map((lang: string) => `"${lang}" in languages`).join(' || ');
    filterConditions += ` && (${languageFilter})`;
  }

  const query = `*[${filterConditions}] | order(_score desc, title asc) [0...${limit}] ${LITERATURE_BASE_PROJECTION}`;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error('Fehler bei der Buchsuche:', error);
    return [];
  }
}

// Ähnliche Bücher finden
export async function getRelatedBooks(
  bookId: string,
  limit: number = 4
): Promise<Literature[]> {
  const query = `
    *[_type == "literature" && _id == $bookId][0] {
      bookType,
      difficulty,
      "authorId": author._ref,
      tags[]
    }
  `;

  try {
    const book = await client.fetch(query, { bookId });
    if (!book) return [];

    // Ähnlichkeits-Logik: gleicher Typ > gleiche Schwierigkeit > gleicher Autor > gemeinsame Tags
    const relatedQuery = `
      *[_type == "literature" && _id != $bookId] | order(
        select(
          bookType == $bookType => 3,
          difficulty == $difficulty => 2,
          author._ref == $authorId => 2,
          count(tags[@ in $tags]) > 0 => 1,
          0
        ) desc,
        title asc
      ) [0...${limit}] ${LITERATURE_BASE_PROJECTION}
    `;

    return await client.fetch(relatedQuery, {
      bookId,
      bookType: book.bookType,
      difficulty: book.difficulty,
      authorId: book.authorId,
      tags: book.tags || []
    });
  } catch (error) {
    console.error('Fehler beim Abrufen ähnlicher Bücher:', error);
    return [];
  }
}

// Kapitel nach Slug
export async function getChapterBySlug(
  bookSlug: string,
  chapterSlug: string
): Promise<Chapter | null> {
  const query = `
    *[_type == "chapter" && slug.current == $chapterSlug && book->slug.current == $bookSlug][0] ${LITERATURE_CHAPTER_PROJECTION}
  `;

  try {
    return await client.fetch(query, { bookSlug, chapterSlug });
  } catch (error) {
    console.error('Fehler beim Abrufen des Kapitels:', error);
    return null;
  }
}

// Vers nach Slug
export async function getVerseBySlug(
  bookSlug: string,
  chapterSlug: string,
  verseSlug: string
): Promise<Verse | null> {
  const query = `
    *[_type == "verse" && slug.current == $verseSlug && chapter->slug.current == $chapterSlug && chapter->book->slug.current == $bookSlug][0] ${LITERATURE_VERSE_PROJECTION}
  `;

  try {
    return await client.fetch(query, { bookSlug, chapterSlug, verseSlug });
  } catch (error) {
    console.error('Fehler beim Abrufen des Verses:', error);
    return null;
  }
}

// Alle Kapitel eines Buchs
export async function getBookChapters(bookSlug: string): Promise<Chapter[]> {
  const query = `
    *[_type == "chapter" && book->slug.current == $bookSlug] | order(chapterNumber asc) {
      _id,
      title,
      'slug': slug.current,
      chapterNumber,
      description,
      'verseCount': count(verses),
      'estimatedReadingTime': estimatedReadingTime
    }
  `;

  try {
    return await client.fetch(query, { bookSlug });
  } catch (error) {
    console.error('Fehler beim Abrufen der Buchkapitel:', error);
    return [];
  }
}

// Alle Verse eines Kapitels
export async function getChapterVerses(
  bookSlug: string,
  chapterSlug: string
): Promise<Verse[]> {
  const query = `
    *[_type == "verse" && chapter->slug.current == $chapterSlug && chapter->book->slug.current == $bookSlug] | order(verseNumber asc) {
      _id,
      verseNumber,
      'slug': slug.current,
      'sanskrit': sanskrit,
      'transliteration': transliteration,
      'translation': translation
    }
  `;

  try {
    return await client.fetch(query, { bookSlug, chapterSlug });
  } catch (error) {
    console.error('Fehler beim Abrufen der Kapitelverse:', error);
    return [];
  }
}

// Literature-Statistiken
export async function getLiteratureStats(): Promise<LiteratureStats> {
  const query = `{
    "totalBooks": count(*[_type == "literature"]),
    "totalChapters": count(*[_type == "chapter"]),
    "totalVerses": count(*[_type == "verse"]),
    "booksByType": *[_type == "literature"] | order(bookType asc) {
      "type": bookType,
      "count": count(*[_type == "literature" && bookType == ^.bookType])
    },
    "booksByDifficulty": *[_type == "literature"] | order(difficulty asc) {
      "difficulty": difficulty,
      "count": count(*[_type == "literature" && difficulty == ^.difficulty])
    },
    "featuredBooksCount": count(*[_type == "literature" && isFeatured == true]),
    "availableLanguages": array::unique(*[_type == "literature"].languages[])
  }`;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error('Fehler beim Abrufen der Literature-Statistiken:', error);
    return {
      totalBooks: 0,
      totalChapters: 0,
      totalVerses: 0,
      booksByType: [],
      booksByDifficulty: [],
      featuredBooksCount: 0,
      availableLanguages: []
    };
  }
}

// Zufälliger Vers des Tages
export async function getRandomVerseOfTheDay(): Promise<Verse | null> {
  const today = new Date().toISOString().split('T')[0];
  
  // Verwende das Datum als Seed für konsistente "Zufälligkeit" pro Tag
  const query = `
    *[_type == "verse"] | order(_id asc) [
      round(count(*[_type == "verse"]) * 0.${today.replace(/-/g, '')} % count(*[_type == "verse"]))
    ] {
      _id,
      verseNumber,
      'slug': slug.current,
      'sanskrit': sanskrit,
      'transliteration': transliteration,
      'translation': translation,
      'purport': purport,
      'chapter': chapter-> {
        title,
        'slug': slug.current,
        chapterNumber,
        'book': book-> {
          title,
          'slug': slug.current,
          bookType
        }
      }
    }[0]
  `;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error('Fehler beim Abrufen des Verses des Tages:', error);
    return null;
  }
}

// Sanskrit-Begriffe abrufen
export async function getSanskritTerms(limit: number = 50): Promise<SanskritTerm[]> {
  const query = `*[_type == "sanskritTerm"] | order(sanskrit asc) [0...${limit}] ${SANSKRIT_TERM_PROJECTION}`;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error('Fehler beim Abrufen der Sanskrit-Begriffe:', error);
    return [];
  }
}

// Sanskrit-Begriff nach Slug
export async function getSanskritTermBySlug(slug: string): Promise<SanskritTerm | null> {
  const query = `*[_type == "sanskritTerm" && slug.current == $slug][0] ${SANSKRIT_TERM_PROJECTION}`;

  try {
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error('Fehler beim Abrufen des Sanskrit-Begriffs:', error);
    return null;
  }
}

// Sanskrit-Begriffe suchen
export async function searchSanskritTerms(
  searchTerm: string,
  limit: number = 20
): Promise<SanskritTerm[]> {
  const query = `
    *[_type == "sanskritTerm" && (
      sanskrit match "${searchTerm}*" ||
      transliteration match "${searchTerm}*" ||
      translation match "${searchTerm}*" ||
      definition match "${searchTerm}*"
    )] | order(_score desc, sanskrit asc) [0...${limit}] ${SANSKRIT_TERM_PROJECTION}
  `;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error('Fehler bei der Sanskrit-Begriff-Suche:', error);
    return [];
  }
}