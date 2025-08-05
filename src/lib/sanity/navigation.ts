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
      // ÜBER UNS - Erweiterte Sektion mit allen Unterseiten
      {
        title: 'Über uns',
        slug: 'ueber-uns',
        icon: 'mdi:information-outline',
        subtitle: 'Wer wir sind & unsere Mission',
        sections: [
          {
            title: 'ISKCON Deutschland',
            items: [
              { title: 'Über uns', slug: 'ueber-uns', description: 'ISKCON im Überblick', icon: 'mdi:information' },
              { title: 'Die Bewegung', slug: 'bewegung', description: 'Unsere spirituelle Gemeinschaft', icon: 'mdi:account-group' },
              { title: 'Geschichte', slug: 'geschichte', description: 'Von 1965 bis heute', icon: 'mdi:history' }
            ]
          },
          {
            title: 'Organisation',
            items: [
              { title: 'GBC', slug: 'gbc', description: 'Spirituelle Führung', icon: 'mdi:office-building' },
              { title: 'ISKCON Weltweit', slug: 'iskcon-weltweit', description: '600+ Tempel global', icon: 'mdi:earth' }
            ]
          }
        ],
        featured: {
          title: 'Srila Prabhupada',
          description: 'Lernen Sie unseren Gründer-Acharya kennen',
          href: '/srila-prabhupada',
          image: 'https://iskconnetrokona.wordpress.com/wp-content/uploads/2016/12/cropped-srila-prabhupada-blissful-japa2.jpg?w=329&h=311'
        }
      },
      
      // COMMUNITY & NEWS - Moved to position 2
      {
        title: 'Community & News',
        slug: 'community',
        icon: 'mdi:account-group',
        subtitle: 'Blog, Neuigkeiten & Gemeinschaft',
        sections: [
          {
            title: 'Aktuelles & Austausch',
            items: [
              { title: 'Blog', slug: 'blog', description: 'Neuigkeiten und spirituelle Artikel', icon: 'mdi:newspaper' },
              { title: 'Newsletter', slug: 'newsletter', description: 'Monatliche Updates erhalten', icon: 'mdi:email-newsletter' },
              { title: 'Community', slug: 'community', description: 'Unsere Gemeinschaft im Überblick', icon: 'mdi:account-group' }
            ]
          },
          {
            title: 'Projekte & Ressourcen',
            items: [
              { title: 'ISKCON Projekte', slug: 'community/projekte', description: 'Aktuelle Projekte und Initiativen', icon: 'mdi:lightbulb' },
              { title: 'YouTube Kanäle', slug: 'community/youtube', description: 'Spirituelle Videos und Vorträge', icon: 'mdi:youtube' },
              { title: 'Nützliche Links', slug: 'community/links', description: 'Weiterführende Ressourcen', icon: 'mdi:link' }
            ]
          }
        ],
        featured: {
          title: 'Aktueller Blog',
          description: 'Lesen Sie die neuesten Artikel und Nachrichten aus der ISKCON Community',
          href: '/blog'
        }
      },
      
      // PHILOSOPHIE - Neue Sektion für alle Philosophie-Seiten
      {
        title: 'Philosophie',
        slug: 'philosophie',
        icon: 'mdi:book-open-page-variant',
        subtitle: 'Vedische Weisheit & spirituelles Wissen',
        sections: [
          {
            title: 'Grundlagen',
            items: [
              { title: 'Krishna', slug: 'philosophie/krishna', description: 'Die Höchste Persönlichkeit Gottes', icon: 'mdi:crown' },
              { title: 'Literatur', slug: 'philosophie/vedische-schriften', description: 'Die zeitlose Weisheit der Veden', icon: 'mdi:book-ancient' },
              { title: 'Bhakti-Yoga', slug: 'philosophie/bhakti-yoga', description: 'Der Pfad der liebenden Hingabe', icon: 'mdi:yoga' }
            ]
          },
          {
            title: 'Vertiefung',
            items: [
              { title: 'Seele & Reinkarnation', slug: 'philosophie/seele-reinkarnation', description: 'Das ewige Selbst verstehen', icon: 'mdi:infinity' },
              { title: 'Karma & Dharma', slug: 'philosophie/karma-dharma', description: 'Universelle Gesetze des Handelns', icon: 'mdi:scale-balance' },
              { title: 'Die drei Erscheinungsweisen', slug: 'philosophie/drei-erscheinungsweisen', description: 'Gunas - Die Kräfte der Natur', icon: 'mdi:triangle-outline' }
            ]
          },
          {
            title: 'Praxis',
            items: [
              { title: 'Vegetarismus & Prasadam', slug: 'philosophie/vegetarismus-prasadam', description: 'Spirituelle Ernährung', icon: 'mdi:food-apple' },
              { title: 'Guru & Schülernachfolge', slug: 'philosophie/guru-schuelernachfolge', description: 'Die spirituelle Tradition', icon: 'mdi:account-star' }
            ]
          }
        ],
        featured: {
          title: 'Bhagavad-gītā',
          description: 'Beginnen Sie mit dem wichtigsten Text der vedischen Philosophie',
          href: '/philosophie/vedische-schriften'
        }
      },
      
      // TEMPEL - Dynamisch aus Sanity
      {
        title: 'Tempel',
        slug: 'tempel',
        icon: 'mdi:temple-hindu',
        subtitle: 'ISKCON Zentren in Deutschland',
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
      
      // EVENTS - Mit neuesten Events und Link zu allen
      {
        title: 'Events',
        slug: 'events',
        icon: 'mdi:calendar-star',
        subtitle: 'Feste, Kurse & Veranstaltungen',
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
      
      // LITERATUR - Vedische Schriften zum Lesen
      {
        title: 'Literatur',
        slug: 'literature',
        icon: 'mdi:library',
        subtitle: 'Bücher & vedische Schriften',
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
      
      // SPIRITUELLE PRAXIS - Fokus auf tägliche Praxis und Lernen
      {
        title: 'Spirituelle Praxis',
        slug: 'spirituelle-praxis',
        icon: 'mdi:lotus',
        subtitle: 'Meditation, Kurse & Retreats',
        sections: [
          {
            title: 'Tägliche Praxis',
            items: [
              { title: 'Meditation & Mantras', slug: 'praxis/meditation-mantras', description: 'Mantra-Meditation und Japa', icon: 'mdi:meditation' },
              { title: 'Tempelbesuch', slug: 'praxis/tempelbesuch', description: 'Gottesdienst und Darshan', icon: 'mdi:temple-hindu' },
              { title: 'Sadhana', slug: 'praxis/sadhana', description: 'Spirituelle Disziplin', icon: 'mdi:sunrise' },
              { title: 'Feste & Feiertage', slug: 'praxis/feste', description: 'Vaishnava-Kalender', icon: 'mdi:calendar-star' }
            ]
          },
          {
            title: 'Lernen & Vertiefen',
            items: [
              { title: 'Online-Kurse', slug: 'praxis/online-kurse', description: 'Strukturierte spirituelle Bildung', icon: 'mdi:school' },
              { title: 'Studiengruppen', slug: 'praxis/studiengruppen', description: 'Gemeinsam die Schriften studieren', icon: 'mdi:account-group' },
              { title: 'Retreats', slug: 'praxis/retreats', description: 'Spirituelle Auszeiten', icon: 'mdi:nature-people' },
              { title: 'Vorträge & Seminare', slug: 'praxis/vortraege', description: 'Live-Veranstaltungen', icon: 'mdi:presentation' }
            ]
          }
        ],
        featured: {
          title: 'Bhakti-Yoga Kurs',
          description: 'Beginnen Sie Ihre spirituelle Reise mit unserem Grundkurs',
          href: '/praxis/online-kurse'
        }
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
      subtitle: 'Wer wir sind & unsere Mission',
      sections: [
        {
          title: 'ISKCON Deutschland',
          items: [
            { title: 'Über uns', slug: 'ueber-uns', description: 'ISKCON im Überblick', icon: 'mdi:information' },
            { title: 'Die Bewegung', slug: 'bewegung', description: 'Unsere spirituelle Gemeinschaft', icon: 'mdi:account-group' },
            { title: 'Geschichte', slug: 'geschichte', description: 'Von 1965 bis heute', icon: 'mdi:history' },
          ]
        },
        {
          title: 'Organisation',
          items: [
            { title: 'GBC', slug: 'gbc', description: 'Spirituelle Führung', icon: 'mdi:office-building' },
            { title: 'ISKCON Weltweit', slug: 'iskcon-weltweit', description: '600+ Tempel global', icon: 'mdi:earth' }
          ]
        }
      ],
      featured: {
        title: 'Srila Prabhupada',
        description: 'Lernen Sie unseren Gründer-Acharya kennen',
        href: '/srila-prabhupada',
        image: 'https://iskconnetrokona.wordpress.com/wp-content/uploads/2016/12/cropped-srila-prabhupada-blissful-japa2.jpg?w=329&h=311'
      }
    },
    {
      title: 'Events',
      slug: 'events',
      icon: 'mdi:calendar-star',
      subtitle: 'Feste, Kurse & Veranstaltungen',
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
      subtitle: 'ISKCON Zentren in Deutschland',
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
      title: 'Philosophie',
      slug: 'philosophie',
      icon: 'mdi:book-open-page-variant',
      subtitle: 'Vedische Weisheit & spirituelles Wissen',
      sections: [
        {
          title: 'Grundlagen',
          items: [
            { title: 'Krishna', slug: 'philosophie/krishna', description: 'Die Höchste Persönlichkeit Gottes', icon: 'mdi:crown' },
            { title: 'Vedische Schriften', slug: 'philosophie/vedische-schriften', description: 'Die zeitlose Weisheit der Veden', icon: 'mdi:book-ancient' },
            { title: 'Bhakti-Yoga', slug: 'philosophie/bhakti-yoga', description: 'Der Pfad der liebenden Hingabe', icon: 'mdi:yoga' }
          ]
        },
        {
          title: 'Vertiefung',
          items: [
            { title: 'Seele & Reinkarnation', slug: 'philosophie/seele-reinkarnation', description: 'Das ewige Selbst verstehen', icon: 'mdi:infinity' },
            { title: 'Karma & Dharma', slug: 'philosophie/karma-dharma', description: 'Universelle Gesetze des Handelns', icon: 'mdi:scale-balance' },
            { title: 'Die drei Erscheinungsweisen', slug: 'philosophie/drei-erscheinungsweisen', description: 'Gunas - Die Kräfte der Natur', icon: 'mdi:triangle-outline' }
          ]
        },
        {
          title: 'Praxis',
          items: [
            { title: 'Vegetarismus & Prasadam', slug: 'philosophie/vegetarismus-prasadam', description: 'Spirituelle Ernährung', icon: 'mdi:food-apple' },
            { title: 'Guru & Schülernachfolge', slug: 'philosophie/guru-schuelernachfolge', description: 'Die spirituelle Tradition', icon: 'mdi:account-star' }
          ]
        }
      ],
      featured: {
        title: 'Bhagavad-gītā',
        description: 'Beginnen Sie mit dem wichtigsten Text der vedischen Philosophie',
        href: '/philosophie/vedische-schriften'
      }
    },
    {
      title: 'Literatur',
      slug: 'literature',
      icon: 'mdi:library',
      subtitle: 'Bücher & vedische Schriften',
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
      subtitle: 'Meditation, Kurse & Retreats',
      sections: [
        {
          title: 'Tägliche Praxis',
          items: [
            { title: 'Meditation & Mantras', slug: 'praxis/meditation-mantras', description: 'Mantra-Meditation und Japa', icon: 'mdi:meditation' },
            { title: 'Tempelbesuch', slug: 'praxis/tempelbesuch', description: 'Gottesdienst und Darshan', icon: 'mdi:temple-hindu' },
            { title: 'Sadhana', slug: 'praxis/sadhana', description: 'Spirituelle Disziplin', icon: 'mdi:sunrise' }
          ]
        },
        {
          title: 'Lernen & Vertiefen',
          items: [
            { title: 'Online-Kurse', slug: 'praxis/online-kurse', description: 'Strukturierte spirituelle Bildung', icon: 'mdi:school' },
            { title: 'Studiengruppen', slug: 'praxis/studiengruppen', description: 'Gemeinsam die Schriften studieren', icon: 'mdi:account-group' },
            { title: 'Retreats', slug: 'praxis/retreats', description: 'Spirituelle Auszeiten', icon: 'mdi:nature-people' }
          ]
        }
      ],
      featured: {
        title: 'Bhakti-Yoga Kurs',
        description: 'Beginnen Sie Ihre spirituelle Reise mit unserem Grundkurs',
        href: '/praxis/online-kurse'
      }
    },
    {
      title: 'Community',
      slug: 'community',
      icon: 'mdi:account-group',
      subtitle: 'Blog, Neuigkeiten & Gemeinschaft',
      sections: [
        {
          title: 'Aktuelles & Austausch',
          items: [
            { title: 'Blog', slug: 'blog', description: 'Neuigkeiten und spirituelle Artikel', icon: 'mdi:newspaper' },
            { title: 'Community', slug: 'community', description: 'Unsere Gemeinschaft im Überblick', icon: 'mdi:account-group' }
          ]
        }
      ],
      featured: {
        title: 'Aktueller Blog',
        description: 'Lesen Sie die neuesten Artikel und Nachrichten aus der ISKCON Community',
        href: '/blog'
      }
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
      subtitle: 'Wer wir sind & unsere Mission',
      sections: [
        {
          title: 'ISKCON Deutschland',
          items: [
            { title: 'Über uns', slug: 'ueber-uns', description: 'ISKCON im Überblick', icon: 'mdi:information' },
            { title: 'Die Bewegung', slug: 'bewegung', description: 'Unsere spirituelle Gemeinschaft', icon: 'mdi:account-group' },
            { title: 'Geschichte', slug: 'geschichte', description: 'Von 1965 bis heute', icon: 'mdi:history' },
          ]
        },
        {
          title: 'Organisation',
          items: [
            { title: 'GBC', slug: 'gbc', description: 'Spirituelle Führung', icon: 'mdi:office-building' },
            { title: 'ISKCON Weltweit', slug: 'iskcon-weltweit', description: '600+ Tempel global', icon: 'mdi:earth' }
          ]
        }
      ],
      featured: {
        title: 'Srila Prabhupada',
        description: 'Lernen Sie unseren Gründer-Acharya kennen',
        href: '/srila-prabhupada',
        image: 'https://iskconnetrokona.wordpress.com/wp-content/uploads/2016/12/cropped-srila-prabhupada-blissful-japa2.jpg?w=329&h=311'
      }
    },
    {
      title: 'Events',
      slug: 'events',
      icon: 'mdi:calendar-star',
      subtitle: 'Feste, Kurse & Veranstaltungen',
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
      title: 'Philosophie',
      slug: 'philosophie', 
      icon: 'mdi:book-open-page-variant',
      sections: [
        {
          title: 'Grundlagen',
          items: [
            { title: 'Krishna', slug: 'philosophie/krishna', description: 'Die Höchste Persönlichkeit Gottes', icon: 'mdi:crown' },
            { title: 'Vedische Schriften', slug: 'philosophie/vedische-schriften', description: 'Die zeitlose Weisheit der Veden', icon: 'mdi:book-ancient' },
            { title: 'Bhakti-Yoga', slug: 'philosophie/bhakti-yoga', description: 'Der Pfad der liebenden Hingabe', icon: 'mdi:yoga' }
          ]
        },
        {
          title: 'Vertiefung',
          items: [
            { title: 'Seele & Reinkarnation', slug: 'philosophie/seele-reinkarnation', description: 'Das ewige Selbst verstehen', icon: 'mdi:infinity' },
            { title: 'Karma & Dharma', slug: 'philosophie/karma-dharma', description: 'Universelle Gesetze des Handelns', icon: 'mdi:scale-balance' },
            { title: 'Die drei Erscheinungsweisen', slug: 'philosophie/drei-erscheinungsweisen', description: 'Gunas - Die Kräfte der Natur', icon: 'mdi:triangle-outline' }
          ]
        },
        {
          title: 'Praxis',
          items: [
            { title: 'Vegetarismus & Prasadam', slug: 'philosophie/vegetarismus-prasadam', description: 'Spirituelle Ernährung', icon: 'mdi:food-apple' },
            { title: 'Guru & Schülernachfolge', slug: 'philosophie/guru-schuelernachfolge', description: 'Die spirituelle Tradition', icon: 'mdi:account-star' }
          ]
        }
      ]
    },
    {
      title: 'Literatur',
      slug: 'literature', 
      icon: 'mdi:library',
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
      subtitle: 'Meditation, Kurse & Retreats',
      sections: [
        {
          title: 'Tägliche Praxis',
          items: [
            { title: 'Meditation & Mantras', slug: 'praxis/meditation-mantras', description: 'Mantra-Meditation und Japa', icon: 'mdi:meditation' },
            { title: 'Tempelbesuch', slug: 'praxis/tempelbesuch', description: 'Gottesdienst und Darshan', icon: 'mdi:temple-hindu' },
            { title: 'Sadhana', slug: 'praxis/sadhana', description: 'Spirituelle Disziplin', icon: 'mdi:sunrise' }
          ]
        },
        {
          title: 'Lernen & Vertiefen',
          items: [
            { title: 'Online-Kurse', slug: 'praxis/online-kurse', description: 'Strukturierte spirituelle Bildung', icon: 'mdi:school' },
            { title: 'Studiengruppen', slug: 'praxis/studiengruppen', description: 'Gemeinsam die Schriften studieren', icon: 'mdi:account-group' }
          ]
        }
      ]
    },
    {
      title: 'Community',
      slug: 'community',
      icon: 'mdi:account-group',
      subtitle: 'Blog, Neuigkeiten & Gemeinschaft',
      sections: [
        {
          title: 'Aktuelles & Austausch',
          items: [
            { title: 'Blog', slug: 'blog', description: 'Neuigkeiten und spirituelle Artikel', icon: 'mdi:newspaper' },
            { title: 'Community', slug: 'community', description: 'Unsere Gemeinschaft im Überblick', icon: 'mdi:account-group' }
          ]
        }
      ],
      featured: {
        title: 'Aktueller Blog',
        description: 'Lesen Sie die neuesten Artikel und Nachrichten aus der ISKCON Community',
        href: '/blog'
      }
    }
  ];
}