<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import SanityImage from '$lib/components/global/SanityImage.svelte';
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Alert, AlertDescription } from '$lib/components/ui/alert';
  import { Separator } from '$lib/components/ui/separator';
  import Icon from '@iconify/svelte';
  import type { PageData } from './$types';
  import type { SanityEvent } from '$lib/types';

  export let data: PageData;
  $: event = data.event;

  let visible = false;
  let showShareOptions = false;

  // Event-Typ zu Icon und Farbe Mapping
  const eventTypeConfig = {
    festival: { icon: 'mdi:festival', color: 'spiritual-gold-500', bgColor: 'bg-spiritual-gold-50', borderColor: 'border-spiritual-gold-200' },
    kirtan: { icon: 'mdi:music-note', color: 'spiritual-saffron-500', bgColor: 'bg-spiritual-saffron-50', borderColor: 'border-spiritual-saffron-200' },
    lecture: { icon: 'mdi:account-voice', color: 'spiritual-blue-500', bgColor: 'bg-spiritual-blue-50', borderColor: 'border-spiritual-blue-200' },
    gita_class: { icon: 'mdi:book-open-variant', color: 'spiritual-blue-600', bgColor: 'bg-spiritual-blue-50', borderColor: 'border-spiritual-blue-200' },
    prasadam: { icon: 'mdi:food', color: 'spiritual-saffron-600', bgColor: 'bg-spiritual-saffron-50', borderColor: 'border-spiritual-saffron-200' },
    pilgrimage: { icon: 'mdi:map-marker-path', color: 'spiritual-gold-600', bgColor: 'bg-spiritual-gold-50', borderColor: 'border-spiritual-gold-200' },
    workshop: { icon: 'mdi:hammer-wrench', color: 'spiritual-earth-500', bgColor: 'bg-spiritual-earth-50', borderColor: 'border-spiritual-earth-200' },
    retreat: { icon: 'mdi:meditation', color: 'spiritual-blue-700', bgColor: 'bg-spiritual-blue-50', borderColor: 'border-spiritual-blue-200' },
    conference: { icon: 'mdi:account-group', color: 'spiritual-earth-600', bgColor: 'bg-spiritual-earth-50', borderColor: 'border-spiritual-earth-200' },
    other: { icon: 'mdi:calendar-star', color: 'gray-500', bgColor: 'bg-gray-50', borderColor: 'border-gray-200' }
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

  // Rich Text Rendering
  function renderRichText(blocks: any[]): string {
    if (!blocks || blocks.length === 0) return '';
    
    return blocks.map(block => {
      if (block._type === 'block') {
        return block.children?.map((child: any) => child.text).join('') || '';
      }
      return '';
    }).join('\n\n');
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

  // Wiederholungsmuster formatieren
  function getRecurrenceText(): string {
    if (!event.isRecurring || !event.recurrencePattern) return '';
    
    const pattern = event.recurrencePattern;
    const frequencies = {
      daily: 'täglich',
      weekly: 'wöchentlich',
      biweekly: 'zweiwöchentlich',
      monthly: 'monatlich',
      yearly: 'jährlich'
    };
    
    let text = frequencies[pattern.frequency as keyof typeof frequencies] || pattern.frequency;
    
    if (pattern.interval && pattern.interval > 1) {
      text = `alle ${pattern.interval} ${text.replace('lich', '')}`;
    }
    
    if (pattern.daysOfWeek && pattern.daysOfWeek.length > 0) {
      const dayNames = {
        monday: 'Montag',
        tuesday: 'Dienstag',
        wednesday: 'Mittwoch',
        thursday: 'Donnerstag',
        friday: 'Freitag',
        saturday: 'Samstag',
        sunday: 'Sonntag'
      };
      
      const days = pattern.daysOfWeek.map(day => dayNames[day as keyof typeof dayNames]).join(', ');
      text += ` (${days})`;
    }
    
    return text;
  }

  // Social Sharing
  function shareEvent(platform: string) {
    const url = $page.url.href;
    const title = `${event.title} - ISKCON Deutschland`;
    const text = event.description || `${event.title} am ${formatEventDate(event.startDate)}`;
    
    const urls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title}\n${text}\n${url}`)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\nMehr Informationen: ${url}`)}`
    };
    
    if (urls[platform as keyof typeof urls]) {
      window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
    }
  }

  // Kalender-Export (ICS)
  function downloadCalendarEvent() {
    const start = new Date(event.startDate);
    const end = event.endDate ? new Date(event.endDate) : new Date(start.getTime() + 2 * 60 * 60 * 1000); // 2h default
    
    const formatDate = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const location = getLocationInfo();
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ISKCON Deutschland//Event Calendar//DE
BEGIN:VEVENT
UID:${event._id}@iskcon.de
DTSTART:${formatDate(start)}
DTEND:${formatDate(end)}
SUMMARY:${event.title}
DESCRIPTION:${event.description || ''}
LOCATION:${location.name}${location.details ? ', ' + location.details : ''}
URL:${$page.url.href}
END:VEVENT
END:VCALENDAR`;
    
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.slug.replace(/[^a-z0-9]/gi, '-')}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Copy Event Link
  async function copyEventLink() {
    try {
      await navigator.clipboard.writeText($page.url.href);
      // TODO: Show toast notification
      console.log('Link copied to clipboard');
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  }

  // Registration Handler
  function handleRegistration() {
    if (event.registration?.registrationLink) {
      window.open(event.registration.registrationLink, '_blank');
    } else {
      // Fallback: Show contact information or general contact form
      console.log('No registration link available');
    }
  }

  onMount(() => {
    visible = true;
  });
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <meta name="description" content={data.meta.description} />
  <meta name="keywords" content={data.meta.keywords.join(', ')} />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="event" />
  <meta property="og:title" content={event.title} />
  <meta property="og:description" content={event.description || data.meta.description} />
  {#if event.featuredImage}
    <meta property="og:image" content={event.featuredImage.asset.url} />
  {/if}
  <meta property="og:url" content={$page.url.href} />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={event.title} />
  <meta name="twitter:description" content={event.description || data.meta.description} />
  {#if event.featuredImage}
    <meta name="twitter:image" content={event.featuredImage.asset.url} />
  {/if}
  
  <!-- Event-specific structured data -->
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      "name": event.title,
      "description": event.description,
      "startDate": event.startDate,
      "endDate": event.endDate,
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": event.location.type === 'online' 
        ? "https://schema.org/OnlineEventAttendanceMode"
        : "https://schema.org/OfflineEventAttendanceMode",
      "location": event.location.type === 'online' 
        ? {
            "@type": "VirtualLocation",
            "url": event.location.onlineLink
          }
        : event.location.type === 'temple' && event.location.temple
        ? {
            "@type": "Place",
            "name": event.location.temple.name,
            "address": event.location.temple.address
          }
        : {
            "@type": "Place",
            "name": event.location.externalVenue?.name,
            "address": event.location.externalVenue?.address
          },
      "organizer": event.organizer ? {
        "@type": "Organization",
        "name": event.organizer.name,
        "email": event.organizer.email,
        "telephone": event.organizer.phone
      } : {
        "@type": "Organization",
        "name": "ISKCON Deutschland"
      },
      "offers": event.registration?.cost?.amount ? {
        "@type": "Offer",
        "price": event.registration.cost.amount,
        "priceCurrency": event.registration.cost.currency || "EUR",
        "availability": "https://schema.org/InStock",
        "url": $page.url.href
      } : {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "url": $page.url.href
      }
    })}
  </script>
</svelte:head>

{#if !visible}
  <!-- Loading State -->
  <main class="min-h-screen bg-gradient-to-br from-spiritual-saffron-50/30 via-background to-spiritual-blue-50/20 flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-spiritual-saffron-500 mx-auto mb-4"></div>
      <p class="text-muted-foreground">Event wird geladen...</p>
    </div>
  </main>
{:else}
  <main class="min-h-screen bg-gradient-to-br from-spiritual-saffron-50/30 via-background to-spiritual-blue-50/20">
    <!-- Breadcrumb Navigation -->
    <div class="bg-white border-b border-border">
      <div class="container mx-auto px-4 py-4">
        <nav class="flex items-center space-x-2 text-sm text-muted-foreground" in:fade={{ delay: 100 }}>
          <a href="/" class="hover:text-foreground transition-colors">Home</a>
          <Icon icon="mdi:chevron-right" class="w-4 h-4" />
          <a href="/events" class="hover:text-foreground transition-colors">Events</a>
          <Icon icon="mdi:chevron-right" class="w-4 h-4" />
          <span class="text-foreground font-medium truncate">{event.title}</span>
        </nav>
      </div>
    </div>

    <!-- Hero Section -->
    <section class="relative overflow-hidden" in:fade={{ duration: 800 }}>
      {#if event.featuredImage}
        <div class="relative h-[60vh] lg:h-[70vh]">
          <SanityImage
            src={event.featuredImage}
            alt={event.title}
            width={1200}
            height={600}
            className="w-full h-full object-cover"
          />
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
        </div>
      {:else}
        <div class="h-[40vh] bg-spiritual-earth-200 flex items-center justify-center">
          <Icon icon="mdi:calendar-heart" class="text-spiritual-earth-400 text-8xl" />
        </div>
      {/if}
      
      <!-- Hero Content -->
      <div class="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
        <div class="container mx-auto">
          <div class="max-w-4xl">
            <!-- Event Badges -->
            <div class="flex flex-wrap items-center gap-3 mb-6" in:fly={{ y: 30, delay: 200 }}>
              <!-- Event Type Badge -->
              <Badge class="px-4 py-2 {typeConfig.bgColor} {typeConfig.borderColor} border text-{typeConfig.color} font-medium shadow-sm bg-opacity-90">
                <Icon icon={typeConfig.icon} class="w-4 h-4 mr-2" />
                {getEventTypeLabel(event.eventType || '')}
              </Badge>
              
              <!-- Featured Badge -->
              {#if event.isFeatured}
                <Badge class="px-3 py-2 bg-spiritual-gold-500/90 text-white font-medium shadow-sm">
                  <Icon icon="mdi:star" class="w-4 h-4 mr-1" />
                  Hervorgehoben
                </Badge>
              {/if}
              
              <!-- Recurring Badge -->
              {#if event.isRecurring}
                <Badge class="px-3 py-2 bg-spiritual-blue-500/90 text-white font-medium shadow-sm">
                  <Icon icon="mdi:repeat" class="w-4 h-4 mr-1" />
                  Wiederkehrend
                </Badge>
              {/if}
            </div>
            
            <!-- Event Title -->
            <h1 class="text-4xl lg:text-6xl font-medium mb-4 text-white drop-shadow-lg" in:fly={{ y: 30, delay: 300 }}>
              {event.title}
            </h1>
            
            <!-- Event Description -->
            {#if event.description}
              <p class="text-xl lg:text-2xl text-white/90 max-w-3xl drop-shadow leading-relaxed" in:fly={{ y: 30, delay: 400 }}>
                {event.description}
              </p>
            {/if}
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-12 lg:py-20">
      <div class="container mx-auto px-4">
        <div class="grid lg:grid-cols-3 gap-12">
          <!-- Main Content Column -->
          <div class="lg:col-span-2 space-y-12">
            <!-- Event Details -->
            <div in:fly={{ y: 30, delay: 500 }}>
              <Card.Root class="overflow-hidden">
              <Card.Header>
                <Card.Title class="text-2xl font-medium text-gray-900 flex items-center gap-3">
                  <Icon icon="mdi:information" class="w-6 h-6 text-spiritual-saffron-500" />
                  Veranstaltungsdetails
                </Card.Title>
              </Card.Header>
              <Card.Content class="space-y-6">
                <div class="grid md:grid-cols-2 gap-6">
                  <!-- Datum & Zeit -->
                  <div class="flex items-start gap-4 p-4 bg-spiritual-blue-50 rounded-lg">
                    <Icon icon="mdi:calendar-clock" class="w-6 h-6 text-spiritual-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 class="font-medium text-gray-900 mb-2">Datum & Zeit</h3>
                      <time class="text-spiritual-blue-700" datetime={event.startDate}>
                        {formatEventDate(event.startDate, event.endDate)}
                      </time>
                      {#if getEventDuration()}
                        <p class="text-sm text-spiritual-blue-600 mt-1">Dauer: {getEventDuration()}</p>
                      {/if}
                    </div>
                  </div>
                  
                  <!-- Wiederholung -->
                  {#if event.isRecurring && getRecurrenceText()}
                    <div class="flex items-start gap-4 p-4 bg-spiritual-saffron-50 rounded-lg">
                      <Icon icon="mdi:repeat" class="w-6 h-6 text-spiritual-saffron-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 class="font-medium text-spiritual-saffron-900 mb-2">Wiederholung</h3>
                        <p class="text-spiritual-saffron-700">{getRecurrenceText()}</p>
                      </div>
                    </div>
                  {/if}
                </div>
              </Card.Content>
              </Card.Root>
            </div>
            
            <!-- Detaillierte Beschreibung -->
            {#if event.longDescription && event.longDescription.length > 0}
              <div in:fly={{ y: 30, delay: 600 }}>
                <Card.Root>
                <Card.Header>
                  <Card.Title class="text-2xl font-medium text-gray-900 flex items-center gap-3">
                    <Icon icon="mdi:text" class="w-6 h-6 text-spiritual-saffron-500" />
                    Beschreibung
                  </Card.Title>
                </Card.Header>
                <Card.Content>
                  <div class="prose prose-lg max-w-none">
                    <div class="text-gray-700 leading-relaxed whitespace-pre-line">
                      {renderRichText(event.longDescription)}
                    </div>
                  </div>
                </Card.Content>
                </Card.Root>
              </div>
            {/if}
            
            <!-- Veranstalter -->
            {#if event.organizer?.name}
              <div in:fly={{ y: 30, delay: 700 }}>
                <Card.Root>
                <Card.Header>
                  <Card.Title class="text-2xl font-medium text-gray-900 flex items-center gap-3">
                    <Icon icon="mdi:account" class="w-6 h-6 text-spiritual-saffron-500" />
                    Veranstalter
                  </Card.Title>
                </Card.Header>
                <Card.Content>
                  <div class="flex items-start gap-6">
                    {#if event.organizer.image}
                      <SanityImage
                        src={event.organizer.image}
                        alt={event.organizer.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    {:else}
                      <div class="w-20 h-20 bg-spiritual-blue-200 rounded-full flex items-center justify-center">
                        <Icon icon="mdi:account" class="text-3xl text-spiritual-blue-600" />
                      </div>
                    {/if}
                    
                    <div class="flex-1">
                      <h3 class="text-xl font-medium text-gray-900 mb-2">{event.organizer.name}</h3>
                      {#if event.organizer.bio}
                        <p class="text-gray-700 mb-4">{event.organizer.bio}</p>
                      {/if}
                      
                      <div class="flex flex-wrap gap-4 text-sm">
                        {#if event.organizer.email}
                          <a href="mailto:{event.organizer.email}" class="flex items-center gap-2 text-spiritual-blue-600 hover:text-spiritual-blue-800 transition-colors">
                            <Icon icon="mdi:email" class="w-4 h-4" />
                            E-Mail
                          </a>
                        {/if}
                        {#if event.organizer.phone}
                          <a href="tel:{event.organizer.phone}" class="flex items-center gap-2 text-spiritual-blue-600 hover:text-spiritual-blue-800 transition-colors">
                            <Icon icon="mdi:phone" class="w-4 h-4" />
                            Telefon
                          </a>
                        {/if}
                      </div>
                    </div>
                  </div>
                </Card.Content>
                </Card.Root>
              </div>
            {/if}
          </div>
          
          <!-- Sidebar -->
          <div class="space-y-8">
            <!-- CTA Section -->
            <div class="sticky top-6" in:fly={{ x: 30, delay: 800 }}>
              {#if event.registration?.required}
                <Card.Root class="bg-spiritual-saffron-50 border-spiritual-saffron-200">
                  <Card.Header>
                    <Card.Title class="text-xl font-medium text-spiritual-saffron-900 flex items-center gap-2">
                      <Icon icon="mdi:account-plus" class="w-5 h-5" />
                      Anmeldung
                    </Card.Title>
                  </Card.Header>
                  <Card.Content class="space-y-4">
                    <!-- Kosten -->
                    <div class="flex justify-between items-center">
                      <span class="text-spiritual-saffron-700">Kosten:</span>
                      <span class="font-medium text-spiritual-saffron-900">{formatCost()}</span>
                    </div>
                    
                    <!-- Anmeldeschluss -->
                    {#if event.registration.deadline}
                      <div class="flex justify-between items-center">
                        <span class="text-spiritual-saffron-700">Anmeldeschluss:</span>
                        <span class="font-medium text-spiritual-saffron-900">
                          {new Date(event.registration.deadline).toLocaleDateString('de-DE')}
                        </span>
                      </div>
                    {/if}
                    
                    <!-- Verfügbare Plätze -->
                    {#if event.registration.maxParticipants}
                      <div class="flex justify-between items-center">
                        <span class="text-spiritual-saffron-700">Plätze:</span>
                        <span class="font-medium text-spiritual-saffron-900">{event.registration.maxParticipants}</span>
                      </div>
                    {/if}
                    
                    <Separator />
                    
                    <Button
                      class="w-full bg-spiritual-saffron-500 hover:bg-spiritual-saffron-600 text-white"
                      onclick={handleRegistration}
                    >
                      <Icon icon="mdi:account-plus" class="w-4 h-4 mr-2" />
                      Jetzt anmelden
                    </Button>
                  </Card.Content>
                </Card.Root>
              {:else}
                <Card.Root class="bg-spiritual-blue-50 border-spiritual-blue-200">
                  <Card.Header>
                    <Card.Title class="text-xl font-medium text-gray-900 flex items-center gap-2">
                      <Icon icon="mdi:information" class="w-5 h-5" />
                      Teilnahme
                    </Card.Title>
                  </Card.Header>
                  <Card.Content>
                    <p class="text-spiritual-blue-700 mb-4">Keine Anmeldung erforderlich. Kommen Sie einfach vorbei!</p>
                    
                    <Button
                      class="w-full bg-spiritual-blue-500 hover:bg-spiritual-blue-600 text-white"
                      onclick={handleRegistration}
                    >
                      <Icon icon="mdi:information" class="w-4 h-4 mr-2" />
                      Mehr Informationen
                    </Button>
                  </Card.Content>
                </Card.Root>
              {/if}
              
              <!-- Veranstaltungsort -->
              {#if getLocationInfo().name}
                {@const location = getLocationInfo()}
                <Card.Root class="mt-6">
                  <Card.Header>
                    <Card.Title class="text-lg font-medium text-gray-900 flex items-center gap-2">
                      <Icon icon={location.icon} class="w-5 h-5 text-spiritual-saffron-600" />
                      Veranstaltungsort
                    </Card.Title>
                  </Card.Header>
                  <Card.Content class="space-y-3">
                    <p class="font-medium text-gray-900">{location.name}</p>
                    {#if location.details}
                      <p class="text-gray-700">{location.details}</p>
                    {/if}
                    
                    {#if location.url}
                      <Button
                        variant="outline"
                        class="w-full"
                        onclick={() => window.open(location.url, '_blank')}
                      >
                        <Icon icon="mdi:directions" class="w-4 h-4 mr-2" />
                        {event.location.type === 'online' ? 'Online teilnehmen' : 'Wegbeschreibung'}
                        <Icon icon="mdi:open-in-new" class="w-3 h-3 ml-2" />
                      </Button>
                    {/if}
                  </Card.Content>
                </Card.Root>
              {/if}
              
              <!-- Kalender & Sharing -->
              <Card.Root class="mt-6">
                <Card.Header>
                  <Card.Title class="text-lg font-medium text-gray-900 flex items-center gap-2">
                    <Icon icon="mdi:share" class="w-5 h-5 text-spiritual-saffron-600" />
                    Event teilen
                  </Card.Title>
                </Card.Header>
                <Card.Content class="space-y-3">
                  <!-- Kalender Export -->
                  <Button
                    variant="outline"
                    class="w-full"
                    onclick={downloadCalendarEvent}
                  >
                    <Icon icon="mdi:calendar-plus" class="w-4 h-4 mr-2" />
                    Zu Kalender hinzufügen
                  </Button>
                  
                  <!-- Copy Link -->
                  <Button
                    variant="outline"
                    class="w-full"
                    onclick={copyEventLink}
                  >
                    <Icon icon="mdi:link" class="w-4 h-4 mr-2" />
                    Link kopieren
                  </Button>
                  
                  <!-- Social Share Toggle -->
                  <Button
                    variant="outline"
                    class="w-full"
                    onclick={() => showShareOptions = !showShareOptions}
                  >
                    <Icon icon="mdi:share-variant" class="w-4 h-4 mr-2" />
                    In sozialen Medien teilen
                    <Icon icon={showShareOptions ? "mdi:chevron-up" : "mdi:chevron-down"} class="w-4 h-4 ml-2" />
                  </Button>
                  
                  <!-- Social Share Buttons -->
                  {#if showShareOptions}
                    <div class="grid grid-cols-2 gap-2 pt-2" in:fade>
                      <Button
                        size="sm"
                        class="bg-green-500 hover:bg-green-600 text-white"
                        onclick={() => shareEvent('whatsapp')}
                      >
                        <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-1" />
                        WhatsApp
                      </Button>
                      
                      <Button
                        size="sm"
                        class="bg-blue-600 hover:bg-blue-700 text-white"
                        onclick={() => shareEvent('facebook')}
                      >
                        <Icon icon="mdi:facebook" class="w-4 h-4 mr-1" />
                        Facebook
                      </Button>
                      
                      <Button
                        size="sm"
                        class="bg-sky-500 hover:bg-sky-600 text-white"
                        onclick={() => shareEvent('twitter')}
                      >
                        <Icon icon="mdi:twitter" class="w-4 h-4 mr-1" />
                        Twitter
                      </Button>
                      
                      <Button
                        size="sm"
                        class="bg-gray-600 hover:bg-gray-700 text-white"
                        onclick={() => shareEvent('email')}
                      >
                        <Icon icon="mdi:email" class="w-4 h-4 mr-1" />
                        E-Mail
                      </Button>
                    </div>
                  {/if}
                </Card.Content>
              </Card.Root>
              
              <!-- Tags -->
              {#if event.tags && event.tags.length > 0}
                <Card.Root class="mt-6">
                  <Card.Header>
                    <Card.Title class="text-lg font-medium text-gray-900 flex items-center gap-2">
                      <Icon icon="mdi:tag" class="w-5 h-5 text-spiritual-saffron-600" />
                      Tags
                    </Card.Title>
                  </Card.Header>
                  <Card.Content>
                    <div class="flex flex-wrap gap-2">
                      {#each event.tags as tag}
                        <Badge variant="secondary" class="px-3 py-1 bg-spiritual-earth-100 text-spiritual-earth-700">
                          #{tag}
                        </Badge>
                      {/each}
                    </div>
                  </Card.Content>
                </Card.Root>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
{/if}

<style>
  /* Spirituelle Typography-Verbesserungen */
  .font-spiritual {
    font-family: 'Crimson Text', serif;
    letter-spacing: -0.01em;
  }
  
  /* Smooth transitions für alle interaktiven Elemente */
  button, a {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
  }
</style>