import type { MegaMenuCategory } from '$lib/types';
import { client } from './client';
import { templeQueries } from './queries';
import { getFeaturedBooks } from './queries/literature';

// Einfache Page Query Funktion
async function getAllPages() {
  const query = `*[_type == "page"] {
    title,
    'slug': slug.current,
    description
  }`;
  return await client.fetch(query);
}

// Einfache Event Query für Navigation
async function getRecentEvents() {
  try {
    const query = `*[_type == "event"] | order(startDate desc)[0...3] {
      title,
      'slug': slug.current,
      startDate,
      location {
        type,
        'templeName': temple->name,
        'templeCity': temple->address.city,
        externalVenue
      }
    }`;
    const events = await client.fetch(query);
    console.log('🎉 Events gefunden für Navigation:', events.length);
    return events;
  } catch (error) {
    console.error('❌ Fehler beim Laden der Events für Navigation:', error);
    return [];
  }
}

// Spezielle Funktion für Literature-Navigation
async function getLiteratureNavigation() {
  try {
    // Lade Featured Books und als Fallback alle verfügbaren Bücher
    const [featuredBooks, allBooks] = await Promise.all([
      getFeaturedBooks(6), // Mehr Featured Books für Navigation
      client.fetch(`*[_type == "literature"] | order(publishedAt desc, title asc) [0...8] {
        _id,
        title,
        'slug': slug.current,
        description,
        subtitle,
        bookType,
        'author': author->name
      }`)
    ]);
    
    // Priorisiere Featured Books, fülle mit anderen auf
    const booksForNavigation = featuredBooks.length > 0 ? featuredBooks : allBooks;
    
    console.log('📚 Literature-Navigation geladen:', {
      featuredBooks: featuredBooks.length,
      allBooks: allBooks.length,
      usedBooks: booksForNavigation.length
    });
    
    return booksForNavigation.map((book: any) => ({
      title: book.title,
      slug: `literature/${book.slug}`,
      description: book.subtitle || book.description || `${book.author?.name ? `Von ${book.author.name}` : 'Vedische Weisheit'}`,
      icon: getBookIcon(book.bookType || book.title)
    }));
  } catch (error) {
    console.error('❌ Fehler beim Laden der Literature-Navigation:', error);
    return [
      { title: 'Bhagavad-gita As It Is', slug: 'literature/bhagavad-gita', description: 'Das wichtigste spirituelle Handbuch', icon: 'mdi:book-heart' },
      { title: 'Srimad-Bhagavatam', slug: 'literature/srimad-bhagavatam', description: 'Die reife Frucht des vedischen Wissens', icon: 'mdi:book-multiple' },
      { title: 'Sri Caitanya-caritamrta', slug: 'literature/caitanya-caritamrta', description: 'Das Leben Sri Caitanyas', icon: 'mdi:book-open' }
    ];
  }
}

// INTELLIGENTE HYBRID NAVIGATION - Vollständig aus Sanity generiert
export async function getIntelligentNavigation(): Promise<MegaMenuCategory[]> {
  try {
    console.log('🧠 Generiere intelligente Navigation aus Sanity...');
    
    // Parallel alle benötigten Daten laden
    const [temples, pages, events, literatureItems] = await Promise.all([
      templeQueries.getAllTemples(),
      getAllPages(),
      getRecentEvents(),
      getLiteratureNavigation()
    ]);
    
    const activeTemples = temples.filter((temple: any) => temple.isActive);
    const recentEvents = events.slice(0, 3);
    
    // Dynamische Navigation generieren
    const navigation: MegaMenuCategory[] = [
      // ÜBER UNS - Aus Sanity Pages
      {
        title: 'Über uns',
        slug: 'ueber-uns',
        icon: 'mdi:information-outline',
        sections: [
          {
            title: 'ISKCON',
            items: pages
              .filter((page: any) => page.slug.startsWith('ueber-uns/'))
              .map((page: any) => ({
                title: page.title,
                slug: page.slug,
                description: page.excerpt || 'Mehr über ISKCON erfahren',
                icon: 'mdi:lotus'
              }))
          }
        ],
        featured: {
          title: 'Srila Prabhupada',
          description: 'Lernen Sie unseren Gründer-Acharya kennen',
          href: '/ueber-uns/srila-prabhupada'
        }
      },
      
      // EVENTS - Mit neuesten Events und Link zu allen
      {
        title: 'Events',
        slug: 'events',
        icon: 'mdi:calendar-star',
        sections: [
          {
            title: 'Neueste Events',
            items: [
              { title: 'Alle Events anzeigen', slug: 'events', description: 'Komplette Veranstaltungsübersicht', icon: 'mdi:calendar' },
              ...recentEvents.map((event: any) => {
                // Location-Text erstellen
                let locationText = 'Online';
                if (event.location?.type === 'temple' && event.location?.templeCity) {
                  locationText = event.location.templeCity;
                } else if (event.location?.type === 'external' && event.location?.externalVenue?.name) {
                  locationText = event.location.externalVenue.name;
                }
                
                return {
                  title: event.title,
                  slug: `events/${event.slug}`,
                  description: `${new Date(event.startDate).toLocaleDateString('de-DE')} - ${locationText}`,
                  icon: 'mdi:calendar-star'
                };
              })
            ]
          }
        ]
      },
      
      // TEMPEL - Dynamisch aus Sanity
      {
        title: 'Tempel',
        slug: 'tempel',
        icon: 'mdi:temple-hindu',
        sections: [
          {
            title: 'Unsere Standorte',
            items: [
              { title: 'Alle Tempel', slug: 'tempel', description: 'ISKCON Zentren in Deutschland', icon: 'mdi:map-marker' },
              ...activeTemples.map((temple: any) => ({
                title: temple.name,
                slug: `tempel/${temple.slug}`,
                description: `ISKCON ${temple.address.city}`,
                icon: 'mdi:temple-hindu'
              }))
            ]
          }
        ]
      },
      
      // VEDISCHE SCHRIFTEN - Nur Literature-Inhalte
      {
        title: 'Vedische Schriften',
        slug: 'vedische-schriften',
        icon: 'mdi:book-ancient',
        sections: [
          {
            title: 'Spirituelle Literatur',
            items: [
              { title: 'Alle Bücher', slug: 'literature', description: 'Vollständige Sammlung vedischer Literatur', icon: 'mdi:library' },
              ...literatureItems
            ]
          }
        ],
        featured: {
          title: 'Bhagavad-gita As It Is',
          description: 'Das wichtigste spirituelle Handbuch von Srila Prabhupada',
          href: '/literature'
        }
      },
      
      // SPIRITUELLE PRAXIS - Kombiniert Praxis & Philosophie + Lernen & Vertiefen
      {
        title: 'Spirituelle Praxis',
        slug: 'spirituelle-praxis',
        icon: 'mdi:lotus',
        sections: [
          {
            title: 'Praxis & Philosophie',
            items: [
              { title: 'Bhakti-Yoga', slug: 'lehren/bhakti-yoga', description: 'Der Yoga der liebenden Hingabe', icon: 'mdi:yoga' },
              { title: 'Vedische Philosophie', slug: 'lehren/vedische-philosophie', description: 'Grundlagen der Spiritualität', icon: 'mdi:lotus' },
              { title: 'Meditation & Mantras', slug: 'lehren/meditation-mantras', description: 'Mantra-Meditation und spirituelle Praxis', icon: 'mdi:meditation' },
              { title: 'Krishna-Bewusstsein', slug: 'lehren/krishna-bewusstsein', description: 'Der Weg zur Selbstverwirklichung', icon: 'mdi:heart-circle' }
            ]
          },
          {
            title: 'Lernen & Vertiefen',
            items: [
              { title: 'Online-Kurse', slug: 'lehren/online-kurse', description: 'Strukturierte spirituelle Bildung', icon: 'mdi:school' },
              { title: 'Vorträge & Seminare', slug: 'lehren/vortraege-seminare', description: 'Live-Veranstaltungen und Workshops', icon: 'mdi:presentation' },
              { title: 'Studiengruppen', slug: 'lehren/studiengruppen', description: 'Gemeinsam die Schriften studieren', icon: 'mdi:account-group' },
              { title: 'Downloads & Ressourcen', slug: 'lehren/downloads', description: 'Spirituelle Materialien zum Herunterladen', icon: 'mdi:download' }
            ]
          }
        ],
        featured: {
          title: 'Bhakti-Yoga Kurs',
          description: 'Beginnen Sie Ihre spirituelle Reise mit unserem Grundkurs',
          href: '/lehren/online-kurse'
        }
      },
      
      // COMMUNITY - Einfacher Link
      {
        title: 'Community',
        slug: 'community',
        icon: 'mdi:account-group'
      }
    ];
    
    console.log('✅ Intelligente Navigation generiert:', {
      temples: activeTemples.length,
      events: recentEvents.length,
      pages: pages.length,
      literatureItems: literatureItems.length
    });
    
    return navigation;
    
  } catch (error) {
    console.error('❌ Fehler beim Generieren der intelligenten Navigation:', error);
    return generateFallbackNavigation();
  }
}

// Hilfsfunktion für Book Icons basierend auf Buchtyp oder Titel
function getBookIcon(bookTypeOrTitle: string): string {
  const type = bookTypeOrTitle?.toLowerCase() || '';
  
  if (type.includes('bhagavad') || type.includes('gita')) {
    return 'mdi:book-heart';
  } else if (type.includes('bhagavatam') || type.includes('srimad')) {
    return 'mdi:book-multiple';
  } else if (type.includes('caitanya') || type.includes('caritamrta')) {
    return 'mdi:book-open';
  } else if (type.includes('purana') || type.includes('scripture')) {
    return 'mdi:book-ancient';
  } else if (type.includes('upanishad')) {
    return 'mdi:book-education';
  } else {
    return 'mdi:book'; // Default icon
  }
}

// Navigation Query (Original)
export async function getNavigation(): Promise<MegaMenuCategory[] | null> {
  try {
    const query = `*[_type == "navigation"][0] {
      title,
      categories[] {
        title,
        'slug': slug.current,
        icon,
        sections[] {
          title,
          items[] {
            title,
            'slug': slug.current,
            description,
            icon
          }
        },
        featured {
          title,
          description,
          'image': image.asset->url,
          href
        }
      }
    }`;
    
    const result = await client.fetch(query);
    
    if (!result || !result.categories) {
      console.log('Navigation nicht gefunden, verwende Fallback-Daten');
      return null;
    }
    
    return result.categories;
  } catch (error) {
    console.error('Fehler beim Laden der Navigation:', error);
    return null;
  }
}

// Fallback Navigation Generator
export function generateFallbackNavigation(): MegaMenuCategory[] {
  return [
    {
      title: 'Über uns',
      slug: 'ueber-uns',
      icon: 'mdi:information-outline',
      sections: [
        {
          title: 'ISKCON',
          items: [
            { title: 'Unsere Mission', slug: 'ueber-uns/mission', description: 'Die spirituelle Mission von ISKCON', icon: 'mdi:heart' },
            { title: 'Geschichte', slug: 'ueber-uns/geschichte', description: 'Von Srila Prabhupada bis heute', icon: 'mdi:history' },
            { title: 'Philosophie', slug: 'ueber-uns/philosophie', description: 'Krishna-Bewusstsein verstehen', icon: 'mdi:lotus' }
          ]
        }
      ],
      featured: {
        title: 'Srila Prabhupada',
        description: 'Lernen Sie unseren Gründer-Acharya kennen',
        href: '/ueber-uns/srila-prabhupada'
      }
    },
    {
      title: 'Events',
      slug: 'events',
      icon: 'mdi:calendar-star',
      sections: [
        {
          title: 'Veranstaltungen',
          items: [
            { title: 'Alle Events', slug: 'events', description: 'Kommende Veranstaltungen', icon: 'mdi:calendar' },
            { title: 'Festivals', slug: 'events/festivals', description: 'Spirituelle Feste feiern', icon: 'mdi:party-popper' }
          ]
        }
      ]
    },
    {
      title: 'Tempel',
      slug: 'tempel',
      icon: 'mdi:temple-hindu',
      sections: [
        {
          title: 'Standorte',
          items: [
            { title: 'Alle Tempel', slug: 'tempel', description: 'ISKCON Zentren in Deutschland', icon: 'mdi:map-marker' },
            { title: 'Berlin', slug: 'tempel/berlin', description: 'Bhaktivedanta Ashram', icon: 'mdi:city' }
          ]
        }
      ]
    },
    {
      title: 'Vedische Schriften',
      slug: 'vedische-schriften',
      icon: 'mdi:book-ancient',
      sections: [
        {
          title: 'Spirituelle Literatur',
          items: [
            { title: 'Alle Bücher', slug: 'literature', description: 'Vollständige Sammlung vedischer Literatur', icon: 'mdi:library' },
            { title: 'Bhagavad-gita As It Is', slug: 'literature/bhagavad-gita', description: 'Das wichtigste spirituelle Handbuch', icon: 'mdi:book-heart' },
            { title: 'Srimad-Bhagavatam', slug: 'literature/srimad-bhagavatam', description: 'Die reife Frucht des vedischen Wissens', icon: 'mdi:book-multiple' }
          ]
        }
      ],
      featured: {
        title: 'Bhagavad-gita As It Is',
        description: 'Das wichtigste spirituelle Handbuch von Srila Prabhupada',
        href: '/literature'
      }
    },
    {
      title: 'Spirituelle Praxis',
      slug: 'spirituelle-praxis',
      icon: 'mdi:lotus',
      sections: [
        {
          title: 'Praxis & Philosophie',
          items: [
            { title: 'Bhakti-Yoga', slug: 'lehren/bhakti-yoga', description: 'Der Yoga der liebenden Hingabe', icon: 'mdi:yoga' },
            { title: 'Vedische Philosophie', slug: 'lehren/vedische-philosophie', description: 'Grundlagen der Spiritualität', icon: 'mdi:lotus' },
            { title: 'Meditation & Mantras', slug: 'lehren/meditation-mantras', description: 'Mantra-Meditation', icon: 'mdi:meditation' },
            { title: 'Krishna-Bewusstsein', slug: 'lehren/krishna-bewusstsein', description: 'Der Weg zur Selbstverwirklichung', icon: 'mdi:heart-circle' }
          ]
        },
        {
          title: 'Lernen & Vertiefen',
          items: [
            { title: 'Online-Kurse', slug: 'lehren/online-kurse', description: 'Strukturierte spirituelle Bildung', icon: 'mdi:school' },
            { title: 'Vorträge & Seminare', slug: 'lehren/vortraege-seminare', description: 'Live-Veranstaltungen und Workshops', icon: 'mdi:presentation' },
            { title: 'Studiengruppen', slug: 'lehren/studiengruppen', description: 'Gemeinsam die Schriften studieren', icon: 'mdi:account-group' },
            { title: 'Downloads & Ressourcen', slug: 'lehren/downloads', description: 'Spirituelle Materialien', icon: 'mdi:download' }
          ]
        }
      ],
      featured: {
        title: 'Bhakti-Yoga Kurs',
        description: 'Beginnen Sie Ihre spirituelle Reise mit unserem Grundkurs',
        href: '/lehren/online-kurse'
      }
    },
    {
      title: 'Community',
      slug: 'community',
      icon: 'mdi:account-group'
    }
  ];
}

// Fallback Navigation Generator mit dynamischen Tempel-Daten
export function generateFallbackNavigationWithTemples(templeItems: Array<{
  title: string;
  slug: string;
  description: string;
  icon: string;
}>): MegaMenuCategory[] {
  return [
    {
      title: 'Über uns',
      slug: 'ueber-uns',
      icon: 'mdi:information-outline',
      sections: [
        {
          title: 'ISKCON',
          items: [
            { title: 'Unsere Mission', slug: 'ueber-uns/mission', description: 'Die spirituelle Mission von ISKCON', icon: 'mdi:heart' },
            { title: 'Geschichte', slug: 'ueber-uns/geschichte', description: 'Von Srila Prabhupada bis heute', icon: 'mdi:history' },
            { title: 'Philosophie', slug: 'ueber-uns/philosophie', description: 'Krishna-Bewusstsein verstehen', icon: 'mdi:lotus' }
          ]
        }
      ],
      featured: {
        title: 'Srila Prabhupada',
        description: 'Lernen Sie unseren Gründer-Acharya kennen',
        href: '/ueber-uns/srila-prabhupada'
      }
    },
    {
      title: 'Events',
      slug: 'events',
      icon: 'mdi:calendar-star',
      sections: [
        {
          title: 'Veranstaltungen',
          items: [
            { title: 'Alle Events', slug: 'events', description: 'Kommende Veranstaltungen', icon: 'mdi:calendar' },
            { title: 'Festivals', slug: 'events/festivals', description: 'Spirituelle Feste feiern', icon: 'mdi:party-popper' }
          ]
        }
      ]
    },
    {
      title: 'Tempel',
      slug: 'tempel',
      icon: 'mdi:temple-hindu',
      sections: [
        {
          title: 'Unsere Standorte',
          items: [
            { title: 'Alle Tempel', slug: 'tempel', description: 'ISKCON Zentren in Deutschland', icon: 'mdi:map-marker' },
            ...templeItems
          ]
        }
      ]
    },
    {
      title: 'Vedische Schriften',
      slug: 'vedische-schriften',
      icon: 'mdi:book-ancient',
      sections: [
        {
          title: 'Spirituelle Literatur',
          items: [
            { title: 'Alle Bücher', slug: 'literature', description: 'Vollständige Sammlung vedischer Literatur', icon: 'mdi:library' },
            { title: 'Bhagavad-gita As It Is', slug: 'literature/bhagavad-gita', description: 'Das wichtigste spirituelle Handbuch', icon: 'mdi:book-heart' },
            { title: 'Srimad-Bhagavatam', slug: 'literature/srimad-bhagavatam', description: 'Die reife Frucht des vedischen Wissens', icon: 'mdi:book-multiple' }
          ]
        }
      ]
    },
    {
      title: 'Spirituelle Praxis',
      slug: 'spirituelle-praxis',
      icon: 'mdi:lotus',
      sections: [
        {
          title: 'Praxis & Philosophie',
          items: [
            { title: 'Bhakti-Yoga', slug: 'lehren/bhakti-yoga', description: 'Der Yoga der liebenden Hingabe', icon: 'mdi:yoga' },
            { title: 'Vedische Philosophie', slug: 'lehren/vedische-philosophie', description: 'Grundlagen der Spiritualität', icon: 'mdi:lotus' },
            { title: 'Meditation & Mantras', slug: 'lehren/meditation-mantras', description: 'Mantra-Meditation', icon: 'mdi:meditation' }
          ]
        },
        {
          title: 'Lernen & Vertiefen',
          items: [
            { title: 'Online-Kurse', slug: 'lehren/online-kurse', description: 'Strukturierte spirituelle Bildung', icon: 'mdi:school' },
            { title: 'Studiengruppen', slug: 'lehren/studiengruppen', description: 'Gemeinsam die Schriften studieren', icon: 'mdi:account-group' }
          ]
        }
      ]
    },
    {
      title: 'Community',
      slug: 'community',
      icon: 'mdi:account-group'
    }
  ];
}