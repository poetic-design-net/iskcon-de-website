import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Sanity client configuration
const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_TOKEN!,
  useCdn: false,
  apiVersion: '2023-05-03',
});

// Define main pages first
const mainPages = [
  {
    _type: 'page',
    _id: 'page-bewegung',
    title: 'Bewegung',
    slug: { current: 'bewegung' },
    description: 'Die ISKCON Bewegung in Deutschland und Österreich',
    order: 1,
    seo: {
      title: 'Die Bewegung - ISKCON Deutschland-Österreich',
      description: 'Erfahren Sie mehr über die Internationale Gesellschaft für Krishna-Bewusstsein in Deutschland und Österreich',
    },
  },
  {
    _type: 'page',
    _id: 'page-philosophie',
    title: 'Philosophie',
    slug: { current: 'philosophie' },
    description: 'Die vedische Philosophie des Krishna-Bewusstseins',
    order: 2,
    seo: {
      title: 'Philosophie - ISKCON Deutschland-Österreich',
      description: 'Entdecken Sie die zeitlose Weisheit der vedischen Philosophie und des Krishna-Bewusstseins',
    },
  },
  {
    _type: 'page',
    _id: 'page-tempel',
    title: 'Tempel',
    slug: { current: 'tempel' },
    description: 'ISKCON Tempel in Deutschland und Österreich',
    order: 3,
    seo: {
      title: 'Tempel - ISKCON Deutschland-Österreich',
      description: 'Finden Sie ISKCON Tempel und Zentren in Deutschland und Österreich',
    },
  },
  {
    _type: 'page',
    _id: 'page-events',
    title: 'Events',
    slug: { current: 'events' },
    description: 'Spirituelle Veranstaltungen und Festivals',
    order: 4,
    seo: {
      title: 'Events - ISKCON Deutschland-Österreich',
      description: 'Aktuelle Veranstaltungen, Festivals und spirituelle Programme',
    },
  },
  {
    _type: 'page',
    _id: 'page-literatur',
    title: 'Literatur',
    slug: { current: 'literature' },
    description: 'Vedische Literatur und spirituelle Bücher',
    order: 5,
    seo: {
      title: 'Literatur - ISKCON Deutschland-Österreich',
      description: 'Entdecken Sie vedische Literatur und spirituelle Bücher',
    },
  },
];

// Define philosophy sub-pages
const philosophySubPages = [
  {
    _type: 'page',
    title: 'Krishna',
    slug: { current: 'philosophie/krishna' },
    description: 'Die Höchste Persönlichkeit Gottes',
    parent: { _ref: 'page-philosophie' },
    order: 1,
    seo: {
      title: 'Krishna - Die Höchste Persönlichkeit Gottes',
      description: 'Lernen Sie Krishna kennen - die Höchste Persönlichkeit Gottes in der vedischen Philosophie',
    },
  },
  {
    _type: 'page',
    title: 'Vedische Schriften',
    slug: { current: 'philosophie/vedische-schriften' },
    description: 'Die zeitlose Weisheit der Veden',
    parent: { _ref: 'page-philosophie' },
    order: 2,
    seo: {
      title: 'Vedische Schriften - Bhagavad-gītā, Śrīmad-Bhāgavatam und mehr',
      description: 'Entdecken Sie die wichtigsten vedischen Schriften wie Bhagavad-gītā und Śrīmad-Bhāgavatam',
    },
  },
  {
    _type: 'page',
    title: 'Bhakti-Yoga',
    slug: { current: 'philosophie/bhakti-yoga' },
    description: 'Der Pfad der liebenden Hingabe',
    parent: { _ref: 'page-philosophie' },
    order: 3,
    seo: {
      title: 'Bhakti-Yoga - Der Pfad der liebenden Hingabe',
      description: 'Lernen Sie Bhakti-Yoga kennen - den Pfad der liebenden Hingabe zu Krishna',
    },
  },
  {
    _type: 'page',
    title: 'Seele und Reinkarnation',
    slug: { current: 'philosophie/seele-reinkarnation' },
    description: 'Das ewige Selbst jenseits von Geburt und Tod',
    parent: { _ref: 'page-philosophie' },
    order: 4,
    seo: {
      title: 'Seele und Reinkarnation - Das ewige Selbst',
      description: 'Die vedische Wissenschaft von der Seele und dem Kreislauf von Geburt und Tod',
    },
  },
  {
    _type: 'page',
    title: 'Karma und Dharma',
    slug: { current: 'philosophie/karma-dharma' },
    description: 'Universelle Gesetze des Handelns',
    parent: { _ref: 'page-philosophie' },
    order: 5,
    seo: {
      title: 'Karma und Dharma - Universelle Gesetze',
      description: 'Verstehen Sie die universellen Gesetze von Karma (Handlung) und Dharma (Pflicht)',
    },
  },
  {
    _type: 'page',
    title: 'Die drei Erscheinungsweisen',
    slug: { current: 'philosophie/drei-erscheinungsweisen' },
    description: 'Gunas - Die Kräfte der Natur',
    parent: { _ref: 'page-philosophie' },
    order: 6,
    seo: {
      title: 'Die drei Erscheinungsweisen der materiellen Natur',
      description: 'Sattva, Rajas und Tamas - die drei Erscheinungsweisen der materiellen Natur',
    },
  },
  {
    _type: 'page',
    title: 'Vegetarismus und Prasadam',
    slug: { current: 'philosophie/vegetarismus-prasadam' },
    description: 'Spirituelle Ernährung für Körper, Geist und Seele',
    parent: { _ref: 'page-philosophie' },
    order: 7,
    seo: {
      title: 'Vegetarismus und Prasadam - Spirituelle Ernährung',
      description: 'Die Bedeutung des Vegetarismus und geweihter Speisen (Prasadam) im Krishna-Bewusstsein',
    },
  },
  {
    _type: 'page',
    title: 'Guru und Schülernachfolge',
    slug: { current: 'philosophie/guru-schulernachfolge' },
    description: 'Die spirituelle Tradition',
    parent: { _ref: 'page-philosophie' },
    order: 8,
    seo: {
      title: 'Guru und Schülernachfolge - Die spirituelle Tradition',
      description: 'Die Bedeutung des spirituellen Meisters und der Schülernachfolge',
    },
  },
];

async function migratePages() {
  console.log('Starting hierarchical page migration to Sanity...\n');

  try {
    // First, create or update main pages
    console.log('Creating/updating main pages...');
    
    for (const page of mainPages) {
      try {
        const existingPage = await client.fetch(
          `*[_type == "page" && _id == $id][0]`,
          { id: page._id }
        );

        if (existingPage) {
          await client.patch(page._id!)
            .set({
              title: page.title,
              slug: page.slug,
              description: page.description,
              order: page.order,
              seo: page.seo,
            })
            .commit();
          console.log(`✅ Updated: ${page.title}`);
        } else {
          await client.createIfNotExists(page);
          console.log(`✅ Created: ${page.title}`);
        }
      } catch (error: any) {
        console.error(`❌ Failed with ${page.title}:`, error.message);
      }
    }

    // Give Sanity a moment to process
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Then create sub-pages with parent references
    console.log('\nCreating/updating philosophy sub-pages...');
    
    for (const page of philosophySubPages) {
      try {
        const existingPage = await client.fetch(
          `*[_type == "page" && slug.current == $slug][0]`,
          { slug: page.slug.current }
        );

        if (existingPage) {
          await client.patch(existingPage._id)
            .set({
              parent: page.parent,
              order: page.order,
            })
            .commit();
          console.log(`✅ Updated: ${page.title} (with parent reference)`);
        } else {
          await client.create(page);
          console.log(`✅ Created: ${page.title} (as child of Philosophie)`);
        }
      } catch (error: any) {
        console.error(`❌ Failed with ${page.title}:`, error.message);
      }
    }

    console.log('\nMigration complete!');
    console.log('\nPage hierarchy:');
    console.log('├── Bewegung');
    console.log('├── Philosophie');
    console.log('│   ├── Krishna');
    console.log('│   ├── Vedische Schriften');
    console.log('│   ├── Bhakti-Yoga');
    console.log('│   ├── Seele und Reinkarnation');
    console.log('│   ├── Karma und Dharma');
    console.log('│   ├── Die drei Erscheinungsweisen');
    console.log('│   ├── Vegetarismus und Prasadam');
    console.log('│   └── Guru und Schülernachfolge');
    console.log('├── Tempel');
    console.log('├── Events');
    console.log('└── Literatur');
    
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Run the migration
migratePages().catch(console.error);