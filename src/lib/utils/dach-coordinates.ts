/**
 * Utility-Funktionen für die Konvertierung zwischen geografischen Koordinaten (lat/lng) 
 * und SVG-Koordinaten für die DACH-Karten (Deutschland, Österreich, Schweiz)
 */

export type Country = 'germany' | 'austria' | 'switzerland';

// SVG ViewBox Dimensionen für jedes Land
const SVG_BOUNDS: Record<Country, { width: number; height: number }> = {
  germany: {
    width: 585.5,
    height: 792.7
  },
  austria: {
    width: 612.93958,
    height: 313.54865
  },
  switzerland: {
    width: 1224.3984,
    height: 783.07391
  }
};

// Geografische Bounds für jedes Land
const GEO_BOUNDS: Record<Country, { north: number; south: number; east: number; west: number }> = {
  germany: {
    north: 55.05,  // Nördlichster Punkt (List/Sylt)
    south: 47.27,  // Südlichster Punkt (Oberstdorf)
    east: 15.04,   // Östlichster Punkt (Görlitz)
    west: 5.87     // Westlichster Punkt (Selfkant)
  },
  austria: {
    north: 49.015279,  // Nördlichster Punkt
    south: 46.371323,  // Südlichster Punkt
    east: 17.163182,   // Östlichster Punkt
    west: 9.500931     // Westlichster Punkt
  },
  switzerland: {
    north: 47.808048,  // Nördlichster Punkt
    south: 45.817216,  // Südlichster Punkt
    east: 10.492377,   // Östlichster Punkt
    west: 5.956532     // Westlichster Punkt
  }
};

/**
 * Interface für geografische Koordinaten
 */
export interface GeoCoordinates {
  lat: number;
  lng: number;
}

/**
 * Interface für SVG-Koordinaten
 */
export interface SVGCoordinates {
  x: number;
  y: number;
}

/**
 * Interface für erweiterte Location mit beiden Koordinatentypen
 */
export interface TempleLocation {
  id: string;
  name: string;
  x: number;        // SVG X-Koordinate
  y: number;        // SVG Y-Koordinate
  lat: number;      // Geografische Latitude
  lng: number;      // Geografische Longitude
  country?: Country; // Land
  slug?: string;    // Für Verlinkung zu Temple-Detail-Seite
  isActive?: boolean;
  featuredOnHomepage?: boolean;
}

/**
 * Erkennt automatisch das Land basierend auf Koordinaten
 */
export function detectCountry(lat: number, lng: number): Country | null {
  // Prüfe für jedes Land ob die Koordinaten innerhalb der Bounds liegen
  for (const [country, bounds] of Object.entries(GEO_BOUNDS)) {
    if (lat >= bounds.south && lat <= bounds.north && 
        lng >= bounds.west && lng <= bounds.east) {
      return country as Country;
    }
  }
  
  // Fallback: Bestimme nächstgelegenes Land
  let minDistance = Infinity;
  let closestCountry: Country | null = null;
  
  for (const [country, bounds] of Object.entries(GEO_BOUNDS)) {
    const centerLat = (bounds.north + bounds.south) / 2;
    const centerLng = (bounds.east + bounds.west) / 2;
    const distance = Math.sqrt(
      Math.pow(lat - centerLat, 2) + Math.pow(lng - centerLng, 2)
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      closestCountry = country as Country;
    }
  }
  
  return closestCountry;
}

/**
 * Konvertiert geografische Koordinaten (lat/lng) zu SVG-Koordinaten (x/y)
 * für die spezifische Länderkarte
 * 
 * @param lat - Latitude (Breitengrad)
 * @param lng - Longitude (Längengrad)
 * @param country - Zielland für die Karte
 * @returns SVG-Koordinaten {x, y}
 */
export function latLngToSVG(lat: number, lng: number, country: Country): SVGCoordinates {
  const svgBounds = SVG_BOUNDS[country];
  const geoBounds = GEO_BOUNDS[country];
  
  // Validiere Input-Koordinaten
  if (!isValidCountryCoordinates(lat, lng, country)) {
    console.warn(`Warnung: Koordinaten ${lat}, ${lng} liegen außerhalb der ${country}-Bounds`);
  }

  // Normalisiere die geografischen Koordinaten auf 0-1 Bereich
  const normalizedLat = (lat - geoBounds.south) / (geoBounds.north - geoBounds.south);
  const normalizedLng = (lng - geoBounds.west) / (geoBounds.east - geoBounds.west);

  // Konvertiere zu SVG-Koordinaten
  // Y-Achse ist invertiert (SVG 0,0 ist oben links, aber höhere Latitude ist weiter nördlich)
  const x = normalizedLng * svgBounds.width;
  const y = (1 - normalizedLat) * svgBounds.height;

  return {
    x: Math.round(x * 10) / 10, // Runde auf 1 Dezimalstelle
    y: Math.round(y * 10) / 10
  };
}

/**
 * Konvertiert SVG-Koordinaten (x/y) zu geografischen Koordinaten (lat/lng)
 * 
 * @param x - SVG X-Koordinate
 * @param y - SVG Y-Koordinate
 * @param country - Quellland der Karte
 * @returns Geografische Koordinaten {lat, lng}
 */
export function svgToLatLng(x: number, y: number, country: Country): GeoCoordinates {
  const svgBounds = SVG_BOUNDS[country];
  const geoBounds = GEO_BOUNDS[country];
  
  // Validiere SVG-Koordinaten
  if (!isValidSVGCoordinates(x, y, country)) {
    console.warn(`Warnung: SVG-Koordinaten ${x}, ${y} liegen außerhalb der ${country} ViewBox`);
  }

  // Normalisiere SVG-Koordinaten auf 0-1 Bereich
  const normalizedX = x / svgBounds.width;
  const normalizedY = y / svgBounds.height;

  // Konvertiere zu geografischen Koordinaten
  // Y-Achse ist invertiert
  const lng = geoBounds.west + (normalizedX * (geoBounds.east - geoBounds.west));
  const lat = geoBounds.south + ((1 - normalizedY) * (geoBounds.north - geoBounds.south));

  return {
    lat: Math.round(lat * 100000) / 100000, // Runde auf 5 Dezimalstellen
    lng: Math.round(lng * 100000) / 100000
  };
}

/**
 * Validiert ob geografische Koordinaten innerhalb der Ländergrenzen liegen
 * 
 * @param lat - Latitude
 * @param lng - Longitude
 * @param country - Land zum Prüfen
 * @returns true wenn innerhalb des Landes
 */
export function isValidCountryCoordinates(lat: number, lng: number, country: Country): boolean {
  const bounds = GEO_BOUNDS[country];
  return lat >= bounds.south && 
         lat <= bounds.north && 
         lng >= bounds.west && 
         lng <= bounds.east;
}

/**
 * Validiert ob SVG-Koordinaten innerhalb der ViewBox liegen
 * 
 * @param x - SVG X-Koordinate
 * @param y - SVG Y-Koordinate
 * @param country - Land der Karte
 * @returns true wenn innerhalb der ViewBox
 */
export function isValidSVGCoordinates(x: number, y: number, country: Country): boolean {
  const bounds = SVG_BOUNDS[country];
  return x >= 0 && x <= bounds.width && y >= 0 && y <= bounds.height;
}

/**
 * Konvertiert ein Sanity Temple-Objekt zu einer TempleLocation für die Karte
 * Erkennt automatisch das Land basierend auf Koordinaten
 * 
 * @param temple - Sanity Temple-Objekt
 * @returns TempleLocation mit SVG- und geografischen Koordinaten
 */
export function templeToLocation(temple: {
  _id?: string;
  name: string;
  slug: string;
  location: { lat: number; lng: number; country?: string };
  address?: { country?: string };
  isActive?: boolean;
  featuredOnHomepage?: boolean;
}): TempleLocation | null {
  // Bestimme das Land
  let country: Country | null = null;
  
  // Prüfe explizite Länderangabe
  const explicitCountry = temple.location?.country || temple.address?.country;
  if (explicitCountry) {
    const countryMap: Record<string, Country> = {
      'Germany': 'germany',
      'Deutschland': 'germany',
      'DE': 'germany',
      'Austria': 'austria',
      'Österreich': 'austria',
      'AT': 'austria',
      'Switzerland': 'switzerland',
      'Schweiz': 'switzerland',
      'CH': 'switzerland'
    };
    country = countryMap[explicitCountry] || null;
  }
  
  // Falls kein Land angegeben, versuche es basierend auf Koordinaten zu erkennen
  if (!country && temple.location?.lat && temple.location?.lng) {
    country = detectCountry(temple.location.lat, temple.location.lng);
  }
  
  if (!country) {
    console.warn(`Konnte Land für Tempel ${temple.name} nicht bestimmen`);
    return null;
  }
  
  const svgCoords = latLngToSVG(temple.location.lat, temple.location.lng, country);
  
  return {
    id: temple._id || temple.slug,
    name: temple.name,
    slug: temple.slug,
    x: svgCoords.x,
    y: svgCoords.y,
    lat: temple.location.lat,
    lng: temple.location.lng,
    country,
    isActive: temple.isActive !== false,
    featuredOnHomepage: temple.featuredOnHomepage || false
  };
}

/**
 * Batch-Konvertierung für mehrere Tempel
 * Filtert automatisch nach Land
 * 
 * @param temples - Array von Sanity Temple-Objekten
 * @param filterCountry - Optional: Nur Tempel dieses Landes zurückgeben
 * @returns Array von TempleLocations
 */
export function templesToLocations(
  temples: Array<{
    _id?: string;
    name: string;
    slug: string;
    location: { lat: number; lng: number; country?: string };
    address?: { country?: string };
    isActive?: boolean;
    featuredOnHomepage?: boolean;
  }>,
  filterCountry?: Country
): TempleLocation[] {
  return temples
    .filter(temple => temple.isActive !== false) // Nur aktive Tempel
    .map(temple => templeToLocation(temple))
    .filter((location): location is TempleLocation => {
      if (!location) return false;
      if (filterCountry) {
        return location.country === filterCountry;
      }
      return true;
    });
}

/**
 * Berechnet die Entfernung zwischen zwei geografischen Punkten in Kilometern
 * Verwendet die Haversine-Formel
 * 
 * @param lat1 - Latitude des ersten Punktes
 * @param lng1 - Longitude des ersten Punktes  
 * @param lat2 - Latitude des zweiten Punktes
 * @param lng2 - Longitude des zweiten Punktes
 * @returns Entfernung in Kilometern
 */
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Erdradius in Kilometern
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 100) / 100; // Runde auf 2 Dezimalstellen
}

/**
 * Hilfsfunktion: Konvertiert Grad zu Radiant
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Findet den nächstgelegenen Tempel zu gegebenen Koordinaten
 * 
 * @param targetLat - Ziel-Latitude
 * @param targetLng - Ziel-Longitude
 * @param temples - Array von TempleLocations
 * @returns Nächstgelegener Tempel mit Entfernung
 */
export function findNearestTemple(
  targetLat: number, 
  targetLng: number, 
  temples: TempleLocation[]
): { temple: TempleLocation; distance: number } | null {
  if (temples.length === 0) return null;
  
  let nearestTemple = temples[0];
  let minDistance = calculateDistance(targetLat, targetLng, nearestTemple.lat, nearestTemple.lng);
  
  for (let i = 1; i < temples.length; i++) {
    const distance = calculateDistance(targetLat, targetLng, temples[i].lat, temples[i].lng);
    if (distance < minDistance) {
      minDistance = distance;
      nearestTemple = temples[i];
    }
  }
  
  return {
    temple: nearestTemple,
    distance: minDistance
  };
}

/**
 * Demo-Koordinaten für Tests und Entwicklung
 */
export const DEMO_COORDINATES = {
  // Deutschland
  berlin: { lat: 52.5200, lng: 13.4050, country: 'germany' as Country },
  munich: { lat: 48.1351, lng: 11.5820, country: 'germany' as Country },
  hamburg: { lat: 53.5511, lng: 9.9937, country: 'germany' as Country },
  cologne: { lat: 50.9375, lng: 6.9603, country: 'germany' as Country },
  frankfurt: { lat: 50.1109, lng: 8.6821, country: 'germany' as Country },
  jandelsbrunn: { lat: 48.74318185563101, lng: 13.706629736308894, country: 'germany' as Country },
  
  // Österreich
  vienna: { lat: 48.2082, lng: 16.3738, country: 'austria' as Country },
  salzburg: { lat: 47.8095, lng: 13.0550, country: 'austria' as Country },
  innsbruck: { lat: 47.2692, lng: 11.4041, country: 'austria' as Country },
  graz: { lat: 47.0707, lng: 15.4395, country: 'austria' as Country },
  
  // Schweiz
  zurich: { lat: 47.3769, lng: 8.5417, country: 'switzerland' as Country },
  geneva: { lat: 46.2044, lng: 6.1432, country: 'switzerland' as Country },
  bern: { lat: 46.9480, lng: 7.4474, country: 'switzerland' as Country },
  basel: { lat: 47.5596, lng: 7.5886, country: 'switzerland' as Country },
  lucerne: { lat: 47.0502, lng: 8.3093, country: 'switzerland' as Country }
};

// Export der Bounds für andere Module
export { SVG_BOUNDS, GEO_BOUNDS };