# ISKCON.DE Master Template System - Implementierungs-Roadmap

## Nächste Schritte für die Umsetzung

Basierend auf der abgeschlossenen System-Analyse erstelle ich hier einen konkreten Implementierungsplan für die nächsten Schritte.

## Phase 1: Foundation Setup (Woche 1-2)

### Schritt 1.1: Core Infrastructure
```bash
# 1. Design Token System implementieren
src/lib/design-tokens/
├── spacing.ts          # Spacing-Token Definitionen
├── typography.ts       # Typography-Skala
├── colors.ts          # Farb-System
├── shadows.ts         # Shadow-System
└── index.ts           # Zentrale Exports

# 2. Layout Engine erstellen
src/lib/components/master-template/
├── utils/
│   ├── styleEngine.ts     # CSS-Klassen Generierung
│   ├── layoutEngine.ts    # Grid/Flex Layout Logic
│   └── tokenResolver.ts   # Design Token Resolver
└── core/
    ├── TemplateProvider.svelte
    ├── ContentRenderer.svelte
    └── BlockWrapper.svelte
```

**Konkrete Aufgaben:**
- [ ] Design Token System in TypeScript implementieren
- [ ] CSS Custom Properties für Design Tokens erstellen
- [ ] Layout Engine mit Tailwind CSS Klassen-Generierung
- [ ] TemplateProvider für Theme Context
- [ ] ContentRenderer für Block-Orchestrierung

### Schritt 1.2: Core Content Blocks
```bash
# 4 wichtigste Blocks zuerst implementieren
src/lib/components/master-template/blocks/
├── TextBlock.svelte       # Ersetzt PageHeroSection Text-Teile
├── MediaBlock.svelte      # Ersetzt PageMediaSection
├── GridBlock.svelte       # Ersetzt PageGridSection
└── CtaBlock.svelte        # Ersetzt PageCtaSection CTA-Teile
```

**Konkrete Aufgaben:**
- [ ] TextBlock mit RichText-Support
- [ ] MediaBlock mit Lightbox und Video-Support
- [ ] GridBlock mit responsiven Spalten
- [ ] CtaBlock mit Button-Arrays

## Phase 2: Block Development (Woche 3-4)

### Schritt 2.1: Erweiterte Blocks
```bash
src/lib/components/master-template/blocks/
├── QuoteBlock.svelte      # Ersetzt PageQuoteSection
├── AccordionBlock.svelte  # Ersetzt PageFaqSection
├── FormBlock.svelte       # Neue Funktionalität
└── SpatialBlock.svelte    # Spacing/Divider
```

### Schritt 2.2: Animation & Interaction System
```bash
src/lib/components/master-template/
├── animations/
│   ├── transitions.ts     # Svelte Transition Presets
│   ├── scrollTrigger.ts   # Scroll-basierte Animationen
│   └── motionPresets.ts   # Vordefinierte Motion-Patterns
└── interactions/
    ├── lightbox.ts        # Media Lightbox
    ├── carousel.ts        # Grid Carousel
    └── forms.ts           # Form Handling
```

## Phase 3: Sanity Integration (Woche 5)

### Schritt 3.1: Sanity Schema Migration
```bash
# Neue Sanity Schemas erstellen
studio-iskcon.de/schemas/
├── masterTemplate/
│   ├── page.ts            # Neues Page Schema
│   ├── contentBlocks/
│   │   ├── textBlock.ts
│   │   ├── mediaBlock.ts
│   │   ├── gridBlock.ts
│   │   └── ctaBlock.ts
│   └── configs/
│       ├── layoutConfig.ts
│       └── stylingConfig.ts
```

**Konkrete Aufgaben:**
- [ ] Neue Block-Schemas in Sanity Studio
- [ ] Migration Script für bestehende Pages
- [ ] Content-Editor UI für Block-Komposition
- [ ] Vorschau-Funktionalität im Studio

### Schritt 3.2: Legacy Converter
```bash
src/lib/utils/
├── migration/
│   ├── legacyConverter.ts     # Section → Block Converter
│   ├── schemaMapper.ts        # Schema Mapping Logic
│   └── contentAnalyzer.ts     # Content-Analyse für Migration
└── scripts/
    ├── migratePages.ts        # Batch Migration Script
    └── validateMigration.ts   # Post-Migration Validation
```

## Phase 4: Testing & Optimization (Woche 6)

### Schritt 4.1: Component Testing
```bash
tests/
├── blocks/
│   ├── TextBlock.test.ts
│   ├── MediaBlock.test.ts
│   ├── GridBlock.test.ts
│   └── CtaBlock.test.ts
├── integration/
│   ├── MasterTemplate.test.ts
│   └── ContentRenderer.test.ts
└── e2e/
    ├── pageRendering.spec.ts
    └── blockInteractions.spec.ts
```

### Schritt 4.2: Performance Optimization
```bash
src/lib/components/master-template/
├── lazy/
│   ├── blockLoader.ts         # Dynamic Block Loading
│   └── imageOptimization.ts   # Image Loading Strategies
└── bundling/
    ├── chunkStrategy.ts       # Bundle Splitting
    └── preloading.ts          # Resource Preloading
```

## Sofortige Nächste Schritte (Diese Woche)

### 1. Design Token System Setup (Tag 1-2)
```typescript
// src/lib/design-tokens/spacing.ts
export const spacing = {
  // Base scale
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  
  // Semantic tokens
  section: {
    compact: '3rem 4rem',
    normal: '4rem 5rem', 
    spacious: '5rem 6rem'
  }
} as const;

// CSS Custom Properties generieren
export function generateSpacingCSS() {
  return Object.entries(spacing).map(([key, value]) => {
    if (typeof value === 'string') {
      return `--spacing-${key}: ${value};`;
    }
    return '';
  }).join('\n');
}
```

### 2. Layout Engine Implementation (Tag 3-4)
```typescript
// src/lib/components/master-template/utils/styleEngine.ts
import { spacing, typography, colors } from '$lib/design-tokens';
import type { LayoutConfig, StylingConfig } from '../types';

export function generateClasses(
  type: 'container' | 'arrangement' | 'background' | 'spacing',
  config: any
): string {
  switch (type) {
    case 'container':
      return generateContainerClasses(config);
    case 'arrangement':
      return generateArrangementClasses(config);
    case 'background':
      return generateBackgroundClasses(config);
    case 'spacing':
      return generateSpacingClasses(config);
    default:
      return '';
  }
}

function generateContainerClasses(config: LayoutConfig['container']): string {
  const sizeClasses = {
    narrow: 'max-w-3xl',
    normal: 'max-w-6xl', 
    wide: 'max-w-7xl',
    full: 'max-w-none',
    breakout: 'max-w-8xl'
  };
  
  return [
    'mx-auto',
    sizeClasses[config.size],
    `px-${config.padding}`
  ].join(' ');
}
```

### 3. Erste Block-Implementierung (Tag 5-7)
```svelte
<!-- src/lib/components/master-template/blocks/TextBlock.svelte -->
<script lang="ts">
  import { generateClasses } from '../utils/styleEngine';
  import RichText from '$lib/components/global/PortableText.svelte';
  import type { TextBlockData } from '../types';
  
  export let data: TextBlockData;
  export let layout: LayoutConfig;
  export let styling: StylingConfig;
  
  $: titleClasses = generateClasses('typography', data.typography.titleStyle);
  $: bodyClasses = generateClasses('typography', data.typography.bodyStyle);
</script>

<div class="text-block" class:has-badge={data.decoration?.badge}>
  {#if data.decoration?.badge}
    <span class="badge badge--{data.decoration.badge.variant}">
      {data.decoration.badge.text}
    </span>
  {/if}
  
  {#if data.content.title}
    <svelte:element 
      this={data.typography.titleLevel}
      class="text-block__title {titleClasses}"
    >
      <RichText value={data.content.title} />
    </svelte:element>
  {/if}
  
  {#if data.content.body}
    <div class="text-block__body {bodyClasses}">
      <RichText value={data.content.body} />
    </div>
  {/if}
</div>
```

## Entwicklungsreihenfolge - Priorisierung

### Priorität 1 (Sofort starten)
1. **Design Token System** - Foundation für alles weitere
2. **TextBlock** - Häufigste Verwendung, einfache Implementation  
3. **MediaBlock** - Zweithäufigste Verwendung
4. **Layout Engine** - Kern des Systems

### Priorität 2 (Nach Foundation)
1. **GridBlock** - Komplexer, aber sehr wichtig
2. **CtaBlock** - Einfach, aber geschäftskritisch
3. **ContentRenderer** - Orchestrierung aller Blocks

### Priorität 3 (Erweiterte Features)
1. **QuoteBlock & AccordionBlock** - Spezialblocks
2. **Animation System** - UX Enhancement
3. **FormBlock** - Neue Funktionalität

## Tracking & Milestones

### Woche 1 Ziele
- [ ] Design Token System funktionsfähig
- [ ] TextBlock vollständig implementiert
- [ ] Layout Engine Grundfunktionen
- [ ] Erste Demo-Page mit Master Template

### Woche 2 Ziele  
- [ ] MediaBlock & GridBlock implementiert
- [ ] CtaBlock funktionsfähig
- [ ] Responsive Layout System getestet
- [ ] Performance-Baseline gemessen

### Woche 3-4 Ziele
- [ ] Alle 8 Content Blocks implementiert
- [ ] Animation System integriert
- [ ] Sanity Schema-Entwürfe erstellt

### Woche 5-6 Ziele
- [ ] Sanity Integration abgeschlossen
- [ ] Migration-Script funktionsfähig
- [ ] Erste echte Pages migriert
- [ ] Performance-Tests bestanden

## Team-Aufgaben

### Frontend Developer
- Design Token Implementation
- Block Component Development
- Layout Engine Programming
- Performance Optimization

### UI/UX Designer
- Block Design Patterns
- Content-Editor UX Flow
- Animation Specifications
- Responsive Behavior Definition

### Backend/CMS Developer
- Sanity Schema Design
- Migration Script Development
- Content Query Optimization
- Block Preview Implementation

## Erfolgsmessung

### Technical KPIs
- Bundle Size Reduction: -40KB target
- Page Load Speed: <2s LCP target  
- Developer Productivity: 50% weniger Code
- Test Coverage: >90% für alle Blocks

### User Experience KPIs
- Content-Editor Workflow: <5 Klicks pro Block
- Page Building Speed: 3x schneller
- Template Flexibility: 100% Legacy-Funktionalität abgedeckt
- Migration Success: 0 Content-Verlust

---

**Nächste konkrete Aktion:** Design Token System implementieren (Heute starten!)