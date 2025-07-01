<script lang="ts">
  import type { SanityPostProjected } from '$lib/types';
  import { format } from 'date-fns';
  import { de } from 'date-fns/locale';
  import SanityImage from './SanityImage.svelte';
  import * as Card from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import Icon from '@iconify/svelte';
  import { calculateReadingTime, formatPublishDate, getCategoryColor } from '$lib/utils/blogUtils';

  export let post: SanityPostProjected;

  // Enhanced Utility Functions Integration (Phase 5)
  $: readingTime = calculateReadingTime(post);
  $: formattedDate = formatPublishDate(post.publishedAt || new Date().toISOString());
</script>

{#if post}
<Card.Root class="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card">
  <!-- Image Section -->
  <div class="relative aspect-[16/10] overflow-hidden">
    {#if post.featuredImage}
      <SanityImage
        src={post.featuredImage}
        alt={post.title}
        className="h-full w-full transition-transform duration-500 group-hover:scale-110"
        width={800}
        objectFit="cover"
      />
    {:else}
      <!-- Fallback für Posts ohne Bild -->
      <div class="h-full w-full bg-gradient-to-br from-spiritual-saffron-100 to-spiritual-saffron-200 flex items-center justify-center">
        <Icon icon="mdi:image-off" class="w-16 h-16 text-spiritual-saffron-400" />
      </div>
    {/if}
    
    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
    
    <!-- Categories - Floating Badges with Dynamic Colors -->
    {#if post.categories && post.categories.length > 0}
      <div class="absolute top-4 left-4 flex flex-wrap gap-2">
        {#each post.categories as category}
          <Badge 
            class="text-white backdrop-blur-sm border-0 {getCategoryColor(category.title)}">
            <Icon icon="mdi:tag" class="w-3 h-3 mr-1" />
            {category.title}
          </Badge>
        {/each}
      </div>
    {/if}

    <!-- Reading Time Badge (Phase 5 Enhancement) -->
    {#if readingTime}
      <div class="absolute top-4 right-4">
        <Badge class="bg-black/70 text-white backdrop-blur-sm border-0">
          <Icon icon="mdi:clock-outline" class="w-3 h-3 mr-1" />
          {readingTime}
        </Badge>
      </div>
    {/if}
  </div>

  <!-- Content Section -->
  <Card.Content class="p-7">
    <!-- Title -->
    <Card.Title class="text-2xl font-medium text-card-foreground group-hover:text-spiritual-saffron-700 transition-colors duration-300 line-clamp-2 mb-4">
      {post.title}
    </Card.Title>
    
    <!-- Description -->
    <p class="text-muted-foreground group-hover:text-foreground transition-colors duration-300 line-clamp-3 mb-5 leading-relaxed text-base">
      {post.description}
    </p>
    
    <!-- Meta Information (Enhanced with Reading Time) -->
    <div class="flex items-center gap-2 text-sm text-muted-foreground mb-5">
      <Icon icon="mdi:calendar" class="w-4 h-4" />
      <time>{formattedDate}</time>
      {#if readingTime}
        <span class="text-muted-foreground/50">•</span>
        <div class="flex items-center gap-1">
          <Icon icon="mdi:clock-outline" class="w-4 h-4" />
          <span>{readingTime}</span>
        </div>
      {/if}
    </div>

    <!-- Tags -->
    {#if post.tags && post.tags.length > 0}
      <div class="flex flex-wrap gap-2 mb-5">
        {#each post.tags.slice(0, 3) as tag}
          <Badge variant="outline" class="text-xs text-muted-foreground hover:bg-spiritual-saffron-50 hover:text-spiritual-saffron-700 hover:border-spiritual-saffron-300">
            #{tag}
          </Badge>
        {/each}
        {#if post.tags.length > 3}
          <Badge variant="outline" class="text-xs text-muted-foreground">
            +{post.tags.length - 3}
          </Badge>
        {/if}
      </div>
    {/if}
  </Card.Content>

  <!-- Footer with CTA -->
  <Card.Footer class="p-7 pt-0">
    <Button
      href="/blog/{post.slug}"
      class="w-full group/btn bg-spiritual-saffron-500 hover:bg-spiritual-saffron-600 text-white py-3 text-base font-medium"
    >
      <span class="mr-2">Artikel lesen</span>
      <Icon
        icon="mdi:arrow-right"
        class="w-5 h-5 transition-transform group-hover/btn:translate-x-1"
      />
    </Button>
  </Card.Footer>

</Card.Root>
{/if}

<style>
  /* Line clamp utilities für bessere Browser-Kompatibilität */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>