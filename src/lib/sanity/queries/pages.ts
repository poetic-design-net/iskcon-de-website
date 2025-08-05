import { client } from '../client';
import {
  safeParsePage,
  type SanityPage
} from '../schemas';

// Page Projektion mit Content-Feld
export const PAGE_PROJECTION = `{
  _id,
  _type,
  _createdAt,
  _updatedAt,
  _rev,
  title,
  'slug': slug.current,
  description,
  seo {
    title,
    description,
    'image': {
      'asset': {
        'url': image.asset->url
      }
    }
  },
  content
}`;

// Page Query Funktionen
export async function getPageBySlug(slug: string): Promise<SanityPage | null> {
  try {
    // Debug: Zeige alle verfügbaren Pages
    console.log(`🔍 Suche nach Page mit Slug: "${slug}"`);
    
    const allPages = await client.fetch<{title: string, slug: string, _id: string}[]>(
      `*[_type == "page"] { title, "slug": slug.current, _id }`
    );
    console.log('📄 Alle verfügbaren Pages in Sanity:', allPages);
    
    const rawPage = await client.fetch(
      `*[_type == "page" && slug.current == $slug][0] ${PAGE_PROJECTION}`,
      { slug }
    );
    
    if (!rawPage) {
      console.log(`❌ Page mit Slug "${slug}" nicht gefunden. Verfügbare Slugs:`, allPages.map(p => p.slug));
      return null;
    }

    // Verwende Safe Parse für bessere Fehlerbehandlung
    const pageResult = safeParsePage(rawPage);
    
    if (!pageResult.success) {
      console.error('Page validation failed:', pageResult.error);
      return null;
    }
    
    console.log(`✅ Page "${slug}" gefunden:`, { title: pageResult.data.title });
    return pageResult.data;
  } catch (error) {
    console.error('Error fetching page by slug:', error);
    throw error;
  }
}