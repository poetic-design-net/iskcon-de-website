import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // Navigation data for philosophy pages
  const navigation = {
    prev: {
      title: 'Die drei Erscheinungsweisen',
      slug: 'drei-erscheinungsweisen',
      description: 'Die drei Gunas - Tugend, Leidenschaft und Unwissenheit'
    },
    next: {
      title: 'Guru & Schülernachfolge',
      slug: 'guru-schulernachfolge',
      description: 'Die Bedeutung des spirituellen Meisters'
    }
  };

  return {
    navigation
  };
};