<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import EventCard from './EventCard.svelte';
  import EventModal from './EventModal.svelte';
  import * as Card from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import Icon from '@iconify/svelte';
  import type { SanityEvent } from '$lib/types';

  export let events: SanityEvent[] = [];
  export let eventCategories: Array<{
    title: string;
    slug: string;
    description: string;
    icon: string;
    color: string;
  }> = [];
  export let title = 'Kommende Veranstaltungen';
  export let subtitle = 'Entdecken Sie unsere spirituellen Events und Festivals';

  let visible = false;
  let selectedFilter: string = 'all';
  let viewMode: 'grid' | 'calendar' = 'grid';
  let currentMonth = new Date();
  let filterDropdownOpen = false;
  
  // Modal State
  let selectedEvent: SanityEvent | null = null;
  let isModalOpen = false;

  // Debug Logs - ERWEITERT
  $: console.log('🎪 EventCalendar Events:', events.length);
  $: console.log('📂 EventCategories received:', eventCategories);
  $: console.log('🔍 Events with eventCategory:', events.map(e => ({ title: e.title, eventCategory: e.eventCategory, eventType: e.eventType })));
  $: console.log('🎯 DynamicFilterOptions:', dynamicFilterOptions);
  $: console.log('🔄 Selected Filter:', selectedFilter);
  $: console.log('👁️ View Mode:', viewMode);

  // Tempel aus Events extrahieren
  $: uniqueTemples = [...new Set(events
    .filter(e => e.location?.type === 'temple' && e.location?.temple?.name)
    .map(e => ({
      name: e.location!.temple!.name,
      slug: e.location!.temple!.slug
    }))
  )];

  // Dynamische Filter - Kategorien und Tempel
  $: dynamicFilterOptions = [
    { value: 'all', label: 'Alle Events', icon: 'mdi:calendar-star', count: events.length },
    
    // Event-Kategorien
    ...eventCategories
      .map(category => {
        const count = events.filter(e =>
          e.eventCategory?.slug === category.slug ||
          e.eventType === category.slug
        ).length;
        return count > 0 ? {
          value: `category:${category.slug}`,
          label: `📂 ${category.title}`,
          icon: category.icon,
          count
        } : null;
      })
      .filter((item): item is NonNullable<typeof item> => item !== null),
    
    // Tempel-Filter
    ...uniqueTemples.map(temple => {
      const count = events.filter(e => e.location?.temple?.slug === temple.slug).length;
      return {
        value: `temple:${temple.slug}`,
        label: `🏛️ ${temple.name}`,
        icon: 'mdi:temple-hindu',
        count
      };
    })
  ];

  // Hilfsfunktion um Kategorie-Label zu finden
  function getCategoryLabel(slug: string): string {
    if (slug.startsWith('category:')) {
      const categorySlug = slug.replace('category:', '');
      const category = eventCategories.find(cat => cat.slug === categorySlug);
      return category?.title || categorySlug;
    }
    if (slug.startsWith('temple:')) {
      const templeSlug = slug.replace('temple:', '');
      const temple = uniqueTemples.find(t => t.slug === templeSlug);
      return temple?.name || templeSlug;
    }
    return slug;
  }

  // Gefilterte Events
  $: filteredEvents = selectedFilter === 'all' 
    ? events 
    : selectedFilter.startsWith('category:')
      ? events.filter(event => {
          const categorySlug = selectedFilter.replace('category:', '');
          return event.eventCategory?.slug === categorySlug || event.eventType === categorySlug;
        })
      : selectedFilter.startsWith('temple:')
        ? events.filter(event => {
            const templeSlug = selectedFilter.replace('temple:', '');
            return event.location?.temple?.slug === templeSlug;
          })
        : events;

  // Featured Events
  $: featuredEvents = events.filter(event => event.isFeatured).slice(0, 3);

  // Kalender-Daten
  $: calendarEvents = filteredEvents.reduce((acc, event) => {
    const date = new Date(event.startDate).toDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(event);
    return acc;
  }, {} as Record<string, SanityEvent[]>);

  // Kalender-Grid generieren
  $: calendarGrid = generateCalendarGrid(currentMonth, calendarEvents);

  function generateCalendarGrid(month: Date, eventsByDate: Record<string, SanityEvent[]>) {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    
    const firstDay = new Date(year, monthIndex, 1);
    const firstDayOfWeek = (firstDay.getDay() + 6) % 7; // Montag = 0
    
    const grid = [];
    let currentDate = new Date(firstDay);
    currentDate.setDate(1 - firstDayOfWeek);
    
    for (let week = 0; week < 6; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        const dateStr = currentDate.toDateString();
        const isCurrentMonth = currentDate.getMonth() === monthIndex;
        const isToday = dateStr === new Date().toDateString();
        
        weekDays.push({
          date: new Date(currentDate),
          dateStr,
          isCurrentMonth,
          isToday,
          events: eventsByDate[dateStr] || []
        });
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
      grid.push(weekDays);
    }
    
    return grid;
  }

  // Event Handler
  function handleViewModeChange(mode: 'grid' | 'calendar') {
    viewMode = mode;
  }

  function handleFilterChange(filterValue: string) {
    selectedFilter = filterValue;
  }

  function navigateMonth(direction: number) {
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1);
  }

  function handleEventClick(event: CustomEvent<{ event: SanityEvent }>) {
    selectedEvent = event.detail.event;
    isModalOpen = true;
  }

  function handleModalClose() {
    isModalOpen = false;
    selectedEvent = null;
  }

  function handleEventRegister(event: CustomEvent<{ event: SanityEvent }>) {
    if (event.detail.event.registration?.registrationLink) {
      window.open(event.detail.event.registration.registrationLink, '_blank');
    } else {
      window.location.href = `/events/${event.detail.event.slug}`;
    }
  }

  function handleCalendarEventClick(event: SanityEvent) {
    selectedEvent = event;
    isModalOpen = true;
  }

  onMount(() => {
    visible = true;
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.filter-dropdown') && filterDropdownOpen) {
        filterDropdownOpen = false;
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<section class="py-12 md:py-20 px-4 bg-gradient-to-br from-spiritual-saffron-50/30 via-background to-spiritual-blue-50/20">
  <div class="container mx-auto">
    <!-- Header -->
    {#if visible}
      <div class="text-center mb-12" in:fly={{ y: 20, duration: 800 }}>
        <div class="flex items-center justify-center gap-3 mb-4">
          <Icon icon="mdi:calendar-heart" class="w-10 h-10 text-spiritual-saffron-500" />
          <h2 class="text-3xl md:text-4xl font-medium text-foreground">{title}</h2>
        </div>
        <p class="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          {subtitle}
        </p>

        <!-- Controls Row: View Mode Toggle + Filter Dropdown -->
        <div class="flex justify-center items-center gap-4 mb-8">
          <!-- View Mode Toggle -->
          <div class="flex gap-1 bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-9 px-3 {viewMode === 'grid' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
              }"
              on:click={() => handleViewModeChange('grid')}
            >
              <Icon icon="mdi:view-grid" class="w-4 h-4 mr-2" />
              Grid
            </button>
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-9 px-3 {viewMode === 'calendar' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
              }"
              on:click={() => handleViewModeChange('calendar')}
            >
              <Icon icon="mdi:calendar-month" class="w-4 h-4 mr-2" />
              Kalender
            </button>
          </div>

          <!-- Separator -->
          <div class="h-8 w-px bg-gray-300"></div>

          <!-- Filter Dropdown -->
          <div class="relative filter-dropdown">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors h-9 px-4 border border-gray-300 bg-white hover:bg-gray-50 min-w-[200px]"
              on:click={() => filterDropdownOpen = !filterDropdownOpen}
            >
              <Icon icon="mdi:filter" class="w-4 h-4 mr-2 text-gray-500" />
              <span class="text-gray-700">{selectedFilter === 'all' ? 'Alle Events' : getCategoryLabel(selectedFilter)}</span>
              <Icon icon="mdi:chevron-down" class="w-4 h-4 ml-auto text-gray-500" />
            </button>
            
            {#if filterDropdownOpen}
              <div class="absolute top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50" 
                   in:fly={{ y: -10, duration: 200 }}
                   on:click|stopPropagation
                   on:keydown|stopPropagation>
                <div class="py-1 max-h-96 overflow-y-auto">
                  {#each dynamicFilterOptions as filter}
                    <button
                      type="button"
                      class="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between group transition-colors {selectedFilter === filter.value ? 'bg-primary-50 text-primary-600' : 'text-gray-700'}"
                      on:click={() => { handleFilterChange(filter.value); filterDropdownOpen = false; }}
                    >
                      <div class="flex items-center">
                        <Icon icon={filter.icon} class="w-4 h-4 mr-2 {selectedFilter === filter.value ? 'text-primary-500' : 'text-gray-400'}" />
                        <span>{filter.label}</span>
                      </div>
                      <span class="ml-2 inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                        {filter.count}
                      </span>
                    </button>
                  {/each}
                </div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    {/if}

    <!-- Calendar View -->
    {#if viewMode === 'calendar'}
      <div class="mb-12" in:fade={{ duration: 300 }}>
        <!-- Calendar Header -->
        <div class="flex items-center justify-between mb-6">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
            on:click={() => navigateMonth(-1)}
          >
            <Icon icon="mdi:chevron-left" class="w-4 h-4" />
          </button>
          
          <h3 class="text-2xl font-medium text-foreground">
            {currentMonth.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
          </h3>
          
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
            on:click={() => navigateMonth(1)}
          >
            <Icon icon="mdi:chevron-right" class="w-4 h-4" />
          </button>
        </div>

        <!-- Calendar Grid -->
        <div class="bg-background rounded-lg border border-gray-200 overflow-hidden">
          <!-- Weekday Headers -->
          <div class="grid grid-cols-7 border-b border-gray-200">
            {#each ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'] as day}
              <div class="p-3 text-center font-medium text-muted-foreground bg-gray-50">
                {day}
              </div>
            {/each}
          </div>

          <!-- Calendar Days -->
          {#each calendarGrid as week}
            <div class="grid grid-cols-7">
              {#each week as day}
                <div class="min-h-[120px] border-r border-b border-gray-200 p-2 {!day.isCurrentMonth ? 'bg-gray-50' : ''} {day.isToday ? 'bg-primary-50' : ''}">
                  <div class="text-sm font-medium mb-2 {!day.isCurrentMonth ? 'text-muted-foreground' : day.isToday ? 'text-spiritual-saffron-700' : 'text-foreground'}">
                    {day.date.getDate()}
                  </div>
                  
                  {#each day.events.slice(0, 3) as event}
                    <div
                      class="mb-1 p-1 rounded text-xs bg-primary-100 text-primary-700 truncate cursor-pointer hover:bg-primary-200 transition-colors"
                      on:click={() => handleCalendarEventClick(event)}
                      on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), handleCalendarEventClick(event))}
                      role="button"
                      tabindex="0"
                      aria-label="Event: {event.title}"
                    >
                      {event.title}
                    </div>
                  {/each}
                  
                  {#if day.events.length > 3}
                    <div class="text-xs text-muted-foreground">
                      +{day.events.length - 3} weitere
                    </div>
                  {/if}
                </div>
              {/each}
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Grid View -->
    {#if viewMode === 'grid'}
      <!-- Featured Events Section -->
      {#if featuredEvents.length > 0}
        <div class="mb-16" in:fade={{ delay: 200 }}>
          <div class="flex items-center gap-3 mb-6">
            <Icon icon="mdi:star-circle" class="w-6 h-6 text-spiritual-gold-500" />
            <h3 class="text-2xl font-medium text-foreground">Hervorgehobene Events</h3>
            <Badge variant="secondary">{featuredEvents.length}</Badge>
          </div>
          
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {#each featuredEvents as event, i}
              <div class="h-full" in:fly={{ y: 30, duration: 600, delay: 300 + i * 100 }}>
                <EventCard 
                  {event} 
                  size="medium"
                  on:eventClick={handleEventClick}
                />
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Event Grid -->
      {#if filteredEvents.length > 0}
        <div in:fade={{ delay: 400 }}>
          <div class="flex items-center gap-3 mb-6">
            <Icon icon="mdi:calendar-multiple" class="w-6 h-6 text-spiritual-saffron-500" />
            <h3 class="text-2xl font-medium text-foreground">
              {selectedFilter === 'all' ? 'Alle Events' : getCategoryLabel(selectedFilter)}
            </h3>
            <Badge variant="outline">{filteredEvents.length}</Badge>
          </div>
          
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {#each filteredEvents.slice(0, 6) as event, i}
              <div class="h-full" in:fly={{ y: 30, duration: 600, delay: 500 + i * 100 }}>
                <EventCard 
                  {event} 
                  size="medium"
                  on:eventClick={handleEventClick}
                />
              </div>
            {/each}
          </div>
        </div>
      {:else if events.length > 0}
        <!-- Keine Events für Filter gefunden -->
        <div class="text-center py-12" in:fade={{ delay: 400 }}>
          <Icon icon="mdi:calendar-remove" class="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 class="text-xl font-medium text-foreground mb-2">Keine Events für "{getCategoryLabel(selectedFilter)}" gefunden</h3>
          <p class="text-muted-foreground mb-4">
            Für den gewählten Filter sind derzeit keine Veranstaltungen verfügbar.
          </p>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            on:click={() => handleFilterChange('all')}
          >
            Alle Events anzeigen
          </button>
        </div>
      {/if}
    {/if}

  </div>
</section>

<!-- Event Detail Modal -->
{#if selectedEvent}
  <EventModal
    event={selectedEvent}
    isOpen={isModalOpen}
    on:close={handleModalClose}
    on:register={handleEventRegister}
  />
{/if}