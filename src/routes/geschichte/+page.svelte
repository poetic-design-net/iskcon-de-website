<script lang="ts">
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import Timeline from '$lib/components/sections/Timeline.svelte';
	import CTASection from '$lib/components/sections/CTASection.svelte';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import Icon from '@iconify/svelte';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import type { TimelineItem } from '../bewegung/+page.d.ts';

	let visible = false;

	onMount(() => {
		visible = true;
	});

	// Historische Timeline-Daten
	const timelineData: TimelineItem[] = [
		{
			year: 1965,
			title: 'Die Reise beginnt',
			description: 'A.C. Bhaktivedanta Swami Prabhupada reist im Alter von 69 Jahren mit dem Frachtschiff Jaladuta nach Amerika.',
			details: [
				'35 Tage auf See mit zwei Herzinfarkten',
				'Ankunft in Boston am 17. September',
				'Nur 7 Dollar und eine Kiste voller Bücher im Gepäck'
			],
			image: '/img/prabhupada-jaladuta.jpg',
			expanded: false
		},
		{
			year: 1966,
			title: 'Gründung von ISKCON',
			description: 'Am 13. Juli wird die International Society for Krishna Consciousness in New York offiziell registriert.',
			details: [
				'Erster Tempel in der Lower East Side',
				'Erste westliche Schüler nehmen Einweihung',
				'Beginn der Kirtan-Revolution im Tompkins Square Park'
			],
			image: '/img/iskcon-founding.jpg',
			expanded: false
		},
		{
			year: 1968,
			title: 'Expansion nach Europa',
			description: 'Die ersten Devotees reisen nach London und beginnen die europäische Mission.',
			details: [
				'George Harrison und die Beatles zeigen Interesse',
				'Erste öffentliche Programme in London',
				'Gründung des Radha-Krishna Tempels'
			],
			image: '/img/london-temple.jpg',
			expanded: false
		},
		{
			year: 1969,
			title: 'Deutschland wird erreicht',
			description: 'Erste ISKCON-Devotees kommen nach Hamburg und beginnen mit der Predigt.',
			details: [
				'Straßen-Sankirtana in Hamburg',
				'Erste deutsche Interessenten',
				'Verteilung der Bhagavad-gita'
			],
			expanded: false
		},
		{
			year: 1970,
			title: 'Erster deutscher Tempel',
			description: 'ISKCON eröffnet das erste offizielle Zentrum in Hamburg.',
			details: [
				'Tägliche Programme beginnen',
				'Erste deutsche Devotees',
				'Prasadam-Verteilung startet'
			],
			expanded: false
		},
		{
			year: 1974,
			title: 'Schloss Rettershof',
			description: 'ISKCON erwirbt Schloss Rettershof im Taunus als europäisches Hauptquartier.',
			details: [
				'Srila Prabhupada besucht Deutschland',
				'Gurukula (Schule) wird gegründet',
				'Zentrum für ganz Europa etabliert'
			],
			image: '/img/rettershof.jpg',
			expanded: false
		},
		{
			year: 1977,
			title: 'Srila Prabhupadas Vermächtnis',
			description: 'Nach dem Verscheiden des Gründers setzt sich die Bewegung fort.',
			details: [
				'GBC übernimmt die Führung',
				'Fortsetzung der Mission weltweit',
				'Bewahrung der spirituellen Standards'
			],
			expanded: false
		},
		{
			year: 1990,
			title: 'Nava Jiyada Nrsimha Ksetra',
			description: 'Gründung der Bauerngemeinde in Jandelsbrunn, Bayern.',
			details: [
				'Selbstversorgung und einfaches Leben',
				'Kuhschutz-Programm',
				'Ökologische Landwirtschaft'
			],
			expanded: false
		},
		{
			year: 2000,
			title: 'Simhachalam Tempel',
			description: 'Eröffnung des prächtigen Tempels in Jandelsbrunn.',
			details: [
				'Größter ISKCON-Tempel in Deutschland',
				'Tägliche Tempelzeremonien',
				'Pilgerstätte für Devotees'
			],
			image: '/img/simhachalam.jpg',
			expanded: false
		},
		{
			year: 2020,
			title: 'Digitale Transformation',
			description: 'ISKCON passt sich der modernen Zeit an.',
			details: [
				'Online-Programme während COVID-19',
				'Virtuelle Tempelbesuche',
				'Digitale Bildungsangebote'
			],
			expanded: false
		},
		{
			year: 2024,
			title: 'ISKCON heute',
			description: 'Eine lebendige Gemeinschaft mit über 6.000 Praktizierenden in der DACH-Region.',
			details: [
				'Aktive Zentren in mehreren Städten',
				'Vielfältige spirituelle Programme',
				'Wachsende junge Generation'
			],
			expanded: false
		}
	];

	// Timeline expand handler
	function handleExpand(event: CustomEvent<{ index: number }>) {
		const { index } = event.detail;
		timelineData[index].expanded = !timelineData[index].expanded;
		timelineData[index] = timelineData[index]; // Trigger reactivity
	}

	const epochen = [
		{
			title: 'Die Gründerjahre (1965-1977)',
			description: 'Srila Prabhupadas Mission und die Etablierung von ISKCON',
			icon: 'mdi:sprout',
			highlights: ['Gründung in New York', 'Weltweite Expansion', 'Erste Tempel']
		},
		{
			title: 'Konsolidierung (1978-1990)',
			description: 'Aufbau stabiler Strukturen und Gemeinden',
			icon: 'mdi:home-group',
			highlights: ['GBC-Führung', 'Gemeindeaufbau', 'Bildungsprogramme']
		},
		{
			title: 'Moderne Entwicklung (1991-heute)',
			description: 'Anpassung an die moderne Gesellschaft',
			icon: 'mdi:rocket-launch',
			highlights: ['Digitalisierung', 'Interfaith Dialog', 'Soziale Projekte']
		}
	];
</script>

<svelte:head>
	<title>Geschichte - ISKCON Deutschland</title>
	<meta name="description" content="Die Geschichte von ISKCON - von Srila Prabhupadas Ankunft in Amerika 1965 bis zur heutigen weltweiten Bewegung mit über 600 Tempeln." />
</svelte:head>

<HeroSection
	title="Unsere Geschichte"
	subtitle="Von einer Vision zur weltweiten spirituellen Bewegung"
	backgroundImage="/img/historical-iskcon.jpg"
/>

{#if visible}
<section class="py-16 px-4" in:fade={{ duration: 600 }}>
	<div class="container mx-auto max-w-6xl">
		<!-- Einführung -->
		<div class="text-center mb-16">
			<h2 class="text-3xl md:text-4xl font-bold mb-6">Eine spirituelle Revolution</h2>
			<p class="text-lg text-gray-700 max-w-4xl mx-auto">
				Was 1965 mit der mutigen Reise eines 69-jährigen Mönchs begann, entwickelte sich zu einer 
				der bedeutendsten spirituellen Bewegungen des 20. Jahrhunderts. Die Geschichte von ISKCON 
				ist eine Geschichte von Hingabe, Ausdauer und der transformierenden Kraft des Bhakti-Yoga.
			</p>
		</div>

		<!-- Epochen Übersicht -->
		<div class="grid md:grid-cols-3 gap-8 mb-20">
			{#each epochen as epoche, i}
				<div in:fade={{ duration: 600, delay: i * 100 }}>
					<Card class="hover:shadow-lg transition-shadow duration-300">
						<CardContent class="p-6">
						<div class="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mb-4">
							<Icon icon={epoche.icon} class="w-6 h-6 text-primary-600" />
						</div>
						<h3 class="text-xl font-semibold mb-3">{epoche.title}</h3>
						<p class="text-gray-600 mb-4">{epoche.description}</p>
						<ul class="space-y-1">
							{#each epoche.highlights as highlight}
								<li class="flex items-start text-sm text-gray-700">
									<Icon icon="mdi:check" class="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
									{highlight}
								</li>
							{/each}
						</ul>
						</CardContent>
					</Card>
				</div>
			{/each}
		</div>

		<!-- Timeline -->
		<div class="mb-20">
			<h2 class="text-3xl font-bold text-center mb-12">Meilensteine unserer Geschichte</h2>
			<Timeline items={timelineData} on:expand={handleExpand} />
		</div>

		<!-- Historisches Erbe -->
		<div class="bg-gray-50 rounded-2xl p-8 md:p-12 mb-16">
			<h2 class="text-2xl font-bold mb-6 text-center">Unser historisches Erbe</h2>
			<div class="grid md:grid-cols-2 gap-8">
				<div>
					<h3 class="text-lg font-semibold mb-3 text-primary-600">Spirituelle Tradition</h3>
					<p class="text-gray-700 mb-4">
						ISKCON steht in der jahrtausendealten Tradition des Gaudiya-Vaishnavismus, 
						die durch Sri Caitanya Mahaprabhu im 16. Jahrhundert wiederbelebt wurde.
					</p>
					<Button href="/philosophie/guru-schulernachfolge" variant="outline" size="sm">
						<Icon icon="mdi:arrow-right" class="w-4 h-4 mr-2" />
						Mehr zur Tradition
					</Button>
				</div>
				<div>
					<h3 class="text-lg font-semibold mb-3 text-primary-600">Globale Auswirkung</h3>
					<p class="text-gray-700 mb-4">
						Heute ist ISKCON in über 100 Ländern vertreten, betreibt mehr als 600 Tempel 
						und hat Millionen von Menschen mit der vedischen Philosophie bekannt gemacht.
					</p>
					<Button href="/iskcon-weltweit" variant="outline" size="sm">
						<Icon icon="mdi:earth" class="w-4 h-4 mr-2" />
						ISKCON weltweit
					</Button>
				</div>
			</div>
		</div>
	</div>
</section>
{/if}

<!-- CTA Section -->
<CTASection
	title="Erfahren Sie mehr über unseren Gründer"
	subtitle="Entdecken Sie das außergewöhnliche Leben von Srila Prabhupada"
	primaryButton={{
		text: 'Srila Prabhupada kennenlernen',
		href: '/srila-prabhupada',
		icon: 'mdi:heart'
	}}
	secondaryButton={{
		text: 'Die Bewegung heute',
		href: '/bewegung',
		icon: 'mdi:account-group'
	}}
	variant="gradient"
/>