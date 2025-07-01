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
	<!-- Gradient Background -->
	<div class="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
		<div class="container mx-auto px-4 py-12 md:py-16">
			<!-- Main Footer Content -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
				<!-- Newsletter Section -->
				<div class="lg:col-span-2">
					<Card class="bg-white/10 backdrop-blur-sm border-white/20">
						<CardContent class="p-6">
							<h3 class="text-xl font-medium text-white mb-3 flex items-center gap-2">
								<Icon icon="mdi:email-outline" class="w-6 h-6 text-orange-400" />
								Bleiben Sie verbunden
							</h3>
							<p class="text-slate-300 mb-4">
								Erhalten Sie die neuesten Nachrichten über Events, spirituelle Lehren und 
								Gemeinschaftsaktivitäten direkt in Ihr Postfach.
							</p>
							<form on:submit={handleNewsletterSubmit} class="flex gap-2">
								<Input
									type="email"
									placeholder="Ihre E-Mail-Adresse"
									bind:value={email}
									required
									class="flex-1 bg-white/20 border-white/30 text-white placeholder:text-slate-400"
								/>
								<Button type="submit" class="bg-orange-500 hover:bg-orange-600 text-white">
									<Icon icon="mdi:send" class="w-4 h-4" />
								</Button>
							</form>
						</CardContent>
					</Card>
				</div>

				<!-- Quick Links -->
				<div>
					<h4 class="text-lg font-medium text-white mb-4 flex items-center gap-2">
						<Icon icon="mdi:link-variant" class="w-5 h-5 text-orange-400" />
						Schnellzugriff
					</h4>
					<nav class="space-y-2">
						{#each quickLinks as link}
							<a
								href={link.href}
								class="block text-slate-300 hover:text-orange-400 transition-colors duration-200"
							>
								{link.label}
							</a>
						{/each}
					</nav>
				</div>

				<!-- Contact Info -->
				<div>
					<h4 class="text-lg font-medium text-white mb-4 flex items-center gap-2">
						<Icon icon="mdi:phone" class="w-5 h-5 text-orange-400" />
						Kontakt
					</h4>
					<div class="space-y-3 text-slate-300">
						<div class="flex items-start gap-2">
							<Icon icon="mdi:map-marker" class="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
							<div class="text-sm">
								<p>ISKCON Deutschland</p>
								<p>Hauptstraße 123</p>
								<p>12345 Berlin</p>
							</div>
						</div>
						<div class="flex items-center gap-2">
							<Icon icon="mdi:phone" class="w-4 h-4 text-orange-400" />
							<a href="tel:+4930123456789" class="text-sm hover:text-orange-400 transition-colors">
								+49 30 123 456 789
							</a>
						</div>
						<div class="flex items-center gap-2">
							<Icon icon="mdi:email" class="w-4 h-4 text-orange-400" />
							<a
								href="mailto:info@iskcon.de"
								class="text-sm hover:text-orange-400 transition-colors"
							>
								info@iskcon.de
							</a>
						</div>
					</div>
				</div>
			</div>

			<!-- Social Media Section -->
			<div class="mb-8">
				<Card class="bg-white/5 backdrop-blur-sm border-white/10">
					<CardContent class="p-6">
						<div class="flex flex-col sm:flex-row items-center justify-between gap-4">
							<div class="flex items-center gap-3">
								<img src="/iskcon_logo.svg" alt="ISKCON Logo" class="w-10 h-10" />
								<div>
									<h4 class="text-white font-medium">ISKCON Deutschland</h4>
									<p class="text-slate-400 text-sm">Spirituelle Gemeinschaft</p>
								</div>
							</div>
							<div class="flex items-center gap-3">
								<span class="text-slate-300 text-sm mr-2">Folgen Sie uns:</span>
								{#each socialLinks as social}
									<Button
										variant="outline"
										size="sm"
										class="bg-white/10 border-white/20 hover:bg-white/20 text-white hover:text-orange-400 transition-all duration-200"
										href={social.href}
									>
										<Icon icon={social.icon} class="w-5 h-5" />
										<span class="sr-only">{social.name}</span>
									</Button>
								{/each}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<!-- Bottom Bar -->
			<Separator class="bg-white/20 mb-6" />
			<div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
				<div class="flex items-center gap-4">
					<p>&copy; 2025 ISKCON Deutschland. Alle Rechte vorbehalten.</p>
				</div>
				<nav class="flex items-center gap-4">
					{#each legalLinks as link}
						<a
							href={link.href}
							class="hover:text-orange-400 transition-colors duration-200"
						>
							{link.label}
						</a>
					{/each}
				</nav>
			</div>
			
			<!-- Spiritual Quote -->
			<div class="mt-8 pt-6 border-t border-white/10">
				<div class="text-center">
					<p class="text-slate-300 italic text-sm max-w-2xl mx-auto">
						"Hare Krishna, Hare Krishna, Krishna Krishna, Hare Hare<br />
						Hare Rama, Hare Rama, Rama Rama, Hare Hare"
					</p>
					<p class="text-slate-500 text-xs mt-2">Das Maha-Mantra für spirituelle Erhebung</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Decorative Elements -->
	<div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
</footer>