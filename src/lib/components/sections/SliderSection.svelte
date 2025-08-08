<script lang="ts">
  import BlogCard from '$lib/components/global/BlogCard.svelte';
  import type { SanityPostProjected } from '$lib/types';
  import * as Card from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import Icon from '@iconify/svelte';
  
  type BasicItem = {
    title: string;
    description: string;
    slug: string;
  };

  export let items: Array<BasicItem> | undefined = undefined;
  export let posts: Array<SanityPostProjected> | undefined = undefined;
  
  let sliderContainer: HTMLElement;
  let isDragging = false;
  let startX: number;
  let scrollLeft: number;
  
  const handleMouseDown = (e: MouseEvent) => {
    isDragging = true;
    startX = e.pageX - sliderContainer.offsetLeft;
    scrollLeft = sliderContainer.scrollLeft;
    // sliderContainer.style.cursor = 'grabbing';
  };
  
  const handleMouseUp = () => {
    isDragging = false;
    // sliderContainer.style.cursor = 'grab';
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderContainer.offsetLeft;
    const walk = (x - startX) * 2;
    sliderContainer.scrollLeft = scrollLeft - walk;
  };

  const scrollToLeft = () => {
    sliderContainer.scrollBy({ left: -400, behavior: 'smooth' });
  };

  const scrollToRight = () => {
    sliderContainer.scrollBy({ left: 400, behavior: 'smooth' });
  };
</script>

<section class="py-8 sm:py-12 px-2 sm:px-4 bg-gray-50">
  <div class="container mx-auto mb-8">
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <slot name="header" />
      </div>
      
      <div class="hidden md:flex items-center gap-2">
        <Button variant="outline" size="icon" onclick={scrollToLeft} class="hover:bg-primary-500/10 border-gray-200">
          <Icon icon="mdi:chevron-left" class="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" onclick={scrollToRight} class="hover:bg-primary-500/10 border-gray-200">
          <Icon icon="mdi:chevron-right" class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
  
  <div class="container mx-auto pr-0 sm:px-4">
    <div class="relative lg:-mr-[calc(50vw-50%)] -mx-2 sm:mx-0">
      <div
        bind:this={sliderContainer}
        class="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar cursor-grab px-2 sm:px-0"
        style="overflow-y: hidden;"
        role="region"
        aria-label="Horizontal scrolling content"
        on:mousedown={handleMouseDown}
        on:mousemove={handleMouseMove}
        on:mouseup={handleMouseUp}
        on:mouseleave={handleMouseUp}
      >
          {#if posts}
            {#each posts.filter(post => post && post.slug) as post (post.slug)}
              <div class="flex-none w-[calc(100vw-10rem)] sm:w-[45vw] lg:w-[320px] xl:w-[350px] snap-start last:mr-4 sm:last:mr-8">
                <div class="h-full">
                  <BlogCard {post} />
                </div>
              </div>
            {/each}
          {:else if items}
            {#each items.filter(item => item && item.slug) as item (item.slug)}
              <div class="flex-none w-[calc(100vw-2rem)] sm:w-[calc(50vw-2rem)] lg:w-[calc(33.333vw-2rem)] snap-start">
                <Card.Root class="group h-full overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors duration-300">
                  <div class="relative aspect-[4/3] overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1714248376043-8c8e85c24826?auto=format&fit=crop&w=800&q=60"
                      alt={item.title}
                      class="h-full w-full object-cover"
                    />
                    
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20"></div>
                    
                    <div class="absolute top-4 right-4">
                      <Badge class="bg-primary-500/90 text-white backdrop-blur-sm border-0">
                        <Icon icon="mdi:star" class="w-3 h-3 mr-1" />
                        Neu
                      </Badge>
                    </div>

                    <div class="absolute inset-0 p-6 flex flex-col justify-end">
                      <Card.Title class="text-xl font-medium text-white group-hover:text-primary-500/90 transition-colors mb-3">
                        {item.title}
                      </Card.Title>
                      
                      <Card.Description class="text-gray-200 group-hover:text-white transition-colors leading-relaxed mb-4">
                        {item.description}
                      </Card.Description>
                      <a
                        href="/{item.slug}"
                        class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 self-start bg-white/90 text-primary-500 hover:bg-white group/btn"
                      >
                        <span class="mr-2">Weiterlesen</span>
                        <Icon icon="mdi:arrow-right" class="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </Card.Root>
              </div>
            {/each}
          {/if}
        </div>
    </div>
  </div>
  
  <!-- Add Blog Button -->
  <div class="container mx-auto mt-8">
    <div class="text-center">
      <Button 
        href="/blog" 
        variant="default"
        class="bg-primary-500 hover:bg-primary-600 text-white"
      >
        <Icon icon="mdi:newspaper" class="w-4 h-4 mr-2" />
        Alle Artikel lesen
      </Button>
    </div>
  </div>

</section>

<style>
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
    scroll-behavior: smooth;
    overflow-y: hidden;
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
</style>