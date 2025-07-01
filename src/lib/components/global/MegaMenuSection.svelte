<script lang="ts">
  import Icon from '@iconify/svelte';
  import { Button } from '$lib/components/ui/button';

  export let section: {
    title: string;
    items: Array<{
      title: string;
      slug: string;
      description?: string;
      icon?: string;
    }>;
  };

  // Svelte 5: Event handling through callback props
  export let onitemclick: (() => void) | undefined = undefined;

  const handleItemClick = () => {
    onitemclick?.();
  };
</script>

<div class="space-y-4">
  <!-- Section Header -->
  <h3 class="text-sm font-medium text-muted-foreground uppercase tracking-wider">
    {section.title}
  </h3>

  <!-- Section Items -->
  <div class="space-y-1">
    {#each section.items as item}
      <Button
        variant="ghost"
        href={`/${item.slug}`}
        class="w-full justify-start text-left h-auto p-3 hover:bg-spiritual-saffron-50 hover:text-spiritual-saffron-700 group"
        on:click={handleItemClick}
      >
        <div class="flex items-start gap-3 w-full">
          {#if item.icon}
            <Icon 
              icon={item.icon} 
              class="w-5 h-5 text-spiritual-saffron-600 flex-shrink-0 mt-0.5 group-hover:text-spiritual-saffron-700" 
            />
          {/if}
          
          <div class="flex-1 min-w-0">
            <div class="font-medium text-foreground group-hover:text-spiritual-saffron-700">
              {item.title}
            </div>
            
            {#if item.description}
              <div class="text-sm text-muted-foreground mt-1 line-clamp-2">
                {item.description}
              </div>
            {/if}
          </div>
        </div>
      </Button>
    {/each}
  </div>
</div>