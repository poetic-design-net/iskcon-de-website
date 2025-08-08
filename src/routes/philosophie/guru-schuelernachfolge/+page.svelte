<script lang="ts">
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';
  import { Button } from '$lib/components/ui/button';
  import QuoteCarousel from '$lib/components/sections/QuoteCarousel.svelte';
  import CTASection from '$lib/components/sections/CTASection.svelte';
  import NavigationSection from '$lib/components/sections/NavigationSection.svelte';
  
  import type { PageData } from './$types';
  
  export let data: PageData;
  const { navigation } = data;
  
  // State
  let selectedQuality = 0;
  let showLineage = false;
  
  // Quotes
  const quotes = [
    {
      sanskrit: 'तद्विद्धि प्रणिपातेन परिप्रश्नेन सेवया',
      text: 'Versuche die Wahrheit zu erfahren, indem du dich an einen spirituellen Meister wendest. Stelle ihm in ergebener Haltung Fragen und diene ihm.',
      source: 'Bhagavad-gītā 4.34'
    },
    {
      sanskrit: 'एवं परम्पराप्राप्तमिमं राजर्षयो विदुः',
      text: 'Dieses höchste Wissen wurde so durch die Kette der Schülernachfolge empfangen, und die heiligen Könige verstanden es auf diese Weise.',
      source: 'Bhagavad-gītā 4.2'
    },
    {
      sanskrit: 'आचार्यं मां विजानीयान्नावमन्येत कर्हिचित्',
      text: 'Man sollte den Ācārya als Mich Selbst kennen und ihn niemals missachten oder ihn für einen gewöhnlichen Menschen halten.',
      source: 'Śrīmad-Bhāgavatam 11.17.27'
    }
  ];
  
  // Guru Qualities
  const guruQualities = [
    {
      title: 'Verwirklichung',
      icon: 'mdi:eye-check',
      description: 'Selbstverwirklichte Seele mit direkter Gotteserfahrung',
      details: [
        'Hat Krishna persönlich verwirklicht',
        'Lebt in ständiger Verbindung mit Gott',
        'Sieht die spirituelle Realität',
        'Frei von materiellen Illusionen'
      ]
    },
    {
      title: 'Schriftkenntnis',
      icon: 'mdi:book-education',
      description: 'Tiefes Verständnis der vedischen Schriften',
      details: [
        'Meister der heiligen Schriften',
        'Kann alle Zweifel beseitigen',
        'Lehrt gemäß Zeit, Ort und Umständen',
        'Verbindet Theorie mit Praxis'
      ]
    },
    {
      title: 'Reinheit',
      icon: 'mdi:lotus',
      description: 'Makellose Charaktereigenschaften und Verhalten',
      details: [
        'Befolgt strikt die regulierenden Prinzipien',
        'Frei von Gier und Selbstsucht',
        'Mitfühlend und barmherzig',
        'Beispielhaftes Vorbild'
      ]
    },
    {
      title: 'Hingabe',
      icon: 'mdi:heart',
      description: 'Vollständig Krishna hingegeben',
      details: [
        'Ständig in Krishnas Dienst beschäftigt',
        'Sieht alles in Beziehung zu Krishna',
        'Inspiriert andere zur Hingabe',
        'Lebt nur für Krishnas Freude'
      ]
    }
  ];
  
  // Parampara Lineage
  const paramparaLineage = [
    { name: 'Krishna', title: 'Die Höchste Persönlichkeit Gottes', icon: 'mdi:flare' },
    { name: 'Brahmā', title: 'Der Schöpfer', icon: 'mdi:creation' },
    { name: 'Nārada Muni', title: 'Der göttliche Weise', icon: 'mdi:music' },
    { name: 'Vyāsadeva', title: 'Verfasser der Veden', icon: 'mdi:feather' },
    { name: 'Madhvācārya', title: 'Gründer der Madhva-Sampradāya', icon: 'mdi:school' },
    { name: '...', title: 'Viele große Ācāryas', icon: 'mdi:dots-horizontal' },
    { name: 'Śrī Caitanya', title: 'Krishna Selbst als Devotee', icon: 'mdi:dance' },
    { name: 'Rūpa Gosvāmī', title: 'Hauptschüler Caitanyas', icon: 'mdi:book-heart' },
    { name: '...', title: 'Die sechs Gosvāmīs', icon: 'mdi:dots-horizontal' },
    { name: 'Bhaktivinoda Ṭhākura', title: 'Erneuerer der Tradition', icon: 'mdi:refresh' },
    { name: 'Bhaktisiddhānta', title: 'Gründer der Gauḍīya Maṭha', icon: 'mdi:tower-broadcast' },
    { name: 'A.C. Bhaktivedanta Swami', title: 'Gründer-Ācārya von ISKCON', icon: 'mdi:earth' }
  ];
  
  // Guru-Disciple Relationship
  const relationshipAspects = [
    {
      aspect: 'Vertrauen',
      description: 'Vollständiges Vertrauen in die Führung des Gurus',
      icon: 'mdi:handshake'
    },
    {
      aspect: 'Dienst',
      description: 'Liebevoller Dienst ohne Erwartung von Gegenleistung',
      icon: 'mdi:hand-heart'
    },
    {
      aspect: 'Gehorsam',
      description: 'Befolgen der Anweisungen mit Intelligenz',
      icon: 'mdi:account-check'
    },
    {
      aspect: 'Dankbarkeit',
      description: 'Ewige Dankbarkeit für spirituelle Führung',
      icon: 'mdi:hands-pray'
    }
  ];
  
  // Types of Guru
  const guruTypes = [
    {
      type: 'Dīkṣā-guru',
      role: 'Einweihender spiritueller Meister',
      function: 'Gibt formelle Einweihung und spirituellen Namen'
    },
    {
      type: 'Śikṣā-guru',
      role: 'Unterweisender spiritueller Meister',
      function: 'Gibt spirituelle Anleitung und Wissen'
    },
    {
      type: 'Caitya-guru',
      role: 'Guru im Herzen (Paramātmā)',
      function: 'Krishna als innerer Führer'
    }
  ];
</script>

<svelte:head>
  <title>Guru & Schülernachfolge - Spirituelle Führung | ISKCON Deutschland</title>
  <meta name="description" content="Die Bedeutung des echten spirituellen Meisters (Guru) und der autorisierten Schülernachfolge (Paramparā) im Krishna-Bewusstsein." />
</svelte:head>

<!-- Hero Section -->
<section class="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
  <!-- Background -->
  <div class="absolute inset-0 bg-gradient-to-br from-gray-50 to-primary-500/5">
    <div class="absolute inset-0 opacity-10">
      <!-- Lotus pattern -->
      <div class="absolute top-20 left-20 w-32 h-32">
        <Icon icon="mdi:lotus" class="w-full h-full text-primary-500" />
      </div>
      <div class="absolute bottom-20 right-20 w-40 h-40">
        <Icon icon="mdi:lotus" class="w-full h-full text-gray-400" />
      </div>
    </div>
  </div>
  
  <!-- Content -->
  <div class="relative z-10 container mx-auto px-4 text-center">
    <h1 class="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
      Guru & Schülernachfolge
    </h1>
    <p class="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
      Die ungebrochene Kette spirituellen Wissens - 
      Der authentische Pfad zur Gottesverwirklichung
    </p>
    
    <!-- Action Button -->
    <Button
      onclick={() => showLineage = !showLineage}
      variant="soft"
      size="lg"
      class="shadow-md"
    >
      <Icon icon="mdi:family-tree" class="w-5 h-5" />
      Paramparā ansehen
    </Button>
  </div>
  
  <!-- Decorative Elements -->
  <div class="absolute bottom-0 left-0 w-64 h-64 bg-primary-500 rounded-full filter blur-3xl opacity-10 -translate-x-32 translate-y-32"></div>
  <div class="absolute top-0 right-0 w-96 h-96 bg-gray-400 rounded-full filter blur-3xl opacity-10 translate-x-48 -translate-y-48"></div>
</section>

<!-- Importance of Guru -->
<section class="py-16 md:py-24">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-4">
      Warum ein Guru notwendig ist
    </h2>
    <p class="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
      Spirituelles Wissen kann nicht durch Spekulation erlangt werden - 
      es muss von einer verwirklichten Seele empfangen werden
    </p>
    
    <div class="max-w-4xl mx-auto">
      <div class="bg-gradient-to-r from-gray-50 to-primary-500/5 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="font-bold text-xl mb-4 flex items-center gap-2">
              <Icon icon="mdi:book-off" class="w-6 h-6 text-red-600" />
              Ohne Guru
            </h3>
            <ul class="space-y-3">
              <li class="flex items-start gap-2">
                <Icon icon="mdi:close-circle" class="w-5 h-5 text-gray-500 mt-0.5" />
                <span class="text-gray-700">Verloren in Spekulation</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:close-circle" class="w-5 h-5 text-gray-500 mt-0.5" />
                <span class="text-gray-700">Fehlinterpretation der Schriften</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:close-circle" class="w-5 h-5 text-gray-500 mt-0.5" />
                <span class="text-gray-700">Spiritueller Stillstand</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:close-circle" class="w-5 h-5 text-gray-500 mt-0.5" />
                <span class="text-gray-700">Gefangen in Maya</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-bold text-xl mb-4 flex items-center gap-2">
              <Icon icon="mdi:book-heart" class="w-6 h-6 text-green-600" />
              Mit echtem Guru
            </h3>
            <ul class="space-y-3">
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check-circle" class="w-5 h-5 text-primary-500 mt-0.5" />
                <span class="text-gray-700">Klare spirituelle Führung</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check-circle" class="w-5 h-5 text-primary-500 mt-0.5" />
                <span class="text-gray-700">Autorisiertes Verständnis</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check-circle" class="w-5 h-5 text-primary-500 mt-0.5" />
                <span class="text-gray-700">Schneller Fortschritt</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check-circle" class="w-5 h-5 text-primary-500 mt-0.5" />
                <span class="text-gray-700">Schutz vor Illusion</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Guru Qualities -->
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
      Qualifikationen eines echten Gurus
    </h2>
    
    <!-- Quality Selector -->
    <div class="flex flex-wrap justify-center gap-4 mb-12">
      {#each guruQualities as quality, index}
        <button
          onclick={() => selectedQuality = index}
          class="px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2
                 {selectedQuality === index 
                   ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg scale-105' 
                   : 'bg-white text-gray-700 shadow-md hover:shadow-lg'}"
        >
          <Icon icon={quality.icon} class="w-5 h-5" />
          {quality.title}
        </button>
      {/each}
    </div>
    
    <!-- Quality Display -->
    <div class="max-w-3xl mx-auto">
      <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div class="flex items-start gap-4 mb-6">
          <div class="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon icon={guruQualities[selectedQuality].icon} class="w-8 h-8 text-primary-500" />
          </div>
          <div>
            <h3 class="text-2xl font-bold mb-2">{guruQualities[selectedQuality].title}</h3>
            <p class="text-gray-700">{guruQualities[selectedQuality].description}</p>
          </div>
        </div>
        
        <ul class="space-y-3">
          {#each guruQualities[selectedQuality].details as detail}
            <li class="flex items-start gap-3">
              <Icon icon="mdi:star" class="w-5 h-5 text-primary-500 mt-0.5" />
              <span class="text-gray-700">{detail}</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- Quote Carousel -->
<QuoteCarousel 
  {quotes} 
  title="Die Bedeutung des Gurus in den Schriften"
  bgColor="bg-white"
/>

<!-- Parampara Lineage (Conditional) -->
{#if showLineage}
<section class="py-16 bg-gradient-to-b from-white to-gray-50">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-4">
      Die Gauḍīya-Vaiṣṇava-Paramparā
    </h2>
    <p class="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
      Die ungebrochene Kette der Schülernachfolge von Krishna bis heute
    </p>
    
    <div class="max-w-3xl mx-auto">
      <div class="relative">
        {#each paramparaLineage as member, index}
          <div class="flex items-center mb-8 relative">
            <!-- Connection line -->
            {#if index < paramparaLineage.length - 1}
              <div class="absolute left-10 top-20 w-0.5 h-16 bg-gradient-to-b from-primary-500 to-primary-500/60"></div>
            {/if}
            
            <!-- Member -->
            <div class="flex items-center gap-4 bg-white rounded-lg shadow-lg p-4 relative z-10">
              <div class="w-20 h-20 bg-gradient-to-br from-primary-500/10 to-gray-100 rounded-full flex items-center justify-center">
                <Icon icon={member.icon} class="w-10 h-10 text-primary-500" />
              </div>
              <div>
                <h3 class="font-bold text-lg">{member.name}</h3>
                <p class="text-sm text-gray-600">{member.title}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
{/if}

<!-- Types of Guru -->
<section class="py-16">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
      Verschiedene Arten von Gurus
    </h2>
    
    <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each guruTypes as guru}
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
          <h3 class="font-bold text-lg mb-2 text-primary-500">{guru.type}</h3>
          <p class="font-medium text-gray-800 mb-3">{guru.role}</p>
          <p class="text-sm text-gray-600">{guru.function}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Guru-Disciple Relationship -->
<section class="py-16 md:py-24 bg-gray-50">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
      Die Guru-Schüler-Beziehung
    </h2>
    
    <div class="max-w-4xl mx-auto">
      <div class="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 md:p-12">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          {#each relationshipAspects as aspect}
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon icon={aspect.icon} class="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <h3 class="font-bold text-lg mb-1">{aspect.aspect}</h3>
                <p class="text-gray-600">{aspect.description}</p>
              </div>
            </div>
          {/each}
        </div>
        
        <div class="mt-8 p-6 bg-primary-500/10 rounded-lg text-center">
          <p class="text-gray-700">
            <Icon icon="mdi:information" class="inline w-5 h-5 text-primary-500 mr-2" />
            Die Beziehung zwischen Guru und Schüler ist ewig und transzendental - 
            sie basiert auf gegenseitiger Liebe und dem gemeinsamen Ziel, Krishna zu dienen.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Warning about False Gurus -->
<section class="py-16">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200">
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
        <Icon icon="mdi:alert-circle" class="w-8 h-8 text-red-600" />
        Vorsicht vor falschen Gurus
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 class="font-bold text-lg mb-3 text-red-700">Warnzeichen:</h3>
          <ul class="space-y-2">
            <li class="flex items-start gap-2">
              <Icon icon="mdi:alert" class="w-5 h-5 text-gray-600 mt-0.5" />
              <span class="text-gray-700">Verlangt blinden Gehorsam</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon icon="mdi:alert" class="w-5 h-5 text-gray-600 mt-0.5" />
              <span class="text-gray-700">Sucht persönlichen Gewinn</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon icon="mdi:alert" class="w-5 h-5 text-gray-600 mt-0.5" />
              <span class="text-gray-700">Widerspricht den Schriften</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon icon="mdi:alert" class="w-5 h-5 text-gray-600 mt-0.5" />
              <span class="text-gray-700">Kein persönliches Beispiel</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 class="font-bold text-lg mb-3 text-green-700">Prüfung:</h3>
          <ul class="space-y-2">
            <li class="flex items-start gap-2">
              <Icon icon="mdi:check-bold" class="w-5 h-5 text-primary-500 mt-0.5" />
              <span class="text-gray-700">Guru, Sādhu, Śāstra prüfen</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon icon="mdi:check-bold" class="w-5 h-5 text-primary-500 mt-0.5" />
              <span class="text-gray-700">Zeit nehmen für Beobachtung</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon icon="mdi:check-bold" class="w-5 h-5 text-primary-500 mt-0.5" />
              <span class="text-gray-700">Andere Schüler befragen</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon icon="mdi:check-bold" class="w-5 h-5 text-primary-500 mt-0.5" />
              <span class="text-gray-700">Krishna um Führung bitten</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Call to Action -->
<CTASection
  title="Finden Sie Ihre spirituelle Führung"
  subtitle="Beginnen Sie Ihre Reise mit authentischer Führung in der Gemeinschaft der Gottgeweihten"
  primaryButton={{
    text: 'Devotees kennenlernen',
    href: '/tempel',
    icon: 'mdi:account-group'
  }}
  secondaryButton={{
    text: 'Seminare besuchen',
    href: '/events?category=seminar',
    icon: 'mdi:school'
  }}
/>

<!-- Navigation -->
<NavigationSection {navigation} />