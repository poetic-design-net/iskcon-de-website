<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import SanityImage from '$lib/components/global/SanityImage.svelte';
  import * as Card from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import { Alert, AlertDescription } from '$lib/components/ui/alert';
  import Icon from '@iconify/svelte';
  import type { SanityEvent } from '$lib/types';
  
  export let event: SanityEvent;
  export let size: 'small' | 'medium' | 'large' = 'medium';
  
  const dispatch = createEventDispatcher<{
    eventClick: { event: SanityEvent };
  }>();
  
  // Event-Typ zu Icon und Farbe Mapping
  const eventTypeConfig = {
    festival: { icon: 'mdi:festival', color: 'spiritual-gold-500', variant: 'default' as const },
    kirtan: { icon: 'mdi:music-note', color: 'spiritual-saffron-500', variant: 'secondary' as const },
    lecture: { icon: 'mdi:account-voice', color: 'spiritual-blue-500', variant: 'outline' as const },
    gita_class: { icon: 'mdi:book-open-variant', color: 'spiritual-blue-600', variant: 'outline' as const },
    prasadam: { icon: 'mdi:food', color: 'spiritual-saffron-600', variant: 'secondary' as const },
    pilgrimage: { icon: 'mdi:map-marker-path', color: 'spiritual-gold-600', variant: 'default' as const },
    workshop: { icon: 'mdi:hammer-wrench', color: 'spiritual-earth-500', variant: 'outline' as const },
    retreat: { icon: 'mdi:meditation', color: 'spiritual-blue-700', variant: 'outline' as const },
    conference: { icon: 'mdi:account-group', color: 'spiritual-earth-600', variant: 'outline' as const },
    other: { icon: 'mdi:calendar-star', color: 'gray-500', variant: 'outline' as const }
  };
  
  $: typeConfig = eventTypeConfig[event.eventType as keyof typeof eventTypeConfig] || eventTypeConfig.other;
  
  // Größen-spezifische Klassen
  const sizeConfig = {
    small: {
      image: { width: 300, height: 200 },
      title: 'text-base',
      description: 'text-sm',
      maxDescription: 80
    },
    medium: {
      image: { width: 400, height: 250 },
      title: 'text-lg',
      description: 'text-base',
      maxDescription: 120
    },
    large: {
      image: { width: 500, height: 300 },
      title: 'text-xl',
      description: 'text-lg',
      maxDescription: 160
    }
  };
  
  $: config = sizeConfig[size];
  
  // Deutsche Datumsformatierung
  function formatEventDate(startDate: string, endDate?: string): string {
    const start = new Date(startDate);
    const startFormatted = start.toLocaleDateString('de-DE', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    
    const startTime = start.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    if (endDate) {
      const end = new Date(endDate);
      const endTime = end.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit'
      });
      
      // Gleicher Tag
      if (start.toDateString() === end.toDateString()) {
        return `${startFormatted}, ${startTime} - ${endTime}`;
      }
      
      // Verschiedene Tage
      const endFormatted = end.toLocaleDateString('de-DE', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      });
      return `${startFormatted} - ${endFormatted}`;
    }
    
    return `${startFormatted}, ${startTime}`;
  }
  
  // Beschreibung kürzen
  function truncateDescription(text: string | undefined, maxLength: number): string {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  }
  
  // Event-Typ Übersetzung
  function getEventTypeLabel(type: string): string {
    const labels = {
      festival: 'Festival',
      kirtan: 'Kirtan',
      lecture: 'Vortrag',
      gita_class: 'Bhagavad Gita',
      prasadam: 'Prasadam',
      pilgrimage: 'Pilgerfahrt',
      workshop: 'Workshop',
      retreat: 'Retreat',
      conference: 'Konferenz',
      other: 'Sonstiges'
    };
    return labels[type as keyof typeof labels] || type;
  }
  
  // Location Information
  function getLocationInfo(): string {
    if (event.location.type === 'temple' && event.location.temple) {
      return event.location.temple.name;
    }
    if (event.location.type === 'online') {
      return 'Online';
    }
    if (event.location.type === 'external' && event.location.externalVenue?.name) {
      return event.location.externalVenue.name;
    }
    return '';
  }
  
  // Event Click Handler
  function handleEventClick() {
    console.log('🎯 EventCard Click Handler called for:', event.title);
    dispatch('eventClick', { event });
  }
  
  // Navigate to Event Detail Page
  function navigateToEventDetail() {
    console.log('🔗 Navigating to event detail:', event.slug);
    window.location.href = `/events/${event.slug}`;
  }
</script>

<div
  class="group h-full flex flex-col overflow-hidden transition-colors duration-300 cursor-pointer border border-gray-200 hover:border-gray-300 relative z-10 bg-white rounded-lg"
  tabindex="0"
  role="button"
  aria-label="Event: {event.title}"
  on:click={handleEventClick}
  on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), handleEventClick())}
>
  <!-- Event Image -->
  <div class="relative aspect-video overflow-hidden">
    {#if event.featuredImage}
      <div class="relative h-full w-full">
        <!-- Event Image -->
        <SanityImage
          src={event.featuredImage}
          alt={event.title}
          width={config.image.width}
          height={config.image.height}
          className="h-full w-full object-cover"
        />
        
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      </div>
    {:else}
      <!-- Fallback Image -->
      <div class="h-full w-full bg-muted flex items-center justify-center">
        <Icon icon="mdi:calendar-heart" class="text-muted-foreground text-6xl" />
      </div>
    {/if}
    
    <!-- Event Type Badge -->
    <div class="absolute top-3 right-3">
      <Badge variant="secondary" class="bg-white/95 backdrop-blur-sm text-gray-700 border border-gray-200">
        <Icon icon={typeConfig.icon} class="w-3 h-3 mr-1" />
        {getEventTypeLabel(event.eventType || 'other')}
      </Badge>
    </div>
    
    <!-- Featured Badge -->
    {#if event.isFeatured}
      <div class="absolute top-3 left-3">
        <Badge class="bg-white/95 text-primary-600 backdrop-blur-sm border border-gray-200">
          <Icon icon="mdi:star" class="w-3 h-3 mr-1" />
          Hervorgehoben
        </Badge>
      </div>
    {/if}
    
    <!-- Anmeldung Deadline Badge (on image) -->
    {#if event.registration?.required && event.registration.deadline}
      <div class="absolute bottom-3 left-3">
        <Badge class="bg-white/95 text-orange-600 backdrop-blur-sm border border-gray-200 text-xs">
          <Icon icon="mdi:calendar-clock" class="w-3 h-3 mr-1" />
          bis {new Date(event.registration.deadline).toLocaleDateString('de-DE')}
        </Badge>
      </div>
    {/if}
  </div>
  
  <!-- Event Content -->
  <Card.Content class="flex-1 p-6 space-y-4 flex flex-col">
    <!-- Datum und Zeit -->
    <div class="flex items-center gap-2 text-spiritual-blue-600">
      <Icon icon="mdi:calendar-clock" class="w-4 h-4 flex-shrink-0" />
      <time class="text-sm font-medium" datetime={event.startDate}>
        {formatEventDate(event.startDate, event.endDate)}
      </time>
    </div>
    
    <!-- Event Titel -->
    <Card.Title class="{config.title} font-medium text-card-foreground group-hover:text-spiritual-saffron-700 transition-colors leading-tight">
      {event.title}
    </Card.Title>
    
    <!-- Event Beschreibung -->
    {#if event.description}
      <Card.Description class="{config.description} text-muted-foreground leading-relaxed">
        {truncateDescription(event.description, config.maxDescription)}
      </Card.Description>
    {/if}
    
    <!-- Location Information -->
    {#if getLocationInfo()}
      <div class="flex items-center gap-2 text-spiritual-saffron-600">
        <Icon 
          icon={event.location.type === 'online' ? 'mdi:web' : event.location.type === 'temple' ? 'mdi:temple-hindu' : 'mdi:map-marker'} 
          class="w-4 h-4 flex-shrink-0" 
        />
        <span class="text-sm font-medium truncate">
          {getLocationInfo()}
          {#if event.location.type === 'temple' && event.location.temple?.address?.city}
            <span class="text-muted-foreground">• {event.location.temple.address.city}</span>
          {/if}
        </span>
      </div>
    {/if}
    
    <!-- Recurring Event Indicator -->
    {#if event.isRecurring}
      <div class="flex items-center gap-2 text-spiritual-blue-500 text-xs">
        <Icon icon="mdi:repeat" class="w-3 h-3 flex-shrink-0" />
        <span>Wiederkehrende Veranstaltung</span>
      </div>
    {/if}
  </Card.Content>

  <!-- Card Footer -->
  <Card.Footer class="p-6 pt-0 space-y-3">
    <!-- CTA Buttons -->
    <div class="flex gap-2">
      <button
        type="button"
        class="flex-1 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-spiritual-saffron-500 hover:bg-spiritual-saffron-600 text-white h-10 px-4 py-2 group"
        on:click={(e) => { e.stopPropagation(); navigateToEventDetail(); }}
      >
        <Icon icon="mdi:information" class="w-4 h-4 mr-2" />
        Details anzeigen
        <Icon icon="mdi:arrow-right" class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
      </button>
      
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-spiritual-saffron-50 hover:text-accent-foreground h-9 px-3"
        on:click={(e) => { e.stopPropagation(); handleEventClick(); }}
        title="Quick View - Modal öffnen"
      >
        <Icon icon="mdi:eye" class="w-4 h-4" />
      </button>
    </div>
  </Card.Footer>
</div>