<script lang="ts">
  import Icon from '@iconify/svelte';
  
  // Types
  export interface Concept {
    title: string;
    subtitle?: string;
    icon: string;
    description?: string;
    details?: Record<string, any>;
    color?: string;
  }
  
  // Props
  export let concepts: Concept[];
  export let title: string = '';
  export let subtitle: string = '';
  export let selectedIndex: number = 0;
</script>

{#if title || subtitle}
<div class="text-center mb-12">
  {#if title}
    <h2 class="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
  {/if}
  {#if subtitle}
    <p class="text-xl text-gray-700 max-w-3xl mx-auto">{subtitle}</p>
  {/if}
</div>
{/if}

<!-- Concept Selector Buttons -->
<div class="flex flex-wrap justify-center gap-4 mb-12">
  {#each concepts as concept, index}
    <button
      on:click={() => selectedIndex = index}
      class="px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2
             {selectedIndex === index 
               ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg scale-105' 
               : 'bg-white text-gray-700 shadow-md hover:shadow-lg'}"
    >
      <Icon icon={concept.icon} class="w-5 h-5" />
      {concept.title}
    </button>
  {/each}
</div>

<!-- Concept Display -->
<div class="max-w-4xl mx-auto">
  <div class="bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-xl overflow-hidden border border-primary-500/20">
    <div class="p-8 md:p-12">
      <div class="flex items-start gap-4 mb-6">
        <div class="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center flex-shrink-0">
          <Icon icon={concepts[selectedIndex].icon} class="w-8 h-8 text-primary-500" />
        </div>
        <div>
          <h3 class="text-2xl font-bold mb-2">{concepts[selectedIndex].title}</h3>
          {#if concepts[selectedIndex].subtitle}
            <p class="text-lg text-gray-600">{concepts[selectedIndex].subtitle}</p>
          {/if}
          {#if concepts[selectedIndex].description}
            <p class="text-gray-700 mt-2">{concepts[selectedIndex].description}</p>
          {/if}
        </div>
      </div>
      
      {#if concepts[selectedIndex].details}
        <div class="space-y-6">
          {#each Object.entries(concepts[selectedIndex].details) as [key, value]}
            <div>
              <h4 class="font-semibold text-gray-800 mb-2 capitalize">{key}:</h4>
              {#if Array.isArray(value)}
                <ul class="space-y-2">
                  {#each value as item}
                    <li class="flex items-start gap-2">
                      <Icon icon="mdi:circle-small" class="w-5 h-5 text-primary-500/60 mt-0.5" />
                      <span class="text-gray-600">{item}</span>
                    </li>
                  {/each}
                </ul>
              {:else if typeof value === 'object'}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {#each Object.entries(value) as [subKey, subValue]}
                    <div>
                      <h5 class="font-medium text-gray-700">{subKey}:</h5>
                      <p class="text-sm text-gray-600">{subValue}</p>
                    </div>
                  {/each}
                </div>
              {:else}
                <p class="text-gray-600">{value}</p>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
      
      <slot />
    </div>
  </div>
</div>