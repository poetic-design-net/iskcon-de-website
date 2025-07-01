import type { PageData } from './$types';
import type { Literature } from '$lib/types';

export type LiteratureDetailPageData = PageData & {
	book: Literature;
	relatedBooks: Literature[];
	seo: {
		title: string;
		description: string;
		canonical: string;
		openGraph: {
			title: string;
			description: string;
			type: string;
			image: string;
			url: string;
		};
		twitter: {
			card: string;
			title: string;
			description: string;
			image: string;
		};
		structuredData: Record<string, unknown>;
	};
	breadcrumbs: Array<{
		name: string;
		href: string;
	}>;
};