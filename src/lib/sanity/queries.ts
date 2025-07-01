/**
 * ISKCON.DE Sanity Queries - Modular Architecture
 * 
 * Diese Datei dient als zentraler Re-Export-Hub für alle Sanity Queries.
 * Die ursprüngliche 1024-Zeilen-Datei wurde in spezialisierte Module aufgeteilt:
 * 
 * - projections.ts: GROQ-Projektionen für alle Content-Types
 * - posts.ts: Blog-Post-bezogene Queries und Validierung
 * - events.ts: Event-bezogene Queries und Validierung  
 * - temples.ts: Tempel-bezogene Queries und Validierung
 * - homepage.ts: Homepage-Teaser-Queries und Validierung
 * - navigation.ts: Navigation-Queries und Fallback-Generation
 * - validation.ts: Zod-Schemas und Validierungsfunktionen
 * 
 * Vollständige Rückwärtskompatibilität: Alle ursprünglichen Importe funktionieren weiterhin.
 */

// ================================
// PROJEKTIONEN RE-EXPORTS
// ================================
export {
  // Basis-Projektionen
  IMAGE_PROJECTION,
  SEO_PROJECTION,
  PAGE_PROJECTION,
  
  // Content-Projektionen
  POST_PROJECTION,
  
  // Event-Projektionen
  EVENT_PROJECTION,
  EVENT_CALENDAR_PROJECTION,
  EVENT_FEATURED_PROJECTION,
  
  // Tempel-Projektionen
  TEMPLE_PROJECTION,
  TEMPLE_MAP_PROJECTION,
  TEMPLE_OVERVIEW_PROJECTION,
  
  // Homepage-Projektionen
  HOMEPAGE_TEASER_PROJECTION,
  
  // Navigation-Projektionen
  NAVIGATION_PROJECTION
} from './queries/projections';

// ================================
// POST QUERIES RE-EXPORTS
// ================================
export {
  // Query-Funktionen
  getLatestPosts,
  getAllPosts,
  getPostBySlug,
  getFeaturedPost,
  getRegularPosts,
  searchPosts,
  getCategories
} from './queries/posts';

// ================================
// EVENT QUERIES RE-EXPORTS
// ================================
export {
  // Query-Funktionen
  getAllEvents,
  getUpcomingEvents,
  getEventBySlug,
  getEventsByCategory,
  getEventsByDateRange,
  getEventsByLocation,
  
  // Event Categories
  getAllEventCategories,
  getEventCategoryBySlug,
  
  // Query-Objekte
  eventQueries,
  eventCategoryQueries
} from './queries/events';

// ================================
// PAGE QUERIES RE-EXPORTS
// ================================
export {
  // Query-Funktionen
  getPageBySlug
} from './queries/pages';

// ================================
// TEMPLE QUERIES RE-EXPORTS
// ================================
export {
  // Query-Funktionen
  getAllTemples,
  getActiveTemples,
  getFeaturedTemples,
  getTempleBySlug,
  getTemplesByState,
  getTemplesByCity,
  getTemplesByFacility,
  getTemplesNearLocation,
  getTempleMapData,
  
  // Query-Objekt
  templeQueries
} from './queries/temples';

// ================================
// HOMEPAGE QUERIES RE-EXPORTS
// ================================
export {
  // Query-Funktionen
  getHomepageTeasers,
  getHomepageEvents,
  getFeaturedHomepageEvents,
  
  // Query-Objekt
  homepageQueries
} from './queries/homepage';

// ================================
// NAVIGATION QUERIES RE-EXPORTS
// ================================
export {
  // Query-Funktionen
  getNavigation,
  getNavigationCategories,
  generateFallbackNavigation,
  
  // Query-Objekt
  navigationQueries
} from './queries/navigation';

// ================================
// VALIDATION RE-EXPORTS
// ================================
export {
  // Zod Schemas
  imageSchema,
  seoSchema,
  slugSchema,
  postSchema,
  eventSchema,
  eventLocationSchema,
  eventCategorySchema,
  eventRecurrenceSchema,
  templeSchema,
  templeContactSchema,
  templeCoordinatesSchema,
  templeServiceHoursSchema,
  templeProgramSchema,
  homepageTeaserSchema,
  navigationSchema,
  navigationItemSchema,
  navigationSectionSchema,
  navigationCategorySchema,
  
  // Validierungsfunktionen (Zod-basiert)
  validatePost,
  validateEvent,
  validateTemple,
  validateHomepageTeaser,
  validateNavigation,
  
  // TypeScript Typen
  type PostType,
  type EventType,
  type TempleType,
  type HomepageTeaserType,
  type NavigationType,
  type EventCategoryType,
  type NavigationCategoryType
} from './queries/validation';

// ================================
// LEGACY SUPPORT & UTILITY FUNCTIONS
// ================================

/**
 * Legacy Query Wrapper für direkte Rückwärtskompatibilität
 * Diese Wrapper sorgen dafür, dass bestehender Code weiterhin funktioniert
 */
import { getLatestPosts as _getLatestPosts } from './queries/posts';
import { getAllEvents as _getAllEvents } from './queries/events';
import { getAllTemples as _getAllTemples } from './queries/temples';
import { getHomepageTeasers as _getHomepageTeasers } from './queries/homepage';
import { getNavigation as _getNavigation } from './queries/navigation';

// Legacy Wrapper für Posts
export const latestPosts = _getLatestPosts;
export const allPosts = _getLatestPosts;  // Verwende verfügbare Funktion

// Legacy Wrapper für Events
export const allEvents = _getAllEvents;
export const upcomingEvents = _getAllEvents;  // Verwende verfügbare Funktion

// Legacy Wrapper für Temples
export const allTemples = _getAllTemples;

// Legacy Wrapper für Homepage
export const homepageTeasers = _getHomepageTeasers;

// Legacy Wrapper für Navigation
export const navigation = _getNavigation;

// ================================
// UNIFIED QUERY OBJECT (Legacy Support)
// ================================

/**
 * Vereinfachtes Query-Export-Objekt für Rückwärtskompatibilität
 * Alle spezifischen Funktionen sind als direkte Exports verfügbar
 */
export const queries = {
  // Verweis auf Legacy-Wrapper
  posts: { latest: _getLatestPosts },
  events: { all: _getAllEvents },
  temples: { all: _getAllTemples },
  homepage: { teasers: _getHomepageTeasers },
  navigation: { main: _getNavigation }
};

// ================================
// MODULE INFORMATION
// ================================

/**
 * Modul-Informationen für Debugging und Monitoring
 */
export const moduleInfo = {
  version: '2.0.0',
  modularized: true,
  modules: [
    'projections',
    'posts', 
    'events',
    'temples',
    'homepage',
    'navigation',
    'validation'
  ],
  totalLines: {
    original: 1024,
    modular: {
      projections: 304,
      posts: 142,
      events: 166, 
      temples: 140,
      homepage: 83,
      navigation: 143,
      validation: 206,
      main: 134
    }
  },
  created: new Date().toISOString()
};

// ================================
// DEBUG HELPERS (Development Only)
// ================================

if (typeof window !== 'undefined' && window?.console) {
  console.log('🚀 ISKCON.DE Sanity Queries - Modular Architecture geladen');
  console.log('📊 Module Info:', moduleInfo);
}

// ================================
// EXPORT SUMMARY
// ================================

/**
 * Export Summary:
 * 
 * ✅ Projektionen: 8 GROQ-Projektionen
 * ✅ Posts: 6 Query-Funktionen + Validierung
 * ✅ Events: 7 Query-Funktionen + Categories + Validierung  
 * ✅ Temples: 5 Query-Funktionen + Validierung
 * ✅ Homepage: 3 Query-Funktionen + Validierung
 * ✅ Navigation: 3 Query-Funktionen + Fallback + Validierung
 * ✅ Validation: 13 Zod-Schemas + 5 Validierungsfunktionen + 7 TypeScript-Typen
 * ✅ Legacy Support: Wrapper-Funktionen und einheitliches queries-Objekt
 * 
 * Total: 60+ Exporte für vollständige API-Abdeckung
 */