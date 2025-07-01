<script lang="ts">
  import type { PageData } from './$types';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import Icon from '@iconify/svelte';
  import SanityImage from '$lib/components/global/SanityImage.svelte';
  
  export let data: PageData;
  
  $: temple = data.temple;
  $: meta = data.meta;
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <!-- Breadcrumb -->
  <nav class="mb-8">
    <ol class="flex items-center space-x-2 text-sm text-gray-500">
      <li><a href="/" class="hover:text-spiritual-saffron-600 transition-colors">Home</a></li>
      <li><Icon icon="mdi:chevron-right" class="w-4 h-4" /></li>
      <li><a href="/tempel" class="hover:text-spiritual-saffron-600 transition-colors">Tempel</a></li>
      <li><Icon icon="mdi:chevron-right" class="w-4 h-4" /></li>
      <li class="text-gray-900 font-medium">{temple.name}</li>
    </ol>
  </nav>

  <!-- Header -->
  <div class="mb-12">
    <div class="flex items-center gap-4 mb-6">
      <Icon icon="mdi:temple-hindu" class="w-10 h-10 text-spiritual-saffron-600" />
      <div>
        <h1 class="text-4xl font-medium text-gray-900 mb-2">{temple.name}</h1>
        <p class="text-xl text-gray-600">ISKCON {temple.address.city}</p>
      </div>
    </div>
    
    {#if temple.description}
      <p class="text-lg text-gray-700 max-w-4xl">
        {temple.description}
      </p>
    {/if}
  </div>

  <div class="grid gap-8 lg:grid-cols-3">
    <!-- Haupt-Content -->
    <div class="lg:col-span-2 space-y-8">
      <!-- Tempel-Bild -->
      {#if temple.mainImage}
        <div class="aspect-video rounded-lg overflow-hidden bg-gray-100">
          <SanityImage
            src={temple.mainImage}
            alt={temple.name}
            className="w-full h-full object-cover"
          />
        </div>
      {/if}

      <!-- Über den Tempel -->
      {#if temple.description}
        <Card>
          <CardHeader>
            <CardTitle>Über {temple.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="prose max-w-none">
              <p>{temple.description}</p>
            </div>
          </CardContent>
        </Card>
      {/if}

      <!-- Öffnungszeiten -->
      {#if temple.serviceHours}
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Icon icon="mdi:clock-outline" class="w-5 h-5 text-spiritual-saffron-600" />
              Gottesdienst-Zeiten
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-2 text-sm">
              {#each temple.serviceHours as hours}
                <div class="flex justify-between">
                  <span class="font-medium">{hours.day}</span>
                  <span>
                    {#if hours.isClosed}
                      Geschlossen
                    {:else if hours.openTime && hours.closeTime}
                      {hours.openTime} - {hours.closeTime}
                    {:else}
                      Nach Vereinbarung
                    {/if}
                  </span>
                </div>
              {/each}
            </div>
          </CardContent>
        </Card>
      {/if}
    </div>

    <!-- Sidebar -->
    <div class="space-y-6">
      <!-- Kontakt-Info -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Icon icon="mdi:contact-mail" class="w-5 h-5 text-spiritual-saffron-600" />
            Kontakt
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <!-- Adresse -->
          <div class="flex items-start gap-3">
            <Icon icon="mdi:map-marker" class="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
            <div class="text-sm">
              <div class="font-medium text-gray-900">{temple.address.street}</div>
              <div class="text-gray-600">{temple.address.postalCode} {temple.address.city}</div>
              {#if temple.address.country}
                <div class="text-gray-600">{temple.address.country}</div>
              {/if}
            </div>
          </div>

          <!-- Telefon -->
          {#if temple.contact?.phone}
            <div class="flex items-center gap-3">
              <Icon icon="mdi:phone" class="w-5 h-5 text-gray-500" />
              <a href="tel:{temple.contact.phone}" class="text-sm text-spiritual-saffron-600 hover:text-spiritual-saffron-700 transition-colors">
                {temple.contact.phone}
              </a>
            </div>
          {/if}

          <!-- E-Mail -->
          {#if temple.contact?.email}
            <div class="flex items-center gap-3">
              <Icon icon="mdi:email" class="w-5 h-5 text-gray-500" />
              <a href="mailto:{temple.contact.email}" class="text-sm text-spiritual-saffron-600 hover:text-spiritual-saffron-700 transition-colors">
                {temple.contact.email}
              </a>
            </div>
          {/if}

          <!-- Website -->
          {#if temple.contact?.website}
            <div class="flex items-center gap-3">
              <Icon icon="mdi:web" class="w-5 h-5 text-gray-500" />
              <a href={temple.contact.website} target="_blank" rel="noopener noreferrer" class="text-sm text-spiritual-saffron-600 hover:text-spiritual-saffron-700 transition-colors">
                Website besuchen
                <Icon icon="mdi:external-link" class="w-3 h-3 inline ml-1" />
              </a>
            </div>
          {/if}
        </CardContent>
      </Card>

      <!-- Navigation -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Icon icon="mdi:navigation" class="w-5 h-5 text-spiritual-saffron-600" />
            Anfahrt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <a 
            href="https://maps.google.com/?q={encodeURIComponent(`${temple.address.street}, ${temple.address.postalCode} ${temple.address.city}`)}"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-spiritual-saffron-600 hover:text-spiritual-saffron-700 font-medium text-sm transition-colors"
          >
            <Icon icon="mdi:google-maps" class="w-4 h-4" />
            In Google Maps öffnen
          </a>
        </CardContent>
      </Card>

      <!-- Zurück zur Übersicht -->
      <Card>
        <CardContent class="pt-6">
          <a 
            href="/tempel" 
            class="inline-flex items-center gap-2 text-spiritual-saffron-600 hover:text-spiritual-saffron-700 font-medium text-sm transition-colors"
          >
            <Icon icon="mdi:arrow-left" class="w-4 h-4" />
            Alle Tempel anzeigen
          </a>
        </CardContent>
      </Card>
    </div>
  </div>
</div>