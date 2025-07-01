<script lang="ts">
  import { ThemeTeaserSection } from '$lib/components/sections/homepage';
  import type { SanityHomepageTeaser } from '$lib/types';

  // Test-Daten mit verschiedenen Layouts
  const testTeasers: SanityHomepageTeaser[] = [
    {
      _id: 'homepage-teaser-bhakti-yoga',
      _type: 'homepageTeaser',
      theme: 'bhakti-yoga',
      layout: 'imageLeft',
      headline: 'Bhakti Yoga - Der Pfad der Hingabe',
      teaser: 'Bhakti Yoga ist der direkte Weg zu Gott durch liebevolle Hingabe. Erfahren Sie, wie diese uralte Praxis Ihr Leben mit Freude, Sinn und spiritueller Verbindung erfüllen kann.',
      highlight: 'Der natürliche Weg der Seele',
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-06ec19dda20300302ff6560b58c98ed7e8d18dbb-1536x1024-png',
          _type: 'reference'
        }
      },
      ctaText: 'Bhakti Yoga entdecken',
      ctaLink: { _ref: 'dK6PEpLIA3wekoxdEJ81nd', _type: 'reference', current: '/bhakti-yoga' },
      order: 2
    },
    {
      _id: 'homepage-teaser-tempel-besuchen',
      _type: 'homepageTeaser',
      theme: 'tempel-besuchen',
      layout: 'imageLeft',
      headline: 'Besuchen Sie unsere Tempel',
      teaser: 'Unsere Tempel sind Oasen der Spiritualität, offen für alle Menschen. Erleben Sie die friedvolle Atmosphäre, nehmen Sie an Zeremonien teil und genießen Sie vegetarisches Prasadam.',
      highlight: 'Alle sind herzlich willkommen',
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-30dcc2ecba8cbdc36912e410b0b6d0a48fbe40c9-2540x1693-webp',
          _type: 'reference'
        }
      },
      ctaText: 'Tempel in Ihrer Nähe finden',
      ctaLink: { _ref: 'F9zz6KiV60hqnnFV2lwwwL', _type: 'reference', current: '/tempel' },
      order: 4
    },
    {
      _id: 'homepage-teaser-hare-krishna',
      _type: 'homepageTeaser',
      theme: 'hare-krishna',
      layout: 'imageRight',
      headline: 'Hare Krishna - Der Heilige Name',
      teaser: 'Entdecken Sie die transformative Kraft des Hare Krishna Mantras. Diese zeitlose Praxis der Meditation und Hingabe öffnet das Herz und bringt inneren Frieden.',
      highlight: 'Die Essenz der vedischen Weisheit',
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-placeholder-1',
          _type: 'reference'
        }
      },
      ctaText: 'Mehr über das Mantra',
      ctaLink: { _ref: 'ref-1', _type: 'reference', current: '/hare-krishna' },
      order: 1
    },
    {
      _id: 'homepage-teaser-meditation',
      _type: 'homepageTeaser',
      theme: 'mantra-meditation',
      layout: 'imageFull',
      headline: 'Mantra Meditation',
      teaser: 'Finden Sie innere Ruhe und spirituelle Verbindung durch die Praxis der Mantra-Meditation. Eine jahrtausendealte Technik für den modernen Menschen.',
      highlight: 'Stille im Geist, Frieden im Herzen',
      image: {
        _type: 'image',
        asset: {
          _ref: 'image-placeholder-2',
          _type: 'reference'
        }
      },
      ctaText: 'Meditation lernen',
      ctaLink: { _ref: 'ref-2', _type: 'reference', current: '/meditation' },
      order: 3
    }
  ];
</script>

<main class="min-h-screen bg-gray-50">
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-medium text-center mb-8">Test: Vereinfachte Theme Teaser Section</h1>
    
    <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 class="text-xl font-medium mb-4">Test-Information</h2>
      <ul class="space-y-2 text-gray-600">
        <li>• 2 Teaser mit <code class="bg-gray-100 px-2 py-1 rounded">imageLeft</code> Layout (sollten als Slider erscheinen)</li>
        <li>• 1 Teaser mit <code class="bg-gray-100 px-2 py-1 rounded">imageRight</code> Layout (sollte einzeln erscheinen)</li>
        <li>• 1 Teaser mit <code class="bg-gray-100 px-2 py-1 rounded">imageFull</code> Layout (sollte einzeln erscheinen)</li>
      </ul>
    </div>
  </div>

  <!-- Theme Teaser Section -->
  <ThemeTeaserSection teasers={testTeasers} />
</main>