<script lang="ts">
  import { cubicInOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  import Icon from '@iconify/svelte';

  export let menuItems: Array<{
    title: string;
    slug: string;
    icon: string;
    sections?: Array<{
      title: string;
      items: Array<{
        title: string;
        slug: string;
        description?: string;
        subtitle?: string;
        icon?: string;
      }>;
    }>;
    featured?: {
      title: string;
      description: string;
      image?: string;
      href: string;
    };
  }> = [];

  let activeMenu = '';
  let timeoutId: NodeJS.Timeout | null = null;
  let isMenuHovered = false;
  let menuPositionClass = 'left-1/2 -translate-x-1/2';
  
  // Tracking für den Mausweg
  let lastMouseX = 0;
  let lastMouseY = 0;
  
  // Dynamische Positionierung
  function getMenuPosition(element: HTMLElement): string {
    const rect = element.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const elementCenter = rect.left + rect.width / 2;
    const relativePosition = elementCenter / windowWidth;
    
    if (relativePosition > 0.75) {
      return 'right-0';
    } else if (relativePosition < 0.25) {
      return 'left-0';
    } else {
      return 'left-1/2 -translate-x-1/2';
    }
  }
  
  // Verbesserte Hover-Logik mit Delay
  function handleMouseEnter(slug: string, event: MouseEvent) {
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    
    // Update mouse position
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
    
    // Set position class
    const target = event.currentTarget as HTMLElement;
    menuPositionClass = getMenuPosition(target);
    
    // Wenn bereits ein anderes Menü offen ist, sofort wechseln
    if (activeMenu && activeMenu !== slug) {
      activeMenu = slug;
    } else if (!activeMenu) {
      // Kleines Delay beim ersten Öffnen für bessere UX
      timeoutId = setTimeout(() => {
        activeMenu = slug;
      }, 50);
    }
  }

  function handleMouseLeave(event: MouseEvent) {
    // Track mouse position
    const currentX = event.clientX;
    const currentY = event.clientY;
    
    // Clear existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    // Prüfe ob die Maus in Richtung des Dropdowns bewegt wird
    const movingTowardsDropdown = event.relatedTarget && 
      (event.relatedTarget as HTMLElement).closest('.mega-menu-dropdown');
    
    if (!movingTowardsDropdown && !isMenuHovered) {
      // Längeres Delay für stabileres Verhalten
      timeoutId = setTimeout(() => {
        if (!isMenuHovered) {
          activeMenu = '';
        }
      }, 300);
    }
  }

  function handleDropdownEnter() {
    isMenuHovered = true;
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }

  function handleDropdownLeave(event: MouseEvent) {
    isMenuHovered = false;
    
    // Prüfe ob die Maus zurück zum Trigger geht
    const movingToTrigger = event.relatedTarget && 
      (event.relatedTarget as HTMLElement).closest('.mega-menu-trigger');
    
    if (!movingToTrigger) {
      timeoutId = setTimeout(() => {
        activeMenu = '';
      }, 200);
    }
  }

  // Keyboard navigation
  function handleKeyDown(event: KeyboardEvent, slug: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const target = event.currentTarget as HTMLElement;
      menuPositionClass = getMenuPosition(target);
      activeMenu = activeMenu === slug ? '' : slug;
    } else if (event.key === 'Escape') {
      activeMenu = '';
    }
  }
</script>

<style>
  /* Smooth pointer transitions */
  :global(.mega-menu-trigger) {
    cursor: pointer;
  }
  
  /* Invisible bridge to prevent menu from closing when moving cursor */
  :global(.hover-bridge) {
    position: absolute;
    height: 20px;
    width: 100%;
    top: 100%;
    z-index: 49;
    pointer-events: auto;
  }
</style>

<!-- IMPROVED MEGA MENU -->
<div class="flex items-center space-x-1 relative">
  {#each menuItems as item}
    <div class="relative mega-menu-container">
      {#if item.sections && item.sections.length > 0}
        <!-- HOVER CONTAINER -->
        <div
          class="relative mega-menu-trigger"
          on:mouseenter={(e) => handleMouseEnter(item.slug, e)}
          on:mouseleave={handleMouseLeave}
        >
          <!-- Trigger Button -->
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 px-4 py-2 text-foreground font-medium transition-all duration-200 ease-out hover:text-spiritual-saffron-700 hover:bg-spiritual-saffron-50 rounded-md {activeMenu === item.slug ? 'text-spiritual-saffron-700 bg-spiritual-saffron-50' : ''}"
            aria-expanded={activeMenu === item.slug}
            aria-haspopup="true"
            on:keydown={(e) => handleKeyDown(e, item.slug)}
          >
            <Icon icon={item.icon} class="w-4 h-4" />
            <span>{item.title}</span>
            <Icon
              icon="mdi:chevron-down"
              class="w-4 h-4 transition-transform duration-200 {activeMenu === item.slug ? 'rotate-180' : ''}"
            />
          </button>

          <!-- Invisible Bridge to maintain hover -->
          {#if activeMenu === item.slug}
            <div class="hover-bridge"></div>
          {/if}
        </div>

        <!-- Dropdown Content -->
        {#if activeMenu === item.slug}
          <div
            class="absolute top-full {menuPositionClass} z-50 mt-1 w-[800px] max-w-5xl min-w-[600px] mega-menu-dropdown"
            role="menu"
            tabindex="-1"
            in:fly={{ duration: 200, y: -10, opacity: 0, easing: cubicInOut }}
            out:fly={{ duration: 150, y: -10, opacity: 0, easing: cubicInOut }}
            on:mouseenter={handleDropdownEnter}
            on:mouseleave={handleDropdownLeave}
          >
            <div class="bg-white border border-gray-200 shadow-2xl rounded-xl overflow-hidden transform">
              <div class="p-6">
                <!-- Header -->
                <div class="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
                  <Icon icon={item.icon} class="w-5 h-5 text-spiritual-saffron-600" />
                  <h2 class="text-lg font-medium text-gray-900">{item.title}</h2>
                </div>

                <!-- Sections Grid -->
                <div class="grid gap-6" style="grid-template-columns: repeat({Math.min(item.sections.length, 3)}, minmax(0, 1fr))">
                  {#each item.sections as section}
                    <div class="space-y-3">
                      <h3 class="text-sm font-medium text-gray-600 uppercase tracking-wider">
                        {section.title}
                      </h3>
                      
                      <div class="space-y-1">
                        {#each section.items as navItem}
                          <a
                            href="/{navItem.slug}"
                            class="w-full inline-flex items-start gap-3 p-3 hover:bg-spiritual-saffron-50 hover:text-spiritual-saffron-700 group rounded-lg transition-all duration-150 ease-out"
                            on:click={() => { activeMenu = ''; }}
                            role="menuitem"
                          >
                            {#if navItem.icon}
                              <Icon
                                icon={navItem.icon}
                                class="w-4 h-4 text-spiritual-saffron-600 flex-shrink-0 mt-0.5 group-hover:text-spiritual-saffron-700 transition-colors duration-150"
                              />
                            {/if}
                            
                            <div class="flex-1 min-w-0 text-left">
                              <div class="font-medium text-gray-900 group-hover:text-spiritual-saffron-700 text-sm transition-colors duration-150">
                                {navItem.title}
                              </div>
                              
                              {#if navItem.subtitle || navItem.description}
                                <div class="text-xs text-gray-500 mt-1 group-hover:text-gray-600 transition-colors duration-150">
                                  {#if navItem.subtitle}
                                    {navItem.subtitle}
                                  {:else}
                                    {navItem.description}
                                  {/if}
                                </div>
                              {/if}
                            </div>
                          </a>
                        {/each}
                      </div>
                    </div>
                  {/each}
                </div>

                <!-- Featured Content -->
                {#if item.featured}
                  <div class="mt-6 pt-6 border-t border-gray-100">
                    <a 
                      href={item.featured.href}
                      class="block p-4 bg-gradient-to-r from-spiritual-saffron-50 to-spiritual-lotus-50 rounded-lg hover:from-spiritual-saffron-100 hover:to-spiritual-lotus-100 transition-all duration-200 ease-out group"
                      on:click={() => { activeMenu = ''; }}
                    >
                      <div class="flex items-center gap-4">
                        {#if item.featured.image}
                          <img 
                            src={item.featured.image} 
                            alt={item.featured.title}
                            class="w-12 h-12 rounded-lg object-cover"
                          />
                        {/if}
                        
                        <div class="flex-1">
                          <h4 class="font-medium text-gray-900 group-hover:text-spiritual-saffron-700 transition-colors duration-150">
                            {item.featured.title}
                          </h4>
                          <p class="text-sm text-gray-600 mt-1">
                            {item.featured.description}
                          </p>
                        </div>
                        
                        <Icon 
                          icon="mdi:arrow-right" 
                          class="w-5 h-5 text-spiritual-saffron-600 group-hover:text-spiritual-saffron-700 transform group-hover:translate-x-1 transition-all duration-200" 
                        />
                      </div>
                    </a>
                  </div>
                {/if}
              </div>
            </div>
          </div>
        {/if}
      {:else}
        <!-- Simple Link Item -->
        <a
          href="/{item.slug}"
          class="inline-flex items-center gap-2 px-4 py-2 text-foreground font-medium transition-all duration-200 ease-out hover:text-spiritual-saffron-700 hover:bg-spiritual-saffron-50 rounded-md"
        >
          <Icon icon={item.icon} class="w-4 h-4" />
          <span>{item.title}</span>
        </a>
      {/if}
    </div>
  {/each}
</div>