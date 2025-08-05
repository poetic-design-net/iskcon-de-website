<script lang="ts">
  import Icon from '@iconify/svelte';
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  
  let activeProcess: number | null = 0;
  
  const processes = [
    {
      id: 1,
      name: 'Shravanam',
      translation: 'Hören',
      icon: 'mdi:ear-hearing',
      description: 'Das Hören über Krishna aus autoritativen Quellen wie der Bhagavad-gita und dem Srimad-Bhagavatam.',
      benefits: [
        'Reinigt das Herz von materiellen Verschmutzungen',
        'Erweckt spirituelles Verständnis',
        'Stärkt den Glauben an Krishna'
      ],
      practice: 'Täglich mindestens 30 Minuten aus den heiligen Schriften hören oder Vorträge von verwirklichten Seelen anhören.',
      example: 'Maharaja Parikshit erreichte Perfektion allein durch das Hören des Srimad-Bhagavatam.',
      image: 'https://theharekrishnamovement.org/wp-content/uploads/2011/10/parikshit.jpg'
    },
    {
      id: 2,
      name: 'Kirtanam',
      translation: 'Chanten',
      icon: 'mdi:music-note',
      description: 'Das Singen oder Chanten der Heiligen Namen Krishnas, besonders des Maha-Mantras.',
      benefits: [
        'Befreit von allen sündhaften Reaktionen',
        'Erweckt göttliche Liebe',
        'Bringt inneren Frieden und Freude'
      ],
      practice: 'Täglich 16 Runden (1728 Mal) das Maha-Mantra auf der Japa-Mala chanten.',
      example: 'Sri Caitanya Mahaprabhu verbreitete das gemeinsame Chanten (Sankirtan) als den effektivsten Prozess für dieses Zeitalter.',
      image: null // Will use SVG placeholder
    },
    {
      id: 3,
      name: 'Smaranam',
      translation: 'Erinnern',
      icon: 'mdi:brain',
      description: 'Die ständige Erinnerung an Krishna, Seine Namen, Formen, Eigenschaften und Spiele.',
      benefits: [
        'Führt zu konstanter Meditation',
        'Überwindet materielle Anhaftungen',
        'Entwickelt tiefe spirituelle Verbindung'
      ],
      practice: 'Den Geist trainieren, bei allen Aktivitäten an Krishna zu denken.',
      example: 'Prahlada Maharaja war selbst in gefährlichen Situationen immer in Gedanken an Krishna vertieft.',
      image: null // Will use SVG placeholder
    },
    {
      id: 4,
      name: 'Pada-sevanam',
      translation: 'Dienen',
      icon: 'mdi:foot-print',
      description: 'Dienst zu den Lotosfüßen des Herrn, einschließlich Tempeldienst und Dienst zu den Devotees.',
      benefits: [
        'Entwickelt Demut und Hingabe',
        'Reinigt von Stolz und Egoismus',
        'Bringt direkte Barmherzigkeit Krishnas'
      ],
      practice: 'Regelmäßiger Tempeldienst oder Dienst zu Vaishnavas (Devotees).',
      example: 'Lakshmidevi, die Glücksgöttin, ist ständig im Dienst zu Krishnas Lotosfüßen beschäftigt.',
      image: null // Will use SVG placeholder
    },
    {
      id: 5,
      name: 'Arcanam',
      translation: 'Verehren',
      icon: 'mdi:flower-tulip',
      description: 'Die Verehrung der Bildgestalt (Murti) Krishnas im Tempel oder zu Hause.',
      benefits: [
        'Läutert die Sinne',
        'Entwickelt persönliche Beziehung zu Krishna',
        'Bringt Segen für die ganze Familie'
      ],
      practice: 'Tägliche Deity-Verehrung mit 16 Upacharas (Opfergaben).',
      example: 'König Prithu erreichte Perfektion durch die Verehrung der Bildgestalt.',
      image: null // Will use SVG placeholder
    },
    {
      id: 6,
      name: 'Vandanam',
      translation: 'Beten',
      icon: 'mdi:hands-pray',
      description: 'Das Darbringen von Gebeten und Ehrerbietungen an Krishna.',
      benefits: [
        'Entwickelt Demut',
        'Vertieft die Beziehung zu Krishna',
        'Erfüllt spirituelle Wünsche'
      ],
      practice: 'Morgens und abends Gebete wie das Brahma-samhita rezitieren.',
      example: 'Akrura erreichte spirituelle Ekstase durch seine Gebete zu Krishna.',
      image: null // Will use SVG placeholder
    },
    {
      id: 7,
      name: 'Dasyam',
      translation: 'Als Diener handeln',
      icon: 'mdi:account-heart',
      description: 'Die Haltung eines ewigen Dieners Krishnas annehmen.',
      benefits: [
        'Befreit vom falschen Ego',
        'Entwickelt bedingungslose Hingabe',
        'Garantiert Krishnas Schutz'
      ],
      practice: 'Alle Handlungen als Dienst zu Krishna ausführen.',
      example: 'Hanuman ist das perfekte Beispiel für Dasyam in seiner Hingabe zu Lord Rama.',
      image: null // Will use SVG placeholder
    },
    {
      id: 8,
      name: 'Sakhyam',
      translation: 'Freundschaft',
      icon: 'mdi:account-group',
      description: 'Die Entwicklung einer freundschaftlichen Beziehung zu Krishna.',
      benefits: [
        'Überwindet Ehrfurcht und Distanz',
        'Ermöglicht intime Gemeinschaft',
        'Bringt höchste Freude'
      ],
      practice: 'Mit Krishna wie mit einem Freund kommunizieren.',
      example: 'Arjuna und die Kuhhirtenjungen von Vrindavana hatten diese Beziehung zu Krishna.',
      image: null // Will use SVG placeholder
    },
    {
      id: 9,
      name: 'Atma-nivedanam',
      translation: 'Vollständige Hingabe',
      icon: 'mdi:heart-circle',
      description: 'Die vollständige Hingabe des Selbst an Krishna.',
      benefits: [
        'Höchste Stufe der Hingabe',
        'Vollständige Befreiung',
        'Ewige Gemeinschaft mit Krishna'
      ],
      practice: 'Körper, Geist, Worte und Seele vollständig Krishna weihen.',
      example: 'Bali Maharaja gab alles, sogar seinen eigenen Körper, an Lord Vamana.',
      image: null // Will use SVG placeholder
    }
  ];
  
  function toggleProcess(index: number) {
    activeProcess = activeProcess === index ? null : index;
  }
</script>

<section id="nine-processes" class="py-16 md:py-24 relative overflow-hidden">
  <!-- Background with subtle pattern -->
  <div class="absolute inset-0 z-0">
    <!-- SVG Pattern Background -->
    <svg class="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="lotus-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" stroke-width="0.5" opacity="0.3"/>
          <path d="M50 30 Q40 40 40 50 Q40 60 50 70 Q60 60 60 50 Q60 40 50 30" fill="#e5e7eb" opacity="0.1"/>
          <circle cx="50" cy="50" r="3" fill="#e5e7eb" opacity="0.2"/>
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#lotus-pattern)" />
    </svg>
    <div class="absolute inset-0 bg-gradient-to-b from-white/95 to-gray-50/95"></div>
  </div>
  
  <!-- Content -->
  <div class="relative z-10">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-12">
        <h2 class="text-4xl md:text-5xl font-bold mb-4">
          Die neun Prozesse des Bhakti-Yoga
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Navavidha Bhakti - Neun Wege, um reine Liebe zu Krishna zu entwickeln
        </p>
      </div>
      
      <!-- Accordion -->
      <div class="max-w-4xl mx-auto">
        <div class="space-y-3">
          {#each processes as process, index}
            <div class="rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg
                        {activeProcess === index ? 'bg-gray-50 shadow-lg' : 'bg-white'}">
              <!-- Accordion Header -->
              <button
                on:click={() => toggleProcess(index)}
                class="w-full px-6 py-5 flex items-center justify-between text-left transition-colors duration-200
                       {activeProcess === index ? 'bg-gray-100' : 'hover:bg-gray-50'}"
              >
                <div class="flex items-center gap-4">
                  <!-- Number Badge -->
                  <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-gray-700">
                    {process.id}
                  </div>
                  
                  <!-- Icon -->
                  <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <Icon icon={process.icon} class="w-6 h-6 text-gray-600" />
                  </div>
                  
                  <!-- Title -->
                  <div>
                    <h3 class="font-bold text-lg text-gray-900">{process.name}</h3>
                    <p class="text-sm text-gray-600">{process.translation}</p>
                  </div>
                </div>
                
                <!-- Chevron -->
                <Icon 
                  icon="mdi:chevron-down" 
                  class="w-6 h-6 text-primary-500/60 transition-all duration-300 {activeProcess === index ? 'rotate-180 text-primary-500' : ''}"
                />
              </button>
              
              <!-- Accordion Content -->
              {#if activeProcess === index}
                <div
                  transition:slide={{ duration: 300, easing: quintOut }}
                  class="px-6 pb-6 pt-2 bg-gray-50"
                >
                  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Content Column -->
                    <div class="lg:col-span-2 pl-0 lg:pl-[7.5rem] space-y-6">
                      <!-- Description -->
                      <p class="text-gray-700 leading-relaxed">
                        {process.description}
                      </p>
                      
                      <!-- Benefits -->
                      <div>
                        <h4 class="font-semibold mb-3 flex items-center gap-2 text-gray-900">
                          <Icon icon="mdi:star" class="w-5 h-5 text-gray-500" />
                          Nutzen
                        </h4>
                        <ul class="space-y-2">
                          {#each process.benefits as benefit}
                            <li class="flex items-start gap-3">
                              <Icon icon="mdi:check-circle" class="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                              <span class="text-gray-700">{benefit}</span>
                            </li>
                          {/each}
                        </ul>
                      </div>
                      
                      <!-- Practice -->
                      <div>
                        <h4 class="font-semibold mb-3 flex items-center gap-2 text-gray-900">
                          <Icon icon="mdi:yoga" class="w-5 h-5 text-gray-500" />
                          Praxis
                        </h4>
                        <p class="text-gray-700">
                          {process.practice}
                        </p>
                      </div>
                      
                      <!-- Example -->
                      <div class="bg-white rounded-lg p-4 shadow-sm">
                        <h4 class="font-semibold mb-2 flex items-center gap-2 text-gray-900">
                          <Icon icon="mdi:account-star" class="w-5 h-5 text-gray-600" />
                          Beispiel aus den Schriften
                        </h4>
                        <p class="text-gray-700">
                          {process.example}
                        </p>
                      </div>
                    </div>
                    
                    <!-- Image Column -->
                    <div class="lg:col-span-1 order-first lg:order-last">
                      <div class="rounded-lg h-48 lg:h-full relative overflow-hidden bg-gray-100">
                        {#if process.image}
                          <!-- Real image -->
                          <img 
                            src={process.image}
                            alt="{process.name} - {process.translation}"
                            class="w-full h-full object-cover"
                          />
                          
                          <!-- Overlay with process info -->
                          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                            <div class="p-6 text-white w-full">
                              <h4 class="text-xl font-bold mb-1 drop-shadow-lg">{process.name}</h4>
                              <p class="text-sm opacity-90 drop-shadow-lg">{process.translation}</p>
                            </div>
                          </div>
                        {:else}
                          <!-- Placeholder if no image -->
                          <div class="absolute inset-0">
                            <!-- Consistent placeholder pattern for all processes -->
                            <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
                              <rect width="400" height="300" fill="#f3f4f6"/>
                              <!-- Mountain/landscape silhouette -->
                              <path d="M0,200 L100,150 L200,180 L300,120 L400,170 L400,300 L0,300 Z" fill="#e5e7eb"/>
                              <path d="M0,220 L150,170 L250,200 L400,150 L400,300 L0,300 Z" fill="#d1d5db"/>
                              <!-- Sun/moon -->
                              <circle cx="320" cy="80" r="30" fill="#f3f4f6"/>
                            </svg>
                          </div>
                          
                          <!-- Overlay with process info -->
                          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
                            <div class="p-6 text-white w-full">
                              <!-- Large icon -->
                              <div class="w-16 h-16 mb-3 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <Icon icon={process.icon} class="w-8 h-8 text-white" />
                              </div>
                              
                              <!-- Process name -->
                              <h4 class="text-xl font-bold mb-1">{process.name}</h4>
                              <p class="text-sm opacity-90">{process.translation}</p>
                              
                              <!-- Image placeholder indicator -->
                              <div class="mt-3 flex items-center gap-2 text-xs opacity-70">
                                <Icon icon="mdi:image" class="w-4 h-4" />
                                <span>Bild wird über Sanity verwaltet</span>
                              </div>
                            </div>
                          </div>
                        {/if}
                      </div>
                    </div>
                  </div>
                </div>
              {/if}
            </div>
          {/each}
        </div>
        
        <!-- Info Box -->
        <div class="mt-8 bg-white rounded-lg shadow-md p-6">
          <div class="flex items-start gap-4">
            <Icon icon="mdi:information" class="w-6 h-6 text-gray-500 flex-shrink-0 mt-1" />
            <div>
              <h3 class="font-semibold text-gray-900 mb-2">Flexibilität in der Praxis</h3>
              <p class="text-gray-700">
                Man kann einen, einige oder alle neun Prozesse des hingebungsvollen Dienstes praktizieren. 
                Das Ergebnis wird dasselbe sein - reine Liebe zu Krishna. Die Perfektion liegt nicht in der 
                Quantität, sondern in der Qualität der Hingabe.
              </p>
              <cite class="block mt-3 text-sm text-gray-600">- Basierend auf Srimad-Bhagavatam 7.5.23</cite>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>