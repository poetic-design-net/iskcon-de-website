import { getLatestPosts, templeQueries, eventQueries, homepageQueries } from '$lib/sanity/queries';
import { validateProjectedPost } from '$lib/sanity/queries/validation';
import { client } from '$lib/sanity/client';
import { getHomepage } from '$lib/sanity/queries/homepage';

// Definiere einen Typ für die Seiten-Daten, die wir für das Grid benötigen
interface PageGridItem {
  title: string;
  slug: string;
  description: string;
  mainImage?: {
    asset: {
      url: string;
    };
  };
}

export const load = async () => {
  try {
    console.log('🏠 Homepage Server Load - Start');
    
    // Lade die neuesten Blog-Posts
    const posts = await getLatestPosts();
    console.log('📝 Blog Posts geladen:', posts?.length || 0);
    
    // Debug: Strukturanalyse der ersten Posts
    if (posts && posts.length > 0) {
      console.log('🔍 Erste Post-Struktur:', {
        title: posts[0].title,
        slug: posts[0].slug,
        slugType: typeof posts[0].slug,
        categories: posts[0].categories?.map(cat => ({ title: cat.title, slug: cat.slug, slugType: typeof cat.slug })),
        hasCategories: !!posts[0].categories?.length
      });
    } else {
      console.log('⚠️ Keine Posts geladen - mögliche Query-Probleme');
    }
    
    // Lade alle Seiten für das Grid
    const pages = await client.fetch<PageGridItem[]>(`
      *[_type == "page"] {
        title,
        'slug': slug.current,
        description,
        'mainImage': seo.image {
          'asset': {
            'url': asset->url
          }
        }
      }
    `);
    console.log('📄 Pages geladen:', pages?.length || 0);

    // Lade vollständige Tempel-Daten für die Deutschland-Karte
    const temples = await templeQueries.getAllTemples();
    console.log('🏛️ Temples geladen:', temples?.length || 0);

    // Events, Event-Kategorien, Homepage-Teaser und Homepage-Daten parallel laden
    const [allEvents, eventCategories, homepageTeasers, homepageData] = await Promise.all([
      eventQueries.getAllEvents(),
      getEventCategories(),
      homepageQueries.getAllHomepageTeasers(),
      getHomepage()
    ]);
    console.log('🎪 Parallel Loading - Events:', allEvents?.length || 0, 'Categories:', eventCategories?.length || 0, 'Teasers:', homepageTeasers?.length || 0);

    // Kommende und vergangene Events filtern
    const now = new Date();
    
    // Kommende Events
    const upcomingEvents = allEvents
      .filter(event => new Date(event.startDate) >= now)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .slice(0, 12);

    // Vergangene Events (die letzten 4)
    const pastEvents = allEvents
      .filter(event => new Date(event.startDate) < now)
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
      .slice(0, 4);

    // Featured Events filtern
    const featuredEvents = allEvents
      .filter(event => event.isFeatured && new Date(event.startDate) >= now)
      .slice(0, 6);

    console.log('🎪 Events geladen:', {
      upcomingCount: upcomingEvents?.length || 0,
      pastCount: pastEvents?.length || 0,
      featuredCount: featuredEvents?.length || 0,
      categoriesCount: eventCategories?.length || 0
    });

    // 🔍 DEBUG: Rohdaten von Sanity untersuchen
    console.log('🔍 DEBUG - Erster Post (Rohdaten):', posts[0] ? {
      hasId: '_id' in posts[0],
      _id: posts[0]._id,
      slugType: typeof posts[0].slug,
      slugValue: posts[0].slug,
      categoriesFirstSlugType: posts[0].categories?.[0]?.slug ? typeof posts[0].categories[0].slug : 'keine Kategorien',
      categoriesFirstSlugValue: posts[0].categories?.[0]?.slug,
      fields: Object.keys(posts[0])
    } : 'Keine Posts vorhanden');

    // 🔍 DEBUG: Validierungsfehler genauer untersuchen
    const validatedPosts = posts.map((post, index) => {
      console.log(`🔍 DEBUG - Post ${index}:`, {
        _id: post._id,
        slug: post.slug,
        hasMainImage: !!post.mainImage,
        hasFeaturedImage: !!post.featuredImage,
        hasBody: !!post.body,
        hasContent: !!post.content
      });
      
      const validated = validateProjectedPost(post);
      if (!validated) {
        console.log(`❌ Post ${index} Validierung fehlgeschlagen`);
      }
      return validated;
    });

    return {
      latestPosts: validatedPosts,
      pages: pages.map((page) => ({
        title: page.title || '',
        description: page.description || '',
        slug: page.slug || '',
        mainImage: page.mainImage
      })),
      temples: temples,
      upcomingEvents: upcomingEvents || [],
      pastEvents: pastEvents || [],
      featuredEvents: featuredEvents || [],
      eventCategories: eventCategories || [],
      homepageTeasers: homepageTeasers || [],
      homepage: homepageData
    };
  } catch (error) {
    console.error('Fehler beim Laden der Daten:', error);
    return {
      latestPosts: [],
      pages: [],
      temples: [],
      upcomingEvents: [],
      pastEvents: [],
      featuredEvents: [],
      eventCategories: [],
      homepageTeasers: [],
      homepage: null
    };
  }
};

// Event-Kategorien dynamisch aus Sanity laden - EXAKT WIE IN /events
async function getEventCategories() {
  try {
    // Event-Kategorien Query - genau wie in /events
    const query = `*[_type == "eventCategory" && isActive == true] | order(sortOrder asc) {
      title,
      'slug': slug.current,
      description,
      icon,
      color,
      sortOrder
    }`;
    
    const categories = await client.fetch(query);
    console.log('📋 Homepage Event-Kategorien geladen:', categories.length);
    return categories;
  } catch (error) {
    console.error('❌ Fehler beim Laden der Event-Kategorien:', error);
    return [];
  }
}