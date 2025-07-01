<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import SanityImage from '$lib/components/global/SanityImage.svelte';
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import Icon from '@iconify/svelte';
  import type { SanityImage as SanityImageType } from '$lib/types';

  export let title: string | undefined = undefined;
  export let subtitle: string | undefined = undefined;
  export let items: Array<{
    title: string;
    description: string;
    image?: SanityImageType;
    link?: string;
  }>;
  export let columns: 2 | 3 | 4 = 3;
  export let backgroundColor: 'white' | 'gray' | 'primary' = 'white';

  let visible = false;

  // Hintergrundfarben-Klassen für shadcn
  const bgClasses = {
    white: 'bg-background',
    gray: 'bg-muted/30',
    primary: 'bg-spiritual-saffron-50/50'
  };

  // Spalten-Klassen
  const columnClasses = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4'
  };

  onMount(() => {
    visible = true;
  });
</script>

<section 
  class="py-12 md:py-20 px-4 {bgClasses[backgroundColor]}" 
  aria-labelledby={title ? 'grid-section-title' : undefined}
>
  <div class="container mx-auto">
    <!-- Überschrift und Untertitel -->
    {#if title || subtitle}
      <div class="text-center mb-12">
        {#if title && visible}
          <h2 
            id="grid-section-title"
            class="text-2xl md:text-3xl font-medium mb-4 text-foreground flex items-center justify-center gap-3"
            in:fly={{ y: 20, duration: 800, delay: 100 }}
          >
            <Icon icon="mdi:view-grid" class="w-8 h-8 text-spiritual-saffron-500" />
            {title}
          </h2>
        {/if}
        
        {#if subtitle && visible}
          <p 
            class="text-lg text-muted-foreground max-w-3xl mx-auto"
            in:fly={{ y: 20, duration: 800, delay: 200 }}
          >
            {subtitle}
          </p>
        {/if}
      </div>
    {/if}
    
    <!-- Grid mit shadcn Cards -->
    <div class="grid gap-6 sm:gap-8 {columnClasses[columns]}">
      {#each items as item, i}
        {#if visible}
          <div 
            class="h-full"
            in:fly={{ y: 20, duration: 800, delay: 300 + i * 100 }}
          >
            <Card.Root class="h-full flex flex-col group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-spiritual-saffron-200">
              <!-- Bild -->
              {#if item.image}
                <div class="relative overflow-hidden rounded-t-lg">
                  <div class="aspect-video">
                    <SanityImage
                      src={item.image}
                      alt={item.title}
                      width={800}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      objectFit="cover"
                    />
                  </div>
                  <!-- Overlay Gradient -->
                  <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              {/if}
              
              <!-- Card Content -->
              <Card.Header class="flex-shrink-0">
                <Card.Title class="text-xl font-medium text-card-foreground group-hover:text-spiritual-saffron-700 transition-colors">
                  {item.title}
                </Card.Title>
              </Card.Header>

              <Card.Content class="flex-grow">
                <p class="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </Card.Content>
              
              <!-- Card Footer mit Link/Button -->
              {#if item.link}
                <Card.Footer class="pt-4">
                  <Button 
                    variant="outline" 
                    class="w-full group/btn hover:bg-spiritual-saffron-50 hover:border-spiritual-saffron-300"
                    href={item.link}
                  >
                    <span class="mr-2">Mehr erfahren</span>
                    <Icon 
                      icon="mdi:arrow-right" 
                      class="w-4 h-4 transition-transform group-hover/btn:translate-x-1" 
                    />
                  </Button>
                </Card.Footer>
              {:else}
                <!-- Wenn kein Link, dann Badge für "Nur Information" -->
                <Card.Footer class="pt-4">
                  <Badge variant="secondary" class="w-full justify-center py-2">
                    <Icon icon="mdi:information" class="w-4 h-4 mr-2" />
                    Information
                  </Badge>
                </Card.Footer>
              {/if}
            </Card.Root>
          </div>
        {/if}
      {/each}
    </div>

    <!-- Optional: Zusätzliche Aktionen -->
    {#if items.length > 6}
      <div class="text-center mt-12" in:fade={{ delay: 800 }}>
        <Button variant="outline" size="lg" class="hover:bg-spiritual-saffron-50">
          <Icon icon="mdi:dots-horizontal" class="w-5 h-5 mr-2" />
          Weitere anzeigen
        </Button>
      </div>
    {/if}
  </div>
</section>

<style lang="postcss">
  /* Aspect ratio utility für bessere Browser-Kompatibilität */
  .aspect-video {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
  }
  
  .aspect-video > :global(*) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>