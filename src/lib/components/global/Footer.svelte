<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
	import Icon from '@iconify/svelte';

	let email = '';

	const handleNewsletterSubmit = (e: Event) => {
		e.preventDefault();
		// Newsletter-Logik hier implementieren
		console.log('Newsletter signup:', email);
		email = '';
	};

	const quickLinks = [
		{ label: 'Events', href: '/events' },
		{ label: 'Tempel', href: '/temples' },
		{ label: 'Über uns', href: '/about' },
		{ label: 'Blog', href: '/posts' }
	];

	const socialLinks = [
		{ name: 'Facebook', icon: 'mdi:facebook', href: '#' },
		{ name: 'Instagram', icon: 'mdi:instagram', href: '#' },
		{ name: 'YouTube', icon: 'mdi:youtube', href: '#' }
	];

	const legalLinks = [
		{ label: 'Impressum', href: '/impressum' },
		{ label: 'Datenschutz', href: '/datenschutz' }
	];
</script>

<footer class="relative mt-16">
	<!-- Footer Background -->
	<div class="bg-gray-100 border-t border-gray-200">
		<div class="container mx-auto px-4 py-12 md:py-16">
			<!-- Main Footer Content -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
				<!-- Newsletter Section -->
				<div class="lg:col-span-2">
					<Card class="bg-white border-gray-200 shadow-sm">
						<CardContent class="p-6">
							<h3 class="text-xl font-medium text-gray-900 mb-3 flex items-center gap-2">
								<Icon icon="mdi:email-outline" class="w-6 h-6 text-primary-500" />
								Bleiben Sie verbunden
							</h3>
							<p class="text-gray-600 mb-4">
								Erhalten Sie die neuesten Nachrichten über Events, spirituelle Lehren und 
								Gemeinschaftsaktivitäten direkt in Ihr Postfach.
							</p>
							<form on:submit={handleNewsletterSubmit} class="flex gap-2">
								<Input
									type="email"
									placeholder="Ihre E-Mail-Adresse"
									bind:value={email}
									required
									class="flex-1"
								/>
								<Button type="submit" variant="default">
									<Icon icon="mdi:send" class="w-4 h-4" />
								</Button>
							</form>
						</CardContent>
					</Card>
				</div>

				<!-- Quick Links -->
				<div>
					<h4 class="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
						<Icon icon="mdi:link-variant" class="w-5 h-5 text-primary-500" />
						Schnellzugriff
					</h4>
					<nav class="space-y-2">
						{#each quickLinks as link}
							<a
								href={link.href}
								class="block text-gray-600 hover:text-primary-500 transition-colors duration-200"
							>
								{link.label}
							</a>
						{/each}
					</nav>
				</div>

				<!-- Contact Info -->
				<div>
					<h4 class="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
						<Icon icon="mdi:phone" class="w-5 h-5 text-primary-500" />
						Kontakt
					</h4>
					<div class="space-y-3 text-gray-600">
						<div class="flex items-start gap-2">
							<Icon icon="mdi:map-marker" class="w-4 h-4 text-primary-500 mt-1 flex-shrink-0" />
							<div class="text-sm">
								<p>ISKCON Deutschland</p>
								<p>Hauptstraße 123</p>
								<p>12345 Berlin</p>
							</div>
						</div>
						<div class="flex items-center gap-2">
							<Icon icon="mdi:phone" class="w-4 h-4 text-primary-500" />
							<a href="tel:+4930123456789" class="text-sm hover:text-primary-500 transition-colors">
								+49 30 123 456 789
							</a>
						</div>
						<div class="flex items-center gap-2">
							<Icon icon="mdi:email" class="w-4 h-4 text-primary-500" />
							<a
								href="mailto:info@iskcon.de"
								class="text-sm hover:text-primary-500 transition-colors"
							>
								info@iskcon.de
							</a>
						</div>
					</div>
				</div>
			</div>

			<!-- Social Media Section -->
			<div class="mb-8">
				<Card class="bg-white border-gray-200 shadow-sm">
					<CardContent class="p-6">
						<div class="flex flex-col sm:flex-row items-center justify-between gap-4">
							<div class="flex items-center gap-3">
								<img src="/iskcon_logo.svg" alt="ISKCON Logo" class="w-10 h-10" />
								<div>
									<h4 class="text-gray-900 font-medium">ISKCON Deutschland</h4>
									<p class="text-gray-600 text-sm">Spirituelle Gemeinschaft</p>
								</div>
							</div>
							<div class="flex items-center gap-3">
								<span class="text-gray-600 text-sm mr-2">Folgen Sie uns:</span>
								{#each socialLinks as social}
									<a
										href={social.href}
										class="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-50 hover:bg-primary-500/10 text-gray-600 hover:text-primary-500 transition-colors duration-200"
									>
										<Icon icon={social.icon} class="w-5 h-5" />
										<span class="sr-only">{social.name}</span>
									</a>
								{/each}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<!-- Bottom Bar -->
			<Separator class="bg-gray-200 mb-6" />
			<div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
				<div class="flex items-center gap-4">
					<p>&copy; 2025 ISKCON Deutschland. Alle Rechte vorbehalten.</p>
				</div>
				<nav class="flex items-center gap-4">
					{#each legalLinks as link}
						<a
							href={link.href}
							class="hover:text-primary-500 transition-colors duration-200"
						>
							{link.label}
						</a>
					{/each}
				</nav>
			</div>
			
			<!-- Spiritual Quote -->
			<div class="mt-8 pt-6 border-t border-gray-200">
				<div class="text-center">
					<p class="text-gray-600 italic text-sm max-w-2xl mx-auto">
						"Hare Krishna, Hare Krishna, Krishna Krishna, Hare Hare<br />
						Hare Rama, Hare Rama, Rama Rama, Hare Hare"
					</p>
					<p class="text-gray-500 text-xs mt-2">Das Maha-Mantra für spirituelle Erhebung</p>
				</div>
			</div>
		</div>
	</div>

</footer>