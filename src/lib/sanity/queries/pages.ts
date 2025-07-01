import { client } from '../client';
import {
  safeParsePage,
  safeParseSection,
  type SanityPage
} from '../schemas';

// Erweiterte Page Projektion mit allen Hero-Section Feldern
export const PAGE_PROJECTION = `{
  _id,
  _type,
  _createdAt,
  _updatedAt,
  _rev,
  title,
  'slug': slug.current,
  description,
  seo {
    title,
    description,
    'image': {
      'asset': {
        'url': image.asset->url
      }
    }
  },
  'sections': sections[]-> {
    _type,
    _id,
    title,
    subtitle,
    description,
    
    // Gemeinsame Felder für alle Section-Typen
    'image': {
      'asset': {
        'url': image.asset->url
      },
      'hotspot': image.hotspot
    },
    
    // Hero-Sektion erweiterte Felder
    layout,
    variant,
    alignment,
    colorScheme,
    overlayOpacity,
    spacing,
    highlightedText,
    'backgroundImage': {
      'asset': {
        'url': backgroundImage.asset->url
      },
      'hotspot': backgroundImage.hotspot
    },
    
    // Animation Felder
    animationType,
    animationDuration,
    staggerAnimation,
    scrollIndicator,
    
    // CTA Button Array
    'buttons': buttons[] {
      text,
      link,
      style,
      icon,
      iconPosition,
      openInNewTab
    },
    
    // Badge Object
    badge {
      text,
      style
    },
    
    // Legacy CTA Felder (Rückwärtskompatibilität)
    ctaText,
    ctaLink,
    
    // Media-Sektion spezifische Felder
    'media': {
      'asset': {
        'url': media.asset->url
      },
      'hotspot': media.hotspot
    },
    videoUrl,
    aspectRatio,
    
    // Quote-Sektion spezifische Felder
    quote,
    author,
    role,
    
    // FAQ-Sektion spezifische Felder
    'faqs': faqs[] {
      question,
      answer,
      category
    },
    
    // Grid-Sektion spezifische Felder
    columns,
    'items': items[] {
      title,
      description,
      'image': {
        'asset': {
          'url': image.asset->url
        },
        'hotspot': image.hotspot
      },
      link
    },
    
    // CTA-Sektion spezifische Felder
    primaryButton {
      text,
      link
    },
    secondaryButton {
      text,
      link
    },
    background {
      type,
      color,
      'image': image {
        'asset': {
          'url': asset->url
        },
        'hotspot': hotspot
      }
    }
  }
}`;

// Page Query Funktionen
export async function getPageBySlug(slug: string): Promise<SanityPage | null> {
  try {
    // Debug: Zeige alle verfügbaren Pages
    console.log(`🔍 Suche nach Page mit Slug: "${slug}"`);
    
    const allPages = await client.fetch<{title: string, slug: string, _id: string}[]>(
      `*[_type == "page"] { title, "slug": slug.current, _id }`
    );
    console.log('📄 Alle verfügbaren Pages in Sanity:', allPages);
    
    const rawPage = await client.fetch(
      `*[_type == "page" && slug.current == $slug][0] ${PAGE_PROJECTION}`,
      { slug }
    );
    
    if (!rawPage) {
      console.log(`❌ Page mit Slug "${slug}" nicht gefunden. Verfügbare Slugs:`, allPages.map(p => p.slug));
      return null;
    }

    // 🔍 DEBUG: Zeige die rohen Daten von Sanity
    console.log('🔥 RAW PAGE DATA von Sanity:', JSON.stringify(rawPage, null, 2));
    if (rawPage.sections && rawPage.sections[0] && rawPage.sections[0]._type === 'heroSection') {
      console.log('🎯 HERO SECTION Rohdaten:', JSON.stringify(rawPage.sections[0], null, 2));
    }
    
    // Verwende Safe Parse für bessere Fehlerbehandlung
    const pageResult = safeParsePage(rawPage);
    
    if (!pageResult.success) {
      console.error('Page validation failed:', pageResult.error);
      // Fallback: Validiere die Sections einzeln
      const validatedSections = rawPage.sections?.map((section: unknown) => {
        const sectionResult = safeParseSection(section);
        if (sectionResult.success) {
          return sectionResult.data;
        } else {
          const sectionWithType = section as { _type?: string };
          console.warn(`Section validation failed for ${sectionWithType._type || 'unknown'}:`, sectionResult.error);
          return section; // Fallback zu unvalidierten Daten
        }
      }) || [];
      
      return {
        ...rawPage,
        sections: validatedSections
      } as SanityPage;
    }
    
    console.log(`✅ Page "${slug}" gefunden:`, { title: pageResult.data.title, sectionsCount: pageResult.data.sections?.length || 0 });
    return pageResult.data;
  } catch (error) {
    console.error('Error fetching page by slug:', error);
    throw error;
  }
}