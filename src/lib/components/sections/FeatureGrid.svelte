<script lang="ts">
  import Icon from '@iconify/svelte';
  
  // Types
  export interface Feature {
    title: string;
    subtitle?: string;
    description?: string;
    icon: string;
    iconBgColor?: string;
    link?: {
      href: string;
      text: string;
    };
  }
  
  // Props
  export let features: Feature[];
  export let title: string = '';
  export let subtitle: string = '';
  export let columns: 2 | 3 | 4 = 3;
  export let variant: 'default' | 'compact' | 'cards' = 'default';
  export let iconSize: 'small' | 'medium' | 'large' = 'medium';
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

<div class="grid grid-cols-1 md:grid-cols-{columns === 2 ? '2' : columns === 3 ? '3' : '4'} gap-6">
  {#each features as feature}
    {#if variant === 'cards'}
      <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div class="flex flex-col h-full">
          <div class="w-{iconSize === 'small' ? '12' : iconSize === 'medium' ? '16' : '20'} h-{iconSize === 'small' ? '12' : iconSize === 'medium' ? '16' : '20'} 
                      {feature.iconBgColor || 'bg-primary-500/10'} rounded-full flex items-center justify-center mb-4">
            <Icon icon={feature.icon} class="w-{iconSize === 'small' ? '6' : iconSize === 'medium' ? '8' : '10'} h-{iconSize === 'small' ? '6' : iconSize === 'medium' ? '8' : '10'} text-primary-500" />
          </div>
          
          <h3 class="font-bold text-lg mb-2">{feature.title}</h3>
          {#if feature.subtitle}
            <p class="text-sm text-primary-500 mb-2">{feature.subtitle}</p>
          {/if}
          {#if feature.description}
            <p class="text-gray-600 text-sm flex-grow">{feature.description}</p>
          {/if}
          
          {#if feature.link}
            <a 
              href={feature.link.href}
              class="mt-4 text-primary-500 hover:text-primary-600 font-medium text-sm flex items-center gap-1 transition-colors"
            >
              {feature.link.text}
              <Icon icon="mdi:arrow-right" class="w-4 h-4" />
            </a>
          {/if}
        </div>
      </div>
    {:else if variant === 'compact'}
      <div class="flex items-start gap-4">
        <div class="w-{iconSize === 'small' ? '10' : iconSize === 'medium' ? '12' : '16'} h-{iconSize === 'small' ? '10' : iconSize === 'medium' ? '12' : '16'} 
                    {feature.iconBgColor || 'bg-primary-500/10'} rounded-full flex items-center justify-center flex-shrink-0">
          <Icon icon={feature.icon} class="w-{iconSize === 'small' ? '5' : iconSize === 'medium' ? '6' : '8'} h-{iconSize === 'small' ? '5' : iconSize === 'medium' ? '6' : '8'} text-primary-500" />
        </div>
        <div>
          <h3 class="font-semibold mb-1">{feature.title}</h3>
          {#if feature.subtitle}
            <p class="text-sm text-primary-500 mb-1">{feature.subtitle}</p>
          {/if}
          {#if feature.description}
            <p class="text-sm text-gray-600">{feature.description}</p>
          {/if}
        </div>
      </div>
    {:else}
      <div class="text-center">
        <div class="w-{iconSize === 'small' ? '12' : iconSize === 'medium' ? '16' : '20'} h-{iconSize === 'small' ? '12' : iconSize === 'medium' ? '16' : '20'} 
                    mx-auto mb-4 {feature.iconBgColor || 'bg-primary-500/10'} rounded-full flex items-center justify-center">
          <Icon icon={feature.icon} class="w-{iconSize === 'small' ? '6' : iconSize === 'medium' ? '8' : '10'} h-{iconSize === 'small' ? '6' : iconSize === 'medium' ? '8' : '10'} text-primary-500" />
        </div>
        <h3 class="font-semibold text-lg mb-2">{feature.title}</h3>
        {#if feature.subtitle}
          <p class="text-sm text-primary-500 mb-2">{feature.subtitle}</p>
        {/if}
        {#if feature.description}
          <p class="text-sm text-gray-600">{feature.description}</p>
        {/if}
      </div>
    {/if}
  {/each}
</div>

<slot />