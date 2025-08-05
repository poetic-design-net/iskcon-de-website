<script lang="ts">
  import Icon from '@iconify/svelte';
  
  export let navigation: {
    prev?: {
      title: string;
      slug: string;
      description: string;
    };
    next?: {
      title: string;
      slug: string;
      description: string;
    };
  };
  export let basePath: string = '/philosophie';
  export let sectionTitle: string = 'Weitere Philosophie-Themen entdecken';
</script>

{#if navigation && (navigation.prev || navigation.next)}
  <section class="border-t border-gray-200">
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-6xl mx-auto">
        <h3 class="text-xl font-semibold text-center mb-8 text-gray-700">
          {sectionTitle}
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Previous -->
          {#if navigation.prev}
            <a 
              href="{basePath}/{navigation.prev.slug}" 
              class="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div class="flex">
                <div class="flex items-center justify-center p-4 bg-gray-50 group-hover:bg-primary-500/10 transition-colors">
                  <Icon icon="mdi:arrow-left" class="w-8 h-8 text-gray-600 group-hover:text-primary-500" />
                </div>
                <div class="flex-1 p-6">
                  <p class="text-sm text-gray-500 mb-2">Vorheriges Thema</p>
                  <h4 class="text-lg font-semibold mb-2 group-hover:text-primary-500 transition-colors">
                    {navigation.prev.title}
                  </h4>
                  <p class="text-sm text-gray-600 line-clamp-2">
                    {navigation.prev.description}
                  </p>
                </div>
              </div>
            </a>
          {:else}
            <div></div>
          {/if}
          
          <!-- Next -->
          {#if navigation.next}
            <a 
              href="{basePath}/{navigation.next.slug}" 
              class="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div class="flex">
                <div class="flex-1 p-6">
                  <p class="text-sm text-gray-500 mb-2">Nächstes Thema</p>
                  <h4 class="text-lg font-semibold mb-2 group-hover:text-primary-500 transition-colors">
                    {navigation.next.title}
                  </h4>
                  <p class="text-sm text-gray-600 line-clamp-2">
                    {navigation.next.description}
                  </p>
                </div>
                <div class="flex items-center justify-center p-4 bg-gray-50 group-hover:bg-primary-500/10 transition-colors">
                  <Icon icon="mdi:arrow-right" class="w-8 h-8 text-gray-600 group-hover:text-primary-500" />
                </div>
              </div>
            </a>
          {/if}
        </div>
      </div>
    </div>
  </section>
{/if}

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>