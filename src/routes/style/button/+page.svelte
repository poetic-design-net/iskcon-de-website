<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  
  let visible = false;
  
  onMount(() => {
    visible = true;
  });
</script>

<svelte:head>
  <title>Button Komponenten - ISKCON Deutschland</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 py-12">
  <div class="container mx-auto px-4">
    {#if visible}
      <h1 class="text-4xl font-bold text-center mb-12" in:fade={{ duration: 600 }}>Button Komponenten</h1>
    {/if}
    
    <!-- Simplified Variants -->
    {#if visible}
      <section class="mb-16" in:fly={{ y: 20, duration: 600, delay: 100 }}>
        <h2 class="text-2xl font-semibold mb-6">Basis-Varianten</h2>
        <div class="flex flex-wrap gap-4">
          <Button variant="default">Standard</Button>
          <Button variant="premium">Premium</Button>
          <Button variant="soft">Soft</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>
    {/if}

    <!-- Simplified Examples -->
    {#if visible}
      <section class="mb-16" in:fly={{ y: 20, duration: 600, delay: 200 }}>
        <h2 class="text-2xl font-semibold mb-6">Einfache Hover-Effekte</h2>
        <div class="space-y-8">
        
          <!-- Simple Shadow -->
          <div>
            <h3 class="text-lg font-medium mb-3">1. Schatten-Effekte</h3>
            <div class="flex flex-wrap gap-4">
              <Button 
                variant="default"
                class="shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <Icon icon="mdi:white-balance-sunny" class="w-5 h-5 mr-2" />
                Schatten
              </Button>
              
              <Button 
                variant="premium"
                class="shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                Tiefer Schatten
              </Button>
            </div>
          </div>

          <!-- Simple Transform -->
          <div>
            <h3 class="text-lg font-medium mb-3">2. Transform-Effekte</h3>
            <div class="flex flex-wrap gap-4">
              <Button 
                variant="outline"
                class="border-2 border-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300"
              >
                Fill on Hover
              </Button>
              
              <Button 
                variant="soft"
                class="transform hover:-translate-y-1 transition-transform duration-300"
              >
                Hover Lift
              </Button>
            </div>
          </div>

          <!-- Simple Scale -->
          <div>
            <h3 class="text-lg font-medium mb-3">3. Skalierung</h3>
            <div class="flex flex-wrap gap-4">
              <Button 
                variant="default"
                class="transform hover:-translate-y-0.5 transition-transform duration-300"
              >
                Hover Lift
              </Button>
              
              <Button 
                variant="secondary"
                class="shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                Shadow Grow
              </Button>
            </div>
          </div>

          <!-- Icon Animations -->
          <div>
            <h3 class="text-lg font-medium mb-3">4. Icon-Animationen</h3>
            <div class="flex flex-wrap gap-4">
              <Button 
                variant="default"
                class="group"
              >
                <Icon icon="mdi:arrow-right" class="w-5 h-5 mr-2 transition-transform group-hover:translate-x-1" />
                Pfeil
              </Button>
              
              <Button 
                variant="premium"
                class="group"
              >
                <Icon icon="mdi:heart" class="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                Herz
              </Button>
              
              <Button 
                variant="soft"
                class="group"
              >
                <Icon icon="mdi:star" class="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
                Stern
              </Button>
            </div>
          </div>

          <!-- Size Variations -->
          <div>
            <h3 class="text-lg font-medium mb-3">5. Größen</h3>
            <div class="flex flex-wrap items-center gap-4">
              <Button variant="premium" size="icon" class="rounded-full shadow-md hover:shadow-lg transition-shadow">
                <Icon icon="mdi:om" class="w-5 h-5" />
              </Button>
              <Button variant="soft" size="sm">Klein</Button>
              <Button variant="default" size="default">Standard</Button>
              <Button variant="premium" size="lg">Groß</Button>
            </div>
          </div>

        </div>
      </section>
    {/if}
  </div>
</div>