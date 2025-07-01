<script lang="ts">
  import type { ContentBlock, BlockData } from '../types';
  
  export let data: BlockData;
  export let block: ContentBlock;
  
  // Debug-Informationen
  $: blockInfo = {
    type: block.type,
    id: block.id,
    hasData: !!data,
    dataKeys: data ? Object.keys(data) : []
  };
</script>

<!-- Fallback für noch nicht implementierte Block-Typen -->
<div class="fallback-block">
  <div class="fallback-header">
    <h3>⚠️ Block-Typ nicht implementiert</h3>
    <p class="block-type">Typ: <code>{block.type}</code></p>
  </div>
  
  <div class="fallback-details">
    <details>
      <summary>Debug-Informationen</summary>
      <pre class="debug-info">{JSON.stringify(blockInfo, null, 2)}</pre>
    </details>
    
    {#if data}
      <details>
        <summary>Block-Daten</summary>
        <pre class="block-data">{JSON.stringify(data, null, 2)}</pre>
      </details>
    {/if}
  </div>
  
  <div class="fallback-actions">
    <p class="help-text">
      Diese Komponente wird angezeigt, weil der Block-Typ "{block.type}" noch nicht implementiert wurde.
    </p>
  </div>
</div>

<style>
  .fallback-block {
    border: 2px dashed #e11d48;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 1rem 0;
    background: #fef2f2;
    color: #991b1b;
  }
  
  .fallback-header h3 {
    margin: 0 0 0.5rem 0;
    color: #dc2626;
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  .block-type {
    margin: 0 0 1rem 0;
    font-size: 0.875rem;
  }
  
  .block-type code {
    background: #fee2e2;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-weight: 600;
  }
  
  .fallback-details {
    margin: 1rem 0;
  }
  
  .fallback-details details {
    margin: 0.5rem 0;
    border: 1px solid #fca5a5;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .fallback-details summary {
    background: #fee2e2;
    padding: 0.5rem;
    cursor: pointer;
    font-weight: 500;
    border-bottom: 1px solid #fca5a5;
  }
  
  .fallback-details summary:hover {
    background: #fecaca;
  }
  
  .debug-info,
  .block-data {
    background: #fff;
    padding: 1rem;
    margin: 0;
    font-family: 'Courier New', monospace;
    font-size: 0.75rem;
    line-height: 1.4;
    color: #374151;
    overflow-x: auto;
  }
  
  .help-text {
    margin: 0;
    font-size: 0.875rem;
    font-style: italic;
  }
  
  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .fallback-block {
      background: #450a0a;
      color: #fca5a5;
      border-color: #dc2626;
    }
    
    .fallback-header h3 {
      color: #f87171;
    }
    
    .block-type code {
      background: #7f1d1d;
      color: #fecaca;
    }
    
    .fallback-details details {
      border-color: #991b1b;
    }
    
    .fallback-details summary {
      background: #7f1d1d;
      border-bottom-color: #991b1b;
    }
    
    .fallback-details summary:hover {
      background: #991b1b;
    }
    
    .debug-info,
    .block-data {
      background: #1f2937;
      color: #e5e7eb;
    }
  }
</style>