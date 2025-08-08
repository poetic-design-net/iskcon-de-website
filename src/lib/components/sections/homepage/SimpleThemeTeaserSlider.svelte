<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import ThemeTeaser from './ThemeTeaser.svelte';
  import Icon from '@iconify/svelte';
  import type { SanityHomepageTeaser } from '$lib/types';

  export let teasers: SanityHomepageTeaser[] = [];
  export let title: string = '';
  export let autoplay: boolean = false; // Standardmäßig deaktiviert für mehr Ruhe
  export let autoplayInterval: number = 8000; // Längere Intervalle
  
  let currentIndex = 0;
  let sliderContainer: HTMLDivElement;
  let autoplayTimer: NodeJS.Timeout;
  let isPaused = false;
  let containerHeight: string = 'auto';
  
  // Touch/Swipe variables
  let touchStartX: number = 0;
  let touchEndX: number = 0;
  let isSwiping: boolean = false;

  $: slideCount = teasers.length;
  $: hasMultipleSlides = slideCount > 1;

  function nextSlide() {
    if (currentIndex < slideCount - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = slideCount - 1;
    }
  }

  function goToSlide(index: number) {
    currentIndex = index;
  }

  function startAutoplay() {
    if (autoplay && hasMultipleSlides && !isPaused) {
      autoplayTimer = setInterval(nextSlide, autoplayInterval);
    }
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
    }
  }

  function handleMouseEnter() {
    isPaused = true;
    stopAutoplay();
  }

  function handleMouseLeave() {
    isPaused = false;
    startAutoplay();
  }
  
  // Touch/Swipe handlers
  function handleTouchStart(e: TouchEvent) {
    touchStartX = e.touches[0].clientX;
    isSwiping = true;
  }
  
  function handleTouchMove(e: TouchEvent) {
    if (!isSwiping) return;
    touchEndX = e.touches[0].clientX;
  }
  
  function handleTouchEnd() {
    if (!isSwiping) return;
    
    const swipeThreshold = 50; // Minimum distance for a swipe
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left - next slide
        nextSlide();
      } else {
        // Swiped right - previous slide
        prevSlide();
      }
    }
    
    isSwiping = false;
    touchStartX = 0;
    touchEndX = 0;
  }

  onMount(() => {
    startAutoplay();
    
    // Fix height after initial render to prevent layout shift in Firefox/Safari
    if (sliderContainer) {
      setTimeout(() => {
        const slideElement = sliderContainer.querySelector('.w-full.flex-shrink-0');
        if (slideElement) {
          const height = slideElement.getBoundingClientRect().height;
          containerHeight = `${height}px`;
        }
      }, 100);
    }
  });

  onDestroy(() => {
    stopAutoplay();
  });

  // Restart autoplay when paused state changes
  $: if (!isPaused) {
    stopAutoplay();
    startAutoplay();
  }
</script>

<section 
  class="relative overflow-hidden bg-gray-50"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  {#if title}
    <div class="container mx-auto px-4 py-8">
      <h2 class="text-3xl md:text-4xl font-medium text-center text-gray-900">{title}</h2>
    </div>
  {/if}

  <!-- Slider Container -->
  <div class="relative" bind:this={sliderContainer}>
    <!-- Slides -->
    <div 
      class="relative overflow-hidden touch-pan-y" 
      style="height: {containerHeight};"
      on:touchstart={handleTouchStart}
      on:touchmove={handleTouchMove}
      on:touchend={handleTouchEnd}
    >
      <div 
        class="flex transition-transform duration-500 ease-in-out"
        style="transform: translate3d(-{currentIndex * 100}%, 0, 0); will-change: transform;"
      >
        {#each teasers as teaser}
          <div class="w-full flex-shrink-0" style="backface-visibility: hidden;">
            <ThemeTeaser
              theme={teaser.theme}
              layout={teaser.layout}
              headline={teaser.headline}
              teaser={teaser.teaser}
              highlight={teaser.highlight}
              image={teaser.image}
              ctaText={teaser.ctaText}
              ctaLink={teaser.ctaLink || '#'}
              badge={teaser.badge}
            />
          </div>
        {/each}
      </div>
    </div>

    <!-- Navigation Controls -->
    {#if hasMultipleSlides}
      <!-- Previous Button - Hidden on mobile -->
      <button
        on:click={prevSlide}
        class="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-20 group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
        aria-label="Vorheriger Slide"
      >
        <div class="flex items-center justify-center p-4 bg-gray-50 group-hover:bg-primary-500/10 transition-colors">
          <Icon 
            icon="mdi:arrow-left" 
            class="w-8 h-8 text-gray-600 group-hover:text-primary-500" 
          />
        </div>
      </button>

      <!-- Next Button - Hidden on mobile -->
      <button
        on:click={nextSlide}
        class="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-20 group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
        aria-label="Nächster Slide"
      >
        <div class="flex items-center justify-center p-4 bg-gray-50 group-hover:bg-primary-500/10 transition-colors">
          <Icon 
            icon="mdi:arrow-right" 
            class="w-8 h-8 text-gray-600 group-hover:text-primary-500" 
          />
        </div>
      </button>

      <!-- Pagination Dots -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {#each teasers as _, index}
          <button
            on:click={() => goToSlide(index)}
            class="w-3 h-3 rounded-full transition-all {
              index === currentIndex 
                ? 'bg-primary-500 w-8' 
                : 'bg-gray-400 hover:bg-gray-600'
            }"
            aria-label="Gehe zu Slide {index + 1}"
          />
        {/each}
      </div>
    {/if}
  </div>

  <!-- Progress Bar -->
  {#if autoplay && hasMultipleSlides}
    <div class="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
      <div 
        class="h-full bg-primary-500 transition-none"
        style="width: {((currentIndex + 1) / slideCount) * 100}%"
      />
    </div>
  {/if}
</section>