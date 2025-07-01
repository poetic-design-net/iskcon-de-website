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

  onMount(() => {
    startAutoplay();
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
    <div class="relative overflow-hidden">
      <div 
        class="flex transition-transform duration-500 ease-in-out"
        style="transform: translateX(-{currentIndex * 100}%)"
      >
        {#each teasers as teaser}
          <div class="w-full flex-shrink-0">
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
      <!-- Previous Button -->
      <button
        on:click={prevSlide}
        class="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all group"
        aria-label="Vorheriger Slide"
      >
        <Icon 
          icon="mdi:chevron-left" 
          class="w-6 h-6 text-gray-700 group-hover:text-gray-900" 
        />
      </button>

      <!-- Next Button -->
      <button
        on:click={nextSlide}
        class="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all group"
        aria-label="Nächster Slide"
      >
        <Icon 
          icon="mdi:chevron-right" 
          class="w-6 h-6 text-gray-700 group-hover:text-gray-900" 
        />
      </button>

      <!-- Pagination Dots -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {#each teasers as _, index}
          <button
            on:click={() => goToSlide(index)}
            class="w-3 h-3 rounded-full transition-all {
              index === currentIndex 
                ? 'bg-spiritual-saffron-600 w-8' 
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
        class="h-full bg-spiritual-saffron-600 transition-none"
        style="width: {((currentIndex + 1) / slideCount) * 100}%"
      />
    </div>
  {/if}
</section>