<script lang="ts">
	/**
	 * BlogPostSidebar - Haupt-Container für die Blog-Post-Sidebar
	 * Responsive Layout mit verschiedenen Sidebar-Komponenten
	 */
	import type { SanityPostProjected } from '$lib/types';
	import RelatedPosts from './RelatedPosts.svelte';
	import LatestPosts from './LatestPosts.svelte';
	import AuthorBox from './AuthorBox.svelte';
	import TagCloud from './TagCloud.svelte';

	// Props
	export let currentPost: SanityPostProjected;
	export let relatedPosts: SanityPostProjected[] = [];
	export let latestPosts: SanityPostProjected[] = [];
	export let allTags: string[] = [];
	export let author: any = null; // Author wird separat geladen

	// 🐛 DEBUG: Log empfangene Props
	$: {
		console.log('🔍 BlogPostSidebar Props Debug:');
		console.log('  📝 currentPost:', currentPost?.title || 'undefined');
		console.log('  🔗 relatedPosts:', relatedPosts?.length || 0, 'posts');
		console.log('  📰 latestPosts:', latestPosts?.length || 0, 'posts');
		console.log('  🏷️  allTags:', allTags?.length || 0, 'tags');
		console.log('  👤 author:', author?.name || 'null');
		console.log('  📊 Detailed Data:');
		console.log('    relatedPosts array:', relatedPosts);
		console.log('    latestPosts array:', latestPosts);
		console.log('    author object:', author);
	}

	// Responsive Klassen
	const sidebarClasses = `
		w-full lg:w-80 xl:w-96
		space-y-6 lg:space-y-8
		flex flex-col
	`;
</script>

<aside class={sidebarClasses} role="complementary" aria-label="Blog Post Sidebar">
	<!-- Autor-Box -->
	{#if author}
		<div class="order-1">
			<AuthorBox {author} />
		</div>
	{/if}

	<!-- Ähnliche Posts -->
	{#if relatedPosts && relatedPosts.length > 0}
		<div class="order-2">
			<RelatedPosts posts={relatedPosts} />
		</div>
	{/if}

	<!-- Tag-Wolke -->
	{#if allTags && allTags.length > 0}
		<div class="order-3">
			<TagCloud tags={allTags} />
		</div>
	{/if}

	<!-- Neueste Posts -->
	{#if latestPosts && latestPosts.length > 0}
		<div class="order-4">
			<LatestPosts posts={latestPosts} />
		</div>
	{/if}
</aside>

<style>
	/* Zusätzliche responsive Anpassungen */
	@media (max-width: 1023px) {
		aside {
			margin-top: 2rem;
			padding-top: 2rem;
			border-top: 1px solid rgb(229 231 235);
		}
	}

	@media (min-width: 1024px) {
		aside {
			position: sticky;
			top: 2rem;
		}
	}
</style>