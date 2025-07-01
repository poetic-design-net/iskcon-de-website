<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import Icon from '@iconify/svelte';
	import type { PostNavigationPost, PostNavigationProps } from './types';

	type $$Props = PostNavigationProps;

	export let previousPost: PostNavigationPost | null = null;
	export let nextPost: PostNavigationPost | null = null;

	// Helper function to truncate excerpt
	function truncateExcerpt(text: string | undefined, maxLength: number = 80): string {
		if (!text) return '';
		return text.length > maxLength ? text.substring(0, maxLength).trim() + '...' : text;
	}
</script>

<nav class="post-navigation mt-12 mb-8" aria-label="Navigation zwischen Blog-Posts">
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<!-- Previous Post -->
		<div class="previous-post">
			{#if previousPost}
				<Card.Root class="h-full transition-all duration-300 hover:shadow-lg group border-border/50 hover:border-spiritual-saffron-200">
					<a 
						href="/blog/{previousPost.slug}" 
						class="block p-6 h-full no-underline"
						aria-label="Vorheriger Post: {previousPost.title}"
					>
						<div class="flex items-start gap-3">
							<div class="flex-shrink-0 mt-1">
								<Icon 
									icon="lucide:chevron-left" 
									class="w-5 h-5 text-spiritual-saffron-500 transition-transform duration-300 group-hover:-translate-x-1" 
								/>
							</div>
							<div class="flex-1 min-w-0">
								<div class="text-sm font-medium text-muted-foreground mb-1">
									Vorheriger Post
								</div>
								<h3 class="text-lg font-medium text-card-foreground mb-2 line-clamp-2 group-hover:text-spiritual-saffron-600 transition-colors duration-300">
									{previousPost.title}
								</h3>
								{#if previousPost.excerpt}
									<p class="text-sm text-muted-foreground line-clamp-2">
										{truncateExcerpt(previousPost.excerpt)}
									</p>
								{/if}
							</div>
						</div>
					</a>
				</Card.Root>
			{:else}
				<div class="hidden md:block">
					<!-- Placeholder to maintain grid layout on desktop -->
				</div>
			{/if}
		</div>

		<!-- Next Post -->
		<div class="next-post">
			{#if nextPost}
				<Card.Root class="h-full transition-all duration-300 hover:shadow-lg group border-border/50 hover:border-spiritual-saffron-200">
					<a 
						href="/blog/{nextPost.slug}" 
						class="block p-6 h-full no-underline"
						aria-label="Nächster Post: {nextPost.title}"
					>
						<div class="flex items-start gap-3">
							<div class="flex-1 min-w-0 text-right md:text-left">
								<div class="text-sm font-medium text-muted-foreground mb-1">
									Nächster Post
								</div>
								<h3 class="text-lg font-medium text-card-foreground mb-2 line-clamp-2 group-hover:text-spiritual-saffron-600 transition-colors duration-300">
									{nextPost.title}
								</h3>
								{#if nextPost.excerpt}
									<p class="text-sm text-muted-foreground line-clamp-2">
										{truncateExcerpt(nextPost.excerpt)}
									</p>
								{/if}
							</div>
							<div class="flex-shrink-0 mt-1 order-first md:order-last">
								<Icon 
									icon="lucide:chevron-right" 
									class="w-5 h-5 text-spiritual-saffron-500 transition-transform duration-300 group-hover:translate-x-1" 
								/>
							</div>
						</div>
					</a>
				</Card.Root>
			{/if}
		</div>
	</div>
</nav>

<style>
	/* Line clamp utility for cross-browser support */
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* Remove default link styling */
	.post-navigation a {
		text-decoration: none !important;
	}

	/* Ensure consistent card heights */
	.post-navigation :global(.card) {
		height: 100%;
	}

	/* Custom responsive behavior for mobile */
	@media (max-width: 768px) {
		.next-post .flex {
			flex-direction: row-reverse;
		}
		
		.next-post .text-right {
			text-align: left;
		}
	}
</style>