# 📋 Blog-Detail-Seite Enhancement Plan

## 🎯 Überblick

Umfassende Erweiterung der Blog-Detail-Seite (`src/routes/posts/[slug]/+page.svelte`) mit erweiterten Navigationsfunktionen, Content-Enhancement und Social-Features.

## 🚀 Phase 1: Kern-Navigation & Sidebar (Höchste Priorität)

### 1.1 Neue Sanity-Queries implementieren

**Erweiterte Query-Funktionen in `src/lib/sanity/queries/posts.ts`:**

```typescript
// Ähnliche Posts basierend auf Tags/Kategorien
export async function getRelatedPostsByTags(
  currentPostId: string, 
  tags: string[], 
  categories: string[], 
  limit = 4
): Promise<SanityPostProjected[]>

// Vorherige/Nächste Posts in chronologischer Reihenfolge
export async function getPreviousNextPosts(
  currentSlug: string, 
  publishedAt: string
): Promise<{
  previous: SanityPostProjected | null,
  next: SanityPostProjected | null
}>

// Neueste Posts ohne aktuellen Post
export async function getLatestPostsExcluding(
  excludeId: string, 
  limit = 3
): Promise<SanityPostProjected[]>

// Autor-Informationen erweitert
export async function getAuthorDetails(
  authorId: string
): Promise<AuthorDetails>
```

### 1.2 Komponenten-Architektur

```
src/lib/components/blog/
├── sidebar/
│   ├── BlogPostSidebar.svelte        # Haupt-Sidebar-Container
│   ├── RelatedPosts.svelte           # Ähnliche Beiträge (4-5 Posts)
│   ├── LatestPosts.svelte            # Neueste Beiträge (3-4 Posts)
│   ├── AuthorBox.svelte              # Autor-Informationen mit Bild/Bio
│   └── TagCloud.svelte               # Klickbare Tag-Links
├── navigation/
│   └── PostNavigation.svelte         # Vorherige/Nächste Navigation
└── index.ts                          # Updated exports
```

**BlogPostSidebar.svelte - Haupt-Container:**
```svelte
<aside class="space-y-8">
  <RelatedPosts {relatedPosts} />
  <LatestPosts {latestPosts} />
  <AuthorBox {author} />
  <TagCloud {tags} />
</aside>
```

### 1.3 Responsive Layout-Struktur

**Desktop (≥1024px):**
```html
<div class="container mx-auto px-4 pt-32 py-12">
  <div class="grid grid-cols-12 gap-8">
    <article class="col-span-8">
      <!-- Artikel Content -->
    </article>
    <aside class="col-span-4">
      <BlogPostSidebar />
    </aside>
  </div>
</div>
```

**Mobile (<768px):**
```html
<div class="container mx-auto px-4 pt-32 py-12">
  <article class="mb-12">
    <!-- Artikel Content -->
  </article>
  <aside>
    <BlogPostSidebar />
  </aside>
</div>
```

### 1.4 Server-Side Änderungen

**`src/routes/posts/[slug]/+page.server.ts` erweitern:**
```typescript
export const load = async ({ params }) => {
  try {
    const post = await getPostBySlug(params.slug);
    
    const [relatedPosts, previousNext, latestPosts] = await Promise.all([
      getRelatedPostsByTags(post._id, post.tags || [], post.categories?.map(c => c.slug) || [], 4),
      getPreviousNextPosts(params.slug, post.publishedAt || ''),
      getLatestPostsExcluding(post._id, 3)
    ]);
    
    return {
      post: validateProjectedPost(post),
      relatedPosts,
      previousNext,
      latestPosts
    };
  } catch (err) {
    throw error(404, 'Post nicht gefunden');
  }
};
```

## 🎯 Phase 2: Content Enhancement Features

### 2.1 Inhaltsverzeichnis (Table of Contents)

**`TableOfContents.svelte`:**
- Automatische H2/H3 Erkennung
- Sticky Navigation
- Scroll-Spy für aktive Section
- Smooth Scroll zu Sections

### 2.2 Lesefortschritt & Meta-Informationen

**`ReadingProgress.svelte`:**
- Progress Bar am oberen Bildschirmrand
- Scroll-Position tracking
- Geschätzte Lesezeit im Header

**Breadcrumb Navigation:**
```html
<nav class="mb-8">
  <ol class="flex items-center space-x-2 text-sm text-muted-foreground">
    <li><a href="/">Home</a></li>
    <li>></li>
    <li><a href="/posts">Blog</a></li>
    <li>></li>
    <li><a href="/posts?category={category}">{category}</a></li>
    <li>></li>
    <li class="text-foreground">{post.title}</li>
  </ol>
</nav>
```

## 🎯 Phase 3: Social & Sharing Features

### 3.1 Social Share Buttons

**`SocialShare.svelte`:**
```typescript
const shareData = {
  title: post.title,
  url: `${$page.url.origin}/posts/${post.slug}`,
  text: post.excerpt
};

const platforms = [
  { name: 'Twitter', icon: 'mdi:twitter', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}` },
  { name: 'Facebook', icon: 'mdi:facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}` },
  { name: 'LinkedIn', icon: 'mdi:linkedin', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}` },
  { name: 'WhatsApp', icon: 'mdi:whatsapp', url: `https://wa.me/?text=${encodeURIComponent(shareData.text + ' ' + shareData.url)}` },
  { name: 'Email', icon: 'mdi:email', url: `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(shareData.text + '\n\n' + shareData.url)}` }
];
```

### 3.2 Zusätzliche UX Features

**`BackToTop.svelte`:**
- Erscheint nach 300px Scroll
- Smooth scroll to top
- Fade in/out Animation

## 🎯 Phase 4: Technical Enhancements

### 4.1 SEO-Optimierungen

**JSON-LD Schema für Artikel:**
```typescript
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": post.title,
  "description": post.excerpt,
  "image": post.featuredImage?.asset?.url,
  "datePublished": post.publishedAt,
  "dateModified": post._updatedAt,
  "author": {
    "@type": "Person",
    "name": post.author?.name
  },
  "publisher": {
    "@type": "Organization",
    "name": "ISKCON Deutschland"
  }
};
```

### 4.2 Performance-Optimierungen

**Lazy Loading Strategy:**
```typescript
// Sidebar-Komponenten erst laden wenn sichtbar
import { onMount } from 'svelte';
import { inview } from 'svelte-inview';

let sidebarVisible = false;
</script>

<div use:inview={{}} on:inview_enter={() => sidebarVisible = true}>
  {#if sidebarVisible}
    <BlogPostSidebar />
  {:else}
    <BlogSidebarSkeleton />
  {/if}
</div>
```

### 4.3 Caching-Strategy

**Related Posts Caching:**
```typescript
// 5-Minuten Cache für Related Posts
const CACHE_DURATION = 5 * 60 * 1000; // 5 Minuten
const relatedPostsCache = new Map();

export async function getCachedRelatedPosts(postId: string, tags: string[]) {
  const cacheKey = `${postId}-${tags.join('-')}`;
  const cached = relatedPostsCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  const data = await getRelatedPostsByTags(postId, tags);
  relatedPostsCache.set(cacheKey, { data, timestamp: Date.now() });
  
  return data;
}
```

## 📱 Responsive Design Details

### Desktop Layout (≥1024px)
- **Artikel:** 66% Breite (8/12 Grid)
- **Sidebar:** 33% Breite (4/12 Grid)
- **Sidebar:** Sticky ab 100px Scroll

### Tablet Layout (768px - 1023px)
- **Artikel:** 70% Breite
- **Sidebar:** 30% Breite
- **Sidebar:** Normal scroll

### Mobile Layout (<768px)
- **Single-Column:** 100% Breite
- **Sidebar unten:** Collapsible Sections
- **Navigation:** Horizontal Scroll

## 🎨 Design-System Integration

**Farbschema:**
- Primary: `spiritual-saffron-500`
- Cards: `bg-card` mit `shadow-lg`
- Text: `text-foreground` / `text-muted-foreground`
- Hover: `hover:shadow-2xl` + `hover:-translate-y-1`

**Komponenten:**
- Card-System aus `$lib/components/ui/card`
- Badge-System aus `$lib/components/ui/badge`
- Button-System aus `$lib/components/ui/button`
- Icons aus `@iconify/svelte`

## ♿ Accessibility Features

**ARIA Labels:**
```html
<nav aria-label="Beitrags-Navigation">
  <a href="/posts/{previousPost.slug}" aria-label="Vorheriger Beitrag: {previousPost.title}">
    <span aria-hidden="true">←</span>
    Vorheriger Beitrag
  </a>
</nav>
```

**Keyboard Navigation:**
- Tab-Navigation für alle interaktiven Elemente
- Enter/Space für Button-Aktivierung
- Escape für Modal-Schließung

**Screen Reader Support:**
- Semantische HTML-Struktur
- Alt-Texte für alle Bilder
- Heading-Hierarchie (H1 → H2 → H3)

## 🔍 SEO Checkliste

- [ ] JSON-LD Schema implementiert
- [ ] Open Graph Meta-Tags
- [ ] Twitter Card Meta-Tags
- [ ] Canonical URLs
- [ ] Alt-Texte für alle Bilder
- [ ] Heading-Hierarchie korrekt
- [ ] Internal Linking optimiert
- [ ] Page Speed optimiert

## 📊 Performance Checkliste

- [ ] Code-Splitting für Sidebar
- [ ] Image Lazy Loading
- [ ] WebP Format für Bilder
- [ ] Bundle-Size Analysis
- [ ] Tree-Shaking optimiert
- [ ] Caching implementiert
- [ ] Core Web Vitals optimiert

## 🧪 Testing Strategy

**Unit Tests:**
- Komponenten-Rendering
- Query-Funktionen
- Utility-Funktionen

**Integration Tests:**
- Sidebar-Navigation
- Post-Navigation
- Responsive Layout

**E2E Tests:**
- Vollständiger User-Flow
- Cross-Browser Testing
- Performance Testing

## 🚀 Deployment Plan

**Phase 1 Rollout:**
1. Sidebar-Komponenten entwickeln
2. Navigation implementieren
3. Responsive Layout testen
4. Performance optimieren
5. Production Deployment

**Monitoring:**
- Core Web Vitals tracking
- User Engagement metrics
- Error monitoring
- Performance monitoring

---

**Nächste Schritte:** Switch zu Code-Modus für Implementierung von Phase 1