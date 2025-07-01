import { error } from '@sveltejs/kit';
import { eventQueries } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  try {
    const event = await eventQueries.getEventBySlug(params.slug);
    
    if (!event) {
      throw error(404, {
        message: 'Event nicht gefunden'
      });
    }
    
    return {
      event,
      meta: {
        title: event.seo?.title || `${event.title} - ISKCON Deutschland`,
        description: event.seo?.description || event.description || `Details zum Event: ${event.title}`,
        keywords: event.seo?.keywords || event.tags || []
      }
    };
  } catch (err) {
    console.error('Error loading event:', err);
    throw error(404, {
      message: 'Event nicht gefunden'
    });
  }
};