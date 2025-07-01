/**
 * Utility-Funktionen für die Berechnung von Lesezeiten für Blog-Posts
 */

// PortableText-Typen für Sanity
interface PortableTextChild {
	_type: string;
	text?: string;
	marks?: string[];
}

interface PortableTextBlock {
	_type: string;
	children?: PortableTextChild[];
	style?: string;
	markDefs?: unknown[];
}

/**
 * Extrahiert Text aus Sanity PortableText-Inhalten
 * @param blocks - Array von PortableText-Blöcken
 * @returns Extrahierter Text als String
 */
export function extractTextFromPortableText(blocks: PortableTextBlock[]): string {
	if (!blocks || !Array.isArray(blocks)) {
		return '';
	}

	return blocks
		.map((block) => {
			if (block._type === 'block' && block.children) {
				return block.children
					.map((child: PortableTextChild) => child.text || '')
					.join('')
					.trim();
			}
			return '';
		})
		.filter(Boolean)
		.join(' ');
}

/**
 * Zählt die Anzahl der Wörter in einem Text
 * @param text - Der zu analysierende Text
 * @returns Anzahl der Wörter
 */
function countWords(text: string): number {
	if (!text || typeof text !== 'string') {
		return 0;
	}

	// Bereinigt den Text von HTML-Tags und extra Leerzeichen
	const cleanText = text
		.replace(/<[^>]*>/g, '') // HTML-Tags entfernen
		.replace(/\s+/g, ' ') // Mehrfache Leerzeichen zu einem
		.trim();

	if (!cleanText) {
		return 0;
	}

	// Teilt den Text bei Leerzeichen und filtert leere Strings
	return cleanText.split(' ').filter((word) => word.length > 0).length;
}

/**
 * Berechnet die geschätzte Lesezeit für Blog-Posts
 * Verwendet durchschnittlich 200 Wörter pro Minute als Basis
 * 
 * @param content - Der Post-Inhalt als String oder PortableText-Array
 * @returns Formatierter String wie "5 min Lesezeit" oder "1 min Lesezeit"
 */
export function calculateReadingTime(content: string | PortableTextBlock[]): string {
	if (!content) {
		return '1 min Lesezeit';
	}

	let text: string;

	// Prüfe ob content ein PortableText-Array ist
	if (Array.isArray(content)) {
		text = extractTextFromPortableText(content);
	} else if (typeof content === 'string') {
		text = content;
	} else {
		// Fallback für unbekannte Typen
		text = String(content);
	}

	const wordCount = countWords(text);
	
	// Durchschnittlich 200 Wörter pro Minute
	const wordsPerMinute = 200;
	const minutes = Math.ceil(wordCount / wordsPerMinute);

	// Mindestens 1 Minute Lesezeit anzeigen
	const readingTime = Math.max(1, minutes);

	return `${readingTime} min Lesezeit`;
}

/**
 * Berechnet die Lesezeit und gibt zusätzliche Statistiken zurück
 * @param content - Der Post-Inhalt
 * @returns Objekt mit Lesezeit-Informationen
 */
export function calculateReadingTimeDetailed(content: string | PortableTextBlock[]): {
	readingTime: string;
	wordCount: number;
	minutes: number;
} {
	if (!content) {
		return {
			readingTime: '1 min Lesezeit',
			wordCount: 0,
			minutes: 1
		};
	}

	let text: string;

	if (Array.isArray(content)) {
		text = extractTextFromPortableText(content);
	} else if (typeof content === 'string') {
		text = content;
	} else {
		text = String(content);
	}

	const wordCount = countWords(text);
	const wordsPerMinute = 200;
	const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

	return {
		readingTime: `${minutes} min Lesezeit`,
		wordCount,
		minutes
	};
}