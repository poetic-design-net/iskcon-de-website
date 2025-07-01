<script context="module" lang="ts">
  import type { TempleLocation } from '$lib/types';
  
  export interface Location {
    id: string;
    name: string;
    x: number; // SVG X-Koordinate
    y: number; // SVG Y-Koordinate
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { templesToLocations } from '$lib/utils/coordinates';
  import type { SanityTemple } from '$lib/types';
  
  // shadcn-svelte Komponenten
  import * as Dialog from '$lib/components/ui/dialog';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import * as Card from '$lib/components/ui/card';
  import { Separator } from '$lib/components/ui/separator';
  
  // Iconify Icons
  import Icon from '@iconify/svelte';
  
  // Props - Vollständige Temple-Daten
  export let temples: SanityTemple[] = [];
  
  // Konvertiere Temple-Daten zu Location-Daten für die Karte
  $: locations = templesToLocations(temples.map(temple => ({
    _id: temple._id,
    name: temple.name,
    slug: temple.slug,
    location: temple.location,
    isActive: temple.isActive,
    featuredOnHomepage: temple.featuredOnHomepage
  })));

  // State
  let svgContent: string | null = null;
  let dialogOpen = false;
  let activeTemple: SanityTemple | null = null;

  onMount(async () => {
    if (browser) {
      try {
        const response = await fetch('/img/germany.svg');
        if (response.ok) {
          const text = await response.text();
          const svgMatch = text.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
          if (svgMatch && svgMatch[1]) {
            svgContent = svgMatch[1];
          }
        }
      } catch (error) {
        console.error('Error fetching SVG:', error);
      }
    }
  });

  function handleLocationClick(location: TempleLocation) {
    const temple = temples.find(t => t._id === location.id || t.slug === location.slug);
    if (temple) {
      activeTemple = temple;
      dialogOpen = true;
    }
  }

  function formatTime(time: string | undefined): string {
    if (!time) return '';
    return time.replace(/:/g, ':');
  }

  function formatDay(day: string): string {
    const days = {
      'monday': 'Montag',
      'tuesday': 'Dienstag', 
      'wednesday': 'Mittwoch',
      'thursday': 'Donnerstag',
      'friday': 'Freitag',
      'saturday': 'Samstag',
      'sunday': 'Sonntag'
    };
    return days[day as keyof typeof days] || day;
  }

  function formatFacility(facility: string): string {
    const facilities = {
      'parking': 'Parkplatz',
      'restaurant': 'Restaurant',
      'library': 'Bibliothek',
      'bookstore': 'Buchhandlung',
      'guesthouse': 'Gästehaus',
      'accessible': 'Barrierefrei',
      'children_program': 'Kinderprogramm'
    };
    return facilities[facility as keyof typeof facilities] || facility;
  }

  function getFacilityIcon(facility: string): string {
    const icons = {
      'parking': '🚗',
      'restaurant': '🍽️', 
      'library': '📚',
      'bookstore': '📖',
      'guesthouse': '🏠',
      'accessible': '♿',
      'children_program': '👶'
    };
    return icons[facility as keyof typeof icons] || '🏛️';
  }
</script>

<!-- Karten Container -->
<div class="relative w-full max-w-2xl mx-auto my-8">
  <svg
    viewBox="0 0 585.5 792.7"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    aria-labelledby="mapTitle"
    role="img"
    class="block w-full h-auto germany-map"
  >
    <title id="mapTitle">Karte von Deutschland mit ISKCON Tempeln</title>
    {#if svgContent}
      {@html svgContent}
      
      {#each locations as location}
        <!-- Tempel Marker - Elegantere shadcn-Styling -->
        <circle
          cx={location.x}
          cy={location.y}
          r="8"
          class="fill-spiritual-saffron-500 stroke-white stroke-2 cursor-pointer transition-all duration-300 hover:fill-spiritual-saffron-600 hover:r-10 focus:outline-none focus:ring-2 focus:ring-spiritual-saffron-300 drop-shadow-lg hover:drop-shadow-xl"
          on:click={() => handleLocationClick(location)}
          on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleLocationClick(location); }}
          aria-label={`Tempel: ${location.name}`}
          role="button"
          tabindex="0"
        />
        
        <!-- Tempel Label -->
        <text
          x={location.x}
          y={location.y - 16}
          text-anchor="middle"
          class="text-xs font-medium fill-slate-700 pointer-events-none select-none"
          style="text-shadow: 0 0 3px rgba(255,255,255,0.9);"
        >
          {location.name.replace('ISKCON ', '')}
        </text>
      {/each}
    {:else}
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" class="text-base fill-muted-foreground">
        Karte wird geladen...
      </text>
    {/if}
  </svg>
</div>

<!-- shadcn-svelte Dialog -->
<Dialog.Root bind:open={dialogOpen}>
  <Dialog.Content class="max-w-2xl max-h-[90vh] flex flex-col">
    <Dialog.Header class="flex-shrink-0">
      <div class="flex items-center gap-3">
        <div class="text-2xl">🏛️</div>
        <div class="flex-1">
          <Dialog.Title class="text-xl font-medium text-foreground">
            {activeTemple?.name || ''}
          </Dialog.Title>
          {#if activeTemple?.address}
            <div class="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <Icon icon="mdi:map-marker" class="w-3 h-3" />
              {activeTemple.address.city}{#if activeTemple.address.state}, {activeTemple.address.state}{/if}
            </div>
          {/if}
        </div>
      </div>
    </Dialog.Header>

    <!-- Scrollable Content -->
    <div class="flex-1 overflow-y-auto space-y-6 py-4">
      
      <!-- Beschreibung -->
      {#if activeTemple?.description}
        <div>
          <h3 class="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            📖 Über diesen Tempel
          </h3>
          <p class="text-sm text-muted-foreground leading-relaxed">{activeTemple.description}</p>
        </div>
      {/if}

      <!-- Adresse & Kontakt Card -->
      {#if activeTemple?.address}
        <Card.Root>
          <Card.Header>
            <Card.Title class="text-base flex items-center gap-2">
              <Icon icon="mdi:map-marker" class="w-4 h-4" />
              Adresse & Kontakt
            </Card.Title>
          </Card.Header>
          <Card.Content class="space-y-4">
            <div>
              <div class="text-sm font-medium mb-1">🏠 Adresse</div>
              <div class="text-sm text-muted-foreground">
                {activeTemple.address.street}<br>
                {activeTemple.address.postalCode} {activeTemple.address.city}
                {#if activeTemple.address.state}, {activeTemple.address.state}{/if}
              </div>
            </div>
            
            {#if activeTemple.contact}
              {#if activeTemple.contact.phone}
                <div>
                  <div class="text-sm font-medium mb-1 flex items-center gap-2">
                    <Icon icon="mdi:phone" class="w-3 h-3" />
                    Telefon
                  </div>
                  <Button variant="link" class="h-auto p-0 text-sm" href="tel:{activeTemple.contact.phone}">
                    {activeTemple.contact.phone}
                  </Button>
                </div>
              {/if}
              
              {#if activeTemple.contact.email}
                <div>
                  <div class="text-sm font-medium mb-1 flex items-center gap-2">
                    <Icon icon="mdi:email" class="w-3 h-3" />
                    E-Mail
                  </div>
                  <Button variant="link" class="h-auto p-0 text-sm" href="mailto:{activeTemple.contact.email}">
                    {activeTemple.contact.email}
                  </Button>
                </div>
              {/if}
              
              {#if activeTemple.contact.website}
                <div>
                  <div class="text-sm font-medium mb-1 flex items-center gap-2">
                    <Icon icon="mdi:web" class="w-3 h-3" />
                    Website
                  </div>
                  <Button variant="link" class="h-auto p-0 text-sm" href={activeTemple.contact.website} target="_blank">
                    Zur Website →
                  </Button>
                </div>
              {/if}
            {/if}
          </Card.Content>
        </Card.Root>
      {/if}

      <!-- Öffnungszeiten -->
      {#if activeTemple?.serviceHours && activeTemple.serviceHours.length > 0}
        <Card.Root>
          <Card.Header>
            <Card.Title class="text-base flex items-center gap-2">
              <Icon icon="mdi:clock" class="w-4 h-4" />
              Öffnungszeiten
            </Card.Title>
          </Card.Header>
          <Card.Content>
            <div class="space-y-3">
              {#each activeTemple.serviceHours as hours}
                <div class="flex justify-between items-center py-2 px-3 bg-muted/50 rounded-md">
                  <span class="text-sm font-medium">{formatDay(hours.day)}</span>
                  <div>
                    {#if hours.isClosed}
                      <Badge variant="secondary" class="text-xs">Geschlossen</Badge>
                    {:else if hours.openTime && hours.closeTime}
                      <Badge variant="default" class="text-xs bg-spiritual-saffron-100 text-spiritual-saffron-800 border-spiritual-saffron-200">
                        {formatTime(hours.openTime)} - {formatTime(hours.closeTime)}
                      </Badge>
                    {:else}
                      <Badge variant="outline" class="text-xs">Nach Vereinbarung</Badge>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          </Card.Content>
        </Card.Root>
      {/if}

      <!-- Programme -->
      {#if activeTemple?.programs && activeTemple.programs.length > 0}
        <Card.Root>
          <Card.Header>
            <Card.Title class="text-base flex items-center gap-2">
              <Icon icon="mdi:calendar" class="w-4 h-4" />
              Programme & Aktivitäten
            </Card.Title>
          </Card.Header>
          <Card.Content>
            <div class="space-y-4">
              {#each activeTemple.programs as program, index}
                <div class="space-y-2">
                  {#if index > 0}<Separator />{/if}
                  <h4 class="text-sm font-medium flex items-center gap-2">
                    ✨ {program.title}
                  </h4>
                  {#if program.description}
                    <p class="text-xs text-muted-foreground leading-relaxed">{program.description}</p>
                  {/if}
                  <div class="flex flex-wrap gap-2">
                    {#if program.time}
                      <Badge variant="secondary" class="text-xs">
                        🕐 {formatTime(program.time)}
                      </Badge>
                    {/if}
                    {#if program.frequency}
                      <Badge variant="outline" class="text-xs">
                        📅 {program.frequency === 'daily' ? 'Täglich' : 
                             program.frequency === 'weekly' ? 'Wöchentlich' : 
                             program.frequency === 'monthly' ? 'Monatlich' : 
                             program.frequency === 'special' ? 'Besondere Anlässe' : program.frequency}
                      </Badge>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          </Card.Content>
        </Card.Root>
      {/if}

      <!-- Einrichtungen -->
      {#if activeTemple?.facilities && activeTemple.facilities.length > 0}
        <Card.Root>
          <Card.Header>
            <Card.Title class="text-base flex items-center gap-2">
              <Icon icon="mdi:building" class="w-4 h-4" />
              Einrichtungen
            </Card.Title>
          </Card.Header>
          <Card.Content>
            <div class="grid grid-cols-2 gap-2">
              {#each activeTemple.facilities as facility}
                <Badge variant="secondary" class="justify-start gap-2 py-2">
                  <span class="text-sm">{getFacilityIcon(facility)}</span>
                  <span class="text-xs">{formatFacility(facility)}</span>
                </Badge>
              {/each}
            </div>
          </Card.Content>
        </Card.Root>
      {/if}

      <!-- Tempelpräsident -->
      {#if activeTemple?.president && activeTemple.president.name}
        <Card.Root>
          <Card.Header>
            <Card.Title class="text-base flex items-center gap-2">
              <Icon icon="mdi:account-group" class="w-4 h-4" />
              Tempelpräsident
            </Card.Title>
          </Card.Header>
          <Card.Content>
            <div class="space-y-2">
              <h4 class="text-sm font-medium">🙏 {activeTemple.president.name}</h4>
              {#if activeTemple.president.bio}
                <p class="text-xs text-muted-foreground leading-relaxed">{activeTemple.president.bio}</p>
              {/if}
            </div>
          </Card.Content>
        </Card.Root>
      {/if}
    </div>

    <!-- Footer -->
    <Dialog.Footer class="flex-shrink-0">
      <Button variant="outline" on:click={() => dialogOpen = false}>
        Schließen
      </Button>
      <Button 
        class="bg-spiritual-saffron-500 hover:bg-spiritual-saffron-600 text-white"
        on:click={() => dialogOpen = false}
      >
        ✨ Besuchen Sie uns!
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<style>
  /* Deutschland Karte SVG Paths - Nur für die Karte, nicht global */
  :global(.germany-map path) {
    fill: hsl(var(--muted)) !important;
    stroke: hsl(var(--border)) !important;
    stroke-width: 0.5 !important;
    transition: fill 0.2s ease-in-out;
  }
  
  :global(.germany-map path:hover) {
    fill: hsl(var(--muted) / 0.8) !important;
  }
</style>