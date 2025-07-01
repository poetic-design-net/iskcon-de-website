import type { LayoutServerLoad } from './$types';
import { getIntelligentNavigation } from '$lib/sanity/navigation';

export const load: LayoutServerLoad = async () => {
  try {
    // Lade intelligente Navigation aus Sanity
    const navigationData = await getIntelligentNavigation();
    
    return {
      navigationData
    };
  } catch (error) {
    console.error('Fehler beim Laden der Layout-Daten:', error);
    
    // Fallback: Null zurückgeben, damit Navbar Fallback-Daten verwendet
    return {
      navigationData: null
    };
  }
};