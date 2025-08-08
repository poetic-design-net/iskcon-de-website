<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import * as Card from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import SanityImage from '$lib/components/global/SanityImage.svelte';
  import EventModal from './EventModal.svelte';
  import type { SanityEvent } from '$lib/types';

  // Props
  export let events: SanityEvent[] = [];
  export let pastEvents: SanityEvent[] = [];
  export let featuredEvents: SanityEvent[] = [];
  export let title = 'Kommende Veranstaltungen';
  export let subtitle = 'Entdecken Sie unsere spirituellen Events und Festivals';

  let visible = false;
  // Wenn keine kommenden Events vorhanden sind, zeige vergangene
  let activeTab = events.length > 0 ? 'upcoming' : 'past';

  // Modal State
  let selectedEvent: SanityEvent | null = null;
  let isModalOpen = false;

  // Events für Layout vorbereiten
  $: currentEvents = activeTab === 'upcoming' ? events : pastEvents;
  $: heroEvent = activeTab === 'upcoming' ? (featuredEvents[0] || events[0]) : pastEvents[0];
  $: sideEvents = activeTab === 'upcoming' ? events.slice(0, 3) : pastEvents.slice(1, 4);

  // Event-Typ Konfiguration
  const eventTypeConfig = {
    festival: { icon: 'mdi:festival', color: 'text-primary-500' },
    kirtan: { icon: 'mdi:music-note', color: 'text-primary-500' },
    lecture: { icon: 'mdi:account-voice', color: 'text-gray-600' },
    workshop: { icon: 'mdi:hammer-wrench', color: 'text-gray-600' },
    retreat: { icon: 'mdi:meditation', color: 'text-gray-700' },
    other: { icon: 'mdi:calendar-star', color: 'text-gray-500' }
  };

  $: getTypeConfig = (eventType: string) => 
    eventTypeConfig[eventType as keyof typeof eventTypeConfig] || eventTypeConfig.other;

  // Deutsche Datumsformatierung
  function formatEventDate(startDate: string): string {
    const date = new Date(startDate);
    return date.toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  function formatEventTime(startDate: string): string {
    const date = new Date(startDate);
    return date.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Modal-Handler
  function openEventModal(event: SanityEvent) {
    console.log('🎯 Opening modal for event:', event.title);
    selectedEvent = event;
    isModalOpen = true;
    console.log('🎯 Modal state:', { selectedEvent: selectedEvent?.title, isModalOpen });
  }

  function closeModal() {
    console.log('🎯 Closing modal');
    isModalOpen = false;
    selectedEvent = null;
  }

  // Navigation zu Event-Detail
  function navigateToEvent(slug: string) {
    goto(`/events/${slug}`);
  }

  onMount(() => {
    visible = true;
  });
</script>

{#if visible}
  <section class="py-12 sm:py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50" in:fade={{ duration: 800 }}>
    <div class="container mx-auto px-3 sm:px-4">
      <!-- Header -->
      <div class="text-center mb-8 sm:mb-12" in:fly={{ y: 30, delay: 200 }}>
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          {title}
        </h2>
        <p class="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
          {subtitle}
        </p>
        
        <!-- Tab Buttons -->
        {#if events.length > 0 || pastEvents.length > 0}
          <div class="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
            {#if events.length > 0}
              <button
                on:click={() => activeTab = 'upcoming'}
                class="px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all text-sm sm:text-base
                       {activeTab === 'upcoming' 
                         ? 'bg-primary-500 text-white shadow-lg' 
                         : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
              >
                <Icon icon="mdi:calendar-clock" class="w-4 sm:w-5 h-4 sm:h-5 inline mr-1 sm:mr-2" />
                <span class="hidden sm:inline">Kommende Veranstaltungen</span>
                <span class="sm:hidden">Kommende Events</span>
              </button>
            {/if}
            
            {#if pastEvents.length > 0}
              <button
                on:click={() => activeTab = 'past'}
                class="px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all text-sm sm:text-base
                       {activeTab === 'past' 
                         ? 'bg-primary-500 text-white shadow-lg' 
                         : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
              >
                <Icon icon="mdi:history" class="w-4 sm:w-5 h-4 sm:h-5 inline mr-1 sm:mr-2" />
                <span class="hidden sm:inline">Vergangene Veranstaltungen</span>
                <span class="sm:hidden">Vergangene Events</span>
              </button>
            {/if}
          </div>
        {/if}
      </div>

      <!-- Event Grid -->
      <div class="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12" in:fly={{ y: 30, delay: 400 }}>
        
        <!-- Hero Event (Featured/Newest) -->
        {#if heroEvent}
          <div class="lg:col-span-2">
            <div class="group cursor-pointer transition-colors duration-300 h-full overflow-hidden bg-white rounded-lg border border-gray-200 hover:border-gray-300"
                 on:click={() => {
                   console.log('🎯 CARD CLICKED!', heroEvent.title);
                   openEventModal(heroEvent);
                 }}
                 on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), openEventModal(heroEvent))}
                 role="button"
                 tabindex="0">
              
              <!-- Hero Image -->
              <div class="relative h-48 sm:h-64 lg:h-80 overflow-hidden">
                {#if heroEvent.featuredImage}
                  <SanityImage
                    src={heroEvent.featuredImage}
                    alt={heroEvent.title}
                    width={600}
                    height={320}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                {:else}
                  <div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <Icon icon="mdi:calendar-heart" class="text-5xl sm:text-6xl text-primary-500/60" />
                  </div>
                {/if}
                
                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                <!-- Event Type Badge -->
                <div class="absolute top-4 right-4">
                  <Badge class="bg-white/90 text-gray-800 backdrop-blur-sm">
                    <Icon icon={getTypeConfig(heroEvent.eventType || '').icon} class="w-3 h-3 mr-1" />
                    {heroEvent.eventCategory?.title || 'Event'}
                  </Badge>
                </div>
                
                <!-- Featured Badge -->
                {#if heroEvent.isFeatured}
                  <div class="absolute top-4 left-4">
                    <Badge class="bg-primary-500 text-white">
                      <Icon icon="mdi:star" class="w-3 h-3 mr-1" />
                      Hervorgehoben
                    </Badge>
                  </div>
                {/if}
                
                <!-- Registration Deadline -->
                {#if heroEvent.registration?.required && heroEvent.registration.deadline}
                  <div class="absolute bottom-4 left-4">
                    <Badge class="bg-orange-500 text-white text-xs">
                      <Icon icon="mdi:calendar-clock" class="w-3 h-3 mr-1" />
                      bis {formatEventDate(heroEvent.registration.deadline)}
                    </Badge>
                  </div>
                {/if}

                <!-- Date/Time Overlay -->
                <div class="absolute bottom-4 right-4 text-white text-right">
                  <div class="text-lg sm:text-xl lg:text-2xl font-medium">{formatEventDate(heroEvent.startDate)}</div>
                  <div class="text-xs sm:text-sm opacity-90">{formatEventTime(heroEvent.startDate)}</div>
                </div>
              </div>

              <!-- Hero Content -->
              <Card.Content class="p-4 sm:p-6">
                <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-500 transition-colors">
                  {heroEvent.title}
                </h3>
                
                {#if heroEvent.description}
                  <p class="text-gray-600 mb-4 line-clamp-2">
                    {heroEvent.description}
                  </p>
                {/if}

                <!-- Location -->
                <div class="flex items-center gap-2 text-sm text-primary-500">
                  <Icon icon="mdi:map-marker" class="w-4 h-4" />
                  <span>
                    {#if heroEvent.location?.type === 'temple'}
                      {heroEvent.location.temple?.name || 'ISKCON Tempel'}
                    {:else if heroEvent.location?.type === 'online'}
                      Online-Veranstaltung
                    {:else}
                      {heroEvent.location?.externalVenue?.name || 'Externer Veranstaltungsort'}
                    {/if}
                  </span>
                </div>
              </Card.Content>
            </div>
          </div>
        {/if}

        <!-- Side Events -->
        <div class="space-y-4">
          {#each sideEvents as event, index}
            <div in:fly={{ y: 20, delay: 600 + (index * 100) }}>
              <div class="group cursor-pointer hover:shadow-lg transition-all duration-300 bg-white rounded-lg border border-border"
                   on:click={() => {
                     console.log('🎯 SIDE CARD CLICKED!', event.title);
                     openEventModal(event);
                   }}
                   on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), openEventModal(event))}
                   role="button"
                   tabindex="0">
              
              <div class="flex gap-2 sm:gap-4 p-3 sm:p-4">
                <!-- Mini Image -->
                <div class="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                  {#if event.featuredImage}
                    <SanityImage
                      src={event.featuredImage}
                      alt={event.title}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  {:else}
                    <div class="w-full h-full bg-gradient-to-br from-gray-100 to-primary-500/10 flex items-center justify-center">
                      <Icon icon={getTypeConfig(event.eventType || '').icon} class="text-xl text-primary-500/60" />
                    </div>
                  {/if}
                </div>

                <!-- Content -->
                <div class="flex-1 min-w-0 overflow-hidden">
                  <h4 class="font-semibold text-gray-900 mb-1 group-hover:text-primary-500 transition-colors line-clamp-2">
                    {event.title}
                  </h4>
                  
                  <div class="flex items-center gap-1 sm:gap-2 text-xs text-gray-500 mb-2 flex-wrap">
                    <Icon icon="mdi:calendar" class="w-3 h-3 flex-shrink-0" />
                    <span class="whitespace-nowrap">{formatEventDate(event.startDate)}</span>
                    <span class="hidden sm:inline">•</span>
                    <span class="whitespace-nowrap">{formatEventTime(event.startDate)}</span>
                  </div>
                  
                  <div class="flex items-center gap-1 sm:gap-2 text-xs text-primary-500 overflow-hidden">
                    <Icon icon="mdi:map-marker" class="w-3 h-3 flex-shrink-0" />
                    <span class="truncate">
                      {#if event.location?.type === 'temple'}
                        {event.location.temple?.name || 'ISKCON Tempel'}
                      {:else if event.location?.type === 'online'}
                        Online
                      {:else}
                        {event.location?.externalVenue?.name || 'Extern'}
                      {/if}
                    </span>
                  </div>
                </div>
              </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Keine Events Nachricht -->
      {#if currentEvents.length === 0}
        <div class="text-center py-16">
          <Icon icon="mdi:calendar-blank" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p class="text-lg text-gray-600">
            {activeTab === 'upcoming' 
              ? 'Zurzeit sind keine kommenden Veranstaltungen geplant.' 
              : 'Keine vergangenen Veranstaltungen vorhanden.'}
          </p>
        </div>
      {/if}

      <!-- Call to Action -->
      <div class="text-center" in:fly={{ y: 30, delay: 800 }}>
        <Button
          variant="premium"
          size="lg"
          href="/events"
        >
          <span>{activeTab === 'upcoming' ? 'Alle Events entdecken' : 'Alle vergangenen Events'}</span>
          <Icon icon="mdi:arrow-right" class="w-5 h-5" />
        </Button>
      </div>
    </div>
  </section>
{/if}

<!-- Event Modal -->
{#if selectedEvent}
  <EventModal
    event={selectedEvent}
    bind:isOpen={isModalOpen}
    on:close={closeModal}
  />
{/if}

<style>
  .line-clamp-2 {
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>