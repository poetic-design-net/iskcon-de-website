import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, PUBLIC_SANITY_API_VERSION } from '$env/static/public';

// Client für öffentliche Operationen (client-side)
export const client = createClient({
  projectId: PUBLIC_SANITY_PROJECT_ID,
  dataset: PUBLIC_SANITY_DATASET,
  apiVersion: PUBLIC_SANITY_API_VERSION,
  useCdn: true
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource | null | undefined) {
  if (!source) return null;
  return builder.image(source).auto('format');
}

export function urlForWithOptions(source: SanityImageSource | null | undefined, width: number) {
  if (!source) return null;
  return builder.image(source).width(width).auto('format');
}