// Post-spezifische Queries und Validierungen
import type { SanityPost, SanityPostProjected } from '$lib/types';
import { client } from '../client';
import {
  POST_PROJECTION,
  POST_COMPACT_PROJECTION,
  POST_RELATED_PROJECTION,
  POST_NAVIGATION_PROJECTION,
  POST_DETAIL_WITH_AUTHOR_PROJECTION,
  AUTHOR_DETAIL_PROJECTION
} from './projections';

// Query Funktionen
export async function getLatestPosts(limit = 6): Promise<SanityPostProjected[]> {
  return client.fetch<SanityPostProjected[]>(
    `*[_type == "post"] | order(publishedAt desc)[0...${limit}] ${POST_PROJECTION}`
  );
}

export async function getAllPosts(): Promise<SanityPostProjected[]> {
  return client.fetch<SanityPostProjected[]>(
    `*[_type == "post"] | order(publishedAt desc) ${POST_PROJECTION}`
  );
}

export async function getPostBySlug(slug: string): Promise<SanityPost> {
  const post = await client.fetch<SanityPost>(
    `*[_type == "post" && slug.current == $slug][0] ${POST_DETAIL_WITH_AUTHOR_PROJECTION}`,
    { slug }
  );
  
  if (!post) {
    throw new Error('Post nicht gefunden');
  }
  
  return post;
}

// Featured Post Query
export async function getFeaturedPost(): Promise<SanityPostProjected | null> {
  return client.fetch<SanityPostProjected | null>(
    `*[_type == "post" && isFeatured == true && !(_id in path("drafts.**"))] | order(publishedAt desc)[0] ${POST_PROJECTION}`
  );
}

// Regular Posts mit Pagination (ohne Featured Posts)
export async function getRegularPosts(limit: number, offset: number): Promise<SanityPostProjected[]> {
  const end = offset + limit;
  return client.fetch<SanityPostProjected[]>(
    `*[_type == "post" && isFeatured != true && !(_id in path("drafts.**"))] | order(publishedAt desc)[$offset...$end] ${POST_PROJECTION}`,
    { offset, end }
  );
}

// Such- und Filter-Funktionalität
export async function searchPosts(searchQuery?: string, category?: string): Promise<SanityPostProjected[]> {
  let filter = '_type == "post" && !(_id in path("drafts.**"))';
  
  if (searchQuery) {
    filter += ` && (title match $searchQuery || description match $searchQuery || pt::text(body) match $searchQuery)`;
  }
  
  if (category) {
    filter += ` && $category in categories[]->slug.current`;
  }
  
  const query = `*[${filter}] | order(publishedAt desc) ${POST_PROJECTION}`;
  
  const params: Record<string, string> = {};
  if (searchQuery) {
    params.searchQuery = `*${searchQuery}*`;
  }
  if (category) {
    params.category = category;
  }
  
  return client.fetch<SanityPostProjected[]>(query, params);
}

// Kategorien für Filter-Dropdown
export async function getCategories(): Promise<Array<{slug: string, title: string}>> {
  return client.fetch<Array<{slug: string, title: string}>>(
    `*[_type == "category"] | order(title asc) {
      "slug": slug.current,
      title
    }`
  );
}

// Tags für Filter-Dropdown (alle eindeutigen Tags aus allen Posts)
export async function getAllTags(): Promise<string[]> {
  return client.fetch<string[]>(
    `array::unique(*[_type == "post" && defined(tags) && count(tags) > 0].tags[])`
  );
}

// Datenvalidierung erfolgt über validation.ts

// === Blog-Detail-Enhancement Funktionen ===

// Get a single post by slug with extended author details
export async function getPostBySlugWithAuthorDetails(slug: string): Promise<SanityPost> {
  const post = await client.fetch<SanityPost>(
    `*[_type == "post" && slug.current == $slug][0] ${POST_DETAIL_WITH_AUTHOR_PROJECTION}`,
    { slug }
  );
  
  if (!post) {
    throw new Error('Post nicht gefunden');
  }
  
  return post;
}

// Get related posts based on tags, categories, and author
// Get related posts based on tags, categories, and author
export async function getRelatedPosts(
  postId: string,
  tags: string[] = [],
  categories: string[] = [],
  authorSlug?: string,
  limit = 6
): Promise<SanityPostProjected[]> {
  const params: Record<string, string | number | string[]> = {
    postId,
    limit
  };

  // Base filter: exclude current post and drafts
  const baseFilter = `_type == "post" && _id != $postId && !(_id in path("drafts.**"))`;

  // Build scoring based priority system
  const scoringConditions = [];
  const filterConditions = [];
  
  if (tags.length > 0) {
    params.tags = tags;
    scoringConditions.push(`count(tags[] in $tags) * 3`); // Tags have highest priority
    filterConditions.push('count(tags[] in $tags) > 0');
  }
  
  if (categories.length > 0) {
    params.categories = categories;
    scoringConditions.push(`count(categories[]->slug.current in $categories) * 2`); // Categories have medium priority
    filterConditions.push('count(categories[]->slug.current in $categories) > 0');
  }
  
  if (authorSlug) {
    params.authorSlug = authorSlug;
    scoringConditions.push(`select(author->slug.current == $authorSlug => 1, 0)`); // Author has lowest priority
    filterConditions.push('author->slug.current == $authorSlug');
  }

  let query;
  
  if (scoringConditions.length > 0) {
    // Build query with scoring - use proper GROQ syntax
    const fullFilter = `${baseFilter} && (${filterConditions.join(' || ')})`;
    const scoringExpression = scoringConditions.join(' + ');
    
    query = `*[${fullFilter}] | {
      ...,
      "_score": ${scoringExpression}
    } | order(_score desc, publishedAt desc)[0...$limit] ${POST_RELATED_PROJECTION}`;
  } else {
    // Fallback: get latest posts if no criteria provided
    query = `*[${baseFilter}] | order(publishedAt desc)[0...$limit] ${POST_RELATED_PROJECTION}`;
  }

  console.log('🔍 [DEBUG] getRelatedPosts Query:', query);
  console.log('🔍 [DEBUG] getRelatedPosts Params:', params);
  console.log('🔍 [DEBUG] getRelatedPosts Input - postId:', postId, 'tags:', tags, 'categories:', categories, 'authorSlug:', authorSlug);
  
  const result = await client.fetch<SanityPostProjected[]>(query, params);
  console.log('🔍 [DEBUG] getRelatedPosts Result:', result);
  console.log('🔍 [DEBUG] getRelatedPosts Result Length:', result?.length || 0);

  return result;
}
// Get previous and next posts based on publication date
export async function getPreviousNextPosts(publishedAt: string, currentPostId: string) {
  console.log('🔍 [DEBUG] getPreviousNextPosts Input:', { publishedAt, currentPostId });
  
  const params = { publishedAt, currentPostId };
  
  // Get previous post (older)
  const previousQuery = `*[_type == "post" && _id != $currentPostId && !(_id in path("drafts.**")) && publishedAt < $publishedAt]
    | order(publishedAt desc)[0] ${POST_NAVIGATION_PROJECTION}`;
  
  // Get next post (newer)
  const nextQuery = `*[_type == "post" && _id != $currentPostId && !(_id in path("drafts.**")) && publishedAt > $publishedAt]
    | order(publishedAt asc)[0] ${POST_NAVIGATION_PROJECTION}`;

  console.log('🔍 [DEBUG] getPreviousNextPosts Previous Query:', previousQuery);
  console.log('🔍 [DEBUG] getPreviousNextPosts Next Query:', nextQuery);
  console.log('🔍 [DEBUG] getPreviousNextPosts Params:', params);

  const [previous, next] = await Promise.all([
    client.fetch(previousQuery, params),
    client.fetch(nextQuery, params)
  ]);

  console.log('🔍 [DEBUG] getPreviousNextPosts Results:', { previous, next });

  return { previous, next };
}

// Get latest posts for sidebar (compact version, excluding current post)
export async function getLatestPostsForSidebar(excludePostId?: string, limit = 5): Promise<SanityPostProjected[]> {
  const params: Record<string, string | number> = { limit };
  
  // Build filter conditions correctly inside brackets
  let filterConditions = `_type == "post" && !(_id in path("drafts.**"))`;
  
  if (excludePostId) {
    filterConditions += ` && _id != $excludePostId`;
    params.excludePostId = excludePostId;
  }
  
  const query = `*[${filterConditions}] | order(publishedAt desc)[0...$limit] ${POST_COMPACT_PROJECTION}`;
  
  console.log('🔍 [DEBUG] getLatestPostsForSidebar Query:', query);
  console.log('🔍 [DEBUG] getLatestPostsForSidebar Params:', params);
  
  const result = await client.fetch<SanityPostProjected[]>(query, params);
  console.log('🔍 [DEBUG] getLatestPostsForSidebar Result:', result);
  console.log('🔍 [DEBUG] getLatestPostsForSidebar Result Length:', result?.length || 0);
  
  return result;
}

// Get author details by slug
export async function getAuthorBySlug(slug: string) {
  const query = `*[_type == "author" && slug.current == $slug][0] ${AUTHOR_DETAIL_PROJECTION}`;
  
  console.log('🔍 [DEBUG] getAuthorBySlug Query:', query);
  console.log('🔍 [DEBUG] getAuthorBySlug Slug:', slug);
  
  const result = await client.fetch(query, { slug });
  console.log('🔍 [DEBUG] getAuthorBySlug Result:', result);
  
  return result;
}

// Get author details by ID
export async function getAuthorById(authorId: string) {
  const query = `*[_type == "author" && _id == $authorId][0] ${AUTHOR_DETAIL_PROJECTION}`;
  return await client.fetch(query, { authorId });
}