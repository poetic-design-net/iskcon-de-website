<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import EventCalendar from '$lib/components/sections/EventCalendar.svelte';
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import Icon from '@iconify/svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  
  let visible = false;

  onMount(() => {
    visible = true;
  });
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <meta name="description" content={data.meta.description} />
  <meta name="keywords" content={data.meta.keywords.join(', ')} />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content={data.meta.title} />
  <meta property="og:description" content={data.meta.description} />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content={data.meta.title} />
  <meta name="twitter:description" content={data.meta.description} />
</svelte:head>

{#if visible}
  <main class="min-h-screen bg-gradient-to-br from-spiritual-saffron-50/30 via-background to-spiritual-blue-50/20">
    <!-- Hero Section -->
    <section class="relative py-20 lg:py-32 px-4 bg-gradient-to-r from-spiritual-blue-900 via-spiritual-saffron-800 to-spiritual-gold-700 text-white overflow-hidden" in:fade={{ duration: 800 }}>
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0); background-size: 40px 40px;"></div>
      </div>
      
      <div class="container mx-auto text-center relative z-10">
        <div in:fly={{ y: 30, duration: 800, delay: 200 }}>
          <div class="flex items-center justify-center gap-4 mb-6">
            <Icon icon="mdi:calendar-heart" class="w-16 h-16 text-spiritual-gold-300" />
            <h1 class="text-5xl lg:text-7xl font-medium">
              Veranstaltungen
            </h1>
          </div>
          
          <p class="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Entdecken Sie unsere spirituellen Events, Festivals und Veranstaltungen. 
            Erleben Sie die Kraft der Gemeinschaft und spirituellen Praxis.
          </p>
          
          <div class="flex flex-wrap items-center justify-center gap-6 text-lg">
            <div class="flex items-center gap-2">
              <Icon icon="mdi:calendar-multiple" class="w-6 h-6 text-spiritual-gold-300" />
              <span>{data.events.length} kommende Events</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon icon="mdi:star" class="w-6 h-6 text-spiritual-gold-300" />
              <span>{data.featuredEvents.length} hervorgehobene Events</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-12 lg:py-20">
      <div class="container mx-auto px-4">
        <!-- Event Calendar Component -->
        <div in:fade={{ delay: 400 }}>
          <EventCalendar
            events={data.events}
            eventCategories={data.eventCategories}
            title="Alle Veranstaltungen"
            subtitle="Nutzen Sie die Filter und Ansichten, um Events zu finden, die Sie interessieren"
          />
        </div>
        
        <!-- Additional Information -->
        <div class="mt-20 grid lg:grid-cols-3 gap-8" in:fade={{ delay: 600 }}>
          <!-- Event Guidelines -->
          <Card.Root class="p-8 hover:shadow-lg transition-shadow">
            <div class="text-center mb-6">
              <Icon icon="mdi:information" class="w-12 h-12 text-spiritual-blue-500 mx-auto mb-4" />
              <Card.Title class="text-xl font-medium text-gray-900">
                Event-Informationen
              </Card.Title>
            </div>
            <Card.Content class="space-y-4 text-gray-700">
              <p>
                Alle unsere Events sind offen für Menschen jeden Hintergrunds. 
                Keine Vorerfahrung mit vedischer Spiritualität erforderlich.
              </p>
              <ul class="space-y-2 text-sm">
                <li class="flex items-center gap-2">
                  <Icon icon="mdi:check" class="w-4 h-4 text-spiritual-saffron-500" />
                  Kostenlose Teilnahme (sofern nicht anders angegeben)
                </li>
                <li class="flex items-center gap-2">
                  <Icon icon="mdi:check" class="w-4 h-4 text-spiritual-saffron-500" />
                  Familienfreundliche Atmosphäre
                </li>
                <li class="flex items-center gap-2">
                  <Icon icon="mdi:check" class="w-4 h-4 text-spiritual-saffron-500" />
                  Vegetarisches Prasadam verfügbar
                </li>
              </ul>
            </Card.Content>
          </Card.Root>
          
          <!-- Contact Information -->
          <Card.Root class="p-8 hover:shadow-lg transition-shadow">
            <div class="text-center mb-6">
              <Icon icon="mdi:account-group" class="w-12 h-12 text-spiritual-saffron-500 mx-auto mb-4" />
              <Card.Title class="text-xl font-medium text-spiritual-saffron-900">
                Kontakt & Fragen
              </Card.Title>
            </div>
            <Card.Content class="space-y-4 text-gray-700">
              <p>
                Haben Sie Fragen zu unseren Veranstaltungen oder möchten Sie 
                mehr über ISKCON erfahren?
              </p>
              <div class="space-y-3">
                <a 
                  href="mailto:info@iskcon.de" 
                  class="flex items-center gap-2 text-spiritual-saffron-600 hover:text-spiritual-saffron-800 transition-colors"
                >
                  <Icon icon="mdi:email" class="w-4 h-4" />
                  info@iskcon.de
                </a>
                <a 
                  href="tel:+49123456789" 
                  class="flex items-center gap-2 text-spiritual-saffron-600 hover:text-spiritual-saffron-800 transition-colors"
                >
                  <Icon icon="mdi:phone" class="w-4 h-4" />
                  +49 (0) 123 456 789
                </a>
              </div>
            </Card.Content>
          </Card.Root>
          
          <!-- Newsletter Signup -->
          <Card.Root class="p-8 hover:shadow-lg transition-shadow bg-spiritual-gold-50 border-spiritual-gold-200">
            <div class="text-center mb-6">
              <Icon icon="mdi:email-newsletter" class="w-12 h-12 text-spiritual-gold-600 mx-auto mb-4" />
              <Card.Title class="text-xl font-medium text-spiritual-gold-900">
                Event-Newsletter
              </Card.Title>
            </div>
            <Card.Content class="space-y-4">
              <p class="text-spiritual-gold-800 text-center">
                Verpassen Sie keine Veranstaltung! Abonnieren Sie unseren Newsletter 
                für aktuelle Event-Informationen.
              </p>
              <Button class="w-full bg-spiritual-gold-600 hover:bg-spiritual-gold-700 text-white">
                <Icon icon="mdi:email-plus" class="w-4 h-4 mr-2" />
                Newsletter abonnieren
              </Button>
            </Card.Content>
          </Card.Root>
        </div>
        
        <!-- Dynamische Event-Kategorien -->
        {#if data.eventCategories.length > 0}
          <div class="mt-20" in:fade={{ delay: 800 }}>
            <div class="text-center mb-12">
              <h2 class="text-3xl lg:text-4xl font-spiritual font-medium text-foreground mb-4">
                Arten von Veranstaltungen
              </h2>
              <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
                Lernen Sie die verschiedenen Arten von spirituellen Events kennen, die wir anbieten
              </p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {#each data.eventCategories as category}
                <Card.Root class="p-6 hover:shadow-lg transition-shadow group">
                  <div class="flex items-start gap-4">
                    <div class="p-3 bg-{category.color}-100 rounded-lg group-hover:bg-{category.color}-200 transition-colors">
                      <Icon icon={category.icon} class="w-6 h-6 text-{category.color}-600" />
                    </div>
                    <div>
                      <h3 class="font-medium text-lg mb-2 text-{category.color}-900">{category.title}</h3>
                      <p class="text-gray-600 text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Card.Root>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </section>
  </main>
{/if}

<style>
  /* Typography-Verbesserungen - erstmal normale Schriftarten */
  
  /* Smooth transitions für alle interaktiven Elemente */
  button, a {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
  }
</style>