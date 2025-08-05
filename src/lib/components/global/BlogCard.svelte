<script lang="ts">
  import type { SanityPostProjected } from '$lib/types';
  import { format } from 'date-fns';
  import { de } from 'date-fns/locale';
  import SanityImage from './SanityImage.svelte';
  import * as Card from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import Icon from '@iconify/svelte';
  import { calculateReadingTime, formatPublishDate } from '$lib/utils/blogUtils';

  export let post: SanityPostProjected;

  // Enhanced Utility Functions Integration (Phase 5)
  $: readingTime = calculateReadingTime(post);
  $: formattedDate = formatPublishDate(post.publishedAt || new Date().toISOString());
</script>

{#if post}
<Card.Root class="group h-full flex flex-col relative overflow-hidden border border-gray-200 bg-white">
  <!-- Image Section -->
  <div class="relative aspect-[16/10] overflow-hidden bg-gray-100">
    {#if post.featuredImage}
      <SanityImage
        src={post.featuredImage}
        alt={post.title}
        className="absolute inset-0 h-full w-full object-cover"
        width={800}
        objectFit="cover"
      />
    {:else}
      <!-- Fallback für Posts ohne Bild -->
      <div class="h-full w-full bg-gray-100 flex items-center justify-center">
        <Icon icon="mdi:image-off" class="w-16 h-16 text-gray-400" />
      </div>
    {/if}
    
    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
    
    <!-- Categories - Floating Badges with Dynamic Colors -->
    {#if post.categories && post.categories.length > 0}
      <div class="absolute top-4 left-4 flex flex-wrap gap-2">
        {#each post.categories as category}
          <Badge class="bg-primary-500 text-white border-0">
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

  <!-- Content wrapper to push button down -->
  <div class="flex-1 flex flex-col">
    <!-- Content Section -->
    <Card.Content class="p-6 flex-1 flex flex-col">
      <!-- Title -->
      <Card.Title class="text-lg font-medium text-gray-900 mb-3">
        {post.title}
      </Card.Title>
      
      <!-- Description -->
      <p class="text-gray-600 line-clamp-3 mb-4 leading-relaxed text-sm flex-1">
        {post.description}
      </p>
      
      <!-- Meta Information (Enhanced with Reading Time) -->
      <div class="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Icon icon="mdi:calendar" class="w-4 h-4" />
        <time>{formattedDate}</time>
        {#if readingTime}
          <span class="text-gray-400">•</span>
          <div class="flex items-center gap-1">
            <Icon icon="mdi:clock-outline" class="w-4 h-4" />
            <span>{readingTime}</span>
          </div>
        {/if}
      </div>

      <!-- Tags -->
      {#if post.tags && post.tags.length > 0}
        <div class="flex flex-wrap gap-2">
          {#each post.tags.slice(0, 3) as tag}
            <Badge variant="outline" class="text-xs text-gray-600 border-gray-300">
              #{tag}
            </Badge>
          {/each}
          {#if post.tags.length > 3}
            <Badge variant="outline" class="text-xs text-gray-500 border-gray-300">
              +{post.tags.length - 3}
            </Badge>
          {/if}
        </div>
      {/if}
    </Card.Content>
  </div>

  <!-- Footer with CTA - Always at bottom -->
  <Card.Footer class="p-6 pt-0">
    <Button
      href="/blog/{post.slug}"
      class="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 text-sm font-medium"
    >
      <span class="mr-2">Artikel lesen</span>
      <Icon
        icon="mdi:arrow-right"
        class="w-4 h-4"
      />
    </Button>
  </Card.Footer>

</Card.Root>
{/if}

<style>
  /* Line clamp utilities für bessere Browser-Kompatibilität */
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>