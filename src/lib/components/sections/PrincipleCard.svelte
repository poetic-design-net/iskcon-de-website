<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card';
	import Icon from '@iconify/svelte';
	import type { PrincipleCard } from '../../../routes/bewegung/+page.d.ts';
	
	export let principle: PrincipleCard;
	export let index: number;
	
	// Map principle icons to iconify icons
	const iconMap: Record<string, string> = {
		'lotus': 'mdi:lotus',
		'heart': 'mdi:heart',
		'sun': 'mdi:white-balance-sunny',
		'tree': 'mdi:tree',
		'default': 'mdi:information'
	};
	
	$: iconName = iconMap[principle.icon] || iconMap.default;
</script>

<div class="principle-card group">
	<Card class="h-full border-slate-200 hover:border-orange-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
		<CardContent class="p-6 text-center h-full flex flex-col">
			<!-- Icon Container -->
			<div class="relative w-16 h-16 mx-auto mb-6">
				<div class="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
				<div class="absolute inset-0 flex items-center justify-center">
					<Icon 
						icon={iconName} 
						class="w-8 h-8 text-orange-500 group-hover:text-orange-600 group-hover:scale-110 transition-all duration-300" 
					/>
				</div>
			</div>
			
			<!-- Text Content -->
			<div class="flex-1 space-y-3">
				<h3 class="text-xl font-medium text-slate-900 group-hover:text-orange-600 transition-colors duration-300">
					{principle.title}
				</h3>
				<p class="text-slate-600 leading-relaxed text-sm">
					{principle.text}
				</p>
			</div>
			
			<!-- Bottom Accent Line -->
			<div class="mt-4 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
		</CardContent>
	</Card>
</div>

<style>
	.principle-card {
		opacity: 1;
		transform: translateY(0);
	}
</style>