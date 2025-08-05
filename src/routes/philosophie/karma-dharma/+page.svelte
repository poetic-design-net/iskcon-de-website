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
  let selectedLaw = 0;
  let showExamples = false;
  
  // Quotes
  const quotes = [
    {
      sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन',
      text: 'Du hast ein Recht auf die Erfüllung deiner Pflicht, aber niemals auf die Früchte des Handelns.',
      source: 'Bhagavad-gītā 2.47'
    },
    {
      sanskrit: 'स्वधर्मे निधनं श्रेयः परधर्मो भयावहः',
      text: 'Es ist besser, in der Erfüllung der eigenen Pflicht zu sterben, als die Pflicht eines anderen auszuführen.',
      source: 'Bhagavad-gītā 3.35'
    },
    {
      sanskrit: 'यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः',
      text: 'Was immer ein großer Mensch tut, dem folgen die gewöhnlichen Menschen.',
      source: 'Bhagavad-gītā 3.21'
    }
  ];
  
  // Laws of Karma
  const karmaLaws = [
    {
      title: 'Das Gesetz der Ursache und Wirkung',
      icon: 'mdi:scale-balance',
      description: 'Jede Handlung erzeugt eine entsprechende Reaktion',
      details: {
        principle: 'Wie du säst, so wirst du ernten - dies ist das fundamentale Gesetz des Universums',
        timing: 'Reaktionen können sofort, in diesem Leben oder in zukünftigen Leben kommen',
        scope: 'Gilt für Gedanken, Worte und Taten gleichermaßen',
        examples: [
          'Gewalt führt zu Leid',
          'Großzügigkeit bringt Wohlstand',
          'Mitgefühl erzeugt Liebe'
        ]
      }
    },
    {
      title: 'Das Gesetz der Verantwortung',
      icon: 'mdi:account-check',
      description: 'Wir sind für unser Schicksal selbst verantwortlich',
      details: {
        principle: 'Niemand anderes ist für unser Glück oder Leid verantwortlich',
        freedom: 'Wir haben den freien Willen, unser Karma zu gestalten',
        accountability: 'Keine Handlung geht verloren - alles wird aufgezeichnet',
        transformation: 'Durch bewusstes Handeln können wir unser Schicksal ändern'
      }
    },
    {
      title: 'Das Gesetz der Gerechtigkeit',
      icon: 'mdi:shield-check',
      description: 'Das Universum ist perfekt gerecht und unparteiisch',
      details: {
        fairness: 'Jeder erhält genau das, was er verdient',
        precision: 'Die kosmische Buchhaltung ist absolut präzise',
        impartiality: 'Karma macht keine Unterschiede zwischen Menschen',
        balance: 'Alles strebt nach Ausgleich und Harmonie'
      }
    },
    {
      title: 'Das Gesetz der Befreiung',
      icon: 'mdi:lotus',
      description: 'Karma kann durch spirituelle Praxis transzendiert werden',
      details: {
        bhakti: 'Hingebungsvolles Dienen befreit vom Karma',
        surrender: 'Hingabe an Krishna neutralisiert Karma',
        knowledge: 'Spirituelles Wissen verbrennt die Saat des Karma',
        grace: 'Gottes Gnade kann alle karmischen Reaktionen aufheben'
      }
    }
  ];
  
  // Types of Dharma
  const dharmaTypes = [
    {
      title: 'Sanātana-dharma',
      subtitle: 'Die ewige Pflicht',
      description: 'Die unveränderliche Pflicht aller Lebewesen - liebender Dienst zu Gott',
      icon: 'mdi:infinity'
    },
    {
      title: 'Varṇāśrama-dharma',
      subtitle: 'Soziale Pflichten',
      description: 'Pflichten entsprechend der sozialen Stellung und Lebensphase',
      icon: 'mdi:account-group'
    },
    {
      title: 'Sva-dharma',
      subtitle: 'Persönliche Pflicht',
      description: 'Die individuellen Pflichten basierend auf Natur und Fähigkeiten',
      icon: 'mdi:account-heart'
    },
    {
      title: 'Āpad-dharma',
      subtitle: 'Notfall-Dharma',
      description: 'Angepasste Pflichten in außergewöhnlichen Umständen',
      icon: 'mdi:alert-circle'
    }
  ];
  
  // Karma Types
  const karmaTypes = [
    {
      name: 'Karma',
      description: 'Handlungen, die materielle Reaktionen erzeugen',
      effect: 'Bindung an die materielle Welt',
      color: 'bg-gray-100'
    },
    {
      name: 'Vikarma',
      description: 'Sündhafte Handlungen gegen die Naturgesetze',
      effect: 'Leid und Degradierung',
      color: 'bg-red-50'
    },
    {
      name: 'Akarma',
      description: 'Befreiende Handlungen ohne karmische Bindung',
      effect: 'Spiritueller Fortschritt und Befreiung',
      color: 'bg-green-50'
    },
    {
      name: 'Sukarma',
      description: 'Fromme Handlungen in Übereinstimmung mit den Schriften',
      effect: 'Materieller und spiritueller Nutzen',
      color: 'bg-blue-50'
    }
  ];
</script>

<svelte:head>
  <title>Karma & Dharma - Kosmische Gesetze | ISKCON Deutschland</title>
  <meta name="description" content="Verstehen Sie die universellen Gesetze von Karma (Ursache und Wirkung) und Dharma (ewige Pflicht). Der Weg zu einem erfüllten Leben." />
</svelte:head>

<!-- Hero Section -->
<section class="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
  <!-- Background with Balance Symbol -->
  <div class="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
    <div class="absolute inset-0 flex items-center justify-center opacity-5">
      <Icon icon="mdi:scale-balance" class="w-96 h-96 text-primary-500" />
    </div>
  </div>
  
  <!-- Content -->
  <div class="relative z-10 container mx-auto px-4 text-center">
    <h1 class="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
      Karma & Dharma
    </h1>
    <p class="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
      Die universellen Gesetze von Ursache und Wirkung - 
      Der Pfad der rechtschaffenen Pflicht
    </p>
    
    <!-- Action Buttons -->
    <div class="flex flex-wrap gap-4 justify-center">
      <Button
        on:click={() => showExamples = !showExamples}
        variant="soft"
        size="lg"
        class="shadow-md"
      >
        <Icon icon="mdi:book-open-variant" class="w-5 h-5" />
        Praktische Beispiele
      </Button>
    </div>
  </div>
  
  <!-- Decorative Elements -->
  <div class="absolute bottom-0 left-0 w-64 h-64 bg-primary-500 rounded-full filter blur-3xl opacity-10 -translate-x-32 translate-y-32"></div>
  <div class="absolute top-0 right-0 w-96 h-96 bg-gray-300 rounded-full filter blur-3xl opacity-10 translate-x-48 -translate-y-48"></div>
</section>

<!-- Laws of Karma Section -->
<section class="py-16 md:py-24">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-4">
      Die Gesetze des Karma
    </h2>
    <p class="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
      Die unveränderlichen kosmischen Prinzipien, die unser Schicksal bestimmen
    </p>
    
    <!-- Law Selector -->
    <div class="flex flex-wrap justify-center gap-4 mb-12">
      {#each karmaLaws as law, index}
        <button
          on:click={() => selectedLaw = index}
          class="px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2
                 {selectedLaw === index 
                   ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg scale-105' 
                   : 'bg-white text-gray-700 shadow-md hover:shadow-lg'}"
        >
          <Icon icon={law.icon} class="w-5 h-5" />
          {law.title}
        </button>
      {/each}
    </div>
    
    <!-- Law Display -->
    <div class="max-w-4xl mx-auto">
      <div class="bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-xl overflow-hidden border border-primary-500/20">
        <div class="p-8 md:p-12">
          <div class="flex items-start gap-4 mb-6">
            <div class="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon icon={karmaLaws[selectedLaw].icon} class="w-8 h-8 text-primary-500" />
            </div>
            <div>
              <h3 class="text-2xl font-bold mb-2">{karmaLaws[selectedLaw].title}</h3>
              <p class="text-gray-700">{karmaLaws[selectedLaw].description}</p>
            </div>
          </div>
          
          <div class="space-y-4">
            {#each Object.entries(karmaLaws[selectedLaw].details) as [key, value]}
              <div>
                <h4 class="font-semibold text-gray-800 capitalize mb-2">{key}:</h4>
                {#if Array.isArray(value)}
                  <ul class="space-y-1">
                    {#each value as item}
                      <li class="flex items-center gap-2">
                        <Icon icon="mdi:arrow-right" class="w-4 h-4 text-primary-500/60" />
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

<!-- Types of Karma -->
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
      Arten von Karma
    </h2>
    
    <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each karmaTypes as type}
        <div class="{type.color} rounded-xl p-6 border border-gray-200">
          <h3 class="text-xl font-bold mb-2">{type.name}</h3>
          <p class="text-gray-700 mb-3">{type.description}</p>
          <div class="flex items-center gap-2 text-sm">
            <Icon icon="mdi:arrow-right-circle" class="w-5 h-5 text-primary-500" />
            <span class="font-medium text-gray-800">Wirkung:</span>
            <span class="text-gray-600">{type.effect}</span>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Understanding Dharma -->
<section class="py-16 md:py-24">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-4">
      Dharma verstehen
    </h2>
    <p class="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
      Die verschiedenen Ebenen der Pflicht und rechtschaffenen Lebensführung
    </p>
    
    <div class="max-w-5xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#each dharmaTypes as dharma}
          <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon icon={dharma.icon} class="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <h3 class="text-lg font-bold mb-1">{dharma.title}</h3>
                <p class="text-primary-500 text-sm mb-2">{dharma.subtitle}</p>
                <p class="text-gray-600 text-sm">{dharma.description}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>
      
      <!-- Central Teaching -->
      <div class="mt-12 bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-2xl p-8 text-center border border-primary-500/20">
        <Icon icon="mdi:dharma" class="w-16 h-16 text-primary-500 mx-auto mb-4" />
        <h3 class="text-2xl font-bold mb-4">Die höchste Pflicht</h3>
        <p class="text-gray-700 max-w-2xl mx-auto">
          Über allen temporären Pflichten steht die ewige Pflicht der Seele - 
          liebender Dienst zu Krishna. Dies ist die Essenz aller Dharmas.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Quote Carousel -->
<QuoteCarousel 
  {quotes} 
  title="Weisheit über Karma & Dharma"
  bgColor="bg-white"
/>

<!-- Practical Examples (Conditional) -->
{#if showExamples}
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-12">
      Praktische Beispiele
    </h2>
    
    <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Good Karma Examples -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <div class="flex items-center gap-3 mb-6">
          <Icon icon="mdi:thumb-up" class="w-8 h-8 text-green-600" />
          <h3 class="text-xl font-bold">Gutes Karma</h3>
        </div>
        
        <div class="space-y-4">
          <div class="border-l-4 border-green-500 pl-4">
            <h4 class="font-semibold text-gray-800">Wohltätigkeit</h4>
            <p class="text-sm text-gray-600">Führt zu Wohlstand in zukünftigen Leben</p>
          </div>
          
          <div class="border-l-4 border-green-500 pl-4">
            <h4 class="font-semibold text-gray-800">Wahrhaftigkeit</h4>
            <p class="text-sm text-gray-600">Bringt Vertrauen und gute Beziehungen</p>
          </div>
          
          <div class="border-l-4 border-green-500 pl-4">
            <h4 class="font-semibold text-gray-800">Mitgefühl</h4>
            <p class="text-sm text-gray-600">Erzeugt Liebe und Unterstützung</p>
          </div>
          
          <div class="border-l-4 border-green-500 pl-4">
            <h4 class="font-semibold text-gray-800">Spirituelle Praxis</h4>
            <p class="text-sm text-gray-600">Führt zu höherer Geburt und Befreiung</p>
          </div>
        </div>
      </div>
      
      <!-- Bad Karma Examples -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <div class="flex items-center gap-3 mb-6">
          <Icon icon="mdi:thumb-down" class="w-8 h-8 text-red-600" />
          <h3 class="text-xl font-bold">Schlechtes Karma</h3>
        </div>
        
        <div class="space-y-4">
          <div class="border-l-4 border-red-500 pl-4">
            <h4 class="font-semibold text-gray-800">Gewalt</h4>
            <p class="text-sm text-gray-600">Führt zu Krankheit und frühem Tod</p>
          </div>
          
          <div class="border-l-4 border-red-500 pl-4">
            <h4 class="font-semibold text-gray-800">Lügen</h4>
            <p class="text-sm text-gray-600">Zerstört Vertrauen und Beziehungen</p>
          </div>
          
          <div class="border-l-4 border-red-500 pl-4">
            <h4 class="font-semibold text-gray-800">Gier</h4>
            <p class="text-sm text-gray-600">Bringt Armut und Unzufriedenheit</p>
          </div>
          
          <div class="border-l-4 border-red-500 pl-4">
            <h4 class="font-semibold text-gray-800">Gottlosigkeit</h4>
            <p class="text-sm text-gray-600">Führt zu niederer Geburt</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
{/if}

<!-- Path to Freedom -->
<section class="py-16 md:py-24">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 md:p-12 border border-primary-500/20">
      <h2 class="text-3xl font-bold text-center mb-8">
        Der Weg zur Freiheit vom Karma
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div class="text-center">
          <div class="w-20 h-20 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon icon="mdi:book-heart" class="w-10 h-10 text-primary-500" />
          </div>
          <h3 class="font-bold mb-2">Wissen</h3>
          <p class="text-sm text-gray-600">Die Gesetze des Karma verstehen</p>
        </div>
        
        <div class="text-center">
          <div class="w-20 h-20 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon icon="mdi:hand-heart" class="w-10 h-10 text-primary-500" />
          </div>
          <h3 class="font-bold mb-2">Handlung</h3>
          <p class="text-sm text-gray-600">Pflichten ohne Anhaftung erfüllen</p>
        </div>
        
        <div class="text-center">
          <div class="w-20 h-20 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon icon="mdi:lotus" class="w-10 h-10 text-primary-500" />
          </div>
          <h3 class="font-bold mb-2">Hingabe</h3>
          <p class="text-sm text-gray-600">Alle Handlungen Krishna weihen</p>
        </div>
      </div>
      
      <div class="text-center">
        <p class="text-lg text-gray-700 mb-6">
          "Wer alle Früchte seiner Arbeit Mir opfert und entsprechend Meinen Anweisungen handelt, 
          wird von den Fesseln des Karma befreit."
        </p>
        <Button 
          href="/philosophie/bhakti-yoga"
          variant="premium"
          size="lg"
        >
          <Icon icon="mdi:arrow-right" class="w-5 h-5" />
          Bhakti-Yoga entdecken
        </Button>
      </div>
    </div>
  </div>
</section>

<!-- Call to Action -->
<CTASection
  title="Leben Sie in Harmonie mit dem Universum"
  subtitle="Verstehen und praktizieren Sie die zeitlosen Prinzipien von Karma und Dharma"
  primaryButton={{
    text: 'Studieren Sie die Schriften',
    href: '/literature?topic=karma-dharma',
    icon: 'mdi:book-open-variant'
  }}
  secondaryButton={{
    text: 'Workshop besuchen',
    href: '/events?category=workshop',
    icon: 'mdi:calendar-check'
  }}
/>

<!-- Navigation -->
<NavigationSection {navigation} />