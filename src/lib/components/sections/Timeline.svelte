<script lang="ts">
	import { onMount } from 'svelte';
	import TimelineItem from './TimelineItem.svelte';
	import type { TimelineItem as TimelineItemType } from '../../../routes/bewegung/+page.d.ts';
	
	export let items: TimelineItemType[] = [];
	
	let timelineContainer: HTMLElement | undefined;
	let lineProgress = 0;
	let scrollHandler: () => void;
	
	onMount(() => {
		// Create a single scroll handler for the entire timeline
		scrollHandler = () => {
			if (!timelineContainer) return;
			
			const rect = timelineContainer.getBoundingClientRect();
			const viewportHeight = window.innerHeight;
			
			// Calculate progress based on how much of the timeline has been scrolled
			const scrolledIntoView = viewportHeight - rect.top;
			const totalHeight = rect.height + viewportHeight;
			const progress = Math.max(0, Math.min(1, scrolledIntoView / totalHeight));
			
			lineProgress = progress * 100;
		};
		
		// Initial calculation
		scrollHandler();
		
		// Add scroll listener with passive flag for better performance
		window.addEventListener('scroll', scrollHandler, { passive: true });
		
		return () => {
			window.removeEventListener('scroll', scrollHandler);
		};
	});
</script>

<div bind:this={timelineContainer} class="timeline-container relative">
	<!-- Single continuous timeline line -->
	<div class="timeline-line absolute left-1/2 transform -translate-x-1/2 w-1 top-0 bottom-0 z-10">
		<!-- Background line -->
		<div class="absolute inset-0 bg-gray-200"></div>
		<!-- Animated progress line -->
		<div 
			class="timeline-line-progress absolute inset-x-0 top-0 bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600"
			style="height: {lineProgress}%; transition: height 0.1s ease-out;"
		></div>
	</div>
	
	<!-- Timeline items -->
	<div class="timeline-items relative">
		{#each items as item, index (item.year)}
			<TimelineItem 
				{item} 
				{index}
				totalItems={items.length}
				on:expand
			/>
		{/each}
	</div>
</div>

<style>
	.timeline-container {
		position: relative;
		padding: 3rem 0;
	}
	
	.timeline-line {
		min-height: 100%;
	}
	
	.timeline-line-progress {
		will-change: height;
		transform: translateZ(0);
		transform-origin: top;
	}
	
	@media (max-width: 768px) {
		.timeline-line {
			left: 2rem !important;
		}
	}
	
	@media (max-width: 480px) {
		.timeline-line {
			left: 1.5rem !important;
		}
	}
</style>