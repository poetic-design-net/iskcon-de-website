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
  let selectedBenefit = 0;
  let showRecipe = false;
  
  // Quotes
  const quotes = [
    {
      sanskrit: 'पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति',
      text: 'Wenn mir jemand mit Liebe und Hingabe ein Blatt, eine Blume, eine Frucht oder Wasser opfert, werde Ich es annehmen.',
      source: 'Bhagavad-gītā 9.26'
    },
    {
      sanskrit: 'यज्ञशिष्टाशिनः सन्तो मुच्यन्ते सर्वकिल्बिषैः',
      text: 'Die Gottgeweihten werden von allen Arten von Sünden befreit, weil sie Nahrung essen, die zuerst als Opfer dargebracht wurde.',
      source: 'Bhagavad-gītā 3.13'
    },
    {
      sanskrit: 'अहिंसा परमो धर्मः',
      text: 'Gewaltlosigkeit ist die höchste religiöse Pflicht.',
      source: 'Mahābhārata'
    }
  ];
  
  // Benefits of Vegetarianism
  const benefits = [
    {
      title: 'Spirituelle Vorteile',
      icon: 'mdi:meditation',
      points: [
        'Reinigung des Bewusstseins',
        'Entwicklung von Mitgefühl',
        'Förderung der Sattva-Guna',
        'Bessere Meditation und Konzentration',
        'Spiritueller Fortschritt'
      ]
    },
    {
      title: 'Ethische Gründe',
      icon: 'mdi:heart',
      points: [
        'Ahimsa - Gewaltlosigkeit',
        'Respekt vor allem Leben',
        'Mitgefühl für alle Lebewesen',
        'Karma-freie Ernährung',
        'Verantwortung für die Schöpfung'
      ]
    },
    {
      title: 'Gesundheitliche Aspekte',
      icon: 'mdi:leaf',
      points: [
        'Längere Lebenserwartung',
        'Geringeres Krankheitsrisiko',
        'Mehr Energie und Vitalität',
        'Bessere Verdauung',
        'Reinerer Körper'
      ]
    },
    {
      title: 'Ökologische Auswirkungen',
      icon: 'mdi:earth',
      points: [
        'Weniger CO2-Emissionen',
        'Wassereinsparung',
        'Landnutzungseffizienz',
        'Artenschutz',
        'Nachhaltige Zukunft'
      ]
    }
  ];
  
  // Prasadam Process
  const prasadamSteps = [
    {
      title: 'Vorbereitung',
      description: 'Mit Sauberkeit und Hingabe kochen',
      icon: 'mdi:pot-steam',
      details: [
        'Körperliche Reinheit (Baden)',
        'Saubere Küche und Utensilien',
        'Frische, sattvische Zutaten',
        'Mit liebevoller Gesinnung kochen'
      ]
    },
    {
      title: 'Darbringung',
      description: 'Das Essen Krishna opfern',
      icon: 'mdi:hands-pray',
      details: [
        'Auf einem speziellen Teller anrichten',
        'Vor dem Bildnis Krishnas aufstellen',
        'Opfergebete sprechen',
        'Mit Hingabe und Demut darbringen'
      ]
    },
    {
      title: 'Annahme',
      description: 'Krishna nimmt die Liebe an',
      icon: 'mdi:white-balance-sunny',
      details: [
        'Krishna kostet die Hingabe',
        'Die Speise wird spiritualisiert',
        'Wird zu Seiner Barmherzigkeit',
        'Reinigt Körper, Geist und Seele'
      ]
    },
    {
      title: 'Verteilung',
      description: 'Prasadam mit anderen teilen',
      icon: 'mdi:share-variant',
      details: [
        'Mit Respekt ehren',
        'In friedvoller Stimmung',
        'Mit anderen teilen',
        'Dankbarkeit kultivieren'
      ]
    }
  ];
  
  // Forbidden Foods
  const forbiddenFoods = [
    {
      category: 'Fleisch & Fisch',
      icon: 'mdi:food-off',
      reason: 'Gewalt gegen Lebewesen',
      alternatives: 'Proteinreiche Hülsenfrüchte, Nüsse, Milchprodukte'
    },
    {
      category: 'Eier',
      icon: 'mdi:egg-off',
      reason: 'Potentielles Leben',
      alternatives: 'Kichererbsenmehl, Tofu für Bindung'
    },
    {
      category: 'Zwiebel & Knoblauch',
      icon: 'mdi:garlic',
      reason: 'Erhöhen Rajas und Tamas',
      alternatives: 'Asafoetida (Hing), Ingwer, Kräuter'
    },
    {
      category: 'Berauschende Mittel',
      icon: 'mdi:glass-wine',
      reason: 'Bewusstseinstrübung',
      alternatives: 'Frische Säfte, Kräutertees, Buttermilch'
    }
  ];
  
  // Sample Prasadam Menu
  const sampleMenu = {
    breakfast: ['Upma', 'Idli', 'Früchte', 'Lassi'],
    lunch: ['Dal', 'Reis', 'Sabji', 'Chapati', 'Chutney'],
    snacks: ['Pakoras', 'Dhokla', 'Laddu', 'Früchte'],
    dinner: ['Khichdi', 'Gemüsesuppe', 'Puri', 'Halava']
  };
</script>

<svelte:head>
  <title>Vegetarismus & Prasadam - Spirituelle Ernährung | ISKCON Deutschland</title>
  <meta name="description" content="Entdecken Sie die spirituelle Bedeutung von vegetarischer Ernährung und Prasadam - geweihte Speise in der Krishna-Bewusstseinsbewegung." />
</svelte:head>

<!-- Hero Section -->
<section class="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
  <!-- Background with Food Pattern -->
  <div class="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
    <div class="absolute inset-0 opacity-10">
      <div class="grid grid-cols-4 gap-8 p-8">
        {#each Array(16) as _}
          <Icon icon="mdi:leaf" class="w-12 h-12 text-primary-500" />
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Content -->
  <div class="relative z-10 container mx-auto px-4 text-center">
    <h1 class="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
      Vegetarismus & Prasadam
    </h1>
    <p class="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
      Spirituelle Ernährung für Körper, Geist und Seele - 
      Die Kunst des bewussten und geweihten Essens
    </p>
    
    <!-- Action Button -->
    <Button
      on:click={() => showRecipe = !showRecipe}
      variant="soft"
      size="lg"
      class="shadow-md"
    >
      <Icon icon="mdi:chef-hat" class="w-5 h-5" />
      Prasadam-Rezepte
    </Button>
  </div>
  
  <!-- Decorative Elements -->
  <div class="absolute bottom-0 left-0 w-64 h-64 bg-primary-500 rounded-full filter blur-3xl opacity-10 -translate-x-32 translate-y-32"></div>
  <div class="absolute top-0 right-0 w-96 h-96 bg-gray-300 rounded-full filter blur-3xl opacity-10 translate-x-48 -translate-y-48"></div>
</section>

<!-- Benefits Section -->
<section class="py-16 md:py-24">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
      Warum vegetarisch leben?
    </h2>
    
    <!-- Benefit Selector -->
    <div class="flex flex-wrap justify-center gap-4 mb-12">
      {#each benefits as benefit, index}
        <button
          on:click={() => selectedBenefit = index}
          class="px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2
                 {selectedBenefit === index 
                   ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg scale-105' 
                   : 'bg-white text-gray-700 shadow-md hover:shadow-lg'}"
        >
          <Icon icon={benefit.icon} class="w-5 h-5" />
          {benefit.title}
        </button>
      {/each}
    </div>
    
    <!-- Benefit Display -->
    <div class="max-w-3xl mx-auto">
      <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center">
            <Icon icon={benefits[selectedBenefit].icon} class="w-8 h-8 text-primary-500" />
          </div>
          <h3 class="text-2xl font-bold">{benefits[selectedBenefit].title}</h3>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {#each benefits[selectedBenefit].points as point}
            <div class="flex items-start gap-3">
              <Icon icon="mdi:check-circle" class="w-5 h-5 text-primary-500 mt-0.5" />
              <p class="text-gray-700">{point}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Prasadam Process -->
<section class="py-16 bg-gradient-to-b from-white to-gray-50">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-4">
      Der Prasadam-Prozess
    </h2>
    <p class="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
      Wie gewöhnliches Essen zu spiritueller Nahrung wird
    </p>
    
    <div class="max-w-5xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        {#each prasadamSteps as step, index}
          <div class="relative">
            <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div class="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon icon={step.icon} class="w-8 h-8 text-primary-500" />
              </div>
              
              <h3 class="font-bold text-lg text-center mb-2">{index + 1}. {step.title}</h3>
              <p class="text-sm text-gray-600 text-center mb-4">{step.description}</p>
              
              <ul class="text-sm space-y-1">
                {#each step.details as detail}
                  <li class="flex items-start gap-2">
                    <Icon icon="mdi:dot" class="w-4 h-4 text-primary-500/60 mt-0.5" />
                    <span class="text-gray-600">{detail}</span>
                  </li>
                {/each}
              </ul>
            </div>
            
            {#if index < prasadamSteps.length - 1}
              <div class="hidden md:block absolute top-1/3 -right-3 z-10">
                <Icon icon="mdi:arrow-right" class="w-6 h-6 text-primary-500" />
              </div>
            {/if}
          </div>
        {/each}
      </div>
      
      <!-- Central Quote -->
      <div class="mt-12 bg-gradient-to-r from-[#C6695D]/10 to-[#B85A4F]/10 rounded-2xl p-8 text-center border border-[#C6695D]/20">
        <Icon icon="mdi:format-quote-open" class="w-12 h-12 text-[#C6695D]/50 mx-auto mb-4" />
        <p class="text-lg text-gray-700 italic max-w-2xl mx-auto">
          "Die Überreste von Prasadam zu ehren ist nicht nur gesund für den Körper, 
          sondern reinigt auch das Herz und führt zu spirituellem Fortschritt."
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Quote Carousel -->
<QuoteCarousel 
  {quotes} 
  title="Vedische Weisheit über Nahrung"
  bgColor="bg-white"
/>

<!-- Forbidden Foods -->
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-4">
      Was nicht geopfert werden kann
    </h2>
    <p class="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
      Bestimmte Nahrungsmittel sind für die Darbringung ungeeignet
    </p>
    
    <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each forbiddenFoods as food}
        <div class="bg-white rounded-xl shadow-lg p-6 border border-red-100">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon icon={food.icon} class="w-6 h-6 text-red-600" />
            </div>
            <div class="flex-1">
              <h3 class="font-bold text-lg mb-1">{food.category}</h3>
              <p class="text-sm text-gray-600 mb-3">
                <span class="font-medium">Grund:</span> {food.reason}
              </p>
              <p class="text-sm text-[#C6695D]">
                <span class="font-medium">Alternativen:</span> {food.alternatives}
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Sample Recipe (Conditional) -->
{#if showRecipe}
<section class="py-16">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
      <h2 class="text-3xl font-bold text-center mb-8">
        Einfaches Prasadam-Rezept: Khichdi
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
            <Icon icon="mdi:basket" class="w-5 h-5 text-[#C6695D]" />
            Zutaten
          </h3>
          <ul class="space-y-2">
            <li class="flex items-center gap-2">
              <Icon icon="mdi:circle-small" class="w-4 h-4 text-gray-400" />
              1 Tasse Reis
            </li>
            <li class="flex items-center gap-2">
              <Icon icon="mdi:circle-small" class="w-4 h-4 text-gray-400" />
              1/2 Tasse Mung Dal
            </li>
            <li class="flex items-center gap-2">
              <Icon icon="mdi:circle-small" class="w-4 h-4 text-gray-400" />
              3 Tassen Wasser
            </li>
            <li class="flex items-center gap-2">
              <Icon icon="mdi:circle-small" class="w-4 h-4 text-gray-400" />
              1 TL Kurkuma
            </li>
            <li class="flex items-center gap-2">
              <Icon icon="mdi:circle-small" class="w-4 h-4 text-gray-400" />
              1 TL Kreuzkümmel
            </li>
            <li class="flex items-center gap-2">
              <Icon icon="mdi:circle-small" class="w-4 h-4 text-gray-400" />
              Ghee, Salz, Hing
            </li>
          </ul>
        </div>
        
        <div>
          <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
            <Icon icon="mdi:pot-steam" class="w-5 h-5 text-[#C6695D]" />
            Zubereitung
          </h3>
          <ol class="space-y-2">
            <li class="flex gap-2">
              <span class="font-bold text-[#C6695D]">1.</span>
              Reis und Dal waschen und einweichen
            </li>
            <li class="flex gap-2">
              <span class="font-bold text-[#C6695D]">2.</span>
              Ghee erhitzen, Gewürze anrösten
            </li>
            <li class="flex gap-2">
              <span class="font-bold text-[#C6695D]">3.</span>
              Reis und Dal hinzufügen, kurz anbraten
            </li>
            <li class="flex gap-2">
              <span class="font-bold text-[#C6695D]">4.</span>
              Wasser zugeben und 20 Min. köcheln
            </li>
            <li class="flex gap-2">
              <span class="font-bold text-[#C6695D]">5.</span>
              Mit Liebe Krishna darbringen
            </li>
          </ol>
        </div>
      </div>
      
      <div class="mt-8 p-6 bg-gray-50 rounded-lg">
        <p class="text-center text-gray-700">
          <Icon icon="mdi:information" class="inline w-5 h-5 text-[#C6695D] mr-2" />
          Denken Sie daran: Die wichtigste Zutat ist Ihre liebevolle Hingabe!
        </p>
      </div>
    </div>
  </div>
</section>
{/if}

<!-- Daily Prasadam -->
<section class="py-16 md:py-24">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
      Prasadam im Alltag
    </h2>
    
    <div class="max-w-4xl mx-auto">
      <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 shadow-xl">
        <h3 class="text-2xl font-bold text-center mb-8">Beispiel-Tagesmenü</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {#each Object.entries(sampleMenu) as [meal, items]}
            <div class="bg-white rounded-lg p-6 shadow-md">
              <h4 class="font-bold text-lg mb-3 capitalize flex items-center gap-2">
                <Icon icon={meal === 'breakfast' ? 'mdi:weather-sunset-up' : 
                             meal === 'lunch' ? 'mdi:weather-sunny' :
                             meal === 'snacks' ? 'mdi:cookie' : 'mdi:weather-night'} 
                      class="w-5 h-5 text-[#C6695D]" />
                {meal === 'breakfast' ? 'Frühstück' :
                 meal === 'lunch' ? 'Mittagessen' :
                 meal === 'snacks' ? 'Snacks' : 'Abendessen'}
              </h4>
              <ul class="space-y-1">
                {#each items as item}
                  <li class="text-gray-600 text-sm flex items-center gap-2">
                    <Icon icon="mdi:silverware-fork-knife" class="w-4 h-4 text-gray-400" />
                    {item}
                  </li>
                {/each}
              </ul>
            </div>
          {/each}
        </div>
        
        <div class="mt-8 text-center">
          <Button href="/events?category=cooking" variant="soft" size="lg">
            <Icon icon="mdi:chef-hat" class="w-5 h-5" />
            Kochkurse besuchen
          </Button>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Call to Action -->
<CTASection
  title="Beginnen Sie Ihre spirituelle Ernährung"
  subtitle="Entdecken Sie die Freude und den Segen von Prasadam - Nahrung, die Körper und Seele nährt"
  primaryButton={{
    text: 'Prasadam im Tempel kosten',
    href: '/tempel',
    icon: 'mdi:temple-hindu'
  }}
  secondaryButton={{
    text: 'Mehr erfahren',
    href: '/literature?topic=prasadam',
    icon: 'mdi:book-heart'
  }}
/>

<!-- Navigation -->
<NavigationSection {navigation} />

{#if false}
  <section class="border-t border-gray-200">
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-6xl mx-auto">
        <h3 class="text-xl font-semibold text-center mb-8 text-gray-700">
          Weitere Philosophie-Themen entdecken
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Previous -->
          {#if navigation.prev}
            <a 
              href="/philosophie/{navigation.prev.slug}" 
              class="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div class="flex">
                <div class="flex items-center justify-center p-4 bg-gray-50 group-hover:bg-[#C6695D]/10 transition-colors">
                  <Icon icon="mdi:arrow-left" class="w-8 h-8 text-gray-600 group-hover:text-[#C6695D]" />
                </div>
                <div class="flex-1 p-6">
                  <p class="text-sm text-gray-500 mb-2">Vorheriges Thema</p>
                  <h4 class="text-lg font-semibold mb-2 group-hover:text-[#C6695D] transition-colors">
                    {navigation.prev.title}
                  </h4>
                  <p class="text-sm text-gray-600 line-clamp-2">
                    {navigation.prev.description}
                  </p>
                </div>
              </div>
            </a>
          {:else}
            <div></div>
          {/if}
          
          <!-- Next -->
          {#if navigation.next}
            <a 
              href="/philosophie/{navigation.next.slug}" 
              class="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div class="flex">
                <div class="flex-1 p-6">
                  <p class="text-sm text-gray-500 mb-2">Nächstes Thema</p>
                  <h4 class="text-lg font-semibold mb-2 group-hover:text-[#C6695D] transition-colors">
                    {navigation.next.title}
                  </h4>
                  <p class="text-sm text-gray-600 line-clamp-2">
                    {navigation.next.description}
                  </p>
                </div>
                <div class="flex items-center justify-center p-4 bg-gray-50 group-hover:bg-[#C6695D]/10 transition-colors">
                  <Icon icon="mdi:arrow-right" class="w-8 h-8 text-gray-600 group-hover:text-[#C6695D]" />
                </div>
              </div>
            </a>
          {/if}
        </div>
      </div>
    </div>
  </section>
{/if}