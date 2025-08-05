<script lang="ts">
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';
  
  let currentTime = '04:30';
  let activeIndex = 0;
  
  const schedule = [
    {
      time: '04:00',
      title: 'Aufstehen & Duschen',
      description: 'Brahma-muhurta - die günstigste Zeit für spirituelle Praxis',
      icon: 'mdi:shower',
      duration: '30 min'
    },
    {
      time: '04:30',
      title: 'Mangala Arati',
      description: 'Morgenverehrung der Bildgestalten mit Liedern und Gebeten',
      icon: 'mdi:candle',
      duration: '30 min'
    },
    {
      time: '05:00',
      title: 'Tulasi Puja',
      description: 'Verehrung der heiligen Tulasi-Pflanze',
      icon: 'mdi:leaf',
      duration: '15 min'
    },
    {
      time: '05:15',
      title: 'Japa-Meditation',
      description: '16 Runden Hare Krishna Maha-Mantra (1.728 Mal)',
      icon: 'mdi:counter',
      duration: '2 Std'
    },
    {
      time: '07:15',
      title: 'Guru Puja',
      description: 'Verehrung des spirituellen Meisters',
      icon: 'mdi:account-heart',
      duration: '20 min'
    },
    {
      time: '07:35',
      title: 'Srimad-Bhagavatam Klasse',
      description: 'Studium der heiligen Schriften mit Kommentaren',
      icon: 'mdi:book-open-page-variant',
      duration: '1 Std'
    },
    {
      time: '08:35',
      title: 'Prasadam',
      description: 'Frühstück - geweihte vegetarische Nahrung',
      icon: 'mdi:food',
      duration: '30 min'
    },
    {
      time: '09:00',
      title: 'Seva',
      description: 'Praktischer Dienst im Tempel oder zu Hause',
      icon: 'mdi:hand-heart',
      duration: 'variabel'
    }
  ];
  
  onMount(() => {
    const interval = setInterval(() => {
      const now = new Date();
      currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      // Find active schedule item
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      for (let i = 0; i < schedule.length; i++) {
        const [hours, minutes] = schedule[i].time.split(':').map(Number);
        const scheduleMinutes = hours * 60 + minutes;
        if (currentMinutes >= scheduleMinutes) {
          activeIndex = i;
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  });
</script>

<section class="py-16 md:py-24 bg-white">
  <div class="container mx-auto px-4">
    <!-- Header -->
    <div class="text-center mb-12">
      <h2 class="text-4xl md:text-5xl font-bold mb-4">
        Tägliche Sadhana
      </h2>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Ein Tag im Leben eines Bhakti-Yogis - der traditionelle Tagesablauf für spirituellen Fortschritt
      </p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <!-- Timeline -->
      <div>
        <div class="bg-white rounded-xl shadow-lg p-8">
          <!-- Current Time Display -->
          <div class="flex items-center justify-between mb-8">
            <h3 class="text-2xl font-bold">Tagesablauf</h3>
            <div class="flex items-center gap-2 text-gray-600">
              <Icon icon="mdi:clock" class="w-5 h-5" />
              <span class="font-mono text-lg">{currentTime}</span>
            </div>
          </div>
          
          <!-- Timeline Items -->
          <div class="relative">
            <!-- Timeline Line -->
            <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            {#each schedule as item, index}
              <div class="relative flex gap-4 mb-6 last:mb-0">
                <!-- Timeline Dot -->
                <div class="relative z-10 flex-shrink-0">
                  <div class="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                              {index <= activeIndex ? 'bg-gray-700' : 'bg-gray-200'}">
                    <Icon icon={item.icon} class="w-6 h-6 {index <= activeIndex ? 'text-white' : 'text-gray-600'}" />
                  </div>
                  {#if index === activeIndex}
                    <div class="absolute inset-0 rounded-full bg-gray-700 animate-ping"></div>
                  {/if}
                </div>
                
                <!-- Content -->
                <div class="flex-1 pb-6">
                  <div class="flex items-center gap-3 mb-1">
                    <span class="font-mono text-sm font-bold {index <= activeIndex ? 'text-gray-700' : 'text-gray-500'}">
                      {item.time}
                    </span>
                    <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {item.duration}
                    </span>
                  </div>
                  <h4 class="font-semibold text-lg mb-1 {index <= activeIndex ? 'text-gray-900' : 'text-gray-500'}">
                    {item.title}
                  </h4>
                  <p class="text-sm {index <= activeIndex ? 'text-gray-700' : 'text-gray-500'}">
                    {item.description}
                  </p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
      
      <!-- Info Cards -->
      <div class="space-y-6">
        <!-- Why Early Morning -->
        <div class="relative overflow-hidden text-white rounded-xl">
          <!-- Background with Brahma Muhurta image -->
          <div class="absolute inset-0 z-0">
            <img 
              src="/img/brahmamuhurta.jpg" 
              alt="Brahma Muhurta - Die spirituelle Stunde"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
          </div>
          
          <!-- Content -->
          <div class="relative z-10 p-8">
          <h3 class="text-2xl font-bold mb-4 flex items-center gap-3">
            <Icon icon="mdi:weather-sunset-up" class="w-8 h-8" />
            Brahma-Muhurta
          </h3>
          <p class="mb-4">
            Die Zeit von 3:30 bis 5:30 Uhr morgens wird als Brahma-muhurta bezeichnet - 
            die günstigste Zeit für spirituelle Praktiken.
          </p>
          <ul class="space-y-2">
            <li class="flex items-start gap-2">
              <Icon icon="mdi:check-circle" class="w-5 h-5 mt-0.5" />
              <span>Der Geist ist ruhig und klar</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon icon="mdi:check-circle" class="w-5 h-5 mt-0.5" />
              <span>Die Atmosphäre ist sattvisch (rein)</span>
            </li>
            <li class="flex items-start gap-2">
              <Icon icon="mdi:check-circle" class="w-5 h-5 mt-0.5" />
              <span>Keine weltlichen Störungen</span>
            </li>
          </ul>
          </div>
        </div>
        
        <!-- Japa Counter -->
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h3 class="text-2xl font-bold mb-4">Japa-Meditation</h3>
          <div class="bg-gray-100 rounded-lg p-6 mb-4">
            <div class="text-center">
              <p class="text-4xl font-bold text-gray-800 mb-2">16 Runden</p>
              <p class="text-gray-600">= 1.728 Mal Maha-Mantra</p>
            </div>
          </div>
          <p class="text-gray-700 mb-4">
            Das tägliche Chanten von 16 Runden auf der Japa-Mala ist die Grundlage 
            der spirituellen Praxis im Bhakti-Yoga.
          </p>
          <div class="flex items-center gap-4">
            <Icon icon="mdi:timer-sand" class="w-6 h-6 text-gray-500" />
            <span class="text-gray-600">Ca. 2 Stunden täglich</span>
          </div>
        </div>
        
        <!-- Evening Program -->
        <div class="bg-gray-50 rounded-xl p-8">
          <h3 class="text-2xl font-bold mb-4">Abendprogramm</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <Icon icon="mdi:candle" class="w-6 h-6 text-gray-600" />
              <div>
                <p class="font-semibold">19:00 - Gaura Arati</p>
                <p class="text-sm text-gray-600">Abendverehrung</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <Icon icon="mdi:book-open" class="w-6 h-6 text-gray-600" />
              <div>
                <p class="font-semibold">19:30 - Bhagavad-gita Klasse</p>
                <p class="text-sm text-gray-600">Studium & Diskussion</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <Icon icon="mdi:music" class="w-6 h-6 text-gray-600" />
              <div>
                <p class="font-semibold">20:30 - Kirtan</p>
                <p class="text-sm text-gray-600">Gemeinsames Singen</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Tips -->
    <div class="mt-12 bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
      <h3 class="text-2xl font-bold mb-6 text-center">Praktische Tipps für Anfänger</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon icon="mdi:progress-clock" class="w-8 h-8 text-gray-600" />
          </div>
          <h4 class="font-semibold mb-2">Schrittweise beginnen</h4>
          <p class="text-sm text-gray-600">
            Starte mit 4 Runden täglich und erhöhe langsam auf 16 Runden
          </p>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon icon="mdi:calendar-check" class="w-8 h-8 text-gray-600" />
          </div>
          <h4 class="font-semibold mb-2">Regelmäßigkeit</h4>
          <p class="text-sm text-gray-600">
            Besser täglich wenig als unregelmäßig viel praktizieren
          </p>
        </div>
        <div class="text-center">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon icon="mdi:account-group" class="w-8 h-8 text-gray-600" />
          </div>
          <h4 class="font-semibold mb-2">Gemeinschaft</h4>
          <p class="text-sm text-gray-600">
            Suche die Gemeinschaft von Devotees für Inspiration
          </p>
        </div>
      </div>
    </div>
  </div>
</section>