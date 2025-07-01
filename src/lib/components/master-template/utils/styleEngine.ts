// Style Engine for Master Template System
// Generates CSS classes and custom properties based on configuration

import type { 
  ContainerConfig, 
  ArrangementConfig, 
  AlignmentConfig, 
  SpacingConfig, 
  BackgroundConfig, 
  BorderConfig, 
  ShadowConfig,
  StylingConfig,
  SpacingToken,
  ColorToken
} from '../types';

// ============================================================================
// CSS CLASS GENERATION
// ============================================================================

export function generateClasses(type: string, config: any): string {
  if (!config) return '';
  
  switch (type) {
    case 'container':
      return generateContainerClasses(config as ContainerConfig);
    case 'arrangement':
      return generateArrangementClasses(config as ArrangementConfig);
    case 'alignment':
      return generateAlignmentClasses(config as AlignmentConfig);
    case 'spacing':
      return generateSpacingClasses(config as SpacingConfig);
    case 'background':
      return generateBackgroundClasses(config as BackgroundConfig);
    case 'border':
      return generateBorderClasses(config as BorderConfig);
    case 'shadow':
      return generateShadowClasses(config as ShadowConfig);
    default:
      return '';
  }
}

function generateContainerClasses(config: ContainerConfig): string {
  const classes: string[] = [];
  
  // Container size
  classes.push(`container-${config.size}`);
  
  // Custom padding
  if (config.padding) {
    classes.push(`padding-${config.padding}`);
  }
  
  return classes.join(' ');
}

function generateArrangementClasses(config: ArrangementConfig): string {
  const classes: string[] = [];
  
  // Arrangement type
  classes.push(`arrangement-${config.type}`);
  
  // Flow direction for flex arrangements
  if (config.flow && config.type === 'flex') {
    classes.push(`flex-${config.flow}`);
  }
  
  // Gap spacing
  if (config.gap) {
    classes.push(`gap-${config.gap}`);
  }
  
  return classes.join(' ');
}

function generateAlignmentClasses(config: AlignmentConfig): string {
  const classes: string[] = [];
  
  classes.push(`align-horizontal-${config.horizontal}`);
  classes.push(`align-vertical-${config.vertical}`);
  
  return classes.join(' ');
}

function generateSpacingClasses(config: SpacingConfig): string {
  const classes: string[] = [];
  
  // Padding classes
  if (config.padding.top) classes.push(`pt-${config.padding.top}`);
  if (config.padding.right) classes.push(`pr-${config.padding.right}`);
  if (config.padding.bottom) classes.push(`pb-${config.padding.bottom}`);
  if (config.padding.left) classes.push(`pl-${config.padding.left}`);
  
  // Margin classes
  if (config.margin.top) classes.push(`mt-${config.margin.top}`);
  if (config.margin.right) classes.push(`mr-${config.margin.right}`);
  if (config.margin.bottom) classes.push(`mb-${config.margin.bottom}`);
  if (config.margin.left) classes.push(`ml-${config.margin.left}`);
  
  return classes.join(' ');
}

function generateBackgroundClasses(config: BackgroundConfig): string {
  const classes: string[] = [];
  
  classes.push(`bg-type-${config.type}`);
  
  if (config.attachment) {
    classes.push(`bg-attachment-${config.attachment}`);
  }
  
  return classes.join(' ');
}

function generateBorderClasses(config: BorderConfig): string {
  const classes: string[] = [];
  
  if (config.width) classes.push(`border-${config.width}`);
  if (config.style) classes.push(`border-${config.style}`);
  if (config.radius) classes.push(`rounded-${config.radius}`);
  
  return classes.join(' ');
}

function generateShadowClasses(config: ShadowConfig): string {
  const classes: string[] = [];
  
  if (config.type !== 'none') {
    classes.push(`shadow-${config.type}`);
  }
  
  return classes.join(' ');
}

// ============================================================================
// CSS CUSTOM PROPERTIES GENERATION
// ============================================================================

export function generateCustomProperties(styling: StylingConfig): string {
  const properties: string[] = [];
  
  // Background properties
  if (styling.background) {
    const bgProps = generateBackgroundProperties(styling.background);
    properties.push(...bgProps);
  }
  
  // Spacing properties
  if (styling.spacing) {
    const spacingProps = generateSpacingProperties(styling.spacing);
    properties.push(...spacingProps);
  }
  
  // Border properties
  if (styling.borders) {
    const borderProps = generateBorderProperties(styling.borders);
    properties.push(...borderProps);
  }
  
  // Shadow properties
  if (styling.shadows) {
    const shadowProps = generateShadowProperties(styling.shadows);
    properties.push(...shadowProps);
  }
  
  // Custom CSS properties
  if (styling.customCSS) {
    Object.entries(styling.customCSS).forEach(([key, value]) => {
      properties.push(`${key}: ${value}`);
    });
  }
  
  return properties.join('; ');
}

function generateBackgroundProperties(config: BackgroundConfig): string[] {
  const properties: string[] = [];
  
  switch (config.type) {
    case 'color':
      if (typeof config.value === 'string') {
        properties.push(`--bg-color: var(--color-${config.value}, ${config.value})`);
      }
      break;
      
    case 'gradient':
      if (typeof config.value === 'object' && 'direction' in config.value) {
        const gradient = config.value;
        const stops = gradient.stops.map(stop => 
          `var(--color-${stop.color}, ${stop.color}) ${stop.position}%`
        ).join(', ');
        properties.push(`--bg-gradient: linear-gradient(${gradient.direction}deg, ${stops})`);
      }
      break;
      
    case 'image':
      if (typeof config.value === 'object' && 'asset' in config.value) {
        const image = config.value;
        properties.push(`--bg-image: url(${image.asset.url || ''})`);
        properties.push(`--bg-size: ${image.size}`);
        properties.push(`--bg-position: ${image.position}`);
        properties.push(`--bg-repeat: ${image.repeat}`);
      }
      break;
  }
  
  // Overlay properties
  if (config.overlay) {
    properties.push(`--bg-overlay-opacity: ${config.overlay.opacity}`);
    if (config.overlay.blendMode) {
      properties.push(`--bg-blend-mode: ${config.overlay.blendMode}`);
    }
  }
  
  return properties;
}

function generateSpacingProperties(config: SpacingConfig): string[] {
  const properties: string[] = [];
  
  // Convert spacing tokens to CSS custom properties
  Object.entries(config.padding).forEach(([side, token]) => {
    if (token) {
      const value = getSpacingValue(token);
      properties.push(`--padding-${side}: ${value}`);
    }
  });
  
  Object.entries(config.margin).forEach(([side, token]) => {
    if (token) {
      const value = getSpacingValue(token);
      properties.push(`--margin-${side}: ${value}`);
    }
  });
  
  return properties;
}

function generateBorderProperties(config: BorderConfig): string[] {
  const properties: string[] = [];
  
  if (config.width) {
    properties.push(`--border-width: ${getBorderWidth(config.width)}`);
  }
  
  if (config.color) {
    properties.push(`--border-color: var(--color-${config.color}, ${config.color})`);
  }
  
  if (config.radius) {
    properties.push(`--border-radius: ${getBorderRadius(config.radius)}`);
  }
  
  return properties;
}

function generateShadowProperties(config: ShadowConfig): string[] {
  const properties: string[] = [];
  
  if (config.type === 'custom' && config.custom) {
    properties.push(`--shadow: ${config.custom}`);
  } else if (config.type !== 'none') {
    properties.push(`--shadow: var(--shadow-${config.type})`);
  }
  
  if (config.color) {
    properties.push(`--shadow-color: var(--color-${config.color}, ${config.color})`);
  }
  
  return properties;
}

// ============================================================================
// RESPONSIVE UTILITIES
// ============================================================================

export function generateResponsiveClasses(breakpoint: string, config: any): string {
  const classes: string[] = [];
  
  Object.entries(config).forEach(([key, value]) => {
    if (value) {
      classes.push(`${breakpoint}:${key}-${value}`);
    }
  });
  
  return classes.join(' ');
}

export function generateBreakpointProperties(breakpoints: Record<string, any>): string {
  const properties: string[] = [];
  
  Object.entries(breakpoints).forEach(([breakpoint, values]) => {
    Object.entries(values).forEach(([property, value]) => {
      properties.push(`--${breakpoint}-${property}: ${value}`);
    });
  });
  
  return properties.join('; ');
}

// ============================================================================
// DESIGN TOKEN CONVERSION UTILITIES
// ============================================================================

function getSpacingValue(token: SpacingToken): string {
  const spacingMap: Record<string, string> = {
    '0': '0',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '6': '1.5rem',
    '8': '2rem',
    '12': '3rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
    'section-compact': 'var(--spacing-section-compact, 3rem)',
    'section-normal': 'var(--spacing-section-normal, 5rem)',
    'section-spacious': 'var(--spacing-section-spacious, 8rem)',
    'container-narrow': 'var(--spacing-container-narrow, 1rem)',
    'container-normal': 'var(--spacing-container-normal, 1.5rem)',
    'container-wide': 'var(--spacing-container-wide, 2rem)'
  };
  
  return spacingMap[token] || `var(--spacing-${token}, 1rem)`;
}

function getBorderWidth(token: string): string {
  const widthMap: Record<string, string> = {
    '0': '0',
    '1': '1px',
    '2': '2px',
    '4': '4px',
    '8': '8px'
  };
  
  return widthMap[token] || '1px';
}

function getBorderRadius(token: string): string {
  const radiusMap: Record<string, string> = {
    'none': '0',
    'sm': '0.125rem',
    'md': '0.375rem',
    'lg': '0.5rem',
    'xl': '0.75rem',
    '2xl': '1rem',
    'full': '9999px'
  };
  
  return radiusMap[token] || '0.375rem';
}

function getColorValue(token: ColorToken): string {
  // Return CSS custom property reference
  return `var(--color-${token}, ${token})`;
}

// ============================================================================
// ANIMATION UTILITIES
// ============================================================================

export function generateAnimationProperties(animation: any): string {
  if (!animation) return '';
  
  const properties: string[] = [];
  
  properties.push(`--animation-type: ${animation.type}`);
  properties.push(`--animation-duration: ${animation.duration}s`);
  properties.push(`--animation-timing: ${animation.timing || 'ease-out'}`);
  
  if (animation.delay) {
    properties.push(`--animation-delay: ${animation.delay}s`);
  }
  
  if (animation.iterations) {
    properties.push(`--animation-iterations: ${animation.iterations}`);
  }
  
  return properties.join('; ');
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export function combineClasses(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function sanitizeClassName(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '');
}

export function createUtilityClass(prefix: string, value: string | number): string {
  return `${prefix}-${sanitizeClassName(String(value))}`;
}