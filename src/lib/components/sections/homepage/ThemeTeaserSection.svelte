<script lang="ts">
  import SimpleThemeTeaserSlider from './SimpleThemeTeaserSlider.svelte';
  import ThemeTeaser from './ThemeTeaser.svelte';
  import type { SanityHomepageTeaser } from '$lib/types';

  export let teasers: SanityHomepageTeaser[] = [];

  // Sortiere alle Teaser nach order
  $: sortedTeasers = [...teasers].sort((a, b) => (a.order || 0) - (b.order || 0));

  // Gruppiere Teaser nach Layout und behalte die Reihenfolge bei
  $: groups = sortedTeasers.reduce((acc, teaser) => {
    if (teaser.displayMode === 'single') {
      // Einzelne Teaser werden als eigene Gruppe behandelt
      acc.push({
        type: 'single',
        layout: teaser.layout,
        items: [teaser],
        minOrder: teaser.order || 0
      });
    } else {
      // Slider-Teaser werden nach Layout gruppiert
      const existingGroup = acc.find(g => 
        g.type === 'slider' && 
        g.layout === teaser.layout
      );
      
      if (existingGroup) {
        existingGroup.items.push(teaser);
        existingGroup.minOrder = Math.min(existingGroup.minOrder, teaser.order || 0);
      } else {
        acc.push({
          type: 'slider',
          layout: teaser.layout,
          items: [teaser],
          minOrder: teaser.order || 0
        });
      }
    }
    return acc;
  }, [] as Array<{
    type: 'single' | 'slider';
    layout: string;
    items: SanityHomepageTeaser[];
    minOrder: number;
  }>);

  // Sortiere Gruppen nach der niedrigsten order-Nummer in der Gruppe
  $: sortedGroups = groups.sort((a, b) => a.minOrder - b.minOrder);
</script>

<div class="space-y-0">
  {#each sortedGroups as group}
    {#if group.type === 'single'}
      <!-- Einzelner Teaser -->
      <ThemeTeaser
        theme={group.items[0].theme}
        layout={group.items[0].layout}
        headline={group.items[0].headline}
        teaser={group.items[0].teaser}
        highlight={group.items[0].highlight}
        image={group.items[0].image}
        ctaText={group.items[0].ctaText}
        ctaLink={group.items[0].ctaLink || '#'}
        badge={group.items[0].badge}
      />
    {:else if group.items.length > 1}
      <!-- Slider für mehrere Teaser -->
      <SimpleThemeTeaserSlider
        teasers={group.items}
        title=""
        autoplay={false}
      />
    {:else}
      <!-- Einzelner Teaser ohne Slider -->
      <ThemeTeaser
        theme={group.items[0].theme}
        layout={group.items[0].layout}
        headline={group.items[0].headline}
        teaser={group.items[0].teaser}
        highlight={group.items[0].highlight}
        image={group.items[0].image}
        ctaText={group.items[0].ctaText}
        ctaLink={group.items[0].ctaLink || '#'}
        badge={group.items[0].badge}
      />
    {/if}
  {/each}
</div>