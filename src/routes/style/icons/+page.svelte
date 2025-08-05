<script lang="ts">
  import Icon from '@iconify/svelte';

  const iconCategories = [
    {
      name: 'Navigation',
      icons: [
        { icon: 'mdi:menu', name: 'Menu' },
        { icon: 'mdi:close', name: 'Close' },
        { icon: 'mdi:arrow-left', name: 'Arrow Left' },
        { icon: 'mdi:arrow-right', name: 'Arrow Right' },
        { icon: 'mdi:chevron-down', name: 'Chevron Down' },
        { icon: 'mdi:chevron-up', name: 'Chevron Up' },
        { icon: 'mdi:chevron-left', name: 'Chevron Left' },
        { icon: 'mdi:chevron-right', name: 'Chevron Right' },
        { icon: 'mdi:home', name: 'Home' },
        { icon: 'mdi:magnify', name: 'Search' }
      ]
    },
    {
      name: 'Spirituell',
      icons: [
        { icon: 'mdi:om', name: 'Om' },
        { icon: 'mdi:flower-tulip', name: 'Lotus (Tulpe)' },
        { icon: 'mdi:white-balance-sunny', name: 'Sonne' },
        { icon: 'mdi:meditation', name: 'Meditation' },
        { icon: 'mdi:hands-pray', name: 'Betende Hände' },
        { icon: 'mdi:temple-buddhist', name: 'Tempel' },
        { icon: 'mdi:dharmachakra', name: 'Dharmachakra' },
        { icon: 'mdi:peace', name: 'Frieden' },
        { icon: 'mdi:leaf', name: 'Blatt' },
        { icon: 'mdi:heart', name: 'Herz' }
      ]
    },
    {
      name: 'Aktionen',
      icons: [
        { icon: 'mdi:plus', name: 'Plus' },
        { icon: 'mdi:minus', name: 'Minus' },
        { icon: 'mdi:check', name: 'Check' },
        { icon: 'mdi:close-circle', name: 'Close Circle' },
        { icon: 'mdi:pencil', name: 'Edit' },
        { icon: 'mdi:delete', name: 'Delete' },
        { icon: 'mdi:download', name: 'Download' },
        { icon: 'mdi:upload', name: 'Upload' },
        { icon: 'mdi:share', name: 'Share' },
        { icon: 'mdi:content-copy', name: 'Copy' }
      ]
    },
    {
      name: 'Kommunikation',
      icons: [
        { icon: 'mdi:email', name: 'Email' },
        { icon: 'mdi:phone', name: 'Phone' },
        { icon: 'mdi:message', name: 'Message' },
        { icon: 'mdi:chat', name: 'Chat' },
        { icon: 'mdi:forum', name: 'Forum' },
        { icon: 'mdi:comment', name: 'Comment' },
        { icon: 'mdi:bell', name: 'Notification' },
        { icon: 'mdi:send', name: 'Send' },
        { icon: 'mdi:whatsapp', name: 'WhatsApp' },
        { icon: 'mdi:facebook', name: 'Facebook' }
      ]
    },
    {
      name: 'Information',
      icons: [
        { icon: 'mdi:information', name: 'Info' },
        { icon: 'mdi:help-circle', name: 'Help' },
        { icon: 'mdi:alert-circle', name: 'Alert' },
        { icon: 'mdi:alert', name: 'Warning' },
        { icon: 'mdi:check-circle', name: 'Success' },
        { icon: 'mdi:clock', name: 'Time' },
        { icon: 'mdi:calendar', name: 'Calendar' },
        { icon: 'mdi:map-marker', name: 'Location' },
        { icon: 'mdi:tag', name: 'Tag' },
        { icon: 'mdi:bookmark', name: 'Bookmark' }
      ]
    },
    {
      name: 'Medien',
      icons: [
        { icon: 'mdi:play', name: 'Play' },
        { icon: 'mdi:pause', name: 'Pause' },
        { icon: 'mdi:stop', name: 'Stop' },
        { icon: 'mdi:skip-next', name: 'Next' },
        { icon: 'mdi:skip-previous', name: 'Previous' },
        { icon: 'mdi:volume-high', name: 'Volume' },
        { icon: 'mdi:image', name: 'Image' },
        { icon: 'mdi:video', name: 'Video' },
        { icon: 'mdi:music', name: 'Music' },
        { icon: 'mdi:microphone', name: 'Microphone' }
      ]
    },
    {
      name: 'Benutzer',
      icons: [
        { icon: 'mdi:account', name: 'Account' },
        { icon: 'mdi:account-group', name: 'Group' },
        { icon: 'mdi:account-circle', name: 'Profile' },
        { icon: 'mdi:login', name: 'Login' },
        { icon: 'mdi:logout', name: 'Logout' },
        { icon: 'mdi:account-plus', name: 'Add User' },
        { icon: 'mdi:account-edit', name: 'Edit User' },
        { icon: 'mdi:shield-account', name: 'Admin' },
        { icon: 'mdi:badge-account', name: 'Badge' },
        { icon: 'mdi:account-heart', name: 'Favorite' }
      ]
    },
    {
      name: 'Dokumente',
      icons: [
        { icon: 'mdi:file', name: 'File' },
        { icon: 'mdi:file-document', name: 'Document' },
        { icon: 'mdi:file-pdf-box', name: 'PDF' },
        { icon: 'mdi:folder', name: 'Folder' },
        { icon: 'mdi:folder-open', name: 'Folder Open' },
        { icon: 'mdi:book', name: 'Book' },
        { icon: 'mdi:book-open-page-variant', name: 'Book Open' },
        { icon: 'mdi:newspaper', name: 'News' },
        { icon: 'mdi:script-text', name: 'Script' },
        { icon: 'mdi:library', name: 'Library' }
      ]
    }
  ];

  const iconSizes = [
    { name: 'Extra Small', class: 'w-3 h-3', size: '12px' },
    { name: 'Small', class: 'w-4 h-4', size: '16px' },
    { name: 'Medium', class: 'w-5 h-5', size: '20px' },
    { name: 'Large', class: 'w-6 h-6', size: '24px' },
    { name: 'Extra Large', class: 'w-8 h-8', size: '32px' },
    { name: 'Huge', class: 'w-12 h-12', size: '48px' }
  ];

  let copiedIcon = '';
  let selectedSize = 'w-5 h-5';

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    copiedIcon = text;
    setTimeout(() => {
      copiedIcon = '';
    }, 2000);
  }
</script>

<svelte:head>
  <title>Icons - ISKCON Design System</title>
  <meta name="description" content="Icon-Bibliothek und Verwendungsrichtlinien für das ISKCON Deutschland Design System" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
  <!-- Header -->
  <header class="bg-white border-b border-gray-200">
    <div class="container mx-auto px-4 py-8">
      <div class="flex items-center gap-4 mb-4">
        <a href="/style" class="text-gray-500 hover:text-gray-700">
          <Icon icon="mdi:arrow-left" class="w-5 h-5" />
        </a>
        <h1 class="text-3xl font-bold">Icon-Bibliothek</h1>
      </div>
      <p class="text-gray-600 max-w-2xl">
        Icons aus der @iconify/svelte Bibliothek mit Material Design Icons (MDI).
      </p>
    </div>
  </header>

  <div class="container mx-auto px-4 py-12">
    <!-- Size Selector -->
    <section class="mb-8">
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-lg font-semibold mb-4">Icon-Größe auswählen</h2>
        <div class="flex flex-wrap gap-3">
          {#each iconSizes as size}
            <button
              on:click={() => selectedSize = size.class}
              class="px-4 py-2 rounded-lg border-2 transition-colors {selectedSize === size.class ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 hover:border-gray-300'}"
            >
              <div class="flex items-center gap-2">
                <Icon icon="mdi:square" class={size.class} />
                <span class="text-sm">{size.name} ({size.size})</span>
              </div>
            </button>
          {/each}
        </div>
      </div>
    </section>

    <!-- Icon Categories -->
    {#each iconCategories as category}
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-6">{category.name}</h2>
        
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {#each category.icons as iconItem}
            <button
              on:click={() => copyToClipboard(`<Icon icon="${iconItem.icon}" class="${selectedSize}" />`)}
              class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow group relative"
            >
              <div class="flex flex-col items-center gap-3">
                <Icon icon={iconItem.icon} class={`${selectedSize} text-gray-700 group-hover:text-primary-500 transition-colors`} />
                <span class="text-sm text-gray-600">{iconItem.name}</span>
                <code class="text-xs text-gray-400 font-mono">{iconItem.icon}</code>
              </div>
              
              {#if copiedIcon === `<Icon icon="${iconItem.icon}" class="${selectedSize}" />`}
                <div class="absolute inset-0 bg-primary-500 rounded-lg flex items-center justify-center">
                  <span class="text-white font-medium">Kopiert!</span>
                </div>
              {/if}
            </button>
          {/each}
        </div>
      </section>
    {/each}

    <!-- Usage Examples -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6">Verwendungsbeispiele</h2>
      
      <div class="bg-white rounded-lg shadow-sm p-8">
        <div class="space-y-8">
          <!-- Basic Usage -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Basis-Verwendung</h3>
            <div class="bg-gray-50 p-4 rounded-lg mb-4">
              <code class="text-sm">
                {`<Icon icon="mdi:heart" class="w-5 h-5" />`}
              </code>
            </div>
            <div class="flex items-center gap-2">
              <Icon icon="mdi:heart" class="w-5 h-5" />
              <span class="text-gray-600">Standard Icon</span>
            </div>
          </div>

          <!-- With Colors -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Mit Farben</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-4">
                <Icon icon="mdi:check-circle" class="w-5 h-5 text-green-500" />
                <code class="text-sm bg-gray-50 px-3 py-1 rounded">text-green-500</code>
              </div>
              <div class="flex items-center gap-4">
                <Icon icon="mdi:alert-circle" class="w-5 h-5 text-red-500" />
                <code class="text-sm bg-gray-50 px-3 py-1 rounded">text-red-500</code>
              </div>
              <div class="flex items-center gap-4">
                <Icon icon="mdi:information" class="w-5 h-5 text-blue-500" />
                <code class="text-sm bg-gray-50 px-3 py-1 rounded">text-blue-500</code>
              </div>
              <div class="flex items-center gap-4">
                <Icon icon="mdi:om" class="w-5 h-5 text-primary-500" />
                <code class="text-sm bg-gray-50 px-3 py-1 rounded">text-primary-500</code>
              </div>
            </div>
          </div>

          <!-- In Buttons -->
          <div>
            <h3 class="text-lg font-semibold mb-4">In Buttons</h3>
            <div class="flex flex-wrap gap-3">
              <button class="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                <Icon icon="mdi:download" class="w-5 h-5" />
                Download
              </button>
              <button class="inline-flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-gray-400">
                <Icon icon="mdi:share" class="w-5 h-5" />
                Teilen
              </button>
              <button class="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                <Icon icon="mdi:delete" class="w-5 h-5" />
                Löschen
              </button>
            </div>
          </div>

          <!-- Animated -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Animierte Icons</h3>
            <div class="flex items-center gap-6">
              <div class="text-center">
                <Icon icon="mdi:loading" class="w-8 h-8 text-primary-500 animate-spin" />
                <p class="text-sm text-gray-600 mt-2">animate-spin</p>
              </div>
              <div class="text-center">
                <Icon icon="mdi:heart" class="w-8 h-8 text-red-500 animate-pulse" />
                <p class="text-sm text-gray-600 mt-2">animate-pulse</p>
              </div>
              <div class="text-center">
                <Icon icon="mdi:bell" class="w-8 h-8 text-yellow-500 animate-bounce" />
                <p class="text-sm text-gray-600 mt-2">animate-bounce</p>
              </div>
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
            <h3 class="font-semibold mb-3">Icon-Auswahl</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Verwende konsistente Icons aus der gleichen Icon-Familie (MDI)</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Wähle Icons, die ihre Funktion klar kommunizieren</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Nutze gefüllte Icons für primäre Aktionen, Outline für sekundäre</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold mb-3">Größen</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start gap-2">
                <Icon icon="mdi:info" class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>w-3 h-3 (12px) - Für sehr kleine UI-Elemente</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:info" class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>w-5 h-5 (20px) - Standard-Größe für die meisten Anwendungen</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:info" class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>w-8 h-8 (32px) oder größer - Für Hero-Sections und große Buttons</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold mb-3">Barrierefreiheit</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Verwende Icons nie als einziges Kommunikationsmittel</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Füge beschreibenden Text oder Tooltips hinzu</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon icon="mdi:check" class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Stelle ausreichenden Farbkontrast sicher</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>