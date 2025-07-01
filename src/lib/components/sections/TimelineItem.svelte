<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import Icon from '@iconify/svelte';
	import type { TimelineItem } from '../../../routes/bewegung/+page.d.ts';
	
	export let item: TimelineItem;
	export let index: number;
	export let totalItems: number = 1;
	
	const dispatch = createEventDispatcher();
	
	let timelineElement: HTMLElement | undefined;
	let cardElement: HTMLElement | undefined;
	let isVisible = false;
	
	function handleExpand() {
		dispatch('expand', { index, item });
	}
	
	$: isEven = index % 2 === 0;
	
	onMount(() => {
		// Simple intersection observer for card animation
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !isVisible) {
						isVisible = true;
					}
				});
			},
			{
				threshold: 0.2,
				rootMargin: '-50px 0px'
			}
		);
		
		if (cardElement) {
			observer.observe(cardElement);
		}
		
		return () => {
			if (cardElement) {
				observer.unobserve(cardElement);
			}
		};
	});
</script>

<div
	bind:this={timelineElement}
	class="timeline-item relative w-full"
	class:even={isEven}
	class:odd={!isEven}
	class:visible={isVisible}
>
	
	<!-- Year Node -->
	<div class="timeline-node absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 z-20">
		<div class="year-node-circle">
			<span class="text-white font-bold text-sm">{item.year}</span>
		</div>
		<div class="year-node-pulse"></div>
	</div>
	
	<!-- Content Card -->
	<div
		bind:this={cardElement}
		class="timeline-content relative"
		class:left-content={isEven}
		class:right-content={!isEven}
		class:animate-in={isVisible}
	>
		<!-- Connecting Line -->
		<div 
			class="connecting-line absolute top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-orange-400 to-orange-500"
			class:left-line={!isEven}
			class:right-line={isEven}
		></div>
		
		<Card class="timeline-card hover:shadow-xl transition-all duration-300 bg-white border-slate-200">
			<CardContent class="p-6">
				<!-- Image Placeholder -->
				<div class="mb-4 aspect-video bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg flex items-center justify-center border border-orange-200 overflow-hidden group">
					<div class="text-center transform transition-transform group-hover:scale-105">
						<Icon icon="mdi:image-outline" class="w-12 h-12 text-orange-400 mx-auto mb-2" />
						<p class="text-sm text-orange-600 font-medium">Bild für {item.year}</p>
						<p class="text-xs text-orange-500">Wird ergänzt</p>
					</div>
				</div>
				
				<div class="space-y-3">
					<div class="flex items-center gap-2">
						<Badge variant="secondary" class="text-xs">
							{item.year}
						</Badge>
						<div class="flex-1 h-px bg-gradient-to-r from-orange-200 to-transparent"></div>
					</div>
					
					<h3 class="text-xl font-medium text-slate-900 leading-tight">
						{item.title}
					</h3>
					
					<p class="text-slate-600 leading-relaxed">
						{item.description}
					</p>
					
					{#if item.expanded}
						<div class="mt-4 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
							<p class="text-sm text-slate-500 italic">
								Weitere Details werden hier angezeigt...
							</p>
						</div>
					{/if}
					
					<button
						class="mt-4 text-orange-600 hover:text-orange-700 hover:bg-orange-50 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1"
						on:click={handleExpand}
					>
						{item.expanded ? 'Weniger anzeigen' : 'Mehr erfahren'}
						<Icon
							icon="mdi:chevron-down"
							class="w-4 h-4 transition-transform duration-200 {item.expanded ? 'rotate-180' : ''}"
						/>
					</button>
				</div>
			</CardContent>
		</Card>
	</div>
</div>

<style>
	.timeline-item {
		position: relative;
		display: flex;
		align-items: center;
		margin-bottom: 6rem;
		width: 100%;
		min-height: 300px;
	}

	.timeline-item.even {
		justify-content: flex-start;
	}

	.timeline-item.odd {
		justify-content: flex-end;
	}

	.timeline-content {
		width: 45%;
		z-index: 10;
		opacity: 0;
		transform: translateY(30px);
		transition: opacity 0.8s ease-out, transform 0.8s ease-out;
	}
	
	.timeline-content.animate-in {
		opacity: 1;
		transform: translateY(0);
	}

	/* Staggered animation for even/odd items */
	.timeline-content.left-content {
		margin-right: 5%;
		transform: translateX(-30px) translateY(30px);
	}
	
	.timeline-content.right-content {
		margin-left: 5%;
		transform: translateX(30px) translateY(30px);
	}
	
	.timeline-content.left-content.animate-in {
		transform: translateX(0) translateY(0);
	}
	
	.timeline-content.right-content.animate-in {
		transform: translateX(0) translateY(0);
	}

	.year-node-circle {
		width: 4rem;
		height: 4rem;
		background: linear-gradient(135deg, #f97316, #ea580c);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
		border: 4px solid white;
		position: relative;
		z-index: 2;
		transition: transform 0.3s ease;
	}
	
	.timeline-item:hover .year-node-circle {
		transform: scale(1.1);
	}

	.year-node-pulse {
		position: absolute;
		inset: -4px;
		background: #f97316;
		border-radius: 50%;
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
		opacity: 0.2;
	}

	@keyframes pulse {
		0%, 100% {
			transform: scale(1);
			opacity: 0.2;
		}
		50% {
			transform: scale(1.2);
			opacity: 0.1;
		}
	}
	
	/* Remove timeline-line styles since they're now in the parent Timeline component */

	/* Connecting lines - now properly centered */
	.connecting-line {
		width: 0;
		transform-origin: left center;
		transition: width 0.5s ease-out;
	}
	
	.timeline-item.visible .connecting-line {
		width: 3rem;
	}
	
	.connecting-line.left-line {
		right: 100%;
		margin-right: 1rem;
		background: linear-gradient(to left, #fb923c, #f97316);
	}
	
	.connecting-line.right-line {
		left: 100%;
		margin-left: 1rem;
		background: linear-gradient(to right, #fb923c, #f97316);
	}

	/* Card hover effects */
	.timeline-card {
		transform: translateZ(0);
		will-change: transform, box-shadow;
	}
	
	.timeline-card:hover {
		transform: translateY(-4px) translateZ(0);
	}

	/* Performance optimizations */
	.timeline-line-progress {
		will-change: height;
		transform: translateZ(0);
	}

	/* Mobile responsive */
	@media (max-width: 768px) {
		.timeline-item {
			flex-direction: column !important;
			justify-content: center !important;
			align-items: flex-start;
			margin-bottom: 4rem;
		}
		
		.timeline-line {
			left: 2rem !important;
			transform: translateX(-50%) !important;
		}
		
		.timeline-node {
			left: 2rem !important;
			top: 3rem !important;
			transform: translateX(-50%) translateY(-50%) !important;
		}
		
		.timeline-content {
			width: calc(100% - 5rem);
			margin-left: 5rem !important;
			margin-right: 0 !important;
			margin-top: 1rem;
		}
		
		.connecting-line {
			top: 3rem !important;
			transform: translateY(-50%) !important;
		}
		
		.connecting-line.left-line,
		.connecting-line.right-line {
			right: 100% !important;
			left: auto !important;
			margin-right: 1rem !important;
			margin-left: 0 !important;
			background: linear-gradient(to left, #fb923c, #f97316) !important;
		}
		
		.timeline-item.visible .connecting-line {
			width: 2rem;
		}
	}

	@media (max-width: 480px) {
		.timeline-content {
			width: calc(100% - 4rem);
			margin-left: 4rem !important;
		}
		
		.timeline-node {
			left: 1.5rem !important;
		}
		
		.timeline-line {
			left: 1.5rem !important;
		}
		
		.timeline-item.visible .connecting-line {
			width: 1.5rem;
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.timeline-line-progress {
			transition: none !important;
		}
		
		.timeline-content {
			transition: none !important;
		}
		
		.year-node-pulse {
			animation: none !important;
		}
		
		.connecting-line {
			transition: none !important;
		}
	}
</style>