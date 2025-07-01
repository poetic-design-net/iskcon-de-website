import type { PageServerLoad } from './$types';
import { eventQueries } from '$lib/sanity/queries';
import { client } from '$lib/sanity/client';

export const load: PageServerLoad = async () => {
  try {
    console.log('🚀 Starting events page load...');
    
    // Events und Event-Kategorien parallel laden
    const [events, featuredEvents, eventCategories] = await Promise.all([
      eventQueries.getAllEvents(),
      eventQueries.featuredEvents(),
      getEventCategories()
    ]);
    
    console.log('✅ All data loaded:', {
      eventsCount: events.length,
      featuredCount: featuredEvents.length,
      categoriesCount: eventCategories.length
    });

    return {
      events,
      featuredEvents,
      eventCategories,
      meta: {
        title: 'Veranstaltungen - ISKCON Deutschland',
        description: 'Entdecken Sie unsere spirituellen Events, Festivals und Veranstaltungen. Erleben Sie die Kraft der Gemeinschaft und spirituellen Praxis.',
        keywords: ['ISKCON', 'Events', 'Veranstaltungen', 'Festivals', 'Kirtan', 'Bhagavad Gita', 'Spiritualität', 'Deutschland']
      }
    };
  } catch (error) {
    console.error('Fehler beim Laden der Events-Seite:', error);
    
    return {
      events: [],
      featuredEvents: [],
      eventCategories: [],
      meta: {
        title: 'Veranstaltungen - ISKCON Deutschland',
        description: 'Entdecken Sie unsere spirituellen Events, Festivals und Veranstaltungen.',
        keywords: ['ISKCON', 'Events', 'Veranstaltungen']
      }
    };
  }
};

// Event-Kategorien dynamisch aus Sanity laden
async function getEventCategories() {
  try {
    // Erst testen: Alle Event-Kategorien ohne Filter
    const testQuery = `*[_type == "eventCategory"] {
      title,
      'slug': slug.current,
      description,
      icon,
      color,
      sortOrder,
      isActive
    }`;
    
    const allCategories = await client.fetch(testQuery);
    console.log('🧪 ALLE Event-Kategorien (Test):', allCategories);
    
    // Dann normale Query
    const query = `*[_type == "eventCategory" && isActive == true] | order(sortOrder asc) {
      title,
      'slug': slug.current,
      description,
      icon,
      color,
      sortOrder
    }`;
    
    const categories = await client.fetch(query);
    console.log('📋 Event-Kategorien geladen:', categories.length);
    console.log('📋 Event-Kategorien Details:', categories);
    return categories;
  } catch (error) {
    console.error('❌ Fehler beim Laden der Event-Kategorien:', error);
    return [];
  }
}