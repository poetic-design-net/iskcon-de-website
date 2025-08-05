<script lang="ts">
  import { onMount } from 'svelte';
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import Icon from '@iconify/svelte';
  import { format } from 'date-fns';
  import { de } from 'date-fns/locale';
  
  // Props for dynamic content from Sanity
  export let heroData: {
    title?: {
      line1?: string;
      line2?: string;
    };
    subtitle?: string;
    backgroundImage?: {
      asset?: {
        url?: string;
      };
      alt?: string;
    };
    buttons?: Array<{
      text: string;
      link: string;
      icon?: string;
      variant?: string;
    }>;
  } | null = null;
  
  // Props for content cards
  export let latestEvent: any = null;
  export let latestPost: any = null;
  export let nearestTemple: any = null;
  
  // Default values
  const defaults = {
    title: {
      line1: 'Willkommen bei',
      line2: 'ISKCON Deutschland-Österreich'
    },
    subtitle: 'Internationale Gesellschaft für Krishna-Bewusstsein',
    backgroundImage: {
      url: '/img/hero_nature.webp',
      alt: 'Nature Background'
    }
  };
  
  // Daily verse/inspiration (could be dynamic later)
  const dailyInspiration = {
    verse: "Für die Seele gibt es weder Geburt noch Tod. Sie ist nicht entstanden, entsteht nicht und wird nie entstehen.",
    source: "Bhagavad-gītā 2.20"
  };

  // Select random temple
  function getRandomTemple(temples: any[]) {
    if (!temples || temples.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * temples.length);
    return temples[randomIndex];
  }

  // Get random temple from props
  $: randomTemple = nearestTemple ? getRandomTemple(Array.isArray(nearestTemple) ? nearestTemple : [nearestTemple]) : null;
  
  // Merge props with defaults
  $: title = heroData?.title || defaults.title;
  $: subtitle = heroData?.subtitle || defaults.subtitle;
  $: backgroundImage = heroData?.backgroundImage?.asset?.url || defaults.backgroundImage.url;
  $: backgroundAlt = heroData?.backgroundImage?.alt || defaults.backgroundImage.alt;
  $: buttons = heroData?.buttons || [
    { text: 'Mehr erfahren', link: '/ueber-uns', variant: 'default' },
    { text: 'Events', link: '/events', variant: 'outline' }
  ];
  
  let heroSection: HTMLElement;
</script>

<section class="relative">
  <!-- Kompakter Hero-Bereich mit Hintergrundbild -->
  <div class="relative h-[500px] overflow-hidden">
    <!-- Hintergrundbild -->
    <div class="absolute inset-0 z-0">
      <img
        src={backgroundImage}
        alt={backgroundAlt}
        class="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
    </div>

    <!-- Hero Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
      <div class="text-center w-full">
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
          {title.line1}
        </h1>
        
        <p class="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  </div>

  <!-- Content Cards Section -->
  <div class="relative z-20 -mt-24">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <!-- Latest Event Card -->
        {#if latestEvent}
          <Card.Root class="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
            <Card.Header class="pb-3">
              <div class="flex items-center justify-between mb-2">
                <Badge class="bg-primary-500 text-white">
                  <Icon icon="mdi:calendar-star" class="w-3 h-3 mr-1" />
                  Nächstes Event
                </Badge>
                <span class="text-xs text-gray-500">
                  {format(new Date(latestEvent.startDate), 'dd. MMM', { locale: de })}
                </span>
              </div>
              <Card.Title class="text-base font-semibold line-clamp-2">
                {latestEvent.title}
              </Card.Title>
            </Card.Header>
            <Card.Content class="pt-0 flex-1 flex flex-col">
              <p class="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
                {latestEvent.location?.templeCity || latestEvent.location?.externalVenue?.name || 'Online'}
              </p>
              <a 
                href="#events" 
                class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-3 w-full hover:bg-primary-500/10 hover:text-primary-600"
                on:click|preventDefault={() => document.querySelector('#events')?.scrollIntoView({behavior: 'smooth'})}
              >
                Details anzeigen
                <Icon icon="mdi:arrow-right" class="w-4 h-4 ml-1" />
              </a>
            </Card.Content>
          </Card.Root>
        {/if}

        <!-- Latest Blog Post Card -->
        {#if latestPost}
          <Card.Root class="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
            <Card.Header class="pb-3">
              <div class="flex items-center justify-between mb-2">
                <Badge class="bg-primary-500 text-white">
                  <Icon icon="mdi:newspaper" class="w-3 h-3 mr-1" />
                  Neueste News
                </Badge>
                <span class="text-xs text-gray-500">Neu</span>
              </div>
              <Card.Title class="text-base font-semibold line-clamp-2">
                {latestPost.title}
              </Card.Title>
            </Card.Header>
            <Card.Content class="pt-0 flex-1 flex flex-col">
              <p class="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
                {latestPost.description}
              </p>
              <a 
                href="#blog" 
                class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-3 w-full hover:bg-primary-500/10 hover:text-primary-600"
                on:click|preventDefault={() => document.querySelector('#blog')?.scrollIntoView({behavior: 'smooth'})}
              >
                Weiterlesen
                <Icon icon="mdi:arrow-right" class="w-4 h-4 ml-1" />
              </a>
            </Card.Content>
          </Card.Root>
        {/if}

        <!-- Daily Inspiration Card -->
        <Card.Root class="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <Card.Header class="pb-3">
            <div class="flex items-center justify-between mb-2">
              <Badge class="bg-primary-500 text-white">
                <Icon icon="mdi:format-quote-open" class="w-3 h-3 mr-1" />
                Vers des Tages
              </Badge>
              <Icon icon="mdi:book-heart" class="w-4 h-4 text-amber-600" />
            </div>
            <Card.Title class="text-base font-semibold">
              {dailyInspiration.source}
            </Card.Title>
          </Card.Header>
          <Card.Content class="pt-0">
            <p class="text-sm text-gray-700 italic mb-3 line-clamp-3 flex-1">
              "{dailyInspiration.verse}"
            </p>
            <a 
              href="/philosophie/vedische-schriften" 
              class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-3 w-full hover:bg-primary-500/10 hover:text-primary-600"
            >
              Mehr erfahren
              <Icon icon="mdi:arrow-right" class="w-4 h-4 ml-1" />
            </a>
          </Card.Content>
        </Card.Root>

        <Card.Root class="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <Card.Header class="pb-3">
            <div class="flex items-center justify-between mb-2">
              <Badge class="bg-primary-500 text-white">
                <Icon icon="mdi:account-group" class="w-3 h-3 mr-1" />
                Community
              </Badge>
              <Icon icon="mdi:heart" class="w-4 h-4 text-primary-500" />
            </div>
            <Card.Title class="text-base font-semibold">
              ISKCON Deutschland
            </Card.Title>
          </Card.Header>
          <Card.Content class="pt-0">
            <p class="text-2xl font-bold text-primary-600 mb-1">
              10+ Tempel
            </p>
            <p class="text-sm text-gray-600 mb-3 flex-1">
              Deutschlandweit für Sie da
            </p>
            <a 
              href="#tempel" 
              class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-3 w-full hover:bg-primary-500/10 hover:text-primary-600"
              on:click|preventDefault={() => document.querySelector('#tempel')?.scrollIntoView({behavior: 'smooth'})}
            >
              Tempel finden
              <Icon icon="mdi:arrow-right" class="w-4 h-4 ml-1" />
            </a>
          </Card.Content>
        </Card.Root>
      </div>

    </div>
  </div>
</section>

