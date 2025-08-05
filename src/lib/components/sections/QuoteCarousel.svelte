<script lang="ts">
  import Icon from '@iconify/svelte';
  import { onMount, onDestroy } from 'svelte';
  
  export let quotes: Array<{
    text: string;
    source: string;
    sanskrit?: string;
  }> = [];
  
  export let title = "Weisheit aus den Schriften";
  export let bgColor = "bg-white";
  
  let currentQuote = 0;
  
  function nextQuote() {
    currentQuote = (currentQuote + 1) % quotes.length;
  }
  
  function prevQuote() {
    currentQuote = currentQuote === 0 ? quotes.length - 1 : currentQuote - 1;
  }
  
  let interval: NodeJS.Timeout;
  
  onMount(() => {
    if (quotes.length > 1) {
      interval = setInterval(nextQuote, 7000);
    }
  });
  
  onDestroy(() => {
    if (interval) {
      clearInterval(interval);
    }
  });
</script>

{#if quotes.length > 0}
  <section class="py-16 md:py-20 {bgColor}">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
        {title}
      </h2>
      
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative">
          <!-- Quote Display -->
          <div class="text-center mb-8">
            <Icon icon="mdi:format-quote-open" class="w-12 h-12 text-primary-500/30 mx-auto mb-6" />
            
            <!-- Sanskrit -->
            {#if quotes[currentQuote].sanskrit}
              <p class="text-xl md:text-2xl font-sanskrit text-gray-700 mb-4">
                {quotes[currentQuote].sanskrit}
              </p>
            {/if}
            
            <!-- Translation -->
            <p class="text-lg md:text-xl italic text-gray-700 leading-relaxed mb-6 max-w-3xl mx-auto">
              "{quotes[currentQuote].text}"
            </p>
            
            <!-- Source -->
            <cite class="text-gray-600 font-medium">
              - {quotes[currentQuote].source}
            </cite>
          </div>
          
          <!-- Navigation -->
          {#if quotes.length > 1}
            <div class="flex items-center justify-center gap-4">
              <!-- Previous Button -->
              <button
                on:click={prevQuote}
                class="p-2 rounded-full bg-primary-500/10 hover:bg-primary-500/20 transition-colors"
                aria-label="Vorheriges Zitat"
              >
                <Icon icon="mdi:chevron-left" class="w-5 h-5 text-primary-500" />
              </button>
              
              <!-- Dots -->
              <div class="flex items-center gap-2">
                {#each quotes as _, index}
                  <button
                    on:click={() => currentQuote = index}
                    class="w-2 h-2 rounded-full transition-all duration-300
                           {currentQuote === index ? 'w-8 bg-primary-500' : 'bg-primary-500/30 hover:bg-primary-500/50'}"
                    aria-label="Zitat {index + 1}"
                  />
                {/each}
              </div>
              
              <!-- Next Button -->
              <button
                on:click={nextQuote}
                class="p-2 rounded-full bg-primary-500/10 hover:bg-primary-500/20 transition-colors"
                aria-label="Nächstes Zitat"
              >
                <Icon icon="mdi:chevron-right" class="w-5 h-5 text-primary-500" />
              </button>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </section>
{/if}

<style>
  .font-sanskrit {
    font-family: 'Noto Sans Devanagari', serif;
  }
</style>