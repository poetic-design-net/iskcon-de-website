<script lang="ts">
	/**
	 * AuthorBox - Komponente für Autor-Informationen
	 * Zeigt Autor-Details mit Bio und Social Links
	 */
	import * as Card from '$lib/components/ui/card';
	import SanityImage from '$lib/components/global/SanityImage.svelte';
	import Icon from '@iconify/svelte';

	// Props - Basierend auf AUTHOR_DETAIL_PROJECTION
	export let author: {
		_id: string;
		name: string;
		slug: string;
		bio?: string;
		image?: any;
		socialLinks?: Array<{
			platform: string;
			url: string;
		}>;
	};

	// Debug Logs
	$: {
		console.log('🔍 [DEBUG] AuthorBox Component - Author received:', author);
		console.log('🔍 [DEBUG] AuthorBox Component - Author exists?', !!author);
		console.log('🔍 [DEBUG] AuthorBox Component - Author name:', author?.name);
		console.log('🔍 [DEBUG] AuthorBox Component - Will render?', !!author);
	}

	// Social Media Icons Mapping
	const socialIcons: Record<string, string> = {
		twitter: 'mdi:twitter',
		facebook: 'mdi:facebook',
		instagram: 'mdi:instagram',
		linkedin: 'mdi:linkedin',
		youtube: 'mdi:youtube',
		website: 'mdi:web'
	};

	// Bio-Text kürzen für Sidebar
	$: shortBio = author.bio && author.bio.length > 120 
		? author.bio.slice(0, 120) + '...' 
		: author.bio;
</script>

{#if author}
	<Card.Root class="p-6">
		<Card.Header class="p-0 mb-4">
			<Card.Title class="text-lg font-medium text-gray-900 flex items-center">
				<Icon icon="mdi:account" class="w-5 h-5 mr-2 text-spiritual-saffron-600" />
				Über den Autor
			</Card.Title>
		</Card.Header>

		<Card.Content class="p-0">
			<div class="flex flex-col items-center text-center space-y-4">
				<!-- Avatar -->
				<div class="w-20 h-20">
					{#if author.image}
						<SanityImage
							src={author.image}
							alt={author.name}
							className="w-full h-full rounded-full object-cover"
							width={80}
							height={80}
							objectFit="cover"
						/>
					{:else}
						<!-- Fallback Avatar -->
						<div class="w-full h-full rounded-full bg-spiritual-saffron-100 flex items-center justify-center">
							<Icon icon="mdi:account" class="w-8 h-8 text-spiritual-saffron-600" />
						</div>
					{/if}
				</div>

				<!-- Name -->
				<div>
					<h4 class="text-lg font-medium text-gray-900">
						{author.name}
					</h4>
				</div>

				<!-- Bio -->
				{#if shortBio}
					<p class="text-sm text-muted-foreground leading-relaxed">
						{shortBio}
					</p>
				{/if}

				<!-- Social Links -->
				{#if author.socialLinks && author.socialLinks.length > 0}
					<div class="flex justify-center space-x-3">
						{#each author.socialLinks as social}
							<a
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								class="text-gray-400 hover:text-spiritual-saffron-600 transition-colors p-2 hover:bg-gray-50 rounded-lg"
								aria-label="{social.platform} Profil von {author.name}"
							>
								<Icon 
									icon={socialIcons[social.platform.toLowerCase()] || socialIcons.website} 
									class="w-4 h-4"
								/>
							</a>
						{/each}
					</div>
				{/if}

				<!-- Autor-Profil Link -->
				{#if author.slug}
					<div class="pt-2">
						<a
							href="/autoren/{author.slug}"
							class="text-sm text-spiritual-saffron-600 hover:text-spiritual-saffron-700 font-medium flex items-center"
						>
							Mehr vom Autor
							<Icon icon="mdi:arrow-right" class="w-4 h-4 ml-1" />
						</a>
					</div>
				{/if}
			</div>
		</Card.Content>
	</Card.Root>
{/if}