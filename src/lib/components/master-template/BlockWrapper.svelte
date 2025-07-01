<script lang="ts">
  import { getContext } from 'svelte';
  import { generateClasses, generateCustomProperties } from './utils/styleEngine';
  import type { ContentBlock } from './types';
  
  export let block: ContentBlock;
  export let index: number = 0;
  
  // Template Context
  const templateContext = getContext('masterTemplate');
  
  // Style Engine Integration
  $: containerClasses = generateClasses('container', block.layout.container);
  $: arrangementClasses = generateClasses('arrangement', block.layout.arrangement);
  $: alignmentClasses = generateClasses('alignment', block.layout.alignment);
  $: spacingClasses = generateClasses('spacing', block.styling.spacing);
  $: backgroundClasses = generateClasses('background', block.styling.background);
  $: borderClasses = generateClasses('border', block.styling.borders);
  $: shadowClasses = generateClasses('shadow', block.styling.shadows);
  
  // Combine all classes
  $: allClasses = [
    'block-wrapper',
    `block-type-${block.type}`,
    `block-theme-${block.styling.theme}`,
    containerClasses,
    arrangementClasses,
    alignmentClasses,
    spacingClasses,
    backgroundClasses,
    borderClasses,
    shadowClasses
  ].filter(Boolean).join(' ');
  
  // Generate custom properties
  $: customProperties = generateCustomProperties(block.styling);
  
  // Animation classes if present
  $: animationClasses = block.animation ? `animate-${block.animation.type} animate-${block.animation.duration}` : '';
  
  // Responsive classes
  $: responsiveClasses = generateResponsiveClasses(block.layout.responsive);
  
  function generateResponsiveClasses(responsive: any): string {
    if (!responsive) return '';
    
    const classes: string[] = [];
    
    if (responsive.mobile) {
      classes.push('responsive-mobile');
    }
    
    if (responsive.tablet) {
      classes.push('responsive-tablet');
    }
    
    if (responsive.desktop) {
      classes.push('responsive-desktop');
    }
    
    return classes.join(' ');
  }
</script>

<!-- Block Wrapper with comprehensive styling -->
<div 
  class="{allClasses} {animationClasses} {responsiveClasses}"
  style={customProperties}
  data-block-id={block.id}
  data-block-type={block.type}
  data-block-index={index}
  role="region"
  aria-label="Content block {index + 1}"
>
  <slot />
</div>

<style>
  .block-wrapper {
    /* Base wrapper styles */
    position: relative;
    width: 100%;
    
    /* CSS Custom Properties Integration */
    --block-transition: var(--template-transition-duration, 0.2s) var(--template-transition-timing, ease);
  }
  
  /* Container Size Variants */
  .block-wrapper :global(.container-narrow) {
    max-width: var(--container-narrow, 640px);
    margin-left: auto;
    margin-right: auto;
    padding-left: var(--spacing-4, 1rem);
    padding-right: var(--spacing-4, 1rem);
  }
  
  .block-wrapper :global(.container-normal) {
    max-width: var(--container-normal, 1024px);
    margin-left: auto;
    margin-right: auto;
    padding-left: var(--spacing-6, 1.5rem);
    padding-right: var(--spacing-6, 1.5rem);
  }
  
  .block-wrapper :global(.container-wide) {
    max-width: var(--container-wide, 1280px);
    margin-left: auto;
    margin-right: auto;
    padding-left: var(--spacing-8, 2rem);
    padding-right: var(--spacing-8, 2rem);
  }
  
  .block-wrapper :global(.container-full) {
    width: 100%;
    max-width: none;
  }
  
  .block-wrapper :global(.container-breakout) {
    width: 100vw;
    margin-left: 50%;
    transform: translateX(-50%);
  }
  
  /* Arrangement Variants */
  .block-wrapper :global(.arrangement-columns) {
    display: grid;
    grid-template-columns: repeat(var(--columns, 1), 1fr);
    gap: var(--gap, var(--spacing-6, 1.5rem));
  }
  
  .block-wrapper :global(.arrangement-grid) {
    display: grid;
    gap: var(--gap, var(--spacing-6, 1.5rem));
    grid-template-columns: repeat(auto-fit, minmax(var(--min-column-width, 280px), 1fr));
  }
  
  .block-wrapper :global(.arrangement-flex) {
    display: flex;
    gap: var(--gap, var(--spacing-6, 1.5rem));
    flex-direction: var(--flex-direction, row);
    flex-wrap: var(--flex-wrap, wrap);
  }
  
  /* Alignment Variants */
  .block-wrapper :global(.align-horizontal-left) { text-align: left; }
  .block-wrapper :global(.align-horizontal-center) { text-align: center; }
  .block-wrapper :global(.align-horizontal-right) { text-align: right; }
  .block-wrapper :global(.align-horizontal-justify) { text-align: justify; }
  
  .block-wrapper :global(.align-vertical-top) { align-items: flex-start; }
  .block-wrapper :global(.align-vertical-center) { align-items: center; }
  .block-wrapper :global(.align-vertical-bottom) { align-items: flex-end; }
  .block-wrapper :global(.align-vertical-stretch) { align-items: stretch; }
  
  /* Background Variants */
  .block-wrapper :global(.bg-type-color) {
    background-color: var(--bg-color, transparent);
  }
  
  .block-wrapper :global(.bg-type-gradient) {
    background: var(--bg-gradient, linear-gradient(135deg, transparent, transparent));
  }
  
  .block-wrapper :global(.bg-type-image) {
    background-image: var(--bg-image);
    background-size: var(--bg-size, cover);
    background-position: var(--bg-position, center);
    background-repeat: var(--bg-repeat, no-repeat);
    background-attachment: var(--bg-attachment, scroll);
  }
  
  /* Theme Variants */
  .block-wrapper.block-theme-spiritual {
    --block-primary: var(--color-spiritual-saffron-600);
    --block-secondary: var(--color-spiritual-blue-600);
    --block-accent: var(--color-spiritual-saffron-500);
  }
  
  .block-wrapper.block-theme-warm {
    --block-primary: var(--color-amber-600);
    --block-secondary: var(--color-orange-600);
    --block-accent: var(--color-yellow-500);
  }
  
  .block-wrapper.block-theme-dark {
    --block-background: var(--color-slate-900);
    --block-foreground: var(--color-slate-50);
  }
  
  .block-wrapper.block-theme-light {
    --block-background: var(--color-white);
    --block-foreground: var(--color-slate-900);
  }
  
  /* Animation Support */
  .block-wrapper :global(.animate-fade-in) {
    animation: fadeIn var(--animation-duration, 0.6s) var(--animation-timing, ease-out);
  }
  
  .block-wrapper :global(.animate-slide-up) {
    animation: slideUp var(--animation-duration, 0.6s) var(--animation-timing, ease-out);
  }
  
  .block-wrapper :global(.animate-scale) {
    animation: scale var(--animation-duration, 0.6s) var(--animation-timing, ease-out);
  }
  
  /* Responsive Variants */
  @media (max-width: 768px) {
    .block-wrapper.responsive-mobile :global(.container-normal),
    .block-wrapper.responsive-mobile :global(.container-wide) {
      padding-left: var(--spacing-4, 1rem);
      padding-right: var(--spacing-4, 1rem);
    }
    
    .block-wrapper.responsive-mobile :global(.arrangement-columns) {
      grid-template-columns: 1fr;
    }
    
    .block-wrapper.responsive-mobile :global(.arrangement-flex) {
      flex-direction: column;
    }
  }
  
  @media (min-width: 768px) and (max-width: 1024px) {
    .block-wrapper.responsive-tablet :global(.arrangement-columns) {
      grid-template-columns: repeat(var(--tablet-columns, 2), 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .block-wrapper.responsive-desktop :global(.arrangement-columns) {
      grid-template-columns: repeat(var(--desktop-columns, var(--columns, 3)), 1fr);
    }
  }
  
  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { 
      opacity: 0; 
      transform: translateY(var(--slide-distance, 20px)); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  
  @keyframes scale {
    from { 
      opacity: 0; 
      transform: scale(var(--scale-start, 0.95)); 
    }
    to { 
      opacity: 1; 
      transform: scale(1); 
    }
  }
  
  /* Accessibility */
  .block-wrapper:focus-within {
    outline: 2px solid var(--color-blue-600);
    outline-offset: 2px;
  }
  
  /* Print styles */
  @media print {
    .block-wrapper {
      page-break-inside: avoid;
      break-inside: avoid;
    }
  }
</style>