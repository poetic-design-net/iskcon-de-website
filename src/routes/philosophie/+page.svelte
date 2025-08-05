<script lang="ts">
  import type { PageData } from './$types';
  import Icon from '@iconify/svelte';
  import { Button } from '$lib/components/ui/button';
  
  export let data: PageData;
  const { philosophyTopics } = data;
</script>

<svelte:head>
  <title>Philosophie - ISKCON Deutschland</title>
  <meta name="description" content="Entdecken Sie die vedische Philosophie und die zeitlose Weisheit des Bhakti-Yoga. Erfahren Sie mehr über Krishna, die Seele, Karma und spirituelle Praxis." />
</svelte:head>

<!-- Hero Section -->
<section class="relative bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Die Vedische Philosophie
      </h1>
      <p class="text-xl text-gray-700 mb-8">
        Entdecken Sie die zeitlose Weisheit der vedischen Schriften und die transformierende Kraft des Bhakti-Yoga
      </p>
      <div class="prose prose-lg mx-auto text-gray-600">
        <p>
          Die Philosophie der Hare Krishna Bewegung basiert auf der Gaudiya-Vaishnava Tradition, 
          einer der ältesten spirituellen Überlieferungen der Welt. Diese monotheistische Tradition 
          lehrt die liebende Hingabe (Bhakti) zu Krishna als den höchsten spirituellen Pfad.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Philosophy Topics Grid -->
<section class="py-12 md:py-16">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {#each philosophyTopics as topic}
        <a 
          href="/philosophie/{topic.slug}" 
          class="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
          <div class="p-6 md:p-8">
            <!-- Icon -->
            <div class="text-4xl mb-4">{topic.icon}</div>
            
            <!-- Title -->
            <h2 class="text-xl md:text-2xl font-semibold text-gray-900 mb-3 group-hover:text-primary-500 transition-colors">
              {topic.title}
            </h2>
            
            <!-- Description -->
            <p class="text-gray-600 mb-4">
              {topic.description}
            </p>
            
            <!-- Topics List -->
            <ul class="space-y-2 text-sm">
              {#each topic.topics as subtopic}
                <li class="flex items-start">
                  <span class="text-primary-500 mr-2">•</span>
                  <span class="text-gray-700">{subtopic}</span>
                </li>
              {/each}
            </ul>
            
            <!-- Arrow -->
            <div class="mt-4 text-primary-500 font-medium flex items-center group-hover:text-primary-600 transition-colors">
              Mehr erfahren
              <Icon icon="mdi:arrow-right" class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- Key Concepts Section -->
<section class="py-12 md:py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-12">Grundlegende Konzepte</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Achintya Bheda Abheda -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <div class="text-primary-500 mb-3">
          <Icon icon="mdi:sparkles" class="w-8 h-8" />
        </div>
        <h3 class="font-semibold text-lg mb-2">Achintya Bheda Abheda</h3>
        <p class="text-gray-600 text-sm">
          Die unbegreifliche gleichzeitige Einheit und Verschiedenheit zwischen Gott, der Seele und der Welt
        </p>
      </div>
      
      <!-- Sanatana Dharma -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <div class="text-primary-500 mb-3">
          <Icon icon="mdi:book-open-page-variant" class="w-8 h-8" />
        </div>
        <h3 class="font-semibold text-lg mb-2">Sanatana Dharma</h3>
        <p class="text-gray-600 text-sm">
          Die ewige Religion - die natürliche und ewige Funktion der Seele in liebender Beziehung zu Gott
        </p>
      </div>
      
      <!-- Prema -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <div class="text-primary-500 mb-3">
          <Icon icon="mdi:heart" class="w-8 h-8" />
        </div>
        <h3 class="font-semibold text-lg mb-2">Prema (Göttliche Liebe)</h3>
        <p class="text-gray-600 text-sm">
          Das höchste Ziel des spirituellen Lebens - reine, selbstlose Liebe zu Krishna
        </p>
      </div>
      
      <!-- Vier Prinzipien -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <div class="text-primary-500 mb-3">
          <Icon icon="mdi:calendar-check" class="w-8 h-8" />
        </div>
        <h3 class="font-semibold text-lg mb-2">Die vier Prinzipien</h3>
        <p class="text-gray-600 text-sm">
          Ethische Grundlagen: Mitgefühl, Reinheit, Wahrhaftigkeit und Selbstkontrolle
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Call to Action -->
<section class="py-12 md:py-16 bg-gray-50">
  <div class="container mx-auto px-4 text-center">
    <h2 class="text-3xl font-bold mb-4">Vertiefen Sie Ihr Verständnis</h2>
    <p class="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
      Besuchen Sie unsere Tempel, nehmen Sie an Studienkreisen teil oder erkunden Sie unsere 
      Online-Ressourcen, um die vedische Philosophie praktisch zu erfahren.
    </p>
    <div class="flex flex-wrap gap-4 justify-center">
      <Button 
        href="/events" 
        variant="default"
        size="lg"
      >
        Veranstaltungen finden
      </Button>
      <Button 
        href="/literature" 
        variant="outline"
        size="lg"
        class="text-primary-500 border-primary-500 hover:bg-primary-500/10"
      >
        Bücher entdecken
      </Button>
    </div>
  </div>
</section>