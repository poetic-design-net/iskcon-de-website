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

<footer class="relative">
	<!-- Footer Background -->
	<div class="bg-gray-100 border-t border-gray-200">
		<div class="container mx-auto px-4 py-12 md:py-16">
			<!-- Main Footer Content -->
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8 md:mb-12">
				<!-- Left Column: Contact & Image -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<!-- Contact Info -->
					<div>
						<h4 class="text-lg font-medium text-gray-900 mb-4">
							Kontakt
						</h4>
						<div class="space-y-3 text-gray-600">
							<div class="flex items-start gap-3">
								<Icon icon="mdi:map-marker" class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
								<div>
									<p class="font-medium text-gray-900">ISKCON Deutschland</p>
									<p class="text-sm">Hauptstraße 123</p>
									<p class="text-sm">12345 Berlin</p>
								</div>
							</div>
							<div class="flex items-center gap-3">
								<Icon icon="mdi:phone" class="w-5 h-5 text-primary-500 flex-shrink-0" />
								<a href="tel:+4930123456789" class="hover:text-primary-500 transition-colors">
									+49 30 123 456 789
								</a>
							</div>
							<div class="flex items-center gap-3">
								<Icon icon="mdi:email" class="w-5 h-5 text-primary-500 flex-shrink-0" />
								<a
									href="mailto:info@iskcon.de"
									class="hover:text-primary-500 transition-colors"
								>
									info@iskcon.de
								</a>
							</div>
						</div>
					</div>
					
					<!-- Image Placeholder -->
					<div>
						<div class="relative h-[200px] md:h-full md:min-h-[200px] rounded-lg overflow-hidden">
							<img 
								src="/img/hero_nature.webp" 
								alt="ISKCON Temple" 
								class="w-full h-full object-cover"
							/>
							<div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
						</div>
					</div>
				</div>

				<!-- Right Column: Newsletter -->
				<div>
					<Card class="bg-white border-gray-200 shadow-sm h-full">
						<CardContent class="p-6">
							<h3 class="text-xl font-medium text-gray-900 mb-3">
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
		</div>
	</div>

</footer>