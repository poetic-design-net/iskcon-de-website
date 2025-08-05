<script lang="ts">
  import Hero from '$lib/components/sections/Hero.svelte';
  import HomepageEventGrid from '$lib/components/sections/HomepageEventGrid.svelte';
  import GridSection from '$lib/components/sections/GridSection.svelte';
  import SliderSection from '$lib/components/sections/SliderSection.svelte';
  import GermanyMap from '$lib/components/sections/GermanyMap.svelte';
  import { ThemeTeaserSection } from '$lib/components/sections/homepage';
  import type { PageData } from './$types';

  export let data: PageData;
  // Extrahiere die Daten aus dem data-Objekt
  const { latestPosts, pages, temples, upcomingEvents, pastEvents, featuredEvents, eventCategories, homepageTeasers, homepage } = data;

</script>

<svelte:head>
  <title>{homepage?.seo?.metaTitle || homepage?.title || 'ISKCON Deutschland-Österreich'}</title>
  {#if homepage?.seo?.metaDescription}
    <meta name="description" content={homepage.seo.metaDescription} />
  {/if}
</svelte:head>

<div class="min-h-screen">
  <!-- Hero Section -->
  <Hero 
    heroData={homepage?.hero}
    latestEvent={upcomingEvents?.[0] || featuredEvents?.[0]}
    latestPost={latestPosts?.[0]}
    nearestTemple={temples}
  />

  <!-- Homepage Event Grid Section - PROMINENT AN DER SPITZE -->
  <section id="events">
    {#if (upcomingEvents && upcomingEvents.length > 0) || (pastEvents && pastEvents.length > 0)}
      <HomepageEventGrid
      events={upcomingEvents}
      {pastEvents}
      featuredEvents={featuredEvents}
      title="Veranstaltungen"
      subtitle="Nehmen Sie teil an unseren spirituellen Events und Festivals"
      />
    {/if}
  </section>

  <!-- Blog Posts Slider Section -->
  <section id="blog">
    {#if latestPosts && latestPosts.length > 0}
      <SliderSection posts={latestPosts.filter(post => post !== null) as any}>
      <div slot="header">
        <h2 class="text-3xl font-medium text-gray-900">Aktuelle Blog-Beiträge</h2>
        <p class="mt-4 text-xl text-gray-600">Erfahren Sie mehr über unsere aktuellen Themen und Gedanken</p>
      </div>
      </SliderSection>
    {/if}
  </section>

  <!-- Germany Map Section  -->
  <section id="tempel" class="bg-white py-12">
    <div class="container mx-auto px-4">
      <h2 class="mb-8 text-3xl font-medium text-gray-900">Unsere Tempel in Deutschland</h2>
      <GermanyMap {temples} />
    </div>
  </section>

  <!-- Theme Teaser Section - Vereinfachte Layout-Gruppierung -->
  {#if homepageTeasers && homepageTeasers.length > 0}
    <ThemeTeaserSection teasers={homepageTeasers} />
  {:else if pages && pages.length > 0}
    <!-- Fallback auf das alte Grid, falls keine Teaser vorhanden sind -->
    <div class="bg-gray-50">
      <div class="container mx-auto px-4 pt-12">
        <h2 class="text-3xl font-medium text-gray-900 mb-4">Unsere Themen</h2>
        <p class="text-xl text-gray-600 mb-8">Entdecken Sie mehr über Krishna-Bewusstsein und unsere Gemeinschaft</p>
      </div>
      <GridSection items={pages} />
    </div>
  {/if}

</div>
