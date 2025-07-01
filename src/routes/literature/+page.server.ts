import type { PageServerLoad } from './$types';
import { getAllLiterature, getFeaturedBooks } from '$lib/sanity/queries/literature';
import type { LiteratureFilters } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load = (async ({ url }) => {
	try {
		// URL-Parameter extrahieren
		const searchParams = url.searchParams;
		const search = searchParams.get('search') || '';
		const bookType = searchParams.get('bookType') || '';
		const difficulty = searchParams.get('difficulty') || '';
		const author = searchParams.get('author') || '';
		const availability = searchParams.getAll('availability') as Array<'physical' | 'digital' | 'audio'>;
		const languages = searchParams.getAll('languages');
		const tags = searchParams.getAll('tags');
		const featured = searchParams.get('featured');
		const page = parseInt(searchParams.get('page') || '1');
		const limit = parseInt(searchParams.get('limit') || '12');

		// Filter-Objekt aufbauen
		const filters: LiteratureFilters = {};
		if (bookType) filters.bookType = bookType;
		if (difficulty) filters.difficulty = difficulty;
		if (author) filters.author = author;
		if (availability.length > 0) filters.availability = availability;
		if (languages.length > 0) filters.languages = languages;
		if (tags.length > 0) filters.tags = tags;
		if (featured === 'true') filters.isFeatured = true;

		// Query-Optionen
		const options = {
			limit,
			offset: (page - 1) * limit,
			sortBy: searchParams.get('sortBy') || 'title',
			sortOrder: (searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc'
		};

		// Parallele Datenabfrage
		const [literatureBooks, featuredBooks] = await Promise.all([
			getAllLiterature(filters, options),
			getFeaturedBooks(6)
		]);

		// SEO-Metadaten
		const seo = {
			title: search 
				? `Literatur Suche: "${search}" | ISKCON Deutschland`
				: bookType 
				? `${bookType} Literatur | ISKCON Deutschland`
				: 'Vedische Literatur | ISKCON Deutschland',
			description: search
				? `Suchergebnisse für "${search}" in der vedischen Literatur von ISKCON Deutschland.`
				: 'Entdecken Sie die spirituelle Literatur von ISKCON Deutschland - Bhagavad-gita, Srimad-Bhagavatam und mehr.',
			canonical: url.pathname,
			openGraph: {
				title: search ? `Literatur Suche: "${search}"` : 'Vedische Literatur',
				description: 'Spirituelle Bücher, Schriften und Literatur von ISKCON Deutschland',
				type: 'website'
			}
		};

		return {
			literatureBooks,
			featuredBooks,
			filters: {
				search,
				bookType,
				difficulty,
				author,
				availability,
				languages,
				tags,
				featured: featured === 'true'
			},
			pagination: {
				page,
				limit,
				hasMore: literatureBooks.length === limit
			},
			seo
		};
	} catch (err) {
		console.error('Error loading literature page:', err);
		throw error(500, 'Fehler beim Laden der Literatur-Seite');
	}
}) satisfies PageServerLoad;