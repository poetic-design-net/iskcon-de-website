<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import Icon from '@iconify/svelte';
  import SanityImage from '$lib/components/global/SanityImage.svelte';
  import type { SanityImage as SanityImageType } from '$lib/types';

  export let theme: 'hare-krishna' | 'bhakti-yoga' | 'mantra-meditation' | 'tempel-besuchen';
  export let layout: 'imageLeft' | 'imageRight' | 'imageFull' = 'imageLeft';
  export let headline: string;
  export let teaser: string;
  export let highlight: string | undefined = undefined;
  export let image: SanityImageType;
  export let ctaText: string = 'Mehr erfahren';
  export let ctaLink: string;
  export let badge: string | undefined = undefined;
  
  let visible = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible = true;
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`theme-${theme}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  });

  // Theme-spezifische Farben und Icons
  const themeConfig = {
    'hare-krishna': {
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200',
      icon: 'mdi:hinduism-om',
      gradient: 'from-primary-500/10 to-transparent'
    },
    'bhakti-yoga': {
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      icon: 'mdi:yoga',
      gradient: 'from-emerald-500/10 to-transparent'
    },
    'mantra-meditation': {
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      icon: 'mdi:meditation',
      gradient: 'from-purple-500/10 to-transparent'
    },
    'tempel-besuchen': {
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      icon: 'mdi:temple-hindu',
      gradient: 'from-amber-500/10 to-transparent'
    }
  };

  const config = themeConfig[theme];
</script>

<section
  id="theme-{theme}"
  class="{layout === 'imageFull' ? 'relative h-full min-h-[70vh]' : 'py-16 md:py-24'} overflow-hidden"
>
  {#if layout === 'imageFull'}
    <!-- Vollbild-Layout mit Overlay -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-0 w-full h-full">
        <SanityImage
          src={image}
          alt={headline}
          className="w-full h-full object-cover object-center"
          objectFit="cover"
          width={1920}
          height={1080}
        />
      </div>
      <div class="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20"></div>
    </div>
    
    <div class="relative z-10 w-full h-full flex items-center min-h-[70vh]">
      {#if visible}
        <div class="container mx-auto px-4">
          <div
            class="text-white max-w-3xl"
            in:fly={{ x: -50, duration: 800 }}
          >
          {#if badge}
            <Badge class="mb-4 bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30">
              <Icon icon={config.icon} class="w-4 h-4 mr-1.5" />
              {badge}
            </Badge>
          {/if}
          
          <h2 class="text-4xl md:text-5xl font-medium mb-6">{headline}</h2>
          <p class="text-lg md:text-xl mb-8 leading-relaxed opacity-90">{teaser}</p>
          
          {#if highlight}
            <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 mb-8">
              <div class="flex items-start gap-3">
                <Icon icon="mdi:information" class="w-5 h-5 text-white/90 flex-shrink-0 mt-0.5" />
                <p class="text-white/90 text-sm leading-relaxed">
                  {highlight}
                </p>
              </div>
            </div>
          {/if}
          
          <Button 
            href={ctaLink}
            size="lg"
            class="bg-white text-gray-900 hover:bg-gray-100"
          >
            {ctaText}
            <Icon icon="mdi:arrow-right" class="w-5 h-5 ml-2" />
          </Button>
          </div>
        </div>
      {/if}
    </div>
  {:else}
    <!-- Zweispalten-Layout -->
    <div class="container mx-auto px-4">
      {#if layout === 'imageLeft'}
        <!-- Image Left Layout -->
        <div class="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <!-- Bild-Spalte (links) -->
          <div
            class="relative md:col-start-1 md:col-end-2"
          >
            <div class="relative overflow-hidden rounded-2xl shadow-2xl">
              <SanityImage
                src={image}
                alt={headline}
                width={800}
                height={600}
                className="w-full h-full object-cover"
                objectFit="cover"
              />
              
            </div>
            
          </div>
          
          <!-- Text-Spalte (rechts) -->
          <div
            class="space-y-6 md:col-start-2 md:col-end-3"
          >
          {#if badge}
            <Badge variant="secondary" class="mb-4">
              <Icon icon={config.icon} class="w-4 h-4 mr-1.5" />
              {badge}
            </Badge>
          {/if}
          
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 leading-tight">
            {headline}
          </h2>
          
          <p class="text-lg md:text-xl text-gray-600 leading-relaxed">
            {teaser}
          </p>
          
          {#if highlight}
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <div class="flex items-start gap-3">
                <Icon icon="mdi:information" class="w-5 h-5 {config.color} flex-shrink-0 mt-0.5" />
                <p class="text-gray-700 text-sm leading-relaxed">
                  {highlight}
                </p>
              </div>
            </div>
          {/if}
          
          
          <div class="pt-2">
            <Button 
              href={ctaLink}
              size="lg"
              variant="default"
            >
              {ctaText}
              <Icon 
                icon="mdi:arrow-right" 
                class="w-5 h-5 ml-2" 
              />
            </Button>
          </div>
        </div>
      </div>
      {:else}
        <!-- Image Right Layout -->
        <div class="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <!-- Text-Spalte (links) -->
          <div
            class="space-y-6"
          >
            {#if badge}
              <Badge variant="secondary" class="mb-4">
                <Icon icon={config.icon} class="w-4 h-4 mr-1.5" />
                {badge}
              </Badge>
            {/if}
            
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 leading-tight">
              {headline}
            </h2>
            
            <p class="text-lg md:text-xl text-gray-600 leading-relaxed">
              {teaser}
            </p>
            
            {#if highlight}
              <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <div class="flex items-start gap-3">
                  <Icon icon="mdi:information" class="w-5 h-5 {config.color} flex-shrink-0 mt-0.5" />
                  <p class="text-gray-700 text-sm leading-relaxed">
                    {highlight}
                  </p>
                </div>
              </div>
            {/if}
            
            
            <div class="flex flex-wrap gap-4 pt-4">
              <Button
                href={ctaLink}
                size="lg"
                variant="default"
              >
                {ctaText}
                <Icon
                  icon="mdi:arrow-right"
                  class="w-5 h-5 ml-2"
                />
              </Button>
              
              <Button
                href="/kontakt"
                variant="outline"
                size="lg"
              >
                <Icon icon="mdi:phone" class="w-5 h-5 mr-2" />
                Kontakt aufnehmen
              </Button>
            </div>
          </div>
          
          <!-- Bild-Spalte (rechts) -->
          <div
            class="relative"
          >
            <div class="relative overflow-hidden rounded-2xl shadow-2xl">
              <SanityImage
                src={image}
                alt={headline}
                width={800}
                height={600}
                className="w-full h-full object-cover"
                objectFit="cover"
              />
              
            </div>
            
          </div>
        </div>
      {/if}
    </div>
  {/if}
</section>

