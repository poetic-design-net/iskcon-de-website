import {
  getFeaturedPost,
  getRegularPosts,
  searchPosts,
  getCategories
} from '$lib/sanity/queries';
import { getAllTags } from '$lib/sanity/queries/posts';
import { validateProjectedPost } from '$lib/sanity/queries/validation';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  try {
    // URL Parameters für Search/Filter
    const searchQuery = url.searchParams.get('search') || undefined;
    const category = url.searchParams.get('category') || undefined;
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '9');
    
    // Berechne Offset für Pagination
    const offset = (page - 1) * limit;

    // Parallel Loading für bessere Performance
    const [featuredPost, regularPosts, categories, tags] = await Promise.all([
      // Featured Post nur laden wenn keine Filter aktiv sind
      (!searchQuery && !category) ? getFeaturedPost() : Promise.resolve(null),
      
      // Regular Posts oder Search Results
      searchQuery || category
        ? searchPosts(searchQuery, category)
        : getRegularPosts(limit, offset),
      
      // Kategorien für Filter-Dropdown
      getCategories(),
      
      // Tags für Filter-Dropdown
      getAllTags()
    ]);

    // Validierung der Daten
    const validatedRegularPosts = regularPosts.map(validateProjectedPost).filter(Boolean);
    const validatedFeaturedPost = featuredPost ? validateProjectedPost(featuredPost) : null;

    // Meta-Information für Frontend
    const totalRegularPosts = validatedRegularPosts.length;
    const hasMorePosts = totalRegularPosts === limit; // Einfache Heuristik
    const isFiltered = !!(searchQuery || category);

    return {
      // Haupt-Daten
      featuredPost: validatedFeaturedPost,
      posts: validatedRegularPosts,
      categories,
      tags,
      
      // Pagination & Filter State
      pagination: {
        currentPage: page,
        limit,
        hasMore: hasMorePosts,
        total: totalRegularPosts
      },
      
      // Filter State
      filters: {
        searchQuery,
        category,
        isFiltered
      },
      
      // Meta-Daten
      meta: {
        title: isFiltered 
          ? `Blog-Posts${searchQuery ? ` - "${searchQuery}"` : ''}${category ? ` - ${category}` : ''}`
          : 'Blog-Posts - ISKCON Deutschland',
        description: isFiltered
          ? `Gefilterte Blog-Posts auf ISKCON Deutschland`
          : 'Entdecke spirituelle Weisheit und Inspiration in unseren Blog-Posts über Bhakti-Yoga, Krishna-Bewusstsein und vedische Philosophie.',
        totalPosts: totalRegularPosts + (validatedFeaturedPost ? 1 : 0)
      }
    };
    
  } catch (error) {
    console.error('Fehler beim Laden der Blog-Posts:', error);
    
    // Fallback-Daten bei Fehlern
    return {
      featuredPost: null,
      posts: [],
      categories: [],
      tags: [],
      pagination: {
        currentPage: 1,
        limit: 9,
        hasMore: false,
        total: 0
      },
      filters: {
        searchQuery: undefined,
        category: undefined,
        isFiltered: false
      },
      meta: {
        title: 'Blog-Posts - ISKCON Deutschland',
        description: 'Blog-Posts konnten nicht geladen werden.',
        totalPosts: 0
      },
      error: 'Posts konnten nicht geladen werden. Bitte versuche es später erneut.'
    };
  }
};