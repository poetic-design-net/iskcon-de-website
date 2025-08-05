<script lang="ts">
  import Icon from '@iconify/svelte';
  import { Button } from '$lib/components/ui/button';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  
  let isHovered = false;
  let isAnimating = false;

  function triggerAnimation() {
    isAnimating = true;
    setTimeout(() => {
      isAnimating = false;
    }, 2000);
  }
</script>

<svelte:head>
  <title>Animationen - ISKCON Design System</title>
  <meta name="description" content="Animationen und Übergänge für das ISKCON Deutschland Design System" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <!-- Header -->
  <header class="bg-white border-b border-gray-200">
    <div class="container mx-auto px-4 py-8">
      <div class="flex items-center gap-4 mb-4">
        <a href="/style" class="text-gray-500 hover:text-gray-700">
          <Icon icon="mdi:arrow-left" class="w-5 h-5" />
        </a>
        <h1 class="text-3xl font-bold">Animationen & Übergänge</h1>
      </div>
      <p class="text-gray-600 max-w-2xl">
        Subtile Animationen für eine lebendige und moderne Benutzererfahrung.
      </p>
    </div>
  </header>

  <div class="container mx-auto px-4 py-12">
    <!-- Transition Durations -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Übergangs-Dauern</h2>
      
      <div class="bg-white rounded-lg shadow-sm p-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="bg-primary-500 w-20 h-20 rounded-lg mx-auto mb-4 transition-all duration-150 hover:scale-110"></div>
            <h3 class="font-semibold">Schnell</h3>
            <p class="text-sm text-gray-600">150ms</p>
            <code class="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">duration-150</code>
          </div>
          
          <div class="text-center">
            <div class="bg-primary-500 w-20 h-20 rounded-lg mx-auto mb-4 transition-all duration-300 hover:scale-110"></div>
            <h3 class="font-semibold">Standard</h3>
            <p class="text-sm text-gray-600">300ms</p>
            <code class="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">duration-300</code>
          </div>
          
          <div class="text-center">
            <div class="bg-primary-500 w-20 h-20 rounded-lg mx-auto mb-4 transition-all duration-500 hover:scale-110"></div>
            <h3 class="font-semibold">Langsam</h3>
            <p class="text-sm text-gray-600">500ms</p>
            <code class="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">duration-500</code>
          </div>
        </div>

        <div class="mt-8 p-4 bg-gray-50 rounded-lg">
          <p class="text-sm text-gray-600">
            <strong>Empfehlung:</strong> Verwende 150-300ms für die meisten Interaktionen. 
            Längere Dauern nur für größere Animationen oder bewusste Verzögerungen.
          </p>
        </div>
      </div>
    </section>

    <!-- Hover Effects -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Hover-Effekte</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Scale -->
        <Card class="transition-transform duration-300 hover:scale-105 cursor-pointer">
          <CardHeader>
            <CardTitle>Scale</CardTitle>
            <CardDescription>Vergrößerung bei Hover</CardDescription>
          </CardHeader>
          <CardContent>
            <code class="text-sm">hover:scale-105</code>
          </CardContent>
        </Card>

        <!-- Shadow -->
        <Card class="transition-shadow duration-300 hover:shadow-xl cursor-pointer">
          <CardHeader>
            <CardTitle>Shadow</CardTitle>
            <CardDescription>Schatten bei Hover</CardDescription>
          </CardHeader>
          <CardContent>
            <code class="text-sm">hover:shadow-xl</code>
          </CardContent>
        </Card>

        <!-- Color -->
        <Card class="transition-colors duration-300 hover:bg-primary-50 hover:border-primary-200 cursor-pointer">
          <CardHeader>
            <CardTitle>Farbe</CardTitle>
            <CardDescription>Farbwechsel bei Hover</CardDescription>
          </CardHeader>
          <CardContent>
            <code class="text-sm">hover:bg-primary-50</code>
          </CardContent>
        </Card>

        <!-- Translate -->
        <Card class="transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
          <CardHeader>
            <CardTitle>Translate</CardTitle>
            <CardDescription>Verschiebung bei Hover</CardDescription>
          </CardHeader>
          <CardContent>
            <code class="text-sm">hover:-translate-y-1</code>
          </CardContent>
        </Card>

        <!-- Rotate -->
        <div class="bg-white rounded-lg shadow-sm p-6 text-center">
          <div class="inline-block transition-transform duration-300 hover:rotate-180">
            <Icon icon="mdi:star" class="w-12 h-12 text-primary-500" />
          </div>
          <h3 class="font-semibold mt-4">Rotation</h3>
          <p class="text-sm text-gray-600">Drehung bei Hover</p>
          <code class="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">hover:rotate-180</code>
        </div>

        <!-- Combined -->
        <Card class="transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
          <CardHeader>
            <CardTitle>Kombiniert</CardTitle>
            <CardDescription>Mehrere Effekte</CardDescription>
          </CardHeader>
          <CardContent>
            <code class="text-sm">hover:scale-105 hover:shadow-xl</code>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Loading States -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Lade-Animationen</h2>
      
      <div class="bg-white rounded-lg shadow-sm p-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Spin -->
          <div class="text-center">
            <Icon icon="mdi:loading" class="w-12 h-12 text-primary-500 animate-spin mx-auto" />
            <h3 class="font-semibold mt-4">Spin</h3>
            <code class="text-sm bg-gray-100 px-2 py-1 rounded mt-2 inline-block">animate-spin</code>
          </div>

          <!-- Pulse -->
          <div class="text-center">
            <div class="w-20 h-20 bg-primary-500 rounded-lg animate-pulse mx-auto"></div>
            <h3 class="font-semibold mt-4">Pulse</h3>
            <code class="text-sm bg-gray-100 px-2 py-1 rounded mt-2 inline-block">animate-pulse</code>
          </div>

          <!-- Bounce -->
          <div class="text-center">
            <div class="flex justify-center space-x-2">
              <div class="w-4 h-4 bg-primary-500 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
              <div class="w-4 h-4 bg-primary-500 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
              <div class="w-4 h-4 bg-primary-500 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
            </div>
            <h3 class="font-semibold mt-4">Bounce</h3>
            <code class="text-sm bg-gray-100 px-2 py-1 rounded mt-2 inline-block">animate-bounce</code>
          </div>
        </div>

        <!-- Custom Loading Button -->
        <div class="mt-8 text-center">
          <Button on:click={triggerAnimation} disabled={isAnimating}>
            {#if isAnimating}
              <Icon icon="mdi:loading" class="w-5 h-5 animate-spin" />
              Lädt...
            {:else}
              Klick mich
            {/if}
          </Button>
        </div>
      </div>
    </section>

    <!-- Page Transitions -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Seiten-Übergänge</h2>
      
      <div class="bg-white rounded-lg shadow-sm p-8">
        <div class="space-y-6">
          <!-- Fade In -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Fade In</h3>
            <div class="bg-gray-50 p-6 rounded-lg animate-fade-in">
              <p>Dieser Inhalt blendet sanft ein.</p>
            </div>
            <code class="text-sm bg-gray-100 px-3 py-1 rounded mt-2 inline-block">animate-fade-in</code>
          </div>

          <!-- Slide In -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Slide In</h3>
            <div class="overflow-hidden">
              <div class="bg-gray-50 p-6 rounded-lg animate-slide-in-right">
                <p>Dieser Inhalt gleitet von rechts herein.</p>
              </div>
            </div>
            <code class="text-sm bg-gray-100 px-3 py-1 rounded mt-2 inline-block">animate-slide-in-right</code>
          </div>

          <!-- Scale Up -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Scale Up</h3>
            <div class="bg-gray-50 p-6 rounded-lg animate-scale-up">
              <p>Dieser Inhalt skaliert von klein nach groß.</p>
            </div>
            <code class="text-sm bg-gray-100 px-3 py-1 rounded mt-2 inline-block">animate-scale-up</code>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Examples -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Interaktive Beispiele</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Button Group -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg font-semibold mb-4">Button-Animationen</h3>
          <div class="space-y-4">
            <Button variant="default" class="w-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Scale & Shadow
            </Button>
            <Button variant="outline" class="w-full group">
              <span class="transition-transform duration-300 group-hover:translate-x-1">
                Mit Icon
              </span>
              <Icon icon="mdi:arrow-right" class="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" />
            </Button>
            <Button variant="soft" class="w-full relative overflow-hidden group">
              <span class="relative z-10">Slide Effect</span>
              <div class="absolute inset-0 bg-primary-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </Button>
          </div>
        </div>

        <!-- Icon Animations -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg font-semibold mb-4">Icon-Animationen</h3>
          <div class="grid grid-cols-3 gap-4">
            <button 
              class="p-4 rounded-lg border-2 border-gray-200 hover:border-primary-500 transition-colors group"
              on:mouseenter={() => isHovered = true}
              on:mouseleave={() => isHovered = false}
            >
              <Icon icon="mdi:heart" class="w-8 h-8 mx-auto transition-all duration-300 {isHovered ? 'text-red-500 scale-125' : 'text-gray-400'}" />
            </button>
            
            <button class="p-4 rounded-lg border-2 border-gray-200 hover:border-primary-500 transition-colors group">
              <Icon icon="mdi:bell" class="w-8 h-8 mx-auto text-gray-400 group-hover:text-yellow-500 group-hover:animate-bounce transition-colors" />
            </button>
            
            <button class="p-4 rounded-lg border-2 border-gray-200 hover:border-primary-500 transition-colors group">
              <Icon icon="mdi:cog" class="w-8 h-8 mx-auto text-gray-400 group-hover:text-primary-500 group-hover:animate-spin transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Easing Functions -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Easing-Funktionen</h2>
      
      <div class="bg-white rounded-lg shadow-sm p-8">
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <div class="w-32">
              <p class="font-medium">Linear</p>
              <code class="text-xs">ease-linear</code>
            </div>
            <div class="flex-1 bg-gray-100 rounded p-2">
              <div class="h-8 bg-primary-500 rounded transition-all duration-1000 ease-linear hover:translate-x-full" style="width: 2rem"></div>
            </div>
          </div>
          
          <div class="flex items-center gap-4">
            <div class="w-32">
              <p class="font-medium">Ease In</p>
              <code class="text-xs">ease-in</code>
            </div>
            <div class="flex-1 bg-gray-100 rounded p-2">
              <div class="h-8 bg-primary-500 rounded transition-all duration-1000 ease-in hover:translate-x-full" style="width: 2rem"></div>
            </div>
          </div>
          
          <div class="flex items-center gap-4">
            <div class="w-32">
              <p class="font-medium">Ease Out</p>
              <code class="text-xs">ease-out</code>
            </div>
            <div class="flex-1 bg-gray-100 rounded p-2">
              <div class="h-8 bg-primary-500 rounded transition-all duration-1000 ease-out hover:translate-x-full" style="width: 2rem"></div>
            </div>
          </div>
          
          <div class="flex items-center gap-4">
            <div class="w-32">
              <p class="font-medium">Ease In Out</p>
              <code class="text-xs">ease-in-out</code>
            </div>
            <div class="flex-1 bg-gray-100 rounded p-2">
              <div class="h-8 bg-primary-500 rounded transition-all duration-1000 ease-in-out hover:translate-x-full" style="width: 2rem"></div>
            </div>
          </div>
        </div>

        <p class="text-sm text-gray-600 mt-6">
          Hover über die Balken, um die verschiedenen Easing-Funktionen zu sehen.
        </p>
      </div>
    </section>

    <!-- Best Practices -->
    <section>
      <h2 class="text-2xl font-bold mb-6">Best Practices</h2>
      
      <div class="bg-white rounded-lg shadow-sm p-8">
        <div class="space-y-6">
          <div>
            <h3 class="font-semibold mb-3">Performance</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Animiere nur transform und opacity für beste Performance</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Verwende will-change sparsam für kritische Animationen</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Vermeide zu viele gleichzeitige Animationen</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold mb-3">Benutzererfahrung</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Halte Animationen subtil und zweckmäßig</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Respektiere prefers-reduced-motion für Barrierefreiheit</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Verwende konsistente Timing-Werte im gesamten Projekt</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold mb-3">Timing</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start gap-2">
                <Icon icon="mdi:info" class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>150ms - Micro-Interaktionen (Hover, Focus)</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:info" class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>300ms - Standard-Übergänge (Modals, Dropdowns)</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:info" class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>500ms+ - Große Animationen (Seiten-Übergänge)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slide-in-right {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes scale-up {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  .animate-fade-in {
    animation: fade-in 0.5s ease-out;
  }

  .animate-slide-in-right {
    animation: slide-in-right 0.5s ease-out;
  }

  .animate-scale-up {
    animation: scale-up 0.5s ease-out;
  }
</style>