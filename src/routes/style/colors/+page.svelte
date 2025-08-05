<script lang="ts">
  import Icon from '@iconify/svelte';
  import { Button } from '$lib/components/ui/button';

  const primaryColors = [
    { name: 'Primary 50', class: 'bg-primary-50', hex: '#fef5f3' },
    { name: 'Primary 100', class: 'bg-primary-100', hex: '#fbe7e3' },
    { name: 'Primary 200', class: 'bg-primary-200', hex: '#f5cfc9' },
    { name: 'Primary 300', class: 'bg-primary-300', hex: '#e9aaa3' },
    { name: 'Primary 400', class: 'bg-primary-400', hex: '#db8079' },
    { name: 'Primary 500', class: 'bg-primary-500', hex: '#C6695D', main: true },
    { name: 'Primary 600', class: 'bg-primary-600', hex: '#B85A4F', main: true },
    { name: 'Primary 700', class: 'bg-primary-700', hex: '#a5534a' },
    { name: 'Primary 800', class: 'bg-primary-800', hex: '#88433e' },
    { name: 'Primary 900', class: 'bg-primary-900', hex: '#6d352f' },
    { name: 'Primary 950', class: 'bg-primary-950', hex: '#2f1511' }
  ];

  const grayColors = [
    { name: 'Gray 50', class: 'bg-gray-50', hex: '#f9fafb' },
    { name: 'Gray 100', class: 'bg-gray-100', hex: '#f3f4f6' },
    { name: 'Gray 200', class: 'bg-gray-200', hex: '#e5e7eb' },
    { name: 'Gray 300', class: 'bg-gray-300', hex: '#d1d5db' },
    { name: 'Gray 400', class: 'bg-gray-400', hex: '#9ca3af' },
    { name: 'Gray 500', class: 'bg-gray-500', hex: '#6b7280' },
    { name: 'Gray 600', class: 'bg-gray-600', hex: '#4b5563' },
    { name: 'Gray 700', class: 'bg-gray-700', hex: '#374151' },
    { name: 'Gray 800', class: 'bg-gray-800', hex: '#1f2937' },
    { name: 'Gray 900', class: 'bg-gray-900', hex: '#111827' },
    { name: 'Gray 950', class: 'bg-gray-950', hex: '#030712' }
  ];

  const spiritualColors = {
    saffron: [
      { name: 'Saffron 50', class: 'bg-spiritual-saffron-50', hex: '#fef5f3' },
      { name: 'Saffron 100', class: 'bg-spiritual-saffron-100', hex: '#fbe7e3' },
      { name: 'Saffron 200', class: 'bg-spiritual-saffron-200', hex: '#f5cfc9' },
      { name: 'Saffron 300', class: 'bg-spiritual-saffron-300', hex: '#e9aaa3' },
      { name: 'Saffron 400', class: 'bg-spiritual-saffron-400', hex: '#db8079' },
      { name: 'Saffron 500', class: 'bg-spiritual-saffron-500', hex: '#c06357', main: true },
      { name: 'Saffron 600', class: 'bg-spiritual-saffron-600', hex: '#a5534a' },
      { name: 'Saffron 700', class: 'bg-spiritual-saffron-700', hex: '#88433e' },
      { name: 'Saffron 800', class: 'bg-spiritual-saffron-800', hex: '#6d352f' },
      { name: 'Saffron 900', class: 'bg-spiritual-saffron-900', hex: '#592b26' },
      { name: 'Saffron 950', class: 'bg-spiritual-saffron-950', hex: '#2f1511' }
    ],
    blue: [
      { name: 'Blue 50', class: 'bg-spiritual-blue-50', hex: '#eff6ff' },
      { name: 'Blue 100', class: 'bg-spiritual-blue-100', hex: '#dbeafe' },
      { name: 'Blue 200', class: 'bg-spiritual-blue-200', hex: '#bfdbfe' },
      { name: 'Blue 300', class: 'bg-spiritual-blue-300', hex: '#93c5fd' },
      { name: 'Blue 400', class: 'bg-spiritual-blue-400', hex: '#60a5fa' },
      { name: 'Blue 500', class: 'bg-spiritual-blue-500', hex: '#3b82f6' },
      { name: 'Blue 600', class: 'bg-spiritual-blue-600', hex: '#2563eb' },
      { name: 'Blue 700', class: 'bg-spiritual-blue-700', hex: '#1d4ed8' },
      { name: 'Blue 800', class: 'bg-spiritual-blue-800', hex: '#1e40af' },
      { name: 'Blue 900', class: 'bg-spiritual-blue-900', hex: '#1e3a8a', main: true },
      { name: 'Blue 950', class: 'bg-spiritual-blue-950', hex: '#172554' }
    ],
    gold: [
      { name: 'Gold 50', class: 'bg-spiritual-gold-50', hex: '#fffbeb' },
      { name: 'Gold 100', class: 'bg-spiritual-gold-100', hex: '#fef3c7' },
      { name: 'Gold 200', class: 'bg-spiritual-gold-200', hex: '#fde68a' },
      { name: 'Gold 300', class: 'bg-spiritual-gold-300', hex: '#fcd34d' },
      { name: 'Gold 400', class: 'bg-spiritual-gold-400', hex: '#fbbf24' },
      { name: 'Gold 500', class: 'bg-spiritual-gold-500', hex: '#ffd700', main: true },
      { name: 'Gold 600', class: 'bg-spiritual-gold-600', hex: '#d97706' },
      { name: 'Gold 700', class: 'bg-spiritual-gold-700', hex: '#b45309' },
      { name: 'Gold 800', class: 'bg-spiritual-gold-800', hex: '#92400e' },
      { name: 'Gold 900', class: 'bg-spiritual-gold-900', hex: '#78350f' },
      { name: 'Gold 950', class: 'bg-spiritual-gold-950', hex: '#451a03' }
    ],
    earth: [
      { name: 'Earth 50', class: 'bg-spiritual-earth-50', hex: '#faf9f7' },
      { name: 'Earth 100', class: 'bg-spiritual-earth-100', hex: '#f3f1ed' },
      { name: 'Earth 200', class: 'bg-spiritual-earth-200', hex: '#e6e0d8' },
      { name: 'Earth 300', class: 'bg-spiritual-earth-300', hex: '#d6cbb8' },
      { name: 'Earth 400', class: 'bg-spiritual-earth-400', hex: '#c4b194' },
      { name: 'Earth 500', class: 'bg-spiritual-earth-500', hex: '#b59976', main: true },
      { name: 'Earth 600', class: 'bg-spiritual-earth-600', hex: '#a8896b' },
      { name: 'Earth 700', class: 'bg-spiritual-earth-700', hex: '#8c715a' },
      { name: 'Earth 800', class: 'bg-spiritual-earth-800', hex: '#735e4d' },
      { name: 'Earth 900', class: 'bg-spiritual-earth-900', hex: '#5d4e41' },
      { name: 'Earth 950', class: 'bg-spiritual-earth-950', hex: '#312821' }
    ]
  };

  const semanticColors = [
    { name: 'Erfolg', class: 'bg-green-500', hex: '#10b981', usage: 'Positive Aktionen, Bestätigungen' },
    { name: 'Warnung', class: 'bg-yellow-500', hex: '#f59e0b', usage: 'Hinweise, Vorsicht' },
    { name: 'Fehler', class: 'bg-red-500', hex: '#ef4444', usage: 'Fehler, Löschaktionen' },
    { name: 'Info', class: 'bg-blue-500', hex: '#3b82f6', usage: 'Informationen, Hinweise' }
  ];

  let copiedColor = '';

  function copyToClipboard(text: string, colorName: string) {
    navigator.clipboard.writeText(text);
    copiedColor = colorName;
    setTimeout(() => {
      copiedColor = '';
    }, 2000);
  }
</script>

<svelte:head>
  <title>Farben - ISKCON Design System</title>
  <meta name="description" content="Farbpalette und Verwendungsrichtlinien für das ISKCON Deutschland Design System" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <!-- Header -->
  <header class="bg-white border-b border-gray-200">
    <div class="container mx-auto px-4 py-8">
      <div class="flex items-center gap-4 mb-4">
        <a href="/style" class="text-gray-500 hover:text-gray-700">
          <Icon icon="mdi:arrow-left" class="w-5 h-5" />
        </a>
        <h1 class="text-3xl font-bold">Farben</h1>
      </div>
      <p class="text-gray-600 max-w-2xl">
        Die ISKCON Farbpalette basiert auf warmen, erdigen Tönen die Spiritualität und Professionalität vereinen.
      </p>
    </div>
  </header>

  <div class="container mx-auto px-4 py-12">
    <!-- Primary Colors -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Primärfarben</h2>
      <p class="text-gray-600 mb-8">
        Die Hauptfarben der ISKCON-Marke. Primary-500 und Primary-600 sind die wichtigsten Farben für Buttons und Akzente.
      </p>
      
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {#each primaryColors as color}
          <button
            on:click={() => copyToClipboard(color.class, color.name)}
            class="group relative"
          >
            <div class={`${color.class} h-24 rounded-lg shadow-sm group-hover:shadow-md transition-shadow ${color.main ? 'ring-2 ring-gray-900 ring-offset-2' : ''}`}></div>
            <div class="mt-2 text-sm">
              <p class="font-medium">{color.name}</p>
              <p class="text-gray-500">{color.hex}</p>
              <p class="text-xs text-gray-400 font-mono">{color.class}</p>
            </div>
            {#if copiedColor === color.name}
              <div class="absolute inset-0 flex items-center justify-center bg-black/75 rounded-lg">
                <span class="text-white text-sm">Kopiert!</span>
              </div>
            {/if}
          </button>
        {/each}
      </div>
    </section>

    <!-- Gray Scale -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Graustufen</h2>
      <p class="text-gray-600 mb-8">
        Neutrale Farben für Text, Hintergründe und UI-Elemente. Gray-600 ist die Standardfarbe für Texte.
      </p>
      
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {#each grayColors as color}
          <button
            on:click={() => copyToClipboard(color.class, color.name)}
            class="group relative"
          >
            <div class={`${color.class} h-24 rounded-lg shadow-sm group-hover:shadow-md transition-shadow border border-gray-200`}></div>
            <div class="mt-2 text-sm">
              <p class="font-medium">{color.name}</p>
              <p class="text-gray-500">{color.hex}</p>
              <p class="text-xs text-gray-400 font-mono">{color.class}</p>
            </div>
            {#if copiedColor === color.name}
              <div class="absolute inset-0 flex items-center justify-center bg-black/75 rounded-lg">
                <span class="text-white text-sm">Kopiert!</span>
              </div>
            {/if}
          </button>
        {/each}
      </div>
    </section>

    <!-- Spiritual Colors -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Spirituelle Farben</h2>
      <p class="text-gray-600 mb-8">
        Spezielle Farben für spirituelle Inhalte und besondere Anlässe. Diese Farben sollten sparsam und bewusst eingesetzt werden.
      </p>
      
      {#each Object.entries(spiritualColors) as [colorName, colors]}
        <div class="mb-12">
          <h3 class="text-lg font-semibold mb-4 capitalize">{colorName}</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {#each colors as color}
              <button
                on:click={() => copyToClipboard(color.class, color.name)}
                class="group relative"
              >
                <div class={`${color.class} h-24 rounded-lg shadow-sm group-hover:shadow-md transition-shadow ${color.main ? 'ring-2 ring-gray-900 ring-offset-2' : ''}`}></div>
                <div class="mt-2 text-sm">
                  <p class="font-medium">{color.name}</p>
                  <p class="text-gray-500">{color.hex}</p>
                  <p class="text-xs text-gray-400 font-mono">{color.class}</p>
                </div>
                {#if copiedColor === color.name}
                  <div class="absolute inset-0 flex items-center justify-center bg-black/75 rounded-lg">
                    <span class="text-white text-sm">Kopiert!</span>
                  </div>
                {/if}
              </button>
            {/each}
          </div>
        </div>
      {/each}
    </section>

    <!-- Semantic Colors -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Semantische Farben</h2>
      <p class="text-gray-600 mb-8">
        Farben mit spezifischer Bedeutung für UI-Feedback und Statusmeldungen.
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {#each semanticColors as color}
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class={`${color.class} h-20 rounded-lg mb-4`}></div>
            <h3 class="font-semibold mb-1">{color.name}</h3>
            <p class="text-sm text-gray-600 mb-2">{color.usage}</p>
            <div class="flex items-center gap-2">
              <code class="text-xs bg-gray-100 px-2 py-1 rounded">{color.hex}</code>
              <button
                on:click={() => copyToClipboard(color.class, color.name)}
                class="text-xs text-primary-500 hover:text-primary-600"
              >
                Kopieren
              </button>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Usage Guidelines -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Verwendungsrichtlinien</h2>
      
      <div class="bg-white rounded-lg shadow-sm p-8 space-y-6">
        <div>
          <h3 class="font-semibold mb-3">Primärfarben</h3>
          <ul class="space-y-2 text-gray-600">
            <li class="flex items-start gap-2">
              <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Verwende primary-500 für primäre Buttons und wichtige Aktionen</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Nutze primary-600 für Hover-States und Akzente</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Verwende hellere Töne (50-200) für Hintergründe</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold mb-3">Kontrast</h3>
          <ul class="space-y-2 text-gray-600">
            <li class="flex items-start gap-2">
              <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Stelle sicher, dass Text auf Hintergründen WCAG AA Standards erfüllt</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Verwende dunkle Grautöne (700-900) für Text auf hellen Hintergründen</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold mb-3">Spirituelle Farben</h3>
          <ul class="space-y-2 text-gray-600">
            <li class="flex items-start gap-2">
              <Icon icon="mdi:info" class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <span>Nutze spirituelle Farben sparsam für besondere Inhalte</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon icon="mdi:info" class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <span>Gold eignet sich für Premium-Inhalte und heilige Texte</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon icon="mdi:info" class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <span>Tiefblau kann für spirituelle Tiefe und Meditation verwendet werden</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Color Combinations -->
    <section>
      <h2 class="text-2xl font-bold mb-6">Empfohlene Farbkombinationen</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
          <div class="h-32 bg-gradient-to-br from-primary-500 to-primary-700"></div>
          <div class="p-4">
            <h3 class="font-semibold mb-2">Primary Gradient</h3>
            <p class="text-sm text-gray-600">Für Premium-Buttons und Header</p>
            <code class="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">from-primary-500 to-primary-700</code>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
          <div class="h-32 bg-gradient-to-br from-gray-50 to-gray-100"></div>
          <div class="p-4">
            <h3 class="font-semibold mb-2">Subtle Background</h3>
            <p class="text-sm text-gray-600">Für Sektions-Hintergründe</p>
            <code class="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">from-gray-50 to-gray-100</code>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
          <div class="h-32 bg-gradient-to-br from-spiritual-gold-400 to-spiritual-gold-600"></div>
          <div class="p-4">
            <h3 class="font-semibold mb-2">Spiritual Gold</h3>
            <p class="text-sm text-gray-600">Für besondere spirituelle Inhalte</p>
            <code class="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">from-spiritual-gold-400 to-spiritual-gold-600</code>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>