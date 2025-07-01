import type { SanityEvent } from '$lib/types';

export interface PageData {
  event: SanityEvent;
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
}