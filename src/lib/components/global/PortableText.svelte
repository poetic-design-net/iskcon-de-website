<script lang="ts">
  // Simple PortableText renderer for Sanity CMS content
  export let value: any[] | undefined = undefined;
  
  function renderContent(blocks: any[]): string {
    if (!blocks || !Array.isArray(blocks)) return '';
    
    return blocks
      .map(block => {
        if (!block || block._type !== 'block') return '';
        
        const children = block.children || [];
        const text = children
          .map((child: any) => child.text || '')
          .join('');
        
        if (!text.trim()) return '';
        
        // Simple styling based on block style
        switch (block.style) {
          case 'h1':
            return `<h1 class="text-4xl font-medium mb-4">${text}</h1>`;
          case 'h2':
            return `<h2 class="text-3xl font-medium mb-3">${text}</h2>`;
          case 'h3':
            return `<h3 class="text-2xl font-medium mb-3">${text}</h3>`;
          case 'h4':
            return `<h4 class="text-xl font-medium mb-2">${text}</h4>`;
          case 'blockquote':
            return `<blockquote class="border-l-4 border-gray-300 pl-4 italic mb-4">${text}</blockquote>`;
          default:
            return `<p class="mb-4">${text}</p>`;
        }
      })
      .filter(Boolean)
      .join('');
  }
  
  $: renderedContent = value ? renderContent(value) : '';
</script>

{#if renderedContent}
  <div class="portable-text">
    {@html renderedContent}
  </div>
{/if}

<style>
  .portable-text :global(p:last-child) {
    margin-bottom: 0;
  }
  
  .portable-text :global(h1:first-child),
  .portable-text :global(h2:first-child),
  .portable-text :global(h3:first-child),
  .portable-text :global(h4:first-child) {
    margin-top: 0;
  }
</style>