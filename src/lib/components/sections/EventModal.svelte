<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import SanityImage from '$lib/components/global/SanityImage.svelte';
  import * as Dialog from '$lib/components/ui/dialog';
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Separator } from '$lib/components/ui/separator';
  import Icon from '@iconify/svelte';
  import type { SanityEvent } from '$lib/types';
  
  export let event: SanityEvent;
  export let isOpen: boolean = false;
  
  const dispatch = createEventDispatcher<{
    close: void;
    register: { event: SanityEvent };
  }>();
  
  // Event-Typ zu Icon und Farbe Mapping
  const eventTypeConfig = {
    festival: { icon: 'mdi:festival', color: 'text-amber-600' },
    kirtan: { icon: 'mdi:music-note', color: 'text-orange-600' },
    lecture: { icon: 'mdi:account-voice', color: 'text-blue-600' },
    gita_class: { icon: 'mdi:book-open-variant', color: 'text-blue-700' },
    prasadam: { icon: 'mdi:food', color: 'text-orange-700' },
    pilgrimage: { icon: 'mdi:map-marker-path', color: 'text-amber-700' },
    workshop: { icon: 'mdi:hammer-wrench', color: 'text-green-600' },
    retreat: { icon: 'mdi:meditation', color: 'text-blue-800' },
    conference: { icon: 'mdi:account-group', color: 'text-green-700' },
    other: { icon: 'mdi:calendar-star', color: 'text-gray-600' }
  };
  
  $: typeConfig = eventTypeConfig[event?.eventType as keyof typeof eventTypeConfig] || eventTypeConfig.other;
  
  // Deutsche Datumsformatierung
  function formatEventDate(startDate: string, endDate?: string): string {
    const start = new Date(startDate);
    const startFormatted = start.toLocaleDateString('de-DE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
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
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      return `${startFormatted}, ${startTime} bis ${endFormatted}, ${endTime}`;
    }
    
    return `${startFormatted}, ${startTime}`;
  }
  
  // Event-Typ Übersetzung
  function getEventTypeLabel(type: string): string {
    const labels = {
      festival: 'Festival',
      kirtan: 'Kirtan',
      lecture: 'Vortrag',
      gita_class: 'Bhagavad Gita Klasse',
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
  function getLocationInfo(): { name: string; details: string; icon: string; url?: string } {
    if (event.location.type === 'temple' && event.location.temple) {
      return {
        name: event.location.temple.name,
        details: event.location.temple.address ? `${event.location.temple.address.street}, ${event.location.temple.address.city}` : '',
        icon: 'mdi:temple-hindu',
        url: event.location.temple.location ? `https://maps.google.com/?q=${event.location.temple.location.lat},${event.location.temple.location.lng}` : undefined
      };
    }
    
    if (event.location.type === 'online') {
      return {
        name: 'Online-Veranstaltung',
        details: 'Teilnahme über das Internet',
        icon: 'mdi:web',
        url: event.location.onlineLink
      };
    }
    
    if (event.location.type === 'external' && event.location.externalVenue) {
      return {
        name: event.location.externalVenue.name || 'Externer Veranstaltungsort',
        details: event.location.externalVenue.address || '',
        icon: 'mdi:map-marker',
        url: event.location.externalVenue.coordinates ? 
          `https://maps.google.com/?q=${event.location.externalVenue.coordinates.lat},${event.location.externalVenue.coordinates.lng}` : undefined
      };
    }
    
    return { name: '', details: '', icon: 'mdi:map-marker' };
  }
  
  // Kosten formatieren
  function formatCost(): string {
    if (!event.registration?.cost?.amount) return 'Kostenlos';
    
    const { amount, currency = 'EUR', description } = event.registration.cost;
    const formatted = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: currency
    }).format(amount);
    
    return description ? `${formatted} (${description})` : formatted;
  }
  
  // Event-Dauer berechnen
  function getEventDuration(): string {
    if (!event.endDate) return '';
    
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);
    const durationMs = end.getTime() - start.getTime();
    const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
    const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (durationHours > 0) {
      return durationMinutes > 0 ? `${durationHours}h ${durationMinutes}min` : `${durationHours}h`;
    }
    return `${durationMinutes}min`;
  }
  
  // Event Handlers
  function handleClose() {
    console.log('🎪 EventModal: Close button clicked');
    isOpen = false;
    dispatch('close');
  }
  
  function handleRegister() {
    console.log('🎪 EventModal: Register button clicked');
    dispatch('register', { event });
  }
  
  function handleViewDetails() {
    console.log('🎪 EventModal: View details button clicked for:', event.slug);
    window.location.href = `/events/${event.slug}`;
  }
</script>

<Dialog.Root bind:open={isOpen}>
  <Dialog.Content class="max-w-4xl max-h-[90vh] overflow-y-auto">
    <Dialog.Header class="space-y-4">
      <!-- Event Image -->
      {#if event.featuredImage}
        <div class="relative aspect-video rounded-lg overflow-hidden -mt-6 -mx-6 mb-4">
          <SanityImage
            src={event.featuredImage}
            alt={event.title}
            width={800}
            height={400}
            className="w-full h-full object-cover"
          />
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          
          <!-- Event Badges auf dem Bild -->
          <div class="absolute top-4 left-4 flex gap-2">
            <Badge variant="secondary" class="bg-white/90 text-gray-900">
              <Icon icon={typeConfig.icon} class="w-3 h-3 mr-1" />
              {getEventTypeLabel(event.eventType || '')}
            </Badge>
            
            {#if event.isFeatured}
              <Badge class="bg-amber-500 text-white">
                <Icon icon="mdi:star" class="w-3 h-3 mr-1" />
                Hervorgehoben
              </Badge>
            {/if}
          </div>
          
          <!-- Event Title über dem Bild -->
          <div class="absolute bottom-4 left-4 right-4">
            <Dialog.Title class="text-2xl md:text-3xl font-medium text-white drop-shadow-lg">
              {event.title}
            </Dialog.Title>
            {#if event.description}
              <Dialog.Description class="text-white/90 mt-2 drop-shadow">
                {event.description}
              </Dialog.Description>
            {/if}
          </div>
        </div>
      {:else}
        <!-- Fallback ohne Bild -->
        <div class="text-center py-4">
          <div class="flex items-center justify-center gap-2 mb-4">
            <Badge variant="secondary">
              <Icon icon={typeConfig.icon} class="w-3 h-3 mr-1" />
              {getEventTypeLabel(event.eventType || '')}
            </Badge>
            
            {#if event.isFeatured}
              <Badge class="bg-amber-500 text-white">
                <Icon icon="mdi:star" class="w-3 h-3 mr-1" />
                Hervorgehoben
              </Badge>
            {/if}
          </div>
          
          <Dialog.Title class="text-2xl md:text-3xl font-medium">
            {event.title}
          </Dialog.Title>
          {#if event.description}
            <Dialog.Description class="mt-2 text-muted-foreground">
              {event.description}
            </Dialog.Description>
          {/if}
        </div>
      {/if}
    </Dialog.Header>

    <div class="grid md:grid-cols-3 gap-6 mt-6">
      <!-- Main Content -->
      <div class="md:col-span-2 space-y-6">
        <!-- Event Details Card -->
        <Card.Root>
          <Card.Header>
            <Card.Title class="flex items-center gap-2">
              <Icon icon="mdi:information" class="w-5 h-5 text-blue-600" />
              Details
            </Card.Title>
          </Card.Header>
          <Card.Content class="space-y-4">
            <!-- Datum & Zeit -->
            <div class="flex items-start gap-3">
              <Icon icon="mdi:calendar-clock" class="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 class="font-medium">Datum & Zeit</h4>
                <time class="text-sm text-muted-foreground" datetime={event.startDate}>
                  {formatEventDate(event.startDate, event.endDate)}
                </time>
                {#if getEventDuration()}
                  <p class="text-xs text-muted-foreground mt-1">Dauer: {getEventDuration()}</p>
                {/if}
              </div>
            </div>
            
            <!-- Location -->
            {#if getLocationInfo().name}
              {@const location = getLocationInfo()}
              <Separator />
              <div class="flex items-start gap-3">
                <Icon icon={location.icon} class="w-5 h-5 text-orange-600 mt-0.5" />
                <div class="flex-1">
                  <h4 class="font-medium">Veranstaltungsort</h4>
                  <p class="text-sm text-muted-foreground">{location.name}</p>
                  {#if location.details}
                    <p class="text-xs text-muted-foreground">{location.details}</p>
                  {/if}
                  {#if location.url}
                    <button
                      type="button"
                      class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline text-primary h-auto p-0 text-xs mt-1"
                      on:click={() => window.open(location.url, '_blank')}
                    >
                      <Icon icon="mdi:directions" class="w-3 h-3 mr-1" />
                      {event.location.type === 'online' ? 'Online teilnehmen' : 'Wegbeschreibung'}
                    </button>
                  {/if}
                </div>
              </div>
            {/if}
            
            <!-- Wiederkehrend -->
            {#if event.isRecurring}
              <Separator />
              <div class="flex items-start gap-3">
                <Icon icon="mdi:repeat" class="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 class="font-medium">Wiederkehrend</h4>
                  <p class="text-sm text-muted-foreground">Regelmäßige Veranstaltung</p>
                </div>
              </div>
            {/if}
          </Card.Content>
        </Card.Root>

        <!-- Organizer Card -->
        {#if event.organizer?.name}
          <Card.Root>
            <Card.Header>
              <Card.Title class="flex items-center gap-2">
                <Icon icon="mdi:account" class="w-5 h-5 text-green-600" />
                Veranstalter
              </Card.Title>
            </Card.Header>
            <Card.Content>
              <div class="flex items-start gap-4">
                {#if event.organizer.image}
                  <SanityImage
                    src={event.organizer.image}
                    alt={event.organizer.name}
                    width={60}
                    height={60}
                    className="w-15 h-15 rounded-full object-cover"
                  />
                {:else}
                  <div class="w-15 h-15 bg-muted rounded-full flex items-center justify-center">
                    <Icon icon="mdi:account" class="w-8 h-8 text-muted-foreground" />
                  </div>
                {/if}
                
                <div class="flex-1">
                  <h4 class="font-medium">{event.organizer.name}</h4>
                  {#if event.organizer.bio}
                    <p class="text-sm text-muted-foreground mt-1">{event.organizer.bio}</p>
                  {/if}
                  
                  <div class="flex gap-4 mt-2">
                    {#if event.organizer?.email}
                      <button
                        type="button"
                        class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline text-primary h-auto p-0 text-xs"
                        on:click={() => window.open(`mailto:${event.organizer?.email}`, '_blank')}
                      >
                        <Icon icon="mdi:email" class="w-3 h-3 mr-1" />
                        E-Mail
                      </button>
                    {/if}
                    {#if event.organizer?.phone}
                      <button
                        type="button"
                        class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline text-primary h-auto p-0 text-xs"
                        on:click={() => window.open(`tel:${event.organizer?.phone}`, '_blank')}
                      >
                        <Icon icon="mdi:phone" class="w-3 h-3 mr-1" />
                        Telefon
                      </button>
                    {/if}
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card.Root>
        {/if}
      </div>
      
      <!-- Sidebar -->
      <div class="space-y-4">
        <!-- Registration Card -->
        {#if event.registration?.required}
          <Card.Root class="border-orange-200 bg-orange-50">
            <Card.Header>
              <Card.Title class="text-orange-900 flex items-center gap-2">
                <Icon icon="mdi:account-plus" class="w-5 h-5" />
                Anmeldung
              </Card.Title>
            </Card.Header>
            <Card.Content class="space-y-3">
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span>Kosten:</span>
                  <span class="font-medium">{formatCost()}</span>
                </div>
                
                {#if event.registration.deadline}
                  <div class="flex justify-between">
                    <span>Anmeldeschluss:</span>
                    <span class="font-medium">
                      {new Date(event.registration.deadline).toLocaleDateString('de-DE')}
                    </span>
                  </div>
                {/if}
                
                {#if event.registration.maxParticipants}
                  <div class="flex justify-between">
                    <span>Plätze:</span>
                    <span class="font-medium">{event.registration.maxParticipants}</span>
                  </div>
                {/if}
              </div>
              
              <button
                type="button"
                class="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-orange-600 hover:bg-orange-700 text-white h-10 px-4 py-2"
                on:click={handleRegister}
              >
                <Icon icon="mdi:account-plus" class="w-4 h-4 mr-2" />
                Jetzt anmelden
              </button>
            </Card.Content>
          </Card.Root>
        {:else}
          <Card.Root class="border-blue-200 bg-blue-50">
            <Card.Header>
              <Card.Title class="text-blue-900 flex items-center gap-2">
                <Icon icon="mdi:information" class="w-5 h-5" />
                Teilnahme
              </Card.Title>
            </Card.Header>
            <Card.Content>
              <p class="text-blue-800 text-sm mb-3">Keine Anmeldung erforderlich. Kommen Sie einfach vorbei!</p>
              <button
                type="button"
                class="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                on:click={handleRegister}
              >
                <Icon icon="mdi:information" class="w-4 h-4 mr-2" />
                Mehr Informationen
              </button>
            </Card.Content>
          </Card.Root>
        {/if}
        
        <!-- Tags -->
        {#if event.tags && event.tags.length > 0}
          <Card.Root>
            <Card.Header>
              <Card.Title class="flex items-center gap-2">
                <Icon icon="mdi:tag" class="w-5 h-5 text-gray-600" />
                Tags
              </Card.Title>
            </Card.Header>
            <Card.Content>
              <div class="flex flex-wrap gap-1">
                {#each event.tags as tag}
                  <Badge variant="secondary" class="text-xs">
                    #{tag}
                  </Badge>
                {/each}
              </div>
            </Card.Content>
          </Card.Root>
        {/if}
      </div>
    </div>

    <Dialog.Footer class="mt-6">
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        on:click={handleClose}
      >
        Schließen
      </button>
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        on:click={handleViewDetails}
      >
        <Icon icon="mdi:arrow-right" class="w-4 h-4 mr-2" />
        Vollständige Details
      </button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>