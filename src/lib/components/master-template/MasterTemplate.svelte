<script lang="ts">
  import ContentRenderer from './ContentRenderer.svelte';
  import TemplateProvider from './TemplateProvider.svelte';
  import type { PageTemplate, ContentBlock } from './types';
  
  export let template: PageTemplate;
  export let content: ContentBlock[];
  export let pageId: string = '';
  export let className: string = '';
  
  // Template validation
  $: isValid = template && content && Array.isArray(content);
  
  // Template metadata
  $: templateClasses = [
    'master-template',
    `theme-${template.config?.theme || 'default'}`,
    template.config?.layout.sidebar ? `sidebar-${template.config.layout.sidebar}` : '',
    className
  ].filter(Boolean).join(' ');
  
  // Performance optimizations
  $: visibleContent = content.filter(block => 
    !block.conditions || shouldRenderBlock(block.conditions)
  );
  
  function shouldRenderBlock(conditions: any): boolean {
    // Implement visibility condition logic
    if (conditions.device) {
      // Device-specific rendering logic
      const currentDevice = getCurrentDevice();
      if (Array.isArray(conditions.device)) {
        return conditions.device.includes(currentDevice);
      }
      return conditions.device === currentDevice;
    }
    
    if (conditions.dateRange) {
      const now = new Date();
      const start = conditions.dateRange.start ? new Date(conditions.dateRange.start) : null;
      const end = conditions.dateRange.end ? new Date(conditions.dateRange.end) : null;
      
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

<svelte:head>
  {#if template.config?.seo}
    {#if template.config.seo.title}
      <title>{template.config.seo.title}</title>
    {/if}
    {#if template.config.seo.description}
      <meta name="description" content={template.config.seo.description} />
    {/if}
    {#if template.config.seo.keywords?.length}
      <meta name="keywords" content={template.config.seo.keywords.join(', ')} />
    {/if}
    {#if template.config.seo.canonical}
      <link rel="canonical" href={template.config.seo.canonical} />
    {/if}
    {#if template.config.seo.noindex}
      <meta name="robots" content="noindex" />
    {/if}
    {#if template.config.seo.ogImage?.asset?.url}
      <meta property="og:image" content={template.config.seo.ogImage.asset.url} />
    {/if}
  {/if}
</svelte:head>

{#if isValid}
  <TemplateProvider {template}>
    <main 
      class={templateClasses}
      id={pageId}
      role="main"
      aria-label="Page content"
    >
      <!-- Optional Header -->
      {#if template.config?.layout.header}
        <header class="template-header">
          <slot name="header" />
        </header>
      {/if}
      
      <!-- Main Content Area -->
      <div class="template-content">
        <!-- Optional Left Sidebar -->
        {#if template.config?.layout.sidebar === 'left' || template.config?.layout.sidebar === 'both'}
          <aside class="template-sidebar template-sidebar--left">
            <slot name="sidebar-left" />
          </aside>
        {/if}
        
        <!-- Content Blocks -->
        <article class="template-main">
          <ContentRenderer content={visibleContent} />
        </article>
        
        <!-- Optional Right Sidebar -->
        {#if template.config?.layout.sidebar === 'right' || template.config?.layout.sidebar === 'both'}
          <aside class="template-sidebar template-sidebar--right">
            <slot name="sidebar-right" />
          </aside>
        {/if}
      </div>
      
      <!-- Optional Footer -->
      {#if template.config?.layout.footer}
        <footer class="template-footer">
          <slot name="footer" />
        </footer>
      {/if}
    </main>
  </TemplateProvider>
{:else}
  <div class="template-error">
    <h1>Template Error</h1>
    <p>Invalid template configuration or content structure.</p>
  </div>
{/if}

<style>
  .master-template {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  
  .template-content {
    flex: 1;
    display: grid;
    gap: 0;
    position: relative;
  }
  
  /* Default Layout: No Sidebar */
  .master-template .template-content {
    grid-template-columns: 1fr;
    grid-template-areas: "main";
  }
  
  /* Left Sidebar Layout */
  .master-template.sidebar-left .template-content {
    grid-template-columns: auto 1fr;
    grid-template-areas: "sidebar-left main";
  }
  
  /* Right Sidebar Layout */
  .master-template.sidebar-right .template-content {
    grid-template-columns: 1fr auto;
    grid-template-areas: "main sidebar-right";
  }
  
  /* Both Sidebars Layout */
  .master-template.sidebar-both .template-content {
    grid-template-columns: auto 1fr auto;
    grid-template-areas: "sidebar-left main sidebar-right";
  }
  
  .template-header {
    position: sticky;
    top: 0;
    z-index: 50;
    background: hsl(var(--background));
    border-bottom: 1px solid hsl(var(--border));
  }
  
  .template-main {
    grid-area: main;
    min-width: 0; /* Prevent grid overflow */
  }
  
  .template-sidebar {
    position: sticky;
    top: 0;
    height: fit-content;
    max-height: 100vh;
    overflow-y: auto;
    padding: var(--spacing-6);
    background: hsl(var(--muted) / 0.5);
    border: 1px solid hsl(var(--border));
  }
  
  .template-sidebar--left {
    grid-area: sidebar-left;
    border-right: none;
  }
  
  .template-sidebar--right {
    grid-area: sidebar-right;
    border-left: none;
  }
  
  .template-footer {
    margin-top: auto;
    background: hsl(var(--muted) / 0.3);
    border-top: 1px solid hsl(var(--border));
  }
  
  .template-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    padding: var(--spacing-8);
    text-align: center;
    color: hsl(var(--destructive));
  }
  
  /* Theme Variants */
  .theme-spiritual {
    --template-accent: var(--color-spiritual-saffron-600);
    --template-secondary: var(--color-spiritual-blue-600);
  }
  
  .theme-warm {
    --template-accent: var(--color-amber-600);
    --template-secondary: var(--color-orange-600);
  }
  
  .theme-dark {
    --template-background: var(--color-slate-900);
    --template-foreground: var(--color-slate-50);
  }
  
  /* Responsive Breakpoints */
  @media (max-width: 768px) {
    .master-template.sidebar-left .template-content,
    .master-template.sidebar-right .template-content,
    .master-template.sidebar-both .template-content {
      grid-template-columns: 1fr;
      grid-template-areas: 
        "main"
        "sidebar-left"
        "sidebar-right";
    }
    
    .template-sidebar {
      position: static;
      max-height: none;
      border: 1px solid hsl(var(--border));
      margin-top: var(--spacing-4);
    }
  }
  
  @media (max-width: 1024px) {
    .template-sidebar {
      width: 250px;
    }
  }
  
  @media (min-width: 1025px) {
    .template-sidebar {
      width: 300px;
    }
  }
  
  /* Performance Optimizations */
  .master-template {
    contain: layout style;
  }
  
  .template-main {
    contain: content;
  }
  
  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    .master-template * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  
  /* Print Styles */
  @media print {
    .template-sidebar,
    .template-header,
    .template-footer {
      display: none;
    }
    
    .template-content {
      grid-template-columns: 1fr;
      grid-template-areas: "main";
    }
  }
</style>