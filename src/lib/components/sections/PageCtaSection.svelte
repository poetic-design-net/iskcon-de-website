<script lang="ts">
    import SanityImage from '$lib/components/global/SanityImage.svelte';
    import { Button } from '$lib/components/ui/button';
    import * as Card from '$lib/components/ui/card';
    import Icon from '@iconify/svelte';

    export let title: string;
    export let description: string | undefined = undefined;
    export let buttonText: string | undefined = undefined;
    export let buttonLink: string | undefined = undefined;
    export let background: {
        type: 'color' | 'image';
        color?: 'primary' | 'secondary' | 'light' | 'dark';
        image?: any;
    } | undefined = undefined;

    // shadcn-kompatible Hintergrundfarben
    const bgClasses = {
        primary: 'bg-spiritual-saffron-600 text-white',
        secondary: 'bg-spiritual-blue-600 text-white',
        light: 'bg-muted text-foreground',
        dark: 'bg-slate-900 text-white'
    };

    // Standardfarbe
    const defaultBgClass = 'bg-spiritual-saffron-600 text-white';
</script>

<section class="relative overflow-hidden">
    {#if background && background.type === 'image' && background.image}
        <!-- Hintergrundbild mit modernen Overlays -->
        <div class="absolute inset-0 z-0">
            <SanityImage
                src={background.image}
                alt=""
                width={1920}
                className="w-full h-full"
                objectFit="cover"
            />
            <!-- Gradient Overlays für bessere Lesbarkeit -->
            <div class="absolute inset-0 bg-gradient-to-br from-spiritual-saffron-900/80 via-spiritual-saffron-800/70 to-spiritual-blue-900/60"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
    {/if}

    <div class="relative z-10 px-4 py-20 {
        background
            ? background.type === 'image'
                ? 'text-white'
                : background.type === 'color' && background.color
                    ? bgClasses[background.color]
                    : defaultBgClass
            : defaultBgClass
        }">
        
        <div class="container mx-auto max-w-5xl">
            <Card.Root class="bg-card/95 backdrop-blur-sm border-0 shadow-2xl">
                <Card.Content class="p-8 md:p-12 text-center">
                    <!-- Dekorative Icons -->
                    <div class="flex justify-center mb-6">
                        <div class="flex items-center gap-2">
                            <Icon icon="mdi:star" class="w-6 h-6 text-spiritual-saffron-500" />
                            <Icon icon="mdi:lotus" class="w-8 h-8 text-spiritual-saffron-600" />
                            <Icon icon="mdi:star" class="w-6 h-6 text-spiritual-saffron-500" />
                        </div>
                    </div>

                    <h2 class="text-3xl md:text-4xl font-medium mb-6 text-card-foreground">
                        {title}
                    </h2>
                    
                    {#if description}
                        <p class="text-lg md:text-xl mb-8 text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                            {description}
                        </p>
                    {/if}
                    
                    {#if buttonText && buttonLink}
                        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <!-- Haupt-CTA Button -->
                            <Button 
                                size="lg"
                                class="bg-spiritual-saffron-600 hover:bg-spiritual-saffron-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 px-8 py-4 h-auto text-lg"
                                href={buttonLink}
                            >
                                <Icon icon="mdi:arrow-right-circle" class="w-5 h-5 mr-2" />
                                {buttonText}
                            </Button>

                            <!-- Sekundäre Aktion -->
                            <Button 
                                variant="outline" 
                                size="lg"
                                class="border-spiritual-saffron-300 text-spiritual-saffron-700 hover:bg-spiritual-saffron-50 px-8 py-4 h-auto text-lg"
                                href="/kontakt"
                            >
                                <Icon icon="mdi:phone" class="w-5 h-5 mr-2" />
                                Kontakt aufnehmen
                            </Button>
                        </div>

                        <!-- Zusätzliche Vertrauenselemente -->
                        <div class="mt-8 pt-6 border-t border-border/50">
                            <div class="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
                                <div class="flex items-center gap-2">
                                    <Icon icon="mdi:shield-check" class="w-4 h-4 text-spiritual-saffron-600" />
                                    <span>Vertrauenswürdig</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <Icon icon="mdi:heart" class="w-4 h-4 text-spiritual-saffron-600" />
                                    <span>Gemeinschaft</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <Icon icon="mdi:clock" class="w-4 h-4 text-spiritual-saffron-600" />
                                    <span>Seit 1977</span>
                                </div>
                            </div>
                        </div>
                    {/if}
                </Card.Content>
            </Card.Root>
        </div>
    </div>

    <!-- Dekorative Elemente -->
    {#if !background || background.type !== 'image'}
        <div class="absolute top-10 left-10 opacity-10">
            <Icon icon="mdi:lotus" class="w-32 h-32 text-white" />
        </div>
        <div class="absolute bottom-10 right-10 opacity-10">
            <Icon icon="mdi:flower" class="w-24 h-24 text-white" />
        </div>
    {/if}
</section>