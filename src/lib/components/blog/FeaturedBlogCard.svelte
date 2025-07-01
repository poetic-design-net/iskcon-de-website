<script lang="ts">
  import type { SanityPostProjected } from '$lib/types';
  import { format } from 'date-fns';
  import { de } from 'date-fns/locale';
  import SanityImage from '$lib/components/global/SanityImage.svelte';
  import * as Card from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import Icon from '@iconify/svelte';

  export let post: SanityPostProjected;

  $: publishedDate = post.publishedAt 
    ? format(new Date(post.publishedAt), 'dd. MMMM yyyy', { locale: de })
    : '';

  $: excerpt = post.excerpt || post.description || '';
  $: truncatedExcerpt = excerpt.length > 250 ? excerpt.substring(0, 250) + '...' : excerpt;
  $: featuredImage = post.featuredImage;
</script>

{#if post}
<article class="featured-card">
  <Card.Root class="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card">
    <!-- Featured Image -->
    {#if featuredImage}
      <div class="featured-image">
        <a href="/blog/{post.slug}" class="block">
          <SanityImage 
            src={featuredImage}
            alt={post.title}
            className="h-full w-full transition-transform duration-500 group-hover:scale-105"
            width={1200}
            objectFit="cover"
          />
        </a>
      </div>
    {:else}
      <!-- Fallback für Posts ohne Bild -->
      <div class="featured-image fallback-image">
        <a href="/blog/{post.slug}" class="block h-full">
          <div class="h-full w-full bg-gradient-to-br from-spiritual-saffron-100 to-spiritual-saffron-200 flex items-center justify-center">
            <Icon icon="mdi:image-off" class="w-24 h-24 text-spiritual-saffron-400" />
          </div>
        </a>
      </div>
    {/if}

    <Card.Header class="pb-4">
      <!-- Categories -->
      {#if post.categories && post.categories.length > 0}
        <div class="categories-badges">
          {#each post.categories as category}
            <Badge class="bg-spiritual-saffron-500/90 text-white hover:bg-spiritual-saffron-600 backdrop-blur-sm border-0 mr-2 mb-2">
              <Icon icon="mdi:tag" class="w-3 h-3 mr-1" />
              {category.title}
            </Badge>
          {/each}
        </div>
      {/if}

      <!-- Title -->
      <Card.Title class="featured-title">
        <a 
          href="/blog/{post.slug}"
          class="hover:text-spiritual-saffron-700 transition-colors duration-200"
        >
          {post.title}
        </a>
      </Card.Title>

      <!-- Publication Date -->
      {#if publishedDate}
        <div class="meta-info">
          <Icon icon="mdi:calendar" class="w-4 h-4" />
          <time class="date">{publishedDate}</time>
        </div>
      {/if}
    </Card.Header>

    <Card.Content class="pb-6">
      <!-- Excerpt -->
      {#if truncatedExcerpt}
        <p class="excerpt">
          {truncatedExcerpt}
        </p>
      {/if}

      <!-- Tags -->
      {#if post.tags && post.tags.length > 0}
        <div class="tags-section">
          {#each post.tags.slice(0, 4) as tag}
            <Badge variant="outline" class="text-xs text-muted-foreground hover:bg-spiritual-saffron-50 hover:text-spiritual-saffron-700 hover:border-spiritual-saffron-300 mr-2 mb-2">
              #{tag}
            </Badge>
          {/each}
          {#if post.tags.length > 4}
            <Badge variant="outline" class="text-xs text-muted-foreground">
              +{post.tags.length - 4}
            </Badge>
          {/if}
        </div>
      {/if}
    </Card.Content>

    <Card.Footer class="pt-0">
      <Button 
        href="/blog/{post.slug}"
        class="w-full group/btn bg-spiritual-saffron-500 hover:bg-spiritual-saffron-600 text-white"
      >
        <span class="mr-2">Artikel lesen</span>
        <Icon 
          icon="mdi:arrow-right" 
          class="w-4 h-4 transition-transform group-hover/btn:translate-x-1" 
        />
      </Button>
    </Card.Footer>
  </Card.Root>
</article>
{/if}

<style>
  .featured-card {
    max-width: 100%;
  }

  .featured-image {
    position: relative;
    overflow: hidden;
    aspect-ratio: 16/9;
  }

  .featured-image.fallback-image {
    min-height: 300px;
  }

  .categories-badges {
    margin-bottom: 1rem;
  }

  .featured-title {
    font-size: 1.875rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
    color: hsl(var(--foreground));
  }

  .meta-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: hsl(var(--muted-foreground));
    margin-bottom: 0.5rem;
  }

  .excerpt {
    font-size: 1rem;
    line-height: 1.6;
    color: hsl(var(--muted-foreground));
    margin-bottom: 1rem;
  }

  .tags-section {
    margin-top: 1rem;
  }

  /* Responsive Design */
  @media (min-width: 1024px) {
    .featured-title {
      font-size: 2.25rem;
    }

    .excerpt {
      font-size: 1.125rem;
    }

    .featured-image {
      aspect-ratio: 21/9;
    }
  }
</style>