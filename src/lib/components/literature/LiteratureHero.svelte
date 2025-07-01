<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { debounce } from '$lib/utils/debounce';

  const dispatch = createEventDispatcher<{
    search: string;
  }>();

  let searchTerm = '';
  let searchInput: HTMLInputElement;

  // Debounced search mit 300ms Verzögerung
  const debouncedSearch = debounce((term: string) => {
    dispatch('search', term);
  }, 300);

  $: debouncedSearch(searchTerm);

  export function focusSearch() {
    searchInput?.focus();
  }
</script>

<section class="relative bg-gradient-to-br from-orange-50 via-white to-amber-50 py-16 lg:py-20 w-full">
  <!-- Background Pattern -->
  <div class="absolute inset-0 opacity-5">
    <div class="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50"></div>
  </div>

  <div class="relative w-full px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
    <div class="text-center">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 mb-4">
          Spirituelle 
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
            Literatur
          </span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Entdecken Sie zeitlose Weisheit und spirituelle Erkenntnisse durch 
          eine umfassende Sammlung vedischer Schriften, Kommentare und 
          inspirierender Werke.
        </p>
      </div>

      <!-- Search -->
      <div class="max-w-2xl mx-auto mb-8">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            bind:this={searchInput}
            bind:value={searchTerm}
            type="search"
            placeholder="Suchen Sie nach Büchern, Autoren oder Themen..."
            class="block w-full pl-10 pr-4 py-4 text-lg border border-gray-300 rounded-xl
                   focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                   bg-white shadow-sm placeholder-gray-500
                   transition-all duration-200 ease-in-out"
          />
          {#if searchTerm}
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              on:click={() => searchTerm = ''}
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          {/if}
        </div>
      </div>

      <!-- Statistics/Features -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div class="text-center">
          <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Vedische Klassiker</h3>
          <p class="text-gray-600">Originalschriften und authentische Übersetzungen der wichtigsten vedischen Texte</p>
        </div>

        <div class="text-center">
          <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Tiefe Erkenntnisse</h3>
          <p class="text-gray-600">Kommentare und Erläuterungen von autorisierten spirituellen Lehrern</p>
        </div>

        <div class="text-center">
          <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Praktische Weisheit</h3>
          <p class="text-gray-600">Anleitungen für spirituelle Praxis und persönliche Entwicklung</p>
        </div>
      </div>
    </div>
  </div>
</section>