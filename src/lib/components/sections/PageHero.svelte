<script lang="ts">
	import { onMount } from 'svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import Icon from '@iconify/svelte';
	import SanityImage from '$lib/components/global/SanityImage.svelte';
	
	// Props
	export let title: string = '';
	export let subtitle: string = '';
	export let badge: { icon?: string; text?: string } | null = null;
	export let breadcrumbs: Array<{ label: string; href: string }> = [];
	export let backgroundImage: any = null; // Sanity image object
	export let backgroundColor: string = 'linear-gradient(135deg, #ff6b35 0%, #f97316 25%, #fbbf24 50%, #f59e0b 75%, #ff6b35 100%)';
	export let overlayOpacity: number = 0.6;
	export let showScrollHint: boolean = true;
	export let height: 'full' | 'large' | 'medium' = 'full';
	
	// State
	let visible = false;
	let heroElement: HTMLElement | undefined;
	let headerHeight = 0;
	
	// Calculate actual height based on viewport minus header
	$: heightStyles = {
		full: `calc(100vh - ${headerHeight}px)`,
		large: `calc(80vh - ${headerHeight}px)`,
		medium: `calc(60vh - ${headerHeight}px)`
	};
	
	const minHeightClasses = {
		full: 'min-h-[600px]',
		large: 'min-h-[500px]',
		medium: 'min-h-[400px]'
	};
	
	onMount(() => {
		visible = true;
		
		// Get header height
		const header = document.querySelector('header, nav') as HTMLElement;
		if (header) {
			headerHeight = header.offsetHeight || 80; // Fallback to 80px
		}
	});
</script>

<!-- Breadcrumbs outside of hero section -->
{#if breadcrumbs.length > 0}
	<div class="bg-white border-b border-gray-200">
		<div class="container mx-auto px-4 py-4">
			<nav class="flex items-center space-x-2 text-sm text-gray-600" aria-label="Breadcrumb">
				<a href="/" class="hover:text-gray-900 transition-colors flex items-center gap-1">
					<Icon icon="mdi:home-outline" class="w-4 h-4" />
					<span class="hidden sm:inline">Home</span>
				</a>
				{#each breadcrumbs as crumb, index}
					<Icon icon="mdi:chevron-right" class="w-4 h-4 text-gray-400" />
					{#if index === breadcrumbs.length - 1}
						<span class="text-gray-900 font-medium">{crumb.label}</span>
					{:else}
						<a href={crumb.href} class="hover:text-gray-900 transition-colors">
							{crumb.label}
						</a>
					{/if}
				{/each}
			</nav>
		</div>
	</div>
{/if}

<section
	bind:this={heroElement}
	class="hero relative {minHeightClasses[height]} flex items-center justify-center overflow-hidden"
	style="height: {heightStyles[height]}"
	class:visible
>
	<!-- Background -->
	<div class="hero-background absolute inset-0 z-0">
		{#if backgroundImage?.asset}
			<!-- Sanity Image Background -->
			<SanityImage
				src={backgroundImage}
				alt={title}
				className="w-full h-full object-cover"
			/>
		{:else}
			<!-- Fallback gradient background -->
			<div 
				class="hero-image w-full h-full"
				style="background: {backgroundColor}; background-size: 400% 400%; animation: gradientShift 20s ease infinite;"
			></div>
		{/if}
		
		<!-- Overlay -->
		<div 
			class="hero-overlay absolute inset-0"
			style="background: linear-gradient(135deg, rgba(15, 23, 42, {overlayOpacity}) 0%, rgba(30, 41, 59, {overlayOpacity * 0.7}) 50%, rgba(15, 23, 42, {overlayOpacity * 1.2}) 100%); backdrop-filter: blur(1px);"
		></div>
	</div>
	
	<!-- Content -->
	<div class="hero-content relative z-10 container mx-auto px-4 w-full">
		<!-- Main Content -->
		<div class="text-center max-w-4xl mx-auto">
			{#if badge?.text}
				<Badge variant="outline" class="mb-6 bg-white/10 border-white/20 text-white hover:bg-white/20">
					{#if badge.icon}
						<Icon icon={badge.icon} class="w-4 h-4 mr-2" />
					{/if}
					{badge.text}
				</Badge>
			{/if}
			
			{#if title}
				<h1 class="hero-title text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
					{title}
				</h1>
			{/if}
			
			{#if subtitle}
				<p class="hero-subtitle text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed">
					{subtitle}
				</p>
			{/if}
			
			<!-- Custom slot for additional content -->
			<slot />
		</div>
	</div>
	
	<!-- Scroll Hint -->
	{#if showScrollHint}
		<div class="scroll-hint absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
			<Button variant="ghost" size="sm" class="text-white/80 hover:text-white hover:bg-white/10">
				<Icon icon="mdi:chevron-down" class="w-6 h-6" />
			</Button>
		</div>
	{/if}
</section>

<style>
	/* Hero animations */
	.hero-content {
		opacity: 0;
		transform: translateY(40px);
		transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
	}
	
	.hero.visible .hero-content {
		opacity: 1;
		transform: translateY(0);
	}
	
	/* Gradient animation */
	@keyframes gradientShift {
		0% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
		100% { background-position: 0% 50%; }
	}
	
	/* Mobile optimizations */
	@media (max-width: 768px) {
		.hero-title {
			font-size: 2.5rem !important;
		}
		
		.hero-subtitle {
			font-size: 1.25rem !important;
		}
	}
	
	@media (max-width: 480px) {
		.hero-title {
			font-size: 2rem !important;
		}
		
		.hero-subtitle {
			font-size: 1.125rem !important;
		}
	}
</style>