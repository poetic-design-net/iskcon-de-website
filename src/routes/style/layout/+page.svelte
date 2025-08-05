<script lang="ts">
  import Icon from '@iconify/svelte';

  const breakpoints = [
    { name: 'sm', size: '640px', description: 'Mobile Landscape' },
    { name: 'md', size: '768px', description: 'Tablet' },
    { name: 'lg', size: '1024px', description: 'Desktop' },
    { name: 'xl', size: '1280px', description: 'Large Desktop' },
    { name: '2xl', size: '1536px', description: 'Extra Large' }
  ];

  const spacing = [
    { name: '0', value: '0px', rem: '0rem' },
    { name: 'px', value: '1px', rem: '0.0625rem' },
    { name: '0.5', value: '2px', rem: '0.125rem' },
    { name: '1', value: '4px', rem: '0.25rem' },
    { name: '1.5', value: '6px', rem: '0.375rem' },
    { name: '2', value: '8px', rem: '0.5rem' },
    { name: '2.5', value: '10px', rem: '0.625rem' },
    { name: '3', value: '12px', rem: '0.75rem' },
    { name: '3.5', value: '14px', rem: '0.875rem' },
    { name: '4', value: '16px', rem: '1rem' },
    { name: '5', value: '20px', rem: '1.25rem' },
    { name: '6', value: '24px', rem: '1.5rem' },
    { name: '7', value: '28px', rem: '1.75rem' },
    { name: '8', value: '32px', rem: '2rem' },
    { name: '9', value: '36px', rem: '2.25rem' },
    { name: '10', value: '40px', rem: '2.5rem' },
    { name: '11', value: '44px', rem: '2.75rem' },
    { name: '12', value: '48px', rem: '3rem' },
    { name: '14', value: '56px', rem: '3.5rem' },
    { name: '16', value: '64px', rem: '4rem' },
    { name: '20', value: '80px', rem: '5rem' },
    { name: '24', value: '96px', rem: '6rem' },
    { name: '28', value: '112px', rem: '7rem' },
    { name: '32', value: '128px', rem: '8rem' },
    { name: '36', value: '144px', rem: '9rem' },
    { name: '40', value: '160px', rem: '10rem' },
    { name: '44', value: '176px', rem: '11rem' },
    { name: '48', value: '192px', rem: '12rem' },
    { name: '52', value: '208px', rem: '13rem' },
    { name: '56', value: '224px', rem: '14rem' },
    { name: '60', value: '240px', rem: '15rem' },
    { name: '64', value: '256px', rem: '16rem' },
    { name: '72', value: '288px', rem: '18rem' },
    { name: '80', value: '320px', rem: '20rem' },
    { name: '96', value: '384px', rem: '24rem' }
  ];

  const gridCols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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
  <title>Layout - ISKCON Design System</title>
  <meta name="description" content="Grid-System, Spacing und Layout-Richtlinien für das ISKCON Deutschland Design System" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <!-- Header -->
  <header class="bg-white border-b border-gray-200">
    <div class="container mx-auto px-4 py-8">
      <div class="flex items-center gap-4 mb-4">
        <a href="/style" class="text-gray-500 hover:text-gray-700">
          <Icon icon="mdi:arrow-left" class="w-5 h-5" />
        </a>
        <h1 class="text-3xl font-bold">Layout System</h1>
      </div>
      <p class="text-gray-600 max-w-2xl">
        Grid-System, Abstände und responsive Breakpoints für konsistente Layouts.
      </p>
    </div>
  </header>

  <div class="container mx-auto px-4 py-12">
    <!-- Container -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Container</h2>
      
      <div class="bg-white rounded-lg shadow-sm p-8">
        <div class="space-y-4">
          <p class="text-gray-600 mb-6">
            Der Container zentriert Inhalte und begrenzt die maximale Breite. Er hat automatisches Padding für verschiedene Bildschirmgrößen.
          </p>
          
          <div class="bg-gray-100 p-6 rounded-lg">
            <code class="text-sm">
              <pre>{`<div class="container mx-auto px-4">
  <!-- Inhalt -->
</div>`}</pre>
            </code>
          </div>

          <div class="mt-6">
            <h3 class="font-semibold mb-3">Container-Eigenschaften:</h3>
            <ul class="space-y-2 text-sm text-gray-600">
              <li>• Zentriert mit <code class="bg-gray-100 px-2 py-1 rounded">mx-auto</code></li>
              <li>• Standard-Padding: <code class="bg-gray-100 px-2 py-1 rounded">px-4</code> (16px)</li>
              <li>• Max-Width bei 2xl: <code class="bg-gray-100 px-2 py-1 rounded">1400px</code></li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Breakpoints -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Responsive Breakpoints</h2>
      
      <div class="bg-white rounded-lg shadow-sm p-8">
        <p class="text-gray-600 mb-6">
          Tailwind's mobile-first Breakpoint-System für responsive Designs.
        </p>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b">
                <th class="text-left py-3 px-4">Breakpoint</th>
                <th class="text-left py-3 px-4">Min-Width</th>
                <th class="text-left py-3 px-4">Beschreibung</th>
                <th class="text-left py-3 px-4">Beispiel</th>
              </tr>
            </thead>
            <tbody>
              {#each breakpoints as bp}
                <tr class="border-b hover:bg-gray-50">
                  <td class="py-3 px-4 font-mono text-sm">{bp.name}:</td>
                  <td class="py-3 px-4 text-sm">{bp.size}</td>
                  <td class="py-3 px-4 text-sm text-gray-600">{bp.description}</td>
                  <td class="py-3 px-4">
                    <button
                      on:click={() => copyToClipboard(`${bp.name}:block`)}
                      class="text-sm font-mono text-primary-500 hover:text-primary-600"
                    >
                      {copiedClass === `${bp.name}:block` ? 'Kopiert!' : `${bp.name}:block`}
                    </button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>

        <div class="mt-6 p-4 bg-gray-50 rounded-lg">
          <p class="text-sm text-gray-600">
            <strong>Mobile-First:</strong> Styles gelten ab dem angegebenen Breakpoint aufwärts. 
            Ohne Präfix gelten sie für alle Größen.
          </p>
        </div>
      </div>
    </section>

    <!-- Grid System -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Grid System</h2>
      
      <div class="bg-white rounded-lg shadow-sm p-8">
        <div class="space-y-8">
          <!-- Basic Grid -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Basis Grid</h3>
            <div class="grid grid-cols-12 gap-4 mb-4">
              {#each gridCols as col}
                <div class="bg-primary-100 rounded p-4 text-center text-sm font-medium">
                  {col}
                </div>
              {/each}
            </div>
            <code class="text-sm bg-gray-100 px-3 py-1 rounded">grid grid-cols-12 gap-4</code>
          </div>

          <!-- Responsive Grid -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Responsive Grid</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
              <div class="bg-primary-100 rounded p-8 text-center">1</div>
              <div class="bg-primary-100 rounded p-8 text-center">2</div>
              <div class="bg-primary-100 rounded p-8 text-center">3</div>
              <div class="bg-primary-100 rounded p-8 text-center">4</div>
            </div>
            <code class="text-sm bg-gray-100 px-3 py-1 rounded">grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4</code>
          </div>

          <!-- Grid Patterns -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Häufige Grid-Patterns</h3>
            <div class="space-y-4">
              <div>
                <p class="text-sm font-medium mb-2">Sidebar Layout</p>
                <div class="grid grid-cols-12 gap-4">
                  <div class="col-span-3 bg-gray-200 rounded p-4 text-center">Sidebar</div>
                  <div class="col-span-9 bg-gray-100 rounded p-4 text-center">Main Content</div>
                </div>
                <code class="text-xs mt-2 inline-block">grid-cols-12 → col-span-3 + col-span-9</code>
              </div>

              <div>
                <p class="text-sm font-medium mb-2">Two Column</p>
                <div class="grid grid-cols-2 gap-4">
                  <div class="bg-gray-100 rounded p-4 text-center">Column 1</div>
                  <div class="bg-gray-100 rounded p-4 text-center">Column 2</div>
                </div>
                <code class="text-xs mt-2 inline-block">grid-cols-2 gap-4</code>
              </div>

              <div>
                <p class="text-sm font-medium mb-2">Card Grid</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div class="bg-gray-100 rounded p-8 text-center">Card 1</div>
                  <div class="bg-gray-100 rounded p-8 text-center">Card 2</div>
                  <div class="bg-gray-100 rounded p-8 text-center">Card 3</div>
                </div>
                <code class="text-xs mt-2 inline-block">grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Spacing -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Spacing System</h2>
      
      <div class="bg-white rounded-lg shadow-sm p-8">
        <p class="text-gray-600 mb-6">
          Konsistente Abstände mit Tailwind's Spacing-Scale für Padding, Margin und Gap.
        </p>

        <div class="space-y-8">
          <!-- Visual Scale -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Spacing Scale</h3>
            <div class="space-y-2">
              {#each spacing.slice(0, 25) as space}
                <div class="flex items-center gap-4">
                  <span class="text-sm font-mono text-gray-500 w-12">{space.name}</span>
                  <div class="bg-primary-500 h-6" style="width: {space.value}"></div>
                  <span class="text-sm text-gray-600">{space.value} / {space.rem}</span>
                  <button
                    on:click={() => copyToClipboard(`p-${space.name}`)}
                    class="text-xs text-primary-500 hover:text-primary-600"
                  >
                    p-{space.name}
                  </button>
                </div>
              {/each}
            </div>
          </div>

          <!-- Usage Examples -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Verwendung</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-medium mb-3">Padding</h4>
                <div class="space-y-2">
                  <div class="bg-gray-100 p-4 rounded">
                    <div class="bg-white p-4 rounded">p-4 (16px)</div>
                  </div>
                  <div class="bg-gray-100 px-8 py-4 rounded">
                    <div class="bg-white p-2 rounded text-sm">px-8 py-4</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 class="font-medium mb-3">Margin</h4>
                <div class="space-y-2">
                  <div class="bg-gray-100 p-4 rounded">
                    <div class="bg-white p-2 rounded mb-4">mb-4</div>
                    <div class="bg-white p-2 rounded">Bottom element</div>
                  </div>
                  <div class="bg-gray-100 p-4 rounded">
                    <div class="bg-white p-2 rounded text-sm mx-auto w-32">mx-auto</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Common Spacing Patterns -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Häufige Spacing-Patterns</h3>
            <div class="space-y-4">
              <div class="bg-gray-50 p-6 rounded-lg">
                <h4 class="font-medium mb-2">Section Spacing</h4>
                <code class="text-sm">py-12 md:py-16 lg:py-24</code>
                <p class="text-sm text-gray-600 mt-2">Für Hauptsektionen auf Seiten</p>
              </div>

              <div class="bg-gray-50 p-6 rounded-lg">
                <h4 class="font-medium mb-2">Card Padding</h4>
                <code class="text-sm">p-6 md:p-8</code>
                <p class="text-sm text-gray-600 mt-2">Für Card-Komponenten</p>
              </div>

              <div class="bg-gray-50 p-6 rounded-lg">
                <h4 class="font-medium mb-2">Button Padding</h4>
                <code class="text-sm">px-4 py-2</code>
                <p class="text-sm text-gray-600 mt-2">Standard Button-Abstände</p>
              </div>

              <div class="bg-gray-50 p-6 rounded-lg">
                <h4 class="font-medium mb-2">Stack Spacing</h4>
                <code class="text-sm">space-y-4</code>
                <p class="text-sm text-gray-600 mt-2">Vertikale Abstände zwischen Elementen</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Flexbox Utilities -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Flexbox Utilities</h2>
      
      <div class="bg-white rounded-lg shadow-sm p-8">
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold mb-4">Häufige Flex-Patterns</h3>
            
            <div class="space-y-4">
              <div class="bg-gray-50 p-4 rounded">
                <div class="flex items-center justify-between mb-2">
                  <div class="bg-primary-100 px-4 py-2 rounded">Logo</div>
                  <div class="bg-primary-100 px-4 py-2 rounded">Menu</div>
                </div>
                <code class="text-xs">flex items-center justify-between</code>
              </div>

              <div class="bg-gray-50 p-4 rounded">
                <div class="flex items-center gap-4 mb-2">
                  <div class="bg-primary-100 px-4 py-2 rounded">Item 1</div>
                  <div class="bg-primary-100 px-4 py-2 rounded">Item 2</div>
                  <div class="bg-primary-100 px-4 py-2 rounded">Item 3</div>
                </div>
                <code class="text-xs">flex items-center gap-4</code>
              </div>

              <div class="bg-gray-50 p-4 rounded">
                <div class="flex flex-col items-center text-center mb-2">
                  <div class="bg-primary-100 w-20 h-20 rounded-full mb-4"></div>
                  <div class="bg-primary-100 px-4 py-2 rounded">Centered Content</div>
                </div>
                <code class="text-xs">flex flex-col items-center</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Best Practices -->
    <section>
      <h2 class="text-2xl font-bold mb-6">Layout Best Practices</h2>
      
      <div class="bg-white rounded-lg shadow-sm p-8">
        <div class="space-y-6">
          <div>
            <h3 class="font-semibold mb-3">Mobile-First Design</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Beginne mit dem Mobile-Layout und erweitere für größere Screens</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Nutze responsive Utilities wie <code class="bg-gray-100 px-2 py-0.5 rounded text-sm">md:</code> und <code class="bg-gray-100 px-2 py-0.5 rounded text-sm">lg:</code></span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Teste auf verschiedenen Bildschirmgrößen</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold mb-3">Konsistente Abstände</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Verwende die Spacing-Scale konsistent (4, 8, 12, 16, 24, 32...)</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Nutze <code class="bg-gray-100 px-2 py-0.5 rounded text-sm">space-y-*</code> und <code class="bg-gray-100 px-2 py-0.5 rounded text-sm">space-x-*</code> für gleichmäßige Abstände</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Halte vertikale Rhythmen ein</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold mb-3">Grid vs. Flexbox</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start gap-2">
                <Icon icon="mdi:info" class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Grid für 2D-Layouts (Zeilen und Spalten)</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:info" class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Flexbox für 1D-Layouts (entweder Zeile oder Spalte)</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:info" class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Kombiniere beide für komplexe Layouts</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>