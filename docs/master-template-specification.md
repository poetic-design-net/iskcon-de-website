# Master Template System - Technische Spezifikation

## 1. SYSTEM ARCHITEKTUR

### 1.1 Überblick
Das Master Template System ersetzt das rigide Section-basierte System durch ein flexibles, komponenten-basiertes Content Block System mit zentraler Layout Engine.

### 1.2 Core Prinzipien
- **Atomic Design**: Content Blocks als atomare Einheiten
- **Composition over Configuration**: Flexibilität durch Komposition statt komplexe Konfiguration  
- **Design Token System**: Konsistente Gestaltung durch zentrale Tokens
- **Progressive Enhancement**: Grundfunktionalität ohne JavaScript, erweiterte Features mit JS

## 2. CONTENT BLOCK SYSTEM

### 2.1 Block-Definition
```typescript
interface ContentBlock {
  id: string;
  type: BlockType;
  data: BlockData;
  layout: LayoutConfig;
  styling: StylingConfig;
  animation?: AnimationConfig;
  conditions?: VisibilityConfig;
}

type BlockType = 
  | 'text'
  | 'media' 
  | 'grid'
  | 'cta'
  | 'quote'
  | 'accordion'
  | 'form'
  | 'spatial';
```

### 2.2 Layout System
```typescript
interface LayoutConfig {
  container: {
    size: 'narrow' | 'normal' | 'wide' | 'full';
    padding: SpacingToken;
  };
  arrangement: {
    type: 'single' | 'columns' | 'grid' | 'masonry';
    columns?: ResponsiveValue<number>;
    gap?: SpacingToken;
  };
  alignment: {
    horizontal: 'left' | 'center' | 'right';
    vertical: 'top' | 'center' | 'bottom';
  };
  responsive: ResponsiveConfig;
}

interface ResponsiveConfig {
  mobile: Partial<LayoutConfig>;
  tablet: Partial<LayoutConfig>;  
  desktop: Partial<LayoutConfig>;
}
```

### 2.3 Styling System
```typescript
interface StylingConfig {
  background: BackgroundConfig;
  spacing: SpacingConfig;
  borders: BorderConfig;
  shadows: ShadowConfig;
  theme: ThemeVariant;
}

interface BackgroundConfig {
  type: 'none' | 'color' | 'gradient' | 'image';
  value?: string | GradientConfig | ImageConfig;
  overlay?: OverlayConfig;
}

type ThemeVariant = 'default' | 'spiritual' | 'warm' | 'dark' | 'light';
```

## 3. CONTENT BLOCK LIBRARY

### 3.1 TextBlock
```typescript
interface TextBlockData {
  content: {
    title?: RichText;
    subtitle?: RichText;  
    body?: RichText;
    caption?: RichText;
  };
  typography: {
    titleLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    titleStyle: TypographyStyle;
    bodyStyle: TypographyStyle;
    alignment: 'left' | 'center' | 'right';
  };
  decoration: {
    badge?: BadgeConfig;
    divider?: DividerConfig;
    highlight?: HighlightConfig;
  };
}

interface TypographyStyle {
  size: TypographyToken;
  weight: FontWeight;
  color: ColorToken;
  lineHeight: LineHeightToken;
}
```

### 3.2 MediaBlock
```typescript
interface MediaBlockData {
  media: {
    type: 'image' | 'video' | 'gallery' | 'embed';
    primary: MediaAsset;
    gallery?: MediaAsset[];
  };
  display: {
    aspectRatio: AspectRatio;
    objectFit: 'cover' | 'contain' | 'fill';
    borderRadius: RadiusToken;
    overlay?: OverlayConfig;
  };
  interaction: {
    lightbox?: boolean;
    autoplay?: boolean;
    controls?: boolean;
    loop?: boolean;
  };
  accessibility: {
    alt: string;
    caption?: string;
    description?: string;
  };
}
```

### 3.3 GridBlock
```typescript
interface GridBlockData {
  items: GridItem[];
  display: {
    columns: ResponsiveValue<number>;
    gap: SpacingToken;
    equalHeight: boolean;
  };
  itemStyle: {
    cardStyle: 'none' | 'outlined' | 'elevated' | 'filled';
    imagePosition: 'top' | 'left' | 'right' | 'background';
    contentAlignment: 'left' | 'center' | 'right';
  };
}

interface GridItem {
  id: string;
  title: string;
  description?: string;
  image?: MediaAsset;
  link?: LinkConfig;
  badge?: BadgeConfig;
  metadata?: Record<string, any>;
}
```

### 3.4 CtaBlock
```typescript
interface CtaBlockData {
  buttons: ButtonConfig[];
  layout: {
    arrangement: 'horizontal' | 'vertical' | 'responsive';
    alignment: 'left' | 'center' | 'right';
    gap: SpacingToken;
  };
  context: {
    title?: string;
    description?: string;
    urgency?: UrgencyConfig;
  };
}

interface ButtonConfig {
  text: string;
  href: string;
  style: ButtonStyle;
  size: ButtonSize;
  icon?: IconConfig;
  analytics?: AnalyticsConfig;
  accessibility?: AccessibilityConfig;
}

type ButtonStyle = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
```

## 4. DESIGN TOKEN SYSTEM

### 4.1 Spacing Tokens
```typescript
const spacing = {
  // Base scale (rem)
  '0': '0',
  '1': '0.25rem',   // 4px
  '2': '0.5rem',    // 8px
  '3': '0.75rem',   // 12px
  '4': '1rem',      // 16px
  '6': '1.5rem',    // 24px
  '8': '2rem',      // 32px
  '12': '3rem',     // 48px
  '16': '4rem',     // 64px
  '20': '5rem',     // 80px
  '24': '6rem',     // 96px
  
  // Semantic tokens
  section: {
    compact: 'var(--spacing-12) var(--spacing-16)',
    normal: 'var(--spacing-16) var(--spacing-20)',
    spacious: 'var(--spacing-20) var(--spacing-24)'
  },
  container: {
    narrow: 'var(--spacing-4)',
    normal: 'var(--spacing-6)', 
    wide: 'var(--spacing-8)'
  }
} as const;
```

### 4.2 Typography Tokens
```typescript
const typography = {
  size: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px 
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem'   // 72px
  },
  
  // Semantic scales
  heading: {
    hero: 'clamp(2.25rem, 4vw + 1rem, 4.5rem)',
    section: 'clamp(1.875rem, 3vw + 1rem, 3rem)', 
    subsection: 'clamp(1.25rem, 2vw + 1rem, 1.875rem)'
  },
  
  body: {
    large: 'clamp(1.125rem, 1vw + 1rem, 1.25rem)',
    normal: '1rem',
    small: '0.875rem',
    caption: '0.75rem'
  }
} as const;
```

### 4.3 Color System
```typescript
const colors = {
  // Brand colors
  spiritual: {
    saffron: {
      50: '#fef7e6',
      500: '#f59e0b', 
      600: '#d97706',
      900: '#78350f'
    },
    blue: {
      50: '#eff6ff',
      500: '#3b82f6',
      600: '#2563eb', 
      900: '#1e3a8a'
    }
  },
  
  // Semantic colors
  semantic: {
    primary: 'var(--color-spiritual-saffron-600)',
    secondary: 'var(--color-spiritual-blue-600)',
    accent: 'var(--color-spiritual-saffron-500)',
    muted: 'var(--color-gray-500)'
  }
} as const;
```

## 5. TEMPLATE ENGINE

### 5.1 Master Template
```svelte
<!-- MasterTemplate.svelte -->
<script lang="ts">
  import ContentRenderer from './ContentRenderer.svelte';
  import TemplateProvider from './TemplateProvider.svelte';
  import type { PageTemplate } from './types';
  
  export let template: PageTemplate;
  export let content: ContentBlock[];
</script>

<TemplateProvider {template}>
  <article class="master-template">
    <ContentRenderer {content} />
  </article>
</TemplateProvider>

<style>
  .master-template {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
```

### 5.2 Content Renderer
```svelte
<!-- ContentRenderer.svelte -->
<script lang="ts">
  import { createBlockComponent } from './blockFactory';
  import BlockWrapper from './BlockWrapper.svelte';
  import type { ContentBlock } from './types';
  
  export let content: ContentBlock[];
  
  $: blocks = content.filter(block => shouldRenderBlock(block));
  
  function shouldRenderBlock(block: ContentBlock): boolean {
    return block.conditions 
      ? evaluateConditions(block.conditions)
      : true;
  }
</script>

{#each blocks as block, index (block.id)}
  <BlockWrapper 
    layout={block.layout}
    styling={block.styling} 
    animation={block.animation}
  >
    <svelte:component 
      this={createBlockComponent(block.type)}
      data={block.data}
      {block}
    />
  </BlockWrapper>
{/each}
```

### 5.3 Block Wrapper
```svelte
<!-- BlockWrapper.svelte -->
<script lang="ts">
  import { generateClasses } from './styleEngine';
  import type { LayoutConfig, StylingConfig, AnimationConfig } from './types';
  
  export let layout: LayoutConfig;
  export let styling: StylingConfig;
  export let animation: AnimationConfig | undefined = undefined;
  
  $: containerClasses = generateClasses('container', layout.container);
  $: arrangementClasses = generateClasses('arrangement', layout.arrangement);
  $: backgroundClasses = generateClasses('background', styling.background);
  $: spacingClasses = generateClasses('spacing', styling.spacing);
</script>

<section 
  class={`
    block-wrapper
    ${containerClasses}
    ${arrangementClasses} 
    ${backgroundClasses}
    ${spacingClasses}
  `}
  class:animated={animation}
  style={generateCustomProperties(styling)}
>
  <div class="block-content">
    <slot />
  </div>
</section>
```

## 6. BLOCK KOMPONENTEN

### 6.1 TextBlock Implementation
```svelte
<!-- blocks/TextBlock.svelte -->
<script lang="ts">
  import RichText from '$lib/components/RichText.svelte';
  import Badge from '$lib/components/ui/badge/Badge.svelte';
  import type { TextBlockData } from '../types';
  
  export let data: TextBlockData;
  
  $: ({content, typography, decoration} = data);
</script>

<div class="text-block" class:has-badge={decoration?.badge}>
  {#if decoration?.badge}
    <Badge variant={decoration.badge.variant}>
      {decoration.badge.text}
    </Badge>
  {/if}
  
  {#if content.title}
    <svelte:element 
      this={typography.titleLevel}
      class={`text-block__title ${typography.titleStyle}`}
    >
      <RichText value={content.title} />
    </svelte:element>
  {/if}
  
  {#if content.subtitle}
    <div class={`text-block__subtitle ${typography.bodyStyle}`}>
      <RichText value={content.subtitle} />
    </div>
  {/if}
  
  {#if content.body}
    <div class={`text-block__body ${typography.bodyStyle}`}>
      <RichText value={content.body} />
    </div>
  {/if}
  
  {#if decoration?.divider}
    <hr class="text-block__divider" />
  {/if}
</div>
```

### 6.2 GridBlock Implementation
```svelte
<!-- blocks/GridBlock.svelte -->
<script lang="ts">
  import GridItem from './GridItem.svelte';
  import type { GridBlockData } from '../types';
  
  export let data: GridBlockData;
  
  $: ({items, display, itemStyle} = data);
  $: gridClasses = `
    grid 
    gap-${display.gap}
    grid-cols-1
    md:grid-cols-${display.columns.tablet || display.columns.mobile}
    lg:grid-cols-${display.columns.desktop || display.columns.tablet}
  `;
</script>

<div class="grid-block">
  <div class={gridClasses}>
    {#each items as item (item.id)}
      <GridItem 
        {item}
        style={itemStyle}
        equalHeight={display.equalHeight}
      />
    {/each}
  </div>
</div>
```

## 7. SANITY INTEGRATION

### 7.1 Vereinfachtes Schema
```typescript
// sanity/schemas/page.ts
export const pageSchema = defineType({
  name: 'page',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      options: { source: 'title' }
    },
    {
      name: 'template',
      type: 'object',
      fields: [
        {
          name: 'type',
          type: 'string',
          options: {
            list: ['master', 'custom']
          }
        }
      ]
    },
    {
      name: 'content',
      type: 'array',
      of: [
        { type: 'textBlock' },
        { type: 'mediaBlock' },
        { type: 'gridBlock' },
        { type: 'ctaBlock' },
        { type: 'quoteBlock' },
        { type: 'accordionBlock' },
        { type: 'formBlock' },
        { type: 'spatialBlock' }
      ]
    }
  ]
});
```

### 7.2 Block Schema Beispiel
```typescript
// sanity/schemas/blocks/textBlock.ts
export const textBlockSchema = defineType({
  name: 'textBlock',
  type: 'object',
  fields: [
    {
      name: 'content',
      type: 'object',
      fields: [
        { name: 'title', type: 'array', of: [{ type: 'block' }] },
        { name: 'subtitle', type: 'array', of: [{ type: 'block' }] },
        { name: 'body', type: 'array', of: [{ type: 'block' }] }
      ]
    },
    {
      name: 'layout',
      type: 'reference',
      to: [{ type: 'layoutConfig' }]
    },
    {
      name: 'styling', 
      type: 'reference',
      to: [{ type: 'stylingConfig' }]
    }
  ]
});
```

## 8. MIGRATION STRATEGY

### 8.1 Legacy Converter
```typescript
// utils/legacyConverter.ts
export function convertLegacyHeroSection(section: SanityHeroSection): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  
  // Convert to TextBlock
  if (section.title || section.subtitle || section.description) {
    blocks.push({
      id: generateId(),
      type: 'text',
      data: {
        content: {
          title: section.title,
          subtitle: section.subtitle,
          body: section.description
        },
        typography: inferTypography(section),
        decoration: section.badge ? { badge: section.badge } : undefined
      },
      layout: inferLayout(section),
      styling: inferStyling(section)
    });
  }
  
  // Convert to MediaBlock  
  if (section.image) {
    blocks.push({
      id: generateId(),
      type: 'media',
      data: {
        media: {
          type: 'image',
          primary: section.image
        },
        display: inferMediaDisplay(section)
      },
      layout: inferMediaLayout(section),
      styling: inferMediaStyling(section)
    });
  }
  
  // Convert to CtaBlock
  if (section.buttons?.length || section.ctaText) {
    blocks.push({
      id: generateId(),
      type: 'cta',
      data: {
        buttons: convertButtons(section.buttons, section.ctaText, section.ctaLink)
      },
      layout: inferCtaLayout(section),
      styling: inferCtaStyling(section)
    });
  }
  
  return blocks;
}
```

### 8.2 Automated Migration Script
```typescript
// scripts/migrate-pages.ts
import { convertLegacyPage } from '../utils/legacyConverter';
import { client } from '../lib/sanity/client';

async function migratePagesToMasterTemplate() {
  // 1. Alle Legacy Pages laden
  const legacyPages = await client.fetch(`
    *[_type == "page" && !defined(template.type)] {
      _id,
      title,
      slug,
      sections[]->
    }
  `);
  
  console.log(`Migriere ${legacyPages.length} Legacy Pages...`);
  
  // 2. Jede Page konvertieren
  for (const page of legacyPages) {
    try {
      const convertedContent = convertLegacyPage(page);
      
      await client
        .patch(page._id)
        .set({
          'template.type': 'master',
          'content': convertedContent
        })
        .commit();
        
      console.log(`✅ Migriert: ${page.title}`);
    } catch (error) {
      console.error(`❌ Fehler bei ${page.title}:`, error);
    }
  }
}
```

## 9. TESTING STRATEGY

### 9.1 Block Testing
```typescript
// tests/blocks/TextBlock.test.ts
import { render, screen } from '@testing-library/svelte';
import TextBlock from '../src/blocks/TextBlock.svelte';

describe('TextBlock', () => {
  it('renders title and body content', () => {
    const data = {
      content: {
        title: [{ _type: 'block', children: [{ text: 'Test Title' }] }],
        body: [{ _type: 'block', children: [{ text: 'Test Body' }] }]
      },
      typography: {
        titleLevel: 'h2',
        titleStyle: 'heading-section',
        bodyStyle: 'body-normal'
      }
    };
    
    render(TextBlock, { data });
    
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test Title');
    expect(screen.getByText('Test Body')).toBeInTheDocument();
  });
});
```

### 9.2 Integration Testing
```typescript
// tests/integration/MasterTemplate.test.ts
import { render } from '@testing-library/svelte';
import MasterTemplate from '../src/MasterTemplate.svelte';

describe('MasterTemplate Integration', () => {
  it('renders complete page with multiple blocks', () => {
    const template = { type: 'master' };
    const content = [
      { id: '1', type: 'text', data: textData, layout: layout1 },
      { id: '2', type: 'media', data: mediaData, layout: layout2 },
      { id: '3', type: 'cta', data: ctaData, layout: layout3 }
    ];
    
    const { container } = render(MasterTemplate, { template, content });
    
    expect(container.querySelectorAll('.block-wrapper')).toHaveLength(3);
  });
});
```

## 10. PERFORMANCE OPTIMIERUNG

### 10.1 Lazy Loading
```typescript
// utils/blockFactory.ts
const blockComponents = {
  text: () => import('../blocks/TextBlock.svelte'),
  media: () => import('../blocks/MediaBlock.svelte'),
  grid: () => import('../blocks/GridBlock.svelte'),
  cta: () => import('../blocks/CtaBlock.svelte'),
  quote: () => import('../blocks/QuoteBlock.svelte'),
  accordion: () => import('../blocks/AccordionBlock.svelte'),
  form: () => import('../blocks/FormBlock.svelte'),
  spatial: () => import('../blocks/SpatialBlock.svelte')
};

export function createBlockComponent(type: BlockType) {
  return blockComponents[type];
}
```

### 10.2 Bundle Optimization
```typescript
// vite.config.ts
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'blocks-core': ['./src/blocks/TextBlock.svelte', './src/blocks/MediaBlock.svelte'],
          'blocks-interactive': ['./src/blocks/FormBlock.svelte', './src/blocks/AccordionBlock.svelte'],
          'blocks-layout': ['./src/blocks/GridBlock.svelte', './src/blocks/SpatialBlock.svelte']
        }
      }
    }
  }
};
```

---

*Spezifikation erstellt: 2025-01-30*  
*Framework: SvelteKit + Sanity CMS*  
*Version: 1.0*