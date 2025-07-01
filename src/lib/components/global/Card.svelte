<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import Icon from '@iconify/svelte';

  export let title: string;
  export let description: string;
  export let slug: string;
  export let mainImage: { asset: { url: string } } | undefined = undefined;
  
  const defaultImageUrl = 'https://images.unsplash.com/photo-1714248376043-8c8e85c24826';
  const imageUrl = mainImage?.asset?.url || defaultImageUrl;
</script>

<Card.Root class="group h-full overflow-hidden border-border/50 hover:border-spiritual-saffron-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
  <!-- Image Section with Overlay -->
  <div class="relative aspect-video overflow-hidden">
    <img
      src={imageUrl.includes('?') ? imageUrl : `${imageUrl}?auto=format&fit=crop&w=800&q=60`}
      alt={title}
      class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
    
    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20"></div>
    
    <!-- Featured Badge -->
    <div class="absolute top-4 right-4">
      <Badge class="bg-spiritual-saffron-500/90 text-white backdrop-blur-sm border-0">
        <Icon icon="mdi:star" class="w-3 h-3 mr-1" />
        Neu
      </Badge>
    </div>

    <!-- Content Overlay on Image -->
    <div class="absolute inset-0 p-6 flex flex-col justify-end">
      <div class="space-y-3">
        <h2 class="text-xl font-medium text-white group-hover:text-spiritual-saffron-200 transition-colors duration-300">
          {title}
        </h2>
        <p class="text-gray-200 group-hover:text-white transition-colors duration-300 text-sm leading-relaxed line-clamp-2">
          {description}
        </p>
        
        <!-- Meta Info -->
        <div class="flex items-center gap-4 text-xs text-gray-300">
          <div class="flex items-center gap-1">
            <Icon icon="mdi:clock-outline" class="w-3 h-3" />
            <span>5 Min</span>
          </div>
          <div class="flex items-center gap-1">
            <Icon icon="mdi:eye" class="w-3 h-3" />
            <span>128</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Alternative: Card with separate content section -->
  <div class="hidden">
    <Card.Content class="p-6">
      <Card.Title class="text-xl font-medium text-card-foreground group-hover:text-spiritual-saffron-700 transition-colors duration-300 mb-3">
        {title}
      </Card.Title>
      
      <Card.Description class="text-muted-foreground leading-relaxed mb-4">
        {description}
      </Card.Description>

      <!-- Meta Information -->
      <div class="flex items-center gap-4 text-sm text-muted-foreground">
        <div class="flex items-center gap-1">
          <Icon icon="mdi:clock-outline" class="w-4 h-4" />
          <span>5 Min Lesezeit</span>
        </div>
        <div class="flex items-center gap-1">
          <Icon icon="mdi:calendar" class="w-4 h-4" />
          <span>Heute</span>
        </div>
      </div>
    </Card.Content>

    <Card.Footer class="p-6 pt-0">
      <Button 
        href="/{slug}" 
        class="w-full group/btn hover:bg-spiritual-saffron-50 hover:border-spiritual-saffron-300 hover:text-spiritual-saffron-700"
        variant="outline"
      >
        <span class="mr-2">Weiterlesen</span>
        <Icon 
          icon="mdi:arrow-right" 
          class="w-4 h-4 transition-transform group-hover/btn:translate-x-1" 
        />
      </Button>
    </Card.Footer>
  </div>

  <!-- Click Area -->
  <a 
    href="/{slug}" 
    class="absolute inset-0 z-10"
    aria-label="Zum Artikel: {title}"
  ></a>
</Card.Root>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>