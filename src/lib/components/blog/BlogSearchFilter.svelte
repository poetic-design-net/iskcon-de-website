<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { SanityCategory } from '$lib/types';
  import Icon from '@iconify/svelte';

  export let categories: SanityCategory[] = [];
  export let selectedCategory: SanityCategory | null = null;
  export let searchQuery: string = '';
  export let placeholder: string = 'Blog-Artikel durchsuchen...';

  const dispatch = createEventDispatcher<{
    search: { query: string };
    categoryFilter: { category: SanityCategory | null };
    clear: void;
  }>();

  let searchInput = searchQuery;
  let isDropdownOpen = false;
  let debounceTimer: ReturnType<typeof setTimeout>;

  // Simple debounce function
  function debounce(func: () => void, delay: number) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(func, delay);
  }

  // Handle search input
  function handleSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    searchInput = target.value;
    console.log('🔍 [FILTER DEBUG] Search input changed:', searchInput);
    
    debounce(() => {
      searchQuery = searchInput;
      console.log('🔍 [FILTER DEBUG] Dispatching search event:', { query: searchInput });
      dispatch('search', { query: searchInput });
    }, 300);
  }

  // Handle category selection
  function selectCategory(category: SanityCategory | null) {
    console.log('🔍 [FILTER DEBUG] Category selected:', category);
    selectedCategory = category;
    isDropdownOpen = false;
    console.log('🔍 [FILTER DEBUG] Dispatching categoryFilter event:', { category });
    dispatch('categoryFilter', { category });
  }

  // Clear all filters
  function clearFilters() {
    searchInput = '';
    searchQuery = '';
    selectedCategory = null;
    dispatch('search', { query: '' });
    dispatch('categoryFilter', { category: null });
    dispatch('clear');
  }

  // Toggle dropdown
  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  // Check if any filters are active
  $: hasActiveFilters = searchQuery.length > 0 || selectedCategory !== null;
</script>

<div class="blog-search-filter">
  <!-- Search and Filter Controls -->
  <div class="controls-wrapper">
    <!-- Search Input -->
    <div class="search-wrapper">
      <div class="search-input-container">
        <Icon icon="mdi:magnify" class="search-icon" />
        <input
          type="text"
          placeholder={placeholder}
          bind:value={searchInput}
          on:input={handleSearchInput}
          class="search-input"
        />
        {#if searchInput.length > 0}
          <button
            type="button"
            class="clear-search-btn"
            on:click={() => {
              searchInput = '';
              debounce(() => {
                searchQuery = '';
                dispatch('search', { query: '' });
              }, 0);
            }}
            aria-label="Suche löschen"
          >
            <Icon icon="mdi:close" class="w-4 h-4" />
          </button>
        {/if}
      </div>
    </div>

    <!-- Category Filter Dropdown -->
    <div class="category-dropdown">
      <button
        type="button"
        class="category-filter-btn"
        on:click={toggleDropdown}
      >
        <Icon icon="mdi:filter-variant" class="w-4 h-4 mr-2" />
        {selectedCategory ? selectedCategory.title : 'Alle Kategorien'}
        <Icon 
          icon={isDropdownOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'} 
          class="w-4 h-4 ml-2" 
        />
      </button>
      
      {#if isDropdownOpen}
        <div class="dropdown-content">
          <button
            type="button"
            class="dropdown-item {selectedCategory === null ? 'selected' : ''}"
            on:click={() => selectCategory(null)}
          >
            <Icon icon="mdi:tag-multiple" class="w-4 h-4 mr-2" />
            Alle Kategorien
            {#if selectedCategory === null}
              <Icon icon="mdi:check" class="w-4 h-4 ml-auto text-spiritual-saffron-600" />
            {/if}
          </button>
          
          <div class="dropdown-separator"></div>
          
          {#each categories as category}
            <button
              type="button"
              class="dropdown-item {selectedCategory?.slug === category.slug ? 'selected' : ''}"
              on:click={() => selectCategory(category)}
            >
              <Icon icon="mdi:tag" class="w-4 h-4 mr-2" />
              {category.title}
              {#if selectedCategory?.slug === category.slug}
                <Icon icon="mdi:check" class="w-4 h-4 ml-auto text-spiritual-saffron-600" />
              {/if}
            </button>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Clear Filters Button -->
    {#if hasActiveFilters}
      <button
        type="button"
        on:click={clearFilters}
        class="clear-filters-btn"
      >
        <Icon icon="mdi:filter-off" class="w-4 h-4 mr-2" />
        Filter zurücksetzen
      </button>
    {/if}
  </div>

  <!-- Active Filters Display -->
  {#if hasActiveFilters}
    <div class="active-filters">
      <span class="filters-label">Aktive Filter:</span>
      
      {#if searchQuery.length > 0}
        <span class="filter-badge">
          <Icon icon="mdi:magnify" class="w-3 h-3 mr-1" />
          "{searchQuery}"
          <button
            type="button"
            class="remove-filter-btn"
            on:click={() => {
              searchInput = '';
              debounce(() => {
                searchQuery = '';
                dispatch('search', { query: '' });
              }, 0);
            }}
            aria-label="Suchfilter entfernen"
          >
            <Icon icon="mdi:close" class="w-3 h-3" />
          </button>
        </span>
      {/if}

      {#if selectedCategory}
        <span class="filter-badge">
          <Icon icon="mdi:tag" class="w-3 h-3 mr-1" />
          {selectedCategory.title}
          <button
            type="button"
            class="remove-filter-btn"
            on:click={() => selectCategory(null)}
            aria-label="Kategoriefilter entfernen"
          >
            <Icon icon="mdi:close" class="w-3 h-3" />
          </button>
        </span>
      {/if}
    </div>
  {/if}
</div>

<!-- Click outside handler -->
<svelte:window on:click={(e) => {
  const target = e.target as Element;
  if (!target?.closest('.category-dropdown')) {
    isDropdownOpen = false;
  }
}} />

<style>
  .blog-search-filter {
    margin-bottom: 2rem;
  }

  .controls-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1rem;
  }

  .search-wrapper {
    flex: 1;
    min-width: 250px;
  }

  .search-input-container {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-input {
    width: 100%;
    padding: 0.75rem 2.5rem 0.75rem 2.5rem;
    border: 1px solid hsl(var(--border));
    border-radius: 0.375rem;
    background: hsl(var(--background));
    color: hsl(var(--foreground));
    font-size: 0.875rem;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .search-input:focus {
    outline: none;
    border-color: hsl(var(--ring));
    box-shadow: 0 0 0 2px hsl(var(--ring) / 0.2);
  }

  .search-icon {
    position: absolute;
    left: 0.75rem;
    width: 1rem;
    height: 1rem;
    color: hsl(var(--muted-foreground));
    z-index: 10;
  }

  .clear-search-btn {
    position: absolute;
    right: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: hsl(var(--muted-foreground));
    background: none;
    border: none;
    cursor: pointer;
    z-index: 10;
    transition: color 0.2s;
  }

  .clear-search-btn:hover {
    color: hsl(var(--foreground));
  }

  .category-dropdown {
    position: relative;
  }

  .category-filter-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 180px;
    padding: 0.75rem 1rem;
    border: 1px solid hsl(var(--border));
    border-radius: 0.375rem;
    background: hsl(var(--background));
    color: hsl(var(--foreground));
    font-size: 0.875rem;
    cursor: pointer;
    transition: border-color 0.2s, background-color 0.2s;
  }

  .category-filter-btn:hover {
    background-color: hsl(var(--accent));
    border-color: hsl(var(--accent-foreground) / 0.2);
  }

  .dropdown-content {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 50;
    min-width: 200px;
    background: hsl(var(--popover));
    border: 1px solid hsl(var(--border));
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    margin-top: 0.25rem;
    padding: 0.25rem;
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.5rem 0.75rem;
    background: none;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    text-align: left;
    transition: background-color 0.2s;
    color: hsl(var(--foreground));
  }

  .dropdown-item:hover {
    background-color: hsl(var(--accent));
  }

  .dropdown-item.selected {
    background-color: hsl(var(--accent));
  }

  .dropdown-separator {
    height: 1px;
    background-color: hsl(var(--border));
    margin: 0.25rem 0;
  }

  .clear-filters-btn {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    background: none;
    border: 1px solid hsl(var(--border));
    border-radius: 0.375rem;
    color: hsl(var(--muted-foreground));
    font-size: 0.875rem;
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s, border-color 0.2s;
  }

  .clear-filters-btn:hover {
    color: hsl(var(--foreground));
    background-color: hsl(var(--accent));
    border-color: hsl(var(--accent-foreground) / 0.2);
  }

  .active-filters {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background-color: hsl(var(--muted) / 0.3);
    border-radius: 0.5rem;
    border: 1px solid hsl(var(--border));
  }

  .filters-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: hsl(var(--muted-foreground));
    margin-right: 0.5rem;
  }

  .filter-badge {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    background-color: hsl(var(--secondary));
    color: hsl(var(--secondary-foreground));
    border-radius: 0.375rem;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .remove-filter-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 0.25rem;
    background: none;
    border: none;
    cursor: pointer;
    border-radius: 0.25rem;
    padding: 0.125rem;
    transition: background-color 0.2s;
  }

  .remove-filter-btn:hover {
    background-color: hsl(var(--muted-foreground) / 0.2);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .controls-wrapper {
      flex-direction: column;
      align-items: stretch;
    }

    .search-wrapper {
      min-width: 100%;
    }

    .category-filter-btn {
      min-width: 100%;
    }

    .active-filters {
      flex-direction: column;
      align-items: flex-start;
    }

    .filters-label {
      margin-bottom: 0.25rem;
    }
  }
</style>