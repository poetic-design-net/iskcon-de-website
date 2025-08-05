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
  let selectedGuna = 0;
  let showTest = false;
  
  // Quotes
  const quotes = [
    {
      sanskrit: 'सत्त्वं रजस्तम इति गुणाः प्रकृतिसम्भवाः',
      text: 'Die materielle Natur besteht aus drei Erscheinungsweisen - Tugend, Leidenschaft und Unwissenheit.',
      source: 'Bhagavad-gītā 14.5'
    },
    {
      sanskrit: 'त्रिगुणमयैर्भावैरेभिः सर्वमिदं जगत्',
      text: 'Die ganze Welt ist verwirrt durch die drei Erscheinungsweisen der materiellen Natur.',
      source: 'Bhagavad-gītā 7.13'
    },
    {
      sanskrit: 'गुणा गुणेषु वर्तन्त इति मत्वा न सज्जते',
      text: 'Wer versteht, dass die Gunas mit den Gunas handeln, wird nicht angehaftet.',
      source: 'Bhagavad-gītā 3.28'
    }
  ];
  
  // Three Modes
  const gunas = [
    {
      name: 'Sattva-guṇa',
      title: 'Erscheinungsweise der Tugend',
      icon: 'mdi:white-balance-sunny',
      color: 'from-gray-400 to-gray-500',
      lightColor: 'bg-gray-50',
      characteristics: {
        'Qualitäten': ['Reinheit', 'Erleuchtung', 'Wissen', 'Glück', 'Friedfertigkeit'],
        'Symptome': ['Klarheit des Geistes', 'Kontrolle der Sinne', 'Gleichmut', 'Zufriedenheit', 'Weisheit'],
        'Nahrung': ['Frisch', 'Saftig', 'Gesund', 'Natürlich', 'Vegetarisch'],
        'Aktivitäten': ['Studium', 'Meditation', 'Wohltätigkeit', 'Selbstbeherrschung', 'Spirituelle Praxis'],
        'Bindung': 'Bindet durch Anhaftung an Glück und Wissen',
        'Resultat': 'Erhebung zu höheren Planeten'
      }
    },
    {
      name: 'Rajo-guṇa',
      title: 'Erscheinungsweise der Leidenschaft',
      icon: 'mdi:fire',
      color: 'from-primary-500 to-primary-600',
      lightColor: 'bg-primary-500/10',
      characteristics: {
        'Qualitäten': ['Aktivität', 'Verlangen', 'Ehrgeiz', 'Anhaftung', 'Unruhe'],
        'Symptome': ['Unstillbare Wünsche', 'Intensive Bemühungen', 'Ruhelosigkeit', 'Gier', 'Stolz'],
        'Nahrung': ['Scharf', 'Bitter', 'Salzig', 'Heiß', 'Trocken'],
        'Aktivitäten': ['Fruchtbringende Arbeit', 'Materieller Fortschritt', 'Wettbewerb', 'Sinnesgenuss', 'Soziale Anerkennung'],
        'Bindung': 'Bindet durch Anhaftung an fruchtbringende Handlungen',
        'Resultat': 'Wiedergeburt unter Menschen'
      }
    },
    {
      name: 'Tamo-guṇa',
      title: 'Erscheinungsweise der Unwissenheit',
      icon: 'mdi:weather-night',
      color: 'from-gray-700 to-gray-900',
      lightColor: 'bg-gray-100',
      characteristics: {
        'Qualitäten': ['Dunkelheit', 'Trägheit', 'Verwirrung', 'Illusion', 'Wahnsinn'],
        'Symptome': ['Faulheit', 'Schläfrigkeit', 'Täuschung', 'Depression', 'Drogenmissbrauch'],
        'Nahrung': ['Abgestanden', 'Verfault', 'Unrein', 'Übrig geblieben', 'Berauschend'],
        'Aktivitäten': ['Schlafen', 'Intoxikation', 'Gewalt', 'Glücksspiel', 'Illusion'],
        'Bindung': 'Bindet durch Nachlässigkeit, Faulheit und Schlaf',
        'Resultat': 'Abstieg in tierische und höllische Formen'
      }
    }
  ];
  
  // Daily Life Examples
  const dailyExamples = [
    {
      category: 'Morgenroutine',
      sattva: 'Früh aufstehen, baden, meditieren',
      rajas: 'Hektisches Aufstehen, schnelles Frühstück, zur Arbeit eilen',
      tamas: 'Verschlafen, träge sein, Pflichten vermeiden'
    },
    {
      category: 'Arbeit',
      sattva: 'Pflichterfüllung ohne Anhaftung',
      rajas: 'Ehrgeiziges Streben nach Erfolg',
      tamas: 'Nachlässigkeit und Aufschieben'
    },
    {
      category: 'Freizeit',
      sattva: 'Spirituelle Praxis, Lesen heiliger Schriften',
      rajas: 'Parties, Shopping, Unterhaltung',
      tamas: 'Übermäßiges Schlafen, Drogen, TV'
    },
    {
      category: 'Beziehungen',
      sattva: 'Mitgefühl, Dienst, Selbstlosigkeit',
      rajas: 'Leidenschaft, Besitzanspruch, Eifersucht',
      tamas: 'Gleichgültigkeit, Gewalt, Betrug'
    }
  ];
  
  // Transcending the Modes
  const transcendence = {
    symptoms: [
      'Gleichmut in Glück und Leid',
      'Keine Abneigung oder Verlangen',
      'Sieht Gold und Stein als gleich',
      'Gleichgesinnt zu Freund und Feind',
      'Unberührt von Ehre und Schmach'
    ],
    methods: [
      'Hingebungsvoller Dienst (Bhakti-yoga)',
      'Ständige Erinnerung an Krishna',
      'Gemeinschaft mit Gottgeweihten',
      'Chanten der heiligen Namen',
      'Befolgen regulierender Prinzipien'
    ]
  };
</script>

<svelte:head>
  <title>Die drei Erscheinungsweisen - Gunas der Natur | ISKCON Deutschland</title>
  <meta name="description" content="Verstehen Sie die drei Gunas (Sattva, Rajas, Tamas) - die grundlegenden Kräfte der materiellen Natur und wie man sie transzendiert." />
</svelte:head>

<!-- Hero Section -->
<section class="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
  <!-- Background with Three Colors -->
  <div class="absolute inset-0">
    <div class="absolute inset-0 grid grid-cols-3">
      <div class="bg-gradient-to-br from-gray-100 to-gray-200"></div>
      <div class="bg-gradient-to-br from-primary-500/20 to-primary-500/10"></div>
      <div class="bg-gradient-to-br from-gray-200 to-gray-300"></div>
    </div>
    <div class="absolute inset-0 bg-white/80"></div>
  </div>
  
  <!-- Content -->
  <div class="relative z-10 container mx-auto px-4 text-center">
    <h1 class="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
      Die drei Erscheinungsweisen
    </h1>
    <p class="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
      Sattva, Rajas und Tamas - Die grundlegenden Kräfte, 
      die alle materiellen Aktivitäten bestimmen
    </p>
    
    <!-- Action Button -->
    <Button
      on:click={() => showTest = !showTest}
      variant="soft"
      size="lg"
      class="shadow-md"
    >
      <Icon icon="mdi:clipboard-check" class="w-5 h-5" />
      Guna-Test machen
    </Button>
  </div>
  
  <!-- Decorative Elements -->
  <div class="absolute bottom-0 left-0 w-64 h-64 bg-primary-500 rounded-full filter blur-3xl opacity-10 -translate-x-32 translate-y-32"></div>
  <div class="absolute top-0 right-0 w-96 h-96 bg-gray-300 rounded-full filter blur-3xl opacity-10 translate-x-48 -translate-y-48"></div>
</section>

<!-- Three Gunas Section -->
<section class="py-16 md:py-24">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
      Die drei Guṇas im Detail
    </h2>
    
    <!-- Guna Selector -->
    <div class="flex flex-wrap justify-center gap-4 mb-12">
      {#each gunas as guna, index}
        <button
          on:click={() => selectedGuna = index}
          class="px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2
                 {selectedGuna === index 
                   ? 'bg-gradient-to-r ' + guna.color + ' text-white shadow-lg scale-105' 
                   : 'bg-white text-gray-700 shadow-md hover:shadow-lg'}"
        >
          <Icon icon={guna.icon} class="w-5 h-5" />
          {guna.name}
        </button>
      {/each}
    </div>
    
    <!-- Guna Display -->
    <div class="max-w-5xl mx-auto">
      <div class="{gunas[selectedGuna].lightColor} rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        <div class="bg-gradient-to-r {gunas[selectedGuna].color} p-6 text-white">
          <div class="flex items-center gap-4">
            <Icon icon={gunas[selectedGuna].icon} class="w-12 h-12" />
            <div>
              <h3 class="text-2xl font-bold">{gunas[selectedGuna].title}</h3>
              <p class="text-lg opacity-90">{gunas[selectedGuna].name}</p>
            </div>
          </div>
        </div>
        
        <div class="p-8 md:p-12">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {#each Object.entries(gunas[selectedGuna].characteristics) as [key, value]}
              <div>
                <h4 class="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Icon icon="mdi:chevron-right" class="w-5 h-5 text-primary-500" />
                  {key}
                </h4>
                {#if Array.isArray(value)}
                  <ul class="space-y-2">
                    {#each value as item}
                      <li class="flex items-start gap-2">
                        <Icon icon="mdi:circle-small" class="w-5 h-5 text-gray-400 mt-0.5" />
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

<!-- Daily Life Examples -->
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-4">
      Die Gunas im täglichen Leben
    </h2>
    <p class="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
      Wie die drei Erscheinungsweisen unsere täglichen Aktivitäten beeinflussen
    </p>
    
    <div class="max-w-5xl mx-auto">
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-100">
              <th class="px-6 py-4 text-left font-bold text-gray-800">Bereich</th>
              <th class="px-6 py-4 text-left">
                <div class="flex items-center gap-2">
                  <Icon icon="mdi:white-balance-sunny" class="w-5 h-5 text-gray-600" />
                  <span class="font-bold text-gray-800">Sattva</span>
                </div>
              </th>
              <th class="px-6 py-4 text-left">
                <div class="flex items-center gap-2">
                  <Icon icon="mdi:fire" class="w-5 h-5 text-primary-500" />
                  <span class="font-bold text-gray-800">Rajas</span>
                </div>
              </th>
              <th class="px-6 py-4 text-left">
                <div class="flex items-center gap-2">
                  <Icon icon="mdi:weather-night" class="w-5 h-5 text-gray-700" />
                  <span class="font-bold text-gray-800">Tamas</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {#each dailyExamples as example, index}
              <tr class="{index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}">
                <td class="px-6 py-4 font-medium text-gray-800">{example.category}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{example.sattva}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{example.rajas}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{example.tamas}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>

<!-- Quote Carousel -->
<QuoteCarousel 
  {quotes} 
  title="Die Gunas in der Bhagavad-gītā"
  bgColor="bg-white"
/>

<!-- Transcending the Modes -->
<section class="py-16 md:py-24">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-4">
      Die Gunas transzendieren
    </h2>
    <p class="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
      Der Weg jenseits der materiellen Erscheinungsweisen
    </p>
    
    <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Symptoms -->
      <div class="bg-gradient-to-br from-primary-500/5 to-white rounded-xl shadow-lg p-8 border border-primary-500/20">
        <div class="flex items-center gap-3 mb-6">
          <Icon icon="mdi:eye-check" class="w-8 h-8 text-primary-500" />
          <h3 class="text-xl font-bold">Merkmale der Transzendenz</h3>
        </div>
        
        <div class="space-y-3">
          {#each transcendence.symptoms as symptom}
            <div class="flex items-start gap-3">
              <Icon icon="mdi:check-circle" class="w-5 h-5 text-primary-500/60 mt-0.5" />
              <p class="text-gray-700">{symptom}</p>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Methods -->
      <div class="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg p-8 border border-gray-200">
        <div class="flex items-center gap-3 mb-6">
          <Icon icon="mdi:meditation" class="w-8 h-8 text-primary-500" />
          <h3 class="text-xl font-bold">Methoden der Erhebung</h3>
        </div>
        
        <div class="space-y-3">
          {#each transcendence.methods as method}
            <div class="flex items-start gap-3">
              <Icon icon="mdi:arrow-right-circle" class="w-5 h-5 text-primary-500/60 mt-0.5" />
              <p class="text-gray-700">{method}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
    
    <!-- Central Teaching -->
    <div class="mt-12 max-w-3xl mx-auto">
      <div class="bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-2xl p-8 text-center border border-primary-500/20">
        <Icon icon="mdi:lotus" class="w-16 h-16 text-primary-500 mx-auto mb-4" />
        <h3 class="text-2xl font-bold mb-4">Guṇātīta - Jenseits der Gunas</h3>
        <p class="text-gray-700 mb-4">
          "Wer Mich mit ungeteilter Hingabe verehrt, transzendiert diese Erscheinungsweisen 
          der materiellen Natur und wird qualifiziert, die Ebene des Brahman zu erreichen."
        </p>
        <p class="text-sm text-primary-500 font-medium">- Bhagavad-gītā 14.26</p>
      </div>
    </div>
  </div>
</section>

<!-- Guna Test (Conditional) -->
{#if showTest}
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
      <h2 class="text-3xl font-bold text-center mb-8">
        Welche Guna dominiert in Ihrem Leben?
      </h2>
      
      <div class="space-y-6 mb-8">
        <div class="p-6 bg-gray-50 rounded-lg">
          <h3 class="font-bold mb-3">Ihre bevorzugte Tageszeit?</h3>
          <div class="space-y-2">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="time" class="text-primary-500" />
              <span>Früher Morgen (4-8 Uhr) - Sattva</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="time" class="text-primary-500" />
              <span>Tag (8-20 Uhr) - Rajas</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="time" class="text-primary-500" />
              <span>Nacht (20-4 Uhr) - Tamas</span>
            </label>
          </div>
        </div>
        
        <div class="p-6 bg-gray-50 rounded-lg">
          <h3 class="font-bold mb-3">Ihre Reaktion auf Probleme?</h3>
          <div class="space-y-2">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="problem" class="text-primary-500" />
              <span>Ruhig analysieren und lösen - Sattva</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="problem" class="text-primary-500" />
              <span>Kämpfen und durchsetzen - Rajas</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="problem" class="text-primary-500" />
              <span>Vermeiden oder ignorieren - Tamas</span>
            </label>
          </div>
        </div>
      </div>
      
      <div class="text-center">
        <p class="text-gray-600 mb-4">
          Dieser Test ist nur eine grobe Einschätzung. Für tieferes Verständnis 
          studieren Sie bitte die Bhagavad-gītā.
        </p>
        <Button href="/literature" variant="soft">
          <Icon icon="mdi:book-open-variant" class="w-5 h-5" />
          Bhagavad-gītā studieren
        </Button>
      </div>
    </div>
  </div>
</section>
{/if}

<!-- Call to Action -->
<CTASection
  title="Erheben Sie sich über die Gunas"
  subtitle="Transzendieren Sie die materiellen Erscheinungsweisen durch spirituelle Praxis"
  primaryButton={{
    text: 'Bhakti-Yoga praktizieren',
    href: '/philosophie/bhakti-yoga',
    icon: 'mdi:meditation'
  }}
  secondaryButton={{
    text: 'Spirituelles Retreat',
    href: '/events?category=retreat',
    icon: 'mdi:spa'
  }}
/>

<!-- Navigation -->
<NavigationSection {navigation} />