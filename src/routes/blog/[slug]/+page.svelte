<script lang="ts">
  import { format } from 'date-fns';
  import { de } from 'date-fns/locale';
  import { PostNavigation, BlogPostSidebar } from '$lib/components/blog';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<div class="container mx-auto px-4 md:px-6 pt-32 py-12">
  <!-- Zwei-Spalten Layout: Main Content + Sidebar -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
    <!-- Main Content -->
    <main class="lg:col-span-2">
      <article class="prose prose-lg max-w-none">
    <!-- Header -->
    <header class="mb-8">
      <h1 class="mb-4 text-4xl font-medium">{data.post?.title}</h1>
      
      <!-- Meta-Informationen -->
      <div class="flex flex-wrap gap-4 text-gray-600">
        <time>
          {format(new Date(data.post?.publishedAt || new Date()), 'dd. MMMM yyyy', { locale: de })}
        </time>
        
        {#if data.post?.categories && data.post.categories.length > 0}
          <div class="flex gap-2">
            {#each data.post?.categories || [] as category}
              <span class="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-sm">
                {category.title}
              </span>
            {/each}
          </div>
        {/if}
      </div>
    </header>

    <!-- Hauptbild -->
    {#if data.post?.featuredImage?.asset?.url}
      <img
        src={data.post.featuredImage.asset.url}
        alt={data.post?.title}
        class="w-full rounded-xl object-cover mb-8 aspect-video"
      />
    {/if}

    <!-- Beschreibung -->
    <div class="lead mb-8">
      {data.post?.excerpt}
    </div>

    <!-- Tags -->
    {#if data.post?.tags && data.post.tags.length > 0}
      <div class="flex flex-wrap gap-2 mb-8">
        {#each data.post?.tags || [] as tag}
          <span class="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">
            #{tag}
          </span>
        {/each}
      </div>
    {/if}

    <!-- Inhalt -->
    {#if data.post?.content}
      <div class="prose prose-lg max-w-none">
        {#each data.post?.content || [] as block}
          {#if block._type === 'block'}
            <p>
              {#each block.children as child}
                {#if child._type === 'span'}
                  {child.text}
                {/if}
              {/each}
            </p>
          {/if}
        {/each}
      </div>
    {/if}
      </article>

      <!-- Post Navigation -->
      <PostNavigation
        previousPost={data.previousPost}
        nextPost={data.nextPost}
      />
    </main>

    <!-- Sidebar -->
    <aside class="lg:col-span-1">
      {#if data.post}
        <BlogPostSidebar
          currentPost={data.post}
          relatedPosts={data.relatedPosts || []}
          latestPosts={data.latestPosts || []}
          allTags={data.post.tags || []}
          author={data.post.author || null}
        />
      {/if}
    </aside>
  </div>
</div>