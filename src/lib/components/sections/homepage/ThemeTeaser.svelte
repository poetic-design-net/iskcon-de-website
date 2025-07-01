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
  let isHovered = false;

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
      color: 'text-spiritual-saffron-600',
      bgColor: 'bg-spiritual-saffron-50',
      borderColor: 'border-spiritual-saffron-200',
      icon: 'mdi:hinduism-om',
      gradient: 'from-spiritual-saffron-500/10 to-transparent'
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
  on:mouseenter={() => isHovered = true}
  on:mouseleave={() => isHovered = false}
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
        <div
          class="text-white px-8 md:px-12 lg:px-16"
          style="width: 50%; max-width: 800px;"
          in:fly={{ x: -50, duration: 800 }}
        >
          {#if badge}
            <Badge class="mb-4 bg-white/20 backdrop-blur-sm text-white border-0">
              <Icon icon={config.icon} class="w-4 h-4 mr-1" />
              {badge}
            </Badge>
          {/if}
          
          <h2 class="text-4xl md:text-5xl font-medium mb-6">{headline}</h2>
          <p class="text-lg md:text-xl mb-8 leading-relaxed opacity-90">{teaser}</p>
          
          {#if highlight}
            <blockquote class="border-l-4 border-white/50 pl-6 mb-8 italic text-lg">
              "{highlight}"
            </blockquote>
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
            class:opacity-0={!visible}
            class:animate-fade-in={visible}
            style="--animation-delay: 0.2s"
          >
            <div class="relative overflow-hidden rounded-2xl shadow-2xl">
              <div
                class="absolute inset-0 bg-gradient-to-t {config.gradient} z-10 pointer-events-none"
              ></div>
              <SanityImage
                src={image}
                alt={headline}
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-700 {isHovered ? 'scale-110' : 'scale-100'}"
                objectFit="cover"
              />
              
              <!-- Dekoratives Element -->
              <div class="absolute -top-6 -right-6 w-24 h-24 {config.bgColor} rounded-full opacity-50"></div>
              <div class="absolute -bottom-8 -left-8 w-32 h-32 {config.bgColor} rounded-full opacity-30"></div>
            </div>
            
            <!-- Theme Icon Badge -->
            <div class="absolute top-4 right-4 p-3 {config.bgColor} rounded-full shadow-lg">
              <Icon icon={config.icon} class="w-8 h-8 {config.color}" />
            </div>
          </div>
          
          <!-- Text-Spalte (rechts) -->
          <div
            class="space-y-6 md:col-start-2 md:col-end-3"
            class:opacity-0={!visible}
            class:animate-fade-in={visible}
            style="--animation-delay: 0.4s"
          >
          {#if badge}
            <Badge class="{config.bgColor} {config.color} border-0">
              <Icon icon={config.icon} class="w-4 h-4 mr-1" />
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
            <blockquote class="border-l-4 {config.borderColor} pl-6 py-2 {config.bgColor} rounded-r-lg">
              <p class="text-lg italic {config.color}">
                "{highlight}"
              </p>
            </blockquote>
          {/if}
          
          <!-- Feature Liste (optional) -->
          <div class="grid grid-cols-2 gap-4 pt-4">
            <div class="flex items-center gap-2 text-gray-600">
              <Icon icon="mdi:check-circle" class="w-5 h-5 {config.color}" />
              <span>Für Anfänger geeignet</span>
            </div>
            <div class="flex items-center gap-2 text-gray-600">
              <Icon icon="mdi:clock-outline" class="w-5 h-5 {config.color}" />
              <span>Flexible Zeiten</span>
            </div>
          </div>
          
          <div class="flex flex-wrap gap-4 pt-4">
            <Button 
              href={ctaLink}
              size="lg"
              class="group hover:{config.bgColor} hover:{config.borderColor} hover:{config.color}"
            >
              {ctaText}
              <Icon 
                icon="mdi:arrow-right" 
                class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" 
              />
            </Button>
            
            <Button
              href="/kontakt"
              variant="ghost"
              size="lg"
              class="{config.color} hover:{config.bgColor}"
            >
              <Icon icon="mdi:phone" class="w-5 h-5 mr-2" />
              Kontakt aufnehmen
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
            class:opacity-0={!visible}
            class:animate-fade-in={visible}
            style="--animation-delay: 0.4s"
          >
            {#if badge}
              <Badge class="{config.bgColor} {config.color} border-0">
                <Icon icon={config.icon} class="w-4 h-4 mr-1" />
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
              <blockquote class="border-l-4 {config.borderColor} pl-6 py-2 {config.bgColor} rounded-r-lg">
                <p class="text-lg italic {config.color}">
                  "{highlight}"
                </p>
              </blockquote>
            {/if}
            
            <!-- Feature Liste (optional) -->
            <div class="grid grid-cols-2 gap-4 pt-4">
              <div class="flex items-center gap-2 text-gray-600">
                <Icon icon="mdi:check-circle" class="w-5 h-5 {config.color}" />
                <span>Für Anfänger geeignet</span>
              </div>
              <div class="flex items-center gap-2 text-gray-600">
                <Icon icon="mdi:clock-outline" class="w-5 h-5 {config.color}" />
                <span>Flexible Zeiten</span>
              </div>
            </div>
            
            <div class="flex flex-wrap gap-4 pt-4">
              <Button
                href={ctaLink}
                size="lg"
                class="group hover:{config.bgColor} hover:{config.borderColor} hover:{config.color}"
              >
                {ctaText}
                <Icon
                  icon="mdi:arrow-right"
                  class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                />
              </Button>
              
              <Button
                href="/kontakt"
                variant="ghost"
                size="lg"
                class="{config.color} hover:{config.bgColor}"
              >
                <Icon icon="mdi:phone" class="w-5 h-5 mr-2" />
                Kontakt aufnehmen
              </Button>
            </div>
          </div>
          
          <!-- Bild-Spalte (rechts) -->
          <div
            class="relative"
            class:opacity-0={!visible}
            class:animate-fade-in={visible}
            style="--animation-delay: 0.2s"
          >
            <div class="relative overflow-hidden rounded-2xl shadow-2xl">
              <div
                class="absolute inset-0 bg-gradient-to-t {config.gradient} z-10 pointer-events-none"
              ></div>
              <SanityImage
                src={image}
                alt={headline}
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-700 {isHovered ? 'scale-110' : 'scale-100'}"
                objectFit="cover"
              />
              
              <!-- Dekoratives Element -->
              <div class="absolute -top-6 -right-6 w-24 h-24 {config.bgColor} rounded-full opacity-50"></div>
              <div class="absolute -bottom-8 -left-8 w-32 h-32 {config.bgColor} rounded-full opacity-30"></div>
            </div>
            
            <!-- Theme Icon Badge -->
            <div class="absolute top-4 right-4 p-3 {config.bgColor} rounded-full shadow-lg">
              <Icon icon={config.icon} class="w-8 h-8 {config.color}" />
            </div>
          </div>
        </div>
      {/if}
    </div>
  {/if}
</section>

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in {
    animation: fade-in 0.8s ease-out forwards;
    animation-delay: var(--animation-delay, 0s);
  }
</style>