<script lang="ts">
	import { onMount } from 'svelte';
	
	export let end: number;
	export let duration: number = 2000;
	export let suffix: string = '';
	export let visible: boolean = false;
	export let useThousandsSeparator: boolean = true;
	
	let displayValue = 0;
	let started = false;
	
	$: if (visible && !started) {
		started = true;
		startAnimation();
	}
	
	function easeOutCubic(t: number): number {
		return 1 - Math.pow(1 - t, 3);
	}
	
	function startAnimation() {
		const startTime = Date.now();
		const startValue = 0;
		
		function animate() {
			const elapsed = Date.now() - startTime;
			const progress = Math.min(elapsed / duration, 1);
			
			const easedProgress = easeOutCubic(progress);
			displayValue = Math.round(startValue + (end - startValue) * easedProgress);
			
			if (progress < 1) {
				requestAnimationFrame(animate);
			} else {
				displayValue = end;
			}
		}
		
		animate();
	}
	
	$: formattedValue = useThousandsSeparator
		? displayValue.toLocaleString('de-DE') + suffix
		: displayValue.toString() + suffix;
</script>

<div class="count-up" class:visible>
	<span class="number">{formattedValue}</span>
</div>

<style>
	.count-up {
		opacity: 0;
		transform: scale(0.8);
		transition: all 0.6s ease-out;
	}
	
	.count-up.visible {
		opacity: 1;
		transform: scale(1);
	}
	
	.number {
		font-size: 3rem;
		font-weight: 500;
		display: block;
		margin-bottom: 0.5rem;
	}
	
	@media (max-width: 768px) {
		.number {
			font-size: 2.5rem;
		}
	}
</style>