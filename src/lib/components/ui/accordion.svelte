<script lang="ts">
  import Icon from '@iconify/svelte';
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  
  export let items: Array<{
    id: string | number;
    title: string;
    subtitle?: string;
    icon?: string;
    content: any; // Can be string or component
    image?: string;
    [key: string]: any; // Allow additional properties
  }> = [];
  
  export let defaultOpen: number | null = 0;
  export let allowMultiple = false;
  export let className = '';
  
  let activeItems: Set<number> = new Set(defaultOpen !== null ? [defaultOpen] : []);
  
  function toggleItem(index: number) {
    if (allowMultiple) {
      if (activeItems.has(index)) {
        activeItems.delete(index);
      } else {
        activeItems.add(index);
      }
      activeItems = activeItems;
    } else {
      activeItems = activeItems.has(index) ? new Set() : new Set([index]);
    }
  }
  
  export function openItem(index: number) {
    if (allowMultiple) {
      activeItems.add(index);
    } else {
      activeItems = new Set([index]);
    }
  }
  
  export function closeItem(index: number) {
    activeItems.delete(index);
    activeItems = activeItems;
  }
  
  export function closeAll() {
    activeItems = new Set();
  }
</script>

<div class="accordion-container {className}">
  <div class="space-y-3">
    {#each items as item, index}
      <div class="rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg
                  {activeItems.has(index) ? 'bg-gray-50 shadow-lg' : 'bg-white'}">
        <!-- Accordion Header -->
        <button
          on:click={() => toggleItem(index)}
          class="w-full px-6 py-5 flex items-center justify-between text-left transition-colors duration-200
                 {activeItems.has(index) ? 'bg-gray-100' : 'hover:bg-gray-50'}"
        >
          <div class="flex items-center gap-4">
            {#if $$slots.badge}
              <slot name="badge" {item} {index} />
            {:else if item.id}
              <!-- Number Badge -->
              <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-gray-700">
                {typeof item.id === 'number' ? item.id : index + 1}
              </div>
            {/if}
            
            {#if item.icon}
              <!-- Icon -->
              <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Icon icon={item.icon} class="w-6 h-6 text-gray-600" />
              </div>
            {/if}
            
            <!-- Title -->
            <div>
              <h3 class="font-bold text-lg text-gray-900">{item.title}</h3>
              {#if item.subtitle}
                <p class="text-sm text-gray-600">{item.subtitle}</p>
              {/if}
            </div>
          </div>
          
          <!-- Chevron -->
          <Icon 
            icon="mdi:chevron-down" 
            class="w-6 h-6 text-primary-500/60 transition-all duration-300 {activeItems.has(index) ? 'rotate-180 text-primary-500' : ''}"
          />
        </button>
        
        <!-- Accordion Content -->
        {#if activeItems.has(index)}
          <div
            transition:slide={{ duration: 300, easing: quintOut }}
            class="px-6 pb-6 pt-2 bg-gray-50"
          >
            {#if $$slots.content}
              <slot name="content" {item} {index} />
            {:else if typeof item.content === 'string'}
              <div class="prose prose-lg max-w-none">
                {@html item.content}
              </div>
            {:else}
              {item.content}
            {/if}
          </div>
        {/if}
      </div>
    {/each}
  </div>
  
  {#if $$slots.footer}
    <div class="mt-8">
      <slot name="footer" />
    </div>
  {/if}
</div>

<style>
  .accordion-container {
    @apply w-full;
  }
</style>