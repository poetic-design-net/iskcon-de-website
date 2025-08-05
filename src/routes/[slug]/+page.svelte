<script lang="ts">
    import type { PageData } from './$types';
    import { PortableText } from '@portabletext/svelte';
    
    export let data: PageData;
    const { page } = data;

    // Null-Check für page
    if (!page) {
        console.error('Page not found');
    }

    // SEO-Titel und Beschreibung aus den page-Daten extrahieren
    const seoTitle = page?.seo?.title || page?.title || '';
    const seoDescription = page?.seo?.description || page?.description || '';

    const SITE_TITLE = 'ISKCON Deutschland';
</script>

<svelte:head>
    <title>{seoTitle} | {SITE_TITLE}</title>
    <meta name="description" content={seoDescription} />
    {#if page?.seo?.image?.asset?.url}
        <meta property="og:image" content={page.seo.image.asset.url} />
        <meta property="og:image:alt" content={seoTitle} />
        <meta name="twitter:image" content={page.seo.image.asset.url} />
        <meta name="twitter:image:alt" content={seoTitle} />
        <meta name="twitter:card" content="summary_large_image" />
    {/if}
    <meta property="og:title" content={seoTitle} />
    <meta property="og:description" content={seoDescription} />
    <meta property="og:site_name" content={SITE_TITLE} />
    <meta name="twitter:title" content={seoTitle} />
    <meta name="twitter:description" content={seoDescription} />
</svelte:head>

{#if page}
    <div class="min-h-screen">
        <header class="bg-white shadow">
            <div class="container mx-auto px-4 py-6">
                <nav class="text-sm" aria-label="Breadcrumb">
                    <ol class="list-none p-0 inline-flex">
                        <li class="flex items-center">
                            <a href="/" class="text-gray-600 hover:text-primary-600">Home</a>
                            <svg class="fill-current w-3 h-3 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/>
                            </svg>
                        </li>
                        <li class="text-gray-800">{page.title}</li>
                    </ol>
                </nav>
            </div>
        </header>

        <main class="container mx-auto px-4 py-12">
            <article class="prose prose-lg max-w-none">
                <h1 class="text-4xl font-bold text-gray-900 mb-6">{page.title}</h1>
                
                {#if page.description}
                    <p class="text-xl text-gray-600 mb-8">{page.description}</p>
                {/if}
                
                {#if page.content}
                    <div class="prose prose-lg max-w-none">
                        <PortableText value={page.content} />
                    </div>
                {/if}
            </article>
        </main>
    </div>
{:else}
    <div class="container mx-auto px-4 py-8">
        <p class="text-gray-500">Seite nicht gefunden</p>
    </div>
{/if}

<style lang="postcss">
    /* Zusätzliche Stile können hier hinzugefügt werden */
</style>