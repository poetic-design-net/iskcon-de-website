import type { PageData } from './$types';
import type { Literature } from '$lib/types';

export type LiteraturePageData = PageData & {
	literatureBooks: Literature[];
	featuredBooks: Literature[];
	filters: {
		search: string;
		bookType: string;
		difficulty: string;
		author: string;
		availability: Array<'physical' | 'digital' | 'audio'>;
		languages: string[];
		tags: string[];
		featured: boolean;
	};
	pagination: {
		page: number;
		limit: number;
		hasMore: boolean;
	};
	seo: {
		title: string;
		description: string;
		canonical: string;
		openGraph: {
			title: string;
			description: string;
			type: string;
		};
	};
};