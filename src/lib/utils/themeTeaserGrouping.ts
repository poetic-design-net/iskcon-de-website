import type { SanityHomepageTeaser } from '$lib/types';

// ThemeTeaser Slider Types
export type LayoutType = 'imageLeft' | 'imageRight' | 'imageFull';
export type RenderMode = 'slider' | 'list';

export interface LayoutGroup {
  layout: LayoutType;
  items: SanityHomepageTeaser[];
  renderMode: RenderMode;
  sliderConfig?: SliderConfig;
}

export interface SliderConfig {
  itemsPerView: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  spacing: number;
  navigation: boolean;
  pagination: boolean;
  autoplay: boolean;
  autoplayDelay?: number;
}

export interface ThemeTeaserSliderOptions {
  minSliderCount: number;
  enableGrouping: boolean;
  fallbackToList: boolean;
  groupSpacing: 'compact' | 'normal' | 'spacious';
}

// Slider-Konfigurationen
export const sliderConfigs: Record<LayoutType, SliderConfig> = {
  imageLeft: {
    itemsPerView: { mobile: 1, tablet: 1, desktop: 1 },
    spacing: 24,
    navigation: true,
    pagination: true,
    autoplay: false
  },
  imageRight: {
    itemsPerView: { mobile: 1, tablet: 1, desktop: 1 },
    spacing: 24,
    navigation: true,
    pagination: true,
    autoplay: false
  },
  imageFull: {
    itemsPerView: { mobile: 1, tablet: 1, desktop: 1 },
    spacing: 0,
    navigation: true,
    pagination: true,
    autoplay: true,
    autoplayDelay: 8000
  }
};

/**
 * ThemeTeaser Gruppierungs-Engine
 * Gruppiert ThemeTeaser nach Layout-Typ und bestimmt Render-Modus
 */
export class ThemeTeaserGroupingEngine {
  private readonly options: ThemeTeaserSliderOptions;

  constructor(options: Partial<ThemeTeaserSliderOptions> = {}) {
    this.options = {
      minSliderCount: 2,
      enableGrouping: true,
      fallbackToList: true,
      groupSpacing: 'normal',
      ...options
    };
  }

  /**
   * Gruppiert ThemeTeaser nach Layout-Typ
   */
  groupByLayout(teasers: SanityHomepageTeaser[]): LayoutGroup[] {
    if (!this.options.enableGrouping) {
      return this.createFallbackGroups(teasers);
    }

    // Sortierung nach order-Feld beibehalten
    const sortedTeasers = [...teasers].sort((a, b) => (a.order || 0) - (b.order || 0));

    // Gruppierung nach Layout
    const layoutGroups = this.groupTeasersByLayout(sortedTeasers);

    // Render-Modus bestimmen
    return layoutGroups.map(group => ({
      ...group,
      renderMode: this.determineRenderMode(group),
      sliderConfig: this.getSliderConfig(group.layout)
    }));
  }

  /**
   * Gruppiert Teasers nach Layout-Typ
   */
  private groupTeasersByLayout(teasers: SanityHomepageTeaser[]): Omit<LayoutGroup, 'renderMode' | 'sliderConfig'>[] {
    const groups = new Map<LayoutType, SanityHomepageTeaser[]>();

    // Gruppierung nach Layout-Typ
    teasers.forEach(teaser => {
      const layout = teaser.layout;
      if (!groups.has(layout)) {
        groups.set(layout, []);
      }
      groups.get(layout)!.push(teaser);
    });

    // Konvertierung zu LayoutGroup-Objekten (ohne renderMode und sliderConfig)
    return Array.from(groups.entries()).map(([layout, items]) => ({
      layout,
      items
    }));
  }

  /**
   * Bestimmt den Render-Modus basierend auf der Anzahl der Items
   */
  private determineRenderMode(group: Omit<LayoutGroup, 'renderMode' | 'sliderConfig'>): RenderMode {
    return group.items.length >= this.options.minSliderCount ? 'slider' : 'list';
  }

  /**
   * Gibt die Layout-spezifische Slider-Konfiguration zurück
   */
  private getSliderConfig(layout: LayoutType): SliderConfig {
    return sliderConfigs[layout];
  }

  /**
   * Erstellt Fallback-Gruppen ohne Gruppierung
   */
  private createFallbackGroups(teasers: SanityHomepageTeaser[]): LayoutGroup[] {
    return teasers.map(teaser => ({
      layout: teaser.layout,
      items: [teaser],
      renderMode: 'list' as RenderMode,
      sliderConfig: this.getSliderConfig(teaser.layout)
    }));
  }

  /**
   * Analysiert die Layout-Verteilung der Teasers
   */
  analyzeLayoutDistribution(teasers: SanityHomepageTeaser[]): Record<LayoutType, number> {
    const distribution: Record<LayoutType, number> = {
      imageLeft: 0,
      imageRight: 0,
      imageFull: 0
    };

    teasers.forEach(teaser => {
      distribution[teaser.layout]++;
    });

    return distribution;
  }

  /**
   * Überprüft, ob Slider-Darstellung empfohlen wird
   */
  shouldUseSliders(teasers: SanityHomepageTeaser[]): boolean {
    const groups = this.groupByLayout(teasers);
    return groups.some(group => group.renderMode === 'slider');
  }

  /**
   * Gibt Statistiken über die Gruppierung zurück
   */
  getGroupingStats(teasers: SanityHomepageTeaser[]): {
    totalTeasers: number;
    totalGroups: number;
    sliderGroups: number;
    listGroups: number;
    layoutDistribution: Record<LayoutType, number>;
  } {
    const groups = this.groupByLayout(teasers);
    const sliderGroups = groups.filter(g => g.renderMode === 'slider').length;
    const listGroups = groups.filter(g => g.renderMode === 'list').length;

    return {
      totalTeasers: teasers.length,
      totalGroups: groups.length,
      sliderGroups,
      listGroups,
      layoutDistribution: this.analyzeLayoutDistribution(teasers)
    };
  }
}

/**
 * Convenience-Funktion für einfache Verwendung
 */
export function groupThemeTeasers(
  teasers: SanityHomepageTeaser[],
  options?: Partial<ThemeTeaserSliderOptions>
): LayoutGroup[] {
  const engine = new ThemeTeaserGroupingEngine(options);
  return engine.groupByLayout(teasers);
}

/**
 * Utility-Funktion zur Überprüfung der Browser-Unterstützung
 */
export function supportsModernSliderFeatures(): boolean {
  if (typeof window === 'undefined') return false;
  
  return !!(
    window.IntersectionObserver &&
    typeof window.requestAnimationFrame === 'function' &&
    CSS?.supports?.('display', 'grid')
  );
}