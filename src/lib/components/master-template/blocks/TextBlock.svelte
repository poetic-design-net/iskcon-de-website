<script lang="ts">
  import { getContext } from 'svelte';
  import type { ContentBlock, TextBlockData } from '../types';
  import { generateClasses } from '../utils/styleEngine';
  import PortableText from '$lib/components/global/PortableText.svelte';
  
  export let data: TextBlockData;
  export let block: ContentBlock;
  
  // Template Context für Theme-Konfiguration
  const templateConfig = getContext('templateConfig') || {};
  
  // Destructure data mit Fallbacks
  $: ({ content, typography, decoration } = data);
  $: ({ 
    title = [], 
    subtitle = [], 
    body = [], 
    caption = [] 
  } = content);
  $: ({ 
    titleLevel = 'h2', 
    titleStyle, 
    bodyStyle, 
    alignment = 'left' 
  } = typography);
  $: ({ badge, divider, highlight } = decoration || {});
  
  // CSS-Klassen generieren
  $: titleClasses = titleStyle ? generateClasses('typography', titleStyle) : '';
  $: bodyClasses = bodyStyle ? generateClasses('typography', bodyStyle) : '';
  $: themeClasses = generateClasses('theme', block.styling?.theme || 'default');
  
  // Alignment-Klassen
  $: alignmentClass = `text-${alignment}`;
  
  // Badge-Komponente (vereinfacht)
  function getBadgeClasses(badgeConfig: any): string {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    const sizeClasses = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-sm', 
      lg: 'px-3 py-1 text-base'
    };
    const variantClasses = {
      default: 'bg-gray-100 text-gray-800',
      spiritual: 'bg-spiritual-saffron-100 text-spiritual-saffron-800',
      accent: 'bg-blue-100 text-blue-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      danger: 'bg-red-100 text-red-800'
    };
    
    const size = (badgeConfig.size as keyof typeof sizeClasses) || 'md';
    const variant = (badgeConfig.variant as keyof typeof variantClasses) || 'default';
    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`;
  }
  
  // Divider-Komponente (vereinfacht)
  function getDividerClasses(dividerConfig: any): string {
    const baseClasses = 'w-full border-t border-gray-200';
    return baseClasses;
  }
</script>

<!-- Text Block Container -->
<div class="text-block {alignmentClass} {themeClasses}" data-block-id={block.id} data-block-type={block.type}>
  
  <!-- Badge (falls vorhanden) -->
  {#if badge}
    <div class="badge-container mb-4">
      <span class={getBadgeClasses(badge)}>
        {#if badge.icon}
          <span class="mr-1">{badge.icon.name}</span>
        {/if}
        {badge.text}
      </span>
    </div>
  {/if}

  <!-- Top Divider -->
  {#if divider && (divider.position === 'top' || divider.position === 'both')}
    <div class="divider-top mb-6">
      <div class={getDividerClasses(divider)}></div>
    </div>
  {/if}

  <!-- Title -->
  {#if title && title.length > 0}
    <div class="title-container mb-4">
      {#if titleLevel === 'h1'}
        <h1 class="title {titleClasses}">
          <PortableText value={title} />
        </h1>
      {:else if titleLevel === 'h2'}
        <h2 class="title {titleClasses}">
          <PortableText value={title} />
        </h2>
      {:else if titleLevel === 'h3'}
        <h3 class="title {titleClasses}">
          <PortableText value={title} />
        </h3>
      {:else if titleLevel === 'h4'}
        <h4 class="title {titleClasses}">
          <PortableText value={title} />
        </h4>
      {:else if titleLevel === 'h5'}
        <h5 class="title {titleClasses}">
          <PortableText value={title} />
        </h5>
      {:else if titleLevel === 'h6'}
        <h6 class="title {titleClasses}">
          <PortableText value={title} />
        </h6>
      {/if}
    </div>
  {/if}

  <!-- Subtitle -->
  {#if subtitle && subtitle.length > 0}
    <div class="subtitle-container mb-4">
      <div class="subtitle {bodyClasses}">
        <PortableText value={subtitle} />
      </div>
    </div>
  {/if}

  <!-- Body Content -->
  {#if body && body.length > 0}
    <div class="body-container mb-4">
      <div class="body-content {bodyClasses}">
        <PortableText value={body} />
      </div>
    </div>
  {/if}

  <!-- Caption -->
  {#if caption && caption.length > 0}
    <div class="caption-container">
      <div class="caption text-sm text-gray-600">
        <PortableText value={caption} />
      </div>
    </div>
  {/if}

  <!-- Bottom Divider -->
  {#if divider && (divider.position === 'bottom' || divider.position === 'both')}
    <div class="divider-bottom mt-6">
      <div class={getDividerClasses(divider)}></div>
    </div>
  {/if}
</div>

<style>
  .text-block {
    width: 100%;
  }
  
  /* Title Styles */
  .title {
    font-weight: 600;
    line-height: 1.2;
    margin: 0;
  }
  
  /* Subtitle Styles */
  .subtitle {
    font-size: 1.125rem;
    line-height: 1.4;
    opacity: 0.8;
    margin: 0;
  }
  
  /* Body Content Styles */
  .body-content {
    line-height: 1.6;
  }
  
  /* Caption Styles */
  .caption {
    font-style: italic;
    margin: 0;
  }
  
  /* Alignment Classes */
  .text-left { text-align: left; }
  .text-center { text-align: center; }
  .text-right { text-align: right; }
  
  /* Badge Container */
  .badge-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  /* Divider Styling */
  .divider-top,
  .divider-bottom {
    width: 100%;
  }
  
  /* Responsive Typography */
  @media (max-width: 768px) {
    .title {
      font-size: clamp(1.5rem, 4vw, 2.5rem);
    }
    
    .subtitle {
      font-size: 1rem;
    }
    
    .body-content {
      font-size: 0.95rem;
    }
  }
  
  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .caption {
      color: #9ca3af;
    }
  }
  
  /* Print styles */
  @media print {
    .badge-container {
      display: none;
    }
  }
</style>