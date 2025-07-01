<script lang="ts">
    import * as Accordion from '$lib/components/ui/accordion';
    import Icon from '@iconify/svelte';

    export let title: string | undefined = undefined;
    export let faqs: Array<{
        question: string;
        answer: string;
    }>;
</script>

<section class="py-16 px-4 bg-muted/30">
    <div class="container mx-auto">
        {#if title}
            <div class="text-center mb-12">
                <h2 class="text-3xl font-medium text-foreground mb-4 flex items-center justify-center gap-3">
                    <Icon icon="mdi:help-circle" class="w-8 h-8 text-spiritual-saffron-500" />
                    {title}
                </h2>
                <p class="text-muted-foreground text-lg">Häufig gestellte Fragen und Antworten</p>
            </div>
        {/if}

        <div class="max-w-3xl mx-auto">
            <Accordion.Root type="single" collapsible class="space-y-4">
                {#each faqs as faq, index}
                    <Accordion.Item value={`item-${index}`} class="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <Accordion.Trigger class="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-muted/50 transition-colors [&[data-state=open]>svg]:rotate-180">
                            <h3 class="text-lg font-medium text-card-foreground pr-4">
                                {faq.question}
                            </h3>
                            <Icon icon="mdi:chevron-down" class="w-5 h-5 text-muted-foreground transition-transform duration-200" />
                        </Accordion.Trigger>
                        <Accordion.Content class="px-6 pb-4">
                            <div class="pt-2 border-t border-border/50">
                                <p class="text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {faq.answer}
                                </p>
                            </div>
                        </Accordion.Content>
                    </Accordion.Item>
                {/each}
            </Accordion.Root>
        </div>

        <!-- Zusätzliche Hilfe-Sektion -->
        <div class="mt-12 text-center">
            <div class="inline-flex items-center gap-2 px-6 py-3 bg-spiritual-saffron-50 text-spiritual-saffron-800 rounded-lg border border-spiritual-saffron-200">
                <Icon icon="mdi:lightbulb" class="w-5 h-5" />
                <span class="text-sm font-medium">
                    Weitere Fragen? 
                    <a href="/kontakt" class="underline hover:no-underline">
                        Kontaktieren Sie uns gerne!
                    </a>
                </span>
            </div>
        </div>
    </div>
</section>