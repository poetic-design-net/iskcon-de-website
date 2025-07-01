<script lang="ts">
  import { urlFor } from '$lib/sanity/client';
  import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
  import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';

  export let src: SanityImageSource;
  export let alt: string;
  export let width: number = 800;
  export let height: number | undefined = undefined;
  export let className: string = '';
  export let objectFit: 'contain' | 'cover' = 'cover';

  // Weniger strenge Validierung: Versuche urlFor, aber catche Fehler sauber
  $: imageBuilder = (() => {
    try {
      // Prüfe nur auf die kritischsten Fälle die zu Fehlern führen
      if (!src || (typeof src === 'object' && 'asset' in src && src.asset && '_ref' in src.asset && src.asset._ref === '')) {
        return null;
      }
      return urlFor(src) as ImageUrlBuilder;
    } catch (error) {
      console.warn('SanityImage: Fehler beim Erstellen des ImageBuilders:', error);
      return null;
    }
  })();
  $: imageUrl = imageBuilder?.width(width).url() ?? '';

  function generateSrcSet(builder: ImageUrlBuilder | null): string {
    if (!builder) return '';
    
    const sizes = [0.5, 1, 1.5, 2];
    return sizes
      .map(scale => {
        const w = Math.round(width * scale);
        return `${builder.width(w).url()} ${w}w`;
      })
      .join(', ');
  }
</script>

{#if imageUrl}
  <img
    src={imageUrl}
    {alt}
    class={`${className} object-${objectFit}`}
    loading="lazy"
    decoding="async"
    width={width}
    height={height}
    srcset={generateSrcSet(imageBuilder)}
    sizes="(max-width: {width}px) 100vw, {width}px"
  />
{/if}