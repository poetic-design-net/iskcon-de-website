/**
 * Utility-Funktionen für die Konvertierung zwischen geografischen Koordinaten (lat/lng) 
 * und SVG-Koordinaten für die Deutschland-Karte
 */

// Deutschland-Karte SVG ViewBox: "0 0 585.5 792.7"
const SVG_BOUNDS = {
  width: 585.5,
  height: 792.7
};

// Geografische Bounds für Deutschland
const GEO_BOUNDS = {
  north: 55.05,  // Nördlichster Punkt (List/Sylt)
  south: 47.27,  // Südlichster Punkt (Oberstdorf)
  east: 15.04,   // Östlichster Punkt (Görlitz)
  west: 5.87     // Westlichster Punkt (Selfkant)
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
  slug?: string;    // Für Verlinkung zu Temple-Detail-Seite
  isActive?: boolean;
  featuredOnHomepage?: boolean;
}

/**
 * Konvertiert geografische Koordinaten (lat/lng) zu SVG-Koordinaten (x/y)
 * für die Deutschland-Karte
 * 
 * @param lat - Latitude (Breitengrad)
 * @param lng - Longitude (Längengrad)
 * @returns SVG-Koordinaten {x, y}
 */
export function latLngToSVG(lat: number, lng: number): SVGCoordinates {
  // Validiere Input-Koordinaten
  if (!isValidGermanCoordinates(lat, lng)) {
    console.warn(`Warnung: Koordinaten ${lat}, ${lng} liegen außerhalb der Deutschland-Bounds`);
  }

  // Normalisiere die geografischen Koordinaten auf 0-1 Bereich
  const normalizedLat = (lat - GEO_BOUNDS.south) / (GEO_BOUNDS.north - GEO_BOUNDS.south);
  const normalizedLng = (lng - GEO_BOUNDS.west) / (GEO_BOUNDS.east - GEO_BOUNDS.west);

  // Konvertiere zu SVG-Koordinaten
  // Y-Achse ist invertiert (SVG 0,0 ist oben links, aber höhere Latitude ist weiter nördlich)
  const x = normalizedLng * SVG_BOUNDS.width;
  const y = (1 - normalizedLat) * SVG_BOUNDS.height;

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
 * @returns Geografische Koordinaten {lat, lng}
 */
export function svgToLatLng(x: number, y: number): GeoCoordinates {
  // Validiere SVG-Koordinaten
  if (!isValidSVGCoordinates(x, y)) {
    console.warn(`Warnung: SVG-Koordinaten ${x}, ${y} liegen außerhalb der ViewBox`);
  }

  // Normalisiere SVG-Koordinaten auf 0-1 Bereich
  const normalizedX = x / SVG_BOUNDS.width;
  const normalizedY = y / SVG_BOUNDS.height;

  // Konvertiere zu geografischen Koordinaten
  // Y-Achse ist invertiert
  const lng = GEO_BOUNDS.west + (normalizedX * (GEO_BOUNDS.east - GEO_BOUNDS.west));
  const lat = GEO_BOUNDS.south + ((1 - normalizedY) * (GEO_BOUNDS.north - GEO_BOUNDS.south));

  return {
    lat: Math.round(lat * 100000) / 100000, // Runde auf 5 Dezimalstellen
    lng: Math.round(lng * 100000) / 100000
  };
}

/**
 * Validiert ob geografische Koordinaten innerhalb der Deutschland-Bounds liegen
 * 
 * @param lat - Latitude
 * @param lng - Longitude
 * @returns true wenn innerhalb Deutschlands
 */
export function isValidGermanCoordinates(lat: number, lng: number): boolean {
  return lat >= GEO_BOUNDS.south && 
         lat <= GEO_BOUNDS.north && 
         lng >= GEO_BOUNDS.west && 
         lng <= GEO_BOUNDS.east;
}

/**
 * Validiert ob SVG-Koordinaten innerhalb der ViewBox liegen
 * 
 * @param x - SVG X-Koordinate
 * @param y - SVG Y-Koordinate
 * @returns true wenn innerhalb der ViewBox
 */
export function isValidSVGCoordinates(x: number, y: number): boolean {
  return x >= 0 && x <= SVG_BOUNDS.width && y >= 0 && y <= SVG_BOUNDS.height;
}

/**
 * Konvertiert ein Sanity Temple-Objekt zu einer TempleLocation für die Karte
 * 
 * @param temple - Sanity Temple-Objekt
 * @returns TempleLocation mit SVG- und geografischen Koordinaten
 */
export function templeToLocation(temple: {
  _id?: string;
  name: string;
  slug: string;
  location: { lat: number; lng: number };
  isActive?: boolean;
  featuredOnHomepage?: boolean;
}): TempleLocation {
  const svgCoords = latLngToSVG(temple.location.lat, temple.location.lng);
  
  return {
    id: temple._id || temple.slug,
    name: temple.name,
    slug: temple.slug,
    x: svgCoords.x,
    y: svgCoords.y,
    lat: temple.location.lat,
    lng: temple.location.lng,
    isActive: temple.isActive !== false,
    featuredOnHomepage: temple.featuredOnHomepage || false
  };
}

/**
 * Batch-Konvertierung für mehrere Tempel
 * 
 * @param temples - Array von Sanity Temple-Objekten
 * @returns Array von TempleLocations
 */
export function templesToLocations(temples: Array<{
  _id?: string;
  name: string;
  slug: string;
  location: { lat: number; lng: number };
  isActive?: boolean;
  featuredOnHomepage?: boolean;
}>): TempleLocation[] {
  return temples
    .filter(temple => temple.isActive !== false) // Nur aktive Tempel
    .map(temple => templeToLocation(temple));
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
  berlin: { lat: 52.5200, lng: 13.4050 },
  munich: { lat: 48.1351, lng: 11.5820 },
  hamburg: { lat: 53.5511, lng: 9.9937 },
  cologne: { lat: 50.9375, lng: 6.9603 },
  frankfurt: { lat: 50.1109, lng: 8.6821 },
  jandelsbrunn: { lat: 48.74318185563101, lng: 13.706629736308894 }
};

/**
 * Erstellt Beispiel-SVG-Koordinaten für Demo-Zwecke
 */
export function getDemoSVGCoordinates(): Record<string, SVGCoordinates> {
  const result: Record<string, SVGCoordinates> = {};
  
  for (const [city, coords] of Object.entries(DEMO_COORDINATES)) {
    result[city] = latLngToSVG(coords.lat, coords.lng);
  }
  
  return result;
}

// Export der Bounds für andere Module
export { SVG_BOUNDS, GEO_BOUNDS };