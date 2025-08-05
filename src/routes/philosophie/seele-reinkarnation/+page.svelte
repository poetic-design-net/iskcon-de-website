<script lang="ts">
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';
  import { Button } from '$lib/components/ui/button';
  import QuoteCarousel from '$lib/components/sections/QuoteCarousel.svelte';
  import Accordion from '$lib/components/ui/accordion.svelte';
  import CTASection from '$lib/components/sections/CTASection.svelte';
  import NavigationSection from '$lib/components/sections/NavigationSection.svelte';
  
  import type { PageData } from './$types';
  
  export let data: PageData;
  const { navigation } = data;
  
  // State
  let selectedConcept = 0;
  let showSanskrit = false;
  
  // Quotes about the soul
  const quotes = [
    {
      sanskrit: 'न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः',
      text: 'Für die Seele gibt es weder Geburt noch Tod. Sie ist nicht entstanden, entsteht nicht und wird nicht entstehen.',
      source: 'Bhagavad-gītā 2.20'
    },
    {
      sanskrit: 'वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि',
      text: 'Wie ein Mensch alte Kleider ablegt und neue anzieht, so gibt die Seele alte Körper auf und nimmt neue an.',
      source: 'Bhagavad-gītā 2.22'
    },
    {
      sanskrit: 'देहिनोऽस्मिन्यथा देहे कौमारं यौवनं जरा',
      text: 'Wie die verkörperte Seele in diesem Körper von Kindheit zu Jugend und zu Alter wandert, so wandert sie beim Tod in einen anderen Körper.',
      source: 'Bhagavad-gītā 2.13'
    }
  ];
  
  // Key concepts
  const concepts = [
    {
      title: 'Die Natur der Seele (Ātmā)',
      icon: 'mdi:flare',
      description: 'Die Seele ist das wahre Selbst - ewig, unveränderlich und voller Bewusstsein.',
      details: {
        qualities: [
          'Sat (ewig) - Die Seele wird niemals geboren und stirbt niemals',
          'Cit (bewusst) - Die Seele ist die Quelle des Bewusstseins',
          'Ānanda (glückselig) - Die natürliche Eigenschaft der Seele ist Freude'
        ],
        size: 'Die Seele ist winzig klein - ein Zehntausendstel der Spitze eines Haares',
        location: 'Sie befindet sich im Herzen und durchdringt den ganzen Körper mit Bewusstsein',
        symptoms: 'Bewusstsein ist das Symptom der Seele, wie Licht das Symptom der Sonne ist'
      }
    },
    {
      title: 'Der Kreislauf der Wiedergeburt (Saṁsāra)',
      icon: 'mdi:infinity',
      description: 'Die ewige Wanderung der Seele durch verschiedene Körper und Lebensformen.',
      details: {
        forms: '8.400.000 Lebensformen existieren im Universum',
        journey: 'Die Seele wandert entsprechend ihrem Karma und ihren Wünschen',
        human: 'Die menschliche Form ist besonders - sie ermöglicht Selbstverwirklichung',
        goal: 'Das Ziel ist es, den Kreislauf zu verlassen und nach Hause zu Gott zurückzukehren'
      }
    },
    {
      title: 'Das Gesetz des Karma',
      icon: 'mdi:scale-balance',
      description: 'Jede Handlung erzeugt eine Reaktion, die die zukünftige Geburt bestimmt.',
      details: {
        types: [
          'Karma - gegenwärtige Handlungen',
          'Vikarma - sündhafte Handlungen',
          'Akarma - befreiende Handlungen'
        ],
        influence: 'Karma bestimmt die Art des nächsten Körpers',
        freedom: 'Durch hingebungsvolles Dienen kann man sich vom Karma befreien',
        consciousness: 'Der Bewusstseinszustand beim Tod bestimmt die nächste Geburt'
      }
    },
    {
      title: 'Befreiung (Mokṣa)',
      icon: 'mdi:white-balance-sunny',
      description: 'Die endgültige Befreiung vom Kreislauf der Wiedergeburt.',
      details: {
        types: [
          'Sāyujya - Verschmelzung mit dem Brahman',
          'Sārūpya - Gleiche Form wie der Herr',
          'Sālokya - Leben auf demselben Planeten',
          'Sāmīpya - Persönliche Gemeinschaft',
          'Sārṣṭi - Gleiche Füllen wie der Herr'
        ],
        path: 'Bhakti-Yoga ist der direkteste Weg zur Befreiung',
        destination: 'Die spirituelle Welt - unser ewiges Zuhause',
        nature: 'Befreiung bedeutet, unsere ewige Beziehung zu Krishna wiederzuerlangen'
      }
    }
  ];
  
  // Reincarnation stages
  const reincarnationStages = [
    {
      title: 'Leben',
      description: 'Die Seele bewohnt einen Körper und sammelt Erfahrungen',
      icon: 'mdi:human'
    },
    {
      title: 'Tod',
      description: 'Die Seele verlässt den groben Körper',
      icon: 'mdi:weather-sunset'
    },
    {
      title: 'Zwischenzustand',
      description: 'Die Seele reist im feinstofflichen Körper',
      icon: 'mdi:weather-cloudy'
    },
    {
      title: 'Neue Geburt',
      description: 'Die Seele nimmt entsprechend ihrem Karma einen neuen Körper an',
      icon: 'mdi:baby'
    }
  ];
</script>

<svelte:head>
  <title>Die Seele und Reinkarnation - Ewiges Selbst | ISKCON Deutschland</title>
  <meta name="description" content="Verstehen Sie die vedische Wissenschaft der Seele (Ātmā) und Reinkarnation. Die ewige Natur des Selbst und der Weg zur Befreiung." />
</svelte:head>

<!-- Hero Section -->
<section class="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
  <!-- Background Pattern -->
  <div class="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
    <!-- Animated soul particles -->
    <div class="absolute inset-0">
      {#each Array(20) as _, i}
        <div 
          class="absolute w-2 h-2 bg-primary-500/20 rounded-full animate-float"
          style="left: {Math.random() * 100}%; top: {Math.random() * 100}%; animation-delay: {Math.random() * 10}s"
        ></div>
      {/each}
    </div>
  </div>
  
  <!-- Content -->
  <div class="relative z-10 container mx-auto px-4 text-center">
    <h1 class="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
      Die Seele und Reinkarnation
    </h1>
    <p class="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
      Das ewige Selbst jenseits von Geburt und Tod - 
      Die vedische Wissenschaft vom wahren Ich
    </p>
    
    <!-- Sanskrit Toggle -->
    <Button
      on:click={() => showSanskrit = !showSanskrit}
      variant="soft"
      size="lg"
      class="shadow-md"
    >
      <Icon icon="mdi:translate" class="w-5 h-5" />
      {showSanskrit ? 'Übersetzung' : 'Sanskrit'} anzeigen
    </Button>
  </div>
  
  <!-- Decorative Elements -->
  <div class="absolute bottom-0 left-0 w-64 h-64 bg-primary-500 rounded-full filter blur-3xl opacity-10 -translate-x-32 translate-y-32"></div>
  <div class="absolute top-0 right-0 w-96 h-96 bg-gray-300 rounded-full filter blur-3xl opacity-10 translate-x-48 -translate-y-48"></div>
</section>

<!-- Key Concepts Section -->
<section class="py-16 md:py-24">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
      Grundlegende Konzepte
    </h2>
    
    <!-- Concept Selector -->
    <div class="flex flex-wrap justify-center gap-4 mb-12">
      {#each concepts as concept, index}
        <button
          on:click={() => selectedConcept = index}
          class="px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2
                 {selectedConcept === index 
                   ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg scale-105' 
                   : 'bg-white text-gray-700 shadow-md hover:shadow-lg'}"
        >
          <Icon icon={concept.icon} class="w-5 h-5" />
          {concept.title}
        </button>
      {/each}
    </div>
    
    <!-- Concept Display -->
    <div class="max-w-4xl mx-auto">
      <div class="bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-xl overflow-hidden border border-primary-500/20">
        <div class="p-8 md:p-12">
          <div class="flex items-start gap-4 mb-6">
            <div class="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon icon={concepts[selectedConcept].icon} class="w-8 h-8 text-primary-500" />
            </div>
            <div>
              <h3 class="text-2xl font-bold mb-2">{concepts[selectedConcept].title}</h3>
              <p class="text-gray-700">{concepts[selectedConcept].description}</p>
            </div>
          </div>
          
          <div class="space-y-6">
            {#each Object.entries(concepts[selectedConcept].details) as [key, value]}
              <div>
                <h4 class="font-semibold text-gray-800 mb-2 capitalize">{key}:</h4>
                {#if Array.isArray(value)}
                  <ul class="space-y-2">
                    {#each value as item}
                      <li class="flex items-start gap-2">
                        <Icon icon="mdi:circle-small" class="w-5 h-5 text-primary-500/60 mt-0.5" />
                        <span class="text-gray-600">{item}</span>
                      </li>
                    {/each}
                  </ul>
                {:else}
                  <p class="text-gray-600">{value}</p>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Reincarnation Process -->
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-4">
      Der Prozess der Wiedergeburt
    </h2>
    <p class="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
      Wie die Seele von einem Körper zum nächsten wandert
    </p>
    
    <div class="max-w-4xl mx-auto">
      <div class="relative">
        <!-- Connection lines -->
        <div class="absolute top-1/2 left-0 right-0 h-0.5 bg-primary-500/20 -translate-y-1/2 hidden md:block"></div>
        
        <!-- Stages -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          {#each reincarnationStages as stage, index}
            <div class="relative">
              <div class="bg-white rounded-lg p-6 shadow-lg text-center relative z-10">
                <div class="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon icon={stage.icon} class="w-8 h-8 text-primary-500" />
                </div>
                <h3 class="font-bold text-lg mb-2">{stage.title}</h3>
                <p class="text-sm text-gray-600">{stage.description}</p>
              </div>
              
              {#if index < reincarnationStages.length - 1}
                <div class="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                  <Icon icon="mdi:chevron-right" class="w-6 h-6 text-primary-500" />
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Cycle indicator -->
      <div class="mt-8 text-center">
        <div class="inline-flex items-center gap-2 text-primary-500">
          <Icon icon="mdi:infinity" class="w-6 h-6" />
          <span class="font-medium">Endloser Kreislauf bis zur Befreiung</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Quote Carousel -->
<QuoteCarousel 
  {quotes} 
  title="Weisheit aus der Bhagavad-gītā"
  bgColor="bg-white"
/>

<!-- Practical Understanding -->
<section class="py-16 md:py-24">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
      Praktisches Verständnis
    </h2>
    
    <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Signs of the Soul -->
      <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <div class="flex items-center gap-3 mb-6">
          <Icon icon="mdi:eye" class="w-8 h-8 text-primary-500" />
          <h3 class="text-xl font-bold">Zeichen der Seele</h3>
        </div>
        
        <div class="space-y-4">
          <div class="flex items-start gap-3">
            <Icon icon="mdi:check-circle" class="w-5 h-5 text-primary-500/60 mt-0.5" />
            <div>
              <h4 class="font-semibold text-gray-800">Bewusstsein</h4>
              <p class="text-sm text-gray-600">Die Fähigkeit zu denken, fühlen und wahrzunehmen</p>
            </div>
          </div>
          
          <div class="flex items-start gap-3">
            <Icon icon="mdi:check-circle" class="w-5 h-5 text-primary-500/60 mt-0.5" />
            <div>
              <h4 class="font-semibold text-gray-800">Individualität</h4>
              <p class="text-sm text-gray-600">Jede Seele ist einzigartig und ewig individuell</p>
            </div>
          </div>
          
          <div class="flex items-start gap-3">
            <Icon icon="mdi:check-circle" class="w-5 h-5 text-primary-500/60 mt-0.5" />
            <div>
              <h4 class="font-semibold text-gray-800">Streben nach Glück</h4>
              <p class="text-sm text-gray-600">Die natürliche Suche nach Freude und Erfüllung</p>
            </div>
          </div>
          
          <div class="flex items-start gap-3">
            <Icon icon="mdi:check-circle" class="w-5 h-5 text-primary-500/60 mt-0.5" />
            <div>
              <h4 class="font-semibold text-gray-800">Lebenswille</h4>
              <p class="text-sm text-gray-600">Der angeborene Wunsch zu existieren</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Liberation Path -->
      <div class="bg-gradient-to-br from-primary-500/5 to-white rounded-xl shadow-lg p-8 border border-primary-500/20">
        <div class="flex items-center gap-3 mb-6">
          <Icon icon="mdi:lotus" class="w-8 h-8 text-primary-500" />
          <h3 class="text-xl font-bold">Weg zur Befreiung</h3>
        </div>
        
        <div class="space-y-4">
          <div class="flex items-start gap-3">
            <span class="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
            <div>
              <h4 class="font-semibold text-gray-800">Wissen erlangen</h4>
              <p class="text-sm text-gray-600">Die Natur der Seele verstehen</p>
            </div>
          </div>
          
          <div class="flex items-start gap-3">
            <span class="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
            <div>
              <h4 class="font-semibold text-gray-800">Praktizieren</h4>
              <p class="text-sm text-gray-600">Spirituelle Übungen aufnehmen</p>
            </div>
          </div>
          
          <div class="flex items-start gap-3">
            <span class="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
            <div>
              <h4 class="font-semibold text-gray-800">Entsagung</h4>
              <p class="text-sm text-gray-600">Materielle Anhaftungen lösen</p>
            </div>
          </div>
          
          <div class="flex items-start gap-3">
            <span class="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
            <div>
              <h4 class="font-semibold text-gray-800">Hingabe</h4>
              <p class="text-sm text-gray-600">Liebe zu Gott entwickeln</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Call to Action -->
<CTASection
  title="Entdecken Sie Ihr wahres Selbst"
  subtitle="Beginnen Sie Ihre spirituelle Reise und verstehen Sie die ewige Natur Ihrer Seele"
  primaryButton={{
    text: 'Mehr in den Schriften lesen',
    href: '/literature?topic=seele',
    icon: 'mdi:book-open-variant'
  }}
  secondaryButton={{
    text: 'Philosophie-Kurse besuchen',
    href: '/events?category=philosophie',
    icon: 'mdi:school'
  }}
/>

<!-- Navigation -->
<NavigationSection {navigation} />

<style>
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
  
  .animate-float {
    animation: float 20s ease-in-out infinite;
  }
</style>