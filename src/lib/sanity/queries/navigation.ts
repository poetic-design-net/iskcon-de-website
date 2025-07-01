// Navigation-spezifische Queries und Validierungen
import type { SanityNavigation, MegaMenuCategory } from '$lib/types';
import { client } from '../client';
import { NAVIGATION_PROJECTION } from './projections';

// Navigation Query Funktionen
export async function getNavigation(): Promise<SanityNavigation | null> {
  return client.fetch<SanityNavigation | null>(
    `*[_type == "navigation"][0] ${NAVIGATION_PROJECTION}`
  );
}

export async function getNavigationCategories(): Promise<MegaMenuCategory[]> {
  const navigation = await getNavigation();
  if (!navigation?.categories) {
    return generateFallbackNavigation();
  }
  
  return navigation.categories.map(cat => ({
    title: cat.title,
    slug: cat.slug,
    icon: cat.icon,
    sections: cat.sections?.map(section => ({
      title: section.title,
      items: section.items.map(item => ({
        title: item.title,
        slug: item.slug,
        description: item.description,
        icon: item.icon
      }))
    })) || [],
    featured: cat.featured ? {
      title: cat.featured.title,
      description: cat.featured.description,
      image: cat.featured.image?.asset?.url || '',
      href: cat.featured.href
    } : undefined,
    isActive: false
  }));
}

// Fallback Navigation Generator
export function generateFallbackNavigation(): MegaMenuCategory[] {
  return [
    {
      title: 'Unsere Philosophie',
      slug: 'philosophie',
      icon: 'lotus',
      sections: [
        {
          title: 'Grundlagen',
          items: [
            {
              title: 'Bhakti Yoga',
              slug: 'bhakti-yoga',
              description: 'Der Pfad der Hingabe'
            },
            {
              title: 'Vedische Schriften',
              slug: 'vedische-schriften',
              description: 'Alte Weisheitstexte'
            }
          ]
        }
      ],
      featured: {
        title: 'Bhagavad Gita',
        description: 'Das wichtigste spirituelle Handbuch',
        image: '',
        href: '/bhagavad-gita'
      },
      isActive: false
    },
    {
      title: 'Tempel & Zentren',
      slug: 'tempel-zentren',
      icon: 'temple',
      sections: [
        {
          title: 'Besuchen Sie uns',
          items: [
            {
              title: 'Tempel finden',
              slug: 'tempel-finden',
              description: 'ISKCON Zentren in Ihrer Nähe'
            },
            {
              title: 'Gottesdienste',
              slug: 'gottesdienste',
              description: 'Zeiten und Programme'
            }
          ]
        }
      ],
      isActive: false
    },
    {
      title: 'Veranstaltungen',
      slug: 'veranstaltungen',
      icon: 'calendar',
      sections: [
        {
          title: 'Aktuelle Events',
          items: [
            {
              title: 'Alle Veranstaltungen',
              slug: 'events',
              description: 'Kommende Events und Festivals'
            },
            {
              title: 'Festivals',
              slug: 'festivals',
              description: 'Spirituelle Feiertage'
            }
          ]
        }
      ],
      isActive: false
    },
    {
      title: 'Community',
      slug: 'community',
      icon: 'users',
      sections: [
        {
          title: 'Mitmachen',
          items: [
            {
              title: 'Über uns',
              slug: 'ueber-uns',
              description: 'ISKCON Deutschland'
            },
            {
              title: 'Kontakt',
              slug: 'kontakt',
              description: 'Nehmen Sie Kontakt auf'
            }
          ]
        }
      ],
      isActive: false
    }
  ];
}

// Navigation Query Objekt
export const navigationQueries = {
  get: () => getNavigation(),
  categories: () => getNavigationCategories(),
  fallback: () => generateFallbackNavigation(),
  
  // Erweiterte Navigation-Funktionen
  getActiveCategory: async (activeSlug: string): Promise<MegaMenuCategory[]> => {
    const categories = await getNavigationCategories();
    return categories.map(cat => ({
      ...cat,
      isActive: cat.slug === activeSlug
    }));
  },
  
  findCategoryBySlug: async (slug: string): Promise<MegaMenuCategory | null> => {
    const categories = await getNavigationCategories();
    return categories.find(cat => cat.slug === slug) || null;
  }
};