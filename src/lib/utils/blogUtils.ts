/**
 * Utility-Funktionen für Blog-Operationen
 */
// TypeScript Interfaces für Blog-spezifische Operationen
import type { SanityPost, SanityPostProjected } from '$lib/types';

// Import der SanityBlock Definition aus types.ts für korrekte Typisierung
type SanityBlock = {
	_type: string;
	children: Array<{
		_type: string;
		text: string;
		marks?: string[];
	}>;
	markDefs?: Array<{
		_type: string;
		_key: string;
		href?: string;
	}>;
	style?: string;
};

// Erweiterte Interface für calculateReadingTime - kompatibel mit SanityPost
type BlogPostForReading = Pick<SanityPost, 'body' | 'content' | 'excerpt' | 'description'>;

// Neue Interface für calculateReadingTime - kompatibel mit SanityPostProjected
type BlogPostForReadingProjected = Pick<SanityPostProjected, 'content' | 'excerpt' | 'description'>;

/**
 * Formatiert ein Publikationsdatum für deutsche Darstellung
 * @param date - Datum als String oder Date-Objekt
 * @returns Formatiertes Datum wie "15. März 2024" oder "Vor 2 Tagen"
 */
export function formatPublishDate(date: string | Date): string {
	if (!date) {
		return '';
	}

	const publishDate = typeof date === 'string' ? new Date(date) : date;
	
	if (isNaN(publishDate.getTime())) {
		return '';
	}

	const now = new Date();
	const diffTime = now.getTime() - publishDate.getTime();
	const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

	// Relative Formatierung für neuere Posts
	if (diffDays === 0) {
		return 'Heute';
	} else if (diffDays === 1) {
		return 'Gestern';
	} else if (diffDays <= 7) {
		return `Vor ${diffDays} Tagen`;
	} else if (diffDays <= 30) {
		const weeks = Math.floor(diffDays / 7);
		return `Vor ${weeks} Woche${weeks > 1 ? 'n' : ''}`;
	}

	// Absolute Formatierung für ältere Posts
	const months = [
		'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
		'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
	];

	const day = publishDate.getDate();
	const month = months[publishDate.getMonth()];
	const year = publishDate.getFullYear();

	return `${day}. ${month} ${year}`;
}

/**
 * Berechnet die Lesezeit für einen Post basierend auf dem Inhalt
 * @param post - Der Post mit body/content Feldern
 * @returns Lesezeit als String (z.B. "5 Min. Lesezeit") oder null
 */
export function calculateReadingTime(post: BlogPostForReading | BlogPostForReadingProjected): string | null {
	if (!post) {
		return null;
	}

	// Versuche verschiedene Content-Felder zu finden
	let content = '';
	
	// Check für body field (nur bei original SanityPost)
	if ('body' in post && post.body) {
		// Sanity Rich Text Format
		if (Array.isArray(post.body)) {
			content = post.body
				.map((block: SanityBlock) => {
					if (block._type === 'block' && block.children) {
						return block.children.map((child) => child.text || '').join('');
					}
					return '';
				})
				.join(' ');
		} else if (typeof post.body === 'string') {
			content = post.body;
		}
	} else if (post.content) {
		// Content field für SanityPostProjected
		if (Array.isArray(post.content)) {
			content = post.content
				.map((block: SanityBlock) => {
					if (block._type === 'block' && block.children) {
						return block.children.map((child) => child.text || '').join('');
					}
					return '';
				})
				.join(' ');
		} else if (typeof post.content === 'string') {
			content = post.content;
		}
	} else if (post.description) {
		content = post.description;
	} else if (post.excerpt) {
		content = post.excerpt;
	}

	if (!content || content.length === 0) {
		return null;
	}

	// Bereinige HTML/Markdown und zähle Wörter
	const cleanContent = content
		.replace(/<[^>]*>/g, '') // HTML-Tags entfernen
		.replace(/[^\w\s]/g, ' ') // Sonderzeichen durch Leerzeichen ersetzen
		.replace(/\s+/g, ' ') // Mehrfache Leerzeichen zu einem
		.trim();

	const wordCount = cleanContent.split(' ').filter(word => word.length > 0).length;
	
	// Durchschnittliche Lesegeschwindigkeit: 200 Wörter pro Minute auf Deutsch
	const wordsPerMinute = 200;
	const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);

	if (readingTimeMinutes === 1) {
		return '1 Min. Lesezeit';
	}
	return `${readingTimeMinutes} Min. Lesezeit`;
}

/**
 * Erstellt automatische Excerpts aus Post-Content
 * @param content - Der vollständige Post-Inhalt
 * @param maxLength - Maximale Länge des Excerpts (Standard: 150)
 * @returns Gekürzter Text mit "..." am Ende falls gekürzt
 */
export function generateExcerpt(content: string, maxLength = 150): string {
	if (!content || typeof content !== 'string') {
		return '';
	}

	// Bereinigt den Content von HTML-Tags und extra Leerzeichen
	const cleanContent = content
		.replace(/<[^>]*>/g, '') // HTML-Tags entfernen
		.replace(/\s+/g, ' ') // Mehrfache Leerzeichen zu einem
		.trim();

	if (cleanContent.length <= maxLength) {
		return cleanContent;
	}

	// Findet den letzten Leerraum vor der maxLength, um Wörter nicht abzuschneiden
	const truncated = cleanContent.substring(0, maxLength);
	const lastSpaceIndex = truncated.lastIndexOf(' ');

	if (lastSpaceIndex > 0) {
		return truncated.substring(0, lastSpaceIndex) + '...';
	}

	// Fallback: direkt abschneiden wenn kein Leerzeichen gefunden
	return truncated + '...';
}

/**
 * Konvertiert Text zu URL-freundlichen Slugs
 * Behandelt deutsche Umlaute korrekt
 * @param text - Der zu konvertierende Text
 * @returns URL-freundlicher Slug
 */
export function slugify(text: string): string {
	if (!text || typeof text !== 'string') {
		return '';
	}

	return text
		.toLowerCase()
		// Deutsche Umlaute konvertieren
		.replace(/ä/g, 'ae')
		.replace(/ö/g, 'oe')
		.replace(/ü/g, 'ue')
		.replace(/ß/g, 'ss')
		// Weitere Sonderzeichen
		.replace(/[àáâãåæ]/g, 'a')
		.replace(/[èéêë]/g, 'e')
		.replace(/[ìíîï]/g, 'i')
		.replace(/[òóôõø]/g, 'o')
		.replace(/[ùúûü]/g, 'u')
		.replace(/[ñ]/g, 'n')
		.replace(/[ç]/g, 'c')
		// Leerzeichen zu Bindestrichen
		.replace(/\s+/g, '-')
		// Alle nicht-alphanumerischen Zeichen (außer Bindestriche) entfernen
		.replace(/[^a-z0-9-]/g, '')
		// Mehrfache Bindestriche zu einem
		.replace(/-+/g, '-')
		// Führende und nachfolgende Bindestriche entfernen
		.replace(/^-|-$/g, '');
}

/**
 * Einfache Hash-Funktion für konsistente Farbzuweisung
 * @param str - String zum Hashen
 * @returns Hash-Wert
 */
function simpleHash(str: string): number {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = ((hash << 5) - hash) + char;
		hash = hash & hash; // 32-bit Integer konvertierung
	}
	return Math.abs(hash);
}

/**
 * Gibt konsistente CSS-Klassen für verschiedene Blog-Kategorien zurück
 * @param categorySlug - Der Slug oder Titel der Kategorie
 * @returns CSS-Klassen für Hintergrund und Hover-Effekte
 */
export function getCategoryColor(categorySlug: string): string {
	if (!categorySlug || typeof categorySlug !== 'string') {
		return 'bg-gray-500/90 hover:bg-gray-600'; // Fallback grau
	}

	// Normalisiere den Kategorie-Namen
	const normalizedSlug = categorySlug.toLowerCase()
		.replace(/[äöüß]/g, (match) => {
			const replacements: Record<string, string> = {
				'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss'
			};
			return replacements[match] || match;
		})
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '');

	// Vordefinierte CSS-Klassen für häufige Kategorien
	const predefinedColors: Record<string, string> = {
		'allgemein': 'bg-blue-500/90 hover:bg-blue-600',
		'spiritualitaet': 'bg-purple-500/90 hover:bg-purple-600',
		'spiritualität': 'bg-purple-500/90 hover:bg-purple-600',
		'philosophie': 'bg-cyan-500/90 hover:bg-cyan-600',
		'events': 'bg-green-500/90 hover:bg-green-600',
		'tempel': 'bg-yellow-500/90 hover:bg-yellow-600',
		'festival': 'bg-red-500/90 hover:bg-red-600',
		'meditation': 'bg-indigo-500/90 hover:bg-indigo-600',
		'bhakti': 'bg-pink-500/90 hover:bg-pink-600',
		'karma-yoga': 'bg-lime-500/90 hover:bg-lime-600',
		'bhagavad-gita': 'bg-orange-500/90 hover:bg-orange-600',
		'krishna': 'bg-purple-600/90 hover:bg-purple-700',
		'community': 'bg-cyan-500/90 hover:bg-cyan-600',
		'musik': 'bg-teal-500/90 hover:bg-teal-600',
		'prasadam': 'bg-emerald-500/90 hover:bg-emerald-600',
		'pilgerreise': 'bg-red-600/90 hover:bg-red-700'
	};

	// Prüfe ob vordefinierte Farbe existiert
	if (predefinedColors[normalizedSlug]) {
		return predefinedColors[normalizedSlug];
	}

	// Hash-basierte CSS-Klassen für unbekannte Kategorien
	const colorClasses = [
		'bg-blue-500/90 hover:bg-blue-600',
		'bg-purple-500/90 hover:bg-purple-600',
		'bg-cyan-500/90 hover:bg-cyan-600',
		'bg-green-500/90 hover:bg-green-600',
		'bg-yellow-500/90 hover:bg-yellow-600',
		'bg-red-500/90 hover:bg-red-600',
		'bg-indigo-500/90 hover:bg-indigo-600',
		'bg-pink-500/90 hover:bg-pink-600',
		'bg-lime-500/90 hover:bg-lime-600',
		'bg-orange-500/90 hover:bg-orange-600',
		'bg-teal-500/90 hover:bg-teal-600',
		'bg-emerald-500/90 hover:bg-emerald-600',
		'bg-violet-500/90 hover:bg-violet-600',
		'bg-fuchsia-500/90 hover:bg-fuchsia-600',
		'bg-rose-500/90 hover:bg-rose-600'
	];
	
	const hash = simpleHash(normalizedSlug);
	return colorClasses[hash % colorClasses.length];
}

/**
 /**
  * Debounce-Funktion für Performance-Optimierung bei Real-time Suche
  * @param func - Die zu debouncende Funktion
  * @param delay - Verzögerung in Millisekunden
  * @returns Gedebouncte Funktion
  */
 export function debounce<T extends (...args: unknown[]) => unknown>(
 	func: T,
 	delay: number
 ): T {
 	let timeoutId: ReturnType<typeof setTimeout> | null = null;
 
 	return ((...args: Parameters<T>) => {
 		// Vorherigen Timeout löschen
 		if (timeoutId !== null) {
 			clearTimeout(timeoutId);
 		}
 
 		// Neuen Timeout setzen
 		timeoutId = setTimeout(() => {
 			func(...args);
 		}, delay);
 	}) as T;
 }
/**
 * Überprüft ob ein Datum in der Vergangenheit liegt
 * @param date - Zu prüfendes Datum
 * @returns true wenn das Datum in der Vergangenheit liegt
 */
export function isDateInPast(date: string | Date): boolean {
	if (!date) {
		return false;
	}

	const checkDate = typeof date === 'string' ? new Date(date) : date;
	const now = new Date();
	
	return checkDate.getTime() < now.getTime();
}

/**
 * Sortiert Posts nach Datum (neueste zuerst)
 * @param posts - Array von Posts mit publishedAt Feld
 * @returns Sortierte Posts
 */
export function sortPostsByDate<T extends { publishedAt?: string | Date }>(posts: T[]): T[] {
	if (!posts || !Array.isArray(posts)) {
		return [];
	}

	return [...posts].sort((a, b) => {
		const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
		const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
		
		return dateB - dateA; // Neueste zuerst
	});
}

/**
 * Gruppiert Posts nach Publikationsmonat
 * @param posts - Array von Posts
 * @returns Objekt mit Posts gruppiert nach Monat
 */
export function groupPostsByMonth<T extends { publishedAt?: string | Date }>(
	posts: T[]
): Record<string, T[]> {
	if (!posts || !Array.isArray(posts)) {
		return {};
	}

	return posts.reduce((groups, post) => {
		if (!post.publishedAt) {
			return groups;
		}

		const date = typeof post.publishedAt === 'string' ? new Date(post.publishedAt) : post.publishedAt;
		const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
		
		if (!groups[monthKey]) {
			groups[monthKey] = [];
		}
		
		groups[monthKey].push(post);
		return groups;
	}, {} as Record<string, T[]>);
}