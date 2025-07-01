<script lang="ts">
  import { onMount } from 'svelte';
  import type { SanityEvent } from '$lib/types';
  
  // Dynamische Imports für bessere Fehlerbehandlung
  let EventModal: any = null;
  let isLoaded = false;
  let loadError: string | null = null;
  
  // Demo Event Data
  const demoEvent: SanityEvent = {
    _id: 'demo-event-1',
    _type: 'event',
    _createdAt: '2025-01-21T00:00:00Z',
    _updatedAt: '2025-01-21T00:00:00Z',
    _rev: '1',
    title: 'Bhagavad Gita Klasse',
    slug: 'bhagavad-gita-klasse-januar',
    description: 'Eine interaktive Klasse über die zeitlosen Weisheiten der Bhagavad Gita mit Diskussion und spiritueller Praxis.',
    longDescription: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Tauchen Sie ein in die zeitlosen Weisheiten der Bhagavad Gita in unserer wöchentlichen Klasse. Wir werden gemeinsam die tiefgreifenden Lehren Krishnas erforschen und deren Anwendung in unserem modernen Leben diskutieren.\n\nDie Klasse umfasst:\n- Rezitation von Sanskrit-Versen\n- Detaillierte Erklärungen und Kommentare\n- Interaktive Diskussionen\n- Praktische Anwendungen für den Alltag\n- Gemeinsame Meditation\n\nAlle sind willkommen, unabhängig von Vorerfahrung oder Kenntnisstand.',
            marks: []
          }
        ],
        markDefs: [],
        style: 'normal'
      }
    ],
    featuredImage: {
      asset: {
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80'
      }
    },
    eventType: 'gita_class',
    startDate: '2025-01-25T18:00:00Z',
    endDate: '2025-01-25T20:00:00Z',
    isRecurring: true,
    recurrencePattern: {
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: ['saturday'],
      endRecurrence: 'never'
    },
    location: {
      type: 'temple',
      temple: {
        _id: 'temple-berlin',
        _type: 'temple',
        _createdAt: '2025-01-21T00:00:00Z',
        _updatedAt: '2025-01-21T00:00:00Z',
        _rev: '1',
        name: 'ISKCON Berlin',
        slug: 'berlin',
        description: 'Der ISKCON Tempel in Berlin',
        mainImage: {
          asset: {
            url: 'https://images.unsplash.com/photo-1595183313593-1b7fbc95e9d5?auto=format&fit=crop&w=400&q=80'
          }
        },
        address: {
          street: 'Detmolder Str. 16',
          city: 'Berlin',
          postalCode: '10715',
          country: 'Deutschland'
        },
        location: {
          lat: 52.52,
          lng: 13.405
        },
        contact: {
          phone: '+49 30 859 661 80',
          email: 'info@iskcon-berlin.de',
          website: 'https://iskcon-berlin.de'
        }
      }
    },
    organizer: {
      name: 'H.G. Krishnananda Das',
      email: 'krishnananda@iskcon-berlin.de',
      bio: 'Krishnananda Das praktiziert Krishna-Bewusstsein seit über 15 Jahren und leitet regelmäßig Bhagavad Gita Klassen. Er ist bekannt für seine klaren Erklärungen und praxisnahen Anwendungen der vedischen Weisheit.',
      image: {
        asset: {
          url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
        }
      }
    },
    registration: {
      required: false
    },
    tags: ['Bhagavad Gita', 'Spiritualität', 'Meditation', 'Philosophie', 'Krishna'],
    isFeatured: true,
    isPublished: true
  };
  
  let isModalOpen = false;
  
  function openModal() {
    isModalOpen = true;
  }
  
  function closeModal() {
    isModalOpen = false;
  }
  
  function handleRegister(event: CustomEvent) {
    console.log('Registration event:', event.detail);
    alert('Anmeldung für: ' + event.detail.event.title);
  }
  
  // Client-Side Loading für EventModal
  onMount(async () => {
    try {
      console.log('🔍 Loading EventModal component...');
      const module = await import('$lib/components/sections/EventModal.svelte');
      EventModal = module.default;
      isLoaded = true;
      console.log('✅ EventModal erfolgreich geladen');
    } catch (error) {
      console.error('❌ EventModal Load-Fehler:', error);
      loadError = error instanceof Error ? error.message : 'Unbekannter Fehler';
    }
  });
</script>

<svelte:head>
  <title>EventModal Test - ISKCON Deutschland</title>
  <meta name="description" content="Test-Seite für die EventModal Komponente" />
</svelte:head>

<div class="min-h-screen bg-spiritual-earth-50 py-12">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-spiritual font-medium text-gray-900 mb-4">
        EventModal Test
      </h1>
      <p class="text-lg text-gray-600 mb-8">
        Demonstration der EventModal Komponente mit einem Demo-Event
      </p>
      
      <!-- Debug-Info -->
      {#if !isLoaded && !loadError}
        <div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
          🔄 Lade EventModal Komponente...
        </div>
      {/if}
      
      {#if loadError}
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          ❌ Fehler beim Laden: {loadError}
        </div>
      {/if}
      
      {#if isLoaded}
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          ✅ EventModal erfolgreich geladen
        </div>
        
        <button
          type="button"
          class="bg-spiritual-saffron-500 hover:bg-spiritual-saffron-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-spiritual-saffron-500 focus:ring-offset-2"
          on:click={openModal}
        >
          Event Modal öffnen
        </button>
      {/if}
    </div>
    
    <!-- Event Preview Card -->
    <div class="bg-white rounded-xl shadow-lg overflow-hidden max-w-md mx-auto">
      <div class="aspect-w-16 aspect-h-9">
        <img
          src={demoEvent.featuredImage.asset.url}
          alt={demoEvent.title}
          class="w-full h-48 object-cover"
        />
      </div>
      <div class="p-6">
        <h3 class="text-xl font-spiritual font-medium text-gray-900 mb-2">
          {demoEvent.title}
        </h3>
        <p class="text-gray-600 mb-4">
          {demoEvent.description}
        </p>
        <div class="flex items-center text-sm text-spiritual-blue-600 mb-4">
          <span>📅</span>
          <span class="ml-2">
            {new Date(demoEvent.startDate).toLocaleDateString('de-DE', {
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })}
          </span>
        </div>
        {#if isLoaded}
          <button
            type="button"
            class="w-full bg-spiritual-blue-500 hover:bg-spiritual-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            on:click={openModal}
          >
            Details anzeigen
          </button>
        {:else}
          <button
            type="button"
            class="w-full bg-gray-400 text-white font-medium py-2 px-4 rounded-lg cursor-not-allowed"
            disabled
          >
            Modal wird geladen...
          </button>
        {/if}
      </div>
    </div>
    
    <!-- Features List -->
    <div class="mt-12 bg-white rounded-xl shadow-lg p-8">
      <h2 class="text-2xl font-spiritual font-medium text-gray-900 mb-6">
        EventModal Features & Debug-Info
      </h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">🔧 Debug Status</h3>
          <ul class="space-y-2 text-gray-600">
            <li>Component Loaded: {isLoaded ? '✅' : '❌'}</li>
            <li>Load Error: {loadError || 'Kein Fehler'}</li>
            <li>Modal Open: {isModalOpen ? '✅' : '❌'}</li>
            <li>Demo Event: ✅ Verfügbar</li>
          </ul>
        </div>
        
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">🎨 Design Features</h3>
          <ul class="space-y-2 text-gray-600">
            <li>✅ Spirituelles Design mit saffron/blue/gold Farben</li>
            <li>✅ Responsive Layout (Mobile & Desktop)</li>
            <li>✅ Smooth Fade/Scale Animationen</li>
            <li>✅ Sanskrit Typography Support</li>
            <li>✅ Event-Type spezifische Icons & Farben</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- EventModal Komponente - nur wenn geladen -->
{#if isLoaded && EventModal}
  <svelte:component 
    this={EventModal}
    event={demoEvent}
    isOpen={isModalOpen}
    on:close={closeModal}
    on:register={handleRegister}
  />
{/if}

<style>
  /* Aspect ratio fallback für ältere Browser */
  .aspect-w-16 {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
  }
  
  .aspect-w-16 > * {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>