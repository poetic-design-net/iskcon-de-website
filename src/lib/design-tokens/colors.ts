// Design Token System - Colors
// Zentrales Color-System für das Master Template System

export const colors = {
  // ISKCON Brand Colors - Spiritual Theme
  spiritual: {
    saffron: {
      50: '#fef7e6',
      100: '#fde8b8',
      200: '#fcd889',
      300: '#fbc85a',
      400: '#fab82b',
      500: '#f59e0b',  // Primary Saffron
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f'
    },
    blue: {
      50: '#eff6ff',
      100: '#dbeafe', 
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',  // Primary Blue
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a'
    },
    gold: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f'
    }
  },

  // Semantic colors
  semantic: {
    // Primary brand colors
    primary: 'var(--color-spiritual-saffron-600)',
    'primary-foreground': 'var(--color-white)',
    
    // Secondary colors
    secondary: 'var(--color-spiritual-blue-600)',
    'secondary-foreground': 'var(--color-white)',
    
    // Accent colors
    accent: 'var(--color-spiritual-gold-500)',
    'accent-foreground': 'var(--color-gray-900)',
    
    // Muted colors
    muted: 'var(--color-gray-100)',
    'muted-foreground': 'var(--color-gray-600)',
    
    // Background colors
    background: 'var(--color-white)',
    foreground: 'var(--color-gray-900)',
    
    // Card colors
    card: 'var(--color-white)',
    'card-foreground': 'var(--color-gray-900)',
    
    // Border colors
    border: 'var(--color-gray-200)',
    input: 'var(--color-gray-200)',
    
    // Ring colors
    ring: 'var(--color-spiritual-saffron-600)',
    
    // State colors
    destructive: 'var(--color-red-500)',
    'destructive-foreground': 'var(--color-white)',
    
    warning: 'var(--color-amber-500)',
    'warning-foreground': 'var(--color-white)',
    
    success: 'var(--color-green-500)',
    'success-foreground': 'var(--color-white)',
    
    info: 'var(--color-blue-500)',
    'info-foreground': 'var(--color-white)'
  },

  // Neutral gray scale
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712'
  },

  // State colors
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d'
  },

  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d'
  },

  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f'
  },

  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a'
  },

  // Special colors
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent'
} as const;

// Theme variants
export const themes = {
  default: {
    primary: colors.spiritual.saffron[600],
    secondary: colors.spiritual.blue[600],
    accent: colors.spiritual.gold[500],
    background: colors.white,
    foreground: colors.gray[900],
    muted: colors.gray[100],
    'muted-foreground': colors.gray[600],
    card: colors.white,
    'card-foreground': colors.gray[900],
    border: colors.gray[200]
  },

  spiritual: {
    primary: colors.spiritual.saffron[600],
    secondary: colors.spiritual.blue[600], 
    accent: colors.spiritual.gold[500],
    background: colors.spiritual.saffron[50],
    foreground: colors.gray[900],
    muted: colors.spiritual.saffron[100],
    'muted-foreground': colors.gray[700],
    card: colors.white,
    'card-foreground': colors.gray[900],
    border: colors.spiritual.saffron[200]
  },

  warm: {
    primary: colors.amber[600],
    secondary: colors.amber[700],
    accent: colors.amber[500],
    background: colors.amber[50],
    foreground: colors.gray[900],
    muted: colors.amber[100],
    'muted-foreground': colors.gray[700],
    card: colors.white,
    'card-foreground': colors.gray[900],
    border: colors.amber[200]
  },

  dark: {
    primary: colors.spiritual.saffron[500],
    secondary: colors.spiritual.blue[500],
    accent: colors.spiritual.gold[400],
    background: colors.gray[900],
    foreground: colors.gray[50],
    muted: colors.gray[800],
    'muted-foreground': colors.gray[400],
    card: colors.gray[800],
    'card-foreground': colors.gray[50],
    border: colors.gray[700]
  }
} as const;

// CSS Custom Properties generieren
export function generateColorCSS(themeName: keyof typeof themes = 'default'): string {
  const cssProperties: string[] = [];
  const theme = themes[themeName];

  // Basis Farbpaletten
  Object.entries(colors.spiritual.saffron).forEach(([key, value]) => {
    cssProperties.push(`  --color-spiritual-saffron-${key}: ${value};`);
  });

  Object.entries(colors.spiritual.blue).forEach(([key, value]) => {
    cssProperties.push(`  --color-spiritual-blue-${key}: ${value};`);
  });

  Object.entries(colors.spiritual.gold).forEach(([key, value]) => {
    cssProperties.push(`  --color-spiritual-gold-${key}: ${value};`);
  });

  Object.entries(colors.gray).forEach(([key, value]) => {
    cssProperties.push(`  --color-gray-${key}: ${value};`);
  });

  Object.entries(colors.red).forEach(([key, value]) => {
    cssProperties.push(`  --color-red-${key}: ${value};`);
  });

  Object.entries(colors.green).forEach(([key, value]) => {
    cssProperties.push(`  --color-green-${key}: ${value};`);
  });

  Object.entries(colors.amber).forEach(([key, value]) => {
    cssProperties.push(`  --color-amber-${key}: ${value};`);
  });

  Object.entries(colors.blue).forEach(([key, value]) => {
    cssProperties.push(`  --color-blue-${key}: ${value};`);
  });

  // Basis-Farben
  cssProperties.push(`  --color-white: ${colors.white};`);
  cssProperties.push(`  --color-black: ${colors.black};`);
  cssProperties.push(`  --color-transparent: ${colors.transparent};`);

  // Theme-spezifische semantische Farben
  Object.entries(theme).forEach(([key, value]) => {
    cssProperties.push(`  --${key}: ${value};`);
  });

  return `:root {\n${cssProperties.join('\n')}\n}`;
}

// Tailwind CSS Utilities für Colors
export const colorUtils = {
  // Background colors
  bg: {
    primary: 'bg-spiritual-saffron-600',
    secondary: 'bg-spiritual-blue-600',
    accent: 'bg-spiritual-gold-500',
    muted: 'bg-gray-100',
    card: 'bg-white',
    success: 'bg-green-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  },

  // Text colors
  text: {
    primary: 'text-spiritual-saffron-600',
    secondary: 'text-spiritual-blue-600',
    accent: 'text-spiritual-gold-600',
    muted: 'text-gray-600',
    foreground: 'text-gray-900',
    success: 'text-green-600',
    warning: 'text-amber-600',
    error: 'text-red-600',
    info: 'text-blue-600'
  },

  // Border colors
  border: {
    primary: 'border-spiritual-saffron-600',
    secondary: 'border-spiritual-blue-600', 
    accent: 'border-spiritual-gold-500',
    muted: 'border-gray-200',
    success: 'border-green-500',
    warning: 'border-amber-500',
    error: 'border-red-500',
    info: 'border-blue-500'
  }
};

// Color helper functions
export function getColorValue(token: string): string {
  // Parse token like 'spiritual-saffron-600' or 'gray-500'
  const parts = token.split('-');
  
  if (parts.length === 3 && parts[0] === 'spiritual') {
    const [, colorName, shade] = parts;
    const colorGroup = colors.spiritual[colorName as keyof typeof colors.spiritual];
    if (colorGroup && typeof colorGroup === 'object' && shade in colorGroup) {
      return (colorGroup as any)[shade];
    }
  }
  
  if (parts.length === 2) {
    const [colorName, shade] = parts;
    if (colorName in colors && typeof colors[colorName as keyof typeof colors] === 'object') {
      return (colors[colorName as keyof typeof colors] as any)[shade];
    }
  }
  
  // Fallback für direkte Farbnamen
  if (token in colors) {
    return colors[token as keyof typeof colors] as string;
  }
  
  return token; // Return as-is if not found
}

// Type definitions
export type ColorToken = 
  | keyof typeof colors
  | `spiritual-saffron-${keyof typeof colors.spiritual.saffron}`
  | `spiritual-blue-${keyof typeof colors.spiritual.blue}`
  | `spiritual-gold-${keyof typeof colors.spiritual.gold}`
  | `gray-${keyof typeof colors.gray}`
  | `red-${keyof typeof colors.red}`
  | `green-${keyof typeof colors.green}`
  | `amber-${keyof typeof colors.amber}`
  | `blue-${keyof typeof colors.blue}`;

export type ThemeName = keyof typeof themes;

// Validation helpers
export function isValidColorToken(token: string): token is ColorToken {
  return getColorValue(token) !== token;
}

export function getThemeColors(themeName: ThemeName = 'default') {
  return themes[themeName];
}