<script lang="ts">
  import type { PageData } from './$types';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import Icon from '@iconify/svelte';
  
  export let data: PageData;
  
  $: temples = data.temples;
  $: meta = data.meta;
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <!-- Header Section -->
  <div class="text-center mb-12">
    <div class="flex items-center justify-center gap-3 mb-4">
      <Icon icon="mdi:temple-hindu" class="w-8 h-8 text-spiritual-saffron-600" />
      <h1 class="text-4xl font-medium text-gray-900">{meta.title}</h1>
    </div>
    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
      {meta.description}
    </p>
  </div>

  <!-- Tempel Grid -->
  {#if temples.length > 0}
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each temples as temple}
        <Card class="group hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div class="flex items-center gap-3">
              <Icon icon="mdi:temple-hindu" class="w-6 h-6 text-spiritual-saffron-600" />
              <CardTitle class="group-hover:text-spiritual-saffron-700 transition-colors">
                {temple.name}
              </CardTitle>
            </div>
            <CardDescription>
              ISKCON {temple.address.city}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div class="space-y-3">
              <!-- Adresse -->
              <div class="flex items-start gap-2">
                <Icon icon="mdi:map-marker" class="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                <div class="text-sm text-gray-600">
                  <div>{temple.address.street}</div>
                  <div>{temple.address.postalCode} {temple.address.city}</div>
                </div>
              </div>

              <!-- Kontakt -->
              {#if temple.contact?.phone}
                <div class="flex items-center gap-2">
                  <Icon icon="mdi:phone" class="w-4 h-4 text-gray-500" />
                  <span class="text-sm text-gray-600">{temple.contact.phone}</span>
                </div>
              {/if}

              {#if temple.contact?.email}
                <div class="flex items-center gap-2">
                  <Icon icon="mdi:email" class="w-4 h-4 text-gray-500" />
                  <span class="text-sm text-gray-600">{temple.contact.email}</span>
                </div>
              {/if}

              <!-- Link zur Detailseite -->
              <div class="pt-3 border-t">
                <a 
                  href="/tempel/{temple.slug}" 
                  class="inline-flex items-center gap-2 text-spiritual-saffron-600 hover:text-spiritual-saffron-700 font-medium text-sm transition-colors"
                >
                  Mehr erfahren
                  <Icon icon="mdi:arrow-right" class="w-4 h-4" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
  {:else}
    <div class="text-center py-12">
      <Icon icon="mdi:temple-hindu" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 class="text-xl font-medium text-gray-600 mb-2">Keine Tempel gefunden</h3>
      <p class="text-gray-500">Derzeit sind keine Tempel verfügbar.</p>
    </div>
  {/if}
</div>