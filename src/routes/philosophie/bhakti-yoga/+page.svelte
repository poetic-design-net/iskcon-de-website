<script lang="ts">
  import Icon from '@iconify/svelte';
  import Hero from './Hero.svelte';
  import NineProcesses from './NineProcesses.svelte';
  import DailyPractice from './DailyPractice.svelte';
  import { Button } from '$lib/components/ui/button';
  import QuoteCarousel from '$lib/components/sections/QuoteCarousel.svelte';
  import CTASection from '$lib/components/sections/CTASection.svelte';
  import NavigationSection from '$lib/components/sections/NavigationSection.svelte';
  
  import type { PageData } from './$types';
  
  export let data: PageData;
  const { navigation } = data;
  
  // Quotes carousel data
  const quotes = [
    {
      text: "Von allen Yogis ist derjenige, der mit großem Vertrauen immer in Mir weilt, an Mich denkt und Mir transzendentalen liebevollen Dienst darbringt, am engsten mit Mir in Yoga vereint und der Höchste von allen.",
      source: "Bhagavad-gita 6.47",
      sanskrit: "योगिनामपि सर्वेषां मद्गतेनान्तरात्मना"
    },
    {
      text: "Bhakti, oder hingebungsvoller Dienst, bedeutet, sich mit allen Sinnen im Dienst des Herrn zu beschäftigen.",
      source: "Bhakti-rasamrita-sindhu 1.1.11",
      sanskrit: "अन्यभिलाषिताशून्यं ज्ञानकर्माद्यनावृतम्"
    },
    {
      text: "Die höchste Vollkommenheit, die man im Leben erreichen kann, besteht darin, sich ständig an Krishna zu erinnern und beim Verlassen des Körpers an Ihn zu denken.",
      source: "Bhagavad-gita 8.5",
      sanskrit: "अन्तकाले च मामेव स्मरन्मुक्त्वा कलेवरम्"
    }
  ];
</script>

<svelte:head>
  <title>Bhakti-Yoga - Der Pfad der liebenden Hingabe | ISKCON Deutschland</title>
  <meta name="description" content="Entdecken Sie Bhakti-Yoga, den Pfad der liebenden Hingabe zu Krishna. Lernen Sie die neun Prozesse des hingebungsvollen Dienstes und die tägliche spirituelle Praxis kennen." />
</svelte:head>

<!-- Hero Section with Video -->
<Hero />

<!-- Introduction -->
<section class="py-16 md:py-20">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto">
      <div class="prose prose-lg max-w-none">
        <p class="text-xl leading-relaxed text-gray-700">
          Bhakti-Yoga ist der Pfad der liebenden Hingabe zu Krishna, der Höchsten Persönlichkeit Gottes. 
          Im Gegensatz zu anderen Yoga-Pfaden, die Entsagung, mystische Kräfte oder philosophisches Wissen betonen, 
          konzentriert sich Bhakti-Yoga auf die Entwicklung einer persönlichen, liebevollen Beziehung zum Göttlichen.
        </p>
        
        <div class="my-8 bg-gray-50 rounded-xl p-8">
          <h3 class="text-2xl font-bold mb-4 text-gray-900">Was macht Bhakti-Yoga einzigartig?</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex gap-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Icon icon="mdi:heart" class="w-6 h-6 text-gray-600" />
                </div>
              </div>
              <div>
                <h4 class="font-semibold mb-1">Persönliche Beziehung</h4>
                <p class="text-sm text-gray-700">Gott ist keine unpersönliche Energie, sondern die höchste Person mit unendlichen Eigenschaften.</p>
              </div>
            </div>
            
            <div class="flex gap-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Icon icon="mdi:account-heart" class="w-6 h-6 text-gray-600" />
                </div>
              </div>
              <div>
                <h4 class="font-semibold mb-1">Für jeden zugänglich</h4>
                <p class="text-sm text-gray-700">Keine Qualifikationen nötig - nur aufrichtiges Verlangen nach spirituellem Fortschritt.</p>
              </div>
            </div>
            
            <div class="flex gap-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Icon icon="mdi:music-note" class="w-6 h-6 text-gray-600" />
                </div>
              </div>
              <div>
                <h4 class="font-semibold mb-1">Freudvolle Praxis</h4>
                <p class="text-sm text-gray-700">Singen, Tanzen und Feiern sind integrale Bestandteile des spirituellen Pfades.</p>
              </div>
            </div>
            
            <div class="flex gap-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Icon icon="mdi:infinity" class="w-6 h-6 text-gray-600" />
                </div>
              </div>
              <div>
                <h4 class="font-semibold mb-1">Ewige Beziehung</h4>
                <p class="text-sm text-gray-700">Die Liebe zu Krishna ist ewig und wird mit jedem Leben stärker.</p>
              </div>
            </div>
          </div>
        </div>
        
        <p class="text-lg text-gray-700">
          Lord Caitanya Mahaprabhu, der vor 500 Jahren erschien, lehrte, dass Bhakti-Yoga der einfachste 
          und natürlichste Weg zur Selbstverwirklichung im gegenwärtigen Zeitalter (Kali-Yuga) ist. 
          Durch einfache Praktiken wie das Chanten des Heiligen Namens kann jeder, unabhängig von 
          Herkunft oder Qualifikation, spirituellen Fortschritt machen.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Nine Processes -->
<NineProcesses />

<!-- Daily Practice Timeline -->
<DailyPractice />

<!-- Quotes Carousel -->
<QuoteCarousel {quotes} />

<!-- Modern CTA -->
<section class="py-16 md:py-20 relative overflow-hidden text-white">
  <!-- Background with Pattern -->
  <div class="absolute inset-0 z-0">
    <!-- SVG Pattern Background -->
    <svg class="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cta-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1f2937;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#374151;stop-opacity:1" />
        </linearGradient>
        <pattern id="temple-pattern" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
          <!-- Temple silhouette -->
          <path d="M75,20 L50,50 L50,130 L100,130 L100,50 Z" fill="#6b7280" opacity="0.1"/>
          <path d="M75,20 L75,10 M70,15 L80,15" stroke="#6b7280" stroke-width="1" opacity="0.2"/>
          <!-- Decorative elements -->
          <circle cx="75" cy="75" r="30" fill="none" stroke="#6b7280" stroke-width="0.5" opacity="0.1"/>
          <path d="M45,130 L45,120 L55,120 L55,130 M95,130 L95,120 L105,120 L105,130" fill="#6b7280" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cta-gradient)"/>
      <rect width="100%" height="100%" fill="url(#temple-pattern)"/>
    </svg>
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-800/90"></div>
  </div>
  
  <!-- Content -->
  <div class="relative z-10">
  <div class="container mx-auto px-4 text-center">
    <h2 class="text-3xl md:text-4xl font-bold mb-6">
      Beginnen Sie Ihre Bhakti-Yoga Reise
    </h2>
    <p class="text-xl mb-8 max-w-2xl mx-auto opacity-90">
      Erleben Sie die transformierende Kraft der göttlichen Liebe durch praktische Anwendung
    </p>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
      <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
        <Icon icon="mdi:book-open-variant" class="w-12 h-12 mx-auto mb-4" />
        <h3 class="font-semibold text-lg mb-2">Studium</h3>
        <p class="text-sm opacity-90">Bhagavad-gita und Srimad-Bhagavatam Kurse</p>
      </div>
      
      <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
        <Icon icon="mdi:music" class="w-12 h-12 mx-auto mb-4" />
        <h3 class="font-semibold text-lg mb-2">Kirtan</h3>
        <p class="text-sm opacity-90">Gemeinsames Singen jeden Abend</p>
      </div>
      
      <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
        <Icon icon="mdi:meditation" class="w-12 h-12 mx-auto mb-4" />
        <h3 class="font-semibold text-lg mb-2">Meditation</h3>
        <p class="text-sm opacity-90">Japa-Workshops für Anfänger</p>
      </div>
    </div>
    
    <div class="flex flex-wrap gap-4 justify-center">
      <Button 
        href="/tempel" 
        variant="default"
        size="lg"
        class="shadow-xl"
      >
        <Icon icon="mdi:map-marker" class="w-5 h-5" />
        Tempel in Ihrer Nähe
      </Button>
      <Button 
        href="/events?category=bhakti-yoga" 
        variant="outline"
        size="lg"
        class="border-white text-white hover:bg-white/10 hover:border-white"
      >
        <Icon icon="mdi:calendar" class="w-5 h-5" />
        Bhakti-Yoga Events
      </Button>
    </div>
  </div>
  </div>
</section>

<!-- Navigation -->
<NavigationSection {navigation} />