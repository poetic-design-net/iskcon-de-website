// Design Token System - Typography
// Zentrales Typography-System für das Master Template System

export const typography = {
  // Base font sizes (rem basiert)
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
    '7xl': '4.5rem',  // 72px
    '8xl': '6rem',    // 96px
    '9xl': '8rem'     // 128px
  },

  // Semantic typography scales
  heading: {
    hero: 'clamp(2.25rem, 4vw + 1rem, 4.5rem)',     // Responsive hero
    section: 'clamp(1.875rem, 3vw + 1rem, 3rem)',   // Section headings
    subsection: 'clamp(1.25rem, 2vw + 1rem, 1.875rem)', // Subsections
    card: 'clamp(1.125rem, 1.5vw + 1rem, 1.25rem)'  // Card headings
  },

  body: {
    large: 'clamp(1.125rem, 1vw + 1rem, 1.25rem)',  // Large body text
    normal: '1rem',                                   // Normal body text
    small: '0.875rem',                               // Small text
    caption: '0.75rem'                               // Captions, labels
  },

  // Font weights
  weight: {
    thin: '100',
    light: '300', 
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900'
  },

  // Line heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375', 
    normal: '1.5',
    relaxed: '1.625',
    loose: '2'
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em'
  },

  // Font families
  family: {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    serif: ['Merriweather', 'Georgia', 'serif'],
    mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
    spiritual: ['Crimson Text', 'Georgia', 'serif'] // Für spirituelle Texte
  }
} as const;

// Typography presets für verschiedene Anwendungsfälle
export const typographyPresets = {
  // Hero Styles
  hero: {
    primary: {
      fontSize: 'var(--typography-heading-hero)',
      fontWeight: 'var(--typography-weight-bold)',
      lineHeight: 'var(--typography-line-height-tight)',
      letterSpacing: 'var(--typography-letter-spacing-tight)'
    },
    secondary: {
      fontSize: 'var(--typography-body-large)',
      fontWeight: 'var(--typography-weight-normal)',
      lineHeight: 'var(--typography-line-height-relaxed)',
      letterSpacing: 'var(--typography-letter-spacing-normal)'
    }
  },

  // Section Styles
  section: {
    title: {
      fontSize: 'var(--typography-heading-section)',
      fontWeight: 'var(--typography-weight-semibold)',
      lineHeight: 'var(--typography-line-height-snug)',
      letterSpacing: 'var(--typography-letter-spacing-tight)'
    },
    subtitle: {
      fontSize: 'var(--typography-body-large)',
      fontWeight: 'var(--typography-weight-normal)',
      lineHeight: 'var(--typography-line-height-relaxed)',
      letterSpacing: 'var(--typography-letter-spacing-normal)'
    }
  },

  // Body Styles
  body: {
    primary: {
      fontSize: 'var(--typography-body-normal)',
      fontWeight: 'var(--typography-weight-normal)',
      lineHeight: 'var(--typography-line-height-relaxed)',
      letterSpacing: 'var(--typography-letter-spacing-normal)'
    },
    large: {
      fontSize: 'var(--typography-body-large)',
      fontWeight: 'var(--typography-weight-normal)',
      lineHeight: 'var(--typography-line-height-relaxed)',
      letterSpacing: 'var(--typography-letter-spacing-normal)'
    },
    small: {
      fontSize: 'var(--typography-body-small)',
      fontWeight: 'var(--typography-weight-normal)',
      lineHeight: 'var(--typography-line-height-normal)',
      letterSpacing: 'var(--typography-letter-spacing-normal)'
    }
  },

  // Spiritual/Quote Styles
  spiritual: {
    quote: {
      fontSize: 'var(--typography-heading-subsection)',
      fontWeight: 'var(--typography-weight-medium)',
      lineHeight: 'var(--typography-line-height-relaxed)',
      letterSpacing: 'var(--typography-letter-spacing-wide)',
      fontFamily: 'var(--typography-family-spiritual)'
    },
    verse: {
      fontSize: 'var(--typography-body-large)',
      fontWeight: 'var(--typography-weight-normal)',
      lineHeight: 'var(--typography-line-height-loose)',
      letterSpacing: 'var(--typography-letter-spacing-wide)',
      fontFamily: 'var(--typography-family-spiritual)'
    }
  }
};

// CSS Custom Properties generieren
export function generateTypographyCSS(): string {
  const cssProperties: string[] = [];

  // Size tokens
  Object.entries(typography.size).forEach(([key, value]) => {
    cssProperties.push(`  --typography-size-${key}: ${value};`);
  });

  // Semantic scales
  Object.entries(typography.heading).forEach(([key, value]) => {
    cssProperties.push(`  --typography-heading-${key}: ${value};`);
  });

  Object.entries(typography.body).forEach(([key, value]) => {
    cssProperties.push(`  --typography-body-${key}: ${value};`);
  });

  // Weight tokens
  Object.entries(typography.weight).forEach(([key, value]) => {
    cssProperties.push(`  --typography-weight-${key}: ${value};`);
  });

  // Line height tokens
  Object.entries(typography.lineHeight).forEach(([key, value]) => {
    cssProperties.push(`  --typography-line-height-${key}: ${value};`);
  });

  // Letter spacing tokens
  Object.entries(typography.letterSpacing).forEach(([key, value]) => {
    cssProperties.push(`  --typography-letter-spacing-${key}: ${value};`);
  });

  // Font families
  Object.entries(typography.family).forEach(([key, value]) => {
    const fontStack = Array.isArray(value) ? value.join(', ') : value;
    cssProperties.push(`  --typography-family-${key}: ${fontStack};`);
  });

  return `:root {\n${cssProperties.join('\n')}\n}`;
}

// Tailwind CSS Utilities für Typography
export const typographyUtils = {
  // Font size utilities
  text: {
    hero: 'text-4xl md:text-5xl lg:text-6xl',
    section: 'text-2xl md:text-3xl lg:text-4xl',
    subsection: 'text-xl md:text-2xl',
    large: 'text-lg md:text-xl',
    normal: 'text-base',
    small: 'text-sm',
    caption: 'text-xs'
  },

  // Font weight utilities
  font: {
    thin: 'font-thin',
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-medium',
    extrabold: 'font-extrabold',
    black: 'font-black'
  },

  // Line height utilities
  leading: {
    none: 'leading-none',
    tight: 'leading-tight',
    snug: 'leading-snug',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
    loose: 'leading-loose'
  },

  // Letter spacing utilities
  tracking: {
    tighter: 'tracking-tighter',
    tight: 'tracking-tight',
    normal: 'tracking-normal',
    wide: 'tracking-wide',
    wider: 'tracking-wider',
    widest: 'tracking-widest'
  }
};

// Typography helper functions
export function getTypographyClasses(
  size: keyof typeof typographyUtils.text,
  weight?: keyof typeof typographyUtils.font,
  leading?: keyof typeof typographyUtils.leading
): string {
  const classes = [typographyUtils.text[size]];
  
  if (weight) {
    classes.push(typographyUtils.font[weight]);
  }
  
  if (leading) {
    classes.push(typographyUtils.leading[leading]);
  }
  
  return classes.join(' ');
}

// Responsive typography helper
export function getResponsiveTypography(
  mobile: keyof typeof typographyUtils.text,
  tablet?: keyof typeof typographyUtils.text,
  desktop?: keyof typeof typographyUtils.text
): string {
  if (!tablet && !desktop) {
    return typographyUtils.text[mobile];
  }
  
  // Custom responsive combination
  const mobileClass = typographyUtils.text[mobile];
  const tabletClass = tablet ? `md:${typographyUtils.text[tablet]}` : '';
  const desktopClass = desktop ? `lg:${typographyUtils.text[desktop]}` : '';
  
  return [mobileClass, tabletClass, desktopClass].filter(Boolean).join(' ');
}

// Type guards
export type TypographyToken = keyof typeof typography.size | keyof typeof typography.heading | keyof typeof typography.body;
export type FontWeight = keyof typeof typography.weight;
export type LineHeight = keyof typeof typography.lineHeight;

export function isValidTypographyToken(token: string): token is TypographyToken {
  return token in typography.size || 
         token in typography.heading || 
         token in typography.body;
}