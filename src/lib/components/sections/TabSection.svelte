<script lang="ts">
  import Icon from '@iconify/svelte';
  
  export interface Tab {
    id: string;
    label: string;
    icon?: string;
  }
  
  export let tabs: Tab[];
  export let activeTab: string = tabs[0]?.id || '';
  export let variant: 'default' | 'pills' | 'underline' = 'default';
  export let centered: boolean = true;
</script>

<div class="{centered ? 'flex justify-center' : ''} mb-8">
  {#if variant === 'pills'}
    <div class="flex flex-wrap gap-4">
      {#each tabs as tab}
        <button
          on:click={() => activeTab = tab.id}
          class="px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2
                 {activeTab === tab.id 
                   ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg scale-105' 
                   : 'bg-white text-gray-700 shadow-md hover:shadow-lg'}"
        >
          {#if tab.icon}
            <Icon icon={tab.icon} class="w-5 h-5" />
          {/if}
          {tab.label}
        </button>
      {/each}
    </div>
  {:else if variant === 'underline'}
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-8">
        {#each tabs as tab}
          <button
            on:click={() => activeTab = tab.id}
            class="py-2 px-1 border-b-2 font-medium text-sm transition-colors
                   {activeTab === tab.id
                     ? 'border-primary-500 text-primary-500'
                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
          >
            {#if tab.icon}
              <Icon icon={tab.icon} class="inline w-5 h-5 mr-2" />
            {/if}
            {tab.label}
          </button>
        {/each}
      </nav>
    </div>
  {:else}
    <div class="bg-gray-100 p-1 rounded-lg inline-flex">
      {#each tabs as tab}
        <button
          on:click={() => activeTab = tab.id}
          class="px-6 py-2 rounded-md font-medium transition-all
                 {activeTab === tab.id
                   ? 'bg-white text-gray-900 shadow-sm'
                   : 'text-gray-600 hover:text-gray-900'}"
        >
          {#if tab.icon}
            <Icon icon={tab.icon} class="inline w-5 h-5 mr-2" />
          {/if}
          {tab.label}
        </button>
      {/each}
    </div>
  {/if}
</div>

<!-- Tab Content -->
<div class="tab-content">
  <slot {activeTab} />
</div>