// Design Token System - Spacing
// Zentrales Spacing-System für das Master Template System

export const spacing = {
  // Base scale (rem basiert)
  '0': '0',
  '1': '0.25rem',   // 4px
  '2': '0.5rem',    // 8px  
  '3': '0.75rem',   // 12px
  '4': '1rem',      // 16px
  '5': '1.25rem',   // 20px
  '6': '1.5rem',    // 24px
  '8': '2rem',      // 32px
  '10': '2.5rem',   // 40px
  '12': '3rem',     // 48px
  '16': '4rem',     // 64px
  '20': '5rem',     // 80px
  '24': '6rem',     // 96px
  '32': '8rem',     // 128px
  '40': '10rem',    // 160px
  '48': '12rem',    // 192px
  '56': '14rem',    // 224px
  '64': '16rem',    // 256px

  // Semantic spacing tokens für Sections
  section: {
    compact: 'var(--spacing-12) var(--spacing-16)',     // 3rem 4rem
    normal: 'var(--spacing-16) var(--spacing-20)',      // 4rem 5rem
    spacious: 'var(--spacing-20) var(--spacing-24)',    // 5rem 6rem
    hero: 'var(--spacing-24) var(--spacing-32)'         // 6rem 8rem
  },

  // Container padding tokens
  container: {
    narrow: 'var(--spacing-4)',     // 1rem
    normal: 'var(--spacing-6)',     // 1.5rem  
    wide: 'var(--spacing-8)',       // 2rem
    full: 'var(--spacing-12)'       // 3rem
  },

  // Component spacing
  component: {
    xs: 'var(--spacing-1)',         // 0.25rem
    sm: 'var(--spacing-2)',         // 0.5rem
    md: 'var(--spacing-4)',         // 1rem
    lg: 'var(--spacing-6)',         // 1.5rem
    xl: 'var(--spacing-8)'          // 2rem
  },

  // Grid gaps
  grid: {
    tight: 'var(--spacing-2)',      // 0.5rem
    normal: 'var(--spacing-4)',     // 1rem
    relaxed: 'var(--spacing-6)',    // 1.5rem
    loose: 'var(--spacing-8)'       // 2rem
  }
} as const;

// Type für Spacing Tokens
export type SpacingToken = keyof typeof spacing | `${keyof typeof spacing}`;

// CSS Custom Properties generieren
export function generateSpacingCSS(): string {
  const entries = Object.entries(spacing);
  const cssProperties: string[] = [];

  entries.forEach(([key, value]) => {
    if (typeof value === 'string') {
      cssProperties.push(`  --spacing-${key}: ${value};`);
    } else if (typeof value === 'object') {
      // Nested objects (section, container, etc.)
      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        cssProperties.push(`  --spacing-${key}-${nestedKey}: ${nestedValue};`);
      });
    }
  });

  return `:root {\n${cssProperties.join('\n')}\n}`;
}

// Spacing Utilities für Tailwind CSS Integration
export const spacingUtils = {
  // Padding utilities
  padding: {
    section: {
      compact: 'py-12 md:py-16',
      normal: 'py-16 md:py-20', 
      spacious: 'py-20 md:py-24',
      hero: 'py-24 md:py-32'
    },
    container: {
      narrow: 'px-4',
      normal: 'px-6',
      wide: 'px-8', 
      full: 'px-12'
    }
  },

  // Margin utilities  
  margin: {
    section: {
      compact: 'mb-12 md:mb-16',
      normal: 'mb-16 md:mb-20',
      spacious: 'mb-20 md:mb-24'
    },
    component: {
      xs: 'mb-1',
      sm: 'mb-2', 
      md: 'mb-4',
      lg: 'mb-6',
      xl: 'mb-8'
    }
  },

  // Gap utilities
  gap: {
    tight: 'gap-2',
    normal: 'gap-4',
    relaxed: 'gap-6', 
    loose: 'gap-8'
  }
};

// Helper function für responsive spacing
export function getResponsiveSpacing(
  mobile: keyof typeof spacing,
  tablet?: keyof typeof spacing,
  desktop?: keyof typeof spacing
): string {
  const mobileClass = `p-${mobile}`;
  const tabletClass = tablet ? `md:p-${tablet}` : '';
  const desktopClass = desktop ? `lg:p-${desktop}` : '';
  
  return [mobileClass, tabletClass, desktopClass].filter(Boolean).join(' ');
}

// Spacing validation
export function isValidSpacingToken(token: string): token is SpacingToken {
  return token in spacing || token.includes('-');
}