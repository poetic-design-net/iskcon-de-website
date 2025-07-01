<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { slide, fade } from 'svelte/transition';
  import Icon from '@iconify/svelte';
  import type { SanityTemple } from '$lib/types';
  
  // Props
  export let temples: SanityTemple[] = [];
  export let tags: string[] = [];
  export let initialFilters: Partial<EventFilters> = {};
  
  // Event Dispatcher
  const dispatch = createEventDispatcher<{
    filterChange: EventFilters;
  }>();
  
  // Filter Interface
  interface EventFilters {
    eventTypes: string[];
    temples: string[];
    dateFrom: string | null;
    dateTo: string | null;
    tags: string[];
    registrationOpen: boolean;
    featuredOnly: boolean;
  }
  
  // Event-Typ Konfiguration aus EventCard.svelte übernommen
  const eventTypeConfig = {
    festival: { icon: 'mdi:festival', color: 'spiritual-gold-500', bgColor: 'bg-spiritual-gold-50', label: 'Festival' },
    kirtan: { icon: 'mdi:music-note', color: 'spiritual-saffron-500', bgColor: 'bg-spiritual-saffron-50', label: 'Kirtan' },
    lecture: { icon: 'mdi:account-voice', color: 'spiritual-blue-500', bgColor: 'bg-spiritual-blue-50', label: 'Vortrag' },
    gita_class: { icon: 'mdi:book-open-variant', color: 'spiritual-blue-600', bgColor: 'bg-spiritual-blue-50', label: 'Bhagavad Gita' },
    prasadam: { icon: 'mdi:food', color: 'spiritual-saffron-600', bgColor: 'bg-spiritual-saffron-50', label: 'Prasadam' },
    pilgrimage: { icon: 'mdi:map-marker-path', color: 'spiritual-gold-600', bgColor: 'bg-spiritual-gold-50', label: 'Pilgerfahrt' },
    workshop: { icon: 'mdi:hammer-wrench', color: 'spiritual-earth-500', bgColor: 'bg-spiritual-earth-50', label: 'Workshop' },
    retreat: { icon: 'mdi:meditation', color: 'spiritual-blue-700', bgColor: 'bg-spiritual-blue-50', label: 'Retreat' },
    conference: { icon: 'mdi:account-group', color: 'spiritual-earth-600', bgColor: 'bg-spiritual-earth-50', label: 'Konferenz' },
    other: { icon: 'mdi:calendar-star', color: 'gray-500', bgColor: 'bg-gray-50', label: 'Sonstiges' }
  };
  
  // Filter State
  let filters: EventFilters = {
    eventTypes: [],
    temples: [],
    dateFrom: null,
    dateTo: null,
    tags: [],
    registrationOpen: false,
    featuredOnly: false,
    ...initialFilters
  };
  
  // UI State
  let isMobile = false;
  let isFilterOpen = false;
  let expandedSections = new Set<string>();
  let templeSearchTerm = '';
  let filteredTemples: SanityTemple[] = [];
  let debounceTimer: NodeJS.Timeout;
  
  // Responsive Detection
  function updateScreenSize() {
    if (typeof window !== 'undefined') {
      isMobile = window.innerWidth < 768; // md breakpoint
      if (!isMobile) {
        expandedSections = new Set(['eventTypes', 'temples', 'dates', 'options']);
      } else {
        expandedSections.clear();
      }
    }
  }
  
  // Filter Change Handler mit Debouncing
  function handleFilterChange() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      dispatch('filterChange', filters);
      saveFiltersToLocalStorage();
    }, 300);
  }
  
  // Tempel-Suche mit Debouncing
  function handleTempleSearch() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (templeSearchTerm.trim() === '') {
        filteredTemples = temples;
      } else {
        filteredTemples = temples.filter(temple =>
          temple.name.toLowerCase().includes(templeSearchTerm.toLowerCase()) ||
          temple.address.city.toLowerCase().includes(templeSearchTerm.toLowerCase())
        );
      }
    }, 300);
  }
  
  // Section Toggle
  function toggleSection(sectionId: string) {
    if (expandedSections.has(sectionId)) {
      expandedSections.delete(sectionId);
    } else {
      expandedSections.add(sectionId);
    }
    expandedSections = expandedSections; // Trigger reactivity
  }
  
  // Event-Typ Toggle
  function toggleEventType(eventType: string) {
    if (filters.eventTypes.includes(eventType)) {
      filters.eventTypes = filters.eventTypes.filter(type => type !== eventType);
    } else {
      filters.eventTypes = [...filters.eventTypes, eventType];
    }
    handleFilterChange();
  }
  
  // Tempel Toggle
  function toggleTemple(templeSlug: string) {
    if (filters.temples.includes(templeSlug)) {
      filters.temples = filters.temples.filter(slug => slug !== templeSlug);
    } else {
      filters.temples = [...filters.temples, templeSlug];
    }
    handleFilterChange();
  }
  
  // Tag Toggle
  function toggleTag(tag: string) {
    if (filters.tags.includes(tag)) {
      filters.tags = filters.tags.filter(t => t !== tag);
    } else {
      filters.tags = [...filters.tags, tag];
    }
    handleFilterChange();
  }
  
  // Reset Filter
  function resetFilters() {
    filters = {
      eventTypes: [],
      temples: [],
      dateFrom: null,
      dateTo: null,
      tags: [],
      registrationOpen: false,
      featuredOnly: false
    };
    templeSearchTerm = '';
    handleFilterChange();
  }
  
  // Local Storage Integration
  function saveFiltersToLocalStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('iskcon-event-filters', JSON.stringify(filters));
    }
  }
  
  function loadFiltersFromLocalStorage() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('iskcon-event-filters');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          filters = { ...filters, ...parsed };
        } catch (e) {
          console.warn('Error loading filters from localStorage:', e);
        }
      }
    }
  }
  
  // URL State Integration
  function updateURLParams() {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      const params = new URLSearchParams();
      
      if (filters.eventTypes.length) params.set('types', filters.eventTypes.join(','));
      if (filters.temples.length) params.set('temples', filters.temples.join(','));
      if (filters.dateFrom) params.set('from', filters.dateFrom);
      if (filters.dateTo) params.set('to', filters.dateTo);
      if (filters.tags.length) params.set('tags', filters.tags.join(','));
      if (filters.registrationOpen) params.set('registration', 'true');
      if (filters.featuredOnly) params.set('featured', 'true');
      
      const newUrl = params.toString() ? `${url.pathname}?${params.toString()}` : url.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }
  
  function loadFromURLParams() {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      
      const types = params.get('types');
      if (types) filters.eventTypes = types.split(',');
      
      const temples = params.get('temples');
      if (temples) filters.temples = temples.split(',');
      
      const from = params.get('from');
      if (from) filters.dateFrom = from;
      
      const to = params.get('to');
      if (to) filters.dateTo = to;
      
      const tags = params.get('tags');
      if (tags) filters.tags = tags.split(',');
      
      filters.registrationOpen = params.get('registration') === 'true';
      filters.featuredOnly = params.get('featured') === 'true';
    }
  }
  
  // Aktive Filter Count
  $: activeFilterCount = filters.eventTypes.length + 
                        filters.temples.length + 
                        filters.tags.length + 
                        (filters.dateFrom ? 1 : 0) + 
                        (filters.dateTo ? 1 : 0) + 
                        (filters.registrationOpen ? 1 : 0) + 
                        (filters.featuredOnly ? 1 : 0);
  
  // Keyboard Navigation
  function handleKeyDown(event: KeyboardEvent, action: () => void) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  }
  
  // Reactive Statements
  $: if (templeSearchTerm !== undefined) handleTempleSearch();
  $: filteredTemples = temples;
  $: updateURLParams();
  
  // Lifecycle
  onMount(() => {
    updateScreenSize();
    loadFromURLParams();
    loadFiltersFromLocalStorage();
    filteredTemples = temples;
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateScreenSize);
      return () => {
        window.removeEventListener('resize', updateScreenSize);
        clearTimeout(debounceTimer);
      };
    }
  });
</script>

<svelte:window on:resize={updateScreenSize} />

<div class="bg-white rounded-xl shadow-lg border border-spiritual-earth-200 overflow-hidden">
  <!-- Filter Header -->
  <div class="flex items-center justify-between p-4 border-b border-spiritual-earth-200 bg-spiritual-saffron-50">
    <div class="flex items-center gap-3">
      <Icon icon="mdi:filter-variant" class="text-2xl text-spiritual-saffron-600" />
      <div>
        <h3 class="text-lg font-spiritual font-medium text-gray-900">Event-Filter</h3>
        <p class="text-sm text-gray-600">Finde die perfekten Veranstaltungen</p>
      </div>
    </div>
    
    <div class="flex items-center gap-3">
      <!-- Active Filter Count Badge -->
      {#if activeFilterCount > 0}
        <span 
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-spiritual-saffron-500 text-white"
          aria-label="{activeFilterCount} aktive Filter"
        >
          {activeFilterCount}
        </span>
      {/if}
      
      <!-- Reset Button -->
      {#if activeFilterCount > 0}
        <button
          type="button"
          class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-spiritual-earth-600 bg-white border border-spiritual-earth-300 rounded-lg hover:bg-spiritual-earth-50 focus:outline-none focus:ring-2 focus:ring-spiritual-saffron-500 focus:ring-offset-2 transition-colors"
          on:click={resetFilters}
          aria-label="Alle Filter zurücksetzen"
        >
          <Icon icon="mdi:refresh" class="text-current" />
          <span class="hidden sm:inline">Zurücksetzen</span>
        </button>
      {/if}
      
      <!-- Mobile Toggle -->
      {#if isMobile}
        <button
          type="button"
          class="p-2 text-spiritual-saffron-600 hover:bg-spiritual-saffron-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-spiritual-saffron-500 focus:ring-offset-2 transition-colors"
          on:click={() => isFilterOpen = !isFilterOpen}
          aria-expanded={isFilterOpen}
          aria-controls="filter-content"
          aria-label="Filter {isFilterOpen ? 'schließen' : 'öffnen'}"
        >
          <Icon icon={isFilterOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'} class="text-xl" />
        </button>
      {/if}
    </div>
  </div>
  
  <!-- Filter Content -->
  <div 
    id="filter-content"
    class="{isMobile && !isFilterOpen ? 'hidden' : 'block'}"
  >
    <div class="p-4 space-y-4 {isMobile ? 'space-y-3' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'}">
      
      <!-- Event-Typen Filter -->
      <div class="filter-section">
        <button
          type="button"
          class="w-full flex items-center justify-between p-3 text-left bg-spiritual-blue-50 hover:bg-spiritual-blue-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-spiritual-blue-500"
          on:click={() => toggleSection('eventTypes')}
          on:keydown={(e) => handleKeyDown(e, () => toggleSection('eventTypes'))}
          aria-expanded={expandedSections.has('eventTypes')}
          aria-controls="eventTypes-content"
        >
          <div class="flex items-center gap-2">
            <Icon icon="mdi:calendar-star" class="text-lg text-spiritual-blue-600" />
            <span class="font-medium text-gray-900">Event-Typen</span>
            {#if filters.eventTypes.length > 0}
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-spiritual-blue-500 text-white">
                {filters.eventTypes.length}
              </span>
            {/if}
          </div>
          <Icon 
            icon="mdi:chevron-down" 
            class="text-lg text-spiritual-blue-600 transition-transform {expandedSections.has('eventTypes') ? 'rotate-180' : ''}" 
          />
        </button>
        
        {#if expandedSections.has('eventTypes')}
          <div 
            id="eventTypes-content"
            class="mt-2 space-y-2"
            transition:slide={{ duration: 200 }}
          >
            {#each Object.entries(eventTypeConfig) as [type, config]}
              <label class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer group">
                <input
                  type="checkbox"
                  bind:group={filters.eventTypes}
                  value={type}
                  on:change={handleFilterChange}
                  class="w-4 h-4 text-spiritual-saffron-500 border-gray-300 rounded focus:ring-spiritual-saffron-500 focus:ring-2"
                />
                <div class="flex items-center gap-2 flex-1">
                  <div class="flex items-center justify-center w-8 h-8 {config.bgColor} rounded-full group-hover:scale-110 transition-transform">
                    <Icon icon={config.icon} class="text-{config.color}" />
                  </div>
                  <span class="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {config.label}
                  </span>
                </div>
              </label>
            {/each}
          </div>
        {/if}
      </div>
      
      <!-- Tempel Filter -->
      <div class="filter-section">
        <button
          type="button"
          class="w-full flex items-center justify-between p-3 text-left bg-spiritual-gold-50 hover:bg-spiritual-gold-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-spiritual-gold-500"
          on:click={() => toggleSection('temples')}
          on:keydown={(e) => handleKeyDown(e, () => toggleSection('temples'))}
          aria-expanded={expandedSections.has('temples')}
          aria-controls="temples-content"
        >
          <div class="flex items-center gap-2">
            <Icon icon="mdi:temple-hindu" class="text-lg text-spiritual-gold-600" />
            <span class="font-medium text-gray-900">Tempel</span>
            {#if filters.temples.length > 0}
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-spiritual-gold-500 text-white">
                {filters.temples.length}
              </span>
            {/if}
          </div>
          <Icon 
            icon="mdi:chevron-down" 
            class="text-lg text-spiritual-gold-600 transition-transform {expandedSections.has('temples') ? 'rotate-180' : ''}" 
          />
        </button>
        
        {#if expandedSections.has('temples')}
          <div 
            id="temples-content"
            class="mt-2 space-y-2"
            transition:slide={{ duration: 200 }}
          >
            <!-- Temple Search -->
            <div class="relative">
              <Icon icon="mdi:magnify" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                bind:value={templeSearchTerm}
                placeholder="Tempel suchen..."
                class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spiritual-gold-500 focus:border-spiritual-gold-500 text-sm"
                aria-label="Tempel durchsuchen"
              />
            </div>
            
            <!-- Temple List -->
            <div class="max-h-40 overflow-y-auto space-y-1">
              {#each filteredTemples as temple}
                <label class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer group">
                  <input
                    type="checkbox"
                    bind:group={filters.temples}
                    value={temple.slug}
                    on:change={handleFilterChange}
                    class="w-4 h-4 text-spiritual-gold-500 border-gray-300 rounded focus:ring-spiritual-gold-500 focus:ring-2"
                  />
                  <div class="flex-1">
                    <div class="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {temple.name}
                    </div>
                    <div class="text-xs text-gray-500">
                      {temple.address.city}
                    </div>
                  </div>
                </label>
              {/each}
              
              {#if filteredTemples.length === 0}
                <p class="text-sm text-gray-500 text-center py-3">
                  Keine Tempel gefunden
                </p>
              {/if}
            </div>
          </div>
        {/if}
      </div>
      
      <!-- Datum Filter -->
      <div class="filter-section">
        <button
          type="button"
          class="w-full flex items-center justify-between p-3 text-left bg-spiritual-saffron-50 hover:bg-spiritual-saffron-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-spiritual-saffron-500"
          on:click={() => toggleSection('dates')}
          on:keydown={(e) => handleKeyDown(e, () => toggleSection('dates'))}
          aria-expanded={expandedSections.has('dates')}
          aria-controls="dates-content"
        >
          <div class="flex items-center gap-2">
            <Icon icon="mdi:calendar-range" class="text-lg text-spiritual-saffron-600" />
            <span class="font-medium text-gray-900">Zeitraum</span>
            {#if filters.dateFrom || filters.dateTo}
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-spiritual-saffron-500 text-white">
                1
              </span>
            {/if}
          </div>
          <Icon 
            icon="mdi:chevron-down" 
            class="text-lg text-spiritual-saffron-600 transition-transform {expandedSections.has('dates') ? 'rotate-180' : ''}" 
          />
        </button>
        
        {#if expandedSections.has('dates')}
          <div 
            id="dates-content"
            class="mt-2 space-y-3"
            transition:slide={{ duration: 200 }}
          >
            <div>
              <label for="dateFrom" class="block text-sm font-medium text-gray-700 mb-1">
                Von Datum
              </label>
              <input
                id="dateFrom"
                type="date"
                bind:value={filters.dateFrom}
                on:change={handleFilterChange}
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spiritual-saffron-500 focus:border-spiritual-saffron-500 text-sm"
              />
            </div>
            
            <div>
              <label for="dateTo" class="block text-sm font-medium text-gray-700 mb-1">
                Bis Datum
              </label>
              <input
                id="dateTo"
                type="date"
                bind:value={filters.dateTo}
                on:change={handleFilterChange}
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-spiritual-saffron-500 focus:border-spiritual-saffron-500 text-sm"
              />
            </div>
          </div>
        {/if}
      </div>
      
      <!-- Weitere Optionen -->
      <div class="filter-section">
        <button
          type="button"
          class="w-full flex items-center justify-between p-3 text-left bg-spiritual-earth-50 hover:bg-spiritual-earth-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-spiritual-earth-500"
          on:click={() => toggleSection('options')}
          on:keydown={(e) => handleKeyDown(e, () => toggleSection('options'))}
          aria-expanded={expandedSections.has('options')}
          aria-controls="options-content"
        >
          <div class="flex items-center gap-2">
            <Icon icon="mdi:tune" class="text-lg text-spiritual-earth-600" />
            <span class="font-medium text-gray-900">Optionen</span>
            {#if filters.registrationOpen || filters.featuredOnly}
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-spiritual-earth-500 text-white">
                {(filters.registrationOpen ? 1 : 0) + (filters.featuredOnly ? 1 : 0)}
              </span>
            {/if}
          </div>
          <Icon 
            icon="mdi:chevron-down" 
            class="text-lg text-spiritual-earth-600 transition-transform {expandedSections.has('options') ? 'rotate-180' : ''}" 
          />
        </button>
        
        {#if expandedSections.has('options')}
          <div 
            id="options-content"
            class="mt-2 space-y-3"
            transition:slide={{ duration: 200 }}
          >
            <label class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                bind:checked={filters.registrationOpen}
                on:change={handleFilterChange}
                class="w-4 h-4 text-spiritual-earth-500 border-gray-300 rounded focus:ring-spiritual-earth-500 focus:ring-2"
              />
              <div class="flex items-center gap-2">
                <Icon icon="mdi:account-plus" class="text-spiritual-earth-600" />
                <span class="text-sm font-medium text-gray-700">
                  Jetzt anmelden möglich
                </span>
              </div>
            </label>
            
            <label class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                bind:checked={filters.featuredOnly}
                on:change={handleFilterChange}
                class="w-4 h-4 text-spiritual-earth-500 border-gray-300 rounded focus:ring-spiritual-earth-500 focus:ring-2"
              />
              <div class="flex items-center gap-2">
                <Icon icon="mdi:star" class="text-spiritual-earth-600" />
                <span class="text-sm font-medium text-gray-700">
                  Nur Featured Events
                </span>
              </div>
            </label>
          </div>
        {/if}
      </div>
      
      <!-- Tags Filter (wenn vorhanden) -->
      {#if tags.length > 0}
        <div class="filter-section md:col-span-2 lg:col-span-4">
          <button
            type="button"
            class="w-full flex items-center justify-between p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            on:click={() => toggleSection('tags')}
            on:keydown={(e) => handleKeyDown(e, () => toggleSection('tags'))}
            aria-expanded={expandedSections.has('tags')}
            aria-controls="tags-content"
          >
            <div class="flex items-center gap-2">
              <Icon icon="mdi:tag-multiple" class="text-lg text-gray-600" />
              <span class="font-medium text-gray-900">Tags</span>
              {#if filters.tags.length > 0}
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-500 text-white">
                  {filters.tags.length}
                </span>
              {/if}
            </div>
            <Icon 
              icon="mdi:chevron-down" 
              class="text-lg text-gray-600 transition-transform {expandedSections.has('tags') ? 'rotate-180' : ''}" 
            />
          </button>
          
          {#if expandedSections.has('tags')}
            <div 
              id="tags-content"
              class="mt-2"
              transition:slide={{ duration: 200 }}
            >
              <div class="flex flex-wrap gap-2">
                {#each tags as tag}
                  <button
                    type="button"
                    class="inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full border transition-all
                           {filters.tags.includes(tag) 
                             ? 'bg-spiritual-saffron-500 text-white border-spiritual-saffron-500' 
                             : 'bg-white text-gray-700 border-gray-300 hover:border-spiritual-saffron-300 hover:bg-spiritual-saffron-50'}"
                    on:click={() => toggleTag(tag)}
                    aria-pressed={filters.tags.includes(tag)}
                  >
                    <Icon icon="mdi:tag" class="text-current text-xs" />
                    {tag}
                  </button>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .filter-section {
    position: relative;
  }
  
  /* Focus States */
  :global(.filter-section input:focus),
  :global(.filter-section button:focus) {
    outline: none;
  }
  
  /* Smooth Transitions */
  * {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* Custom Scrollbar für Temple List */
  .max-h-40::-webkit-scrollbar {
    width: 4px;
  }
  
  .max-h-40::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 2px;
  }
  
  .max-h-40::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 2px;
  }
  
  .max-h-40::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
</style>