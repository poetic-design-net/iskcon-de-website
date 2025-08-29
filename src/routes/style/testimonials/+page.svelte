<script lang="ts">
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { Button } from '$lib/components/ui/button';
  
  let visible = false;
  
  onMount(() => {
    visible = true;
  });

  const testimonials = [
    {
      id: 1,
      name: 'Anna Schmidt',
      location: 'Berlin',
      rating: 5,
      avatar: 'https://tecdn.b-cdn.net/img/new/avatars/2.webp',
      text: 'Die Gemeinschaft bei ISKCON hat mein Leben verändert. Die spirituelle Praxis gibt mir täglich Kraft und inneren Frieden.',
      highlight: 'Lebensverändernd',
      date: 'vor 2 Wochen'
    },
    {
      id: 2,
      name: 'Michael Weber',
      location: 'München',
      rating: 5,
      avatar: 'https://tecdn.b-cdn.net/img/new/avatars/5.webp',
      text: 'Als ich das erste Mal am Kirtan teilnahm, fühlte ich eine tiefe Verbindung. Die Musik und Mantras berühren meine Seele.',
      highlight: 'Spirituelle Musik',
      date: 'vor 1 Monat'
    },
    {
      id: 3,
      name: 'Sarah Müller',
      location: 'Hamburg',
      rating: 5,
      avatar: 'https://tecdn.b-cdn.net/img/new/avatars/8.webp',
      text: 'Das vegetarische Prasadam ist nicht nur köstlich, sondern auch spirituell erfüllend. Ich habe hier wahre Freunde gefunden.',
      highlight: 'Gemeinschaft',
      date: 'vor 3 Wochen'
    },
    {
      id: 4,
      name: 'Thomas Klein',
      location: 'Frankfurt',
      rating: 5,
      avatar: 'https://tecdn.b-cdn.net/img/new/avatars/1.webp',
      text: 'Die Philosophie der Bhagavad-gita hat mir geholfen, einen tieferen Sinn im Leben zu finden. Die Lehren sind zeitlos.',
      highlight: 'Philosophie',
      date: 'vor 2 Monaten'
    }
  ];
</script>

<svelte:head>
  <title>Testimonials & Reviews - ISKCON Style Guide</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 py-12">
  <div class="container mx-auto px-4">
    {#if visible}
      <h1 class="text-4xl font-bold text-center mb-4" in:fade={{ duration: 600 }}>
        Testimonials & Reviews
      </h1>
      <p class="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto" in:fade={{ duration: 600, delay: 100 }}>
        Beispiele für Bewertungen und Erfahrungsberichte mit echten Avatar-Bildern
      </p>
    {/if}

    <!-- Card Style Testimonials -->
    {#if visible}
      <section class="mb-16" in:fly={{ y: 20, duration: 600, delay: 200 }}>
        <h2 class="text-2xl font-semibold mb-6">Karten-Stil</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {#each testimonials as testimonial, i}
            <div 
              class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 transform hover:-translate-y-1"
              in:fly={{ y: 20, duration: 500, delay: 300 + i * 100 }}
            >
              <!-- Header with Avatar -->
              <div class="flex items-start mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  class="w-12 h-12 rounded-full object-cover mr-3"
                  loading="lazy"
                />
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p class="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
              
              <!-- Rating Stars -->
              <div class="flex mb-3">
                {#each Array(5) as _, index}
                  <Icon 
                    icon="mdi:star" 
                    class="w-4 h-4 {index < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}"
                  />
                {/each}
              </div>
              
              <!-- Review Text -->
              <p class="text-gray-600 mb-4 text-sm italic">
                "{testimonial.text}"
              </p>
              
              <!-- Footer -->
              <div class="flex items-center justify-between">
                <span class="inline-flex items-center gap-1 bg-primary-500/10 text-primary-600 px-2 py-1 rounded-full text-xs font-medium">
                  <Icon icon="mdi:heart" class="w-3 h-3" />
                  {testimonial.highlight}
                </span>
                <span class="text-xs text-gray-400">{testimonial.date}</span>
              </div>
            </div>
          {/each}
        </div>
      </section>
    {/if}

    <!-- Horizontal Style -->
    {#if visible}
      <section class="mb-16" in:fly={{ y: 20, duration: 600, delay: 400 }}>
        <h2 class="text-2xl font-semibold mb-6">Horizontal-Stil</h2>
        <div class="space-y-4">
          {#each testimonials.slice(0, 2) as testimonial, i}
            <div 
              class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6"
              in:fly={{ x: -20, duration: 500, delay: 500 + i * 100 }}
            >
              <div class="flex gap-6">
                <!-- Large Avatar -->
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  class="w-20 h-20 rounded-full object-cover flex-shrink-0"
                  loading="lazy"
                />
                
                <!-- Content -->
                <div class="flex-1">
                  <div class="flex items-start justify-between mb-2">
                    <div>
                      <h3 class="font-semibold text-lg text-gray-900">{testimonial.name}</h3>
                      <p class="text-sm text-gray-500">{testimonial.location} • {testimonial.date}</p>
                    </div>
                    <div class="flex">
                      {#each Array(5) as _, index}
                        <Icon 
                          icon="mdi:star" 
                          class="w-5 h-5 {index < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}"
                        />
                      {/each}
                    </div>
                  </div>
                  
                  <p class="text-gray-700 mb-3">
                    {testimonial.text}
                  </p>
                  
                  <div class="flex items-center gap-4">
                    <span class="inline-flex items-center gap-1 bg-primary-500/10 text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
                      <Icon icon="mdi:check-circle" class="w-4 h-4" />
                      Verifiziert
                    </span>
                    <button class="text-sm text-gray-500 hover:text-primary-500 transition-colors">
                      Hilfreich (23)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </section>
    {/if}

    <!-- Quote Style -->
    {#if visible}
      <section class="mb-16" in:fly={{ y: 20, duration: 600, delay: 600 }}>
        <h2 class="text-2xl font-semibold mb-6">Zitat-Stil</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {#each testimonials.slice(0, 2) as testimonial, i}
            <div 
              class="bg-gradient-to-br from-primary-500/5 to-primary-600/5 rounded-xl p-8 relative"
              in:fly={{ y: 20, duration: 500, delay: 700 + i * 100 }}
            >
              <!-- Quote Icon -->
              <Icon icon="mdi:format-quote-open" class="absolute top-4 left-4 w-8 h-8 text-primary-500/20" />
              
              <!-- Content -->
              <blockquote class="relative z-10">
                <p class="text-lg text-gray-700 italic mb-6 pl-8">
                  {testimonial.text}
                </p>
                
                <!-- Author -->
                <footer class="flex items-center gap-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    class="w-10 h-10 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <cite class="not-italic font-semibold text-gray-900">{testimonial.name}</cite>
                    <p class="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </footer>
              </blockquote>
            </div>
          {/each}
        </div>
      </section>
    {/if}

    <!-- Minimal Style -->
    {#if visible}
      <section class="mb-16" in:fly={{ y: 20, duration: 600, delay: 800 }}>
        <h2 class="text-2xl font-semibold mb-6">Minimalistisch</h2>
        <div class="bg-white rounded-xl p-8">
          <div class="max-w-3xl mx-auto text-center">
            {#each testimonials.slice(0, 1) as testimonial}
              <div in:fade={{ duration: 600, delay: 900 }}>
                <!-- Large Quote -->
                <Icon icon="mdi:format-quote-open" class="w-12 h-12 text-primary-500/30 mx-auto mb-4" />
                
                <blockquote class="text-2xl text-gray-700 font-light italic mb-8 leading-relaxed">
                  {testimonial.text}
                </blockquote>
                
                <!-- Author with Avatar -->
                <div class="flex items-center justify-center gap-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    class="w-14 h-14 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div class="text-left">
                    <div class="font-semibold text-gray-900">{testimonial.name}</div>
                    <div class="text-sm text-gray-500">{testimonial.location}</div>
                  </div>
                </div>
                
                <!-- Rating -->
                <div class="flex justify-center mt-4">
                  {#each Array(5) as _, index}
                    <Icon 
                      icon="mdi:star" 
                      class="w-5 h-5 {index < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}"
                    />
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        </div>
      </section>
    {/if}

    <!-- Interactive Carousel Preview -->
    {#if visible}
      <section in:fly={{ y: 20, duration: 600, delay: 1000 }}>
        <h2 class="text-2xl font-semibold mb-6">Interaktive Elemente</h2>
        <div class="bg-white rounded-xl p-8">
          <div class="text-center mb-6">
            <Button variant="soft">
              <Icon icon="mdi:refresh" class="w-5 h-5 mr-2" />
              Mehr Bewertungen laden
            </Button>
          </div>
          
          <div class="flex justify-center gap-2">
            {#each Array(4) as _, i}
              <button 
                class="w-2 h-2 rounded-full transition-all duration-300 {i === 0 ? 'w-8 bg-primary-500' : 'bg-gray-300 hover:bg-gray-400'}"
                aria-label="Seite {i + 1}"
              />
            {/each}
          </div>
        </div>
      </section>
    {/if}
  </div>
</div>