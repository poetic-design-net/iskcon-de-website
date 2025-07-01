import { createClient } from '@sanity/client';
import { env as publicEnv } from '$env/dynamic/public';
import { env as privateEnv } from '$env/dynamic/private';

export const client = createClient({
  projectId: publicEnv.PUBLIC_SANITY_PROJECT_ID,
  dataset: publicEnv.PUBLIC_SANITY_DATASET,
  apiVersion: publicEnv.PUBLIC_SANITY_API_VERSION,
  token: privateEnv.SANITY_TOKEN,
  useCdn: false,
});