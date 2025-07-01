// Temple-spezifische Queries und Validierungen
import type { SanityTemple } from '$lib/types';
import { client } from '../client';
import { TEMPLE_PROJECTION } from './projections';

// Temple Query Funktionen
export async function getAllTemples(): Promise<SanityTemple[]> {
  return client.fetch<SanityTemple[]>(
    `*[_type == "temple"] | order(name asc) ${TEMPLE_PROJECTION}`
  );
}

export async function getActiveTemples(): Promise<SanityTemple[]> {
  return client.fetch<SanityTemple[]>(
    `*[_type == "temple" && isActive == true] | order(name asc) ${TEMPLE_PROJECTION}`
  );
}

export async function getFeaturedTemples(): Promise<SanityTemple[]> {
  return client.fetch<SanityTemple[]>(
    `*[_type == "temple" && featuredOnHomepage == true] | order(name asc) ${TEMPLE_PROJECTION}`
  );
}

export async function getTempleBySlug(slug: string): Promise<SanityTemple> {
  const temple = await client.fetch<SanityTemple>(
    `*[_type == "temple" && slug.current == $slug][0] ${TEMPLE_PROJECTION}`,
    { slug }
  );
  
  if (!temple) {
    throw new Error('Tempel nicht gefunden');
  }
  
  return temple;
}

export async function getTemplesByState(state: string): Promise<SanityTemple[]> {
  return client.fetch<SanityTemple[]>(
    `*[_type == "temple" && address.state == $state] | order(name asc) ${TEMPLE_PROJECTION}`,
    { state }
  );
}

export async function getTemplesByCity(city: string): Promise<SanityTemple[]> {
  return client.fetch<SanityTemple[]>(
    `*[_type == "temple" && address.city match $city] | order(name asc) ${TEMPLE_PROJECTION}`,
    { city: `*${city}*` }
  );
}

export async function getTemplesByFacility(facility: string): Promise<SanityTemple[]> {
  return client.fetch<SanityTemple[]>(
    `*[_type == "temple" && $facility in facilities] | order(name asc) ${TEMPLE_PROJECTION}`,
    { facility }
  );
}

// Geolocation-basierte Queries
export async function getTemplesNearLocation(lat: number, lng: number, radiusKm = 50): Promise<SanityTemple[]> {
  // Vereinfachte Implementierung - in der Praxis würde man eine geospatiale Query verwenden
  return client.fetch<SanityTemple[]>(
    `*[_type == "temple" && defined(location.lat) && defined(location.lng)] | order(name asc) ${TEMPLE_PROJECTION}`
  );
}

// Temple Map Data - optimiert für Karten-Display
export async function getTempleMapData(): Promise<Array<{
  _id: string;
  name: string;
  slug: string;
  location: { lat: number; lng: number };
  address: { city: string; state?: string };
  isActive: boolean;
}>> {
  const mapDataQuery = `*[_type == "temple" && defined(location.lat) && defined(location.lng)] {
    _id,
    name,
    "slug": slug.current,
    location,
    address {
      city,
      state
    },
    isActive
  }`;
  
  return client.fetch(mapDataQuery);
}

// Temple Query Objekt
export const templeQueries = {
  all: () => getAllTemples(),
  active: () => getActiveTemples(),
  featured: () => getFeaturedTemples(),
  bySlug: (slug: string) => getTempleBySlug(slug),
  byState: (state: string) => getTemplesByState(state),
  byCity: (city: string) => getTemplesByCity(city),
  byFacility: (facility: string) => getTemplesByFacility(facility),
  nearLocation: (lat: number, lng: number, radiusKm?: number) => getTemplesNearLocation(lat, lng, radiusKm),
  mapData: () => getTempleMapData(),
  
  // Erweiterte Filter-Kombinationen
  activeByState: async (state: string): Promise<SanityTemple[]> => {
    return client.fetch<SanityTemple[]>(
      `*[_type == "temple" && isActive == true && address.state == $state] | order(name asc) ${TEMPLE_PROJECTION}`,
      { state }
    );
  },
  
  withPrograms: async (): Promise<SanityTemple[]> => {
    return client.fetch<SanityTemple[]>(
      `*[_type == "temple" && count(programs) > 0] | order(name asc) ${TEMPLE_PROJECTION}`
    );
  },
  
  searchByName: async (searchTerm: string): Promise<SanityTemple[]> => {
    return client.fetch<SanityTemple[]>(
      `*[_type == "temple" && name match $searchTerm] | order(name asc) ${TEMPLE_PROJECTION}`,
      { searchTerm: `*${searchTerm}*` }
    );
  },
  
  // Legacy-Kompatibilität für bestehenden Code
  getAllTemples,
  getActiveTemples,
  getFeaturedTemples,
  getTempleBySlug,
  getTemplesByState,
  getTemplesByCity,
  getTemplesByFacility,
  getTemplesNearLocation,
  getTempleMapData
};