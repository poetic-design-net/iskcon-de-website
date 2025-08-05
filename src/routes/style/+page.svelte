<script lang="ts">
  import Icon from '@iconify/svelte';
  import { Button } from '$lib/components/ui/button';

  const stylePages = [
    {
      title: 'Farben',
      slug: 'colors',
      icon: 'mdi:palette',
      description: 'Farbpalette und Verwendungsrichtlinien',
      status: 'ready'
    },
    {
      title: 'Typografie',
      slug: 'typography',
      icon: 'mdi:format-text',
      description: 'Schriftarten, Größen und Hierarchie',
      status: 'ready'
    },
    {
      title: 'Buttons',
      slug: 'button',
      icon: 'mdi:button-cursor',
      description: 'Interaktive Button-Komponenten und Varianten',
      status: 'ready'
    },
    {
      title: 'Komponenten',
      slug: 'components',
      icon: 'mdi:view-dashboard',
      description: 'UI-Komponenten und ihre Verwendung',
      status: 'ready'
    },
    {
      title: 'Layout',
      slug: 'layout',
      icon: 'mdi:view-grid',
      description: 'Grid-System und Abstände',
      status: 'ready'
    },
    {
      title: 'Icons',
      slug: 'icons',
      icon: 'mdi:emoticon-happy',
      description: 'Icon-Bibliothek und Richtlinien',
      status: 'ready'
    },
    {
      title: 'Animationen',
      slug: 'animations',
      icon: 'mdi:animation',
      description: 'Bewegung und Übergänge',
      status: 'ready'
    },
    {
      title: 'Schatten',
      slug: 'shadows',
      icon: 'mdi:box-shadow',
      description: 'Elevation und Tiefeneffekte',
      status: 'ready'
    }
  ];
</script>

<svelte:head>
  <title>Corporate Design System - ISKCON Deutschland</title>
  <meta name="description" content="Das offizielle Design System für ISKCON Deutschland - Richtlinien, Komponenten und Best Practices" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
  <!-- Hero Section -->
  <section class="py-16 md:py-24 border-b border-gray-200">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto text-center">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-[#C6695D]/10 rounded-full mb-6">
          <Icon icon="mdi:palette-swatch" class="w-10 h-10 text-[#C6695D]" />
        </div>
        
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          ISKCON Corporate Design
        </h1>
        
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Das offizielle Design System für ISKCON Deutschland. Konsistente, moderne und spirituelle Gestaltung für alle digitalen Präsenzen.
        </p>

        <div class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
          <Icon icon="mdi:book-open-page-variant" class="w-4 h-4" />
          Version 1.0
        </div>
      </div>
    </div>
  </section>

  <!-- Key Principles -->
  <section class="py-12 bg-white">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl font-bold text-center mb-8">Design-Prinzipien</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:leaf" class="w-8 h-8 text-[#C6695D]" />
            </div>
            <h3 class="font-semibold mb-2">Elegant</h3>
            <p class="text-sm text-gray-600">Subtile, professionelle Gestaltung</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:om" class="w-8 h-8 text-[#C6695D]" />
            </div>
            <h3 class="font-semibold mb-2">Spirituell</h3>
            <p class="text-sm text-gray-600">Vedische Ästhetik modern interpretiert</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:devices" class="w-8 h-8 text-[#C6695D]" />
            </div>
            <h3 class="font-semibold mb-2">Responsiv</h3>
            <p class="text-sm text-gray-600">Optimiert für alle Endgeräte</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:account-group" class="w-8 h-8 text-[#C6695D]" />
            </div>
            <h3 class="font-semibold mb-2">Zugänglich</h3>
            <p class="text-sm text-gray-600">Barrierefreie Gestaltung für alle</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Style Pages Grid -->
  <section class="py-16">
    <div class="container mx-auto px-4">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12">Design-Komponenten</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each stylePages as page}
            <a 
              href={page.status === 'ready' ? `/style/${page.slug}` : '#'}
              class="relative group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden {page.status !== 'ready' ? 'cursor-not-allowed' : ''}"
              class:opacity-60={page.status !== 'ready'}
            >
              <div class="p-6 md:p-8">
                <!-- Status Badge -->
                {#if page.status === 'coming'}
                  <div class="absolute top-4 right-4">
                    <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Coming Soon</span>
                  </div>
                {/if}
                
                <!-- Icon -->
                <div class="w-16 h-16 bg-[#C6695D]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#C6695D]/20 transition-colors">
                  <Icon icon={page.icon} class="w-8 h-8 text-[#C6695D]" />
                </div>
                
                <!-- Content -->
                <h3 class="text-xl font-semibold mb-2 group-hover:text-[#C6695D] transition-colors">
                  {page.title}
                </h3>
                <p class="text-gray-600 text-sm">
                  {page.description}
                </p>
                
                {#if page.status === 'ready'}
                  <div class="mt-4 flex items-center text-[#C6695D] font-medium">
                    Entdecken
                    <Icon icon="mdi:arrow-right" class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                {/if}
              </div>
            </a>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- Quick Color Reference -->
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl font-bold text-center mb-8">Schnellreferenz Farben</h2>
        
        <div class="bg-white rounded-xl shadow-sm p-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="text-center">
              <div class="w-20 h-20 rounded-lg shadow-md mx-auto mb-2" style="background-color: #C6695D;"></div>
              <p class="text-sm font-medium">Primary</p>
              <p class="text-xs text-gray-500">#C6695D</p>
            </div>
            <div class="text-center">
              <div class="w-20 h-20 rounded-lg shadow-md mx-auto mb-2" style="background-color: #B85A4F;"></div>
              <p class="text-sm font-medium">Primary Dark</p>
              <p class="text-xs text-gray-500">#B85A4F</p>
            </div>
            <div class="text-center">
              <div class="w-20 h-20 rounded-lg shadow-md mx-auto mb-2 border" style="background-color: #FFFFFF;"></div>
              <p class="text-sm font-medium">Background</p>
              <p class="text-xs text-gray-500">#FFFFFF</p>
            </div>
            <div class="text-center">
              <div class="w-20 h-20 rounded-lg shadow-md mx-auto mb-2" style="background-color: #6B7280;"></div>
              <p class="text-sm font-medium">Text Gray</p>
              <p class="text-xs text-gray-500">#6B7280</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Download Section -->
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-2xl font-bold mb-4">Design-Assets</h2>
      <p class="text-gray-600 mb-8 max-w-2xl mx-auto">
        Laden Sie Logos, Icons und weitere Design-Ressourcen für Ihre ISKCON-Projekte herunter.
      </p>
      <Button variant="outline" size="lg" disabled>
        <Icon icon="mdi:download" class="w-5 h-5" />
        Download Design Kit (Coming Soon)
      </Button>
    </div>
  </section>
</div>