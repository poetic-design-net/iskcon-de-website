<script lang="ts">
  import Icon from '@iconify/svelte';
  import { Button } from '$lib/components/ui/button';
</script>

<section class="relative h-screen overflow-hidden">
  <!-- Background with animated pattern -->
  <div class="absolute inset-0 z-0">
    <!-- Animated SVG Background -->
    <svg class="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="hero-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#4b5563;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1f2937;stop-opacity:1" />
        </radialGradient>
        <pattern id="mandala-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#9ca3af" stroke-width="0.5" opacity="0.2"/>
          <circle cx="100" cy="100" r="60" fill="none" stroke="#9ca3af" stroke-width="0.5" opacity="0.2"/>
          <circle cx="100" cy="100" r="40" fill="none" stroke="#9ca3af" stroke-width="0.5" opacity="0.2"/>
          <circle cx="100" cy="100" r="20" fill="none" stroke="#9ca3af" stroke-width="0.5" opacity="0.2"/>
          <!-- Lotus petals - proper lotus flower shape -->
          <g transform="translate(100,100)">
            <!-- Inner lotus petals -->
            <path d="M0,-30 Q-15,-25 -20,-10 Q-15,0 0,5 Q15,0 20,-10 Q15,-25 0,-30" fill="#9ca3af" opacity="0.15" transform="rotate(0)"/>
            <path d="M0,-30 Q-15,-25 -20,-10 Q-15,0 0,5 Q15,0 20,-10 Q15,-25 0,-30" fill="#9ca3af" opacity="0.15" transform="rotate(72)"/>
            <path d="M0,-30 Q-15,-25 -20,-10 Q-15,0 0,5 Q15,0 20,-10 Q15,-25 0,-30" fill="#9ca3af" opacity="0.15" transform="rotate(144)"/>
            <path d="M0,-30 Q-15,-25 -20,-10 Q-15,0 0,5 Q15,0 20,-10 Q15,-25 0,-30" fill="#9ca3af" opacity="0.15" transform="rotate(216)"/>
            <path d="M0,-30 Q-15,-25 -20,-10 Q-15,0 0,5 Q15,0 20,-10 Q15,-25 0,-30" fill="#9ca3af" opacity="0.15" transform="rotate(288)"/>
            <!-- Outer lotus petals -->
            <path d="M0,-40 Q-20,-35 -25,-15 Q-20,0 0,10 Q20,0 25,-15 Q20,-35 0,-40" fill="#9ca3af" opacity="0.1" transform="rotate(36)"/>
            <path d="M0,-40 Q-20,-35 -25,-15 Q-20,0 0,10 Q20,0 25,-15 Q20,-35 0,-40" fill="#9ca3af" opacity="0.1" transform="rotate(108)"/>
            <path d="M0,-40 Q-20,-35 -25,-15 Q-20,0 0,10 Q20,0 25,-15 Q20,-35 0,-40" fill="#9ca3af" opacity="0.1" transform="rotate(180)"/>
            <path d="M0,-40 Q-20,-35 -25,-15 Q-20,0 0,10 Q20,0 25,-15 Q20,-35 0,-40" fill="#9ca3af" opacity="0.1" transform="rotate(252)"/>
            <path d="M0,-40 Q-20,-35 -25,-15 Q-20,0 0,10 Q20,0 25,-15 Q20,-35 0,-40" fill="#9ca3af" opacity="0.1" transform="rotate(324)"/>
            <!-- Center -->
            <circle cx="0" cy="0" r="8" fill="#9ca3af" opacity="0.2"/>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-gradient)"/>
      <rect width="100%" height="100%" fill="url(#mandala-pattern)"/>
    </svg>
    
    <!-- Overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
  </div>
  
  <!-- Content -->
  <div class="relative z-10 h-full flex items-center justify-center">
    <div class="container mx-auto px-4 text-center text-white">
      <!-- Sanskrit Title -->
      <p class="text-2xl md:text-3xl font-sanskrit text-gray-300 mb-4 animate-fade-in">
        भक्ति योग
      </p>
      
      <!-- Main Title -->
      <h1 class="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
        Bhakti-Yoga
      </h1>
      
      <!-- Subtitle -->
      <p class="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto animate-slide-up-delay">
        Der Pfad der liebenden Hingabe zu Krishna - 
        die natürliche Funktion der Seele
      </p>
      
      <!-- Maha Mantra -->
      <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto mb-8 animate-fade-in-delay">
        <p class="text-lg md:text-xl font-medium">
          Hare Krishna Hare Krishna · Krishna Krishna Hare Hare<br>
          Hare Rama Hare Rama · Rama Rama Hare Hare
        </p>
      </div>
      
      <!-- CTA Buttons -->
      <div class="flex flex-wrap gap-4 justify-center animate-fade-in-delay-2">
        <Button 
          href="#nine-processes"
          variant="premium"
          size="lg"
          class="shadow-xl"
        >
          Die 9 Prozesse entdecken
          <Icon icon="mdi:arrow-down" class="w-5 h-5" />
        </Button>
      </div>
    </div>
  </div>
  
  <!-- Scroll Indicator -->
  <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
    <Icon icon="mdi:chevron-double-down" class="w-8 h-8 text-white/60" />
  </div>
</section>

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in {
    animation: fade-in 1s ease-out;
  }
  
  .animate-slide-up {
    animation: slide-up 1s ease-out;
  }
  
  .animate-slide-up-delay {
    animation: slide-up 1s ease-out 0.2s both;
  }
  
  .animate-fade-in-delay {
    animation: fade-in 1s ease-out 0.4s both;
  }
  
  .animate-fade-in-delay-2 {
    animation: fade-in 1s ease-out 0.6s both;
  }
  
  .font-sanskrit {
    font-family: 'Noto Sans Devanagari', serif;
  }
</style>