import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { templeQueries } from '$lib/sanity/queries';

export const load: PageServerLoad = async ({ params }) => {
  try {
    // Lade spezifischen Tempel
    const temples = await templeQueries.getAllTemples();
    const temple = temples.find(t => t.slug === params.slug);
    
    if (!temple) {
      throw error(404, {
        message: `Tempel "${params.slug}" nicht gefunden`
      });
    }

    return {
      temple,
      meta: {
        title: `${temple.name} - ISKCON ${temple.address.city}`,
        description: temple.description || `Besuchen Sie den ISKCON Tempel in ${temple.address.city}. Erfahren Sie mehr über Öffnungszeiten, Veranstaltungen und Kontaktinformationen.`
      }
    };
  } catch (err) {
    console.error(`Fehler beim Laden des Tempels ${params.slug}:`, err);
    throw error(404, {
      message: 'Tempel nicht gefunden'
    });
  }
};