<script lang="ts">
    import * as Card from '$lib/components/ui/card';
    import { Avatar, AvatarFallback } from '$lib/components/ui/avatar';
    import Icon from '@iconify/svelte';

    export let quote: string;
    export let author: string;
    export let role: string | undefined = undefined;

    // Initials für Avatar generieren
    $: initials = author.split(' ').map(name => name[0]).join('').toUpperCase();
</script>

<section class="py-16 px-4 bg-gradient-to-br from-spiritual-saffron-50 to-spiritual-gold-50">
    <div class="container mx-auto max-w-4xl">
        <Card.Root class="bg-card/95 backdrop-blur-sm border-spiritual-saffron-200 shadow-xl">
            <Card.Content class="p-8 md:p-12">
                <figure class="relative">
                    <!-- Dekoratives Anführungszeichen mit Icon -->
                    <div class="absolute -top-4 -left-4">
                        <div class="w-12 h-12 bg-spiritual-saffron-100 rounded-full flex items-center justify-center">
                            <Icon icon="mdi:format-quote-open" class="w-6 h-6 text-spiritual-saffron-600" />
                        </div>
                    </div>

                    <blockquote class="relative text-center pt-8">
                        <p class="text-2xl md:text-3xl lg:text-4xl font-spiritual italic text-card-foreground leading-relaxed mb-8">
                            "{quote}"
                        </p>
                        
                        <footer class="flex items-center justify-center space-x-4">
                            <Avatar class="w-12 h-12 border-2 border-spiritual-saffron-200">
                                <AvatarFallback class="bg-spiritual-saffron-100 text-spiritual-saffron-800 font-medium">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            
                            <div class="text-left">
                                <cite class="text-lg font-medium text-card-foreground not-italic block">
                                    {author}
                                </cite>
                                {#if role}
                                    <div class="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                                        <Icon icon="mdi:account-tie" class="w-3 h-3" />
                                        {role}
                                    </div>
                                {/if}
                            </div>
                        </footer>
                    </blockquote>

                    <!-- Dekoratives schließendes Anführungszeichen -->
                    <div class="absolute -bottom-4 -right-4">
                        <div class="w-12 h-12 bg-spiritual-gold-100 rounded-full flex items-center justify-center">
                            <Icon icon="mdi:format-quote-close" class="w-6 h-6 text-spiritual-gold-600" />
                        </div>
                    </div>
                </figure>
            </Card.Content>
        </Card.Root>

        <!-- Zusätzliche spirituelle Dekoration -->
        <div class="flex justify-center mt-8">
            <div class="flex items-center gap-2 text-spiritual-saffron-400">
                <Icon icon="mdi:flower" class="w-4 h-4" />
                <div class="w-16 h-px bg-gradient-to-r from-transparent via-spiritual-saffron-300 to-transparent"></div>
                <Icon icon="mdi:lotus" class="w-5 h-5 text-spiritual-saffron-500" />
                <div class="w-16 h-px bg-gradient-to-r from-transparent via-spiritual-saffron-300 to-transparent"></div>
                <Icon icon="mdi:flower" class="w-4 h-4" />
            </div>
        </div>
    </div>
</section>