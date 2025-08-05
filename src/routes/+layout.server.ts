import type { LayoutServerLoad } from './$types';
import { getIntelligentNavigation } from '$lib/sanity/navigation';
import { getSanityNavigation } from '$lib/sanity/queries/navigation';

export const load: LayoutServerLoad = async () => {
  try {
    // Zuerst versuchen, Sanity-basierte Navigation zu laden
    const sanityNav = await getSanityNavigation();
    
    if (sanityNav) {
      // Transformiere Sanity-Navigation in das erwartete Format
      return {
        navigationData: transformSanityNavigation(sanityNav),
        usingSanityNav: true
      };
    }
    
    // Fallback: Lade intelligente Navigation aus Sanity-Inhalten
    const navigationData = await getIntelligentNavigation();
    
    return {
      navigationData,
      usingSanityNav: false
    };
  } catch (error) {
    console.error('Fehler beim Laden der Layout-Daten:', error);
    
    // Fallback: Null zurückgeben, damit Navbar Fallback-Daten verwendet
    return {
      navigationData: null,
      usingSanityNav: false
    };
  }
};

// Helper-Funktion zum Transformieren der Sanity-Navigation
function transformSanityNavigation(sanityNav: any) {
  return sanityNav.items.map((item: any) => {
    // Einfacher Link
    if (item.type === 'link') {
      return {
        title: item.title,
        href: getHref(item.link),
        highlight: item.highlight,
        badge: item.badge,
        openInNewTab: item.link?.openInNewTab
      };
    }
    
    // Dropdown
    if (item.type === 'dropdown') {
      return {
        title: item.title,
        sections: [{
          items: item.dropdown.map((dropItem: any) => ({
            title: dropItem.title,
            href: getHref(dropItem.link),
            description: dropItem.description,
            icon: dropItem.icon
          }))
        }]
      };
    }
    
    // Mega Menu
    if (item.type === 'megamenu') {
      const result: any = {
        title: item.title,
        sections: item.megamenu.columns.map((column: any) => ({
          title: column.title,
          items: column.items.map((colItem: any) => ({
            title: colItem.title,
            href: getHref(colItem.link),
            description: colItem.description,
            icon: colItem.icon
          }))
        }))
      };
      
      // Featured Content
      if (item.megamenu.featured?.enabled) {
        result.featured = {
          title: item.megamenu.featured.title,
          description: item.megamenu.featured.description,
          href: getHref(item.megamenu.featured.link),
          image: item.megamenu.featured.image
        };
      }
      
      return result;
    }
    
    return null;
  }).filter(Boolean);
}

// Helper-Funktion zum Generieren der URL
function getHref(link: any): string {
  if (!link) return '#';
  
  if (link.type === 'external' || link.type === 'internal') {
    return link.url || '#';
  }
  
  if (link.type === 'reference' && link.reference) {
    const ref = link.reference;
    
    // Route basierend auf Dokumenttyp
    switch (ref._type) {
      case 'post':
        return `/blog/${ref.slug}`;
      case 'event':
        return `/events/${ref.slug}`;
      case 'temple':
        return `/tempel/${ref.slug}`;
      case 'literature':
        return `/literature/${ref.slug}`;
      case 'page':
      case 'customPage':
        return `/${ref.slug}`;
      default:
        return `/${ref.slug}`;
    }
  }
  
  return '#';
}