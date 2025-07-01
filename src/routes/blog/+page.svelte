<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { BlogGrid, FeaturedBlogCard, BlogSearchFilter, BlogSkeleton } from '$lib/components/blog';
	import type { SanityCategory } from '$lib/types';
	import type { PageData } from './$types';
	
	export let data: PageData;
	
		// 🔍 DEBUG: Server-Daten prüfen
		console.log('🔍 [DEBUG] Blog page data:', data);
		console.log('🔍 [DEBUG] Available tags:', (data as any).tags || 'MISSING - MUSS IMPLEMENTIERT WERDEN');
		console.log('🔍 [DEBUG] Categories:', data.categories);
		console.log('🔍 [DEBUG] Posts with tags:', data.posts?.filter(p => p).map(p => ({ title: p?.title, tags: p?.tags })));
		
		// State für Filter und Pagination
	let searchQuery: string = data.filters?.searchQuery || '';
	let selectedCategory: SanityCategory | null = null;
	let currentPage: number = data.pagination?.currentPage || 1;
	let loading: boolean = false;

	// Initialize selectedCategory from server data
	$: if (data.categories && data.filters?.category) {
		selectedCategory = data.categories.find(cat => cat.slug === data.filters?.category) || null;
	}
	
	// Debounced search function
	let searchTimeout: ReturnType<typeof setTimeout>;
	
	// Initialize from URL parameters
	onMount(() => {
		if (browser) {
			const urlParams = new URLSearchParams($page.url.searchParams);
			searchQuery = urlParams.get('search') || '';
			const categorySlug = urlParams.get('category') || '';
			if (categorySlug && data.categories) {
				selectedCategory = data.categories.find(cat => cat.slug === categorySlug) || null;
			}
			currentPage = parseInt(urlParams.get('page') || '1');
		}
	});
	
	// Event-Handler für Search Filter
	function handleSearch(event: { query: string }) {
		console.log('🔍 [PARENT DEBUG] handleSearch called:', event);
		searchQuery = event.query;
		currentPage = 1;
		console.log('🔍 [PARENT DEBUG] Updated searchQuery:', searchQuery);
		updateURL();
		applyFilters();
	}

	function handleCategoryFilter(event: { category: SanityCategory | null }) {
		console.log('🔍 [PARENT DEBUG] handleCategoryFilter called:', event);
		selectedCategory = event.category;
		currentPage = 1;
		console.log('🔍 [PARENT DEBUG] Updated selectedCategory:', selectedCategory);
		updateURL();
		applyFilters();
	}
	
	// Handle pagination
	function handlePageChange(page: number) {
		currentPage = page;
		updateURL();
		applyFilters();
	}
	
	// Update URL with current filters
	function updateURL() {
		if (!browser) return;
		
		const params = new URLSearchParams();
		if (searchQuery) params.set('search', searchQuery);
		if (selectedCategory) params.set('category', selectedCategory.slug);
		if (currentPage > 1) params.set('page', currentPage.toString());
		
		const url = params.toString() ? `/blog?${params.toString()}` : '/blog';
		goto(url, { replaceState: true, noScroll: true });
	}
	
	// Debounced search to avoid too many requests
	function debounceSearch() {
		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(() => {
			applyFilters();
		}, 300);
	}
	
	// Client-side filtering - kein Server-Request nötig!
	function applyFilters() {
		console.log('🔍 [PARENT DEBUG] applyFilters called with:', { searchQuery, selectedCategory, currentPage });
		// Filtering wird durch reactive statements unten gemacht
		loading = false; // Kein Loading nötig da alles lokal passiert
	}

	// ✨ REACTIVE FILTERING - Client-side filtering der Posts
	$: filteredPosts = (() => {
		let posts = data.posts || [];
		console.log('🔍 [FILTER DEBUG] Starting with posts:', posts.length);
		// Null-check: Nur mit existierenden Posts arbeiten
		posts = posts.filter(post => post != null);
		
		// Text-Suche
		if (searchQuery && searchQuery.trim().length > 0) {
			const query = searchQuery.toLowerCase().trim();
			posts = posts.filter(post =>
				post?.title?.toLowerCase().includes(query) ||
				post?.excerpt?.toLowerCase().includes(query) ||
				post?.tags?.some(tag => tag.toLowerCase().includes(query))
			);
			console.log('🔍 [FILTER DEBUG] After search filter:', posts.length);
		}
		
		// Kategorie-Filter
		if (selectedCategory) {
			posts = posts.filter(post =>
				post?.categories?.some(cat => cat.slug === selectedCategory?.slug)
			);
			console.log('🔍 [FILTER DEBUG] After category filter:', posts.length);
		}
		
		
		console.log('🔍 [FILTER DEBUG] Final filtered posts:', posts.length);
		return posts;
	})();

	// Pagination für gefilterte Posts
	$: paginatedPosts = (() => {
		const limit = data.pagination?.limit || 9;
		const startIndex = (currentPage - 1) * limit;
		const endIndex = startIndex + limit;
		return filteredPosts.slice(startIndex, endIndex);
	})();

	// Update pagination info basierend auf gefilterten Daten
	$: filteredPagination = {
		currentPage,
		limit: data.pagination?.limit || 9,
		total: filteredPosts.length,
		hasMore: filteredPosts.length > currentPage * (data.pagination?.limit || 9)
	};
	
	// Meta tags für SEO
	$: metaTitle = searchQuery 
		? `Blog-Suche: "${searchQuery}" | ISKCON Deutschland`
		: selectedCategory 
			? `Blog-Kategorie: ${selectedCategory.title} | ISKCON Deutschland`
			: 'Blog | ISKCON Deutschland';

	$: metaDescription = searchQuery
		? `Suchergebnisse für "${searchQuery}" in unserem Blog über Spiritualität, Bhakti-Yoga und Krishna-Bewusstsein.`
		: selectedCategory
			? `Artikel aus der Kategorie "${selectedCategory.title}" - Spirituelle Lehren und Weisheiten.`
			: 'Entdecken Sie spirituelle Artikel über Bhakti-Yoga, Krishna-Bewusstsein und vedische Weisheit im ISKCON Deutschland Blog.';

	// Computed values for pagination
	$: totalPages = data.pagination ? Math.ceil(data.pagination.total / data.pagination.limit) : 1;
	$: hasFilters = searchQuery.length > 0 || selectedCategory !== null;
</script>

<svelte:head>
	<title>{metaTitle}</title>
	<meta name="description" content={metaDescription} />
	<meta property="og:title" content={metaTitle} />
	<meta property="og:description" content={metaDescription} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={metaTitle} />
	<meta name="twitter:description" content={metaDescription} />
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-orange-50 to-white">
	<!-- Header Section -->
	<div class="bg-gradient-to-r from-orange-600 to-red-600 text-white">
		<div class="container mx-auto px-4 py-16">
			<div class="text-center">
				<h1 class="text-4xl md:text-5xl font-medium mb-4">
					Spiritueller Blog
				</h1>
				<p class="text-xl md:text-2xl mb-8 text-orange-100">
					Entdecken Sie spirituelle Weisheiten und Lehren des Bhakti-Yoga
				</p>
				<div class="flex flex-wrap justify-center gap-4 text-sm">
					{#each data.tags as tag}
						<span class="bg-white/20 px-3 py-1 rounded-full">{tag}</span>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- Main Content -->
	<div class="container mx-auto px-4 py-12">
		<!-- Search and Filter Section -->
		<div class="mb-12">
			<BlogSearchFilter
				{searchQuery}
				{selectedCategory}
				categories={data.categories || []}
				on:search={(e) => handleSearch(e.detail)}
				on:categoryFilter={(e) => handleCategoryFilter(e.detail)}
			/>
		</div>

		<!-- Featured Post Section -->
		{#if data.featuredPost && !hasFilters && currentPage === 1}
			{@const featuredPostWithDescription = {
				...data.featuredPost,
				description: data.featuredPost.excerpt || data.featuredPost.title,
				publishedAt: data.featuredPost.publishedAt || new Date().toISOString()
			}}
			<div class="mb-16">
				<h2 class="text-2xl font-medium mb-6 text-center text-gray-800">
					✨ Empfohlener Artikel
				</h2>
				<!-- Horizontal Featured Card Layout -->
				<div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
					<div class="md:flex">
						<!-- Image Section (40% width on desktop) -->
						<div class="md:w-2/5">
							{#if featuredPostWithDescription.featuredImage?.asset?.url}
								<a href="/blog/{featuredPostWithDescription.slug}" class="block h-full">
									<div class="h-64 md:h-full overflow-hidden">
										<img
											src={featuredPostWithDescription.featuredImage.asset.url}
											alt={featuredPostWithDescription.title}
											class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
										/>
									</div>
								</a>
							{:else}
								<a href="/blog/{featuredPostWithDescription.slug}" class="block h-full">
									<div class="h-64 md:h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
										<div class="text-center text-orange-400">
											<svg class="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
												<path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
											</svg>
											<p class="text-sm">Kein Bild</p>
										</div>
									</div>
								</a>
							{/if}
						</div>
						
						<!-- Content Section (60% width on desktop) -->
						<div class="md:w-3/5 p-8">
							<!-- Categories -->
							{#if featuredPostWithDescription.categories && featuredPostWithDescription.categories.length > 0}
								<div class="flex flex-wrap gap-2 mb-4">
									{#each featuredPostWithDescription.categories as category}
										<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
											{category.title}
										</span>
									{/each}
								</div>
							{/if}
							
							<!-- Title -->
							<h3 class="text-2xl md:text-3xl font-medium text-gray-900 mb-3 leading-tight">
								<a
									href="/blog/{featuredPostWithDescription.slug}"
									class="hover:text-orange-600 transition-colors duration-200"
								>
									{featuredPostWithDescription.title}
								</a>
							</h3>
							
							<!-- Date -->
							{#if featuredPostWithDescription.publishedAt}
								<div class="flex items-center text-gray-500 text-sm mb-4">
									<svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
										<path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
									</svg>
									{new Date(featuredPostWithDescription.publishedAt).toLocaleDateString('de-DE', {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								</div>
							{/if}
							
							<!-- Excerpt -->
							{#if featuredPostWithDescription.excerpt}
								<p class="text-gray-600 text-base leading-relaxed mb-6 line-clamp-3">
									{featuredPostWithDescription.excerpt.length > 200
										? featuredPostWithDescription.excerpt.substring(0, 200) + '...'
										: featuredPostWithDescription.excerpt}
								</p>
							{/if}
							
							<!-- Read More Button -->
							<a
								href="/blog/{featuredPostWithDescription.slug}"
								class="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors duration-200 group"
							>
								<span class="mr-2">Artikel lesen</span>
								<svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
								</svg>
							</a>
						</div>
					</div>
				</div>
			</div>
		{/if}

		<!-- blog Grid Section -->
		<div class="mb-12">
			{#if hasFilters}
				<div class="mb-8">
					<h2 class="text-2xl font-medium text-gray-800 mb-2">
						{#if searchQuery}
							Suchergebnisse für "{searchQuery}"
						{:else if selectedCategory}
							Kategorie: {selectedCategory.title}
						{/if}
					</h2>
					<p class="text-gray-600">
						{data.pagination?.total || 0} 
						{(data.pagination?.total || 0) === 1 ? 'Artikel gefunden' : 'Artikel gefunden'}
					</p>
				</div>
			{:else}
				<h2 class="text-3xl font-medium mb-8 text-center text-gray-800">
					📖 Alle Artikel
				</h2>
			{/if}

			{#if loading}
				<BlogSkeleton count={6} />
			{:else if data.posts && data.posts.length > 0}
				<!-- Use BlogGrid with correct props -->
				<BlogGrid featuredPost={null} regularPosts={(data.posts?.filter(Boolean) || []) as any} />
			{:else}
				<!-- Empty State -->
				<div class="text-center py-16">
					<div class="text-6xl mb-4">🔍</div>
					<h3 class="text-2xl font-medium text-gray-800 mb-2">Keine Artikel gefunden</h3>
					<p class="text-gray-600 mb-6">
						{#if searchQuery}
							Versuchen Sie es mit anderen Suchbegriffen oder stöbern Sie in unseren Kategorien.
						{:else if selectedCategory}
							In dieser Kategorie sind noch keine Artikel vorhanden.
						{:else}
							Es sind noch keine Blog-Artikel vorhanden.
						{/if}
					</p>
					{#if hasFilters}
						<button
							on:click={() => {
								searchQuery = '';
								selectedCategory = null;
								currentPage = 1;
								updateURL();
								applyFilters();
							}}
							class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
						>
							Alle Artikel anzeigen
						</button>
					{/if}
				</div>
			{/if}
		</div>

		<!-- Pagination Section -->
		{#if data.pagination && totalPages > 1}
			<div class="flex justify-center mt-12">
				<nav class="flex items-center space-x-2" aria-label="Pagination">
					<!-- Previous Page -->
					<button
						disabled={currentPage <= 1}
						on:click={() => handlePageChange(currentPage - 1)}
						class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Vorherige
					</button>

					<!-- Page Numbers -->
					{#each Array.from({ length: totalPages }, (_, i) => i + 1) as pageNum}
						{#if pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)}
							<button
								on:click={() => handlePageChange(pageNum)}
								class="px-3 py-2 text-sm font-medium border rounded-md {pageNum === currentPage 
									? 'bg-orange-600 text-white border-orange-600' 
									: 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'}"
							>
								{pageNum}
							</button>
						{:else if pageNum === currentPage - 3 || pageNum === currentPage + 3}
							<span class="px-2 py-2 text-sm text-gray-500">...</span>
						{/if}
					{/each}

					<!-- Next Page -->
					<button
						disabled={currentPage >= totalPages}
						on:click={() => handlePageChange(currentPage + 1)}
						class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Nächste
					</button>
				</nav>
			</div>
		{/if}
	</div>
</div>