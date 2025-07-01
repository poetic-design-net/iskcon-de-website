<script lang="ts">
  import { setContext } from 'svelte';
  import type { PageTemplate } from './types';
  
  export let template: PageTemplate;
  
  // Template Context für alle Child-Komponenten verfügbar machen
  setContext('masterTemplate', {
    template,
    config: template.config,
    metadata: template.metadata
  });
  
  // CSS Custom Properties für Template-spezifische Werte setzen
  $: customProperties = generateTemplateProperties(template);
  
  function generateTemplateProperties(template: PageTemplate): string {
    const properties: string[] = [];
    
    // Template-spezifische CSS Custom Properties basierend auf Theme
    if (template.config?.theme) {
      properties.push(`--template-theme: ${template.config.theme}`);
    }
    
    // Layout-spezifische Properties
    if (template.config?.layout) {
      properties.push(`--template-header: ${template.config.layout.header ? '1' : '0'}`);
      properties.push(`--template-footer: ${template.config.layout.footer ? '1' : '0'}`);
      if (template.config.layout.sidebar) {
        properties.push(`--template-sidebar: ${template.config.layout.sidebar}`);
      }
    }
    
    return properties.join('; ');
  }
</script>

<!-- Custom CSS would be handled through global styles or component-specific styling -->

<!-- Template Context Provider -->
<div 
  class="template-provider" 
  style={customProperties}
  data-template-type={template.type}
  data-template-theme={template.config?.theme || 'default'}
>
  <slot />
</div>

<style>
  .template-provider {
    /* Base template styles */
    --template-transition-duration: 0.2s;
    --template-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
    
    /* Provide template-level CSS custom properties */
    position: relative;
    width: 100%;
  }
  
  /* Template-spezifische Theme-Varianten */
  .template-provider[data-template-theme="spiritual"] {
    --template-primary: var(--color-spiritual-saffron-600);
    --template-secondary: var(--color-spiritual-blue-600);
    --template-accent: var(--color-spiritual-saffron-500);
  }
  
  .template-provider[data-template-theme="warm"] {
    --template-primary: var(--color-amber-600);
    --template-secondary: var(--color-orange-600);
    --template-accent: var(--color-yellow-500);
  }
  
  .template-provider[data-template-theme="dark"] {
    --template-background: var(--color-slate-900);
    --template-foreground: var(--color-slate-50);
    --template-primary: var(--color-blue-400);
  }
  
  .template-provider[data-template-theme="light"] {
    --template-background: var(--color-white);
    --template-foreground: var(--color-slate-900);
    --template-primary: var(--color-blue-600);
  }
</style>