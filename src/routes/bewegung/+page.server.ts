import type { PageServerLoad } from './$types';
import { client } from '$lib/sanity/client';
import { bewegungPageQuery, featuredStatsQuery } from '$lib/sanity/queries/bewegung';

// Type Definition für Stat Items
interface StatItem {
	_id: string;
	title: string;
	featured?: boolean;
	value?: string | number;
	description?: string;
	icon?: string;
	category?: string;
	unit?: string;
}

export const load = (async () => {
	// Fallback-Daten für die Bewegung-Seite
	const fallbackPage = {
		title: 'Die Hare Krishna Bewegung',
		subtitle: 'Von einer Vision zur globalen spirituellen Gemeinschaft',
		description: 'Die Geschichte und Entwicklung der Hare Krishna Bewegung in der DACH-Region - von den bescheidenen Anfängen 1965 bis zur modernen spirituellen Gemeinschaft mit über 6.000 Praktizierenden.'
	};

	try {
		// Lade sowohl Page-Daten als auch Stats parallel
		console.log('🔍 Loading Sanity data with parallel queries...');
		const [sanityPageData, sanityStatsData] = await Promise.all([
			client.fetch(bewegungPageQuery),
			client.fetch(featuredStatsQuery)
		]);
		
		console.log('📊 Sanity Data Results:', {
			hasPageData: !!sanityPageData,
			hasStatsData: !!sanityStatsData,
			title: sanityPageData?.title,
			pageStatsCount: sanityPageData?.stats?.length || 0,
			pageStats: sanityPageData?.stats?.map((s: StatItem) => ({ id: s._id, title: s.title })) || [],
			allStatsCount: sanityStatsData?.length || 0,
			availableStats: sanityStatsData?.map((s: StatItem) => ({ id: s._id, title: s.title, featured: s.featured })) || []
		});
		
		// Verwende Stats aus der Seite, falls vorhanden
		let featuredStats: StatItem[] = [];
		if (sanityPageData?.stats && sanityPageData.stats.length > 0) {
			// Verwende die in der Seite definierten Stats
			featuredStats = sanityPageData.stats;
			console.log('✅ Using page-specific stats:', featuredStats.map((s: StatItem) => s.title));
		} else if (sanityStatsData && sanityStatsData.length > 0) {
			// Fallback: Verwende featured oder erste verfügbare Stats
			const featuredItems = sanityStatsData.filter((stat: StatItem) => stat.featured === true);
			if (featuredItems.length > 0) {
				featuredStats = featuredItems.slice(0, 4); // Max 4 featured
				console.log('✅ Using featured stats:', featuredItems.map((s: StatItem) => s.title));
			} else {
				// Fallback: Nimm die ersten 4 verfügbaren Stats
				featuredStats = sanityStatsData.slice(0, 4);
				console.log('🔄 Using first 4 available stats:', featuredStats.map((s: StatItem) => s.title));
			}
		}
		
		if (sanityPageData) {
			console.log('✅ Using Sanity page data with stats');
			return {
				page: {
					title: sanityPageData.title || fallbackPage.title,
					subtitle: sanityPageData.subtitle || fallbackPage.subtitle,
					description: sanityPageData.description || fallbackPage.description,
					heroImage: sanityPageData.heroImage,
					seo: sanityPageData.seo
				},
				featuredStats,
				timeline: sanityPageData.timeline || [],
				principles: sanityPageData.principles || [],
				isFromSanity: true
			};
		} else {
			console.log('❌ No Sanity page data found, using fallback');
			return {
				page: fallbackPage,
				featuredStats,
				timeline: [],
				principles: [],
				isFromSanity: false
			};
		}
	} catch (error) {
		console.error('❌ Fehler beim Laden der Sanity-Daten für Bewegung-Seite:', error);
	}

	// Fallback zu statischen Daten
	console.log('🔄 Using fallback data');
	return {
		page: fallbackPage,
		featuredStats: [],
		timeline: [],
		principles: [],
		isFromSanity: false
	};
}) satisfies PageServerLoad;