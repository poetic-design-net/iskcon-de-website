// Event-spezifische Queries und Validierungen
import type { SanityEvent, SanityCategory } from '$lib/types';
import { client } from '../client';
import { EVENT_PROJECTION } from './projections';

// Event Query Funktionen
export async function getAllEvents(): Promise<SanityEvent[]> {
  return client.fetch<SanityEvent[]>(
    `*[_type == "event"] | order(startDate desc) ${EVENT_PROJECTION}`
  );
}

export async function getUpcomingEvents(limit = 6): Promise<SanityEvent[]> {
  const now = new Date().toISOString();
  return client.fetch<SanityEvent[]>(
    `*[_type == "event" && startDate >= $now] | order(startDate asc)[0...${limit}] ${EVENT_PROJECTION}`,
    { now }
  );
}

export async function getEventBySlug(slug: string): Promise<SanityEvent> {
  const event = await client.fetch<SanityEvent>(
    `*[_type == "event" && slug.current == $slug][0] ${EVENT_PROJECTION}`,
    { slug }
  );
  
  if (!event) {
    throw new Error('Event nicht gefunden');
  }
  
  return event;
}

export async function getEventsByCategory(categorySlug: string): Promise<SanityEvent[]> {
  return client.fetch<SanityEvent[]>(
    `*[_type == "event" && eventCategory.slug == $categorySlug] | order(startDate desc) ${EVENT_PROJECTION}`,
    { categorySlug }
  );
}

export async function getEventsByDateRange(startDate: string, endDate: string): Promise<SanityEvent[]> {
  return client.fetch<SanityEvent[]>(
    `*[_type == "event" && startDate >= $startDate && startDate <= $endDate] | order(startDate asc) ${EVENT_PROJECTION}`,
    { startDate, endDate }
  );
}

export async function getEventsByLocation(location: string): Promise<SanityEvent[]> {
  return client.fetch<SanityEvent[]>(
    `*[_type == "event" && location match $location] | order(startDate desc) ${EVENT_PROJECTION}`,
    { location: `*${location}*` }
  );
}

// Event Category Funktionen
export async function getAllEventCategories(): Promise<SanityCategory[]> {
  return client.fetch<SanityCategory[]>(
    `*[_type == "eventCategory"] | order(title asc) {
      title,
      slug,
      description,
      icon,
      color
    }`
  );
}

export async function getEventCategoryBySlug(slug: string): Promise<SanityCategory> {
  const category = await client.fetch<SanityCategory>(
    `*[_type == "eventCategory" && slug.current == $slug][0] {
      title,
      slug,
      description,
      icon,
      color
    }`,
    { slug }
  );
  
  if (!category) {
    throw new Error('Event-Kategorie nicht gefunden');
  }
  
  return category;
}


// Event Query Objekt mit Filter-Unterstützung
export const eventQueries = {
  all: () => getAllEvents(),
  upcoming: (limit?: number) => getUpcomingEvents(limit),
  bySlug: (slug: string) => getEventBySlug(slug),
  byCategory: (categorySlug: string) => getEventsByCategory(categorySlug),
  byDateRange: (startDate: string, endDate: string) => getEventsByDateRange(startDate, endDate),
  byLocation: (location: string) => getEventsByLocation(location),
  
  // Erweiterte Filter-Kombinationen
  upcomingByCategory: async (categorySlug: string, limit = 6): Promise<SanityEvent[]> => {
    const now = new Date().toISOString();
    return client.fetch<SanityEvent[]>(
      `*[_type == "event" && startDate >= $now && eventCategory.slug == $categorySlug] | order(startDate asc)[0...${limit}] ${EVENT_PROJECTION}`,
      { now, categorySlug }
    );
  },
  
  featuredEvents: async (limit = 3): Promise<SanityEvent[]> => {
    return client.fetch<SanityEvent[]>(
      `*[_type == "event" && isFeatured == true] | order(startDate desc)[0...${limit}] ${EVENT_PROJECTION}`
    );
  },
  
  currentMonth: async (): Promise<SanityEvent[]> => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();
    return getEventsByDateRange(startOfMonth, endOfMonth);
  },
  
  // Legacy-Kompatibilität für bestehenden Code
  getAllEvents,
  getUpcomingEvents,
  getEventBySlug,
  getEventsByCategory,
  getEventsByDateRange,
  getEventsByLocation
};

// Event Category Queries
export const eventCategoryQueries = {
  all: () => getAllEventCategories(),
  bySlug: (slug: string) => getEventCategoryBySlug(slug),
  
  withEventCount: async (): Promise<(SanityCategory & { eventCount: number })[]> => {
    return client.fetch<(SanityCategory & { eventCount: number })[]>(
      `*[_type == "eventCategory"] | order(title asc) {
        title,
        slug,
        description,
        icon,
        color,
        "eventCount": count(*[_type == "event" && eventCategory.slug == ^.slug])
      }`
    );
  }
};