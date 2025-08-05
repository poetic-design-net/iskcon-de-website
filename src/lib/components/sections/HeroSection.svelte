<script lang="ts">
  import Icon from '@iconify/svelte';
  import { Button } from '$lib/components/ui/button';
  
  // Props
  export let title: string;
  export let subtitle: string = '';
  export let backgroundType: 'gradient' | 'pattern' | 'image' = 'gradient';
  export let backgroundImage: string = '';
  export let pattern: 'sanskrit' | 'lotus' | 'om' | 'none' = 'none';
  export let minHeight: string = 'min-h-[60vh]';
  export let button: {
    text: string;
    onClick?: () => void;
    href?: string;
    icon?: string;
    variant?: 'default' | 'soft' | 'outline' | 'premium' | 'secondary' | 'link';
  } | null = null;
  export let centered: boolean = true;
  export let textColor: 'dark' | 'light' = 'dark';
</script>

<section class="relative {minHeight} flex items-center justify-center overflow-hidden">
  <!-- Background -->
  <div class="absolute inset-0">
    {#if backgroundType === 'image' && backgroundImage}
      <img 
        src={backgroundImage} 
        alt=""
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
    {:else if backgroundType === 'gradient'}
      <div class="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
        {#if pattern === 'sanskrit'}
          <svg class="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="sanskrit-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <text x="50" y="50" font-family="Noto Sans Devanagari" font-size="24" fill="rgb(198 105 93)" opacity="0.3">ॐ</text>
                <text x="150" y="100" font-family="Noto Sans Devanagari" font-size="20" fill="rgb(198 105 93)" opacity="0.2">श्री</text>
                <text x="100" y="150" font-family="Noto Sans Devanagari" font-size="22" fill="rgb(198 105 93)" opacity="0.25">कृष्ण</text>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sanskrit-pattern)" />
          </svg>
        {:else if pattern === 'lotus'}
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-20 left-20 w-32 h-32">
              <Icon icon="mdi:lotus" class="w-full h-full text-primary-500" />
            </div>
            <div class="absolute bottom-20 right-20 w-40 h-40">
              <Icon icon="mdi:lotus" class="w-full h-full text-gray-400" />
            </div>
          </div>
        {:else if pattern === 'om'}
          <div class="absolute inset-0 flex items-center justify-center opacity-5">
            <Icon icon="mdi:om" class="w-96 h-96 text-primary-500" />
          </div>
        {/if}
      </div>
    {:else}
      <div class="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
    {/if}
  </div>
  
  <!-- Content -->
  <div class="relative z-10 container mx-auto px-4 {centered ? 'text-center' : ''}">
    <h1 class="text-5xl md:text-7xl font-bold mb-6 {textColor === 'light' ? 'text-white' : 'text-gray-900'}">
      {title}
    </h1>
    {#if subtitle}
      <p class="text-xl md:text-2xl {textColor === 'light' ? 'text-gray-200' : 'text-gray-700'} mb-8 max-w-3xl {centered ? 'mx-auto' : ''}">
        {subtitle}
      </p>
    {/if}
    
    {#if button}
      <Button
        on:click={button.onClick}
        href={button.href}
        variant={button.variant || 'soft'}
        size="lg"
        class="shadow-md"
      >
        {#if button.icon}
          <Icon icon={button.icon} class="w-5 h-5" />
        {/if}
        {button.text}
      </Button>
    {/if}
    
    <slot />
  </div>
  
  <!-- Decorative Elements -->
  <div class="absolute bottom-0 left-0 w-64 h-64 bg-primary-500 rounded-full filter blur-3xl opacity-10 -translate-x-32 translate-y-32"></div>
  <div class="absolute top-0 right-0 w-96 h-96 bg-gray-300 rounded-full filter blur-3xl opacity-10 translate-x-48 -translate-y-48"></div>
</section>