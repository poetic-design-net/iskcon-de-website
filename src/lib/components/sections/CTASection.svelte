<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import Icon from '@iconify/svelte';
  
  export let title: string;
  export let subtitle: string = '';
  export let primaryButton: {
    text: string;
    href: string;
    icon?: string;
  };
  export let secondaryButton: {
    text: string;
    href: string;
    icon?: string;
  } | null = null;
  
  // Style variants
  export let variant: 'default' | 'gradient' | 'dark' = 'gradient';
  
  const variantClasses = {
    default: 'bg-gray-50',
    gradient: 'bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white',
    dark: 'bg-gray-900 text-white'
  };
</script>

<section class="py-16 md:py-24 {variantClasses[variant]}">
  <div class="container mx-auto px-4 text-center">
    <h2 class="text-4xl md:text-5xl font-bold mb-6">
      {title}
    </h2>
    {#if subtitle}
      <p class="text-xl mb-12 max-w-3xl mx-auto {variant === 'gradient' || variant === 'dark' ? 'opacity-90' : 'text-gray-700'}">
        {subtitle}
      </p>
    {/if}
    
    <div class="flex flex-wrap gap-4 justify-center">
      <Button 
        href={primaryButton.href}
        variant={variant === 'gradient' ? 'secondary' : 'default'}
        size="lg"
        class={variant === 'gradient' ? 'text-primary-500' : ''}
      >
        {#if primaryButton.icon}
          <Icon icon={primaryButton.icon} class="w-5 h-5" />
        {/if}
        {primaryButton.text}
      </Button>
      
      {#if secondaryButton}
        <Button 
          href={secondaryButton.href}
          variant="outline"
          size="lg"
          class={variant === 'gradient' || variant === 'dark' ? 'border-white text-white hover:bg-white/10' : ''}
        >
          {#if secondaryButton.icon}
            <Icon icon={secondaryButton.icon} class="w-5 h-5" />
          {/if}
          {secondaryButton.text}
        </Button>
      {/if}
    </div>
  </div>
</section>