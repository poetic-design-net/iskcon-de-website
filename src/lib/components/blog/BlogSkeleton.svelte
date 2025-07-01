<script lang="ts">
  export let variant: 'grid' | 'featured' | 'list' = 'grid';
  export let count: number = 6;
</script>

{#if variant === 'featured'}
  <!-- Featured Blog Skeleton -->
  <div class="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100">
    <div class="animate-pulse">
      <!-- Featured Image Skeleton -->
      <div class="w-full h-64 md:h-80 bg-gray-200"></div>
      
      <!-- Content Skeleton -->
      <div class="p-6 md:p-8">
        <!-- Category Badge Skeleton -->
        <div class="inline-block mb-3">
          <div class="h-6 w-20 bg-gray-200 rounded-full"></div>
        </div>
        
        <!-- Title Skeleton -->
        <div class="space-y-2 mb-4">
          <div class="h-8 bg-gray-200 rounded w-3/4"></div>
          <div class="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
        
        <!-- Excerpt Skeleton -->
        <div class="space-y-2 mb-6">
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
        
        <!-- Meta Information Skeleton -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="h-4 w-16 bg-gray-200 rounded"></div>
            <div class="h-4 w-1 bg-gray-200 rounded"></div>
            <div class="h-4 w-20 bg-gray-200 rounded"></div>
          </div>
          <div class="h-6 w-6 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  </div>

{:else if variant === 'list'}
  <!-- List View Skeleton -->
  <div class="space-y-4">
    {#each Array(count) as _, i}
      <div class="flex gap-4 p-4 bg-white rounded-lg border border-gray-100 animate-pulse">
        <!-- Image Skeleton -->
        <div class="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-lg"></div>
        
        <!-- Content Skeleton -->
        <div class="flex-1 space-y-2">
          <!-- Category Skeleton -->
          <div class="h-4 w-16 bg-gray-200 rounded-full"></div>
          
          <!-- Title Skeleton -->
          <div class="h-5 bg-gray-200 rounded w-3/4"></div>
          
          <!-- Excerpt Skeleton -->
          <div class="space-y-1">
            <div class="h-3 bg-gray-200 rounded"></div>
            <div class="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
          
          <!-- Meta Skeleton -->
          <div class="flex items-center space-x-2">
            <div class="h-3 w-12 bg-gray-200 rounded"></div>
            <div class="h-3 w-1 bg-gray-200 rounded"></div>
            <div class="h-3 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    {/each}
  </div>

{:else}
  <!-- Grid View Skeleton (Default) -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
    {#each Array(count) as _, i}
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
        <!-- Image Skeleton -->
        <div class="w-full h-48 bg-gray-200"></div>
        
        <!-- Content Skeleton -->
        <div class="p-6 space-y-4">
          <!-- Category Badge Skeleton -->
          <div class="inline-block">
            <div class="h-5 w-16 bg-gray-200 rounded-full"></div>
          </div>
          
          <!-- Title Skeleton -->
          <div class="space-y-2">
            <div class="h-6 bg-gray-200 rounded"></div>
            <div class="h-6 bg-gray-200 rounded w-2/3"></div>
          </div>
          
          <!-- Excerpt Skeleton -->
          <div class="space-y-2">
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
          
          <!-- Meta Information Skeleton -->
          <div class="flex items-center justify-between pt-2">
            <div class="flex items-center space-x-2">
              <div class="h-3 w-12 bg-gray-200 rounded"></div>
              <div class="h-3 w-1 bg-gray-200 rounded"></div>
              <div class="h-3 w-16 bg-gray-200 rounded"></div>
            </div>
            <div class="h-5 w-5 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    {/each}
  </div>
{/if}

<style>
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
  
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
</style>