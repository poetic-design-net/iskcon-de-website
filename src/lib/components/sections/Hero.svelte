<script lang="ts">
  import { onMount } from 'svelte';
  import { Button } from '$lib/components/ui/button';
  import Icon from '@iconify/svelte';
  
  let heroSection: HTMLElement;
  let hasScrolled = false;

  const handleScroll = () => {
    if (!heroSection) return;
    const scrolled = window.scrollY;
    const heroHeight = heroSection.offsetHeight;
    const opacity = Math.max(0, Math.min(1, 1 - scrolled / (heroHeight / 2)));
    heroSection.style.setProperty('--scroll-opacity', opacity.toString());
  };

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<section
  bind:this={heroSection}
  class="relative min-h-screen flex items-center justify-center overflow-hidden"
  style="--scroll-opacity: 1"
>
  <!-- Hintergrundbild mit Backdrop Filter -->
  <div class="absolute inset-0 z-0">
    <img
      src="/img/hero_nature.webp"
      alt="Nature Background"
      class="absolute inset-0 w-full h-full object-cover object-center"
    />
    <div class="absolute inset-0 bg-black/30"></div>
    
    <!-- Zusätzliche Overlay-Effekte -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
  </div>

  <!-- Content -->
  <div 
    class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center"
    style="opacity: var(--scroll-opacity)"
  >
    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-medium text-white leading-tight mb-8">
      <span class="block mb-4">Willkommen bei</span>
      <span class="text-spiritual-saffron-400">ISKCON Deutschland-Österreich</span>
    </h1>
    
    <p class="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto mb-12 leading-relaxed">
      Wir gehören zur Internationalen Gesellschaft für Krishna-Bewusstsein (ISKCON) 
      und freuen uns auf Ihren Besuch.
    </p>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <Button 
        variant="outline" 
        size="lg"
        class="text-white border-white hover:bg-white hover:text-slate-900 bg-transparent text-lg px-8 py-4 h-auto"
        href="#about"
      >
        <Icon icon="mdi:book-open" class="w-5 h-5 mr-2" />
        Mehr erfahren
      </Button>
      <Button 
        size="lg"
        class="bg-spiritual-saffron-500 hover:bg-spiritual-saffron-600 text-white border-spiritual-saffron-400 text-lg px-8 py-4 h-auto"
        href="#contact"
      >
        <Icon icon="mdi:email" class="w-5 h-5 mr-2" />
        Kontakt aufnehmen
      </Button>
    </div>
  </div>

  <!-- Scroll-Down-Indikator -->
  <div 
    class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white/80"
    style="opacity: var(--scroll-opacity)"
  >
    <Icon icon="mdi:chevron-down" class="w-6 h-6" />
  </div>
</section>

<style>
  section {
    --scroll-opacity: 1;
  }
</style>