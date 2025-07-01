<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import Icon from '@iconify/svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';

	export let data: PageData;

	$: ({ book, relatedBooks } = data);
	$: structuredData = data.seo?.structuredData;

	// Helper functions
	function getBookTypeLabel(type: string): string {
		const labels: Record<string, string> = {
			'bhagavad-gita': 'Bhagavad-gītā',
			'srimad-bhagavatam': 'Śrīmad-Bhāgavatam',
			'chaitanya-charitamrita': 'Caitanya-caritāmṛta',
			'nectar-of-devotion': 'Nectar of Devotion',
			'nectar-of-instruction': 'Nectar of Instruction',
			'krishna-book': 'Kṛṣṇa Book',
			'science-of-self-realization': 'Science of Self-Realization',
			'perfect-questions': 'Perfect Questions, Perfect Answers',
			'easy-journey': 'Easy Journey to Other Planets',
			'teachings-of-lord-caitanya': 'Teachings of Lord Caitanya',
			'isopanisad': 'Īśopaniṣad',
			'light-of-bhagavata': 'Light of the Bhāgavata',
			'raja-vidya': 'Rāja-vidyā',
			'elevation-to-krishna': 'Elevation to Kṛṣṇa Consciousness',
			'on-chanting-hare-krishna': 'On the Way to Kṛṣṇa',
			'message-of-godhead': 'Message of Godhead',
			'back-to-godhead': 'Back to Godhead Magazine',
			'other': 'Andere Literatur'
		};
		return labels[type] || type;
	}

	function getDifficultyLabel(difficulty: string): string {
		const labels: Record<string, string> = {
			'beginner': 'Anfänger',
			'intermediate': 'Fortgeschritten',
			'advanced': 'Experte'
		};
		return labels[difficulty] || difficulty;
	}

	function formatAvailability(availability: any): string {
		if (!availability) return 'Nicht verfügbar';
		
		const formats: string[] = [];
		if (availability.physical) formats.push('Buch');
		if (availability.digital) formats.push('E-Book');
		if (availability.audio) formats.push('Hörbuch');
		
		return formats.length > 0 ? formats.join(', ') : 'Nicht verfügbar';
	}

	function formatLanguages(languages: string[]): string {
		if (!languages || languages.length === 0) return 'Nicht angegeben';
		
		const languageMap: Record<string, string> = {
			'de': 'Deutsch',
			'en': 'Englisch',
			'hi': 'Hindi',
			'sa': 'Sanskrit'
		};
		
		return languages.map(lang => languageMap[lang] || lang).join(', ');
	}

	// SEO structured data
	$: if (browser && structuredData) {
		const script = document.createElement('script');
		script.type = 'application/ld+json';
		script.textContent = JSON.stringify(structuredData);
		document.head.appendChild(script);
	}
</script>

<svelte:head>
	<title>{book.title} | ISKCON Deutschland</title>
	<meta name="description" content={book.description || `Erfahren Sie mehr über ${book.title} - spirituelle Literatur von ISKCON Deutschland.`} />
	
	<!-- Open Graph -->
	<meta property="og:title" content="{book.title} | ISKCON Deutschland" />
	<meta property="og:description" content={book.description || `Erfahren Sie mehr über ${book.title} - spirituelle Literatur von ISKCON Deutschland.`} />
	<meta property="og:image" content={book.coverImage?.asset?.url || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80'} />
	<meta property="og:url" content="{$page.url.href}" />
	<meta property="og:type" content="book" />
	
	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="{book.title} | ISKCON Deutschland" />
	<meta name="twitter:description" content={book.description || `Erfahren Sie mehr über ${book.title} - spirituelle Literatur von ISKCON Deutschland.`} />
	<meta name="twitter:image" content={book.coverImage?.asset?.url || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80'} />
	
	<!-- Book specific meta -->
	{#if book.author}
		<meta name="author" content={book.author?.name || ''} />
	{/if}
	{#if book.isbn}
		<meta name="book:isbn" content={book.isbn} />
	{/if}
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-spiritual-saffron-50 via-white to-spiritual-saffron-50">
	<!-- Header Section -->
	<div class="bg-white border-b border-gray-200">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<!-- Breadcrumb -->
			<nav class="flex mb-8" aria-label="Breadcrumb">
				<ol class="inline-flex items-center space-x-1 md:space-x-3">
					<li class="inline-flex items-center">
						<a href="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-spiritual-saffron-600">
							<Icon icon="mdi:home" class="w-4 h-4 mr-2" />
							Startseite
						</a>
					</li>
					<li>
						<div class="flex items-center">
							<Icon icon="mdi:chevron-right" class="w-4 h-4 text-gray-400" />
							<a href="/literature" class="ml-1 text-sm font-medium text-gray-700 hover:text-spiritual-saffron-600 md:ml-2">
								Literatur
							</a>
						</div>
					</li>
					<li aria-current="page">
						<div class="flex items-center">
							<Icon icon="mdi:chevron-right" class="w-4 h-4 text-gray-400" />
							<span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">{book.title}</span>
						</div>
					</li>
				</ol>
			</nav>

			<!-- Hero Section -->
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
				<!-- Book Cover -->
				<div class="space-y-6">
					<div class="aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-xl overflow-hidden shadow-2xl">
						<img
							src={book.coverImage?.asset?.url || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80'}
							alt={book.title}
							class="w-full h-full object-cover"
						/>
					</div>
					
					<!-- Quick Actions -->
					<div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
						{#if book.availability?.isAvailable && book.availability?.formats?.includes('physical')}
							<Button class="flex-1 bg-spiritual-saffron-600 hover:bg-spiritual-saffron-700">
								<Icon icon="mdi:cart" class="w-4 h-4 mr-2" />
								Buch bestellen
							</Button>
						{/if}
						{#if book.availability?.isAvailable && book.availability?.formats?.includes('digital')}
							<Button variant="outline" class="flex-1 border-spiritual-saffron-300 text-spiritual-saffron-700 hover:bg-spiritual-saffron-50">
								<Icon icon="mdi:download" class="w-4 h-4 mr-2" />
								E-Book herunterladen
							</Button>
						{/if}
					</div>
				</div>

				<!-- Book Information -->
				<div class="space-y-8">
					<!-- Title and Meta -->
					<div class="space-y-4">
						<div class="flex flex-wrap gap-2">
							<Badge class="bg-spiritual-saffron-100 text-spiritual-saffron-800 border-spiritual-saffron-200">
								{getBookTypeLabel(book.bookType)}
							</Badge>
							{#if book.difficulty}
								<Badge variant="secondary">
									{getDifficultyLabel(book.difficulty)}
								</Badge>
							{/if}
							{#if book.featured}
								<Badge class="bg-yellow-100 text-yellow-800 border-yellow-200">
									<Icon icon="mdi:star" class="w-3 h-3 mr-1" />
									Empfohlen
								</Badge>
							{/if}
						</div>

						<h1 class="text-4xl font-medium text-gray-900 leading-tight">
							{book.title}
						</h1>

						{#if book.author}
							<p class="text-xl text-gray-600">
								von <span class="font-medium text-spiritual-saffron-700">{book.author}</span>
							</p>
						{/if}

						{#if book.description}
							<p class="text-lg text-gray-700 leading-relaxed">
								{book.description}
							</p>
						{/if}
					</div>

					<Separator />

					<!-- Book Details -->
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
						{#if book.isbn}
							<div class="space-y-1">
								<h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">ISBN</h3>
								<p class="text-gray-900">{book.isbn}</p>
							</div>
						{/if}

						{#if book.publishingInfo?.pages}
							<div class="space-y-1">
								<h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">Seitenzahl</h3>
								<p class="text-gray-900">{book.publishingInfo.pages} Seiten</p>
							</div>
						{/if}

						{#if book.languages}
							<div class="space-y-1">
								<h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">Sprachen</h3>
								<p class="text-gray-900">{formatLanguages(book.languages)}</p>
							</div>
						{/if}

						<div class="space-y-1">
							<h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">Verfügbare Formate</h3>
							<p class="text-gray-900">{formatAvailability(book.availability)}</p>
						</div>

						{#if book.publishedAt}
							<div class="space-y-1">
								<h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">Veröffentlicht</h3>
								<p class="text-gray-900">{new Date(book.publishedAt).toLocaleDateString('de-DE')}</p>
							</div>
						{/if}

						{#if book.availability?.price?.amount}
							<div class="space-y-1">
								<h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide">Preis</h3>
								<p class="text-gray-900 text-lg font-medium">{book.availability.price.currency || '€'}{book.availability.price.amount}</p>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Main Content -->
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
			<!-- Main Content Area -->
			<div class="lg:col-span-2 space-y-12">
				<!-- Detailed Description -->
				{#if book.content}
					<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
						<h2 class="text-2xl font-medium text-gray-900 mb-6">Über dieses Buch</h2>
						<div class="prose prose-lg prose-spiritual-saffron max-w-none">
							{@html book.content}
						</div>
					</section>
				{/if}

				<!-- Chapters (if available) -->
				{#if book.chapters && book.chapters.length > 0}
					<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
						<h2 class="text-2xl font-medium text-gray-900 mb-6">Kapitel</h2>
						<div class="space-y-4">
							{#each book.chapters as chapter, index}
								<div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
									<h3 class="font-medium text-gray-900 mb-2">
										{index + 1}. {chapter.title}
									</h3>
									{#if chapter.description}
										<p class="text-gray-600 text-sm">{chapter.description}</p>
									{/if}
								</div>
							{/each}
						</div>
					</section>
				{/if}

				<!-- Key Concepts (if available) -->
				{#if book.sanskritTerms && book.sanskritTerms.length > 0}
					<section class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
						<h2 class="text-2xl font-medium text-gray-900 mb-6">Wichtige Begriffe</h2>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							{#each book.sanskritTerms as term}
								<div class="border border-gray-200 rounded-lg p-4">
									<h3 class="font-medium text-spiritual-saffron-700 mb-1">{term.term}</h3>
									{#if term.pronunciation}
										<p class="text-sm text-gray-500 mb-2 italic">{term.pronunciation}</p>
									{/if}
									{#if term.meaning}
										<p class="text-gray-700 text-sm">{term.meaning}</p>
									{/if}
								</div>
							{/each}
						</div>
					</section>
				{/if}
			</div>

			<!-- Sidebar -->
			<div class="space-y-8">
				<!-- Download/Purchase Options -->
				<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<h3 class="text-lg font-medium text-gray-900 mb-4">Verfügbare Optionen</h3>
					<div class="space-y-3">
						{#if book.availability?.isAvailable && book.availability?.formats?.includes('physical')}
							<Button class="w-full justify-start bg-spiritual-saffron-600 hover:bg-spiritual-saffron-700">
								<Icon icon="mdi:book-open-page-variant" class="w-4 h-4 mr-2" />
								Physisches Buch bestellen
							</Button>
						{/if}
						{#if book.availability?.isAvailable && book.availability?.formats?.includes('digital')}
							<Button variant="outline" class="w-full justify-start border-spiritual-saffron-300 text-spiritual-saffron-700 hover:bg-spiritual-saffron-50">
								<Icon icon="mdi:file-pdf-box" class="w-4 h-4 mr-2" />
								PDF herunterladen
							</Button>
						{/if}
						{#if book.availability?.isAvailable && book.availability?.formats?.includes('audio')}
							<Button variant="outline" class="w-full justify-start border-blue-300 text-blue-700 hover:bg-blue-50">
								<Icon icon="mdi:headphones" class="w-4 h-4 mr-2" />
								Hörbuch anhören
							</Button>
						{/if}
					</div>
				</div>

				<!-- Quick Info -->
				<div class="bg-spiritual-saffron-50 rounded-xl border border-spiritual-saffron-200 p-6">
					<h3 class="text-lg font-medium text-spiritual-saffron-900 mb-4">Auf einen Blick</h3>
					<div class="space-y-3 text-sm">
						<div class="flex justify-between">
							<span class="text-spiritual-saffron-700">Kategorie:</span>
							<span class="text-spiritual-saffron-900 font-medium">{getBookTypeLabel(book.bookType)}</span>
						</div>
						{#if book.difficulty}
							<div class="flex justify-between">
								<span class="text-spiritual-saffron-700">Schwierigkeit:</span>
								<span class="text-spiritual-saffron-900 font-medium">{getDifficultyLabel(book.difficulty)}</span>
							</div>
						{/if}
						{#if book.publishingInfo?.pages}
							<div class="flex justify-between">
								<span class="text-spiritual-saffron-700">Seiten:</span>
								<span class="text-spiritual-saffron-900 font-medium">{book.publishingInfo.pages}</span>
							</div>
						{/if}
						<div class="flex justify-between">
							<span class="text-spiritual-saffron-700">Formate:</span>
							<span class="text-spiritual-saffron-900 font-medium">{formatAvailability(book.availability)}</span>
						</div>
					</div>
				</div>

				<!-- Related Books -->
				{#if relatedBooks && relatedBooks.length > 0}
					<div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
						<h3 class="text-lg font-medium text-gray-900 mb-4">Ähnliche Bücher</h3>
						<div class="space-y-4">
							{#each relatedBooks as relatedBook}
								<a
									href="/literature/{relatedBook.slug}"
									class="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
								>
									<div class="w-12 h-16 flex-shrink-0 rounded overflow-hidden">
										<img
											src={relatedBook.coverImage?.asset?.url || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=200&q=60'}
											alt={relatedBook.title}
											class="w-full h-full object-cover"
										/>
									</div>
									<div class="flex-1 min-w-0">
										<h4 class="text-sm font-medium text-gray-900 group-hover:text-spiritual-saffron-700 line-clamp-2">
											{relatedBook.title}
										</h4>
										{#if relatedBook.author}
											<p class="text-xs text-gray-500 mt-1">{relatedBook.author}</p>
										{/if}
									</div>
								</a>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>