import type { SanityPost, SanityTemple, SanityEvent } from '$lib/types';

export interface PageData {
  latestPosts: SanityPost[];
  pages: Array<{
    title: string;
    description: string;
    slug: string;
    mainImage?: {
      asset: {
        url: string;
      };
    };
  }>;
  temples: SanityTemple[];
  upcomingEvents: SanityEvent[];
  featuredEvents: SanityEvent[];
  eventCategories: Array<{
    title: string;
    slug: string;
    description: string;
    icon: string;
    color: string;
  }>;
}