<script lang="ts">
  import Icon from '@iconify/svelte';

  const fontFamilies = [
    { 
      name: 'Source Sans Pro', 
      class: 'font-source-sans', 
      usage: 'Standard-Schriftart für alle Texte',
      sample: 'Die Internationale Gesellschaft für Krishna-Bewusstsein'
    },
    { 
      name: 'Crimson Text', 
      class: 'font-spiritual', 
      usage: 'Für spirituelle Texte und Zitate',
      sample: 'Hare Krishna Hare Krishna Krishna Krishna Hare Hare'
    },
    { 
      name: 'Adobe Garamond Pro', 
      class: 'font-garamond', 
      usage: 'Für elegante Überschriften',
      sample: 'Bhagavad-gītā wie sie ist'
    },
    { 
      name: 'Noto Sans Devanagari', 
      class: 'font-sanskrit', 
      usage: 'Für Sanskrit-Texte',
      sample: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे'
    }
  ];

  const headingSizes = [
    { tag: 'h1', class: 'text-5xl md:text-6xl', size: '48px / 60px', weight: 'font-bold' },
    { tag: 'h2', class: 'text-4xl md:text-5xl', size: '36px / 48px', weight: 'font-bold' },
    { tag: 'h3', class: 'text-3xl md:text-4xl', size: '30px / 36px', weight: 'font-semibold' },
    { tag: 'h4', class: 'text-2xl md:text-3xl', size: '24px / 30px', weight: 'font-semibold' },
    { tag: 'h5', class: 'text-xl md:text-2xl', size: '20px / 24px', weight: 'font-medium' },
    { tag: 'h6', class: 'text-lg md:text-xl', size: '18px / 20px', weight: 'font-medium' }
  ];

  const textSizes = [
    { name: 'Extra Small', class: 'text-xs', size: '12px', lineHeight: '1rem' },
    { name: 'Small', class: 'text-sm', size: '14px', lineHeight: '1.25rem' },
    { name: 'Base', class: 'text-base', size: '16px', lineHeight: '1.5rem' },
    { name: 'Large', class: 'text-lg', size: '18px', lineHeight: '1.75rem' },
    { name: 'Extra Large', class: 'text-xl', size: '20px', lineHeight: '1.75rem' },
    { name: '2XL', class: 'text-2xl', size: '24px', lineHeight: '2rem' },
    { name: '3XL', class: 'text-3xl', size: '30px', lineHeight: '2.25rem' },
    { name: '4XL', class: 'text-4xl', size: '36px', lineHeight: '2.5rem' }
  ];

  const fontWeights = [
    { name: 'Thin', class: 'font-thin', weight: '100' },
    { name: 'Extra Light', class: 'font-extralight', weight: '200' },
    { name: 'Light', class: 'font-light', weight: '300' },
    { name: 'Normal', class: 'font-normal', weight: '400' },
    { name: 'Medium', class: 'font-medium', weight: '500' },
    { name: 'Semibold', class: 'font-semibold', weight: '600' },
    { name: 'Bold', class: 'font-bold', weight: '700' },
    { name: 'Extra Bold', class: 'font-extrabold', weight: '800' },
    { name: 'Black', class: 'font-black', weight: '900' }
  ];

  const lineHeights = [
    { name: 'None', class: 'leading-none', value: '1' },
    { name: 'Tight', class: 'leading-tight', value: '1.25' },
    { name: 'Snug', class: 'leading-snug', value: '1.375' },
    { name: 'Normal', class: 'leading-normal', value: '1.5' },
    { name: 'Relaxed', class: 'leading-relaxed', value: '1.625' },
    { name: 'Loose', class: 'leading-loose', value: '2' }
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
  <title>Typografie - ISKCON Design System</title>
  <meta name="description" content="Schriftarten, Größen und Typografie-Richtlinien für das ISKCON Deutschland Design System" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <!-- Header -->
  <header class="bg-white border-b border-gray-200">
    <div class="container mx-auto px-4 py-8">
      <div class="flex items-center gap-4 mb-4">
        <a href="/style" class="text-gray-500 hover:text-gray-700">
          <Icon icon="mdi:arrow-left" class="w-5 h-5" />
        </a>
        <h1 class="text-3xl font-bold">Typografie</h1>
      </div>
      <p class="text-gray-600 max-w-2xl">
        Konsistente Typografie für klare Kommunikation und professionelles Erscheinungsbild.
      </p>
    </div>
  </header>

  <div class="container mx-auto px-4 py-12">
    <!-- Font Families -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Schriftarten</h2>
      
      <div class="space-y-6">
        {#each fontFamilies as font}
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="font-semibold text-lg">{font.name}</h3>
                <p class="text-sm text-gray-600">{font.usage}</p>
              </div>
              <button
                on:click={() => copyToClipboard(font.class)}
                class="text-sm text-primary-500 hover:text-primary-600"
              >
                {copiedClass === font.class ? 'Kopiert!' : font.class}
              </button>
            </div>
            <p class={`${font.class} text-2xl`}>{font.sample}</p>
          </div>
        {/each}
      </div>
    </section>

    <!-- Headings -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Überschriften-Hierarchie</h2>
      
      <div class="bg-white rounded-lg shadow-sm p-8 space-y-6">
        {#each headingSizes as heading}
          <div class="border-b border-gray-100 pb-6 last:border-0">
            <div class="flex items-baseline justify-between mb-2">
              <div class="flex items-baseline gap-4">
                <span class="text-sm font-mono text-gray-500 uppercase">{heading.tag}</span>
                <span class="text-sm text-gray-500">{heading.size}</span>
              </div>
              <button
                on:click={() => copyToClipboard(`${heading.class} ${heading.weight}`)}
                class="text-sm text-primary-500 hover:text-primary-600"
              >
                {copiedClass === `${heading.class} ${heading.weight}` ? 'Kopiert!' : `${heading.class} ${heading.weight}`}
              </button>
            </div>
            <p class={`${heading.class} ${heading.weight}`}>
              {heading.tag === 'h1' && 'Die Wissenschaft der Selbstverwirklichung'}
              {heading.tag === 'h2' && 'Einführung in die Bhagavad-gītā'}
              {heading.tag === 'h3' && 'Das Krishna-Bewusstsein verstehen'}
              {heading.tag === 'h4' && 'Praktische Spiritualität im Alltag'}
              {heading.tag === 'h5' && 'Meditation und Mantra-Praxis'}
              {heading.tag === 'h6' && 'Tägliche spirituelle Übungen'}
            </p>
          </div>
        {/each}
      </div>
    </section>

    <!-- Text Sizes -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Text-Größen</h2>
      
      <div class="bg-white rounded-lg shadow-sm p-8">
        <div class="space-y-4">
          {#each textSizes as size}
            <div class="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div class="flex-1">
                <p class={size.class}>
                  Das Krishna-Bewusstsein ist die höchste Wissenschaft der Seele.
                </p>
              </div>
              <div class="flex items-center gap-4 ml-8">
                <span class="text-sm text-gray-500 whitespace-nowrap">{size.name} ({size.size})</span>
                <button
                  on:click={() => copyToClipboard(size.class)}
                  class="text-sm text-primary-500 hover:text-primary-600 font-mono"
                >
                  {copiedClass === size.class ? 'Kopiert!' : size.class}
                </button>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- Font Weights -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Schriftstärken</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each fontWeights as weight}
          <div class="bg-white rounded-lg shadow-sm p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-gray-500">{weight.name} ({weight.weight})</span>
              <button
                on:click={() => copyToClipboard(weight.class)}
                class="text-xs text-primary-500 hover:text-primary-600"
              >
                {copiedClass === weight.class ? 'Kopiert!' : weight.class}
              </button>
            </div>
            <p class={`text-lg ${weight.class}`}>Krishna-Bewusstsein</p>
          </div>
        {/each}
      </div>
    </section>

    <!-- Line Heights -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Zeilenhöhen</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#each lineHeights as lineHeight}
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-semibold">{lineHeight.name} ({lineHeight.value})</h3>
              <button
                on:click={() => copyToClipboard(lineHeight.class)}
                class="text-sm text-primary-500 hover:text-primary-600"
              >
                {copiedClass === lineHeight.class ? 'Kopiert!' : lineHeight.class}
              </button>
            </div>
            <p class={`text-base ${lineHeight.class}`}>
              Die Bhagavad-gītā ist eines der wichtigsten spirituellen Werke der Menschheit. 
              Sie enthält die zeitlose Weisheit des Krishna-Bewusstseins und zeigt den Weg 
              zur Selbstverwirklichung und spirituellen Erfüllung.
            </p>
          </div>
        {/each}
      </div>
    </section>

    <!-- Typography Examples -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Anwendungsbeispiele</h2>
      
      <div class="space-y-8">
        <!-- Article Example -->
        <div class="bg-white rounded-lg shadow-sm p-8">
          <h3 class="text-2xl font-bold mb-4">Artikel-Layout</h3>
          <article class="prose prose-lg max-w-none">
            <h1 class="text-4xl font-bold mb-6">Die Philosophie des Krishna-Bewusstseins</h1>
            <p class="text-lg text-gray-600 mb-8 leading-relaxed">
              Eine Einführung in die zeitlose Weisheit der vedischen Schriften und ihre praktische 
              Anwendung im modernen Leben.
            </p>
            <h2 class="text-2xl font-semibold mt-8 mb-4">Die Seele verstehen</h2>
            <p class="text-base leading-relaxed mb-4">
              Gemäß der Bhagavad-gītā ist die Seele (ātmā) ewig, unzerstörbar und voller Wissen. 
              Sie ist verschieden vom vergänglichen materiellen Körper und Geist.
            </p>
            <blockquote class="border-l-4 border-primary-500 pl-6 my-6 italic font-spiritual text-lg">
              "Für die Seele gibt es weder Geburt noch Tod. Sie ist ungeboren, ewig, immerwährend 
              und urerst. Sie wird nicht getötet, wenn der Körper getötet wird."
              <cite class="block text-sm mt-2 not-italic font-normal">— Bhagavad-gītā 2.20</cite>
            </blockquote>
          </article>
        </div>

        <!-- Card Example -->
        <div class="bg-white rounded-lg shadow-sm p-8">
          <h3 class="text-2xl font-bold mb-4">Karten-Design</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="border border-gray-200 rounded-lg p-6">
              <h4 class="text-lg font-semibold mb-2">Bhakti-Yoga</h4>
              <p class="text-sm text-gray-600 leading-relaxed">
                Der Pfad der liebevollen Hingabe zu Krishna durch spirituelle Praxis.
              </p>
            </div>
            <div class="border border-gray-200 rounded-lg p-6">
              <h4 class="text-lg font-semibold mb-2">Karma-Yoga</h4>
              <p class="text-sm text-gray-600 leading-relaxed">
                Handeln ohne Anhaftung an die Früchte der Tätigkeit.
              </p>
            </div>
            <div class="border border-gray-200 rounded-lg p-6">
              <h4 class="text-lg font-semibold mb-2">Jñāna-Yoga</h4>
              <p class="text-sm text-gray-600 leading-relaxed">
                Der Pfad des Wissens und der philosophischen Unterscheidung.
              </p>
            </div>
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
            <h3 class="font-semibold mb-3">Lesbarkeit</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Verwende ausreichend Zeilenabstand (leading-relaxed) für längere Texte</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Begrenze die Zeilenlänge auf 65-75 Zeichen für optimale Lesbarkeit</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Nutze ausreichend Kontrast zwischen Text und Hintergrund</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold mb-3">Hierarchie</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Verwende klare Größenunterschiede zwischen Hierarchiestufen</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Kombiniere Größe, Gewicht und Farbe für visuelle Hierarchie</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Halte die Hierarchie konsistent über alle Seiten</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold mb-3">Schriftarten</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start gap-2">
                <Icon icon="mdi:info" class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Source Sans Pro für allgemeine Texte und UI-Elemente</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:info" class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Crimson Text für spirituelle Zitate und besondere Texte</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:info" class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Noto Sans Devanagari ausschließlich für Sanskrit-Texte</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>