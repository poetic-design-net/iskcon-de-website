<script lang="ts">
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import CTASection from '$lib/components/sections/CTASection.svelte';
	import AccordionExample from '$lib/components/sections/AccordionExample.svelte';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import Icon from '@iconify/svelte';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let visible = false;

	onMount(() => {
		visible = true;
	});

	const principien = [
		{
			icon: 'mdi:account-group',
			title: 'Kollegiale Führung',
			description: 'Entscheidungen werden gemeinsam getroffen, nicht von Einzelpersonen'
		},
		{
			icon: 'mdi:book-open',
			title: 'Schriftbasiert',
			description: 'Alle Beschlüsse basieren auf den vedischen Schriften und Prabhupadas Lehren'
		},
		{
			icon: 'mdi:earth',
			title: 'Global vernetzt',
			description: 'Weltweite Koordination bei lokaler Autonomie der Tempel'
		},
		{
			icon: 'mdi:shield-check',
			title: 'Spirituelle Standards',
			description: 'Wahrung der spirituellen Integrität und Reinheit der Bewegung'
		}
	];

	const verantwortungsbereiche = [
		{
			title: 'Spirituelle Standards',
			items: [
				'Einweihungsstandards und -prozesse',
				'Spirituelle Ausbildung und Schulung',
				'Philosophische Klarheit und Reinheit'
			]
		},
		{
			title: 'Organisatorische Führung',
			items: [
				'Strategische Ausrichtung der Bewegung',
				'Konfliktlösung und Mediation',
				'Tempelgründungen und -schließungen'
			]
		},
		{
			title: 'Bildung & Ausbildung',
			items: [
				'Gurukula und Bildungsstandards',
				'Devotee-Ausbildungsprogramme',
				'Akademische Initiativen'
			]
		}
	];

	const gbcMitgliederDACH = [
		{
			name: 'Name des GBC-Mitglieds',
			rolle: 'GBC für Deutschland, Österreich und Schweiz',
			beschreibung: 'Spiritueller Lehrer mit langjähriger Erfahrung in der Gemeindeführung',
			email: 'gbc-dach@iskcon.de'
		},
		{
			name: 'Name des stellv. GBC-Mitglieds',
			rolle: 'Stellvertretender GBC für Mitteleuropa',
			beschreibung: 'Fokus auf Bildung und spirituelle Entwicklung der Gemeinden',
			email: 'gbc-stellv@iskcon.de'
		}
	];

	const faqItems = [
		{
			question: 'Was ist das GBC?',
			answer: 'Das Governing Body Commission (GBC) ist das höchste Verwaltungsgremium von ISKCON. Es wurde 1970 von Srila Prabhupada gegründet, um die Bewegung nach seinem physischen Verscheiden zu führen. Das GBC besteht aus etwa 30 Senior-Devotees aus der ganzen Welt.'
		},
		{
			question: 'Wie werden GBC-Mitglieder ausgewählt?',
			answer: 'GBC-Mitglieder werden vom bestehenden GBC-Gremium basierend auf ihrer spirituellen Reife, Führungsqualitäten, Hingabe zu Srila Prabhupadas Mission und ihrem Dienst für ISKCON ausgewählt. Die Ernennung erfolgt durch Mehrheitsbeschluss.'
		},
		{
			question: 'Wie oft trifft sich das GBC?',
			answer: 'Das GBC trifft sich einmal jährlich zu einer mehrtägigen Konferenz in Mayapur, Indien. Zusätzlich finden regelmäßige Online-Meetings und regionale Treffen statt. Wichtige Entscheidungen werden während der Jahresversammlung getroffen.'
		},
		{
			question: 'Welche Autorität hat das GBC?',
			answer: 'Das GBC hat die ultimative Verwaltungsautorität in ISKCON, handelt aber immer auf Basis von Srila Prabhupadas Anweisungen und den vedischen Schriften. Es kann Richtlinien erlassen, Standards setzen und bei Konflikten vermitteln, aber nicht die grundlegenden spirituellen Prinzipien ändern.'
		},
		{
			question: 'Wie kann ich das GBC kontaktieren?',
			answer: 'Sie können das GBC über die offiziellen E-Mail-Adressen der regionalen GBC-Mitglieder oder über das GBC-Sekretariat kontaktieren. Für lokale Angelegenheiten wenden Sie sich zunächst an Ihre Tempelleitung.'
		}
	];
</script>

<svelte:head>
	<title>GBC - Governing Body Commission - ISKCON Deutschland</title>
	<meta name="description" content="Das Governing Body Commission (GBC) - Die spirituelle Führung von ISKCON. Struktur, Prinzipien und Verantwortungsbereiche." />
</svelte:head>

<HeroSection
	title="Governing Body Commission"
	subtitle="Die spirituelle Führung von ISKCON"
	backgroundImage="/img/gbc-meeting.jpg"
/>

{#if visible}
<section class="py-16 px-4" in:fade={{ duration: 600 }}>
	<div class="container mx-auto max-w-6xl">
		<!-- Einführung -->
		<div class="text-center mb-16">
			<Badge variant="secondary" class="mb-4">
				<Icon icon="mdi:gavel" class="w-4 h-4 mr-2" />
				Gegründet 1970
			</Badge>
			<h2 class="text-3xl md:text-4xl font-bold mb-6">Führung durch gemeinsame Vision</h2>
			<p class="text-lg text-gray-700 max-w-4xl mx-auto">
				Das Governing Body Commission (GBC) wurde von Śrīla Prabhupāda als oberstes Verwaltungsgremium 
				eingerichtet, um die spirituellen Standards und die Mission von ISKCON weltweit zu bewahren. 
				Es fungiert als kollektive Führung, die sicherstellt, dass die Bewegung ihrer ursprünglichen 
				Vision treu bleibt.
			</p>
		</div>

		<!-- Prinzipien -->
		<div class="mb-16">
			<h3 class="text-2xl font-bold text-center mb-10">Führungsprinzipien</h3>
			<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
				{#each principien as prinzip, i}
					<div in:fade={{ duration: 600, delay: i * 100 }}>
						<Card class="hover:shadow-lg transition-shadow duration-300">
							<CardContent class="p-6 text-center">
							<div class="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<Icon icon={prinzip.icon} class="w-8 h-8 text-primary-600" />
							</div>
							<h4 class="font-semibold mb-2">{prinzip.title}</h4>
							<p class="text-sm text-gray-600">{prinzip.description}</p>
							</CardContent>
						</Card>
					</div>
				{/each}
			</div>
		</div>

		<!-- Struktur -->
		<div class="bg-gray-50 rounded-2xl p-8 md:p-12 mb-16">
			<h3 class="text-2xl font-bold text-center mb-10">Struktur und Organisation</h3>
			<div class="max-w-4xl mx-auto">
				<div class="text-center mb-8">
					<Icon icon="mdi:sitemap" class="w-16 h-16 text-primary-600 mx-auto mb-4" />
					<p class="text-gray-700">
						Das GBC besteht aus etwa 30 Senior-Devotees, die verschiedene geografische Regionen 
						und Verantwortungsbereiche betreuen. Jede Region hat einen oder mehrere zugewiesene 
						GBC-Mitglieder, die als spirituelle Berater und administrative Aufsicht fungieren.
					</p>
				</div>
				
				<div class="grid md:grid-cols-3 gap-8 mt-10">
					<div class="text-center">
						<div class="text-3xl font-bold text-primary-600 mb-2">~30</div>
						<div class="text-sm text-gray-600">GBC-Mitglieder weltweit</div>
					</div>
					<div class="text-center">
						<div class="text-3xl font-bold text-primary-600 mb-2">100+</div>
						<div class="text-sm text-gray-600">Betreute Länder</div>
					</div>
					<div class="text-center">
						<div class="text-3xl font-bold text-primary-600 mb-2">1x</div>
						<div class="text-sm text-gray-600">Jährliche Vollversammlung</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Verantwortungsbereiche -->
		<div class="mb-16">
			<h3 class="text-2xl font-bold text-center mb-10">Verantwortungsbereiche</h3>
			<div class="grid md:grid-cols-3 gap-8">
				{#each verantwortungsbereiche as bereich, i}
					<div in:fade={{ duration: 600, delay: i * 100 }}>
						<Card class="h-full">
							<CardHeader>
							<CardTitle class="text-lg">{bereich.title}</CardTitle>
						</CardHeader>
						<CardContent>
							<ul class="space-y-2">
								{#each bereich.items as item}
									<li class="flex items-start text-sm text-gray-700">
										<Icon icon="mdi:check-circle" class="w-5 h-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
										{item}
									</li>
								{/each}
							</ul>
							</CardContent>
						</Card>
					</div>
				{/each}
			</div>
		</div>

		<!-- GBC für DACH -->
		<div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 mb-16">
			<h3 class="text-2xl font-bold text-center mb-10">GBC-Mitglieder für die DACH-Region</h3>
			<div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
				{#each gbcMitgliederDACH as mitglied, i}
					<div in:fade={{ duration: 600, delay: i * 100 }}>
						<Card class="hover:shadow-lg transition-shadow duration-300">
							<CardContent class="p-6">
							<div class="flex items-start gap-4">
								<div class="w-16 h-16 bg-primary-500/10 rounded-full flex items-center justify-center flex-shrink-0">
									<Icon icon="mdi:account-tie" class="w-8 h-8 text-primary-600" />
								</div>
								<div class="flex-1">
									<h4 class="font-semibold text-lg mb-1">{mitglied.name}</h4>
									<p class="text-sm text-primary-600 mb-2">{mitglied.rolle}</p>
									<p class="text-sm text-gray-600 mb-3">{mitglied.beschreibung}</p>
									<a 
										href="mailto:{mitglied.email}" 
										class="inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
									>
										<Icon icon="mdi:email" class="w-4 h-4 mr-1" />
										Kontakt
									</a>
								</div>
							</div>
							</CardContent>
						</Card>
					</div>
				{/each}
			</div>
		</div>

		<!-- FAQ -->
		<div class="mb-16">
			<h3 class="text-2xl font-bold text-center mb-10">Häufig gestellte Fragen</h3>
			<div class="max-w-3xl mx-auto">
				<AccordionExample items={faqItems} />
			</div>
		</div>

		<!-- Weitere Informationen -->
		<Card class="bg-primary-50 border-primary-200">
			<CardContent class="p-8 text-center">
				<Icon icon="mdi:information" class="w-12 h-12 text-primary-600 mx-auto mb-4" />
				<h3 class="text-xl font-semibold mb-4">Weitere Informationen</h3>
				<p class="text-gray-700 mb-6 max-w-2xl mx-auto">
					Für detaillierte Informationen über GBC-Resolutionen, Jahresberichte und offizielle 
					Stellungnahmen besuchen Sie bitte die offizielle GBC-Website.
				</p>
				<Button href="https://gbc.iskcon.org" target="_blank" variant="default">
					<Icon icon="mdi:open-in-new" class="w-5 h-5 mr-2" />
					Offizielle GBC-Website
				</Button>
			</CardContent>
		</Card>
	</div>
</section>
{/if}

<!-- CTA Section -->
<CTASection
	title="Haben Sie Fragen?"
	subtitle="Kontaktieren Sie Ihre lokale Tempelleitung oder wenden Sie sich an die GBC-Vertreter"
	primaryButton={{
		text: 'Tempel finden',
		href: '/tempel',
		icon: 'mdi:temple-hindu'
	}}
	secondaryButton={{
		text: 'Über ISKCON',
		href: '/ueber-uns',
		icon: 'mdi:information'
	}}
	variant="default"
/>