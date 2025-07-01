<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { fly, slide } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
  import Icon from '@iconify/svelte';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { Separator } from '$lib/components/ui/separator';
  import MegaMenu from './MegaMenu.svelte';
  import type { MegaMenuCategory } from '$lib/types';

  // Props für dynamische Daten
  export let navigationData: MegaMenuCategory[] | null = null;

  const icons = {
    menu: 'mdi:menu',
    close: 'mdi:close',
    facebook: 'mdi:facebook',
    instagram: 'mdi:instagram',
    youtube: 'mdi:youtube',
    email: 'mdi:email-outline',
    phone: 'mdi:phone-outline',
    location: 'mdi:map-marker-outline',
    chevronDown: 'mdi:chevron-down'
  };

  let isOpen = false;
  let hasScrolled = false;
  let y: number;
  let activeSubmenu = '';

  const toggleMenu = () => {
    isOpen = !isOpen;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      activeSubmenu = '';
    }
  };

  const toggleSubmenu = (menu: string) => {
    activeSubmenu = activeSubmenu === menu ? '' : menu;
  };

  onMount(() => {
    return () => {
      document.body.style.overflow = '';
    };
  });

  $: if (y > 20) {
    hasScrolled = true;
  } else {
    hasScrolled = false;
  }

  // Fallback Mobile Navigation Items
  const fallbackMobileItems = [
    {
      title: 'Über uns',
      slug: 'ueber-uns',
      icon: 'mdi:information-outline',
      submenu: [
        { title: 'Unsere Mission', slug: 'ueber-uns/mission', icon: 'mdi:heart' },
        { title: 'Geschichte', slug: 'ueber-uns/geschichte', icon: 'mdi:history' },
        { title: 'Philosophie', slug: 'ueber-uns/philosophie', icon: 'mdi:lotus' }
      ]
    },
    {
      title: 'Events',
      slug: 'events',
      icon: 'mdi:calendar-star',
      submenu: [
        { title: 'Alle Events', slug: 'events', icon: 'mdi:calendar' },
        { title: 'Festivals', slug: 'events/festivals', icon: 'mdi:party-popper' },
        { title: 'Kurse', slug: 'events/kurse', icon: 'mdi:school' }
      ]
    },
    {
      title: 'Tempel',
      slug: 'tempel',
      icon: 'mdi:temple-hindu',
      submenu: [
        { title: 'Standorte', slug: 'tempel', icon: 'mdi:map-marker' },
        { title: 'Besuchszeiten', slug: 'tempel/zeiten', icon: 'mdi:clock-outline' },
        { title: 'Führungen', slug: 'tempel/fuehrungen', icon: 'mdi:account-group' }
      ]
    },
    {
      title: 'Vedische Schriften',
      slug: 'vedische-schriften',
      icon: 'mdi:book-ancient',
      submenu: [
        { title: 'Alle Bücher', slug: 'literature', icon: 'mdi:library' },
        { title: 'Bhagavad-gita As It Is', slug: 'literature/bhagavad-gita', icon: 'mdi:book-heart' },
        { title: 'Srimad-Bhagavatam', slug: 'literature/srimad-bhagavatam', icon: 'mdi:book-multiple' }
      ]
    },
    {
      title: 'Spirituelle Praxis',
      slug: 'spirituelle-praxis',
      icon: 'mdi:lotus',
      submenu: [
        { title: 'Bhakti-Yoga', slug: 'lehren/bhakti-yoga', icon: 'mdi:yoga' },
        { title: 'Meditation & Mantras', slug: 'lehren/meditation-mantras', icon: 'mdi:meditation' },
        { title: 'Online-Kurse', slug: 'lehren/online-kurse', icon: 'mdi:school' },
        { title: 'Studiengruppen', slug: 'lehren/studiengruppen', icon: 'mdi:account-group' }
      ]
    },
    { title: 'Kontakt', slug: 'kontakt', icon: 'mdi:contact-mail' }
  ];

  // Fallback Mega Menu Items
  const fallbackMegaMenuItems: MegaMenuCategory[] = [
    {
      title: 'Über uns',
      slug: 'ueber-uns',
      icon: 'mdi:information-outline',
      sections: [
        {
          title: 'ISKCON',
          items: [
            { title: 'Unsere Mission', slug: 'ueber-uns/mission', description: 'Die spirituelle Mission von ISKCON', icon: 'mdi:heart' },
            { title: 'Geschichte', slug: 'ueber-uns/geschichte', description: 'Von Srila Prabhupada bis heute', icon: 'mdi:history' },
            { title: 'Philosophie', slug: 'ueber-uns/philosophie', description: 'Krishna-Bewusstsein verstehen', icon: 'mdi:lotus' }
          ]
        }
      ],
      featured: {
        title: 'Srila Prabhupada',
        description: 'Lernen Sie unseren Gründer-Acharya kennen',
        href: '/ueber-uns/srila-prabhupada'
      }
    },
    {
      title: 'Events',
      slug: 'events',
      icon: 'mdi:calendar-star',
      sections: [
        {
          title: 'Veranstaltungen',
          items: [
            { title: 'Alle Events', slug: 'events', description: 'Kommende Veranstaltungen', icon: 'mdi:calendar' },
            { title: 'Festivals', slug: 'events/festivals', description: 'Spirituelle Feste feiern', icon: 'mdi:party-popper' }
          ]
        }
      ]
    },
    {
      title: 'Tempel',
      slug: 'tempel',
      icon: 'mdi:temple-hindu',
      sections: [
        {
          title: 'Standorte',
          items: [
            { title: 'Alle Tempel', slug: 'tempel', description: 'ISKCON Zentren in Deutschland', icon: 'mdi:map-marker' },
            { title: 'Berlin', slug: 'tempel/berlin', description: 'Bhaktivedanta Ashram', icon: 'mdi:city' }
          ]
        }
      ]
    },
    {
      title: 'Vedische Schriften',
      slug: 'vedische-schriften',
      icon: 'mdi:book-ancient',
      sections: [
        {
          title: 'Spirituelle Literatur',
          items: [
            { title: 'Alle Bücher', slug: 'literature', description: 'Vollständige Sammlung vedischer Literatur', icon: 'mdi:library' },
            { title: 'Bhagavad-gita As It Is', slug: 'literature/bhagavad-gita', description: 'Das wichtigste spirituelle Handbuch', icon: 'mdi:book-heart' },
            { title: 'Srimad-Bhagavatam', slug: 'literature/srimad-bhagavatam', description: 'Die reife Frucht des vedischen Wissens', icon: 'mdi:book-multiple' }
          ]
        }
      ],
      featured: {
        title: 'Bhagavad-gita As It Is',
        description: 'Das wichtigste spirituelle Handbuch von Srila Prabhupada',
        href: '/literature'
      }
    },
    {
      title: 'Spirituelle Praxis',
      slug: 'spirituelle-praxis',
      icon: 'mdi:lotus',
      sections: [
        {
          title: 'Praxis & Philosophie',
          items: [
            { title: 'Bhakti-Yoga', slug: 'lehren/bhakti-yoga', description: 'Der Yoga der liebenden Hingabe', icon: 'mdi:yoga' },
            { title: 'Vedische Philosophie', slug: 'lehren/vedische-philosophie', description: 'Grundlagen der Spiritualität', icon: 'mdi:lotus' },
            { title: 'Meditation & Mantras', slug: 'lehren/meditation-mantras', description: 'Mantra-Meditation', icon: 'mdi:meditation' }
          ]
        },
        {
          title: 'Lernen & Vertiefen',
          items: [
            { title: 'Online-Kurse', slug: 'lehren/online-kurse', description: 'Strukturierte spirituelle Bildung', icon: 'mdi:school' },
            { title: 'Studiengruppen', slug: 'lehren/studiengruppen', description: 'Gemeinsam die Schriften studieren', icon: 'mdi:account-group' }
          ]
        }
      ],
      featured: {
        title: 'Bhakti-Yoga Kurs',
        description: 'Beginnen Sie Ihre spirituelle Reise mit unserem Grundkurs',
        href: '/lehren/online-kurse'
      }
    },
    {
      title: 'Community',
      slug: 'community',
      icon: 'mdi:account-group'
    }
  ];

  // Verwende dynamische Daten wenn verfügbar, sonst Fallback
  $: megaMenuData = navigationData || fallbackMegaMenuItems;
  $: mobileMenuData = navigationData?.map(item => ({
    title: item.title,
    slug: item.slug,
    icon: item.icon,
    submenu: item.sections?.flatMap(section => section.items) || []
  })) || fallbackMobileItems;
</script>

<svelte:window bind:scrollY={y}/>

<nav class={`fixed w-full z-[60] px-4 transition-all duration-300 ${
  hasScrolled 
    ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border' 
    : 'bg-background/90 backdrop-blur-sm'
}`}>
  <div class="mx-auto container">
    <div class="flex items-center justify-between h-24">
      <!-- Logo -->
      <div class="flex items-end gap-6 flex-1">
        <a href="/" class="flex-shrink-0 hover:opacity-80 transition-opacity">
          <img src="/iskcon_logo.svg" alt="ISKCON Logo" class="h-20 w-auto" />
        </a>
      </div>

      <!-- Desktop Mega Menu -->
      <div class="hidden xl:block">
        <MegaMenu menuItems={megaMenuData} />
      </div>

      <!-- Mobile Menu Button -->
      <Button
        variant="ghost"
        size="icon"
        class="xl:hidden relative z-[70] text-spiritual-saffron-600 hover:text-spiritual-saffron-700 hover:bg-spiritual-saffron-50"
        on:click={toggleMenu}
        aria-label="Toggle menu"
      >
        <Icon icon={isOpen ? icons.close : icons.menu} class="w-6 h-6" />
      </Button>
    </div>
  </div>
</nav>

<!-- Mobile Slide-in Menu -->
{#if isOpen}
  <div
    class="fixed inset-0 z-[65] bg-black/20 backdrop-blur-sm lg:hidden"
    transition:fly={{ duration: 300, x: "100%", opacity: 1, easing: cubicInOut }}
    on:click={toggleMenu}
    role="button"
    tabindex="0"
    on:keydown={(e) => e.key === 'Escape' && toggleMenu()}
  >
    <!-- Menu Container -->
    <div
      class="absolute right-0 top-0 bottom-0 w-full max-w-md bg-background border-l border-border shadow-2xl"
      transition:fly={{ duration: 300, x: "100%", opacity: 1, easing: cubicInOut }}
      on:click|stopPropagation
      role="dialog"
      aria-modal="true"
    >
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-border">
        <div class="flex items-center gap-3">
          <Icon icon="mdi:lotus" class="w-6 h-6 text-spiritual-saffron-600" />
          <span class="font-medium text-foreground">Navigation</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          class="text-muted-foreground hover:text-spiritual-saffron-600"
          on:click={toggleMenu}
        >
          <Icon icon={icons.close} class="w-5 h-5" />
        </Button>
      </div>

      <div class="h-full overflow-y-auto pb-20">
        <!-- Navigation Items -->
        <nav class="p-6 space-y-2">
          {#each mobileMenuData as item}
            <div class="space-y-1">
              {#if item.submenu && item.submenu.length > 0}
                <Button
                  variant="ghost"
                  class="w-full justify-between text-left h-auto p-3 text-foreground hover:bg-spiritual-saffron-50"
                  on:click={() => toggleSubmenu(item.slug)}
                >
                  <div class="flex items-center gap-3">
                    <Icon icon={item.icon} class="w-5 h-5 text-spiritual-saffron-600" />
                    <span class="text-base font-medium">{item.title}</span>
                  </div>
                  <Icon 
                    icon={icons.chevronDown} 
                    class={`w-4 h-4 transition-transform ${activeSubmenu === item.slug ? 'rotate-180' : ''}`} 
                  />
                </Button>
                
                {#if activeSubmenu === item.slug}
                  <div
                    class="ml-8 space-y-1 rounded-lg bg-muted/50 p-3"
                    transition:slide={{ duration: 200, easing: cubicInOut }}
                  >
                    {#each item.submenu as subItem}
                      <Button
                        variant="ghost"
                        href={`/${subItem.slug}`}
                        class="w-full justify-start text-left h-auto p-2 text-muted-foreground hover:text-spiritual-saffron-700"
                        on:click={toggleMenu}
                      >
                        <Icon icon={subItem.icon || 'mdi:circle'} class="w-4 h-4 mr-3" />
                        {subItem.title}
                      </Button>
                    {/each}
                  </div>
                {/if}
              {:else}
                <Button
                  variant="ghost"
                  href={`/${item.slug}`}
                  class="w-full justify-start text-left h-auto p-3 text-foreground hover:bg-spiritual-saffron-50"
                  on:click={toggleMenu}
                >
                  <Icon icon={item.icon} class="w-5 h-5 mr-3 text-spiritual-saffron-600" />
                  <span class="text-base font-medium">{item.title}</span>
                </Button>
              {/if}
            </div>
          {/each}
        </nav>

        <Separator class="mx-6" />

        <!-- Social Links -->
        <div class="p-6">
          <h3 class="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            <Icon icon="mdi:share-variant" class="w-4 h-4" />
            Folgen Sie uns
          </h3>
          <div class="flex space-x-3">
            <Button variant="outline" size="icon" href="#" class="text-blue-600 hover:bg-blue-50">
              <Icon icon={icons.facebook} class="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" href="#" class="text-pink-600 hover:bg-pink-50">
              <Icon icon={icons.instagram} class="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" href="#" class="text-red-600 hover:bg-red-50">
              <Icon icon={icons.youtube} class="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Separator class="mx-6" />

        <!-- Contact Information -->
        <div class="p-6 space-y-4">
          <h3 class="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            <Icon icon="mdi:information" class="w-4 h-4" />
            Kontakt Informationen
          </h3>
          
          <div class="space-y-3">
            <div class="flex items-center gap-3 text-sm">
              <Badge variant="outline" class="w-8 h-8 p-0 flex items-center justify-center">
                <Icon icon={icons.email} class="w-3 h-3" />
              </Badge>
              <span class="text-foreground">info@iskcon.de</span>
            </div>
            
            <div class="flex items-center gap-3 text-sm">
              <Badge variant="outline" class="w-8 h-8 p-0 flex items-center justify-center">
                <Icon icon={icons.phone} class="w-3 h-3" />
              </Badge>
              <span class="text-foreground">+49 (0) XXX XXXXXXX</span>
            </div>
            
            <div class="flex items-start gap-3 text-sm">
              <Badge variant="outline" class="w-8 h-8 p-0 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon icon={icons.location} class="w-3 h-3" />
              </Badge>
              <div class="text-foreground leading-relaxed">
                <div>ISKCON Deutschland-Österreich e.V.</div>
                <div class="text-muted-foreground">Beispielstraße 123</div>
                <div class="text-muted-foreground">12345 Berlin</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}