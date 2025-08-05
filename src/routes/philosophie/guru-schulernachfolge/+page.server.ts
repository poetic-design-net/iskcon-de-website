import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // Navigation data for philosophy pages
  const navigation = {
    prev: {
      title: 'Vegetarismus & Prasadam',
      slug: 'vegetarismus-prasadam',
      description: 'Spirituelle Ernährung und geweihte Speise'
    },
    next: null // This is the last philosophy page
  };

  return {
    navigation
  };
};