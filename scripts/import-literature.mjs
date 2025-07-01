#!/usr/bin/env node

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module equivalent für __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lade Environment Variablen
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Sanity Client konfigurieren
const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'cbaalziw',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.PUBLIC_SANITY_API_VERSION || '2024-04-06',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

/**
 * Sample Literature-Daten für ISKCON Bücher
 * Angepasst an das tatsächliche Sanity-Schema
 */
const sampleLiterature = [
  {
    title: 'Bhagavad-gītā wie sie ist',
    slug: { _type: 'slug', current: 'bhagavad-gita-wie-sie-ist' },
    author: 'A.C. Bhaktivedanta Swami Prabhupāda',
    authorBio: 'Gründer-Ācārya der Internationalen Gesellschaft für Krishna-Bewusstsein (ISKCON)',
    translator: 'Vedavyāsa dāsa',
    isbn: '978-91-7149-651-5',
    bookType: 'bhagavad_gita',
    edition: 'Vollständige, revidierte Ausgabe',
    description: 'Die Bhagavad-gītā gilt als das Kronjuwel der vedischen Weisheit Indiens. Sie bildet den Kern der gesamten vedischen Weisheit und enthält eine zeitlose Botschaft von universaler Gültigkeit. Ihre 700 Sanskrit-Verse gewähren einen umfassenden Einblick in die Wissenschaft von Yoga, Karma, Reinkarnation, Meditation, Selbstverwirklichung und Gotteserkenntnis.',
    shortDescription: 'Die Bhagavad-gītā ist der bedeutendste Klassiker der indischen Literatur und enthält eine zeitlose Botschaft von universaler Gültigkeit.',
    difficulty: 'intermediate',
    recommendedFor: ['Philosophie-Interessierte', 'Yoga-Praktizierende', 'Spirituell Suchende', 'Studenten der Indologie'],
    relatedBooks: ['srimad-bhagavatam-canto-1', 'krishna-quelle-aller-freude'],
    availability: {
      inStock: true,
      price: 25.00,
      discountPrice: 20.00,
      currency: 'EUR'
    },
    isFeatured: true
  },
  {
    title: 'Śrīmad-Bhāgavatam - Erster Canto: Schöpfung',
    slug: { _type: 'slug', current: 'srimad-bhagavatam-canto-1' },
    author: 'A.C. Bhaktivedanta Swami Prabhupāda',
    authorBio: 'Gründer-Ācārya der Internationalen Gesellschaft für Krishna-Bewusstsein (ISKCON)',
    translator: 'ISKCON Deutschland',
    isbn: '978-91-7149-069-8',
    bookType: 'srimad_bhagavatam',
    edition: '1. Auflage',
    description: 'Das Śrīmad-Bhāgavatam ist ein 18.000 Verse umfassender episch-philosophischer Klassiker der vedischen Literatur. Es enthüllt in Form von faszinierenden Erzählungen, Dialogen und Gleichnissen alle Aspekte der vedischen Philosophie, Religion, Kunst und Geschichte. Dieser erste Canto behandelt die Schöpfung.',
    shortDescription: 'Der erste Band des 18.000 Verse umfassenden episch-philosophischen Klassikers der vedischen Literatur.',
    difficulty: 'advanced',
    recommendedFor: ['Fortgeschrittene Studierende', 'Bhagavad-gītā Leser', 'Philosophie-Experten'],
    relatedBooks: ['bhagavad-gita-wie-sie-ist'],
    availability: {
      inStock: true,
      price: 35.00,
      currency: 'EUR'
    },
    isFeatured: true
  },
  {
    title: 'Śrī Caitanya-caritāmṛta - Ādi-līlā Band 1',
    slug: { _type: 'slug', current: 'caitanya-caritamrta-adi-lila-1' },
    author: 'A.C. Bhaktivedanta Swami Prabhupāda',
    authorBio: 'Gründer-Ācārya der Internationalen Gesellschaft für Krishna-Bewusstsein (ISKCON)',
    translator: 'Vedavyāsa dāsa',
    isbn: '0-89213-015-6',
    bookType: 'caitanya_caritamrta',
    edition: '1. Auflage',
    description: 'Das Śrī Caitanya-caritāmṛta gilt als das "goldene Buch aus Bengalen" und beschreibt das Leben und die Lehren von Śrī Caitanya Mahāprabhu, der vor 500 Jahren in Indien erschien. Dieses Werk ist von unschätzbarem Wert für das Verständnis der Gaudiya-Vaishnava-Philosophie.',
    shortDescription: 'Die autorisierte Biographie von Śrī Caitanya Mahāprabhu, dem goldenen Avatāra.',
    difficulty: 'advanced',
    recommendedFor: ['Fortgeschrittene Devotees', 'Philosophie-Studierende', 'Bengali-Kultur-Interessierte'],
    relatedBooks: ['lehren-sri-caitanyas'],
    availability: {
      inStock: true,
      price: 30.00,
      currency: 'EUR'
    },
    isFeatured: false
  },
  {
    title: 'Krishna - Die Quelle aller Freude',
    slug: { _type: 'slug', current: 'krishna-quelle-aller-freude' },
    author: 'A.C. Bhaktivedanta Swami Prabhupāda',
    authorBio: 'Gründer-Ācārya der Internationalen Gesellschaft für Krishna-Bewusstsein (ISKCON)',
    isbn: '978-91-7149-954-7',
    bookType: 'krishna_book',
    edition: 'Gesamtausgabe',
    description: 'Dieses Werk beschreibt in Form von neunzig in sich abgeschlossenen Geschichten die unvergleichlichen Taten und Eigenschaften Krishnas, der vor 5.000 Jahren auf der Erde weilte. Das Krishna-Buch ist eines jener seltenen Bücher, in denen sich fesselnde Erzählkunst und malerische Poesie zu höchster Philosophie verbinden.',
    shortDescription: 'Eine Zusammenfassung des Zehnten Cantos des Śrīmad-Bhāgavatam in Form von 88 faszinierenden Geschichten.',
    difficulty: 'beginner',
    recommendedFor: ['Einsteiger', 'Familien', 'Kinder', 'Geschichten-Liebhaber'],
    relatedBooks: ['srimad-bhagavatam-canto-1', 'bhagavad-gita-wie-sie-ist'],
    availability: {
      inStock: true,
      price: 28.00,
      discountPrice: 24.00,
      currency: 'EUR'
    },
    isFeatured: true
  },
  {
    title: 'Der Nektar der Hingabe',
    slug: { _type: 'slug', current: 'nektar-der-hingabe' },
    author: 'A.C. Bhaktivedanta Swami Prabhupāda',
    authorBio: 'Gründer-Ācārya der Internationalen Gesellschaft für Krishna-Bewusstsein (ISKCON)',
    translator: 'Vedavyāsa dāsa (Christian Jansen)',
    isbn: '978-91-7149-464-1',
    bookType: 'nectar_devotion',
    edition: '2. überarbeitete Auflage',
    description: 'Der Nektar der Hingabe ist eine zusammenfassende Studie des Bhakti-rasāmṛta-sindhu, den der große Philosoph und Gottgeweihte Śrīla Rūpa Gosvāmī vor über 400 Jahren verfasste. Es gilt als "das Manifest des Krishna-Bewusstseins" und erklärt ausführlich den philosophischen Hintergrund des bhakti-yoga.',
    shortDescription: 'Die umfassende Wissenschaft des Bhakti-Yoga basierend auf Rūpa Gosvāmīs Bhakti-rasāmṛta-sindhu.',
    difficulty: 'intermediate',
    recommendedFor: ['Bhakti-Yoga Praktizierende', 'Philosophie-Studierende', 'Devotees'],
    relatedBooks: ['nektar-der-unterweisung', 'bhagavad-gita-wie-sie-ist'],
    availability: {
      inStock: true,
      price: 32.00,
      currency: 'EUR'
    },
    isFeatured: true
  },
  {
    title: 'Śrī Īśopaniṣad',
    slug: { _type: 'slug', current: 'sri-isopanisad' },
    author: 'A.C. Bhaktivedanta Swami Prabhupāda',
    authorBio: 'Gründer-Ācārya der Internationalen Gesellschaft für Krishna-Bewusstsein (ISKCON)',
    translator: 'Maṇḍalībhadra dāsa und Haripriyā devī dāsī',
    isbn: '978-91-7149-439-9',
    bookType: 'sri_isopanisad',
    edition: '1. Auflage',
    description: 'Die Śrī Īśopaniṣad ist die berühmteste und bedeutendste der 108 Upaniṣaden. Mantra bedeutet "das, was den Geist befreit", und die achtzehn mantras der Śrī Īśopaniṣad haben den Menschen seit Tausenden von Jahren als Pfade zum Frieden gedient.',
    shortDescription: 'Achtzehn zeitlose Weisheiten für inneren Frieden - die berühmteste der 108 Upaniṣaden.',
    difficulty: 'beginner',
    recommendedFor: ['Einsteiger', 'Meditation-Praktizierende', 'Mantra-Interessierte'],
    relatedBooks: ['nektar-der-unterweisung', 'bhagavad-gita-wie-sie-ist'],
    availability: {
      inStock: true,
      price: 12.00,
      currency: 'EUR'
    },
    isFeatured: false
  },
  {
    title: 'Der Nektar der Unterweisung',
    slug: { _type: 'slug', current: 'nektar-der-unterweisung' },
    author: 'A.C. Bhaktivedanta Swami Prabhupāda',
    authorBio: 'Gründer-Ācārya der Internationalen Gesellschaft für Krishna-Bewusstsein (ISKCON)',
    translator: 'Vedavyāsa dāsa (Christian Jansen)',
    isbn: '978-91-7149-755-2',
    bookType: 'nectar_instruction',
    edition: '1. Auflage',
    description: 'Der Nektar der Unterweisung ist eine Übersetzung des Sanskritwerkes Sri Upadeśāmṛta, das der große Philosoph und Gottgeweihte Śrīla Rūpa Gosvāmī vor über 400 Jahren verfasste. Es vermittelt in elf Versen praktische Hinweise für den Pfad des Bhakti-yoga.',
    shortDescription: 'Eine Übersetzung des Sri Upadeśāmṛta mit praktischen Hinweisen für den Pfad des Bhakti-yoga.',
    difficulty: 'intermediate',
    recommendedFor: ['Ernsthafte Praktizierende', 'Bhakti-Yogis', 'Spirituelle Sucher'],
    relatedBooks: ['nektar-der-hingabe', 'sri-isopanisad'],
    availability: {
      inStock: true,
      price: 15.00,
      currency: 'EUR'
    },
    isFeatured: false
  },
  {
    title: 'Leben kommt von Leben',
    slug: { _type: 'slug', current: 'leben-kommt-von-leben' },
    author: 'A.C. Bhaktivedanta Swami Prabhupāda',
    authorBio: 'Gründer-Ācārya der Internationalen Gesellschaft für Krishna-Bewusstsein (ISKCON)',
    isbn: '978-91-7149-253-1',
    bookType: 'philosophy',
    edition: '1995er Edition',
    description: 'In diesem Buch werden in Form von "Morgenspaziergängen" tiefgründige Diskussionen über Leben, Bewusstsein und die Grenzen der materialistischen Wissenschaft geführt. Themen wie der Ursprung des Lebens, die Mängel des Darwinismus und Seelenwanderung werden aus vedischer Sicht beleuchtet.',
    shortDescription: 'Eine Herausforderung an die moderne Wissenschaft - Morgenspaziergänge mit Śrīla Prabhupāda.',
    difficulty: 'intermediate',
    recommendedFor: ['Wissenschaftlich Interessierte', 'Philosophen', 'Kritische Denker'],
    relatedBooks: ['jenseits-von-raum-und-zeit', 'vollkommene-fragen-vollkommene-antworten'],
    availability: {
      inStock: true,
      price: 18.00,
      currency: 'EUR'
    },
    isFeatured: false
  },
  {
    title: 'Jenseits von Raum und Zeit',
    slug: { _type: 'slug', current: 'jenseits-von-raum-und-zeit' },
    author: 'A.C. Bhaktivedanta Swami Prabhupāda',
    authorBio: 'Gründer-Ācārya der Internationalen Gesellschaft für Krishna-Bewusstsein (ISKCON)',
    isbn: '0-89213-086-3',
    bookType: 'philosophy',
    edition: '1. deutsche Ausgabe',
    description: 'Dieses kompakte Werk erklärt die vedische Kosmologie und beschreibt höhere Planetensysteme sowie die Möglichkeit, durch spirituelle Praxis diese Welten zu erreichen. Es bietet eine Alternative zur materialistischen Raumfahrt.',
    shortDescription: 'Antimaterielle Welten und die Vielfalt der Planetensysteme aus vedischer Sicht.',
    difficulty: 'beginner',
    recommendedFor: ['Kosmologie-Interessierte', 'Spirituelle Sucher', 'Science-Fiction-Fans'],
    relatedBooks: ['leben-kommt-von-leben', 'srimad-bhagavatam-canto-1'],
    availability: {
      inStock: true,
      price: 8.00,
      currency: 'EUR'
    },
    isFeatured: false
  },
  {
    title: 'Die Lehren Śrī Caitanyas',
    slug: { _type: 'slug', current: 'lehren-sri-caitanyas' },
    author: 'A.C. Bhaktivedanta Swami Prabhupāda',
    authorBio: 'Gründer-Ācārya der Internationalen Gesellschaft für Krishna-Bewusstsein (ISKCON)',
    isbn: '978-91-7149-291-3',
    bookType: 'philosophy',
    edition: '1. Auflage',
    description: 'Dieses Buch präsentiert die essentiellen Lehren von Śrī Caitanya Mahāprabhu, der vor 500 Jahren in Bengalen erschien und die saṅkīrtana-Bewegung begründete. Es erklärt die Philosophie des acintya-bhedābheda-tattva.',
    shortDescription: 'Eine Zusammenfassung der revolutionären spirituellen Lehren Śrī Caitanya Mahāprabhus.',
    difficulty: 'intermediate',
    recommendedFor: ['Caitanya-Interessierte', 'Philosophie-Studierende', 'Fortgeschrittene Devotees'],
    relatedBooks: ['caitanya-caritamrta-adi-lila-1', 'bhagavad-gita-wie-sie-ist'],
    availability: {
      inStock: true,
      price: 25.00,
      currency: 'EUR'
    },
    isFeatured: false
  },
  {
    title: 'Die Schönheit des Selbst',
    slug: { _type: 'slug', current: 'schoenheit-des-selbst' },
    author: 'A.C. Bhaktivedanta Swami Prabhupāda',
    authorBio: 'Gründer-Ācārya der Internationalen Gesellschaft für Krishna-Bewusstsein (ISKCON)',
    isbn: '978-91-7149-294-4',
    bookType: 'philosophy',
    edition: '1. Auflage',
    description: 'Diese Zusammenstellung enthält aufschlussreiche Gespräche, Interviews und Essays von Śrīla Prabhupāda über verschiedene Aspekte der Selbstverwirklichung. Themen wie Meditation, Karma und Reinkarnation werden behandelt.',
    shortDescription: 'Eine Sammlung von Interviews, Vorträgen und Essays über Selbstverwirklichung.',
    difficulty: 'beginner',
    recommendedFor: ['Einsteiger', 'Allgemein Interessierte', 'Suchende'],
    relatedBooks: ['vollkommene-fragen-vollkommene-antworten', 'leben-kommt-von-leben'],
    availability: {
      inStock: true,
      price: 22.00,
      currency: 'EUR'
    },
    isFeatured: false
  },
  {
    title: 'Vollkommene Fragen - Vollkommene Antworten',
    slug: { _type: 'slug', current: 'vollkommene-fragen-vollkommene-antworten' },
    author: 'A.C. Bhaktivedanta Swami Prabhupāda',
    authorBio: 'Gründer-Ācārya der Internationalen Gesellschaft für Krishna-Bewusstsein (ISKCON)',
    isbn: '0-89213-065-2',
    bookType: 'instructions',
    edition: '1. Auflage',
    description: 'Dieses Buch dokumentiert die bemerkenswerten Gespräche zwischen Śrīla Prabhupāda und Bob Cohen, einem jungen amerikanischen Friedenskorps-Arbeiter in Indien. Die direkten Fragen und tiefgründigen Antworten bieten praktische Einblicke.',
    shortDescription: 'Gespräche zwischen Śrīla Prabhupāda und Bob Cohen, einem amerikanischen Friedenskorps-Arbeiter.',
    difficulty: 'beginner',
    recommendedFor: ['Einsteiger', 'Junge Erwachsene', 'Westliche Suchende'],
    relatedBooks: ['schoenheit-des-selbst', 'leben-kommt-von-leben'],
    availability: {
      inStock: true,
      price: 10.00,
      currency: 'EUR'
    },
    isFeatured: false
  },
  {
    title: 'Christus, Krischto, Krishna',
    slug: { _type: 'slug', current: 'christus-krischto-krishna' },
    author: 'A.C. Bhaktivedanta Swami Prabhupāda',
    authorBio: 'Gründer-Ācārya der Internationalen Gesellschaft für Krishna-Bewusstsein (ISKCON)',
    bookType: 'philosophy',
    description: 'In diesem kleinen Buch werden die Parallelen zwischen den Lehren Jesu Christi und der vedischen Tradition aufgezeigt. Śrīla Prabhupāda erklärt, wie beide Traditionen zum gleichen Ziel führen - der Liebe zu Gott.',
    shortDescription: 'Ein Dialog über die Gemeinsamkeiten zwischen Christentum und Krishna-Bewusstsein.',
    difficulty: 'beginner',
    recommendedFor: ['Christen', 'Interreligiös Interessierte', 'Dialog-Suchende'],
    relatedBooks: ['bhagavad-gita-wie-sie-ist', 'lehren-sri-caitanyas'],
    availability: {
      inStock: true,
      price: 8.00,
      currency: 'EUR'
    },
    isFeatured: false
  },
  {
    title: 'Die Quelle absoluten Wissens',
    slug: { _type: 'slug', current: 'quelle-absoluten-wissens' },
    author: 'A.C. Bhaktivedanta Swami Prabhupāda',
    authorBio: 'Gründer-Ācārya der Internationalen Gesellschaft für Krishna-Bewusstsein (ISKCON)',
    bookType: 'philosophy',
    description: 'Dieses Buch erklärt den stufenweisen Prozess der spirituellen Erhebung von der materiellen zur spirituellen Plattform. Es beschreibt praktische Methoden zur Reinigung des Bewusstseins.',
    shortDescription: 'Die schrittweise Erhebung zum Krishna-Bewusstsein.',
    difficulty: 'beginner',
    recommendedFor: ['Einsteiger', 'Praktisch Orientierte', 'Yoga-Interessierte'],
    relatedBooks: ['perfektion-des-yoga', 'bhagavad-gita-wie-sie-ist'],
    availability: {
      inStock: true,
      price: 12.00,
      currency: 'EUR'
    },
    isFeatured: false
  },
  {
    title: 'Die Lehren Königin Kuntīs',
    slug: { _type: 'slug', current: 'lehren-koenigin-kuntis' },
    author: 'A.C. Bhaktivedanta Swami Prabhupāda',
    authorBio: 'Gründer-Ācārya der Internationalen Gesellschaft für Krishna-Bewusstsein (ISKCON)',
    isbn: '978-91-7149-297-5',
    bookType: 'commentary',
    description: 'Basierend auf den Gebeten von Königin Kuntī aus dem ersten Canto des Śrīmad-Bhāgavatam, offenbart dieses Buch tiefe philosophische Wahrheiten über Hingabe, Demut und die Beziehung zwischen der Seele und Gott.',
    shortDescription: 'Die Gebete und philosophischen Einsichten von Königin Kuntī aus dem Śrīmad-Bhāgavatam.',
    difficulty: 'intermediate',
    recommendedFor: ['Frauen', 'Devotees', 'Philosophie-Interessierte'],
    relatedBooks: ['srimad-bhagavatam-canto-1', 'krishna-quelle-aller-freude'],
    availability: {
      inStock: true,
      price: 18.00,
      currency: 'EUR'
    },
    isFeatured: false
  },
  {
    title: 'Varṇāśrama-dharma',
    slug: { _type: 'slug', current: 'varnasrama-dharma' },
    author: 'A.C. Bhaktivedanta Swami Prabhupāda',
    authorBio: 'Gründer-Ācārya der Internationalen Gesellschaft für Krishna-Bewusstsein (ISKCON)',
    bookType: 'instructions',
    description: 'Eine Erklärung des vedischen Gesellschaftssystems (varṇāśrama-dharma) und seiner Relevanz für die moderne Zeit. Das Buch zeigt, wie eine spirituell orientierte Gesellschaft organisiert werden kann.',
    shortDescription: 'Die vedische Gesellschaftsordnung und ihre spirituelle Bedeutung.',
    difficulty: 'advanced',
    recommendedFor: ['Fortgeschrittene', 'Gesellschafts-Interessierte', 'Führungskräfte'],
    relatedBooks: ['bhagavad-gita-wie-sie-ist', 'srimad-bhagavatam-canto-1'],
    availability: {
      inStock: false,
      price: 8.00,
      currency: 'EUR'
    },
    isFeatured: false
  },
  {
    title: 'Die Perfektion des Yoga',
    slug: { _type: 'slug', current: 'perfektion-des-yoga' },
    author: 'A.C. Bhaktivedanta Swami Prabhupāda',
    authorBio: 'Gründer-Ācārya der Internationalen Gesellschaft für Krishna-Bewusstsein (ISKCON)',
    bookType: 'instructions',
    description: 'Dieses kompakte Werk erklärt die verschiedenen Yoga-Systeme und zeigt, warum Bhakti-yoga als die höchste und praktischste Form des Yoga für das moderne Zeitalter gilt.',
    shortDescription: 'Das Yoga der göttlichen Liebe - Bhakti-yoga als höchste Form des Yoga.',
    difficulty: 'beginner',
    recommendedFor: ['Yoga-Praktizierende', 'Einsteiger', 'Fitness-Interessierte'],
    relatedBooks: ['bhagavad-gita-wie-sie-ist', 'nektar-der-hingabe'],
    availability: {
      inStock: true,
      price: 8.00,
      currency: 'EUR'
    },
    isFeatured: false
  },
  {
    title: 'Jenseits von Geburt und Tod',
    slug: { _type: 'slug', current: 'jenseits-von-geburt-und-tod' },
    author: 'A.C. Bhaktivedanta Swami Prabhupāda',
    authorBio: 'Gründer-Ācārya der Internationalen Gesellschaft für Krishna-Bewusstsein (ISKCON)',
    bookType: 'philosophy',
    description: 'Dieses Buch erklärt das vedische Verständnis von Leben, Tod und Wiedergeburt. Es zeigt, wie man den Kreislauf von Geburt und Tod überwinden und die ewige spirituelle Existenz erreichen kann.',
    shortDescription: 'Gibt es ein Leben nach dem Tod? Die vedische Sicht auf Reinkarnation.',
    difficulty: 'beginner',
    recommendedFor: ['Tod/Leben-Interessierte', 'Philosophie-Einsteiger', 'Suchende'],
    relatedBooks: ['bhagavad-gita-wie-sie-ist', 'leben-kommt-von-leben'],
    availability: {
      inStock: true,
      price: 10.00,
      currency: 'EUR'
    },
    isFeatured: false
  }
];

/**
 * Erstellt ein Sanity-Document für ein Buch
 * Nur mit den Feldern, die im Schema existieren
 */
function createLiteratureDocument(book) {
  const documentId = `literature-${book.slug.current}`;

  const document = {
    _id: documentId,
    _type: 'literature',
    title: book.title,
    slug: book.slug,
    
    // Author als Objekt gemäß Schema
    author: {
      name: book.author || 'A.C. Bhaktivedanta Swami Prabhupāda',
      originalName: 'A.C. Bhaktivedanta Swami Prabhupāda',
      bio: book.authorBio || 'Gründer-Ācārya der Internationalen Gesellschaft für Krishna-Bewusstsein (ISKCON)'
    },
    
    // Translator als Objekt gemäß Schema
    translator: book.translator ? {
      name: book.translator,
      bio: null
    } : null,
    
    // Publishing Info mit edition
    publishingInfo: {
      publisher: 'The Bhaktivedanta Book Trust',
      edition: book.edition || '1. Auflage',
      language: 'de'
    },
    
    isbn: book.isbn,
    bookType: book.bookType,
    description: book.description,
    difficulty: book.difficulty,
    recommendedFor: book.recommendedFor || [],
    
    // Availability als korrektes Objekt gemäß Schema
    availability: {
      isAvailable: book.availability?.inStock || true,
      formats: ['paperback'],
      price: book.availability?.price ? {
        amount: book.availability.price,
        currency: book.availability.currency || 'EUR'
      } : null,
      purchaseLinks: [],
      freeDownloadLink: null
    },
    
    isFeatured: book.isFeatured || false,
    isPublished: true
  };

  // Füge verwandte Bücher als Referenzen hinzu
  if (book.relatedBooks && book.relatedBooks.length > 0) {
    document.relatedBooks = book.relatedBooks.map(slug => ({
      _type: 'reference',
      _ref: `literature-${slug}`,
      _key: Math.random().toString(36).substring(2, 9) // Generiere _key für Array-Items
    }));
  }

  return document;
}

/**
 * Erstellt ein Platzhalter-Bild für Bücher
 */
async function createBookPlaceholderImage() {
  try {
    const existing = await client.fetch(`*[_id == "image-book-placeholder"][0]`);
    if (existing) {
      console.log('📚 Buch-Platzhalter-Bild bereits vorhanden');
      return 'image-book-placeholder';
    }

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900">
      <defs>
        <linearGradient id="bookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#B74233;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8B3226;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="3" dy="3" stdDeviation="3" flood-opacity="0.3"/>
        </filter>
      </defs>
      <rect width="600" height="900" fill="url(#bookGrad)"/>
      <rect x="50" y="50" width="500" height="800" fill="none" stroke="gold" stroke-width="4" opacity="0.8"/>
      <rect x="70" y="70" width="460" height="760" fill="none" stroke="gold" stroke-width="2" opacity="0.6"/>
      
      <!-- Om Symbol -->
      <text x="300" y="200" text-anchor="middle" font-family="Arial" font-size="72" fill="gold" filter="url(#shadow)">ॐ</text>
      
      <!-- Book Title Area -->
      <rect x="100" y="250" width="400" height="100" fill="gold" opacity="0.2"/>
      <text x="300" y="310" text-anchor="middle" font-family="Georgia" font-size="28" fill="white" font-weight="bold">
        ISKCON Literatur
      </text>
      
      <!-- Decorative elements -->
      <circle cx="150" cy="450" r="40" fill="none" stroke="gold" stroke-width="2" opacity="0.5"/>
      <circle cx="450" cy="450" r="40" fill="none" stroke="gold" stroke-width="2" opacity="0.5"/>
      
      <!-- Bottom decoration -->
      <text x="300" y="750" text-anchor="middle" font-family="Arial" font-size="18" fill="gold" opacity="0.8">
        The Bhaktivedanta Book Trust
      </text>
    </svg>`;
    
    const buffer = Buffer.from(svgContent);
    
    const asset = await client.assets.upload('image', buffer, {
      filename: 'book-placeholder.svg',
      contentType: 'image/svg+xml'
    });

    console.log('📚 Buch-Platzhalter-Bild erstellt:', asset._id);
    return asset._id;
  } catch (error) {
    console.error('❌ Fehler beim Erstellen des Buch-Platzhalter-Bildes:', error.message);
    return null;
  }
}

/**
 * Importiert alle Literatur-Daten in Sanity
 */
async function importLiterature() {
  console.log('📚 Starte Literatur Import...\n');

  const placeholderImageId = await createBookPlaceholderImage();
  if (!placeholderImageId) {
    console.error('❌ Konnte kein Platzhalter-Bild erstellen. Import abgebrochen.');
    return;
  }

  const transaction = client.transaction();
  let successful = 0;
  let failed = 0;

  for (const book of sampleLiterature) {
    try {
      console.log(`📖 Importiere: ${book.title}`);
      console.log(`   Typ: ${book.bookType}`);
      console.log(`   Schwierigkeit: ${book.difficulty}`);
      if (book.isbn) console.log(`   ISBN: ${book.isbn}`);
      
      const document = createLiteratureDocument(book);
      
      // Füge Platzhalter-Bild hinzu
      document.coverImage = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: placeholderImageId
        }
      };
      
      transaction.createOrReplace(document);
      
      successful++;
      console.log(`   ✅ Vorbereitet für Import\n`);
    } catch (error) {
      console.error(`   ❌ Fehler bei ${book.title}:`, error.message);
      failed++;
    }
  }

  // Führe die Transaktion aus
  try {
    console.log('🚀 Führe Batch-Import aus...');
    await transaction.commit();
    console.log(`\n✅ Import erfolgreich abgeschlossen!`);
    console.log(`📊 Statistik:`);
    console.log(`   - Erfolgreich: ${successful} Bücher`);
    console.log(`   - Fehlgeschlagen: ${failed} Bücher`);
    
    if (successful > 0) {
      console.log(`\n📚 ${successful} Bücher wurden erfolgreich in Sanity importiert!`);
      console.log(`🌐 Sie sind jetzt im Sanity Studio verfügbar: https://iskcon-de.sanity.studio`);
      
      // Zeige eine Übersicht der importierten Buchtypen
      const bookTypes = {};
      sampleLiterature.forEach(book => {
        bookTypes[book.bookType] = (bookTypes[book.bookType] || 0) + 1;
      });
      
      console.log(`\n📊 Importierte Buchtypen:`);
      Object.entries(bookTypes).forEach(([type, count]) => {
        console.log(`   - ${type}: ${count} Bücher`);
      });
    }
  } catch (error) {
    console.error('\n❌ Batch-Import fehlgeschlagen:', error.message);
    if (error.details) {
      console.error('Details:', error.details);
    }
  }
}

/**
 * Hauptfunktion
 */
async function main() {
  try {
    console.log('🕉️  ISKCON Literatur Import Script');
    console.log('===================================\n');
    
    // Teste Sanity-Verbindung
    try {
      const result = await client.fetch('count(*[_type == "literature"])');
      console.log(`📚 Aktuelle Bücher in Sanity: ${result}\n`);
    } catch (error) {
      console.error('❌ Sanity-Verbindung fehlgeschlagen:', error.message);
      process.exit(1);
    }

    // Starte Import
    await importLiterature();
    
  } catch (error) {
    console.error('💥 Unerwarteter Fehler:', error);
    process.exit(1);
  }
}

// Script ausführen wenn direkt aufgerufen
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { importLiterature, createLiteratureDocument };