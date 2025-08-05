// Homepage-spezifische Queries und Validierungen
import type { SanityHomepageTeaser, SanityEvent, SanityCategory } from '$lib/types';
import { client } from '../client';
import { HOMEPAGE_TEASER_PROJECTION, EVENT_PROJECTION } from './projections';
import { validateHomepageTeaser } from './validation';

// Homepage Teaser Funktionen
export async function getHomepageTeasers(): Promise<SanityHomepageTeaser[]> {
  return client.fetch<SanityHomepageTeaser[]>(
    `*[_type == "homepageTeaser"] | order(order asc) ${HOMEPAGE_TEASER_PROJECTION}`
  );
}

export async function getHomepageTeaserByTheme(theme: string): Promise<SanityHomepageTeaser | null> {
  return client.fetch<SanityHomepageTeaser | null>(
    `*[_type == "homepageTeaser" && theme == $theme][0] ${HOMEPAGE_TEASER_PROJECTION}`,
    { theme }
  );
}

// Homepage Events
export async function getHomepageEvents(limit = 6): Promise<SanityEvent[]> {
  const now = new Date().toISOString();
  return client.fetch<SanityEvent[]>(
    `*[_type == "event" && startDate >= $now] | order(startDate asc)[0...${limit}] ${EVENT_PROJECTION}`,
    { now }
  );
}

export async function getFeaturedHomepageEvents(limit = 3): Promise<SanityEvent[]> {
  return client.fetch<SanityEvent[]>(
    `*[_type == "event" && isFeatured == true] | order(startDate desc)[0...${limit}] ${EVENT_PROJECTION}`
  );
}

// Homepage Event Categories
export async function getHomepageEventCategories(): Promise<SanityCategory[]> {
  return client.fetch<SanityCategory[]>(
    `*[_type == "eventCategory"] | order(title asc) {
      title,
      slug,
      description,
      icon,
      color,
      "eventCount": count(*[_type == "event" && eventCategory.slug == ^.slug])
    }`
  );
}


// Homepage Document Query
export async function getHomepage() {
  try {
    const query = `*[_type == "homepage"][0] {
      title,
      hero {
        title {
          line1,
          line2
        },
        subtitle,
        backgroundImage {
          asset->{
            url
          },
          alt
        },
        buttons[] {
          text,
          link,
          icon,
          variant
        }
      },
      seo {
        metaTitle,
        metaDescription
      }
    }`;
    
    const homepage = await client.fetch(query);
    console.log('🏠 Homepage data loaded:', !!homepage);
    
    return homepage;
  } catch (error) {
    console.error('❌ Error loading homepage:', error);
    return null;
  }
}

// Homepage Query Objekt
export const homepageQueries = {
  teasers: () => getHomepageTeasers(),
  teaserByTheme: (theme: string) => getHomepageTeaserByTheme(theme),
  events: (limit?: number) => getHomepageEvents(limit),
  featuredEvents: (limit?: number) => getFeaturedHomepageEvents(limit),
  eventCategories: () => getHomepageEventCategories(),
  
  // Kombinierte Homepage-Daten
  allHomepageData: async () => {
    const [teasers, events, featuredEvents, eventCategories] = await Promise.all([
      getHomepageTeasers(),
      getHomepageEvents(6),
      getFeaturedHomepageEvents(3),
      getHomepageEventCategories()
    ]);
    
    return {
      teasers: teasers.map(teaser => validateHomepageTeaser(teaser) || teaser),
      events: events,
      featuredEvents: featuredEvents,
      eventCategories: eventCategories
    };
  },
  
  // Legacy-Kompatibilität für bestehenden Code
  getAllHomepageTeasers: getHomepageTeasers,
  getHomepageTeaserByTheme,
  getHomepageEvents,
  getFeaturedHomepageEvents,
  getHomepageEventCategories,
  
  // Homepage Document
  getHomepage
};