import { error } from '@sveltejs/kit';
import { getPageBySlug } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  try {
    const page = await getPageBySlug(params.slug);
    
    if (!page) {
      throw error(404, {
        message: 'Seite nicht gefunden'
      });
    }
    
    return {
      page
    };
  } catch (err) {
    console.error(`Fehler beim Laden der Seite ${params.slug}:`, err);
    throw error(404, {
      message: 'Seite nicht gefunden'
    });
  }
};