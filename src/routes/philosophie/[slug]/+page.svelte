<script lang="ts">
  import type { PageData } from './$types';
  import Icon from '@iconify/svelte';
  import SanityImage from '$lib/components/global/SanityImage.svelte';
  import PortableText from '$lib/components/global/PortableText.svelte';
  
  // Import der statischen Komponenten für Fallback
  import BhaktiYogaPage from '../bhakti-yoga/+page.svelte';
  import VedischeSchriftenPage from '../vedische-schriften/+page.svelte';
  import KrishnaPage from '../krishna/+page.svelte';
  
  export let data: PageData;
  const { page, isStatic, navigation } = data;
</script>

<svelte:head>
  <title>{page.title} | ISKCON Deutschland</title>
  <meta name="description" content={page.seo?.description || page.description || ''} />
  {#if page.seo?.image?.asset?.url}
    <meta property="og:image" content={page.seo.image.asset.url} />
  {/if}
</svelte:head>

{#if isStatic}
  <!-- Statische Seiten rendern -->
  {#if page.category === 'bhakti-yoga'}
    <BhaktiYogaPage {navigation} />
  {:else if page.category === 'vedische-schriften'}
    <VedischeSchriftenPage {navigation} />
  {:else if page.category === 'krishna'}
    <KrishnaPage {navigation} />
  {:else}
    <!-- Fallback für andere statische Seiten -->
    <section class="py-12 md:py-16">
      <div class="container mx-auto px-4">
        <a href="/philosophie" class="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <Icon icon="mdi:arrow-left" class="w-4 h-4 mr-2" />
          Zurück zur Philosophie-Übersicht
        </a>
        
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">{page.title}</h1>
          <p class="text-xl text-gray-700 mb-8">{page.subtitle}</p>
          <div class="prose prose-lg">
            <p>{page.description}</p>
          </div>
        </div>
      </div>
    </section>
  {/if}
{:else}
  <!-- Dynamische Sanity-Seiten -->
  <article>
    <!-- Hero Section -->
    {#if page.content?.hero}
      <section class="relative py-12 md:py-16 {page.content.hero.backgroundType === 'gradient' ? 'bg-gradient-to-b from-purple-50 to-white' : ''}">
        {#if page.content.hero.image}
          <div class="absolute inset-0 z-0">
            <SanityImage
              image={page.content.hero.image}
              alt={page.title}
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black/40"></div>
          </div>
        {/if}
        
        <div class="container mx-auto px-4 relative z-10">
          <a href="/philosophie" class="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
            <Icon icon="mdi:arrow-left" class="w-4 h-4 mr-2" />
            Zurück zur Philosophie-Übersicht
          </a>
          
          <div class="max-w-4xl">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{page.title}</h1>
            {#if page.content.hero.subtitle}
              <p class="text-xl text-gray-700">{page.content.hero.subtitle}</p>
            {/if}
          </div>
        </div>
      </section>
    {:else}
      <!-- Einfacher Header ohne Hero -->
      <section class="py-12 md:py-16">
        <div class="container mx-auto px-4">
          <a href="/philosophie" class="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
            <Icon icon="mdi:arrow-left" class="w-4 h-4 mr-2" />
            Zurück zur Philosophie-Übersicht
          </a>
          
          <div class="max-w-4xl">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{page.title}</h1>
            {#if page.description}
              <p class="text-xl text-gray-700">{page.description}</p>
            {/if}
          </div>
        </div>
      </section>
    {/if}

    <!-- Hauptinhalt -->
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto">
        <!-- Einführung -->
        {#if page.content?.introduction}
          <div class="prose prose-lg max-w-none mb-12">
            <PortableText blocks={page.content.introduction} />
          </div>
        {/if}

        <!-- Kernkonzepte -->
        {#if page.content?.concepts && page.content.concepts.length > 0}
          <section class="mb-16">
            <h2 class="text-3xl font-bold mb-8">Kernkonzepte</h2>
            <div class="space-y-8">
              {#each page.content.concepts as concept}
                <div class="bg-gray-50 rounded-lg p-6">
                  <div class="flex items-start gap-4">
                    {#if concept.icon}
                      <div class="text-3xl">{concept.icon}</div>
                    {/if}
                    <div class="flex-1">
                      <h3 class="text-xl font-semibold mb-2">
                        {concept.title}
                        {#if concept.sanskritName}
                          <span class="text-gray-600 font-normal">({concept.sanskritName})</span>
                        {/if}
                      </h3>
                      {#if concept.description}
                        <p class="text-gray-700 mb-4">{concept.description}</p>
                      {/if}
                      {#if concept.detailedContent}
                        <div class="prose prose-sm max-w-none">
                          <PortableText blocks={concept.detailedContent} />
                        </div>
                      {/if}
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </section>
        {/if}

        <!-- Schriftstellen -->
        {#if page.content?.scriptures && page.content.scriptures.length > 0}
          <section class="mb-16">
            <h2 class="text-3xl font-bold mb-8">Schriftstellen</h2>
            <div class="space-y-6">
              {#each page.content.scriptures as scripture}
                <div class="bg-white border-l-4 border-purple-600 p-6">
                  {#if scripture.sanskritVerse}
                    <p class="text-lg font-sanskrit text-purple-800 mb-2">{scripture.sanskritVerse}</p>
                  {/if}
                  <blockquote class="text-lg italic text-gray-700 mb-2">
                    "{scripture.quote}"
                  </blockquote>
                  {#if scripture.reference}
                    <cite class="block text-gray-600 mb-4">- {scripture.reference}</cite>
                  {/if}
                  {#if scripture.explanation}
                    <div class="prose prose-sm max-w-none">
                      <PortableText value={scripture.explanation} />
                    </div>
                  {/if}
                </div>
              {/each}
            </div>
          </section>
        {/if}

        <!-- Praktische Anwendung -->
        {#if page.content?.practicalApplication}
          <section class="mb-16">
            <h2 class="text-3xl font-bold mb-8">
              {page.content.practicalApplication.title || 'Praktische Anwendung'}
            </h2>
            {#if page.content.practicalApplication.sections}
              <div class="space-y-6">
                {#each page.content.practicalApplication.sections as section}
                  <div class="bg-gray-50 rounded-lg p-6">
                    <h3 class="text-xl font-semibold mb-4">{section.title}</h3>
                    {#if section.practices}
                      <ul class="space-y-2">
                        {#each section.practices as practice}
                          <li class="flex items-start">
                            <span class="text-purple-600 mr-2">•</span>
                            <span>{practice}</span>
                          </li>
                        {/each}
                      </ul>
                    {/if}
                  </div>
                {/each}
              </div>
            {/if}
          </section>
        {/if}

        <!-- FAQ -->
        {#if page.content?.faqs && page.content.faqs.length > 0}
          <section class="mb-16">
            <h2 class="text-3xl font-bold mb-8">Häufige Fragen</h2>
            <div class="space-y-4">
              {#each page.content.faqs as faq}
                <details class="bg-white border border-gray-200 rounded-lg p-4">
                  <summary class="font-semibold cursor-pointer">{faq.question}</summary>
                  <div class="mt-4 prose prose-sm max-w-none">
                    <PortableText value={faq.answer} />
                  </div>
                </details>
              {/each}
            </div>
          </section>
        {/if}

        <!-- Verwandte Themen -->
        {#if page.relatedTopics && page.relatedTopics.length > 0}
          <section class="mb-16">
            <h2 class="text-3xl font-bold mb-8">Verwandte Themen</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              {#each page.relatedTopics as topic}
                <a 
                  href="/philosophie/{topic.slug}" 
                  class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                  <div class="flex items-start gap-3">
                    {#if topic.icon}
                      <span class="text-2xl">{topic.icon}</span>
                    {/if}
                    <div>
                      <h3 class="font-semibold">{topic.title}</h3>
                      {#if topic.description}
                        <p class="text-sm text-gray-600 mt-1">{topic.description}</p>
                      {/if}
                    </div>
                  </div>
                </a>
              {/each}
            </div>
          </section>
        {/if}

        <!-- Call to Action -->
        <div class="text-center bg-purple-50 rounded-lg p-8">
          <h3 class="text-2xl font-bold mb-4">Vertiefen Sie Ihr Verständnis</h3>
          <p class="text-lg text-gray-700 mb-6">
            Besuchen Sie unsere Tempel oder nehmen Sie an unseren Programmen teil.
          </p>
          <div class="flex flex-wrap gap-4 justify-center">
            <a 
              href="/tempel" 
              class="bg-purple-600 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-700 transition-colors"
            >
              Tempel finden
            </a>
            <a 
              href="/events" 
              class="bg-white text-purple-600 px-6 py-3 rounded-md font-medium border-2 border-purple-600 hover:bg-purple-50 transition-colors"
            >
              Veranstaltungen
            </a>
          </div>
        </div>
      </div>
    </div>
  </article>
{/if}

<!-- Philosophie Navigation -->
{#if navigation && (navigation.prev || navigation.next)}
  <section class="border-t border-gray-200 mt-16">
    <div class="container mx-auto px-4 py-12">
      <div class="max-w-6xl mx-auto">
        <h3 class="text-xl font-semibold text-center mb-8 text-gray-700">
          Weitere Philosophie-Themen entdecken
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Previous -->
          {#if navigation.prev}
            <a 
              href="/philosophie/{navigation.prev.slug || navigation.prevSlug}" 
              class="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div class="flex">
                <!-- Arrow Section -->
                <div class="flex items-center justify-center p-4 bg-gray-50 group-hover:bg-purple-50 transition-colors">
                  <Icon icon="mdi:arrow-left" class="w-8 h-8 text-gray-600 group-hover:text-purple-600" />
                </div>
                
                <!-- Content Section -->
                <div class="flex-1 p-6">
                  <p class="text-sm text-gray-500 mb-2">Vorheriges Thema</p>
                  <h4 class="text-lg font-semibold mb-2 group-hover:text-purple-600 transition-colors">
                    {navigation.prev.title}
                  </h4>
                  <p class="text-sm text-gray-600 line-clamp-2">
                    {navigation.prev.description}
                  </p>
                </div>
                
                <!-- Image Section -->
                {#if navigation.prev.featuredImage}
                  <div class="w-32 h-full">
                    {#if navigation.prev.featuredImage.asset}
                      <SanityImage
                        src={navigation.prev.featuredImage}
                        alt={navigation.prev.title}
                        class="w-full h-full object-cover"
                      />
                    {:else}
                      <img 
                        src={navigation.prev.featuredImage} 
                        alt={navigation.prev.title}
                        class="w-full h-full object-cover"
                      />
                    {/if}
                  </div>
                {/if}
              </div>
            </a>
          {:else}
            <!-- Empty placeholder to maintain grid -->
            <div></div>
          {/if}
          
          <!-- Next -->
          {#if navigation.next}
            <a 
              href="/philosophie/{navigation.next.slug || navigation.nextSlug}" 
              class="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div class="flex">
                <!-- Image Section -->
                {#if navigation.next.featuredImage}
                  <div class="w-32 h-full">
                    {#if navigation.next.featuredImage.asset}
                      <SanityImage
                        src={navigation.next.featuredImage}
                        alt={navigation.next.title}
                        class="w-full h-full object-cover"
                      />
                    {:else}
                      <img 
                        src={navigation.next.featuredImage} 
                        alt={navigation.next.title}
                        class="w-full h-full object-cover"
                      />
                    {/if}
                  </div>
                {/if}
                
                <!-- Content Section -->
                <div class="flex-1 p-6">
                  <p class="text-sm text-gray-500 mb-2">Nächstes Thema</p>
                  <h4 class="text-lg font-semibold mb-2 group-hover:text-purple-600 transition-colors">
                    {navigation.next.title}
                  </h4>
                  <p class="text-sm text-gray-600 line-clamp-2">
                    {navigation.next.description}
                  </p>
                </div>
                
                <!-- Arrow Section -->
                <div class="flex items-center justify-center p-4 bg-gray-50 group-hover:bg-purple-50 transition-colors">
                  <Icon icon="mdi:arrow-right" class="w-8 h-8 text-gray-600 group-hover:text-purple-600" />
                </div>
              </div>
            </a>
          {/if}
        </div>
      </div>
    </div>
  </section>
{/if}