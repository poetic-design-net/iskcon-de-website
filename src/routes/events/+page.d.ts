import type { SanityEvent } from '$lib/types';

export interface PageData {
  events: SanityEvent[];
  featuredEvents: SanityEvent[];
  eventCategories: Array<{
    title: string;
    slug: string;
    description: string;
    icon: string;
    color: string;
  }>;
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
}