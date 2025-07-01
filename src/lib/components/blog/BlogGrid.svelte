<script lang="ts">
	import type { SanityPostProjected } from '$lib/types';
	import FeaturedBlogCard from './FeaturedBlogCard.svelte';
	import BlogCard from '$lib/components/global/BlogCard.svelte';
	import * as Card from '$lib/components/ui/card';

	export let featuredPost: SanityPostProjected | null = null;
	export let regularPosts: SanityPostProjected[] = [];
</script>

<div class="blog-grid-container">
	<!-- Featured Post Section -->
	{#if featuredPost}
		<div class="featured-section">
			<FeaturedBlogCard post={featuredPost} />
		</div>
	{/if}

	<!-- Regular Posts Grid -->
	{#if regularPosts.length > 0}
		<div class="regular-posts-section">
			<div class="posts-grid">
				{#each regularPosts as post (post.slug)}
					<div class="post-item">
						<BlogCard {post} />
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Empty State -->
	{#if !featuredPost && regularPosts.length === 0}
		<div class="empty-state">
			<Card.Root class="p-8 text-center">
				<Card.Content class="pt-6">
					<h3 class="text-xl font-medium text-gray-600 mb-2">Keine Beiträge gefunden</h3>
					<p class="text-gray-500">Es sind noch keine Blog-Beiträge verfügbar.</p>
				</Card.Content>
			</Card.Root>
		</div>
	{/if}
</div>

<style>
	.blog-grid-container {
		width: 100%;
		max-width: 1400px;
		margin: 0 auto;
		
	}

	.featured-section {
		margin-bottom: 4rem;
	}

	.regular-posts-section {
		margin-bottom: 3rem;
	}

	.posts-grid {
		display: grid;
		gap: 2rem;
		grid-template-columns: 1fr;
		justify-items: center;
		align-items: start;
	}

	.post-item {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		max-width: 400px;
	}

	.empty-state {
		margin: 4rem 0;
	}

	/* Responsive Design - Optimiert für bessere Darstellung */
	@media (min-width: 640px) {
		.blog-grid-container {
		
		}
		
		.posts-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 2.5rem;
			justify-items: stretch;
		}
		
		.post-item {
			max-width: none;
		}
	}

	@media (min-width: 1024px) {
		.posts-grid {
			grid-template-columns: repeat(3, 1fr);
			gap: 3rem;
		}
	}

	/* Auf sehr großen Bildschirmen maximal 3 Spalten für bessere Lesbarkeit */
	@media (min-width: 1280px) {
		.blog-grid-container {
			
		}
		
		.posts-grid {
			gap: 3.5rem;
		}
	}
</style>