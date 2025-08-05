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
  content: SanityBlockSchema.optional()
});

// TypeScript-Typen aus den Schemas generieren
export type SanityPage = z.infer<typeof PageSchema>;

// Validierungsfunktionen
export function validatePage(data: unknown): SanityPage {
  return PageSchema.parse(data);
}

// Safe Parse Funktionen (ohne Exceptions)
export function safeParsePage(data: unknown) {
  return PageSchema.safeParse(data);
}