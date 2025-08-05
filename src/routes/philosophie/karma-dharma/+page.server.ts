import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // Navigation data for philosophy pages
  const navigation = {
    prev: {
      title: 'Die Seele und Reinkarnation',
      slug: 'seele-reinkarnation',
      description: 'Das ewige Selbst jenseits von Geburt und Tod'
    },
    next: {
      title: 'Die drei Erscheinungsweisen',
      slug: 'drei-erscheinungsweisen',
      description: 'Die drei Gunas - Tugend, Leidenschaft und Unwissenheit'
    }
  };

  return {
    navigation
  };
};