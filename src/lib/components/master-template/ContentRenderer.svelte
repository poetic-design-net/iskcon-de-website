<script lang="ts">
  import { createBlockComponent } from './utils/blockFactory';
  import BlockWrapper from './BlockWrapper.svelte';
  import type { ContentBlock } from './types';
  
  export let content: ContentBlock[];
  
  // Filter sichtbare Blöcke basierend auf Conditions
  $: visibleBlocks = (content || []).filter(block => shouldRenderBlock(block));
  
  function shouldRenderBlock(block: ContentBlock): boolean {
    if (!block.conditions) return true;
    
    // Device-basierte Sichtbarkeit
    if (block.conditions.device) {
      const currentDevice = getCurrentDevice();
      if (Array.isArray(block.conditions.device)) {
        return block.conditions.device.includes(currentDevice);
      }
      return block.conditions.device === currentDevice;
    }
    
    // Datums-basierte Sichtbarkeit
    if (block.conditions.dateRange) {
      const now = new Date();
      const start = block.conditions.dateRange.start ? new Date(block.conditions.dateRange.start) : null;
      const end = block.conditions.dateRange.end ? new Date(block.conditions.dateRange.end) : null;
      
      if (start && now < start) return false;
      if (end && now > end) return false;
    }
    
    return true;
  }
  
  function getCurrentDevice(): 'mobile' | 'tablet' | 'desktop' {
    if (typeof window === 'undefined') return 'desktop';
    
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }
</script>

<!-- Content Blocks rendern -->
{#each visibleBlocks as block, index (block.id)}
  <BlockWrapper
    {block}
    {index}
  >
    <svelte:component 
      this={createBlockComponent(block.type)}
      data={block.data}
      {block}
    />
  </BlockWrapper>
{/each}

<style>
  /* ContentRenderer hat keine eigenen Styles - alles über BlockWrapper */
</style>