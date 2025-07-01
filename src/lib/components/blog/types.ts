export interface PostNavigationPost {
	slug: string;
	title: string;
	excerpt?: string;
}

export interface PostNavigationProps {
	previousPost?: PostNavigationPost | null;
	nextPost?: PostNavigationPost | null;
}