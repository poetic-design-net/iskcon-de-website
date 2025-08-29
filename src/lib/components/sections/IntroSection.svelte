<script lang="ts">
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  import { quintOut, cubicOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';
  import Icon from '@iconify/svelte';
  import { Button } from '$lib/components/ui/button';

  let visible = false;
  let activeTab = 0;
  let statsVisible = false;
  
  // Animated counters
  const centersCount = tweened(0, { duration: 2000, easing: cubicOut });
  const booksCount = tweened(0, { duration: 2000, easing: cubicOut });
  const mealsCount = tweened(0, { duration: 2000, easing: cubicOut });
  const yearsCount = tweened(0, { duration: 1500, easing: cubicOut });
  
  onMount(() => {
    visible = true;
    
    // Start animation after a delay when component is mounted
    setTimeout(() => {
      // Direct animation without Intersection Observer for now
      statsVisible = true;
      centersCount.set(600);
      booksCount.set(100);
      mealsCount.set(3);
      yearsCount.set(58);
    }, 800); // Start after other animations
  });

  const introCards = [
    {
      icon: 'mdi:temple-hindu',
      title: 'Was ist ISKCON?',
      content: 'Die Internationale Gesellschaft für Krishna-Bewusstsein (ISKCON) ist eine weltweite spirituelle Gemeinschaft, die 1966 gegründet wurde. Wir praktizieren und teilen die zeitlose Weisheit des Bhakti-Yoga - den Pfad der liebenden Hingabe.',
      highlight: 'Über 600 Zentren weltweit',
      image: 'https://images.unsplash.com/photo-1701757017692-ae3a750c32d0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageAlt: 'ISKCON Tempel mit traditioneller Architektur',
      link: '/ueber-uns',
      linkText: 'Mehr über uns'
    },
    {
      icon: 'mdi:heart-multiple',
      title: 'Was glauben wir?',
      content: 'Unsere Philosophie basiert auf den vedischen Schriften, insbesondere der Bhagavad-gita. Wir glauben an die liebevolle Beziehung zwischen der individuellen Seele und Krishna (Gott) als höchstes Lebensziel.',
      highlight: '5000 Jahre alte Tradition',
      image: 'https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?q=80&w=1170&auto=format&fit=crop',
      imageAlt: 'Heilige vedische Schriften',
      link: '/philosophie',
      linkText: 'Philosophie erkunden'
    },
    {
      icon: 'mdi:calendar-star',
      title: 'Was kannst du erleben?',
      content: 'Besuche unsere Tempel für spirituelle Programme, vegetarisches Essen (Prasadam), Meditation, Kirtan (gemeinsames Singen) und kulturelle Festivals. Alle sind herzlich willkommen!',
      highlight: 'Täglich geöffnet',
      image: 'https://images.squarespace-cdn.com/content/v1/615bb6c643007d1564db8a25/fd9593e7-272f-4d7a-9d17-cd7e0cc56ee0/11180333_10153400883932400_7380122514960996878_n-1.jpg',
      imageAlt: 'Kirtan Festival - gemeinsames Singen und Tanzen',
      link: '/events',
      linkText: 'Veranstaltungen ansehen'
    }
  ];

  const statsData = [
    { 
      id: 'centers',
      value: 600,
      suffix: '+',
      label: 'Zentren weltweit',
      sublabel: 'in über 100 Ländern',
      icon: 'mdi:earth',
      bgPattern: 'dots'
    },
    { 
      id: 'years',
      value: 58,
      suffix: '',
      label: 'Jahre Erfahrung',
      sublabel: 'seit 1966',
      icon: 'mdi:calendar-clock',
      bgPattern: 'lines'
    },
    { 
      id: 'books',
      value: 100,
      suffix: 'M+',
      label: 'Bücher verteilt',
      sublabel: 'Weisheit geteilt',
      icon: 'mdi:book-open-page-variant',
      bgPattern: 'circles'
    },
    { 
      id: 'meals',
      value: 3,
      suffix: 'M+',
      label: 'Tägliche Mahlzeiten',
      sublabel: 'Food for Life',
      icon: 'mdi:food-apple',
      bgPattern: 'waves'
    }
  ];

  const testimonials = [
    {
      name: 'Maria S.',
      age: '28',
      location: 'Berlin',
      avatar: 'https://tecdn.b-cdn.net/img/new/avatars/2.webp',
      text: 'Als ich das erste Mal einen ISKCON-Tempel besuchte, fühlte ich sofort eine tiefe Ruhe. Die Gemeinschaft hat mich mit offenen Armen empfangen.',
      highlight: 'Meditation & Gemeinschaft'
    },
    {
      name: 'Thomas K.',
      age: '45',
      location: 'München',
      avatar: 'https://tecdn.b-cdn.net/img/new/avatars/5.webp',
      text: 'Die Philosophie der Bhagavad-gita hat mir geholfen, einen tieferen Sinn im Leben zu finden. Die praktischen Lehren sind zeitlos relevant.',
      highlight: 'Lebensphilosophie'
    },
    {
      name: 'Sarah L.',
      age: '32',
      location: 'Hamburg',
      avatar: 'https://tecdn.b-cdn.net/img/new/avatars/8.webp',
      text: 'Kirtan ist für mich wie eine musikalische Meditation. Es öffnet mein Herz und verbindet mich mit etwas Größerem.',
      highlight: 'Spirituelle Musik'
    }
  ];

  function handleTabClick(index: number) {
    activeTab = index;
  }
</script>

<section class="relative py-16 md:py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
  <!-- Decorative background elements -->
  <div class="absolute inset-0 pointer-events-none">
    <div class="absolute top-20 left-10 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
  </div>

  <div class="container mx-auto px-4 relative z-10">
    <!-- Header -->
    {#if visible}
      <div class="text-center mb-12" in:fade={{ duration: 600, delay: 100 }}>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Entdecke Krishna-Bewusstsein
        </h2>
        <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Willkommen bei einer der ältesten spirituellen Traditionen der Welt - 
          modern gelebt und für jeden zugänglich
        </p>
      </div>
    {/if}

    <!-- Interactive Cards with Images -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
      {#each introCards as card, i}
        {#if visible}
          <div 
            class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer transform hover:-translate-y-1"
            in:fly={{ y: 30, duration: 600, delay: 200 + i * 100, easing: quintOut }}
            role="article"
          >
            <!-- Image Header -->
            <div class="relative h-48 overflow-hidden bg-gradient-to-br from-primary-500/10 to-primary-600/10">
              {#if card.image}
                <img 
                  src={card.image} 
                  alt={card.imageAlt}
                  class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              {/if}
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div class="absolute bottom-4 left-6 text-white">
                <Icon icon={card.icon} class="w-10 h-10 drop-shadow-lg" />
              </div>
            </div>

            <div class="p-6 md:p-8">
              <!-- Title -->
              <h3 class="text-xl md:text-2xl font-semibold text-gray-900 mb-3 group-hover:text-primary-500 transition-colors">
                {card.title}
              </h3>

              <!-- Content -->
              <p class="text-gray-600 mb-4 leading-relaxed">
                {card.content}
              </p>

              <!-- Highlight badge -->
              <div class="inline-flex items-center gap-2 bg-primary-500/10 text-primary-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Icon icon="mdi:star" class="w-4 h-4" />
                {card.highlight}
              </div>

              <!-- Link -->
              <a 
                href={card.link}
                class="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium transition-colors group/link"
              >
                {card.linkText}
                <Icon icon="mdi:arrow-right" class="w-4 h-4 ml-2 transform transition-transform group-hover/link:translate-x-1" />
              </a>
            </div>
          </div>
        {/if}
      {/each}
    </div>

    <!-- Modern Stats Section -->
    {#if visible}
      <div id="stats-section" class="relative py-16" in:fade={{ duration: 600, delay: 600 }}>
        <!-- Background decoration -->
        <div class="absolute inset-0 -z-10">
          <div class="absolute top-0 left-1/4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"></div>
        </div>
        
        <h3 class="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-900">
          ISKCON in Zahlen
        </h3>
        <p class="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Eine weltweite Bewegung, die Millionen von Menschen inspiriert
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {#each statsData as stat, i}
            <div 
              class="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              in:fly={{ y: 30, duration: 600, delay: 700 + i * 100, easing: quintOut }}
            >
              <!-- Background Pattern -->
              <div class="absolute top-0 right-0 w-32 h-32 opacity-5">
                {#if stat.bgPattern === 'dots'}
                  <div class="grid grid-cols-4 gap-2">
                    {#each Array(16) as _}
                      <div class="w-2 h-2 bg-gray-900 rounded-full"></div>
                    {/each}
                  </div>
                {:else if stat.bgPattern === 'lines'}
                  <svg class="w-full h-full" viewBox="0 0 100 100">
                    {#each Array(5) as _, i}
                      <line x1="0" y1={i * 25} x2="100" y2={i * 25} stroke="currentColor" stroke-width="2"/>
                    {/each}
                  </svg>
                {:else if stat.bgPattern === 'circles'}
                  <svg class="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="2"/>
                    <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" stroke-width="2"/>
                    <circle cx="50" cy="50" r="50" fill="none" stroke="currentColor" stroke-width="2"/>
                  </svg>
                {/if}
              </div>
              
              <!-- Icon with primary color background -->
              <div class="relative mb-4">
                <div class="w-14 h-14 bg-primary-500 rounded-xl flex items-center justify-center transition-all group-hover:bg-primary-600">
                  <Icon icon={stat.icon} class="w-7 h-7 text-white" />
                </div>
              </div>
              
              <!-- Animated Number -->
              <div class="relative">
                <div class="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                  {#if stat.id === 'centers'}
                    {Math.floor($centersCount)}{stat.suffix}
                  {:else if stat.id === 'years'}
                    {Math.floor($yearsCount)}
                  {:else if stat.id === 'books'}
                    {Math.floor($booksCount)}{stat.suffix}
                  {:else if stat.id === 'meals'}
                    {Math.floor($mealsCount)}{stat.suffix}
                  {/if}
                </div>
                <div class="text-gray-900 font-semibold">{stat.label}</div>
                <div class="text-sm text-gray-500 mt-1">{stat.sublabel}</div>
              </div>
              
              <!-- Hover effect line -->
              <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          {/each}
        </div>
        
        <!-- Additional context -->
        <div class="text-center mt-12">
          <p class="text-gray-600 max-w-2xl mx-auto">
            Von einem bescheidenen Anfang in New York bis zu einer globalen spirituellen Bewegung - 
            ISKCON wächst kontinuierlich und berührt Leben auf der ganzen Welt.
          </p>
        </div>
      </div>
    {/if}

    <!-- Visual Divider with Quote -->
    {#if visible}
      <div class="relative my-16 py-20 rounded-2xl overflow-hidden" in:fade={{ duration: 600, delay: 700 }}>
        <!-- Background Image -->
        <div class="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1588416936097-41850ab3d86d?q=80&w=1170&auto=format&fit=crop" 
            alt="Meditation und spirituelle Praxis" 
            class="w-full h-full object-cover"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70"></div>
        </div>
        
        <!-- Quote Content -->
        <div class="relative z-10 max-w-4xl mx-auto text-center px-6">
          <Icon icon="mdi:format-quote-open" class="w-12 h-12 text-white/60 mx-auto mb-4" />
          <blockquote class="text-2xl md:text-3xl text-white font-light italic mb-4">
            "Wann immer und wo immer die Religion abnimmt und Irreligion überhand nimmt, 
            erscheine Ich, o Nachkomme Bharatas."
          </blockquote>
          <cite class="text-lg text-white/90 not-italic">
            - Krishna, Bhagavad-gita 4.7
          </cite>
        </div>
      </div>
    {/if}

    <!-- Interactive Q&A Section -->
    {#if visible}
      <div class="mt-16" in:fade={{ duration: 600, delay: 800 }}>
        <h3 class="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
          Häufige Fragen
        </h3>
        
        <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
          <!-- Tab Navigation -->
          <div class="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
            {#each ['Grundlagen', 'Praxis', 'Besuch'] as tab, i}
              <button
                on:click={() => handleTabClick(i)}
                class="px-4 py-2 font-medium transition-all duration-300 border-b-2 -mb-[2px] {activeTab === i ? 'text-primary-500 border-primary-500' : 'text-gray-600 border-transparent hover:text-gray-900'}"
              >
                {tab}
              </button>
            {/each}
          </div>

          <!-- Tab Content -->
          <div class="space-y-4">
            {#if activeTab === 0}
              <div in:fade={{ duration: 200 }}>
                <div class="space-y-4">
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Icon icon="mdi:help-circle" class="w-5 h-5 text-primary-500" />
                      Muss ich Hindu sein, um ISKCON zu besuchen?
                    </h4>
                    <p class="text-gray-600">
                      Nein! ISKCON heißt Menschen aller Glaubensrichtungen und Hintergründe willkommen. 
                      Unsere Gemeinschaft ist international und vielfältig.
                    </p>
                  </div>
                  
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Icon icon="mdi:help-circle" class="w-5 h-5 text-primary-500" />
                      Was bedeutet "Hare Krishna"?
                    </h4>
                    <p class="text-gray-600">
                      "Hare Krishna" ist ein Mantra (heiliger Klang) aus dem Sanskrit. 
                      Es ist eine Anrufung Gottes in seinen verschiedenen Aspekten und wird zur Meditation und spirituellen Erhebung gesungen.
                    </p>
                  </div>
                </div>
              </div>
            {/if}
            
            {#if activeTab === 1}
              <div in:fade={{ duration: 200 }}>
                <div class="space-y-4">
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Icon icon="mdi:help-circle" class="w-5 h-5 text-primary-500" />
                      Sind alle Hare Krishnas Vegetarier?
                    </h4>
                    <p class="text-gray-600">
                      Ja, wir praktizieren Ahimsa (Gewaltlosigkeit) und ernähren uns vegetarisch. 
                      In unseren Tempeln wird köstliches vegetarisches Essen (Prasadam) angeboten, das jeder probieren kann.
                    </p>
                  </div>
                  
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Icon icon="mdi:help-circle" class="w-5 h-5 text-primary-500" />
                      Was ist Kirtan?
                    </h4>
                    <p class="text-gray-600">
                      Kirtan ist gemeinsames spirituelles Singen mit Musik. 
                      Es ist eine freudvolle Form der Meditation, die das Herz öffnet und Gemeinschaft schafft.
                    </p>
                  </div>
                </div>
              </div>
            {/if}
            
            {#if activeTab === 2}
              <div in:fade={{ duration: 200 }}>
                <div class="space-y-4">
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Icon icon="mdi:help-circle" class="w-5 h-5 text-primary-500" />
                      Kann ich einfach vorbeikommen?
                    </h4>
                    <p class="text-gray-600">
                      Absolut! Unsere Tempel sind täglich geöffnet und Besucher sind immer willkommen. 
                      Es gibt keine Anmeldung oder Mitgliedschaft erforderlich.
                    </p>
                  </div>
                  
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Icon icon="mdi:help-circle" class="w-5 h-5 text-primary-500" />
                      Was sollte ich anziehen?
                    </h4>
                    <p class="text-gray-600">
                      Komm, wie du dich wohl fühlst! Wir empfehlen respektvolle, bescheidene Kleidung. 
                      In den Tempelräumen bitten wir darum, die Schuhe auszuziehen.
                    </p>
                  </div>
                </div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    {/if}

    <!-- Testimonials Section -->
    {#if visible}
      <div class="mt-20" in:fade={{ duration: 600, delay: 900 }}>
        <h3 class="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-900">
          Stimmen aus unserer Gemeinschaft
        </h3>
        <p class="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Erfahre, wie andere Menschen ihren Weg zu Krishna-Bewusstsein gefunden haben
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {#each testimonials as testimonial, i}
            <div 
              class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 transform hover:-translate-y-1"
              in:fly={{ y: 20, duration: 500, delay: 1000 + i * 100 }}
            >
              <div class="flex items-start mb-4">
                <div class="flex-shrink-0">
                  {#if testimonial.avatar}
                    <img 
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      class="w-12 h-12 rounded-full object-cover"
                      loading="lazy"
                    />
                  {:else}
                    <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                  {/if}
                </div>
                <div class="ml-3">
                  <h4 class="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p class="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
              
              <blockquote class="text-gray-600 mb-4 italic">
                "{testimonial.text}"
              </blockquote>
              
              <div class="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                <Icon icon="mdi:heart" class="w-4 h-4 text-primary-500" />
                {testimonial.highlight}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Call to Action -->
    {#if visible}
      <div class="text-center mt-16" in:fade={{ duration: 600, delay: 1200 }}>
        <p class="text-lg text-gray-600 mb-6">
          Bereit, mehr zu erfahren? Beginne deine spirituelle Reise noch heute.
        </p>
        <div class="flex flex-wrap gap-4 justify-center">
          <Button 
            href="/tempel"
            variant="default"
            size="lg"
            class="bg-primary-500 hover:bg-primary-600 transition-colors"
          >
            <Icon icon="mdi:map-marker" class="w-5 h-5 mr-2" />
            Tempel in deiner Nähe
          </Button>
          <Button 
            href="/philosophie"
            variant="outline"
            size="lg"
            class="border-primary-500 text-primary-500 hover:bg-primary-500/10 transition-colors"
          >
            <Icon icon="mdi:book-open-page-variant" class="w-5 h-5 mr-2" />
            Philosophie entdecken
          </Button>
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  /* Smooth transitions for interactive elements */
  :global(.hover\:scale-105) {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
</style>