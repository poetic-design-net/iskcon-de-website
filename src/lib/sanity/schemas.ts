import { z } from 'zod';

// Basis-Schema für Sanity-Dokumente
// Basis-Schema für Sanity-Dokumente
const SanityDocumentSchema = z.object({
  _id: z.string(),
  _type: z.string(),
  _createdAt: z.string().optional(),
  _updatedAt: z.string().optional(),
  _rev: z.string().optional()
});

// Schema für Sanity-Bilder
const SanityImageSchema = z.object({
  asset: z.object({
    url: z.string().nullable()
  }).nullable(),
  hotspot: z.object({
    x: z.number(),
    y: z.number()
  }).nullable().optional()
}).nullable();

// Schema für Sanity-Blöcke (Portable Text)
const SanityBlockSchema = z.array(z.any()).nullable().default(null);

// Schema für CTA-Buttons
const ButtonSchema = z.object({
  text: z.string(),
  link: z.string(),
  style: z.enum(['primary', 'secondary', 'outline']).nullable().default('primary'),
  icon: z.string().nullable().default(null),
  iconPosition: z.enum(['left', 'right']).nullable().default('left'),
  openInNewTab: z.boolean().nullable().default(false)
});

// Schema für Badge
const BadgeSchema = z.object({
  text: z.string(),
  style: z.enum(['default', 'spiritual', 'accent']).nullable().default('default')
});

// Hero Section Schema
export const HeroSectionSchema = SanityDocumentSchema.extend({
  _type: z.literal('heroSection'),
  title: z.string(),
  subtitle: z.string().optional(),
  description: SanityBlockSchema.optional(),
  layout: z.enum(['left-image', 'right-image', 'center', 'background']).nullable().default('left-image'),
  variant: z.enum(['standard', 'fullscreen-overlay', 'fullscreen-static', 'split-screen', 'minimal-card', 'centered', 'minimal']).nullable().default('standard'),
  alignment: z.enum(['left', 'center', 'right']).nullable().default('left'),
  colorScheme: z.enum(['light', 'dark', 'spiritual']).nullable().default('light'),
  overlayOpacity: z.number().min(0).max(100).nullable().default(60),
  spacing: z.enum(['compact', 'normal', 'relaxed']).nullable().default('normal'),
  highlightedText: z.string().optional(),
  animationType: z.enum(['none', 'fade', 'slide-up', 'slide-left', 'scale', 'parallax']).nullable().default('fade'),
  animationDuration: z.number().nullable().default(800),
  staggerAnimation: z.boolean().nullable().default(true),
  scrollIndicator: z.boolean().nullable().default(false),
  buttons: z.array(ButtonSchema).nullable().default([]),
  badge: BadgeSchema.nullable().default(null),
  backgroundImage: SanityImageSchema.nullable().default(null),
  image: SanityImageSchema,
  ctaText: z.string().nullable().default(null),
  ctaLink: z.string().nullable().default(null)
});
// Grid Section Schema
export const GridSectionSchema = SanityDocumentSchema.extend({
  _type: z.literal('gridSection'),
  title: z.string(),
  subtitle: z.string().optional(),
  description: SanityBlockSchema.optional(),
  columns: z.number().min(1).max(6).default(3),
  items: z.array(z.object({
    title: z.string(),
    description: z.string().optional(),
    image: SanityImageSchema.optional(),
    link: z.string().optional()
  })).default([])
});

// Media Section Schema
export const MediaSectionSchema = SanityDocumentSchema.extend({
  _type: z.literal('mediaSection'),
  media: SanityImageSchema,
  videoUrl: z.string().optional(),
  aspectRatio: z.enum(['16:9', '4:3', '1:1', '21:9']).default('16:9')
});

// Quote Section Schema
export const QuoteSectionSchema = SanityDocumentSchema.extend({
  _type: z.literal('quoteSection'),
  quote: z.string(),
  author: z.string(),
  role: z.string().optional()
});

// FAQ Section Schema
export const FaqSectionSchema = SanityDocumentSchema.extend({
  _type: z.literal('faqSection'),
  title: z.string(),
  subtitle: z.string().optional(),
  description: SanityBlockSchema.optional(),
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string().optional()
  })).default([])
});

// CTA Section Schema
export const CtaSectionSchema = SanityDocumentSchema.extend({
  _type: z.literal('ctaSection'),
  title: z.string(),
  subtitle: z.string().optional(),
  description: SanityBlockSchema.optional(),
  primaryButton: z.object({
    text: z.string(),
    link: z.string()
  }),
  secondaryButton: z.object({
    text: z.string(),
    link: z.string()
  }).optional(),
  background: z.object({
    type: z.enum(['color', 'image']).default('color'),
    color: z.string().default('#ffffff'),
    image: SanityImageSchema.optional()
  })
});

// Union Schema für alle Section-Typen
export const SectionSchema = z.discriminatedUnion('_type', [
  HeroSectionSchema,
  GridSectionSchema,
  MediaSectionSchema,
  QuoteSectionSchema,
  FaqSectionSchema,
  CtaSectionSchema
]);

// Page Schema
export const PageSchema = SanityDocumentSchema.extend({
  _type: z.literal('page'),
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  seo: z.object({
    title: z.string(),
    description: z.string(),
    image: SanityImageSchema.optional()
  }),
  sections: z.array(SectionSchema).default([])
});

// TypeScript-Typen aus den Schemas generieren
export type SanityHeroSection = z.infer<typeof HeroSectionSchema>;
export type SanityGridSection = z.infer<typeof GridSectionSchema>;
export type SanityMediaSection = z.infer<typeof MediaSectionSchema>;
export type SanityQuoteSection = z.infer<typeof QuoteSectionSchema>;
export type SanityFaqSection = z.infer<typeof FaqSectionSchema>;
export type SanityCtaSection = z.infer<typeof CtaSectionSchema>;
export type SanitySection = z.infer<typeof SectionSchema>;
export type SanityPage = z.infer<typeof PageSchema>;

// Validierungsfunktionen
export function validateHeroSection(data: unknown): SanityHeroSection {
  return HeroSectionSchema.parse(data);
}

export function validateGridSection(data: unknown): SanityGridSection {
  return GridSectionSchema.parse(data);
}

export function validateMediaSection(data: unknown): SanityMediaSection {
  return MediaSectionSchema.parse(data);
}

export function validateQuoteSection(data: unknown): SanityQuoteSection {
  return QuoteSectionSchema.parse(data);
}

export function validateFaqSection(data: unknown): SanityFaqSection {
  return FaqSectionSchema.parse(data);
}

export function validateCtaSection(data: unknown): SanityCtaSection {
  return CtaSectionSchema.parse(data);
}

export function validateSection(data: unknown): SanitySection {
  return SectionSchema.parse(data);
}

export function validatePage(data: unknown): SanityPage {
  return PageSchema.parse(data);
}

// Safe Parse Funktionen (ohne Exceptions)
export function safeParseSection(data: unknown) {
  return SectionSchema.safeParse(data);
}

export function safeParsePage(data: unknown) {
  return PageSchema.safeParse(data);
}