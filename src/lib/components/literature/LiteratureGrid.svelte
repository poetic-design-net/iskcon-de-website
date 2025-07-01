<script lang="ts">
  import type { Literature } from '$lib/types';
  import LiteratureCard from './LiteratureCard.svelte';
  import { fade, fly } from 'svelte/transition';

  export let books: Literature[] = [];
  export let loading = false;
  export let error: string | null = null;
</script>

<div class="literature-grid">
  {#if error}
    <div class="flex items-center justify-center py-12" in:fade={{ duration: 300 }}>
      <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full text-center">
        <div class="text-red-600 mb-2">
          <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-red-900 mb-2">Fehler beim Laden</h3>
        <p class="text-red-700">{error}</p>
      </div>
    </div>
  {:else if loading}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" in:fade={{ duration: 200 }}>
      {#each Array(8) as _, index}
        <div
          class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse"
          in:fly={{ y: 20, duration: 200, delay: index * 50 }}
        >
          <div class="aspect-[3/4] bg-gray-200"></div>
          <div class="p-4 space-y-3">
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            <div class="space-y-2">
              <div class="h-3 bg-gray-200 rounded"></div>
              <div class="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div class="flex gap-2">
              <div class="h-6 bg-gray-200 rounded w-16"></div>
              <div class="h-6 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else if books.length === 0}
    <div class="flex flex-col items-center justify-center py-12 text-center" in:fade={{ duration: 300, delay: 100 }}>
      <div class="w-16 h-16 mb-4 text-gray-400">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Keine Bücher gefunden</h3>
      <p class="text-gray-600 max-w-md">
        Es wurden keine Bücher gefunden, die Ihren Suchkriterien entsprechen.
        Versuchen Sie, Ihre Filter zu ändern oder die Suche zu erweitern.
      </p>
    </div>
  {:else}
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      in:fade={{ duration: 250, delay: 50 }}
    >
      {#each books as book, index (book._id || book.slug || index)}
        <div
          class="book-item"
          in:fly={{ y: 20, duration: 200, delay: Math.min(index * 30, 200) }}
          out:fade={{ duration: 150 }}
        >
          <LiteratureCard {book} />
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .literature-grid {
    /* Stable container to prevent layout shifts */
    min-height: 400px;
    
    /* Optimize rendering performance */
    contain: layout style;
    
    /* Smooth transitions for content changes */
    transition: min-height 0.2s ease-in-out;
  }

  .book-item {
    /* Hardware acceleration for smooth animations */
    transform: translateZ(0);
    
    /* Smooth hover effects */
    transition: transform 0.2s ease-in-out;
  }

  .book-item:hover {
    transform: translateY(-2px) translateZ(0);
  }

  /* Ensure grid items maintain consistent layout during transitions */
  .literature-grid .grid {
    /* Prevent grid layout shifts during filtering */
    will-change: contents;
    
    /* Stable grid positioning */
    contain: layout;
  }

  /* Optimize for mobile responsiveness */
  @media (max-width: 768px) {
    .literature-grid {
      min-height: 300px;
    }
  }

  /* Loading animation optimization */
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