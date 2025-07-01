<script lang="ts">
	import { onMount } from 'svelte'
	import { fade, fly } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'
	import SanityImage from '$lib/components/global/SanityImage.svelte'
	import PortableText from '$lib/components/global/PortableText.svelte'
	import type { SanityImage as SanityImageType, PortableTextBlock } from '$lib/types'

	// Props
	export let title: string = ''
	export let subtitle: string | undefined = undefined
	export let description: PortableTextBlock[] | undefined = undefined
	export let image: SanityImageType | undefined = undefined
	export let badge: { text: string; pulseAnimation?: boolean } | undefined = undefined
	export let buttons: Array<{
		text: string
		link: string
		style?: 'primary' | 'secondary'
		showArrow?: boolean
		openInNewTab?: boolean
	}> = []
	export let stats: Array<{
		value: string
		label: string
		gradientDirection?: 'default' | 'reverse' | 'accent'
	}> = []
	export let showStatsDivider: boolean = false
	export let floatingCard: {
		icon?: string
		title: string
		description: string
	} | undefined = undefined
	export let techIndicators: {
		show?: boolean
		colors?: string[]
	} | undefined = undefined
	export let backgroundEffects: {
		showGrid?: boolean
		primaryColor?: string
	} = {}

	let mounted = false
	let containerRef: HTMLElement

	onMount(() => {
		mounted = true
	})

	// Highlight text processing
	function processTitle(title: string) {
		const words = title.split(' ')
		const midPoint = Math.ceil(words.length / 2)
		const firstHalf = words.slice(0, midPoint).join(' ')
		const secondHalf = words.slice(midPoint).join(' ')
		return { firstHalf, secondHalf }
	}
</script>

<section bind:this={containerRef} class="relative py-8 md:py-12 lg:py-16 overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background">
	<!-- Eleganter Hintergrund mit CSS-Variablen -->
	
	<!-- Subtiles Grid-Pattern -->
	{#if backgroundEffects?.showGrid !== false}
		<div class="absolute inset-0 opacity-[0.02] dark:opacity-[0.01]">
			<svg class="w-full h-full">
				<defs>
					<pattern id="heroGrid" width="40" height="40" patternUnits="userSpaceOnUse">
						<path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" stroke-width="0.5"/>
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#heroGrid)" />
			</svg>
		</div>
	{/if}

	<!-- Content container -->
	<div class="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
			
			<!-- Text content -->
			<div class="order-2 lg:order-1">
				{#if mounted}
					<!-- Badge -->
					{#if badge?.text}
						<div
							class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border backdrop-blur-sm mb-4 lg:mb-6"
							in:fly={{ y: 20, duration: 600, easing: quintOut }}
						>
							{#if badge.pulseAnimation !== false}
								<span class="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
							{/if}
							<span class="text-sm font-medium text-muted-foreground">{badge.text}</span>
						</div>
					{/if}

					<!-- Title -->
					{#if title}
						{@const { firstHalf, secondHalf } = processTitle(title)}
						<h1
							class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight mb-3 lg:mb-5 leading-tight"
							in:fly={{ y: 30, duration: 800, delay: 100, easing: quintOut }}
						>
							<span class="block text-foreground">{firstHalf}</span>
							<span class="block text-foreground/90">
								{secondHalf}
							</span>
						</h1>
					{/if}

					<!-- Subtitle -->
					{#if subtitle}
						<p
							class="text-lg md:text-xl text-muted-foreground mb-4 lg:mb-6 leading-relaxed"
							in:fly={{ y: 20, duration: 800, delay: 200, easing: quintOut }}
						>
							{subtitle}
						</p>
					{/if}

					<!-- Description -->
					{#if description}
						<div
							class="prose prose-base text-muted-foreground max-w-none mb-6 lg:mb-8"
							in:fly={{ y: 20, duration: 800, delay: 300, easing: quintOut }}
						>
							<PortableText value={description} />
						</div>
					{/if}

					<!-- Buttons -->
					{#if buttons.length > 0}
						<div
							class="flex flex-wrap gap-3"
							in:fly={{ y: 20, duration: 800, delay: 400, easing: quintOut }}
						>
							{#each buttons as button, i}
								<a
									href={button.link}
									target={button.openInNewTab ? '_blank' : undefined}
									rel={button.openInNewTab ? 'noopener noreferrer' : undefined}
									class="group relative inline-flex items-center gap-2 px-4 py-2 lg:px-5 lg:py-2.5 font-medium text-sm transition-all duration-200 rounded-lg"
									class:bg-primary={button.style !== 'secondary'}
									class:text-primary-foreground={button.style !== 'secondary'}
									class:hover:opacity-90={button.style !== 'secondary'}
									class:bg-secondary={button.style === 'secondary'}
									class:text-secondary-foreground={button.style === 'secondary'}
									class:hover:opacity-80={button.style === 'secondary'}
									class:border={button.style === 'secondary'}
									class:border-border={button.style === 'secondary'}
								>
									<span>{button.text}</span>
									
									<!-- Arrow icon -->
									{#if button.showArrow !== false}
										<svg class="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
										</svg>
									{/if}
								</a>
							{/each}
						</div>
					{/if}

					<!-- Stats -->
					{#if stats.length > 0}
						<div
							class="grid grid-cols-3 gap-4 lg:gap-6 mt-8 lg:mt-10"
							class:pt-6={showStatsDivider}
							class:border-t={showStatsDivider}
							class:border-border={showStatsDivider}
							in:fly={{ y: 20, duration: 800, delay: 500, easing: quintOut }}
						>
							{#each stats as stat}
								<div class="text-center lg:text-left">
									<p class="text-xl lg:text-2xl font-medium text-foreground">
										{stat.value}
									</p>
									<p class="text-xs lg:text-sm text-muted-foreground mt-1">{stat.label}</p>
								</div>
							{/each}
						</div>
					{/if}
				{/if}
			</div>

			<!-- Image section -->
			{#if image}
				<div class="relative order-1 lg:order-2">
					{#if mounted}
						<div in:fade={{ duration: 1000, delay: 200 }}>
							<!-- Eleganter Bild-Container -->
							<div class="relative group">
								<!-- Hauptbild -->
								<div class="relative rounded-xl overflow-hidden bg-card border border-border p-1 shadow-lg transition-all duration-300 group-hover:shadow-xl">
									<div class="rounded-lg overflow-hidden aspect-[4/3]">
										<SanityImage
											src={image}
											alt={title}
											width={600}
											height={450}
											className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
											objectFit="cover"
										/>
									</div>
								</div>
								
								<!-- Tech-Indikatoren -->
								{#if techIndicators?.show !== false}
									<div class="absolute top-2 right-2 flex gap-1">
										{#each techIndicators?.colors || ['green', 'yellow', 'gray'] as color, i}
											<div
												class="w-1.5 h-1.5 rounded-full"
												class:bg-green-500={color === 'green'}
												class:bg-yellow-500={color === 'yellow'}
												class:bg-muted-foreground={color === 'gray'}
												class:bg-blue-500={color === 'blue'}
												class:bg-red-500={color === 'red'}
											></div>
										{/each}
									</div>
								{/if}
							</div>
	
							<!-- Schwebende Info-Karte -->
							{#if floatingCard}
								<div class="absolute -bottom-3 -right-3 lg:-bottom-4 lg:-right-4 max-w-[160px] lg:max-w-[180px] bg-card/95 backdrop-blur-sm rounded-lg p-2.5 lg:p-3 border border-border shadow-lg">
									<div class="flex items-center gap-2">
										<div class="w-6 h-6 lg:w-8 lg:h-8 bg-muted rounded-md flex items-center justify-center flex-shrink-0">
											<svg class="w-3 h-3 lg:w-4 lg:h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
											</svg>
										</div>
										<div class="min-w-0">
											<p class="text-foreground font-medium text-xs lg:text-sm">{floatingCard.title}</p>
											<p class="text-muted-foreground text-xs">{floatingCard.description}</p>
										</div>
									</div>
								</div>
							{/if}
						</div>
					{/if}
				</div>
			{/if}

</section>

<style>
	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.5; }
	}
	
	/* Sanfte Hintergrund-Verläufe mit CSS-Variablen */
	section {
		background: linear-gradient(135deg,
			hsl(var(--background)) 0%,
			hsl(var(--muted) / 0.3) 50%,
			hsl(var(--background)) 100%
		);
	}
	
	/* Elegante Hover-Effekte */
	.group:hover .aspect-\[4\/3\] img {
		transform: scale(1.02);
	}
	
	/* Responsive Typografie */
	@media (max-width: 768px) {
		h1 {
			font-size: clamp(1.75rem, 4vw, 2.25rem);
		}
	}
</style>