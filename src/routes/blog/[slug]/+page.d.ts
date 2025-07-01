import type { SanityPostProjected } from '$lib/types';

export interface PageData {
	post: SanityPostProjected;
	previousPost?: SanityPostProjected | null;
	nextPost?: SanityPostProjected | null;
	relatedPosts: SanityPostProjected[];
	latestPosts: SanityPostProjected[];
}