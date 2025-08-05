import { getPostBySlug } from '$lib/sanity/queries';
import {
  getPreviousNextPosts,
  getRelatedPosts,
  getLatestPostsForSidebar
} from '$lib/sanity/queries/posts';
import { validateProjectedPost } from '$lib/sanity/queries/validation';
import { error } from '@sveltejs/kit';
import type { SanityPostProjected } from '$lib/types';

export const load = async ({ params }: { params: { slug: string } }) => {
  try {
    const post = await getPostBySlug(params.slug);
    console.log('📝 Raw post data:', post);
    console.log('📝 Post slug structure:', typeof post?.slug, post?.slug);
    
    const validated = validateProjectedPost(post);
    console.log('✅ Validated post:', validated);
    
    if (!validated) {
      throw error(404, 'Post nicht gefunden');
    }
    
    // Initialize default values with proper typing
    let navigationData: { previous: SanityPostProjected | null, next: SanityPostProjected | null } = {
      previous: null,
      next: null
    };
    let relatedPostsData: SanityPostProjected[] = [];
    let latestPostsData: SanityPostProjected[] = [];
    
    // Parallel data fetching with Promise.allSettled for better error handling
    const [navigationResult, relatedResult, latestResult] = await Promise.allSettled([
      // Navigation Posts
      validated.publishedAt && validated._id
        ? getPreviousNextPosts(validated.publishedAt, validated._id)
        : Promise.resolve({ previous: null, next: null }),
      
      // Related Posts
      validated._id
        ? (() => {
            const tags = validated.tags || [];
            const categories = validated.categories?.map(cat => cat.slug) || [];
            const authorSlug = validated.author?.name
              ? validated.author.name.toLowerCase().replace(/\s+/g, '-')
              : undefined;
            return getRelatedPosts(validated._id, tags, categories, authorSlug, 6);
          })()
        : Promise.resolve([]),
      
      // Latest Posts
      getLatestPostsForSidebar(validated._id, 5)
    ]);
    
    // Handle navigation result
    if (navigationResult.status === 'fulfilled') {
      navigationData = navigationResult.value;
      console.log('🔄 Navigation posts:', {
        previous: navigationData.previous?.title,
        next: navigationData.next?.title
      });
    } else {
      console.warn('Failed to load navigation posts:', navigationResult.reason);
    }
    
    // Handle related posts result
    if (relatedResult.status === 'fulfilled') {
      relatedPostsData = relatedResult.value;
      console.log('🔗 Related posts:', relatedPostsData.length);
    } else {
      console.warn('Failed to load related posts:', relatedResult.reason);
    }
    
    // Handle latest posts result
    if (latestResult.status === 'fulfilled') {
      latestPostsData = latestResult.value;
      console.log('📰 Latest posts:', latestPostsData.length);
    } else {
      console.warn('Failed to load latest posts:', latestResult.reason);
    }
    
    return {
      post: validated,
      previousPost: navigationData.previous,
      nextPost: navigationData.next,
      relatedPosts: relatedPostsData,
      latestPosts: latestPostsData
    };
  } catch (err) {
    console.error('Fehler beim Laden des Posts:', err);
    throw error(404, 'Post nicht gefunden');
  }
};