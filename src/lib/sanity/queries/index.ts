// Zentrale Export-Datei für alle Sanity-Queries
export * from './pages';

// Post-Queries aus spezialisierter posts.ts
export {
  getAllPosts,
  getPostBySlug,
  getLatestPosts,
  getFeaturedPost,
  getRegularPosts,
  searchPosts,
  getCategories,
  getAllTags,
  // Blog-Detail-Enhancement Funktionen
  getRelatedPosts,
  getPreviousNextPosts,
  getLatestPostsForSidebar,
  getPostBySlugWithAuthorDetails,
  getAuthorById,
  getAuthorBySlug
} from './posts';

// Literature-Queries aus spezialisierter literature.ts
export {
  getAllLiterature,
  getFeaturedBooks,
  getBookBySlug,
  getBooksByType,
  getBooksByDifficulty,
  searchBooks,
  getRelatedBooks,
  getChapterBySlug,
  getVerseBySlug,
  getBookChapters,
  getChapterVerses,
  getLiteratureStats,
  getRandomVerseOfTheDay,
  getSanskritTerms,
  getSanskritTermBySlug,
  searchSanskritTerms
} from './literature';

// Re-export der ursprünglichen Queries für Backward Compatibility
import { client } from '../client';

// Basis-Projektionen
export const IMAGE_PROJECTION = `{
  'asset': {
    'url': asset->url,
    'altText': asset->altText
  },
  'hotspot': hotspot
}`;

export const SEO_PROJECTION = `{
  title,
  description,
  'image': image ${IMAGE_PROJECTION}
}`;

export async function getAllEvents() {
  const query = `*[_type == "event"] | order(startDate asc) {
    _id,
    title,
    slug,
    startDate,
    endDate,
    location,
    description,
    'image': image ${IMAGE_PROJECTION},
    'categories': categories[]->{ title, slug }
  }`;
  
  return client.fetch(query);
}

export async function getEventBySlug(slug: string) {
  const query = `*[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    startDate,
    endDate,
    location,
    description,
    body,
    'image': image ${IMAGE_PROJECTION},
    'categories': categories[]->{ title, slug },
    seo ${SEO_PROJECTION}
  }`;
  
  return client.fetch(query, { slug });
}

export async function getAllTemples() {
  const query = `*[_type == "temple"] | order(name asc) {
    _id,
    name,
    slug,
    address,
    coordinates,
    description,
    'image': image ${IMAGE_PROJECTION},
    contactInfo
  }`;
  
  return client.fetch(query);
}

export async function getTempleBySlug(slug: string) {
  const query = `*[_type == "temple" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    address,
    coordinates,
    description,
    body,
    'image': image ${IMAGE_PROJECTION},
    contactInfo,
    seo ${SEO_PROJECTION}
  }`;
  
  return client.fetch(query, { slug });
}