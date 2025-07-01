<script lang="ts">
  import Icon from '@iconify/svelte';
  import { Button } from '$lib/components/ui/button';

  export let item: {
    title: string;
    slug: string;
    icon: string;
    sections?: Array<any>;
  };
  export let isActive = false;
  export let href: string | undefined = undefined;

  // Svelte 5: Event handling through callback props
  export let onmouseenter: (() => void) | undefined = undefined;
  export let onmouseleave: (() => void) | undefined = undefined;
  export let onclick: (() => void) | undefined = undefined;

  const handleMouseEnter = () => {
    onmouseenter?.();
  };

  const handleMouseLeave = () => {
    onmouseleave?.();
  };

  const handleClick = () => {
    onclick?.();
  };
</script>

<Button
  variant="ghost"
  {href}
  class={`
    flex items-center gap-2 px-4 py-2 text-foreground transition-all duration-300 ease-in-out
    hover:text-spiritual-saffron-700 hover:bg-spiritual-saffron-50
    ${isActive ? 'text-spiritual-saffron-700 bg-spiritual-saffron-50' : ''}
    ${item.sections && item.sections.length > 0 ? 'relative' : ''}
  `}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:click={handleClick}
>
  <Icon icon={item.icon} class="w-4 h-4" />
  <span class="font-medium">{item.title}</span>
  
  {#if item.sections && item.sections.length > 0}
    <Icon 
      icon="mdi:chevron-down" 
      class={`w-4 h-4 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} 
    />
  {/if}
</Button>