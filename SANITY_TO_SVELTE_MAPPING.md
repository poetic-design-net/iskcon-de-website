# Sanity to Svelte Component Mapping Documentation

This document provides a comprehensive mapping of how Sanity content types are rendered through Svelte components in the ISKCON.DE website.

## Table of Contents
1. [Overview](#overview)
2. [Data Flow Architecture](#data-flow-architecture)
3. [Content Type Mappings](#content-type-mappings)
4. [Query Projections](#query-projections)
5. [Data Transformation Process](#data-transformation-process)

## Overview

The ISKCON.DE website uses a structured approach to map Sanity CMS content to Svelte components:

- **Sanity Schemas** define the content structure
- **Query Projections** shape the data fetched from Sanity
- **TypeScript Types** ensure type safety
- **Server-side Routes** fetch and transform data
- **Svelte Components** render the content

## Data Flow Architecture

```
Sanity Studio → Sanity API → GROQ Queries → Server Routes → Svelte Components
```

1. Content is created in Sanity Studio
2. GROQ queries with projections fetch specific fields
3. Server-side routes (`+page.server.ts`) execute queries
4. Data is passed to Svelte components via the `data` prop
5. Components render the content with proper typing

## Content Type Mappings

### 1. Homepage Content

#### Homepage Teasers
- **Sanity Schema**: `homepageTeaser`
- **Query**: `homepageQueries.getAllHomepageTeasers()`
- **Projection**: `HOMEPAGE_TEASER_PROJECTION`
- **Component**: `ThemeTeaserSection.svelte` → `ThemeTeaser.svelte`
- **Data Flow**:
  ```typescript
  // Sanity fields
  {
    theme: 'hare-krishna' | 'bhakti-yoga' | 'mantra-meditation' | 'tempel-besuchen',
    headline: string,
    teaser: string,
    highlight?: string,
    image: SanityImage,
    badge?: string,
    ctaText?: string,
    ctaLink?: string, // Resolved as ctaLink->slug.current
    layout: 'imageLeft' | 'imageRight' | 'imageFull',
    displayMode?: 'slider' | 'single',
    order?: number
  }
  ```

### 2. Blog Posts

#### Post Listing
- **Sanity Schema**: `post`
- **Query**: `getLatestPosts()`, `getPostsByCategory()`
- **Projection**: `POST_PROJECTION`
- **Component**: `SliderSection.svelte` (homepage), `BlogCard.svelte` (listing)
- **Route**: `/blog/+page.server.ts`

#### Post Detail
- **Query**: `getPostBySlug()`
- **Projection**: `POST_DETAIL_WITH_AUTHOR_PROJECTION`
- **Component**: `/blog/[slug]/+page.svelte`
- **Additional Components**:
  - `BlogPostSidebar.svelte`
  - `PostNavigation.svelte`
  - `PortableText.svelte` (for content rendering)

### 3. Events

#### Event Listing
- **Sanity Schema**: `event`
- **Query**: `eventQueries.getAllEvents()`, `getHomepageEvents()`
- **Projection**: `EVENT_PROJECTION`, `EVENT_CALENDAR_PROJECTION`
- **Components**:
  - `HomepageEventGrid.svelte` (homepage)
  - `EventCard.svelte` (individual cards)
  - `EventCalendar.svelte` (calendar view)
  - `EventFilter.svelte` (filtering)
- **Route**: `/events/+page.server.ts`

#### Event Detail
- **Query**: `getEventBySlug()`
- **Component**: `/events/[slug]/+page.svelte`
- **Modal**: `EventModal.svelte` (quick view)

### 4. Pages (Dynamic)

- **Sanity Schema**: `page` with section references
- **Query**: `getPageBySlug()`
- **Projection**: `PAGE_PROJECTION`
- **Route**: `/[slug]/+page.server.ts`
- **Section Components**:
  - `PageHeroSection.svelte` → `heroSection`
  - `PageMediaSection.svelte` → `mediaSection`
  - `PageQuoteSection.svelte` → `quoteSection`
  - `PageFaqSection.svelte` → `faqSection`
  - `PageGridSection.svelte` → `gridSection`
  - `PageCtaSection.svelte` → `ctaSection`

### 5. Temples

#### Temple Listing
- **Sanity Schema**: `temple`
- **Query**: `templeQueries.getAllTemples()`
- **Projection**: `TEMPLE_PROJECTION`, `TEMPLE_MAP_PROJECTION`
- **Components**:
  - `GermanyMap.svelte` (interactive map)
  - Temple cards in grid layout
- **Route**: `/tempel/+page.server.ts`

#### Temple Detail
- **Query**: `templeQueries.getAllTemples()` + filtering
- **Component**: `/tempel/[slug]/+page.svelte`

### 6. Literature

- **Sanity Schema**: `literature`, `chapter`, `verse`
- **Queries**: 
  - `getAllLiterature()`
  - `getBookBySlug()`
  - `getChapterBySlug()`
  - `getVerseBySlug()`
- **Projections**:
  - `LITERATURE_BASE_PROJECTION`
  - `LITERATURE_DETAIL_PROJECTION`
  - `LITERATURE_CHAPTER_PROJECTION`
  - `LITERATURE_VERSE_PROJECTION`
- **Routes**: `/literature/+page.server.ts`, `/literature/[slug]/+page.server.ts`

### 7. Movement (Bewegung)

- **Sanity Schema**: `movementPage`, `movementPrinciple`, `movementTimeline`
- **Query**: `bewegungQueries.getMovementData()`
- **Components**:
  - `PrincipleCard.svelte`
  - `Timeline.svelte`
  - `TimelineItem.svelte`
- **Route**: `/bewegung/+page.server.ts`

## Query Projections

Projections define which fields are fetched from Sanity and how they're structured:

### Key Projections:

1. **IMAGE_PROJECTION**:
   ```groq
   {
     'asset': {
       'url': asset->url,
       'altText': asset->altText
     },
     'hotspot': hotspot
   }
   ```

2. **SEO_PROJECTION**:
   ```groq
   {
     title,
     description,
     'image': image ${IMAGE_PROJECTION}
   }
   ```

3. **Reference Resolution**:
   - Categories: `categories[]-> { title, 'slug': slug.current }`
   - Authors: `author-> { name, 'slug': slug.current, bio, image }`
   - Temples: `temple-> { name, 'slug': slug.current, address, location }`

## Data Transformation Process

### 1. Server-Side Loading
```typescript
// Example: Homepage data loading
export const load = async () => {
  // Parallel data fetching
  const [posts, pages, temples, events] = await Promise.all([
    getLatestPosts(),
    client.fetch(pagesQuery),
    templeQueries.getAllTemples(),
    eventQueries.getAllEvents()
  ]);
  
  // Data transformation
  const validatedPosts = posts.map(post => validateProjectedPost(post));
  
  // Return typed data
  return {
    latestPosts: validatedPosts,
    pages,
    temples,
    upcomingEvents: filterUpcomingEvents(events)
  };
};
```

### 2. Component Data Reception
```svelte
<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
  
  // Destructure with type safety
  const { latestPosts, pages, temples } = data;
</script>
```

### 3. Portable Text Rendering
- Rich text content uses `PortableText.svelte`
- Handles blocks, marks, and custom components
- Supports embedded images, links, and formatting

### 4. Image Handling
- All images use `SanityImage.svelte` component
- Supports hotspot, responsive sizing, and lazy loading
- Automatically generates optimized URLs

## Best Practices

1. **Type Safety**: Always use TypeScript types matching projections
2. **Error Handling**: Implement try-catch in server routes
3. **Validation**: Use validation functions for critical data
4. **Performance**: Use specific projections to fetch only needed fields
5. **Caching**: Leverage SvelteKit's caching capabilities
6. **SEO**: Extract SEO data from Sanity and apply in components

## Component Hierarchy

```
Homepage (+page.svelte)
├── Hero.svelte
├── HomepageEventGrid.svelte
│   └── EventCard.svelte
├── SliderSection.svelte
│   └── BlogCard.svelte
├── GermanyMap.svelte
└── ThemeTeaserSection.svelte
    ├── ThemeTeaser.svelte
    └── SimpleThemeTeaserSlider.svelte

Dynamic Page ([slug]/+page.svelte)
├── PageHeroSection.svelte
├── PageMediaSection.svelte
├── PageQuoteSection.svelte
├── PageFaqSection.svelte
├── PageGridSection.svelte
└── PageCtaSection.svelte
```

## Debugging Tips

1. Check GROQ query projections match TypeScript types
2. Verify slug resolution (slug.current vs slug object)
3. Ensure references are properly resolved with `->`
4. Use console.log in server routes to inspect raw data
5. Check for null/undefined in optional fields