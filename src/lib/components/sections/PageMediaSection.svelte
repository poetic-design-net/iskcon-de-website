<script lang="ts">
    import SanityImage from '$lib/components/global/SanityImage.svelte';

    export let title: string | undefined = undefined;
    export let media: any | undefined = undefined;
    export let videoUrl: string | undefined = undefined;

    // Hilfsfunktion um Video-Provider und ID aus der URL zu extrahieren
    function getVideoEmbed(url: string): { provider: 'youtube' | 'vimeo', id: string } | null {
        if (!url) return null;

        // YouTube URL Pattern
        const youtubePattern = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const youtubeMatch = url.match(youtubePattern);
        if (youtubeMatch) {
            return { provider: 'youtube', id: youtubeMatch[1] };
        }

        // Vimeo URL Pattern
        const vimeoPattern = /vimeo\.com\/(?:.*\/)?(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|)(\d+)(?:|\/\?)/;
        const vimeoMatch = url.match(vimeoPattern);
        if (vimeoMatch) {
            return { provider: 'vimeo', id: vimeoMatch[1] };
        }

        return null;
    }

    $: videoEmbed = videoUrl ? getVideoEmbed(videoUrl) : null;
</script>

<section class="py-8 md:py-12 px-4 bg-gradient-to-b from-transparent via-muted/20 to-transparent">
    <div class="container mx-auto max-w-6xl">
        {#if title}
            <h2 class="text-2xl md:text-3xl font-medium text-center mb-6 md:mb-10 text-foreground/90">{title}</h2>
        {/if}

        <div class="max-w-4xl mx-auto">
            {#if videoUrl && videoEmbed}
                <div class="group relative pb-[56.25%] h-0 overflow-hidden rounded-xl bg-black/5 transition-all duration-300 hover:shadow-xl">
                    {#if videoEmbed.provider === 'youtube'}
                        <iframe
                            src="https://www.youtube-nocookie.com/embed/{videoEmbed.id}"
                            title={title || 'Video'}
                            class="absolute top-0 left-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                    {:else if videoEmbed.provider === 'vimeo'}
                        <iframe
                            src="https://player.vimeo.com/video/{videoEmbed.id}"
                            title={title || 'Video'}
                            class="absolute top-0 left-0 w-full h-full"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                    {/if}
                </div>
            {:else if media}
                <div class="group relative rounded-xl overflow-hidden bg-card transition-all duration-300 hover:shadow-xl">
                    <div class="aspect-video relative overflow-hidden">
                        <SanityImage
                            src={media}
                            alt={title || 'Media'}
                            width={1024}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            objectFit="cover"
                        />
                    </div>
                </div>
            {/if}
        </div>
    </div>
</section>

<style>
    iframe {
        border: 0;
    }
    
    /* Subtile Animation für Video-Container */
    .group:hover .relative {
        box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    }
    
    /* Elegante Hintergrund-Verläufe */
    section {
        position: relative;
    }
    
    section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(ellipse at center, hsl(var(--muted) / 0.1) 0%, transparent 70%);
        pointer-events: none;
    }
</style>