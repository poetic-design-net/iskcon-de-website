// Master Template System Types
// Replaces complex section-based types with flexible block system

import type { SanityImage, PortableTextBlock } from '$lib/types';

// ============================================================================
// CORE BLOCK SYSTEM
// ============================================================================

export interface ContentBlock {
  id: string;
  type: BlockType;
  data: BlockData;
  layout: LayoutConfig;
  styling: StylingConfig;
  animation?: AnimationConfig;
  conditions?: VisibilityConfig;
}

export type BlockType = 
  | 'text'
  | 'media' 
  | 'grid'
  | 'cta'
  | 'quote'
  | 'accordion'
  | 'form'
  | 'spatial';

export type BlockData = 
  | TextBlockData
  | MediaBlockData
  | GridBlockData
  | CtaBlockData
  | QuoteBlockData
  | AccordionBlockData
  | FormBlockData
  | SpatialBlockData;

// ============================================================================
// LAYOUT SYSTEM
// ============================================================================

export interface LayoutConfig {
  container: ContainerConfig;
  arrangement: ArrangementConfig;
  alignment: AlignmentConfig;
  responsive: ResponsiveConfig;
}

export interface ContainerConfig {
  size: 'narrow' | 'normal' | 'wide' | 'full' | 'breakout';
  padding: SpacingToken;
  maxWidth?: string;
}

export interface ArrangementConfig {
  type: 'single' | 'columns' | 'grid' | 'masonry' | 'flex';
  columns?: ResponsiveValue<number>;
  gap?: SpacingToken;
  flow?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
}

export interface AlignmentConfig {
  horizontal: 'left' | 'center' | 'right' | 'justify' | 'stretch';
  vertical: 'top' | 'center' | 'bottom' | 'baseline' | 'stretch';
}

export interface ResponsiveConfig {
  mobile?: Partial<LayoutConfig>;
  tablet?: Partial<LayoutConfig>;
  desktop?: Partial<LayoutConfig>;
  breakpoints?: CustomBreakpoints;
}

export interface CustomBreakpoints {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
}

export type ResponsiveValue<T> = T | {
  mobile: T;
  tablet?: T;
  desktop?: T;
};

// ============================================================================
// STYLING SYSTEM
// ============================================================================

export interface StylingConfig {
  background: BackgroundConfig;
  spacing: SpacingConfig;
  borders: BorderConfig;
  shadows: ShadowConfig;
  theme: ThemeVariant;
  customCSS?: Record<string, string>;
}

export interface BackgroundConfig {
  type: 'none' | 'color' | 'gradient' | 'image' | 'pattern';
  value?: string | GradientConfig | ImageConfig | PatternConfig;
  overlay?: OverlayConfig;
  attachment?: 'fixed' | 'local' | 'scroll';
}

export interface GradientConfig {
  direction: number | string;
  stops: Array<{
    color: ColorToken;
    position: number;
  }>;
}

export interface ImageConfig {
  asset: SanityImage;
  position: string;
  size: 'auto' | 'cover' | 'contain';
  repeat: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y';
}

export interface PatternConfig {
  type: 'dots' | 'grid' | 'stripes' | 'noise' | 'custom';
  opacity: number;
  scale: number;
  color: ColorToken;
}

export interface OverlayConfig {
  type: 'color' | 'gradient';
  value: string | GradientConfig;
  opacity: number;
  blendMode?: string;
}

export interface SpacingConfig {
  padding: {
    top?: SpacingToken;
    right?: SpacingToken;
    bottom?: SpacingToken;
    left?: SpacingToken;
  };
  margin: {
    top?: SpacingToken;
    right?: SpacingToken;
    bottom?: SpacingToken;
    left?: SpacingToken;
  };
}

export interface BorderConfig {
  width?: BorderWidthToken;
  style?: BorderStyle;
  color?: ColorToken;
  radius?: RadiusToken;
}

export interface ShadowConfig {
  type: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner' | 'custom';
  color?: ColorToken;
  custom?: string;
}

// ============================================================================
// DESIGN TOKENS
// ============================================================================

export type SpacingToken = 
  | '0' | '1' | '2' | '3' | '4' | '6' | '8' | '12' | '16' | '20' | '24'
  | 'section-compact' | 'section-normal' | 'section-spacious'
  | 'container-narrow' | 'container-normal' | 'container-wide';

export type TypographyToken = 
  | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
  | 'heading-hero' | 'heading-section' | 'heading-subsection'
  | 'body-large' | 'body-normal' | 'body-small' | 'body-caption';

export type ColorToken = 
  | 'primary' | 'secondary' | 'accent' | 'muted'
  | 'spiritual-saffron-50' | 'spiritual-saffron-500' | 'spiritual-saffron-600' | 'spiritual-saffron-900'
  | 'spiritual-blue-50' | 'spiritual-blue-500' | 'spiritual-blue-600' | 'spiritual-blue-900'
  | 'background' | 'foreground' | 'card' | 'card-foreground'
  | 'muted' | 'muted-foreground' | 'border'
  | string; // Allow custom colors

export type FontWeight = 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';

export type LineHeightToken = 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose' | number;

export type RadiusToken = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export type BorderWidthToken = '0' | '1' | '2' | '4' | '8';

export type BorderStyle = 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';

export type ThemeVariant = 'default' | 'spiritual' | 'warm' | 'dark' | 'light' | 'accent';

// ============================================================================
// BLOCK DATA INTERFACES
// ============================================================================

export interface TextBlockData {
  content: {
    title?: PortableTextBlock[];
    subtitle?: PortableTextBlock[];
    body?: PortableTextBlock[];
    caption?: PortableTextBlock[];
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

export interface MediaBlockData {
  media: {
    type: 'image' | 'video' | 'gallery' | 'embed';
    primary: MediaAsset;
    gallery?: MediaAsset[];
    embed?: EmbedConfig;
  };
  display: {
    aspectRatio: AspectRatio;
    objectFit: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
    borderRadius: RadiusToken;
    overlay?: OverlayConfig;
  };
  interaction: {
    lightbox?: boolean;
    autoplay?: boolean;
    controls?: boolean;
    loop?: boolean;
    muted?: boolean;
  };
  accessibility: {
    alt: string;
    caption?: string;
    description?: string;
  };
}

export interface GridBlockData {
  items: GridItem[];
  display: {
    columns: ResponsiveValue<number>;
    gap: SpacingToken;
    equalHeight: boolean;
    masonry?: boolean;
  };
  itemStyle: {
    cardStyle: 'none' | 'outlined' | 'elevated' | 'filled' | 'ghost';
    imagePosition: 'top' | 'left' | 'right' | 'background' | 'overlay';
    contentAlignment: 'left' | 'center' | 'right';
    hoverEffect?: 'none' | 'lift' | 'glow' | 'scale' | 'tilt';
  };
  sorting?: {
    field: string;
    direction: 'asc' | 'desc';
    allowUserSort?: boolean;
  };
  filtering?: {
    fields: string[];
    showFilters?: boolean;
  };
}

export interface CtaBlockData {
  buttons: ButtonConfig[];
  layout: {
    arrangement: 'horizontal' | 'vertical' | 'responsive' | 'stacked';
    alignment: 'left' | 'center' | 'right';
    gap: SpacingToken;
    wrap?: boolean;
  };
  context: {
    title?: string;
    description?: string;
    urgency?: UrgencyConfig;
  };
}

export interface QuoteBlockData {
  quote: {
    text: string | PortableTextBlock[];
    author: string;
    role?: string;
    organization?: string;
    image?: SanityImage;
  };
  style: {
    quoteStyle: 'simple' | 'card' | 'testimonial' | 'pull-quote';
    showQuoteMarks: boolean;
    alignment: 'left' | 'center' | 'right';
  };
  decoration: {
    background?: BackgroundConfig;
    border?: BorderConfig;
    icon?: IconConfig;
  };
}

export interface AccordionBlockData {
  items: AccordionItem[];
  behavior: {
    allowMultiple: boolean;
    defaultOpen?: string[];
    closeOthers?: boolean;
  };
  style: {
    variant: 'default' | 'bordered' | 'filled' | 'minimal';
    spacing: SpacingToken;
    animationDuration: number;
  };
}

export interface FormBlockData {
  form: {
    id: string;
    title?: string;
    description?: string;
    fields: FormField[];
    submitButton: ButtonConfig;
  };
  behavior: {
    validation: ValidationConfig;
    submission: SubmissionConfig;
    redirect?: string;
  };
  styling: {
    layout: 'vertical' | 'horizontal' | 'grid';
    spacing: SpacingToken;
    theme: ThemeVariant;
  };
}

export interface SpatialBlockData {
  type: 'spacer' | 'divider' | 'break';
  spacing: {
    height: SpacingToken | string;
    responsive?: ResponsiveValue<SpacingToken>;
  };
  divider?: {
    style: 'line' | 'dots' | 'pattern' | 'decorative';
    color: ColorToken;
    width: BorderWidthToken;
    decoration?: IconConfig;
  };
}

// ============================================================================
// SUPPORTING INTERFACES
// ============================================================================

export interface TypographyStyle {
  size: TypographyToken;
  weight: FontWeight;
  color: ColorToken;
  lineHeight: LineHeightToken;
  letterSpacing?: number;
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
}

export interface BadgeConfig {
  text: string;
  variant: 'default' | 'spiritual' | 'accent' | 'success' | 'warning' | 'danger';
  size: 'sm' | 'md' | 'lg';
  icon?: IconConfig;
}

export interface DividerConfig {
  type: 'line' | 'dots' | 'decorative' | 'gradient';
  position: 'top' | 'bottom' | 'both';
  color: ColorToken;
  width: BorderWidthToken;
  spacing: SpacingToken;
}

export interface HighlightConfig {
  text: string[];
  style: 'underline' | 'background' | 'gradient' | 'outline';
  color: ColorToken;
}

export interface MediaAsset {
  type: 'image' | 'video';
  asset: SanityImage | VideoAsset;
  alt?: string;
  caption?: string;
}

export interface VideoAsset {
  url: string;
  mimeType?: string;
  duration?: number;
  thumbnail?: SanityImage;
}

export interface EmbedConfig {
  provider: 'youtube' | 'vimeo' | 'iframe' | 'custom';
  url: string;
  embedId?: string;
  parameters?: Record<string, any>;
}

export type AspectRatio = '16:9' | '4:3' | '1:1' | '3:2' | '21:9' | '9:16' | 'auto';

export interface GridItem {
  id: string;
  title: string;
  description?: string;
  excerpt?: string;
  image?: MediaAsset;
  link?: LinkConfig;
  badge?: BadgeConfig;
  metadata?: Record<string, any>;
  tags?: string[];
  date?: string;
  featured?: boolean;
}

export interface ButtonConfig {
  text: string;
  href: string;
  style: ButtonStyle;
  size: ButtonSize;
  icon?: IconConfig;
  analytics?: AnalyticsConfig;
  accessibility?: AccessibilityConfig;
  state?: ButtonState;
}

export type ButtonStyle = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ButtonState = 'normal' | 'loading' | 'disabled' | 'success' | 'error';

export interface UrgencyConfig {
  level: 'low' | 'medium' | 'high' | 'critical';
  countdown?: {
    endDate: string;
    showTime: boolean;
    message?: string;
  };
  scarcity?: {
    remaining: number;
    total: number;
    message?: string;
  };
}

export interface AccordionItem {
  id: string;
  title: string;
  content: PortableTextBlock[] | string;
  icon?: IconConfig;
  badge?: BadgeConfig;
  defaultOpen?: boolean;
}

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'tel' | 'url' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file';
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: FieldValidation;
  options?: FormFieldOption[];
  description?: string;
}

export interface FormFieldOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FieldValidation {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  custom?: string;
  message?: string;
}

export interface ValidationConfig {
  mode: 'onChange' | 'onBlur' | 'onSubmit';
  showErrors: 'inline' | 'summary' | 'both';
  realtime?: boolean;
}

export interface SubmissionConfig {
  endpoint: string;
  method: 'POST' | 'PUT';
  headers?: Record<string, string>;
  successMessage?: string;
  errorMessage?: string;
  loadingMessage?: string;
}

export interface IconConfig {
  name: string;
  library?: 'mdi' | 'lucide' | 'custom';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: ColorToken;
  position?: 'left' | 'right' | 'top' | 'bottom';
}

export interface LinkConfig {
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
  download?: boolean;
  analytics?: AnalyticsConfig;
}

export interface AnalyticsConfig {
  event: string;
  category?: string;
  label?: string;
  value?: number;
  customDimensions?: Record<string, any>;
}

export interface AccessibilityConfig {
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaExpanded?: boolean;
  tabIndex?: number;
  role?: string;
}

export interface AnimationConfig {
  type: 'none' | 'fade' | 'slide' | 'scale' | 'rotate' | 'bounce' | 'custom';
  duration: number;
  delay?: number;
  easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | string;
  trigger?: 'load' | 'scroll' | 'hover' | 'focus' | 'click';
  repeat?: boolean | number;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
}

export interface VisibilityConfig {
  device?: 'mobile' | 'tablet' | 'desktop' | Array<'mobile' | 'tablet' | 'desktop'>;
  dateRange?: {
    start?: string;
    end?: string;
  };
  userType?: 'anonymous' | 'authenticated' | 'subscriber';
  customCondition?: string;
}

// ============================================================================
// TEMPLATE INTERFACES
// ============================================================================

export interface PageTemplate {
  type: 'master' | 'custom';
  config?: TemplateConfig;
  metadata?: TemplateMetadata;
}

export interface TemplateConfig {
  theme: ThemeVariant;
  layout: {
    header: boolean;
    footer: boolean;
    sidebar?: 'left' | 'right' | 'both' | 'none';
  };
  seo: SEOConfig;
  performance: PerformanceConfig;
}

export interface TemplateMetadata {
  name: string;
  description?: string;
  version: string;
  author?: string;
  tags?: string[];
  previewImage?: SanityImage;
}

export interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: SanityImage;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  structuredData?: Record<string, any>;
}

export interface PerformanceConfig {
  lazyLoading: boolean;
  imageOptimization: boolean;
  caching: {
    strategy: 'default' | 'aggressive' | 'minimal';
    ttl?: number;
  };
  bundleSplitting: boolean;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Override<T, R> = Omit<T, keyof R> & R;

export type ValueOf<T> = T[keyof T];

export type NonEmptyArray<T> = [T, ...T[]];

// ============================================================================
// LEGACY CONVERSION TYPES
// ============================================================================

export interface LegacyConversionContext {
  sourceType: string;
  targetBlocks: BlockType[];
  preserveLayout: boolean;
  migrationNotes?: string[];
}

export interface ConversionResult {
  blocks: ContentBlock[];
  warnings?: string[];
  fallbacks?: string[];
  metadata: {
    originalComplexity: number;
    resultingBlocks: number;
    conversionScore: number;
  };
}