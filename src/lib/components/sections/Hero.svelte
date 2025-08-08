<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import Icon from '@iconify/svelte';
  
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
  
  
  // Merge props with defaults
  $: title = heroData?.title || defaults.title;
  $: subtitle = heroData?.subtitle || defaults.subtitle;
  $: backgroundImage = heroData?.backgroundImage?.asset?.url || defaults.backgroundImage.url;
  $: backgroundAlt = heroData?.backgroundImage?.alt || defaults.backgroundImage.alt;
  $: buttons = heroData?.buttons || [
    { text: 'Mehr erfahren', link: '/ueber-uns', variant: 'default' },
    { text: 'Events', link: '/events', variant: 'outline' }
  ];
</script>

<section class="relative">
  <!-- Minimalistischer Hero-Bereich mit Hintergrundbild -->
  <div class="relative h-[600px] md:h-[700px] overflow-hidden">
    <!-- Hintergrundbild -->
    <div class="absolute inset-0 z-0">
      <img
        src={backgroundImage}
        alt={backgroundAlt}
        class="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
    </div>

    <!-- Hero Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
      <div class="text-center w-full">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          {title.line1}
        </h1>
        
        <p class="text-xl sm:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed mb-12">
          {subtitle}
        </p>

        <!-- Call-to-Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          {#each buttons as button}
            <Button 
              href={button.link}
              variant={button.variant === 'outline' ? 'outline' : 'default'}
              size="lg"
              class="{button.variant === 'outline' ? 'bg-white/90 hover:bg-white text-gray-900 border-white' : 'bg-primary-500 hover:bg-primary-600 text-white'}"
            >
              {#if button.icon}
                <Icon icon={button.icon} class="w-5 h-5 mr-2" />
              {/if}
              {button.text}
            </Button>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

