<script lang="ts">
  import Icon from '@iconify/svelte';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';

  const shadowSizes = [
    { name: 'None', class: 'shadow-none', value: '0' },
    { name: 'Extra Small', class: 'shadow-xs', value: '0 1px 2px 0 rgb(0 0 0 / 0.05)' },
    { name: 'Small', class: 'shadow-sm', value: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' },
    { name: 'Default', class: 'shadow', value: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px 0 rgb(0 0 0 / 0.06)' },
    { name: 'Medium', class: 'shadow-md', value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' },
    { name: 'Large', class: 'shadow-lg', value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' },
    { name: 'Extra Large', class: 'shadow-xl', value: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' },
    { name: '2XL', class: 'shadow-2xl', value: '0 25px 50px -12px rgb(0 0 0 / 0.25)' }
  ];

  const coloredShadows = [
    { name: 'Primary', class: 'shadow-lg shadow-primary-500/25', color: 'primary-500' },
    { name: 'Red', class: 'shadow-lg shadow-red-500/25', color: 'red-500' },
    { name: 'Green', class: 'shadow-lg shadow-green-500/25', color: 'green-500' },
    { name: 'Blue', class: 'shadow-lg shadow-blue-500/25', color: 'blue-500' },
    { name: 'Yellow', class: 'shadow-lg shadow-yellow-500/25', color: 'yellow-500' },
    { name: 'Purple', class: 'shadow-lg shadow-purple-500/25', color: 'purple-500' }
  ];

  const specialEffects = [
    { 
      name: 'Inner Shadow', 
      class: 'shadow-inner', 
      description: 'Schatten nach innen',
      style: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.06)'
    },
    { 
      name: '3D Effect', 
      class: 'shadow-lg hover:shadow-2xl transform hover:-translate-y-1', 
      description: 'Hebt bei Hover',
      interactive: true
    },
    { 
      name: 'Glow Effect', 
      class: 'shadow-xl shadow-primary-500/50', 
      description: 'Leuchtender Schatten',
      colored: true
    },
    { 
      name: 'Soft Shadow', 
      class: 'shadow-2xl shadow-gray-300/50', 
      description: 'Weicher Schatten',
      colored: true
    }
  ];

  let copiedClass = '';

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    copiedClass = text;
    setTimeout(() => {
      copiedClass = '';
    }, 2000);
  }
</script>

<svelte:head>
  <title>Schatten - ISKCON Design System</title>
  <meta name="description" content="Schatten und Elevation-System für das ISKCON Deutschland Design System" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <!-- Header -->
  <header class="bg-white border-b border-gray-200">
    <div class="container mx-auto px-4 py-8">
      <div class="flex items-center gap-4 mb-4">
        <a href="/style" class="text-gray-500 hover:text-gray-700">
          <Icon icon="mdi:arrow-left" class="w-5 h-5" />
        </a>
        <h1 class="text-3xl font-bold">Schatten & Elevation</h1>
      </div>
      <p class="text-gray-600 max-w-2xl">
        Schatten-System für Tiefe und visuelle Hierarchie in der Benutzeroberfläche.
      </p>
    </div>
  </header>

  <div class="container mx-auto px-4 py-12">
    <!-- Shadow Sizes -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Schatten-Größen</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each shadowSizes as shadow}
          <div class="text-center">
            <div class="bg-white rounded-lg p-8 {shadow.class} mb-4 transition-shadow hover:shadow-xl cursor-pointer">
              <Icon icon="mdi:layers" class="w-8 h-8 mx-auto text-gray-600" />
            </div>
            <h3 class="font-semibold">{shadow.name}</h3>
            <button
              on:click={() => copyToClipboard(shadow.class)}
              class="text-sm text-primary-500 hover:text-primary-600 font-mono mt-1"
            >
              {copiedClass === shadow.class ? 'Kopiert!' : shadow.class}
            </button>
            <p class="text-xs text-gray-500 mt-2 px-2">{shadow.value}</p>
          </div>
        {/each}
      </div>

      <div class="mt-8 bg-white rounded-lg shadow-sm p-6">
        <h3 class="font-semibold mb-3">Verwendungsrichtlinien</h3>
        <ul class="space-y-2 text-sm text-gray-600">
          <li class="flex items-start gap-2">
            <span class="font-mono bg-gray-100 px-2 py-0.5 rounded">shadow-sm</span>
            <span>Für subtile Trennung (z.B. Cards in Listen)</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="font-mono bg-gray-100 px-2 py-0.5 rounded">shadow-md</span>
            <span>Für interaktive Elemente (z.B. Buttons, Inputs)</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="font-mono bg-gray-100 px-2 py-0.5 rounded">shadow-lg</span>
            <span>Für hervorgehobene Cards und Modals</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="font-mono bg-gray-100 px-2 py-0.5 rounded">shadow-xl/2xl</span>
            <span>Für Popups und schwebende Elemente</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- Colored Shadows -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Farbige Schatten</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each coloredShadows as shadow}
          <div class="text-center">
            <div class="bg-white rounded-lg p-8 {shadow.class} transition-shadow hover:shadow-2xl cursor-pointer">
              <div class="w-16 h-16 bg-{shadow.color} rounded-lg mx-auto"></div>
            </div>
            <h3 class="font-semibold mt-4">{shadow.name}</h3>
            <button
              on:click={() => copyToClipboard(shadow.class)}
              class="text-sm text-primary-500 hover:text-primary-600 font-mono mt-1"
            >
              {copiedClass === shadow.class ? 'Kopiert!' : shadow.class}
            </button>
          </div>
        {/each}
      </div>

      <div class="mt-6 bg-white rounded-lg shadow-sm p-6">
        <p class="text-sm text-gray-600">
          <strong>Tipp:</strong> Farbige Schatten mit <code class="bg-gray-100 px-2 py-0.5 rounded">/25</code> 
          oder <code class="bg-gray-100 px-2 py-0.5 rounded">/50</code> für die Transparenz. 
          Verwende sie sparsam für besondere Akzente.
        </p>
      </div>
    </section>

    <!-- Special Effects -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Spezial-Effekte</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#each specialEffects as effect}
          <Card class={effect.class}>
            <CardHeader>
              <CardTitle>{effect.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-gray-600 mb-4">{effect.description}</p>
              <button
                on:click={() => copyToClipboard(effect.class)}
                class="text-sm text-primary-500 hover:text-primary-600 font-mono"
              >
                {copiedClass === effect.class ? 'Kopiert!' : effect.class}
              </button>
              {#if effect.interactive}
                <p class="text-xs text-gray-500 mt-2">Hover für Effekt</p>
              {/if}
            </CardContent>
          </Card>
        {/each}
      </div>
    </section>

    <!-- Elevation System -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Elevation-System</h2>
      
      <div class="bg-white rounded-lg shadow-sm p-8">
        <p class="text-gray-600 mb-8">
          Das Elevation-System definiert die visuelle Hierarchie durch verschiedene Schatten-Ebenen.
        </p>

        <div class="space-y-8">
          <!-- Level 0 -->
          <div class="relative">
            <div class="bg-gray-100 p-6 rounded-lg">
              <h3 class="font-semibold mb-2">Level 0 - Basis</h3>
              <p class="text-sm text-gray-600">Hintergrund-Ebene ohne Schatten</p>
              <code class="text-xs bg-gray-200 px-2 py-1 rounded mt-2 inline-block">shadow-none</code>
            </div>
          </div>

          <!-- Level 1 -->
          <div class="relative -mt-4 ml-4">
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h3 class="font-semibold mb-2">Level 1 - Karten</h3>
              <p class="text-sm text-gray-600">Standard Cards und Container</p>
              <code class="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">shadow-sm</code>
            </div>
          </div>

          <!-- Level 2 -->
          <div class="relative -mt-4 ml-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="font-semibold mb-2">Level 2 - Erhöht</h3>
              <p class="text-sm text-gray-600">Aktive oder hover Elemente</p>
              <code class="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">shadow-md</code>
            </div>
          </div>

          <!-- Level 3 -->
          <div class="relative -mt-4 ml-12">
            <div class="bg-white p-6 rounded-lg shadow-lg">
              <h3 class="font-semibold mb-2">Level 3 - Schwebend</h3>
              <p class="text-sm text-gray-600">Dropdowns, Tooltips</p>
              <code class="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">shadow-lg</code>
            </div>
          </div>

          <!-- Level 4 -->
          <div class="relative -mt-4 ml-16">
            <div class="bg-white p-6 rounded-lg shadow-xl">
              <h3 class="font-semibold mb-2">Level 4 - Modal</h3>
              <p class="text-sm text-gray-600">Modals, Dialoge</p>
              <code class="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">shadow-xl</code>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Examples -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Interaktive Beispiele</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Hover Elevation -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg font-semibold mb-4">Hover Elevation</h3>
          <div class="space-y-4">
            <div class="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <p>Klein → Mittel</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <p>Mittel → Groß</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow cursor-pointer">
              <p>Groß → Extra Groß</p>
            </div>
          </div>
        </div>

        <!-- Click Effects -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg font-semibold mb-4">Klick-Effekte</h3>
          <div class="space-y-4">
            <button class="w-full bg-primary-500 text-white p-4 rounded-lg shadow-md hover:shadow-lg active:shadow-sm transition-shadow">
              Drück mich
            </button>
            <button class="w-full bg-white border-2 border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-md active:shadow-inner transition-shadow">
              Inner Shadow bei Klick
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Neumorphism -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Neumorphismus</h2>
      
      <div class="bg-gray-100 rounded-lg p-8">
        <p class="text-gray-600 mb-8">
          Neumorphismus kombiniert Schatten für einen "soft UI" Effekt. Verwende sparsam für moderne Akzente.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Raised -->
          <div class="text-center">
            <div class="bg-gray-100 p-8 rounded-lg shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff]">
              <Icon icon="mdi:home" class="w-8 h-8 mx-auto text-gray-600" />
            </div>
            <h3 class="font-semibold mt-4">Erhöht</h3>
            <code class="text-xs">shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff]</code>
          </div>

          <!-- Inset -->
          <div class="text-center">
            <div class="bg-gray-100 p-8 rounded-lg shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff]">
              <Icon icon="mdi:cog" class="w-8 h-8 mx-auto text-gray-600" />
            </div>
            <h3 class="font-semibold mt-4">Vertieft</h3>
            <code class="text-xs">shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff]</code>
          </div>

          <!-- Flat -->
          <div class="text-center">
            <div class="bg-gray-100 p-8 rounded-lg shadow-[3px_3px_6px_#bebebe,-3px_-3px_6px_#ffffff]">
              <Icon icon="mdi:heart" class="w-8 h-8 mx-auto text-gray-600" />
            </div>
            <h3 class="font-semibold mt-4">Flach</h3>
            <code class="text-xs">shadow-[3px_3px_6px_#bebebe,-3px_-3px_6px_#ffffff]</code>
          </div>
        </div>
      </div>
    </section>

    <!-- Best Practices -->
    <section>
      <h2 class="text-2xl font-bold mb-6">Best Practices</h2>
      
      <div class="bg-white rounded-lg shadow-sm p-8">
        <div class="space-y-6">
          <div>
            <h3 class="font-semibold mb-3">Konsistenz</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Verwende konsistente Schatten-Stufen für ähnliche Elemente</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Halte dich an das Elevation-System für visuelle Hierarchie</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Nutze Hover-Effekte einheitlich im gesamten Projekt</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold mb-3">Performance</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start gap-2">
                <Icon icon="mdi:info" class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Box-Shadow ist performanter als Drop-Shadow Filter</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:info" class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Vermeide zu viele Schatten-Ebenen auf einer Seite</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:info" class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Nutze will-change sparsam für animierte Schatten</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold mb-3">Barrierefreiheit</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Verlasse dich nicht nur auf Schatten für wichtige UI-Unterscheidungen</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Stelle sicher, dass Kontraste auch ohne Schatten funktionieren</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Teste mit verschiedenen Bildschirmhelligkeiten</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>