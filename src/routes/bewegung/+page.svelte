<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import CountUp from '$lib/components/sections/CountUp.svelte';
	import Timeline from '$lib/components/sections/Timeline.svelte';
	import PrincipleCard from '$lib/components/sections/PrincipleCard.svelte';
	import PageHero from '$lib/components/sections/PageHero.svelte';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import Icon from '@iconify/svelte';

	export let data: PageData;

	let sectionsVisible = new Set<string>();

	onMount(() => {
		// Intersection Observer für Scroll-Animationen
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const sectionId = entry.target.id;
						sectionsVisible.add(sectionId);
						sectionsVisible = sectionsVisible; // Trigger reactivity
					}
				});
			},
			{ threshold: 0.3 }
		);

		// Alle Sektionen beobachten
		document.querySelectorAll('section[id]').forEach((section) => {
			observer.observe(section);
		});

		return () => observer.disconnect();
	});

	// Timeline Item expand handler
	function handleExpand(event: CustomEvent<{ index: number }>) {
		const { index } = event.detail;
		data.timeline[index].expanded = !data.timeline[index].expanded;
		data.timeline = data.timeline; // Trigger reactivity
	}
</script>

<svelte:head>
	<title>{data.page.title} | ISKCON Deutschland</title>
	<meta name="description" content={data.page.description} />
	<meta property="og:title" content={data.page.title} />
	<meta property="og:description" content={data.page.description} />
	<meta property="og:type" content="website" />
</svelte:head>

<!-- Hero Section -->
<PageHero
	title={data.page.title}
	subtitle={data.page.subtitle || data.page.description}
	badge={{ icon: 'mdi:lotus', text: 'Spirituelle Gemeinschaft' }}
	breadcrumbs={[{ label: 'Über die Bewegung', href: '/bewegung' }]}
	backgroundImage={data.page.heroImage}
	showScrollHint={true}
/>

<!-- Einführung: Was ist ISKCON? -->
<section id="introduction" class="py-16 md:py-24 bg-white" class:visible={sectionsVisible.has('introduction')}>
	<div class="container mx-auto px-4">
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
			<div class="lg:col-span-2 space-y-6">
				<div class="space-y-4">
					<Badge variant="secondary" class="mb-4">
						<Icon icon="mdi:history" class="w-4 h-4 mr-2" />
						Geschichte
					</Badge>
					<h2 class="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
						Eine spirituelle Revolution
					</h2>
				</div>
				
				<Card class="border border-slate-200">
					<CardContent class="p-6">
						<p class="text-lg md:text-xl text-slate-700 font-medium leading-relaxed mb-4">
							Am 17. September 1965 betrat ein 69-jähriger Mönch namens A.C. Bhaktivedanta Swami
							Prabhupada mit sieben Dollar und einer Kiste voller Bücher amerikanischen Boden.
						</p>
						
						<p class="text-slate-600 leading-relaxed mb-4">
							Was als bescheidene Mission eines einzelnen Mannes begann, entwickelte sich zur
							International Society for Krishna Consciousness (ISKCON) – einer globalen spirituellen
							Bewegung, die heute in der DACH-Region über 6.000 Praktizierende zählt.
						</p>
						
						<p class="text-slate-600 leading-relaxed">
							Die Hare Krishna Bewegung repräsentiert die größte Strömung des Gaudiya-Vaishnavismus
							im Westen, einer 500 Jahre alten monotheistischen Tradition innerhalb des Hinduismus.
						</p>
					</CardContent>
				</Card>
				
				<Button variant="outline" class="group">
					<Icon icon="mdi:book-open-page-variant" class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
					<a href="/philosophie" class="flex items-center">
						Mehr zur Philosophie
						<Icon icon="mdi:arrow-right" class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
					</a>
				</Button>
			</div>
			
			<Card class="border border-slate-200">
				<CardContent class="p-6">
					<div class="flex items-center gap-3 mb-4">
						<div class="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
							<Icon icon="mdi:information" class="w-5 h-5 text-white" />
						</div>
						<h3 class="text-lg font-medium text-slate-900">ISKCON steht für</h3>
					</div>
					
					<p class="font-medium mb-4 text-orange-600">
						International Society for Krishna Consciousness
					</p>
					
					<Separator class="mb-4" />
					
					<ul class="space-y-3 text-sm text-slate-600">
						<li class="flex items-center gap-2">
							<Icon icon="mdi:calendar" class="w-4 h-4 text-orange-500 flex-shrink-0" />
							Gegründet 1966 in New York
						</li>
						<li class="flex items-center gap-2">
							<Icon icon="mdi:earth" class="w-4 h-4 text-orange-500 flex-shrink-0" />
							Über 600 Zentren weltweit
						</li>
						<li class="flex items-center gap-2">
							<Icon icon="mdi:map-marker" class="w-4 h-4 text-orange-500 flex-shrink-0" />
							In Deutschland seit 1969
						</li>
					</ul>
				</CardContent>
			</Card>
		</div>
	</div>
</section>

<!-- Zahlen & Fakten -->
<section id="stats" class="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900" class:visible={sectionsVisible.has('stats')}>
	<div class="container mx-auto px-4">
		<div class="text-center mb-12">
			<Badge variant="outline" class="mb-4 bg-white/10 border-white/20 text-white">
				<Icon icon="mdi:chart-line" class="w-4 h-4 mr-2" />
				Unsere Reichweite
			</Badge>
			<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
				ISKCON in Zahlen
			</h2>
			<p class="text-white/80 max-w-2xl mx-auto">
				Eine globale Bewegung mit lokaler Präsenz und weltweiter Wirkung
			</p>
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-{Math.min(4, data.featuredStats?.length || 4)} gap-6">
			{#each data.featuredStats || [] as statItem (statItem._id)}
				<Card class="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group">
					<CardContent class="p-6 text-center">
						<div class="mb-6">
							<div class="w-16 h-16 bg-orange-400/20 rounded-full flex items-center justify-center mx-auto group-hover:bg-orange-400/30 transition-colors">
								<Icon
									icon={statItem.icon ? (statItem.icon.startsWith('mdi:') ? statItem.icon : `mdi:${statItem.icon}`) : 'mdi:chart-line'}
									class="w-8 h-8 text-orange-400"
								/>
							</div>
						</div>
						<div class="stat-number text-5xl font-bold text-orange-400 mb-3">
							{#if statItem.category === 'time'}
								<CountUp end={statItem.value} suffix={statItem.unit || ''} visible={sectionsVisible.has('stats')} useThousandsSeparator={false} />
							{:else}
								<CountUp end={statItem.value} suffix={statItem.unit || ''} visible={sectionsVisible.has('stats')} />
							{/if}
						</div>
						<div class="text-white/80 text-sm font-medium uppercase tracking-wider">{statItem.title}</div>
						{#if statItem.description}
							<div class="text-white/60 text-xs mt-2">{statItem.description}</div>
						{/if}
					</CardContent>
				</Card>
			{/each}
		</div>
	</div>
</section>

<!-- Timeline: Geschichte der Bewegung -->
<section id="timeline" class="py-16 md:py-24 bg-slate-50" class:visible={sectionsVisible.has('timeline')}>
	<div class="container mx-auto px-4">
		<div class="text-center mb-16">
			<Badge variant="secondary" class="mb-4">
				<Icon icon="mdi:timeline-clock" class="w-4 h-4 mr-2" />
				Unsere Geschichte
			</Badge>
			<h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
				Von New York nach Neu-Vrindavan
			</h2>
			
			<Card class="max-w-4xl mx-auto bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
				<CardContent class="p-6 md:p-8">
					<p class="text-slate-700 leading-relaxed md:text-lg">
						Die Geschichte von ISKCON beginnt mit Abhay Charan De, geboren 1896 in Kalkutta. 
						Nach seinem ersten Treffen mit seinem spirituellen Meister erhielt er den Auftrag, 
						Krishna-Bewusstsein in die englischsprachige Welt zu tragen.
					</p>
				</CardContent>
			</Card>
		</div>
		
		<div class="max-w-6xl mx-auto">
			<Timeline
				items={data.timeline}
				on:expand={handleExpand}
			/>
		</div>
		
		<div class="text-center mt-12">
			<Button class="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 text-lg">
				<Icon icon="mdi:book-open-page-variant" class="w-5 h-5 mr-2" />
				<a href="/geschichte" class="flex items-center">
					Vollständige Geschichte erkunden
				</a>
			</Button>
		</div>
	</div>
</section>

<!-- Philosophie & Praxis Überblick -->
<section id="philosophy" class="py-16 md:py-24 bg-white" class:visible={sectionsVisible.has('philosophy')}>
	<div class="container mx-auto px-4">
		<div class="text-center mb-16">
			<Badge variant="secondary" class="mb-4">
				<Icon icon="mdi:meditation" class="w-4 h-4 mr-2" />
				Spirituelle Praxis
			</Badge>
			<h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
				Bhakti-Yoga: Der Weg der Hingabe
			</h2>
			<p class="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">
				Im Kern der Bewegung steht die Gaudiya-Vaishnava Philosophie - eine 500 Jahre alte 
				Tradition, die auf der Bhagavad-gita und anderen vedischen Schriften basiert.
			</p>
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
			{#each data.principles as principle, index (principle.title)}
				<PrincipleCard {principle} {index} />
			{/each}
		</div>
		
		<div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
			<Button variant="outline" size="lg" class="group">
				<Icon icon="mdi:book-open-page-variant" class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
				<a href="/philosophie" class="flex items-center">
					Philosophie vertiefen
					<Icon icon="mdi:arrow-right" class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
				</a>
			</Button>
			<Button variant="outline" size="lg" class="group">
				<Icon icon="mdi:hands-pray" class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
				<a href="/praxis" class="flex items-center">
					Praxis erkunden
					<Icon icon="mdi:arrow-right" class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
				</a>
			</Button>
		</div>
	</div>
</section>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}

	/* Section animations */
	section {
		opacity: 1;
		transform: translateY(0);
	}

	section.visible {
		opacity: 1;
		transform: translateY(0);
	}

	/* Custom utility classes for better spacing */
	:global(.prose) {
		max-width: none;
	}

	:global(.prose p) {
		margin-bottom: 1rem;
	}
</style>