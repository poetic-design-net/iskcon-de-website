import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // Navigation data for philosophy pages
  const navigation = {
    prev: {
      title: 'Krishna',
      slug: 'krishna',
      description: 'Die Höchste Persönlichkeit Gottes - die Quelle aller Inkarnationen'
    },
    next: {
      title: 'Karma & Dharma',
      slug: 'karma-dharma',
      description: 'Das Gesetz von Ursache und Wirkung und die ewige Pflicht'
    }
  };

  return {
    navigation
  };
};