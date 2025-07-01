<script lang="ts">
  import { getContext } from 'svelte';
  import type { ContentBlock, MediaBlockData } from '../types';
  import { generateClasses } from '../utils/styleEngine';
  import SanityImage from '$lib/components/global/SanityImage.svelte';
  
  export let data: MediaBlockData;
  export let block: ContentBlock;
  
  // Template Context für Theme-Konfiguration
  const templateConfig = getContext('templateConfig') || {};
  
  // Destructure data mit Fallbacks
  $: ({ media, display, interaction, accessibility } = data);
  $: ({ 
    type = 'image', 
    primary, 
    gallery = [], 
    embed 
  } = media);
  $: ({ 
    aspectRatio = '16:9', 
    objectFit = 'cover', 
    borderRadius = 'md', 
    overlay 
  } = display);
  $: ({ 
    lightbox = false, 
    autoplay = false, 
    controls = true, 
    loop = false, 
    muted = false 
  } = interaction);
  $: ({ alt, caption, description } = accessibility);
  
  // CSS-Klassen generieren
  $: containerClasses = generateClasses('container', block.layout?.container);
  $: themeClasses = generateClasses('theme', block.styling?.theme || 'default');
  
  // Aspect Ratio CSS
  $: aspectRatioClass = getAspectRatioClass(aspectRatio);
  $: borderRadiusClass = getBorderRadiusClass(borderRadius);
  $: objectFitClass = `object-${objectFit}`;
  
  // Lightbox State
  let showLightbox = false;
  let currentImageIndex = 0;
  
  function getAspectRatioClass(ratio: string): string {
    const ratioClasses = {
      '16:9': 'aspect-video',
      '4:3': 'aspect-4/3',
      '1:1': 'aspect-square',
      '3:2': 'aspect-3/2',
      '21:9': 'aspect-21/9',
      '9:16': 'aspect-9/16',
      'auto': ''
    };
    return ratioClasses[ratio as keyof typeof ratioClasses] || '';
  }
  
  function getBorderRadiusClass(radius: string): string {
    const radiusClasses = {
      'none': 'rounded-none',
      'sm': 'rounded-sm',
      'md': 'rounded-md',
      'lg': 'rounded-lg',
      'xl': 'rounded-xl',
      '2xl': 'rounded-2xl',
      'full': 'rounded-full'
    };
    return radiusClasses[radius as keyof typeof radiusClasses] || 'rounded-md';
  }
  
  function openLightbox(index: number = 0) {
    if (lightbox) {
      currentImageIndex = index;
      showLightbox = true;
    }
  }
  
  function closeLightbox() {
    showLightbox = false;
  }
  
  function nextImage() {
    if (gallery.length > 0) {
      currentImageIndex = (currentImageIndex + 1) % gallery.length;
    }
  }
  
  function prevImage() {
    if (gallery.length > 0) {
      currentImageIndex = (currentImageIndex - 1 + gallery.length) % gallery.length;
    }
  }
  
  // Keyboard Navigation
  function handleKeydown(event: KeyboardEvent) {
    if (showLightbox) {
      switch (event.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
      }
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- Media Block Container -->
<div class="media-block {containerClasses} {themeClasses}" data-block-id={block.id} data-block-type={block.type}>
  
  <!-- Single Image -->
  {#if type === 'image' && primary}
    <div class="media-container {aspectRatioClass} {borderRadiusClass} overflow-hidden relative group">
      {#if primary.type === 'image'}
        <SanityImage 
          image={primary.asset}
          alt={alt || primary.alt || ''}
          class="w-full h-full {objectFitClass} transition-transform duration-300 {lightbox ? 'cursor-pointer group-hover:scale-105' : ''}"
          on:click={() => openLightbox(0)}
        />
      {/if}
      
      <!-- Overlay -->
      {#if overlay}
        <div class="absolute inset-0 bg-black" style="opacity: {overlay.opacity}"></div>
      {/if}
      
      <!-- Lightbox Trigger -->
      {#if lightbox}
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            class="bg-white bg-opacity-90 rounded-full p-3 shadow-lg hover:bg-opacity-100 transition-all"
            on:click={() => openLightbox(0)}
            aria-label="Bild vergrößern"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"></path>
            </svg>
          </button>
        </div>
      {/if}
    </div>
  {/if}
  
  <!-- Image Gallery -->
  {#if type === 'gallery' && gallery.length > 0}
    <div class="gallery-container">
      <div class="gallery-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {#each gallery as item, index}
          {#if item.type === 'image'}
            <div class="gallery-item {aspectRatioClass} {borderRadiusClass} overflow-hidden relative group cursor-pointer">
              <SanityImage 
                image={item.asset}
                alt={item.alt || `Galerie Bild ${index + 1}`}
                class="w-full h-full {objectFitClass} transition-transform duration-300 group-hover:scale-105"
                on:click={() => openLightbox(index)}
              />
              
              <!-- Gallery Item Overlay -->
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"></path>
                </svg>
              </div>
            </div>
          {/if}
        {/each}
      </div>
    </div>
  {/if}
  
  <!-- Video -->
  {#if type === 'video' && primary}
    <div class="video-container {aspectRatioClass} {borderRadiusClass} overflow-hidden">
      {#if primary.type === 'video' && primary.asset.url}
        <video 
          class="w-full h-full {objectFitClass}"
          {controls}
          {autoplay}
          {loop}
          {muted}
          poster={primary.asset.thumbnail?.asset?.url}
        >
          <source src={primary.asset.url} type={primary.asset.mimeType || 'video/mp4'}>
          <p>Ihr Browser unterstützt das Video-Element nicht.</p>
        </video>
      {/if}
    </div>
  {/if}
  
  <!-- Embed -->
  {#if type === 'embed' && embed}
    <div class="embed-container {aspectRatioClass} {borderRadiusClass} overflow-hidden">
      {#if embed.provider === 'youtube' && embed.embedId}
        <iframe
          src="https://www.youtube.com/embed/{embed.embedId}"
          title="YouTube Video"
          class="w-full h-full"
          frameborder="0"
          allowfullscreen
        ></iframe>
      {:else if embed.provider === 'vimeo' && embed.embedId}
        <iframe
          src="https://player.vimeo.com/video/{embed.embedId}"
          title="Vimeo Video"
          class="w-full h-full"
          frameborder="0"
          allowfullscreen
        ></iframe>
      {:else if embed.provider === 'iframe' && embed.url}
        <iframe
          src={embed.url}
          title="Embedded Content"
          class="w-full h-full"
          frameborder="0"
        ></iframe>
      {/if}
    </div>
  {/if}
  
  <!-- Caption -->
  {#if caption}
    <div class="caption-container mt-4">
      <p class="caption text-sm text-gray-600 italic text-center">{caption}</p>
    </div>
  {/if}
  
  <!-- Description -->
  {#if description}
    <div class="description-container mt-2">
      <p class="description text-sm text-gray-500 text-center">{description}</p>
    </div>
  {/if}
</div>

<!-- Lightbox Modal -->
{#if showLightbox && (gallery.length > 0 || primary)}
  <div class="lightbox-overlay fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" on:click={closeLightbox}>
    <div class="lightbox-content relative max-w-7xl max-h-full m-4">
      <!-- Close Button -->
      <button 
        class="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
        on:click={closeLightbox}
        aria-label="Schließen"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      
      <!-- Current Image -->
      {#if gallery.length > 0 && gallery[currentImageIndex]}
        <SanityImage 
          image={gallery[currentImageIndex].asset}
          alt={gallery[currentImageIndex].alt || `Galerie Bild ${currentImageIndex + 1}`}
          class="max-w-full max-h-full object-contain"
        />
      {:else if primary}
        <SanityImage 
          image={primary.asset}
          alt={alt || primary.alt || ''}
          class="max-w-full max-h-full object-contain"
        />
      {/if}
      
      <!-- Navigation Arrows -->
      {#if gallery.length > 1}
        <button 
          class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
          on:click={prevImage}
          aria-label="Vorheriges Bild"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        <button 
          class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
          on:click={nextImage}
          aria-label="Nächstes Bild"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      {/if}
      
      <!-- Image Counter -->
      {#if gallery.length > 1}
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded">
          {currentImageIndex + 1} / {gallery.length}
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .media-block {
    width: 100%;
  }
  
  .media-container {
    position: relative;
  }
  
  .gallery-grid {
    display: grid;
  }
  
  .gallery-item {
    position: relative;
  }
  
  .video-container {
    position: relative;
  }
  
  .embed-container {
    position: relative;
  }
  
  .lightbox-overlay {
    backdrop-filter: blur(4px);
  }
  
  .lightbox-content {
    animation: fadeIn 0.3s ease-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  /* Aspect ratio fallbacks for older browsers */
  .aspect-video { aspect-ratio: 16 / 9; }
  .aspect-square { aspect-ratio: 1 / 1; }
  .aspect-4\/3 { aspect-ratio: 4 / 3; }
  .aspect-3\/2 { aspect-ratio: 3 / 2; }
  .aspect-21\/9 { aspect-ratio: 21 / 9; }
  .aspect-9\/16 { aspect-ratio: 9 / 16; }
  
  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .caption {
      color: #9ca3af;
    }
    
    .description {
      color: #6b7280;
    }
  }
</style>