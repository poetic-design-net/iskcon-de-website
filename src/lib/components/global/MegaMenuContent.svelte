<script lang="ts">
  import Icon from '@iconify/svelte';
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { Separator } from '$lib/components/ui/separator';
  import { Badge } from '$lib/components/ui/badge';
  import MegaMenuSection from './MegaMenuSection.svelte';

  export let item: {
    title: string;
    slug: string;
    icon?: string;
    sections?: Array<{
      title: string;
      items: Array<{
        title: string;
        slug: string;
        description?: string;
        icon?: string;
      }>;
    }>;
    featured?: {
      title: string;
      description: string;
      image?: string;
      href: string;
    };
  };

  // Svelte 5: Event handling through callback props
  export let onitemclick: (() => void) | undefined = undefined;

  const handleItemClick = () => {
    onitemclick?.();
  };

  // Bestimme das Grid-Layout basierend auf der Anzahl der Sections
  $: gridCols = item.sections ? Math.min(item.sections.length, 4) : 1;
  $: gridClass = `grid-cols-${gridCols}`;
</script>

<Card.Root class="w-screen max-w-6xl bg-background/95 backdrop-blur-md border border-border shadow-2xl rounded-xl overflow-hidden">
  <div class="p-8">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <Icon icon={item.icon || 'mdi:menu'} class="w-6 h-6 text-spiritual-saffron-600" />
      <h2 class="text-xl font-medium text-foreground">{item.title}</h2>
    </div>

    <!-- Main Content Grid -->
    <div class={`grid ${gridClass} gap-8`}>
      <!-- Sections -->
      {#if item.sections}
        {#each item.sections as section}
          <MegaMenuSection
            {section}
            onitemclick={handleItemClick}
          />
        {/each}
      {/if}
    </div>

    <!-- Featured Content -->
    {#if item.featured}
      <Separator class="my-6" />
      
      <div class="bg-gradient-to-r from-spiritual-saffron-50 to-spiritual-gold-50 rounded-lg p-6">
        <div class="flex items-start gap-4">
          {#if item.featured.image}
            <div class="flex-shrink-0">
              <img 
                src={item.featured.image} 
                alt={item.featured.title}
                class="w-16 h-16 rounded-lg object-cover"
              />
            </div>
          {/if}
          
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <Badge variant="secondary" class="bg-spiritual-saffron-100 text-spiritual-saffron-800">
                Featured
              </Badge>
            </div>
            
            <h3 class="font-medium text-foreground mb-2">{item.featured.title}</h3>
            <p class="text-sm text-muted-foreground mb-3">{item.featured.description}</p>
            
            <Button 
              variant="outline" 
              size="sm"
              href={item.featured.href}
              class="text-spiritual-saffron-700 border-spiritual-saffron-200 hover:bg-spiritual-saffron-50"
              on:click={handleItemClick}
            >
              Mehr erfahren
              <Icon icon="mdi:arrow-right" class="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    {/if}
  </div>
</Card.Root>