<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import * as Card from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import SanityImage from '$lib/components/global/SanityImage.svelte';
  import EventModal from './EventModal.svelte';
  import type { SanityEvent } from '$lib/types';

  // Props
  export let events: SanityEvent[] = [];
  export let featuredEvents: SanityEvent[] = [];
  export let title = 'Kommende Veranstaltungen';
  export let subtitle = 'Entdecken Sie unsere spirituellen Events und Festivals';

  let visible = false;

  // Modal State
  let selectedEvent: SanityEvent | null = null;
  let isModalOpen = false;

  // Events für Layout vorbereiten
  $: heroEvent = featuredEvents[0] || events[0];
  $: sideEvents = events.slice(0, 3);

  // Event-Typ Konfiguration
  const eventTypeConfig = {
    festival: { icon: 'mdi:festival', color: 'spiritual-gold-500' },
    kirtan: { icon: 'mdi:music-note', color: 'spiritual-saffron-500' },
    lecture: { icon: 'mdi:account-voice', color: 'spiritual-blue-500' },
    workshop: { icon: 'mdi:hammer-wrench', color: 'spiritual-earth-500' },
    retreat: { icon: 'mdi:meditation', color: 'spiritual-blue-700' },
    other: { icon: 'mdi:calendar-star', color: 'gray-500' }
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
  <section class="py-16 bg-gradient-to-br from-spiritual-saffron-50/30 via-background to-spiritual-blue-50/20" in:fade={{ duration: 800 }}>
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-12" in:fly={{ y: 30, delay: 200 }}>
        <h2 class="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
          {title}
        </h2>
        <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      <!-- Event Grid -->
      <div class="grid lg:grid-cols-3 gap-8 mb-12" in:fly={{ y: 30, delay: 400 }}>
        
        <!-- Hero Event (Featured/Newest) -->
        {#if heroEvent}
          <div class="lg:col-span-2">
            <div class="group cursor-pointer hover:shadow-2xl transition-all duration-300 h-full overflow-hidden bg-white rounded-lg border border-border"
                 on:click={() => {
                   console.log('🎯 CARD CLICKED!', heroEvent.title);
                   openEventModal(heroEvent);
                 }}
                 on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), openEventModal(heroEvent))}
                 role="button"
                 tabindex="0">
              
              <!-- Hero Image -->
              <div class="relative h-80 overflow-hidden">
                {#if heroEvent.featuredImage}
                  <SanityImage
                    src={heroEvent.featuredImage}
                    alt={heroEvent.title}
                    width={600}
                    height={320}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                {:else}
                  <div class="w-full h-full bg-gradient-to-br from-spiritual-gold-200 to-spiritual-saffron-200 flex items-center justify-center">
                    <Icon icon="mdi:calendar-heart" class="text-6xl text-spiritual-gold-500" />
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
                    <Badge class="bg-spiritual-gold-500 text-white">
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
                  <div class="text-2xl font-medium">{formatEventDate(heroEvent.startDate)}</div>
                  <div class="text-sm opacity-90">{formatEventTime(heroEvent.startDate)}</div>
                </div>
              </div>

              <!-- Hero Content -->
              <Card.Content class="p-6">
                <h3 class="text-2xl font-medium text-gray-900 mb-3 group-hover:text-spiritual-saffron-600 transition-colors">
                  {heroEvent.title}
                </h3>
                
                {#if heroEvent.description}
                  <p class="text-muted-foreground mb-4 line-clamp-2">
                    {heroEvent.description}
                  </p>
                {/if}

                <!-- Location -->
                <div class="flex items-center gap-2 text-sm text-spiritual-blue-600">
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
              
              <div class="flex gap-4 p-4">
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
                    <div class="w-full h-full bg-gradient-to-br from-spiritual-blue-100 to-spiritual-saffron-100 flex items-center justify-center">
                      <Icon icon={getTypeConfig(event.eventType || '').icon} class="text-xl text-spiritual-blue-500" />
                    </div>
                  {/if}
                  
                  <!-- Registration Badge -->
                  {#if event.registration?.required && event.registration.deadline}
                    <div class="absolute -top-1 -right-1">
                      <Badge class="bg-orange-500 text-white text-xs px-1 py-0">
                        <Icon icon="mdi:calendar-clock" class="w-2 h-2" />
                      </Badge>
                    </div>
                  {/if}
                </div>

                <!-- Content -->
                <div class="flex-1 min-w-0">
                  <h4 class="font-medium text-gray-900 mb-1 group-hover:text-spiritual-saffron-600 transition-colors truncate">
                    {event.title}
                  </h4>
                  
                  <div class="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Icon icon="mdi:calendar" class="w-3 h-3" />
                    <span>{formatEventDate(event.startDate)}</span>
                    <span>•</span>
                    <span>{formatEventTime(event.startDate)}</span>
                  </div>
                  
                  <div class="flex items-center gap-2 text-xs text-spiritual-blue-600">
                    <Icon icon="mdi:map-marker" class="w-3 h-3" />
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

      <!-- Call to Action -->
      <div class="text-center" in:fly={{ y: 30, delay: 800 }}>
        <button
          type="button"
          class="inline-flex items-center gap-3 px-8 py-4 bg-spiritual-saffron-500 hover:bg-spiritual-saffron-600 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
          on:click={() => goto('/events')}
        >
          <span>Alle Events entdecken</span>
          <Icon icon="mdi:arrow-right" class="w-5 h-5" />
        </button>
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
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>