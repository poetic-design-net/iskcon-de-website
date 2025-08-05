<script lang="ts">
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import QuoteCarousel from '$lib/components/sections/QuoteCarousel.svelte';
	import CTASection from '$lib/components/sections/CTASection.svelte';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import Icon from '@iconify/svelte';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let visible = false;

	onMount(() => {
		visible = true;
	});

	const quotes = [
		{
			text: "Der Prozess ist sehr einfach: Man muss nur von einer echten Autorität hören.",
			author: "Srila Prabhupada",
			source: "Bhagavad-gita Wie Sie Ist"
		},
		{
			text: "Wahre Liebe bedeutet, dass man immer an das Wohlergehen des Geliebten denkt.",
			author: "Srila Prabhupada",
			source: "Vorlesung, 1972"
		},
		{
			text: "Krishna-Bewusstsein ist nicht künstlich auferlegt. Es ist bereits in jedem vorhanden.",
			author: "Srila Prabhupada",
			source: "Die Lehren Sri Caitanyas"
		},
		{
			text: "Chante Hare Krishna und sei glücklich!",
			author: "Srila Prabhupada",
			source: "Brief an Schüler"
		}
	];

	const lebensstationen = [
		{
			jahr: "1896",
			titel: "Geburt in Kalkutta",
			text: "Am 1. September wird Abhay Charan De in eine fromme bengalische Familie geboren."
		},
		{
			jahr: "1922",
			titel: "Begegnung mit dem spirituellen Meister",
			text: "Trifft Srila Bhaktisiddhanta Sarasvati Thakura, der ihm aufträgt, Krishna-Bewusstsein im Westen zu predigen."
		},
		{
			jahr: "1944",
			titel: "Beginn der Schreibtätigkeit",
			text: "Startet die Zeitschrift 'Back to Godhead' und beginnt mit der Übersetzung vedischer Schriften."
		},
		{
			jahr: "1959",
			titel: "Annahme der Entsagung",
			text: "Nimmt die Lebensordnung des Sannyasa an und erhält den Namen Bhaktivedanta Swami."
		},
		{
			jahr: "1965",
			titel: "Reise nach Amerika",
			text: "Mit 69 Jahren reist er allein nach New York, um seine Mission zu erfüllen."
		},
		{
			jahr: "1966",
			titel: "Gründung von ISKCON",
			text: "Etabliert die International Society for Krishna Consciousness in New York."
		},
		{
			jahr: "1968-1977",
			titel: "Weltweite Expansion",
			text: "Reist 14 Mal um die Welt, gründet über 100 Tempel und schreibt über 70 Bücher."
		},
		{
			jahr: "1977",
			titel: "Vermächtnis",
			text: "Am 14. November verweilt er in Vrindavan und hinterlässt eine weltweite spirituelle Bewegung."
		}
	];

	const buecher = [
		{
			titel: "Bhagavad-gītā Wie Sie Ist",
			beschreibung: "Die wichtigste heilige Schrift des Hinduismus mit autoritativen Kommentaren",
			icon: "mdi:book-heart"
		},
		{
			titel: "Śrīmad-Bhāgavatam",
			beschreibung: "Das 'reife Frücht' der vedischen Literatur in 30 Bänden",
			icon: "mdi:book-multiple"
		},
		{
			titel: "Śrī Caitanya-caritāmṛta",
			beschreibung: "Das Leben und die Lehren Sri Caitanya Mahaprabhus",
			icon: "mdi:book-open-page-variant"
		},
		{
			titel: "Der Nektar der Hingabe",
			beschreibung: "Die vollständige Wissenschaft des Bhakti-Yoga",
			icon: "mdi:water"
		}
	];

	const vermaechtnis = [
		{
			zahl: "70+",
			text: "Bücher geschrieben",
			icon: "mdi:book-edit"
		},
		{
			zahl: "100+",
			text: "Tempel gegründet",
			icon: "mdi:temple-hindu"
		},
		{
			zahl: "14x",
			text: "Um die Welt gereist",
			icon: "mdi:earth"
		},
		{
			zahl: "10.000+",
			text: "Schüler eingeweiht",
			icon: "mdi:account-group"
		}
	];
</script>

<svelte:head>
	<title>Srila Prabhupada - ISKCON Deutschland</title>
	<meta name="description" content="A.C. Bhaktivedanta Swami Prabhupada - Der Gründer-Acharya von ISKCON. Sein Leben, seine Lehren und sein spirituelles Vermächtnis." />
</svelte:head>

<HeroSection
	title="Śrīla Prabhupāda"
	subtitle="Gründer-Ācārya der Internationalen Gesellschaft für Krishna-Bewusstsein"
	backgroundImage="/img/srila-prabhupada-hero.jpg"
/>

{#if visible}
<section class="py-16 px-4" in:fade={{ duration: 600 }}>
	<div class="container mx-auto max-w-6xl">
		<!-- Einführung -->
		<div class="text-center mb-16">
			<Badge variant="secondary" class="mb-4">
				<Icon icon="mdi:heart" class="w-4 h-4 mr-2" />
				1896 - 1977
			</Badge>
			<h2 class="text-3xl md:text-4xl font-bold mb-6">Ein Leben der Hingabe</h2>
			<p class="text-lg text-gray-700 max-w-4xl mx-auto">
				A.C. Bhaktivedanta Swami Prabhupada, liebevoll Śrīla Prabhupāda genannt, brachte die zeitlose 
				Weisheit des Krishna-Bewusstseins in die westliche Welt. Seine außergewöhnliche Hingabe und 
				unermüdliche Arbeit schufen eine spirituelle Revolution, die Millionen von Leben berührte.
			</p>
		</div>

		<!-- Biografie Timeline -->
		<div class="mb-20">
			<h3 class="text-2xl font-bold text-center mb-10">Lebensstationen</h3>
			<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
				{#each lebensstationen as station, i}
					<div 
						class="relative"
						in:fade={{ duration: 600, delay: i * 50 }}
					>
						<Card class="h-full hover:shadow-lg transition-shadow duration-300">
							<CardContent class="p-6">
								<div class="text-primary-600 font-bold text-xl mb-2">{station.jahr}</div>
								<h4 class="font-semibold mb-2">{station.titel}</h4>
								<p class="text-sm text-gray-600">{station.text}</p>
							</CardContent>
						</Card>
						{#if i < lebensstationen.length - 1}
							<div class="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
								<Icon icon="mdi:chevron-right" class="w-6 h-6 text-gray-300" />
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<!-- Zitate -->
		<div class="mb-20">
			<h3 class="text-2xl font-bold text-center mb-10">Zeitlose Weisheit</h3>
			<QuoteCarousel {quotes} />
		</div>

		<!-- Bücher -->
		<div class="bg-gray-50 rounded-2xl p-8 md:p-12 mb-16">
			<h3 class="text-2xl font-bold text-center mb-10">Literarisches Vermächtnis</h3>
			<p class="text-center text-gray-700 mb-10 max-w-3xl mx-auto">
				Śrīla Prabhupāda übersetzte und kommentierte über 70 Bücher über vedische Philosophie, 
				die heute in mehr als 80 Sprachen verfügbar sind.
			</p>
			<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
				{#each buecher as buch, i}
					<div in:fade={{ duration: 600, delay: i * 100 }}>
						<Card class="hover:shadow-lg transition-all duration-300">
							<CardContent class="p-6 text-center">
							<div class="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<Icon icon={buch.icon} class="w-8 h-8 text-primary-600" />
							</div>
							<h4 class="font-semibold mb-2">{buch.titel}</h4>
							<p class="text-sm text-gray-600">{buch.beschreibung}</p>
							</CardContent>
						</Card>
					</div>
				{/each}
			</div>
			<div class="text-center mt-8">
				<Button href="/literature" variant="default">
					<Icon icon="mdi:book-open" class="w-5 h-5 mr-2" />
					Alle Bücher entdecken
				</Button>
			</div>
		</div>

		<!-- Video Section -->
		<div class="mb-16">
			<h3 class="text-2xl font-bold text-center mb-10">Śrīla Prabhupāda in Aktion</h3>
			<Card class="overflow-hidden">
				<CardContent class="p-0">
					<div class="aspect-w-16 aspect-h-9 bg-gray-200">
						<div class="flex items-center justify-center h-full min-h-[400px]">
							<div class="text-center">
								<Icon icon="mdi:play-circle" class="w-20 h-20 text-gray-400 mb-4" />
								<p class="text-gray-600">Video-Platzhalter</p>
								<p class="text-sm text-gray-500">Hier würde ein Video von Śrīla Prabhupāda eingebettet</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>

		<!-- Vermächtnis -->
		<div class="mb-16">
			<h3 class="text-2xl font-bold text-center mb-10">Sein Vermächtnis in Zahlen</h3>
			<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
				{#each vermaechtnis as item, i}
					<div 
						class="text-center"
						in:fade={{ duration: 600, delay: i * 100 }}
					>
						<div class="w-20 h-20 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
							<Icon icon={item.icon} class="w-10 h-10 text-primary-600" />
						</div>
						<div class="text-3xl font-bold text-primary-600 mb-1">{item.zahl}</div>
						<div class="text-sm text-gray-600">{item.text}</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Lehren -->
		<div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12">
			<h3 class="text-2xl font-bold text-center mb-10">Die Essenz seiner Lehren</h3>
			<div class="grid md:grid-cols-3 gap-8">
				<div class="text-center">
					<div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
						<Icon icon="mdi:om" class="w-8 h-8 text-primary-600" />
					</div>
					<h4 class="font-semibold mb-2">Bhakti-Yoga</h4>
					<p class="text-sm text-gray-600">
						Der Pfad der liebenden Hingabe zu Krishna als höchstes Ziel des Lebens
					</p>
				</div>
				<div class="text-center">
					<div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
						<Icon icon="mdi:meditation" class="w-8 h-8 text-primary-600" />
					</div>
					<h4 class="font-semibold mb-2">Mantra-Meditation</h4>
					<p class="text-sm text-gray-600">
						Das Chanten des Hare Krishna Mahā-Mantras als einfachster spiritueller Prozess
					</p>
				</div>
				<div class="text-center">
					<div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
						<Icon icon="mdi:hand-heart" class="w-8 h-8 text-primary-600" />
					</div>
					<h4 class="font-semibold mb-2">Praktischer Dienst</h4>
					<p class="text-sm text-gray-600">
						Spiritualität im täglichen Leben durch hingebungsvollen Dienst verwirklichen
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
{/if}

<!-- CTA Section -->
<CTASection
	title="Entdecken Sie Śrīla Prabhupādas Lehren"
	subtitle="Beginnen Sie Ihre spirituelle Reise mit seinen zeitlosen Büchern"
	primaryButton={{
		text: 'Bhagavad-gītā lesen',
		href: '/literature',
		icon: 'mdi:book-open'
	}}
	secondaryButton={{
		text: 'Die Bewegung kennenlernen',
		href: '/bewegung',
		icon: 'mdi:account-group'
	}}
	variant="gradient"
/>