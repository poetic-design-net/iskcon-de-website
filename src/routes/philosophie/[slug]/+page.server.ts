import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { client } from '$lib/sanity/client';

// Philosophie-Seiten Reihenfolge für Navigation
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

// Statische Philosophie-Seiten (falls keine Sanity-Seite existiert)
const staticPhilosophyPages: Record<string, any> = {
  'bhakti-yoga': {
    title: 'Bhakti-Yoga',
    subtitle: 'Der Pfad der liebenden Hingabe',
    category: 'bhakti-yoga',
    icon: '🕉️',
    description: 'Bhakti-Yoga ist der Pfad der liebenden Hingabe zu Krishna, der Höchsten Persönlichkeit Gottes.',
    featuredImage: '/images/philosophy/bhakti-yoga.jpg',
    isStatic: true
  },
  'vedische-schriften': {
    title: 'Vedische Schriften',
    subtitle: 'Die zeitlose Weisheit der heiligen Texte',
    category: 'vedische-schriften',
    icon: '📚',
    description: 'Die vedischen Schriften enthalten das zeitlose Wissen über Gott, die Seele und die materielle Welt.',
    featuredImage: '/images/philosophy/vedische-schriften.jpg',
    isStatic: true
  },
  'krishna': {
    title: 'Krishna - Die Höchste Persönlichkeit Gottes',
    subtitle: 'Das Verständnis der absoluten Wahrheit',
    category: 'krishna',
    icon: '🪈',
    description: 'Krishna ist die ursprüngliche Persönlichkeit Gottes, die Quelle aller Inkarnationen.',
    featuredImage: '/images/philosophy/krishna.jpg',
    isStatic: true
  },
  'seele-reinkarnation': {
    title: 'Die Seele und Reinkarnation',
    subtitle: 'Die ewige Natur des Selbst',
    category: 'seele-reinkarnation',
    icon: '✨',
    description: 'Die Seele ist ewig, voller Wissen und Glückseligkeit, wandert aber durch verschiedene Körper.',
    featuredImage: '/images/philosophy/seele-reinkarnation.jpg',
    isStatic: true
  },
  'karma-dharma': {
    title: 'Karma und Dharma',
    subtitle: 'Das Gesetz von Ursache und Wirkung',
    category: 'karma-dharma',
    icon: '☸️',
    description: 'Karma ist das Gesetz von Aktion und Reaktion, Dharma die ewige Pflicht der Seele.',
    featuredImage: '/images/philosophy/karma-dharma.jpg',
    isStatic: true
  },
  'drei-erscheinungsweisen': {
    title: 'Die drei Erscheinungsweisen',
    subtitle: 'Sattva, Rajas und Tamas',
    category: 'drei-erscheinungsweisen',
    icon: '🌈',
    description: 'Die materielle Natur besteht aus drei Erscheinungsweisen, die das Bewusstsein beeinflussen.',
    featuredImage: '/images/philosophy/drei-erscheinungsweisen.jpg',
    isStatic: true
  },
  'vegetarismus-prasadam': {
    title: 'Vegetarismus und Prasadam',
    subtitle: 'Spirituelle Ernährung',
    category: 'vegetarismus-prasadam',
    icon: '🌿',
    description: 'Vegetarische Ernährung und geweihte Nahrung (Prasadam) reinigen Körper und Geist.',
    featuredImage: '/images/philosophy/vegetarismus-prasadam.jpg',
    isStatic: true
  },
  'guru-parampara': {
    title: 'Guru und Schülernachfolge',
    subtitle: 'Die Bedeutung der authentischen spirituellen Führung',
    category: 'guru-parampara',
    icon: '🙏',
    description: 'Die Schülernachfolge überliefert das spirituelle Wissen unverfälscht von Meister zu Schüler.',
    featuredImage: '/images/philosophy/guru-parampara.jpg',
    isStatic: true
  }
};

// Helper Funktion für Navigation
function getNavigation(currentSlug: string) {
  const currentIndex = philosophyOrder.indexOf(currentSlug);
  const prevSlug = currentIndex > 0 ? philosophyOrder[currentIndex - 1] : null;
  const nextSlug = currentIndex < philosophyOrder.length - 1 ? philosophyOrder[currentIndex + 1] : null;
  
  return {
    prev: prevSlug ? (staticPhilosophyPages[prevSlug] || null) : null,
    next: nextSlug ? (staticPhilosophyPages[nextSlug] || null) : null,
    prevSlug,
    nextSlug
  };
}

export const load: PageServerLoad = async ({ params }) => {
  const { slug } = params;

  // Zuerst versuchen, eine Philosophie-Seite aus Sanity zu laden
  try {
    const query = `*[_type == "philosophyPage" && slug.current == $slug][0]{
      _id,
      _type,
      title,
      "slug": slug.current,
      category,
      description,
      icon,
      content,
      relatedTopics[]->{
        _id,
        title,
        "slug": slug.current,
        description,
        icon
      },
      seo,
      featuredImage
    }`;

    const philosophyPage = await client.fetch(query, { slug });

    if (philosophyPage) {
      // Auch für Sanity-Seiten Navigation holen
      const navigation = getNavigation(slug);
      
      // Versuche Prev/Next aus Sanity zu laden falls vorhanden
      if (navigation.prevSlug) {
        const prevQuery = `*[_type == "philosophyPage" && slug.current == $slug][0]{
          title, "slug": slug.current, icon, description, featuredImage
        }`;
        const prevFromSanity = await client.fetch(prevQuery, { slug: navigation.prevSlug });
        if (prevFromSanity) navigation.prev = prevFromSanity;
      }
      
      if (navigation.nextSlug) {
        const nextQuery = `*[_type == "philosophyPage" && slug.current == $slug][0]{
          title, "slug": slug.current, icon, description, featuredImage
        }`;
        const nextFromSanity = await client.fetch(nextQuery, { slug: navigation.nextSlug });
        if (nextFromSanity) navigation.next = nextFromSanity;
      }
      
      return {
        page: philosophyPage,
        isStatic: false,
        navigation
      };
    }
  } catch (err) {
    console.error('Fehler beim Laden der Philosophie-Seite aus Sanity:', err);
  }

  // Fallback auf statische Seiten
  if (staticPhilosophyPages[slug]) {
    return {
      page: staticPhilosophyPages[slug],
      isStatic: true,
      navigation: getNavigation(slug)
    };
  }

  // Keine Seite gefunden
  throw error(404, {
    message: 'Philosophie-Seite nicht gefunden'
  });
};