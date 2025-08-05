import type { PageServerLoad } from './$types';

// Helper Funktion für Navigation
function getNavigation(currentSlug: string) {
  const philosophyOrder = [
    'bhakti-yoga',
    'vedische-schriften', 
    'krishna',
    'seele-reinkarnation',
    'karma-dharma',
    'drei-erscheinungsweisen',
    'vegetarismus-prasadam',
    'guru-parampara'
  ];
  
  const staticPhilosophyPages: Record<string, any> = {
    'bhakti-yoga': {
      title: 'Bhakti-Yoga',
      slug: 'bhakti-yoga',
      description: 'Der Pfad der liebenden Hingabe zu Krishna',
      featuredImage: '/images/philosophy/bhakti-yoga.jpg'
    },
    'vedische-schriften': {
      title: 'Vedische Schriften', 
      slug: 'vedische-schriften',
      description: 'Die zeitlose Weisheit der heiligen Texte',
      featuredImage: '/images/philosophy/vedische-schriften.jpg'
    },
    'krishna': {
      title: 'Krishna',
      slug: 'krishna',
      description: 'Die Höchste Persönlichkeit Gottes',
      featuredImage: '/images/philosophy/krishna.jpg'
    },
    'seele-reinkarnation': {
      title: 'Seele & Reinkarnation',
      slug: 'seele-reinkarnation',
      description: 'Die ewige Natur des Selbst',
      featuredImage: '/images/philosophy/seele-reinkarnation.jpg'
    },
    'karma-dharma': {
      title: 'Karma & Dharma',
      slug: 'karma-dharma',
      description: 'Das Gesetz von Ursache und Wirkung',
      featuredImage: '/images/philosophy/karma-dharma.jpg'
    },
    'drei-erscheinungsweisen': {
      title: 'Die drei Erscheinungsweisen',
      slug: 'drei-erscheinungsweisen',
      description: 'Sattva, Rajas und Tamas',
      featuredImage: '/images/philosophy/drei-erscheinungsweisen.jpg'
    },
    'vegetarismus-prasadam': {
      title: 'Vegetarismus & Prasadam',
      slug: 'vegetarismus-prasadam',
      description: 'Spirituelle Ernährung',
      featuredImage: '/images/philosophy/vegetarismus-prasadam.jpg'
    },
    'guru-parampara': {
      title: 'Guru & Schülernachfolge',
      slug: 'guru-parampara',
      description: 'Die Bedeutung der authentischen spirituellen Führung',
      featuredImage: '/images/philosophy/guru-parampara.jpg'
    }
  };
  
  const currentIndex = philosophyOrder.indexOf(currentSlug);
  const prevSlug = currentIndex > 0 ? philosophyOrder[currentIndex - 1] : null;
  const nextSlug = currentIndex < philosophyOrder.length - 1 ? philosophyOrder[currentIndex + 1] : null;
  
  return {
    prev: prevSlug ? staticPhilosophyPages[prevSlug] : null,
    next: nextSlug ? staticPhilosophyPages[nextSlug] : null
  };
}

export const load: PageServerLoad = async () => {
  const navigation = getNavigation('vedische-schriften');
  
  return {
    navigation
  };
};