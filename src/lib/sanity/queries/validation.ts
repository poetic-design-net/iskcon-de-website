import { z } from 'zod';

// Basis Zod Schemas für Validierung
export const imageSchema = z.object({
  asset: z.object({
    url: z.string(),
    altText: z.string().nullable().optional()
  }).nullable().optional(),
  hotspot: z.object({
    x: z.number(),
    y: z.number(),
    height: z.number(),
    width: z.number()
  }).nullable().optional()
}).nullable().optional();

export const seoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  ogImage: imageSchema
}).optional();

export const slugSchema = z.object({
  current: z.string()
});

// Post Validation Schema
export const postSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: slugSchema,
  excerpt: z.string().optional(),
  content: z.array(z.any()).optional(),
  featuredImage: imageSchema,
  author: z.object({
    name: z.string(),
    image: imageSchema
  }).optional(),
  publishedAt: z.string().optional(),
  categories: z.array(z.object({
    title: z.string(),
    slug: slugSchema
  })).optional(),
  tags: z.array(z.string()).optional(),
  seo: seoSchema
});

// Projected Post Schema für Query-Projektionen
export const postProjectedSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(), // Vereinfachter slug ohne _type structure
  excerpt: z.string().optional(),
  content: z.array(z.any()).optional(),
  body: z.array(z.any()).optional(), // Für Server-Kompatibilität
  mainImage: imageSchema, // Für Server-Kompatibilität
  featuredImage: imageSchema,
  author: z.object({
    name: z.string(),
    image: imageSchema
  }).optional(),
  publishedAt: z.string().optional(),
  categories: z.array(z.object({
    title: z.string(),
    slug: z.string() // Vereinfachter slug für categories
  })).optional(),
  tags: z.array(z.string()).optional(),
  seo: seoSchema,
  isFeatured: z.boolean().optional()
});

// Event Validation Schema
export const eventLocationSchema = z.object({
  type: z.enum(['temple', 'external']),
  temple: z.object({
    name: z.string(),
    slug: z.string()
  }).optional(),
  externalVenue: z.object({
    name: z.string()
  }).optional()
}).optional();

export const eventCategorySchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  icon: z.string().optional(),
  color: z.string().optional()
}).optional();

export const eventRecurrenceSchema = z.object({
  type: z.enum(['daily', 'weekly', 'monthly', 'yearly']).optional(),
  interval: z.number().optional(),
  daysOfWeek: z.array(z.string()).optional(),
  dayOfMonth: z.number().optional(),
  monthOfYear: z.number().optional(),
  occurrenceCount: z.number().optional(),
  endDate: z.string().optional()
}).optional();

export const eventSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: slugSchema,
  description: z.string().optional(),
  content: z.array(z.any()).optional(),
  featuredImage: imageSchema,
  eventType: z.enum(['single', 'recurring']).optional(),
  eventCategory: eventCategorySchema,
  startDate: z.string(),
  endDate: z.string().optional(),
  location: eventLocationSchema,
  recurrence: eventRecurrenceSchema,
  isFeatured: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  seo: seoSchema
});

// Temple Validation Schema
export const templeContactSchema = z.object({
  phone: z.string().optional(),
  email: z.string().optional(),
  website: z.string().optional()
}).optional();

export const templeCoordinatesSchema = z.object({
  lat: z.number(),
  lng: z.number()
}).optional();

export const templeServiceHoursSchema = z.array(z.object({
  day: z.string(),
  openTime: z.string().optional(),
  closeTime: z.string().optional(),
  isClosed: z.boolean().optional()
})).optional();

export const templeProgramSchema = z.array(z.object({
  title: z.string(),
  description: z.string().optional(),
  time: z.string().optional(),
  frequency: z.string().optional()
})).optional();

export const templeSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: slugSchema,
  description: z.string().optional(),
  address: z.string().optional(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string().optional(),
  coordinates: templeCoordinatesSchema,
  contact: templeContactSchema,
  serviceHours: templeServiceHoursSchema,
  programs: templeProgramSchema,
  facilities: z.array(z.string()).optional(),
  featuredImage: imageSchema,
  gallery: z.array(imageSchema).optional(),
  seo: seoSchema
});

// Homepage Teasers Validation Schema
export const homepageTeaserSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  featuredImage: imageSchema,
  link: z.object({
    href: z.string(),
    text: z.string().optional()
  }).optional(),
  order: z.number().optional()
});

// Navigation Validation Schema
export const navigationItemSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  icon: z.string().optional()
});

export const navigationSectionSchema = z.object({
  title: z.string(),
  items: z.array(navigationItemSchema)
});

export const navigationCategorySchema = z.object({
  title: z.string(),
  slug: z.string(),
  icon: z.string().optional(),
  sections: z.array(navigationSectionSchema),
  featured: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    href: z.string()
  }).optional()
});

export const navigationSchema = z.object({
  title: z.string(),
  categories: z.array(navigationCategorySchema)
});

// Validation Functions
export function validatePost(data: unknown): z.infer<typeof postSchema> | null {
  try {
    // Null-safety: Sanity null-Werte handhaben
    if (!data || typeof data !== 'object') {
      return null;
    }
    
    const safeData = data as Record<string, unknown>;
    
    // Null-Werte zu undefined konvertieren für korrekte Zod-Validierung
    const normalizedData = {
      ...safeData,
      categories: safeData.categories === null ? undefined : safeData.categories,
      tags: safeData.tags === null ? undefined : safeData.tags,
      content: safeData.content === null ? undefined : safeData.content,
      excerpt: safeData.excerpt === null ? undefined : safeData.excerpt,
      featuredImage: safeData.featuredImage === null ? undefined : safeData.featuredImage,
      author: safeData.author === null ? undefined : safeData.author,
      publishedAt: safeData.publishedAt === null ? undefined : safeData.publishedAt,
      seo: safeData.seo === null ? undefined : safeData.seo
    };
    
    return postSchema.parse(normalizedData);
  } catch (error) {
    console.error('Post Validierung fehlgeschlagen:', error);
    return null;
  }
}

export function validateProjectedPost(data: unknown): z.infer<typeof postProjectedSchema> | null {
  try {
    // Null-safety: Sanity null-Werte handhaben
    if (!data || typeof data !== 'object') {
      return null;
    }
    
    const safeData = data as Record<string, unknown>;
    
    // Null-Werte zu undefined konvertieren für korrekte Zod-Validierung
    const normalizedData = {
      ...safeData,
      categories: safeData.categories === null ? undefined : safeData.categories,
      tags: safeData.tags === null ? undefined : safeData.tags,
      content: safeData.content === null ? undefined : safeData.content,
      excerpt: safeData.excerpt === null ? undefined : safeData.excerpt,
      featuredImage: safeData.featuredImage === null ? undefined : safeData.featuredImage,
      author: safeData.author === null ? undefined : safeData.author,
      publishedAt: safeData.publishedAt === null ? undefined : safeData.publishedAt,
      seo: safeData.seo === null ? undefined : safeData.seo,
      isFeatured: safeData.isFeatured === null ? undefined : safeData.isFeatured
    };
    
    return postProjectedSchema.parse(normalizedData);
  } catch (error) {
    console.error('Projected Post Validierung fehlgeschlagen:', error);
    return null;
  }
}

export function validateEvent(data: unknown): z.infer<typeof eventSchema> | null {
  try {
    return eventSchema.parse(data);
  } catch (error) {
    console.error('Event Validierung fehlgeschlagen:', error);
    return null;
  }
}

export function validateTemple(data: unknown): z.infer<typeof templeSchema> | null {
  try {
    return templeSchema.parse(data);
  } catch (error) {
    console.error('Temple Validierung fehlgeschlagen:', error);
    return null;
  }
}

export function validateHomepageTeaser(data: unknown): z.infer<typeof homepageTeaserSchema> | null {
  try {
    return homepageTeaserSchema.parse(data);
  } catch (error) {
    console.error('Homepage Teaser Validierung fehlgeschlagen:', error);
    return null;
  }
}

export function validateNavigation(data: unknown): z.infer<typeof navigationSchema> | null {
  try {
    return navigationSchema.parse(data);
  } catch (error) {
    console.error('Navigation Validierung fehlgeschlagen:', error);
    return null;
  }
}

// Type Exports für bessere TypeScript Integration
export type PostType = z.infer<typeof postSchema>;
export type PostProjectedType = z.infer<typeof postProjectedSchema>;
export type EventType = z.infer<typeof eventSchema>;
export type TempleType = z.infer<typeof templeSchema>;
export type HomepageTeaserType = z.infer<typeof homepageTeaserSchema>;
export type NavigationType = z.infer<typeof navigationSchema>;
export type EventCategoryType = z.infer<typeof eventCategorySchema>;
export type NavigationCategoryType = z.infer<typeof navigationCategorySchema>;