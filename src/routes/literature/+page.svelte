<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import type { LiteratureBookType, LiteratureDifficulty, LiteratureFilterAvailability } from '$lib/types';
	
	// Import Literature Components
	import {
		LiteratureHero,
		LiteratureFilters,
		LiteratureGrid,
		FeaturedBooks
	} from '$lib/components/literature';

	export let data: PageData;

	// Safe destructuring with defaults to prevent undefined errors
	$: literatureBooks = data?.literatureBooks || [];
	$: featuredBooks = data?.featuredBooks || [];
	$: pageFilters = data?.filters || {
		search: '',
		bookType: '',
		difficulty: '',
		availability: [],
		languages: [],
		tags: [],
		featured: false
	};
	$: pagination = data?.pagination || { hasMore: false, page: 1, limit: 12 };
	$: seo = data?.seo || {
		title: 'Literature',
		description: '',
		canonical: '',
		openGraph: { title: '', description: '', type: 'website' }
	};

	// Filter state - matching LiteratureFilters component interface exactly
	let search = '';
	let bookType: LiteratureBookType | 'all' = 'all';
	let difficulty: LiteratureDifficulty | 'all' = 'all';
	let availability: LiteratureFilterAvailability | 'all' = 'all';
	let featuredOnly = false;
	let loading = false;

	// Filtered books
	let filteredBooks = literatureBooks;

	// Handle search from LiteratureHero
	function handleSearch(event: CustomEvent<string>) {
		search = event.detail;
		applyFilters();
		updateURL();
	}

	// Handle filter changes from LiteratureFilters - no search property (comes from Hero)
	function handleFilterChange(event: CustomEvent<{
		bookType: LiteratureBookType | 'all';
		difficulty: LiteratureDifficulty | 'all';
		availability: LiteratureFilterAvailability | 'all';
		featuredOnly: boolean;
	}>) {
		const filterData = event.detail;
		bookType = filterData.bookType;
		difficulty = filterData.difficulty;
		availability = filterData.availability;
		featuredOnly = filterData.featuredOnly;
		
		applyFilters();
		updateURL();
	}

	// Apply filters to books
	function applyFilters() {
		let books = [...literatureBooks];

		// Search filter
		if (search && search.trim() !== '') {
			const term = search.toLowerCase();
			books = books.filter(book =>
				book.title.toLowerCase().includes(term) ||
				book.description?.toLowerCase().includes(term) ||
				(typeof book.author === 'string' ? book.author : book.author?.name)?.toLowerCase().includes(term)
			);
		}

		// Book type filter
		if (bookType && bookType !== 'all') {
			books = books.filter(book => book.bookType === bookType);
		}

		// Difficulty filter
		if (difficulty && difficulty !== 'all') {
			books = books.filter(book => book.difficulty === difficulty);
		}

		// Availability filter - convert LiteratureAvailability object to filter logic
		if (availability && availability !== 'all') {
			books = books.filter(book => {
				const bookAvailability = typeof book.availability === 'string' ? null : book.availability;
				if (!bookAvailability) return false;
				
				// If availability is an object, check if any of the availability options match
				if (typeof availability === 'object') {
					// Check if book is available and has the requested formats
					if (!bookAvailability.isAvailable) return false;
					
					const bookFormats = bookAvailability.formats || [];
					return (availability.physical && bookFormats.includes('physical')) ||
						   (availability.digital && bookFormats.includes('digital')) ||
						   (availability.audio && bookFormats.includes('audio'));
				}
				return false;
			});
		}

		// Featured filter
		if (featuredOnly) {
			books = books.filter(book => book.isFeatured);
		}

		filteredBooks = books;
	}

	// Update URL with current filters
	function updateURL() {
		if (typeof window === 'undefined') return;
		
		const url = new URL(window.location.href);
		
		// Update search params
		if (search && search.trim() !== '') {
			url.searchParams.set('search', search);
		} else {
			url.searchParams.delete('search');
		}

		if (bookType && bookType !== 'all') {
			url.searchParams.set('bookType', bookType);
		} else {
			url.searchParams.delete('bookType');
		}

		if (difficulty && difficulty !== 'all') {
			url.searchParams.set('difficulty', difficulty);
		} else {
			url.searchParams.delete('difficulty');
		}

		// For availability object, convert to array format for URL
		if (availability && availability !== 'all' && typeof availability === 'object') {
			const availabilityArray: string[] = [];
			if (availability.physical) availabilityArray.push('physical');
			if (availability.digital) availabilityArray.push('digital');
			if (availability.audio) availabilityArray.push('audio');
			
			if (availabilityArray.length > 0) {
				url.searchParams.set('availability', availabilityArray.join(','));
			} else {
				url.searchParams.delete('availability');
			}
		} else {
			url.searchParams.delete('availability');
		}

		if (featuredOnly) {
			url.searchParams.set('featured', 'true');
		} else {
			url.searchParams.delete('featured');
		}

		goto(url.pathname + url.search, { replaceState: true });
	}

	// Handle book selection
	function handleBookSelect(event: CustomEvent<{ slug: string }>) {
		goto(`/literature/${event.detail.slug}`);
	}

	// Load more books (pagination)
	function handleLoadMore() {
		if (pagination.hasMore && !loading) {
			loading = true;
			const url = new URL(window.location.href);
			url.searchParams.set('page', String(pagination.page + 1));
			goto(url.pathname + url.search, { replaceState: true });
		}
	}

	// Initialize filters from URL params on mount
	onMount(() => {
		// Initialize from URL params if present
		const urlParams = new URLSearchParams(window.location.search);
		
		search = urlParams.get('search') || '';
		
		const urlBookType = urlParams.get('bookType');
		if (urlBookType && urlBookType !== 'all') {
			bookType = urlBookType as LiteratureBookType;
		}
		
		const urlDifficulty = urlParams.get('difficulty');
		if (urlDifficulty && urlDifficulty !== 'all') {
			difficulty = urlDifficulty as LiteratureDifficulty;
		}
		
		const urlAvailability = urlParams.get('availability');
		if (urlAvailability) {
			const availabilityTypes = urlAvailability.split(',');
			availability = {
				physical: availabilityTypes.includes('physical'),
				digital: availabilityTypes.includes('digital'),
				audio: availabilityTypes.includes('audio')
			};
		}
		
		featuredOnly = urlParams.get('featured') === 'true';
		
		applyFilters();
		loading = false;
	});

	// Update filtered books when data changes
	$: if (literatureBooks && literatureBooks.length > 0) {
		applyFilters();
	}
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<link rel="canonical" href={seo.canonical} />
	
	<!-- Open Graph -->
	<meta property="og:title" content={seo.openGraph.title} />
	<meta property="og:description" content={seo.openGraph.description} />
	<meta property="og:type" content={seo.openGraph.type} />
	<meta property="og:url" content={seo.canonical} />
	
	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={seo.openGraph.title} />
	<meta name="twitter:description" content={seo.openGraph.description} />
</svelte:head>

<!-- Hero Section - Full Width -->
<LiteratureHero
	on:search={handleSearch}
/>

<div class="container mx-auto px-4 py-8">
	<!-- Featured Books Section -->
	{#if featuredBooks.length > 0}
		<FeaturedBooks
			books={featuredBooks}
			{loading}
		/>
	{/if}

	<!-- Filters Section -->
	<LiteratureFilters
		{bookType}
		{difficulty}
		{availability}
		{featuredOnly}
		on:filterChange={handleFilterChange}
	/>

	<!-- Results Section -->
	<section class="mb-8">
		<div class="flex justify-between items-center mb-6">
			<h2 class="text-2xl font-medium text-gray-900 dark:text-white">
				Alle Bücher
				{#if filteredBooks.length > 0}
					<span class="text-sm font-normal text-gray-500 dark:text-gray-400">
						({filteredBooks.length} {filteredBooks.length === 1 ? 'Buch' : 'Bücher'})
					</span>
				{/if}
			</h2>
		</div>
<!-- Literature Grid -->
<LiteratureGrid
	books={filteredBooks}
	{loading}
	error={null}
/>
			</section>
</div>