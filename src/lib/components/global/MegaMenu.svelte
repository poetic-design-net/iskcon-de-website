<script lang="ts">
  import { cubicInOut } from 'svelte/easing';
  import { fly, fade } from 'svelte/transition';
  import Icon from '@iconify/svelte';

  export let menuItems: Array<{
    title: string;
    slug: string;
    icon: string;
    subtitle?: string;
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
  let arrowPosition = '50%';
  
  // Get the currently active menu item data
  $: activeMenuItem = menuItems.find(item => item.slug === activeMenu);
  
  // Check if any menu should be open
  $: isMenuOpen = activeMenu !== '' && activeMenuItem?.sections && activeMenuItem.sections.length > 0;
  
  // Verbesserte Hover-Logik mit Delay
  function handleMouseEnter(slug: string, event: MouseEvent) {
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    
    // Calculate arrow position based on nav item
    const target = event.currentTarget as HTMLElement;
    const navContainer = document.querySelector('.mega-menu-nav-container') as HTMLElement;
    if (navContainer) {
      const containerRect = navContainer.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const relativeCenter = targetRect.left + (targetRect.width / 2) - containerRect.left;
      arrowPosition = `${relativeCenter}px`;
    }
    
    // Sofort wechseln wenn bereits ein Menü offen ist
    if (activeMenu) {
      activeMenu = slug;
    } else {
      // Kleines Delay beim ersten Öffnen für bessere UX
      timeoutId = setTimeout(() => {
        activeMenu = slug;
      }, 50);
    }
  }

  function handleMouseLeave(event: MouseEvent) {
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
      
      // Calculate arrow position for keyboard navigation too
      const target = event.currentTarget as HTMLElement;
      const navContainer = document.querySelector('.mega-menu-nav-container') as HTMLElement;
      if (navContainer) {
        const containerRect = navContainer.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const relativeCenter = targetRect.left + (targetRect.width / 2) - containerRect.left;
        arrowPosition = `${relativeCenter}px`;
      }
      
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
<div class="flex items-center space-x-1 relative mega-menu-nav-container">
  {#each menuItems as item}
    <div class="static">
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
            class="inline-flex items-center justify-center gap-2 px-4 py-2 text-foreground font-medium transition-all duration-200 ease-out hover:text-primary-500 hover:bg-primary-500/10 rounded-md {activeMenu === item.slug ? 'text-primary-500 bg-primary-500/10' : ''}"
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
      {:else}
        <!-- Simple Link Item -->
        <a
          href="/{item.slug}"
          class="inline-flex items-center gap-2 px-4 py-2 text-foreground font-medium transition-all duration-200 ease-out hover:text-primary-500 hover:bg-primary-500/10 rounded-md"
        >
          <Icon icon={item.icon} class="w-4 h-4" />
          <span>{item.title}</span>
        </a>
      {/if}
    </div>
  {/each}
  
  <!-- Single Dropdown Container that stays open and changes content -->
  {#if isMenuOpen}
    <div
      class="absolute top-full left-0 right-0 z-50 mt-1 w-full mega-menu-dropdown"
      role="menu"
      tabindex="-1"
      in:fly={{ duration: 200, y: -10, opacity: 0, easing: cubicInOut }}
      out:fly={{ duration: 150, y: -10, opacity: 0, easing: cubicInOut }}
      on:mouseenter={handleDropdownEnter}
      on:mouseleave={handleDropdownLeave}
    >
      <!-- Arrow Indicator (animates position) -->
      <div 
        class="absolute -top-2 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45 z-10 transition-all duration-150"
        style="left: {arrowPosition}; margin-left: -8px;"
      ></div>
      
      <div class="bg-white border border-gray-200 shadow-2xl rounded-xl overflow-hidden transform relative">
        <!-- Content wrapper without fixed height - let content determine it -->
        <div class="relative">
          <!-- Show all menu contents but only display the active one -->
          {#each menuItems.filter(item => item.sections && item.sections.length > 0) as menuItem}
            <div 
              class="p-6 {activeMenu === menuItem.slug ? 'relative' : 'absolute inset-0'} transition-opacity duration-150"
              style="
                opacity: {activeMenu === menuItem.slug ? 1 : 0}; 
                pointer-events: {activeMenu === menuItem.slug ? 'auto' : 'none'}; 
                visibility: {activeMenu === menuItem.slug ? 'visible' : 'hidden'};
              "
            >
              <!-- Header -->
              <div class="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
                <Icon icon={menuItem.icon} class="w-5 h-5 text-primary-500" />
                <div>
                  <h2 class="text-lg font-medium text-gray-900">{menuItem.title}</h2>
                  {#if menuItem.subtitle}
                    <p class="text-sm text-gray-600 mt-0.5">{menuItem.subtitle}</p>
                  {/if}
                </div>
              </div>

              <!-- Sections Grid -->
              {#if menuItem.sections}
                <div class="grid gap-6" style="grid-template-columns: repeat({Math.min(menuItem.sections.length, 3)}, minmax(0, 1fr))">
                  {#each menuItem.sections as section}
                    <div class="space-y-3">
                      <h3 class="text-sm font-medium text-gray-600 uppercase tracking-wider">
                        {section.title}
                      </h3>
                      
                      <div class="space-y-1">
                        {#each section.items as navItem}
                          <a
                            href="/{navItem.slug}"
                            class="w-full inline-flex items-start gap-3 p-3 hover:bg-primary-500/10 hover:text-primary-500 group rounded-lg transition-colors duration-150"
                            on:click={() => { activeMenu = ''; }}
                            role="menuitem"
                          >
                            {#if navItem.icon}
                              <Icon
                                icon={navItem.icon}
                                class="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5 group-hover:text-primary-500/80 transition-colors duration-150"
                              />
                            {/if}
                            
                            <div class="flex-1 min-w-0 text-left">
                              <div class="font-medium text-gray-900 group-hover:text-primary-500 text-sm transition-colors duration-150">
                                {navItem.title}
                              </div>
                              
                              {#if navItem.subtitle || navItem.description}
                                <div class="text-xs text-gray-500 mt-1 group-hover:text-gray-600 transition-colors duration-150">
                                  {navItem.subtitle || navItem.description}
                                </div>
                              {/if}
                            </div>
                          </a>
                        {/each}
                      </div>
                    </div>
                  {/each}
                </div>
              {/if}

              <!-- Featured Content -->
              {#if menuItem.featured}
                <div class="mt-6 pt-6 border-t border-gray-100">
                  <a 
                    href={menuItem.featured.href}
                    class="block p-4 bg-gradient-to-r from-primary-500/10 to-gray-50 rounded-lg hover:from-primary-500/20 hover:to-gray-100 transition-all duration-200 ease-out group"
                    on:click={() => { activeMenu = ''; }}
                  >
                    <div class="flex items-center gap-4">
                      {#if menuItem.featured.image}
                        <img 
                          src={menuItem.featured.image} 
                          alt={menuItem.featured.title}
                          class="w-12 h-12 rounded-lg object-cover"
                        />
                      {/if}
                      
                      <div class="flex-1">
                        <h4 class="font-medium text-gray-900 group-hover:text-primary-500 transition-colors duration-150">
                          {menuItem.featured.title}
                        </h4>
                        <p class="text-sm text-gray-600 mt-1">
                          {menuItem.featured.description}
                        </p>
                      </div>
                      
                      <Icon 
                        icon="mdi:arrow-right" 
                        class="w-5 h-5 text-primary-500 group-hover:text-primary-500/80 transform group-hover:translate-x-1 transition-all duration-200" 
                      />
                    </div>
                  </a>
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}
</div>