import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // Philosophie-Themen für die Übersichtsseite
  const philosophyTopics = [
    {
      title: 'Bhakti-Yoga',
      slug: 'bhakti-yoga',
      description: 'Der Pfad der liebenden Hingabe - die Essenz des spirituellen Lebens',
      icon: '🕉️',
      topics: [
        'Die neun Prozesse des hingebungsvollen Dienstes',
        'Die Bedeutung des Maha-Mantras',
        'Spirituelle Praxis im Alltag'
      ]
    },
    {
      title: 'Vedische Schriften',
      slug: 'vedische-schriften',
      description: 'Die zeitlose Weisheit der heiligen Texte',
      icon: '📚',
      topics: [
        'Bhagavad-gita - Der Gesang Gottes',
        'Srimad-Bhagavatam - Die schöne Geschichte',
        'Caitanya-caritamrita - Das Leben Sri Caitanyas'
      ]
    },
    {
      title: 'Krishna - Die Höchste Persönlichkeit Gottes',
      slug: 'krishna',
      description: 'Das Verständnis der absoluten Wahrheit',
      icon: '🪈',
      topics: [
        'Krishnas Formen und Inkarnationen',
        'Die Spiele Krishnas in Vrindavana',
        'Krishna als Quelle aller Schönheit'
      ]
    },
    {
      title: 'Die Seele und Reinkarnation',
      slug: 'seele-reinkarnation',
      description: 'Die ewige Natur des Selbst',
      icon: '✨',
      topics: [
        'Die unsterbliche Seele (Atma)',
        'Der Kreislauf von Geburt und Tod',
        'Befreiung (Moksha) durch Bhakti'
      ]
    },
    {
      title: 'Karma und Dharma',
      slug: 'karma-dharma',
      description: 'Das Gesetz von Ursache und Wirkung',
      icon: '☸️',
      topics: [
        'Die drei Arten des Karmas',
        'Dharma - Die ewige Pflicht',
        'Karma-Yoga - Handeln ohne Anhaftung'
      ]
    },
    {
      title: 'Die drei Erscheinungsweisen',
      slug: 'drei-erscheinungsweisen',
      description: 'Sattva, Rajas und Tamas - Die Kräfte der materiellen Natur',
      icon: '🌈',
      topics: [
        'Tugend (Sattva-guna)',
        'Leidenschaft (Rajo-guna)',
        'Unwissenheit (Tamo-guna)'
      ]
    },
    {
      title: 'Vegetarismus und Prasadam',
      slug: 'vegetarismus-prasadam',
      description: 'Spirituelle Ernährung und geweihte Nahrung',
      icon: '🌿',
      topics: [
        'Ahimsa - Das Prinzip der Gewaltlosigkeit',
        'Die Kunst des Kochens für Krishna',
        'Prasadam - Gottes Barmherzigkeit'
      ]
    },
    {
      title: 'Guru und Schülernachfolge',
      slug: 'guru-parampara',
      description: 'Die Bedeutung der authentischen spirituellen Führung',
      icon: '🙏',
      topics: [
        'Die Rolle des spirituellen Meisters',
        'Die Schülernachfolge (Parampara)',
        'Srila Prabhupada - Der Gründer-Acharya'
      ]
    }
  ];

  return {
    philosophyTopics
  };
};