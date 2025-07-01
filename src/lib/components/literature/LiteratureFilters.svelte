<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { LiteratureBookType, LiteratureDifficulty, LiteratureFilterAvailability } from '$lib/types';
  
  const dispatch = createEventDispatcher<{
    filterChange: {
      bookType: LiteratureBookType | 'all';
      difficulty: LiteratureDifficulty | 'all';
      availability: LiteratureFilterAvailability | 'all';
      featuredOnly: boolean;
    };
  }>();

  // Filter-Zustände
  export let bookType: LiteratureBookType | 'all' = 'all';
  export let difficulty: LiteratureDifficulty | 'all' = 'all';
  export let availability: LiteratureFilterAvailability | 'all' = 'all';
  export let featuredOnly = false;
  
  // Mobile Filter-Panel Toggle
  let showMobileFilters = false;

  function emitFilterChange() {
    dispatch('filterChange', {
      bookType,
      difficulty,
      availability,
      featuredOnly
    });
  }

  // Filter-Optionen
  const bookTypeOptions = [
    { value: 'all', label: 'Alle Bücher' },
    { value: 'bhagavad_gita', label: 'Bhagavad-gītā' },
    { value: 'srimad_bhagavatam', label: 'Śrīmad-Bhāgavatam' },
    { value: 'caitanya_caritamrta', label: 'Caitanya-caritāmṛta' },
    { value: 'philosophy', label: 'Philosophie' },
    { value: 'biography', label: 'Biographie' },
    { value: 'manual', label: 'Handbuch' },
    { value: 'children', label: 'Kinder' },
    { value: 'other', label: 'Sonstiges' }
  ];

  const difficultyOptions = [
    { value: 'all', label: 'Alle Schwierigkeitsgrade' },
    { value: 'beginner', label: 'Anfänger' },
    { value: 'intermediate', label: 'Fortgeschritten' },
    { value: 'advanced', label: 'Experte' }
  ];

  const availabilityOptions = [
    { value: 'all', label: 'Alle Verfügbarkeiten' },
    { value: 'available', label: 'Verfügbar' },
    { value: 'coming_soon', label: 'Bald verfügbar' },
    { value: 'unavailable', label: 'Nicht verfügbar' }
  ];

  function resetFilters() {
    bookType = 'all';
    difficulty = 'all';
    availability = 'all';
    featuredOnly = false;
    
    emitFilterChange();
  }

  function toggleMobileFilters() {
    showMobileFilters = !showMobileFilters;
  }
</script>

<!-- Filter Container -->
<div class="bg-white border-b border-gray-200 sticky top-0 z-40">
  <div class="container mx-auto px-4 py-4">
    
    <!-- Mobile Filter Toggle -->
    <div class="flex items-center justify-between mb-4 md:hidden">
      <h3 class="text-lg font-medium text-gray-900">Filter</h3>
      <button
        on:click={toggleMobileFilters}
        class="p-2 text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Filter ein-/ausblenden"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d={showMobileFilters ? "M6 18L18 6M6 6l12 12" : "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"} />
        </svg>
      </button>
    </div>

    <!-- Filter Content -->
    <div class="space-y-4" class:hidden={!showMobileFilters} class:md:block={true}>
      
      <!-- Filter Grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <!-- Book Type Filter -->
        <div>
          <label for="bookType" class="block text-sm font-medium text-gray-700 mb-1">
            Buchtyp
          </label>
          <select
            id="bookType"
            bind:value={bookType}
            on:change={emitFilterChange}
            class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent text-sm"
          >
            {#each bookTypeOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>

        <!-- Difficulty Filter -->
        <div>
          <label for="difficulty" class="block text-sm font-medium text-gray-700 mb-1">
            Schwierigkeitsgrad
          </label>
          <select
            id="difficulty"
            bind:value={difficulty}
            on:change={emitFilterChange}
            class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent text-sm"
          >
            {#each difficultyOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>

        <!-- Availability Filter -->
        <div>
          <label for="availability" class="block text-sm font-medium text-gray-700 mb-1">
            Verfügbarkeit
          </label>
          <select
            id="availability"
            bind:value={availability}
            on:change={emitFilterChange}
            class="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron-500 focus:border-transparent text-sm"
          >
            {#each availabilityOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>

        <!-- Featured Toggle -->
        <div class="flex items-end">
          <label class="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              bind:checked={featuredOnly}
              on:change={emitFilterChange}
              class="w-4 h-4 text-saffron-600 border-gray-300 rounded focus:ring-saffron-500"
            />
            <span class="text-sm font-medium text-gray-700">Nur empfohlene Bücher</span>
          </label>
        </div>
      </div>

      <!-- Active Filters & Reset -->
      <div class="flex items-center justify-between pt-2 border-t border-gray-100">
        <div class="flex flex-wrap gap-2">
          {#if bookType !== 'all'}
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {bookTypeOptions.find(opt => opt.value === bookType)?.label}
            </span>
          {/if}
          {#if difficulty !== 'all'}
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {difficultyOptions.find(opt => opt.value === difficulty)?.label}
            </span>
          {/if}
          {#if availability !== 'all'}
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              {availabilityOptions.find(opt => opt.value === availability)?.label}
            </span>
          {/if}
          {#if featuredOnly}
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              Nur empfohlene
            </span>
          {/if}
        </div>
        
        {#if bookType !== 'all' || difficulty !== 'all' || availability !== 'all' || featuredOnly}
          <button
            on:click={resetFilters}
            class="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
          >
            Alle Filter zurücksetzen
          </button>
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  /* Hide mobile filters by default */
  @media (max-width: 767px) {
    .hidden {
      display: none;
    }
  }
</style>