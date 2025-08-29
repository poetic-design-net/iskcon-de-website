<script context="module" lang="ts">
  import type { TempleLocation } from '$lib/types';
  
  export interface Location {
    id: string;
    name: string;
    x: number;
    y: number;
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { templesToLocations } from '$lib/utils/dach-coordinates';
  import type { SanityTemple } from '$lib/types';
  
  // shadcn-svelte Komponenten
  import * as Dialog from '$lib/components/ui/dialog';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs/index.js';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import * as Card from '$lib/components/ui/card';
  import { Separator } from '$lib/components/ui/separator';
  
  // Iconify Icons
  import Icon from '@iconify/svelte';
  
  // Props - Vollständige Temple-Daten
  export let temples: SanityTemple[] = [];
  
  // Konvertiere Temple-Daten zu Location-Daten für die Karte
  // Die neue dach-coordinates.ts filtert automatisch nach Land
  $: germanyLocations = templesToLocations(temples, 'germany');
  $: austriaLocations = templesToLocations(temples, 'austria');
  $: switzerlandLocations = templesToLocations(temples, 'switzerland');

  // State
  let germanySvg: string | null = null;
  let austriaSvg: string | null = null;
  let switzerlandSvg: string | null = null;
  let dialogOpen = false;
  let activeTemple: SanityTemple | null = null;
  let activeTab = "germany";

  onMount(async () => {
    if (browser) {
      // Lade alle SVGs parallel
      const loadSvg = async (filename: string) => {
        try {
          const response = await fetch(`/img/${filename}`);
          if (response.ok) {
            const text = await response.text();
            const svgMatch = text.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
            if (svgMatch && svgMatch[1]) {
              return svgMatch[1];
            }
          }
        } catch (error) {
          console.error(`Error fetching ${filename}:`, error);
        }
        return null;
      };
      
      const [germany, austria, switzerland] = await Promise.all([
        loadSvg('germany.svg'),
        loadSvg('austria.svg'),
        loadSvg('switzerland.svg')
      ]);
      
      germanySvg = germany;
      austriaSvg = austria;
      switzerlandSvg = switzerland;
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

<!-- DACH Karten Container mit Tabs -->
<div class="w-full max-w-4xl mx-auto my-8">
  <Tabs bind:value={activeTab} class="w-full">
    <TabsList class="grid w-full grid-cols-3 mb-6">
      <TabsTrigger value="germany" class="flex items-center justify-center gap-2">
        <span class="hidden sm:inline">🇩🇪</span>
        Deutschland
        {#if germanyLocations.length > 0}
          <Badge variant="secondary" class="ml-1">{germanyLocations.length}</Badge>
        {/if}
      </TabsTrigger>
      <TabsTrigger value="austria" class="flex items-center justify-center gap-2">
        <span class="hidden sm:inline">🇦🇹</span>
        Österreich
        {#if austriaLocations.length > 0}
          <Badge variant="secondary" class="ml-1">{austriaLocations.length}</Badge>
        {/if}
      </TabsTrigger>
      <TabsTrigger value="switzerland" class="flex items-center justify-center gap-2">
        <span class="hidden sm:inline">🇨🇭</span>
        Schweiz
        {#if switzerlandLocations.length > 0}
          <Badge variant="secondary" class="ml-1">{switzerlandLocations.length}</Badge>
        {/if}
      </TabsTrigger>
    </TabsList>
    
    <!-- Deutschland Tab -->
    <TabsContent value="germany" class="mt-0">
      <div class="relative w-full">
        <svg
          viewBox="0 0 585.5 792.7"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          aria-labelledby="germanyMapTitle"
          role="img"
          class="block w-full h-auto country-map"
        >
          <title id="germanyMapTitle">Karte von Deutschland mit ISKCON Tempeln</title>
          {#if germanySvg}
            {@html germanySvg}
            
            {#each germanyLocations as location}
              <circle
                cx={location.x}
                cy={location.y}
                r="8"
                class="fill-primary-500 stroke-white stroke-2 cursor-pointer transition-all duration-300 hover:fill-primary-600 hover:r-10 focus:outline-none focus:ring-2 focus:ring-primary-300 drop-shadow-lg hover:drop-shadow-xl"
                on:click={() => handleLocationClick(location)}
                on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleLocationClick(location); }}
                aria-label={`Tempel: ${location.name}`}
                role="button"
                tabindex="0"
              />
              
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
    </TabsContent>
    
    <!-- Österreich Tab -->
    <TabsContent value="austria" class="mt-0">
      <div class="relative w-full">
        <svg
          viewBox="0 0 612.93958 313.54865"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          aria-labelledby="austriaMapTitle"
          role="img"
          class="block w-full h-auto country-map"
        >
          <title id="austriaMapTitle">Karte von Österreich mit ISKCON Tempeln</title>
          {#if austriaSvg}
            {@html austriaSvg}
            
            {#each austriaLocations as location}
              <circle
                cx={location.x}
                cy={location.y}
                r="8"
                class="fill-primary-500 stroke-white stroke-2 cursor-pointer transition-all duration-300 hover:fill-primary-600 hover:r-10 focus:outline-none focus:ring-2 focus:ring-primary-300 drop-shadow-lg hover:drop-shadow-xl"
                on:click={() => handleLocationClick(location)}
                on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleLocationClick(location); }}
                aria-label={`Tempel: ${location.name}`}
                role="button"
                tabindex="0"
              />
              
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
    </TabsContent>
    
    <!-- Schweiz Tab -->
    <TabsContent value="switzerland" class="mt-0">
      <div class="relative w-full">
        <svg
          viewBox="0 0 1224.3984 783.07391"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          aria-labelledby="switzerlandMapTitle"
          role="img"
          class="block w-full h-auto country-map"
        >
          <title id="switzerlandMapTitle">Karte der Schweiz mit ISKCON Tempeln</title>
          {#if switzerlandSvg}
            {@html switzerlandSvg}
            
            {#each switzerlandLocations as location}
              <circle
                cx={location.x}
                cy={location.y}
                r="8"
                class="fill-primary-500 stroke-white stroke-2 cursor-pointer transition-all duration-300 hover:fill-primary-600 hover:r-10 focus:outline-none focus:ring-2 focus:ring-primary-300 drop-shadow-lg hover:drop-shadow-xl"
                on:click={() => handleLocationClick(location)}
                on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleLocationClick(location); }}
                aria-label={`Tempel: ${location.name}`}
                role="button"
                tabindex="0"
              />
              
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
    </TabsContent>
  </Tabs>
</div>

<!-- Dialog bleibt gleich wie in GermanyMap -->
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
                      <Badge variant="default" class="text-xs bg-primary-100 text-primary-800 border-primary-200">
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
      <button
        type="button"
        class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-3"
        on:click={() => dialogOpen = false}
      >
        Schließen
      </button>
      <button
        type="button"
        class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 bg-primary-500 hover:bg-primary-600 text-white"
        on:click={() => dialogOpen = false}
      >
        ✨ Besuchen Sie uns!
      </button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<style>
  /* Länderkarten SVG Paths - Nur für die Karten, nicht global */
  :global(.country-map path) {
    fill: hsl(var(--muted)) !important;
    stroke: hsl(var(--border)) !important;
    stroke-width: 0.5 !important;
    transition: fill 0.2s ease-in-out;
  }
  
  :global(.country-map path:hover) {
    fill: hsl(var(--muted) / 0.8) !important;
  }
</style>