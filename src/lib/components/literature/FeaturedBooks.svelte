<script lang="ts">
  import type { Literature } from '$lib/types';
  import { urlFor } from '$lib/sanity/client';
  import { formatPublishDate } from '$lib/utils/blogUtils';

  export let books: Literature[] = [];
  export let loading = false;

  // Helper-Funktion für Slug-Handling
  function getSlug(literature: Literature): string {
    return typeof literature.slug === 'string' 
      ? literature.slug 
      : literature.slug?.current || '';
  }

  // Helper-Funktion für Cover-Image
  function getCoverImageUrl(literature: Literature): string | null {
    if (!literature.coverImage) return null;
    
    if (typeof literature.coverImage === 'string') {
      return literature.coverImage;
    }
    
    return urlFor(literature.coverImage)?.auto('format').width(300).height(400).url() || null;
  }

  // Helper-Funktion für Autor-Name
  function getAuthorName(literature: Literature): string | null {
    if (!literature.author) return null;
    return typeof literature.author === 'object' ? literature.author.name : literature.author;
  }
</script>

{#if books.length > 0}
  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
          Empfohlene Literatur
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Entdecken Sie unsere sorgfältig ausgewählten spirituellen Bücher, 
          die Ihnen dabei helfen, Ihre spirituelle Reise zu vertiefen.
        </p>
      </div>

      <!-- Featured Books -->
      {#if loading}
        <!-- Loading Skeleton -->
        <div class="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {#each Array(5) as _}
            <div class="flex-shrink-0 w-80 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
              <div class="flex">
                <div class="w-32 h-40 bg-gray-200"></div>
                <div class="flex-1 p-6 space-y-4">
                  <div class="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div class="space-y-2">
                    <div class="h-3 bg-gray-200 rounded"></div>
                    <div class="h-3 bg-gray-200 rounded w-5/6"></div>
                    <div class="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                  <div class="flex gap-2">
                    <div class="h-6 bg-gray-200 rounded w-16"></div>
                    <div class="h-6 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <div class="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {#each books as book}
            <div class="flex-shrink-0 w-80 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden">
              <a href="/literature/{getSlug(book)}" class="flex h-full">
                <!-- Book Cover -->
                <div class="relative w-32 flex-shrink-0 bg-gray-100">
                  {#if getCoverImageUrl(book)}
                    <img
                      src={getCoverImageUrl(book)}
                      alt="{book.title} Cover"
                      class="w-full h-40 object-cover"
                      loading="lazy"
                    />
                  {:else}
                    <div class="w-full h-40 bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                      <svg class="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  {/if}
                  
                  <!-- Featured Badge -->
                  <div class="absolute top-2 left-2">
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Empfohlen
                    </span>
                  </div>
                </div>

                <!-- Book Content -->
                <div class="flex-1 p-6 flex flex-col">
                  <div class="flex-1">
                    <h3 class="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                      {book.title}
                    </h3>
                    
                    {#if getAuthorName(book)}
                      <p class="text-sm text-gray-600 mb-2">
                        von {getAuthorName(book)}
                      </p>
                    {/if}

                    {#if book.description}
                      <p class="text-sm text-gray-600 line-clamp-3 mb-4">
                        {book.description}
                      </p>
                    {/if}
                  </div>

                  <!-- Book Meta -->
                  <div class="flex flex-wrap gap-2 mt-auto">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                 bg-orange-100 text-orange-800 capitalize">
                      {book.bookType}
                    </span>
                    
                    {#if book.difficulty}
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                   bg-blue-100 text-blue-800 capitalize">
                        {book.difficulty}
                      </span>
                    {/if}

                    {#if book.publishedAt}
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                   bg-gray-100 text-gray-800">
                        {formatPublishDate(book.publishedAt)}
                      </span>
                    {/if}
                  </div>
                </div>
              </a>
            </div>
          {/each}
        </div>
      {/if}

      <!-- View All Link -->
      <div class="text-center mt-8">
        <a
          href="/literature"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg
                 text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 
                 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
        >
          Alle Bücher durchsuchen
          <svg class="ml-2 -mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  </section>
{/if}

<style>
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  /* Line clamp utilities */
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

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
</style>