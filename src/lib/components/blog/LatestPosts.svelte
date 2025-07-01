<script lang="ts">
	/**
	 * LatestPosts - Komponente für neueste Blog-Posts
	 * Minimale Liste-Darstellung für die Sidebar
	 */
	import type { SanityPostProjected } from '$lib/types';
	import { formatPublishDate } from '$lib/utils/blogUtils';
	import * as Card from '$lib/components/ui/card';
	import Icon from '@iconify/svelte';

	// Props
	export let posts: SanityPostProjected[] = [];

	// Limitiere auf maximal 5 Posts für die Sidebar
	$: displayPosts = posts.slice(0, 5);
	
	// Debug Logs
	$: {
		console.log('🔍 [DEBUG] LatestPosts Component - Posts received:', posts);
		console.log('🔍 [DEBUG] LatestPosts Component - Posts length:', posts?.length || 0);
		console.log('🔍 [DEBUG] LatestPosts Component - Display posts:', displayPosts);
		console.log('🔍 [DEBUG] LatestPosts Component - Will render?', displayPosts.length > 0);
	}
</script>

{#if displayPosts.length > 0}
	<Card.Root class="p-6">
		<Card.Header class="p-0 mb-4">
			<Card.Title class="text-lg font-medium text-gray-900 flex items-center">
				<Icon icon="mdi:clock-outline" class="w-5 h-5 mr-2 text-spiritual-saffron-600" />
				Neueste Beiträge
			</Card.Title>
		</Card.Header>

		<Card.Content class="p-0">
			<nav aria-label="Neueste Blog-Beiträge">
				<ul class="space-y-3">
					{#each displayPosts as post (post._id)}
						<li>
							<article>
								<a 
									href="/blog/{post.slug}"
									class="group block p-2 -mx-2 rounded-lg transition-colors hover:bg-gray-50"
									aria-label="Lese {post.title}"
								>
									<h4 class="text-sm font-medium text-gray-900 group-hover:text-spiritual-saffron-600 transition-colors line-clamp-2 mb-1">
										{post.title}
									</h4>

									{#if post.publishedAt}
										<time 
											datetime={post.publishedAt}
											class="text-xs text-gray-500"
										>
											{formatPublishDate(post.publishedAt)}
										</time>
									{/if}
								</a>
							</article>
						</li>
					{/each}
				</ul>
			</nav>

			<!-- "Alle anzeigen" Link -->
			<div class="mt-4 pt-4 border-t border-gray-100">
				<a 
					href="/posts"
					class="text-sm text-spiritual-saffron-600 hover:text-spiritual-saffron-700 font-medium flex items-center"
				>
					Alle Beiträge anzeigen
					<Icon icon="mdi:arrow-right" class="w-4 h-4 ml-1" />
				</a>
			</div>
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