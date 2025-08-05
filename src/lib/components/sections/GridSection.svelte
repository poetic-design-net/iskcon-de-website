<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import Icon from '@iconify/svelte';

  export let items: Array<{
    title: string;
    description: string;
    slug: string;
    mainImage?: { asset: { url: string } };
  }>;

  let visible = false;

  onMount(() => {
    visible = true;
  });
</script>

<section class="px-4 py-12 bg-muted/20">
  <div class="container mx-auto">
    <!-- Section Header -->
    {#if visible}
      <div class="text-center mb-12" in:fly={{ y: 20, duration: 600 }}>
        <div class="flex items-center justify-center gap-3 mb-4">
          <Icon icon="mdi:view-grid" class="w-8 h-8 text-primary-500" />
          <h2 class="text-3xl font-medium text-foreground">Entdecken Sie ISKCON</h2>
        </div>
        <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
          Tauchen Sie ein in die Welt des Krishna-Bewusstseins und entdecken Sie unsere spirituellen Angebote
        </p>
      </div>
    {/if}

    <!-- Grid Cards -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each items as item, i}
        {#if visible}
          <div in:fly={{ y: 30, duration: 600, delay: i * 150 }}>
            <Card.Root class="group h-full overflow-hidden border-border/50 hover:border-primary-500/30 hover:shadow-lg transition-all duration-300">
              <!-- Image Section -->
              <div class="relative aspect-video overflow-hidden">
                <img
                  src={item.mainImage?.asset?.url || 'https://images.unsplash.com/photo-1714248376043-8c8e85c24826?auto=format&fit=crop&w=800&q=60'}
                  alt={item.title}
                  class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                <!-- Featured Badge -->
                <div class="absolute top-4 right-4">
                  <Badge class="bg-primary-500/90 text-white backdrop-blur-sm border-0">
                    <Icon icon="mdi:star" class="w-3 h-3 mr-1" />
                    Empfohlen
                  </Badge>
                </div>
              </div>

              <!-- Content Section -->
              <Card.Content class="p-6">
                <Card.Title class="text-xl font-medium text-card-foreground group-hover:text-primary-500 transition-colors duration-300 mb-3">
                  {item.title}
                </Card.Title>
                
                <Card.Description class="text-muted-foreground leading-relaxed mb-4">
                  {item.description}
                </Card.Description>

                <!-- Meta Information -->
                <div class="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div class="flex items-center gap-1">
                    <Icon icon="mdi:clock-outline" class="w-4 h-4" />
                    <span>5 Min Lesezeit</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <Icon icon="mdi:eye" class="w-4 h-4" />
                    <span>248 Aufrufe</span>
                  </div>
                </div>
              </Card.Content>

              <!-- Footer with CTA -->
              <Card.Footer class="p-6 pt-0">
                <Button 
                  href="/{item.slug}" 
                  class="w-full group/btn hover:bg-primary-500/10 hover:border-primary-500/30 hover:text-primary-500"
                  variant="outline"
                >
                  <span class="mr-2">Mehr erfahren</span>
                  <Icon 
                    icon="mdi:arrow-right" 
                    class="w-4 h-4 transition-transform group-hover/btn:translate-x-1" 
                  />
                </Button>
              </Card.Footer>
            </Card.Root>
          </div>
        {/if}
      {/each}
    </div>

    <!-- Call to Action -->
    {#if visible && items.length > 0}
      <div class="text-center mt-12" in:fade={{ delay: 800 }}>
        <Button 
          variant="outline" 
          size="lg"
          class="hover:bg-primary-500/10 hover:border-primary-500/30 hover:text-primary-500"
        >
          <Icon icon="mdi:plus-circle" class="w-5 h-5 mr-2" />
          Alle Inhalte anzeigen
        </Button>
      </div>
    {/if}
  </div>
</section>