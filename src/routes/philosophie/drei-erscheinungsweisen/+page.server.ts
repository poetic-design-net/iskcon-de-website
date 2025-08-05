import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // Navigation data for philosophy pages
  const navigation = {
    prev: {
      title: 'Karma & Dharma',
      slug: 'karma-dharma',
      description: 'Die universellen Gesetze von Ursache und Wirkung'
    },
    next: {
      title: 'Vegetarismus & Prasadam',
      slug: 'vegetarismus-prasadam',
      description: 'Spirituelle Ernährung und geweihte Speise'
    }
  };

  return {
    navigation
  };
};