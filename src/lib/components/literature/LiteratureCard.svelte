<script lang="ts">
  import type { Literature } from '$lib/types';
  import { formatPublishDate } from '$lib/utils/blogUtils';
  import { urlFor } from '$lib/sanity/client';

  export let book: Literature;
  export let featured = false;

  $: difficulty = book.difficulty?.toLowerCase() || 'beginner';
  $: bookType = book.bookType?.toLowerCase() || 'general';

  // Helper function to resolve slug
  function getSlug(slug: Literature['slug']): string {
    return typeof slug === 'string' ? slug : slug.current;
  }

  // Helper function to get cover image URL
  function getCoverImageUrl(coverImage: Literature['coverImage']): string {
    if (typeof coverImage === 'string') {
      return coverImage;
    }
    const imageBuilder = urlFor(coverImage);
    if (!imageBuilder) {
      return ''; // Fallback für fehlende Bilder
    }
    return imageBuilder.width(300).height(400).url();
  }
</script>

<article 
  class="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200"
  class:featured
>
  <!-- Book Cover Image -->
  <div class="aspect-[3/4] overflow-hidden bg-gray-100">
    {#if book.coverImage}
      <img 
        src={getCoverImageUrl(book.coverImage)}
        alt={book.title}
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    {:else}
      <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-yellow-100">
        <div class="text-center p-4">
          <div class="text-orange-600 text-4xl mb-2">📖</div>
          <div class="text-gray-600 text-sm font-medium">{book.title}</div>
        </div>
      </div>
    {/if}
  </div>

  <!-- Content -->
  <div class="p-4 flex-1 flex flex-col">
    <!-- Title -->
    <h3 class="font-medium text-gray-900 text-lg mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
      {book.title}
    </h3>

    <!-- Author/Translator -->
    {#if book.author || book.translator}
      <div class="text-sm text-gray-600 mb-3 space-y-1">
        {#if book.author}
          <div class="flex items-center gap-1">
            <span class="text-gray-400">von:</span>
            <span class="font-medium">{book.author.name}</span>
          </div>
        {/if}
        {#if book.translator}
          <div class="flex items-center gap-1">
            <span class="text-gray-400">übersetzt von:</span>
            <span>{book.translator.name}</span>
          </div>
        {/if}
      </div>
    {/if}

    <!-- Description -->
    {#if book.description}
      <p class="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
        {book.description}
      </p>
    {/if}

    <!-- Badges -->
    <div class="flex flex-wrap gap-2 mb-4">
      <!-- Book Type Badge -->
      <span class="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
        {book.bookType || 'Allgemein'}
      </span>
      
      <!-- Difficulty Badge -->
      <span 
        class="px-2 py-1 text-xs font-medium rounded-full"
        class:bg-green-100={difficulty === 'beginner'}
        class:text-green-700={difficulty === 'beginner'}
        class:bg-yellow-100={difficulty === 'intermediate'}
        class:text-yellow-700={difficulty === 'intermediate'}
        class:bg-red-100={difficulty === 'advanced'}
        class:text-red-700={difficulty === 'advanced'}
      >
        {#if difficulty === 'beginner'}
          Anfänger
        {:else if difficulty === 'intermediate'}
          Fortgeschritten
        {:else if difficulty === 'advanced'}
          Experte
        {:else}
          {book.difficulty}
        {/if}
      </span>
    </div>

    <!-- Sanskrit Terms Count -->
    {#if book.sanskritTerms && book.sanskritTerms.length > 0}
      <div class="text-xs text-gray-500 mb-3">
        🕉️ {book.sanskritTerms.length} Sanskrit-Begriff{book.sanskritTerms.length !== 1 ? 'e' : ''}
      </div>
    {/if}

    <!-- Footer -->
    <div class="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
      <!-- Publication Info -->
      <div class="text-xs text-gray-500">
        {#if book.publishedAt}
          {formatPublishDate(book.publishedAt)}
        {/if}
      </div>

      <!-- Read More Link -->
      <a 
        href="/literature/{getSlug(book.slug)}"
        class="text-orange-600 hover:text-orange-700 text-sm font-medium inline-flex items-center gap-1 transition-colors"
      >
        Lesen
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  </div>

  <!-- Availability Indicator -->
  {#if book.availability}
    <div class="absolute top-2 right-2">
      <span
        class="px-2 py-1 text-xs font-medium rounded-full shadow-sm"
        class:bg-green-500={book.availability === 'available'}
        class:bg-yellow-500={book.availability === 'coming_soon'}
        class:bg-gray-500={book.availability === 'unavailable'}
        class:text-white={book.availability === 'available' || book.availability === 'coming_soon' || book.availability === 'unavailable'}
      >
        {#if book.availability === 'available'}
          Verfügbar
        {:else if book.availability === 'coming_soon'}
          Bald verfügbar
        {:else}
          Nicht verfügbar
        {/if}
      </span>
    </div>
  {/if}
</article>

<style>
  .featured {
    @apply ring-2 ring-orange-200;
  }

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