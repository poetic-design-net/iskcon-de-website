<script lang="ts">
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import CTASection from '$lib/components/sections/CTASection.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent } from '$lib/components/ui/card';
	import Icon from '@iconify/svelte';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let visible = false;

	onMount(() => {
		visible = true;
	});

	const subPages = [
		{
			title: 'Die Bewegung',
			description: 'Erfahren Sie mehr über ISKCON - die Internationale Gesellschaft für Krishna-Bewusstsein und ihre Mission.',
			href: '/bewegung',
			icon: 'mdi:account-group',
			available: true,
			highlight: 'Seit 1966'
		},
		{
			title: 'Geschichte',
			description: 'Die Entstehung und Entwicklung von ISKCON - von den Anfängen bis heute.',
			href: '/geschichte',
			icon: 'mdi:history',
			available: false,
			highlight: '50+ Jahre'
		},
		{
			title: 'Srila Prabhupada',
			description: 'Der Gründer-Acharya von ISKCON und seine außergewöhnliche Lebensgeschichte.',
			href: '/srila-prabhupada',
			icon: 'mdi:heart',
			available: false,
			highlight: 'Gründer'
		},
		{
			title: 'GBC',
			description: 'Das Governing Body Commission - die spirituelle Führung von ISKCON.',
			href: '/gbc',
			icon: 'mdi:office-building',
			available: false,
			highlight: 'Führung'
		},
		{
			title: 'ISKCON Weltweit',
			description: 'Die weltweite Präsenz von ISKCON mit über 600 Tempeln und Zentren.',
			href: '/iskcon-weltweit',
			icon: 'mdi:earth',
			available: false,
			highlight: '600+ Tempel'
		}
	];

	const stats = [
		{ value: '600+', label: 'Tempel weltweit' },
		{ value: '50+', label: 'Jahre in Deutschland' },
		{ value: '100M+', label: 'Bücher verteilt' },
		{ value: '1M+', label: 'Tägliche Mahlzeiten' }
	];

	const principles = [
		{
			icon: 'mdi:om',
			title: 'Vedische Weisheit',
			description: 'Authentische spirituelle Lehren aus den zeitlosen vedischen Schriften'
		},
		{
			icon: 'mdi:food-apple',
			title: 'Vegetarische Ernährung',
			description: 'Förderung einer gewaltfreien und gesunden Lebensweise'
		},
		{
			icon: 'mdi:meditation',
			title: 'Meditation & Yoga',
			description: 'Praktische Techniken für spirituelles Wachstum und inneren Frieden'
		},
		{
			icon: 'mdi:hand-heart',
			title: 'Soziales Engagement',
			description: 'Dienst an der Gesellschaft durch Bildung und Nahrungsverteilung'
		}
	];
</script>

<svelte:head>
	<title>Über uns - ISKCON Deutschland</title>
	<meta name="description" content="Erfahren Sie mehr über ISKCON Deutschland - unsere Mission, Geschichte und weltweite Bewegung." />
</svelte:head>

<HeroSection
	title="Über uns"
	subtitle="Die Internationale Gesellschaft für Krishna-Bewusstsein"
	backgroundImage="/img/temple-interior.jpg"
/>

<!-- Intro Section mit Animation -->
{#if visible}
<section class="py-16 px-4" in:fade={{ duration: 600 }}>
	<div class="container mx-auto max-w-6xl">
		<div class="text-center mb-16">
			<p class="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
				ISKCON (International Society for Krishna Consciousness) ist eine weltweite spirituelle Bewegung, 
				die 1966 von Seiner Göttlichen Gnade A.C. Bhaktivedanta Swami Prabhupada gegründet wurde. 
				Unsere Mission ist es, das Krishna-Bewusstsein auf der ganzen Welt zu verbreiten und Menschen 
				dabei zu helfen, ihre spirituelle Natur zu entdecken und ein erfülltes Leben im Dienst zu Gott zu führen.
			</p>
			<p class="text-lg text-gray-600 mt-6 max-w-3xl mx-auto">
				Mit über 600 Tempeln, Farmen und Zentren weltweit bietet ISKCON einen authentischen Zugang 
				zur zeitlosen Weisheit der vedischen Schriften. In Deutschland sind wir seit über 50 Jahren 
				aktiv und betreiben Tempel und Zentren in verschiedenen Städten.
			</p>
		</div>

		<!-- Stats Section -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
			{#each stats as stat, i}
				<div 
					class="text-center"
					in:fade={{ duration: 600, delay: i * 100 }}
				>
					<div class="text-3xl md:text-4xl font-bold text-primary-600 mb-2">{stat.value}</div>
					<div class="text-sm text-gray-600">{stat.label}</div>
				</div>
			{/each}
		</div>

		<!-- Unterseiten Grid -->
		<h2 class="text-3xl font-bold text-center mb-12">Mehr über ISKCON</h2>
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
			{#each subPages as page, i}
				<div 
					class="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden {!page.available ? 'opacity-70' : ''}"
					in:fade={{ duration: 600, delay: i * 100 + 200 }}
				>
					{#if page.highlight}
						<div class="absolute top-4 right-4 z-10">
							<span class="text-xs bg-primary-500/10 text-primary-600 px-3 py-1 rounded-full font-medium">
								{page.highlight}
							</span>
						</div>
					{/if}
					
					<div class="p-6">
						<div class="flex items-start gap-4 mb-4">
							<div class="w-14 h-14 bg-primary-500/10 rounded-xl flex items-center justify-center group-hover:bg-primary-500/20 transition-colors flex-shrink-0">
								<Icon icon={page.icon} class="w-7 h-7 text-primary-600" />
							</div>
							<div class="flex-1">
								<h3 class="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary-600 transition-colors">
									{page.title}
								</h3>
								<p class="text-gray-600 text-sm leading-relaxed">
									{page.description}
								</p>
							</div>
						</div>
						
						<div class="mt-4">
							{#if page.available}
								<a 
									href={page.href}
									class="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm group"
								>
									Mehr erfahren
									<Icon icon="mdi:arrow-right" class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
								</a>
							{:else}
								<span class="text-sm text-gray-500 italic">Bald verfügbar</span>
							{/if}
						</div>
					</div>
					
					{#if !page.available}
						<div class="absolute inset-0 bg-gray-50/50 pointer-events-none"></div>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Prinzipien Section -->
		<div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 md:p-12">
			<h2 class="text-3xl font-bold mb-12 text-center">Unsere Prinzipien</h2>
			<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
				{#each principles as principle, i}
					<div 
						class="text-center"
						in:fade={{ duration: 600, delay: i * 100 + 400 }}
					>
						<div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
							<Icon icon={principle.icon} class="w-8 h-8 text-primary-600" />
						</div>
						<h3 class="font-semibold text-lg mb-2">{principle.title}</h3>
						<p class="text-sm text-gray-600 leading-relaxed">{principle.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
{/if}

<!-- CTA Section -->
<CTASection
	title="Werden Sie Teil unserer Gemeinschaft"
	subtitle="Besuchen Sie unsere Tempel, nehmen Sie an Programmen teil oder erfahren Sie mehr über die vedische Philosophie"
	primaryButton={{
		text: 'Tempel finden',
		href: '/tempel',
		icon: 'mdi:map-marker'
	}}
	secondaryButton={{
		text: 'Events ansehen',
		href: '/events',
		icon: 'mdi:calendar'
	}}
	variant="gradient"
/>