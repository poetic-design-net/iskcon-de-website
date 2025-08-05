<script lang="ts">
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import CTASection from '$lib/components/sections/CTASection.svelte';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import Icon from '@iconify/svelte';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let visible = false;
	let countUpStarted = false;

	onMount(() => {
		visible = true;
		// Start count-up animation after a short delay
		setTimeout(() => {
			countUpStarted = true;
		}, 500);
	});

	// Animated counter function
	function countUp(target: number, duration: number = 2000) {
		return function(node: HTMLElement) {
			if (!countUpStarted) return;
			
			const start = 0;
			const startTime = Date.now();
			
			const updateCount = () => {
				const currentTime = Date.now();
				const elapsed = currentTime - startTime;
				const progress = Math.min(elapsed / duration, 1);
				
				const current = Math.floor(start + (target - start) * progress);
				node.textContent = current.toString();
				
				if (progress < 1) {
					requestAnimationFrame(updateCount);
				} else {
					node.textContent = target.toString();
				}
			};
			
			updateCount();
		};
	}

	const globalStats = [
		{ value: 600, label: 'Tempel & Zentren', icon: 'mdi:temple-hindu', suffix: '+' },
		{ value: 100, label: 'Länder', icon: 'mdi:earth', suffix: '+' },
		{ value: 65, label: 'Farm-Projekte', icon: 'mdi:cow', suffix: '' },
		{ value: 110, label: 'Restaurants', icon: 'mdi:food', suffix: '+' }
	];

	const kontinente = [
		{
			name: 'Nordamerika',
			tempel: 150,
			laender: ['USA', 'Kanada', 'Mexiko'],
			highlights: ['New Vrindaban', 'Los Angeles Temple', 'Toronto Temple']
		},
		{
			name: 'Europa',
			tempel: 120,
			laender: ['UK', 'Deutschland', 'Italien', 'Frankreich', 'Spanien', 'Russland'],
			highlights: ['Bhaktivedanta Manor', 'Radhadesh', 'Villa Vrindavana']
		},
		{
			name: 'Asien',
			tempel: 200,
			laender: ['Indien', 'Bangladesh', 'Nepal', 'Sri Lanka', 'Thailand', 'Malaysia'],
			highlights: ['Mayapur', 'Vrindavan', 'Mumbai Temple']
		},
		{
			name: 'Südamerika',
			tempel: 80,
			laender: ['Brasilien', 'Argentinien', 'Peru', 'Chile'],
			highlights: ['Nova Gokula', 'Buenos Aires Temple']
		},
		{
			name: 'Afrika',
			tempel: 30,
			laender: ['Südafrika', 'Nigeria', 'Kenia', 'Mauritius'],
			highlights: ['Phoenix Temple', 'Lagos Center']
		},
		{
			name: 'Ozeanien',
			tempel: 20,
			laender: ['Australien', 'Neuseeland', 'Fiji'],
			highlights: ['New Govardhana', 'Auckland Temple']
		}
	];

	const globaleProjekte = [
		{
			title: 'Food for Life',
			description: 'Das weltweit größte vegetarische Essensverteilungsprogramm',
			stats: '2 Millionen+ Mahlzeiten täglich',
			icon: 'mdi:food-apple',
			link: 'https://ffl.org'
		},
		{
			title: 'Bhaktivedanta Book Trust',
			description: 'Veröffentlichung und Vertrieb vedischer Literatur',
			stats: '500 Millionen+ Bücher verteilt',
			icon: 'mdi:book-open',
			link: 'https://bbt.org'
		},
		{
			title: 'ISKCON Education',
			description: 'Schulen und Universitäten weltweit',
			stats: '50+ Bildungseinrichtungen',
			icon: 'mdi:school',
			link: null
		},
		{
			title: 'Cow Protection',
			description: 'Kuhschutz-Programme und nachhaltige Landwirtschaft',
			stats: '50+ Farmprojekte',
			icon: 'mdi:cow',
			link: null
		}
	];

	const wichtigeTempel = [
		{
			name: 'Sri Mayapur Chandrodaya Mandir',
			ort: 'Mayapur, Indien',
			beschreibung: 'Welthauptquartier von ISKCON und Geburtsort von Sri Caitanya',
			bild: '/img/mayapur-temple.jpg'
		},
		{
			name: 'Krishna-Balaram Mandir',
			ort: 'Vrindavan, Indien',
			beschreibung: 'Im heiligen Land von Krishnas Spielen',
			bild: '/img/vrindavan-temple.jpg'
		},
		{
			name: 'Bhaktivedanta Manor',
			ort: 'London, UK',
			beschreibung: 'Geschenk von George Harrison, größter Tempel Europas',
			bild: '/img/bhaktivedanta-manor.jpg'
		},
		{
			name: 'New Vrindaban',
			ort: 'West Virginia, USA',
			beschreibung: 'Prabhupadas Vision einer spirituellen Gemeinschaft im Westen',
			bild: '/img/new-vrindaban.jpg'
		}
	];
</script>

<svelte:head>
	<title>ISKCON Weltweit - ISKCON Deutschland</title>
	<meta name="description" content="ISKCON ist eine weltweite spirituelle Bewegung mit über 600 Tempeln in mehr als 100 Ländern. Entdecken Sie unsere globale Präsenz und Projekte." />
</svelte:head>

<HeroSection
	title="ISKCON Weltweit"
	subtitle="Eine globale spirituelle Familie"
	backgroundImage="/img/world-map-iskcon.jpg"
/>

{#if visible}
<section class="py-16 px-4" in:fade={{ duration: 600 }}>
	<div class="container mx-auto max-w-6xl">
		<!-- Einführung -->
		<div class="text-center mb-16">
			<Badge variant="secondary" class="mb-4">
				<Icon icon="mdi:earth" class="w-4 h-4 mr-2" />
				Seit 1966
			</Badge>
			<h2 class="text-3xl md:text-4xl font-bold mb-6">Eine weltweite Bewegung</h2>
			<p class="text-lg text-gray-700 max-w-4xl mx-auto">
				Was in einem kleinen Ladenlokal in New York begann, ist heute eine globale spirituelle 
				Bewegung mit Millionen von Praktizierenden. ISKCON verbindet Menschen aller Nationalitäten, 
				Kulturen und Hintergründe in der gemeinsamen Praxis des Krishna-Bewusstseins.
			</p>
		</div>

		<!-- Globale Statistiken -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
			{#each globalStats as stat, i}
				<div 
					class="text-center"
					in:fade={{ duration: 600, delay: i * 100 }}
				>
					<div class="w-20 h-20 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
						<Icon icon={stat.icon} class="w-10 h-10 text-primary-600" />
					</div>
					<div class="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
						{#if countUpStarted}
							<span use:countUp={stat.value}>{stat.value}</span>{stat.suffix}
						{:else}
							0{stat.suffix}
						{/if}
					</div>
					<div class="text-sm text-gray-600">{stat.label}</div>
				</div>
			{/each}
		</div>

		<!-- Kontinente -->
		<div class="mb-20">
			<h3 class="text-2xl font-bold text-center mb-10">Präsenz auf allen Kontinenten</h3>
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each kontinente as kontinent, i}
					<div in:fade={{ duration: 600, delay: i * 50 }}>
						<Card class="hover:shadow-lg transition-shadow duration-300">
							<CardHeader>
							<CardTitle class="flex items-center justify-between">
								{kontinent.name}
								<Badge variant="secondary">{kontinent.tempel} Tempel</Badge>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div class="mb-4">
								<p class="text-sm text-gray-600 mb-2">Länder:</p>
								<div class="flex flex-wrap gap-1">
									{#each kontinent.laender.slice(0, 4) as land}
										<Badge variant="outline" class="text-xs">{land}</Badge>
									{/each}
									{#if kontinent.laender.length > 4}
										<Badge variant="outline" class="text-xs">+{kontinent.laender.length - 4}</Badge>
									{/if}
								</div>
							</div>
							<div>
								<p class="text-sm text-gray-600 mb-2">Highlights:</p>
								<ul class="text-sm text-gray-700 space-y-1">
									{#each kontinent.highlights as highlight}
										<li class="flex items-start">
											<Icon icon="mdi:map-marker" class="w-4 h-4 text-primary-500 mr-1 mt-0.5 flex-shrink-0" />
											{highlight}
										</li>
									{/each}
								</ul>
							</div>
							</CardContent>
						</Card>
					</div>
				{/each}
			</div>
		</div>

		<!-- Wichtige Tempel -->
		<div class="bg-gray-50 rounded-2xl p-8 md:p-12 mb-16">
			<h3 class="text-2xl font-bold text-center mb-10">Bedeutende Tempel weltweit</h3>
			<div class="grid md:grid-cols-2 gap-8">
				{#each wichtigeTempel as tempel, i}
					<div in:fade={{ duration: 600, delay: i * 100 }}>
						<Card class="overflow-hidden hover:shadow-lg transition-shadow duration-300">
							<div class="aspect-w-16 aspect-h-9 bg-gray-200">
							<div class="flex items-center justify-center h-48">
								<Icon icon="mdi:temple-hindu" class="w-20 h-20 text-gray-400" />
							</div>
						</div>
						<CardContent class="p-6">
							<h4 class="font-semibold text-lg mb-1">{tempel.name}</h4>
							<p class="text-sm text-primary-600 mb-2">{tempel.ort}</p>
							<p class="text-sm text-gray-600">{tempel.beschreibung}</p>
							</CardContent>
						</Card>
					</div>
				{/each}
			</div>
		</div>

		<!-- Globale Projekte -->
		<div class="mb-16">
			<h3 class="text-2xl font-bold text-center mb-10">Weltweite Projekte</h3>
			<div class="grid md:grid-cols-2 gap-8">
				{#each globaleProjekte as projekt, i}
					<div in:fade={{ duration: 600, delay: i * 100 }}>
						<Card class="hover:shadow-lg transition-shadow duration-300">
							<CardContent class="p-6">
							<div class="flex items-start gap-4">
								<div class="w-14 h-14 bg-primary-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
									<Icon icon={projekt.icon} class="w-7 h-7 text-primary-600" />
								</div>
								<div class="flex-1">
									<h4 class="font-semibold text-lg mb-2">{projekt.title}</h4>
									<p class="text-sm text-gray-600 mb-3">{projekt.description}</p>
									<p class="text-sm font-medium text-primary-600 mb-3">{projekt.stats}</p>
									{#if projekt.link}
										<a 
											href={projekt.link} 
											target="_blank"
											class="inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
										>
											Mehr erfahren
											<Icon icon="mdi:open-in-new" class="w-4 h-4 ml-1" />
										</a>
									{/if}
								</div>
							</div>
							</CardContent>
						</Card>
					</div>
				{/each}
			</div>
		</div>

		<!-- Internationale Verbindungen -->
		<Card class="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
			<CardContent class="p-8 md:p-12 text-center">
				<Icon icon="mdi:web" class="w-16 h-16 text-primary-600 mx-auto mb-4" />
				<h3 class="text-2xl font-bold mb-4">Internationale Verbindungen</h3>
				<p class="text-gray-700 mb-8 max-w-3xl mx-auto">
					ISKCON ist mehr als eine Organisation - es ist eine weltweite Familie. Besuchen Sie 
					die internationale Website für detaillierte Informationen über alle Tempel, Projekte 
					und Aktivitäten weltweit.
				</p>
				<div class="flex flex-wrap gap-4 justify-center">
					<Button href="https://iskcon.org" target="_blank" variant="default" size="lg">
						<Icon icon="mdi:open-in-new" class="w-5 h-5 mr-2" />
						ISKCON International
					</Button>
					<Button href="https://iskconnews.org" target="_blank" variant="outline" size="lg">
						<Icon icon="mdi:newspaper" class="w-5 h-5 mr-2" />
						ISKCON News
					</Button>
				</div>
			</CardContent>
		</Card>
	</div>
</section>
{/if}

<!-- CTA Section -->
<CTASection
	title="Werden Sie Teil der weltweiten Familie"
	subtitle="Finden Sie ein ISKCON-Zentrum in Ihrer Nähe und erleben Sie die spirituelle Gemeinschaft"
	primaryButton={{
		text: 'Tempel in Deutschland',
		href: '/tempel',
		icon: 'mdi:temple-hindu'
	}}
	secondaryButton={{
		text: 'Unsere Geschichte',
		href: '/geschichte',
		icon: 'mdi:history'
	}}
	variant="gradient"
/>