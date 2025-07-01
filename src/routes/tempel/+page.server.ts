import type { PageServerLoad } from './$types';
import { templeQueries } from '$lib/sanity/queries';

export const load: PageServerLoad = async () => {
  try {
    // Lade alle aktiven Tempel für die Übersichtsseite
    const temples = await templeQueries.getAllTemples();
    const activeTemples = temples.filter(temple => temple.isActive);
    
    return {
      temples: activeTemples,
      meta: {
        title: 'ISKCON Tempel in Deutschland',
        description: 'Entdecken Sie alle ISKCON Zentren und Tempel in Deutschland. Finden Sie den nächsten Tempel in Ihrer Nähe.'
      }
    };
  } catch (error) {
    console.error('Fehler beim Laden der Tempel:', error);
    return {
      temples: [],
      meta: {
        title: 'ISKCON Tempel',
        description: 'ISKCON Zentren in Deutschland'
      }
    };
  }
};