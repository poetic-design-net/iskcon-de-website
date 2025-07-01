<script lang="ts">
	/**
	 * TagCloud - Komponente für Tag-Wolke
	 * Zeigt Blog-Tags als anklickbare Badges mit dynamischen Größen
	 */
	import { getCategoryColor } from '$lib/utils/blogUtils';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import Icon from '@iconify/svelte';

	// Props
	export let tags: string[] = [];
	export let maxTags: number = 20;

	// Tags verarbeiten und limitieren
	$: displayTags = tags.slice(0, maxTags);

	// Tag-Größen basierend auf Häufigkeit (simuliert - in echter Anwendung würde man Tag-Counts verwenden)
	function getTagSize(index: number): 'sm' | 'default' | 'lg' {
		// Simuliere Tag-Popularität basierend auf Position
		if (index < 3) return 'lg';
		if (index < 8) return 'default';
		return 'sm';
	}

	// Tag-URL erstellen
	function getTagUrl(tag: string): string {
		const encodedTag = encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'));
		return `/blog?tag=${encodedTag}`;
	}
</script>

{#if displayTags.length > 0}
	<Card.Root class="p-6">
		<Card.Header class="p-0 mb-4">
			<Card.Title class="text-lg font-medium text-gray-900 flex items-center">
				<Icon icon="mdi:tag-multiple" class="w-5 h-5 mr-2 text-spiritual-saffron-600" />
				Themen
			</Card.Title>
		</Card.Header>

		<Card.Content class="p-0">
			<div class="flex flex-wrap gap-2">
				{#each displayTags as tag, index (tag)}
					<a
						href={getTagUrl(tag)}
						class="inline-block transition-transform hover:scale-105"
						aria-label="Alle Beiträge zu {tag}"
					>
						<Badge
							variant="secondary"
							class="
								{getCategoryColor(tag)}
								text-white border-0
								hover:shadow-md transition-all duration-200
								cursor-pointer
								{getTagSize(index) === 'lg' ? 'text-sm px-3 py-1' : 
								  getTagSize(index) === 'default' ? 'text-xs px-2 py-1' : 
								  'text-xs px-2 py-0.5'}
							"
						>
							{tag}
						</Badge>
					</a>
				{/each}
			</div>

			<!-- "Alle Tags" Link falls viele Tags vorhanden -->
			{#if tags.length > maxTags}
				<div class="mt-4 pt-4 border-t border-gray-100">
					<a 
						href="/blog/tags" 
						class="text-sm text-spiritual-saffron-600 hover:text-spiritual-saffron-700 font-medium flex items-center"
					>
						Alle Themen anzeigen
						<Icon icon="mdi:arrow-right" class="w-4 h-4 ml-1" />
					</a>
				</div>
			{/if}

			<!-- Zusätzliche Actions -->
			<div class="mt-4 pt-4 border-t border-gray-100 text-center">
				<p class="text-xs text-muted-foreground mb-2">
					Finde weitere Beiträge zu deinen Interessensgebieten
				</p>
				<a 
					href="/blog" 
					class="inline-flex items-center text-sm text-spiritual-saffron-600 hover:text-spiritual-saffron-700 font-medium"
				>
					<Icon icon="mdi:magnify" class="w-4 h-4 mr-1" />
					Alle Beiträge durchsuchen
				</a>
			</div>
		</Card.Content>
	</Card.Root>
{/if}