import type { PageServerLoad } from './$types';
import {
	getBookBySlug,
	getRelatedBooks
} from '$lib/sanity/queries/literature';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, url }) => {
	const { slug } = params;

	try {
		console.log(`📖 Loading literature book: ${slug}`);

		// Parallel laden der Buchdetails und verwandten Bücher
		const [book, relatedBooks] = await Promise.all([
			getBookBySlug(slug),
			getRelatedBooks(slug, 3) // Max 3 verwandte Bücher
		]);

		if (!book) {
			console.log(`❌ Book not found: ${slug}`);
			throw error(404, 'Buch nicht gefunden');
		}

		console.log(`✅ Book loaded: ${book.title} (${book.bookType})`);
		console.log(`🔗 Related books: ${relatedBooks?.length || 0}`);

		// SEO Metadaten
		const baseUrl = url.origin;
		const canonicalUrl = `${baseUrl}/literature/${slug}`;
		
		const seoTitle = `${book.title} - Vedische Literatur | ISKCON Deutschland`;
		const seoDescription = book.description || 
			`Entdecken Sie "${book.title}" ${book.author ? `von ${book.author}` : ''} - ein ${book.bookType === 'scripture' ? 'heiliger Text' : 'spirituelles Werk'} aus der vedischen Tradition.`;

		// Schema.org Structured Data
		const structuredData = {
			'@context': 'https://schema.org',
			'@type': 'Book',
			name: book.title,
			author: book.author ? {
				'@type': 'Person',
				name: book.author
			} : undefined,
			description: book.description,
			genre: book.bookType,
			inLanguage: book.languages?.[0] || 'de',
			publisher: {
				'@type': 'Organization',
				name: 'ISKCON Deutschland'
			},
			datePublished: book.publishedAt,
			image: book.coverImage?.asset?.url,
			url: canonicalUrl,
			offers: book.availability?.isAvailable && book.availability?.formats?.length ? [{
				'@type': 'Offer',
				availability: 'https://schema.org/InStock',
				itemCondition: 'https://schema.org/NewCondition'
			}] : undefined,
			keywords: book.tags?.join(', '),
			about: book.tags?.map(tag => ({
				'@type': 'Thing',
				name: tag
			}))
		};

		return {
			book,
			relatedBooks: relatedBooks || [],
			seo: {
				title: seoTitle,
				description: seoDescription,
				canonical: canonicalUrl,
				openGraph: {
					title: book.title,
					description: seoDescription,
					type: 'book',
					image: book.coverImage?.asset?.url || `${baseUrl}/images/default-book-cover.jpg`,
					url: canonicalUrl
				},
				twitter: {
					card: 'summary_large_image',
					title: book.title,
					description: seoDescription,
					image: book.coverImage?.asset?.url || `${baseUrl}/images/default-book-cover.jpg`
				},
				structuredData
			},
			breadcrumbs: [
				{ name: 'Home', href: '/' },
				{ name: 'Literatur', href: '/literature' },
				{ name: book.title, href: canonicalUrl }
			]
		};
	} catch (err) {
		console.error('❌ Error loading literature book:', err);
		
		if (err && typeof err === 'object' && 'status' in err && err.status === 404) {
			throw err;
		}
		
		throw error(500, 'Fehler beim Laden des Buchs');
	}
};