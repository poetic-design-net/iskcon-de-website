<script lang="ts">
	/**
	 * RelatedPosts - Komponente für ähnliche Blog-Posts
	 * Zeigt verwandte Posts in kompakter Darstellung
	 */
	import type { SanityPostProjected } from '$lib/types';
	import { formatPublishDate, calculateReadingTime } from '$lib/utils/blogUtils';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import Icon from '@iconify/svelte';
	import SanityImage from '$lib/components/global/SanityImage.svelte';

	// Props
	export let posts: SanityPostProjected[] = [];

	// Limitiere auf maximal 4 Posts für die Sidebar
	$: displayPosts = posts.slice(0, 4);
	
	// Debug Logs
	$: {
		console.log('🔍 [DEBUG] RelatedPosts Component - Posts received:', posts);
		console.log('🔍 [DEBUG] RelatedPosts Component - Posts length:', posts?.length || 0);
		console.log('🔍 [DEBUG] RelatedPosts Component - Display posts:', displayPosts);
		console.log('🔍 [DEBUG] RelatedPosts Component - Will render?', displayPosts.length > 0);
	}
</script>

{#if displayPosts.length > 0}
	<Card.Root class="p-6">
		<Card.Header class="p-0 mb-4">
			<Card.Title class="text-lg font-medium text-gray-900 flex items-center">
				<Icon icon="mdi:lightning-bolt" class="w-5 h-5 mr-2 text-spiritual-saffron-600" />
				Ähnliche Beiträge
			</Card.Title>
		</Card.Header>

		<Card.Content class="p-0">

		<div class="space-y-4">
			{#each displayPosts as post (post._id)}
				<article class="group">
					<a 
						href="/blog/{post.slug}"
						class="flex gap-3 p-3 rounded-lg transition-colors hover:bg-gray-50"
						aria-label="Lese {post.title}"
					>
						<!-- Thumbnail -->
						{#if post.featuredImage}
							<div class="flex-shrink-0 w-16 h-16 overflow-hidden rounded-md">
								<SanityImage
									src={post.featuredImage}
									alt={post.title}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
									width={64}
									height={64}
									objectFit="cover"
								/>
							</div>
						{/if}

						<div class="flex-1 min-w-0">
							<!-- Titel -->
							<h4 class="text-sm font-medium text-gray-900 group-hover:text-accent-600 transition-colors line-clamp-2 mb-1">
								{post.title}
							</h4>

							<!-- Meta-Informationen -->
							<div class="flex flex-col gap-1">
								{#if post.publishedAt}
									<time 
										datetime={post.publishedAt}
										class="text-xs text-gray-500"
									>
										{formatPublishDate(post.publishedAt)}
									</time>
								{/if}

								{#if calculateReadingTime(post)}
									<span class="text-xs text-gray-500">
										{calculateReadingTime(post)}
									</span>
								{/if}
							</div>

							<!-- Tags (nur der erste) -->
							{#if post.tags && post.tags.length > 0}
								<div class="mt-2">
									<Badge variant="secondary" class="text-xs">
										{post.tags?.[0] || 'Allgemein'}
									</Badge>
								</div>
							{/if}
						</div>
					</a>
				</article>
			{/each}
		</div>

		<!-- "Alle anzeigen" Link falls mehr Posts vorhanden -->
		{#if posts.length > 4}
			<div class="mt-4 pt-4 border-t border-gray-100">
				<a
					href="/blog"
					class="text-sm text-spiritual-saffron-600 hover:text-spiritual-saffron-700 font-medium flex items-center"
				>
					Alle Beiträge anzeigen
					<Icon icon="mdi:arrow-right" class="w-4 h-4 ml-1" />
				</a>
			</div>
		{/if}
		</Card.Content>
	</Card.Root>
{/if}

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>