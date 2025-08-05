<script lang="ts">
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';
  import { Button } from '$lib/components/ui/button';
  import CTASection from '$lib/components/sections/CTASection.svelte';
  import NavigationSection from '$lib/components/sections/NavigationSection.svelte';
  import HeroSection from '$lib/components/sections/HeroSection.svelte';
  import TabSection from '$lib/components/sections/TabSection.svelte';
  
  import type { PageData } from './$types';
  
  export let data: PageData;
  const { navigation } = data;
  
  let selectedBook = 0;
  let showSanskrit = false;
  
  const books = [
    {
      id: 'bhagavad-gita',
      title: 'Bhagavad-gītā',
      subtitle: 'Der Gesang Gottes',
      description: 'Das wichtigste philosophische Werk des Hinduismus - Krishnas Unterweisungen an Arjuna auf dem Schlachtfeld von Kurukshetra.',
      verses: 700,
      chapters: 18,
      color: 'from-primary-500 to-primary-600',
      icon: 'mdi:book-open-page-variant',
      features: [
        'Karma-Yoga - Der Pfad der Handlung',
        'Jnana-Yoga - Der Pfad des Wissens',
        'Bhakti-Yoga - Der Pfad der Hingabe',
        'Die Natur der Seele',
        'Die drei Erscheinungsweisen'
      ],
      quote: {
        sanskrit: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज',
        translation: 'Gib alle Arten von Religion auf und ergib dich einfach Mir.',
        reference: 'Bhagavad-gītā 18.66'
      }
    },
    {
      id: 'srimad-bhagavatam',
      title: 'Śrīmad-Bhāgavatam',
      subtitle: 'Die schöne Geschichte des Höchsten Herrn',
      description: 'Das reife Früchte am Baum der vedischen Literatur - 18.000 Verse über Krishnas Spiele und Philosophie.',
      verses: 18000,
      chapters: 335,
      cantos: 12,
      color: 'from-gray-600 to-gray-700',
      icon: 'mdi:book-multiple',
      features: [
        'Kosmologie und Schöpfung',
        'Avatare und ihre Spiele',
        'Krishnas Vrindavana-Spiele',
        'Devotees und ihre Geschichten',
        'Prophezeiungen für Kali-Yuga'
      ],
      quote: {
        sanskrit: 'निगमकल्पतरोर्गलितं फलं शुकमुखादमृतद्रवसंयुतम्',
        translation: 'Das Śrīmad-Bhāgavatam ist die reife Frucht am Wunschbaum der vedischen Literatur.',
        reference: 'Śrīmad-Bhāgavatam 1.1.3'
      }
    },
    {
      id: 'caitanya-caritamrita',
      title: 'Caitanya-caritāmṛta',
      subtitle: 'Der Nektar der Spiele Sri Caitanyas',
      description: 'Die autorisierte Biographie von Sri Caitanya Mahaprabhu, der goldenen Inkarnation Krishnas.',
      verses: 11555,
      chapters: 62,
      divisions: 3,
      color: 'from-primary-500 to-primary-600',
      icon: 'mdi:crown',
      features: [
        'Ādi-līlā - Die frühen Spiele',
        'Madhya-līlā - Die mittleren Spiele',
        'Antya-līlā - Die letzten Spiele',
        'Die Philosophie des Acintya-bhedābheda',
        'Die Wissenschaft der Rasa'
      ],
      quote: {
        sanskrit: 'कृष्णवर्णं त्विषाकृष्णं साङ्गोपाङ्गास्त्रपार्षदम्',
        translation: 'Im Kali-Zeitalter erscheint der Herr in goldener Tönung.',
        reference: 'Śrīmad-Bhāgavatam 11.5.32'
      }
    }
  ];
  
  const additionalScriptures = [
    {
      title: 'Brahma-saṁhitā',
      description: 'Lord Brahmas Gebete an Krishna',
      icon: 'mdi:meditation'
    },
    {
      title: 'Īśopaniṣad',
      description: 'Die Wissenschaft der Selbstverwirklichung',
      icon: 'mdi:om'
    },
    {
      title: 'Nectar of Devotion',
      description: 'Zusammenfassung des Bhakti-rasāmṛta-sindhu',
      icon: 'mdi:water'
    },
    {
      title: 'Nectar of Instruction',
      description: 'Upadeśāmṛta - Essentielle Unterweisungen',
      icon: 'mdi:school'
    }
  ];
  
  // Create tabs for books
  const bookTabs = books.map((book, index) => ({
    id: `book-${index}`,
    label: book.title,
    icon: book.icon
  }));
  
  $: activeBookTab = `book-${selectedBook}`;
</script>

<svelte:head>
  <title>Vedische Schriften - Die zeitlose Weisheit | ISKCON Deutschland</title>
  <meta name="description" content="Entdecken Sie die wichtigsten vedischen Schriften: Bhagavad-gita, Srimad-Bhagavatam und Caitanya-caritamrita. Die zeitlose Weisheit der vedischen Literatur." />
</svelte:head>

<!-- Hero Section -->
<HeroSection
  title="Vedische Schriften"
  subtitle="Die zeitlose Weisheit der heiligen Texte - Übermittelt durch die Schülernachfolge seit Jahrtausenden"
  backgroundType="gradient"
  pattern="sanskrit"
  button={{
    text: showSanskrit ? 'Übersetzung anzeigen' : 'Sanskrit anzeigen',
    onClick: () => showSanskrit = !showSanskrit,
    icon: 'mdi:translate'
  }}
/>

<!-- Main Books Section -->
<section class="py-16 md:py-24">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
      Die drei Hauptwerke
    </h2>
    
    <TabSection
      tabs={bookTabs}
      bind:activeTab={activeBookTab}
      variant="pills"
      let:activeTab
    >
      {#each books as book, index}
        {#if activeTab === `book-${index}`}
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden mt-8">
            <div class="grid grid-cols-1 lg:grid-cols-2">
              <!-- Left: Book Info -->
              <div class="p-8 lg:p-12">
                <div class="flex items-center gap-4 mb-6">
                  <div class="w-20 h-20 rounded-xl bg-gradient-to-br {book.color} flex items-center justify-center">
                    <Icon icon={book.icon} class="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 class="text-3xl font-bold">{book.title}</h3>
                    <p class="text-gray-600">{book.subtitle}</p>
                  </div>
                </div>
                
                <p class="text-gray-700 mb-6">{book.description}</p>
                
                <!-- Stats -->
                <div class="grid grid-cols-2 gap-4 mb-6">
                  <div class="bg-gray-50 rounded-lg p-4">
                    <p class="text-2xl font-bold text-gray-800">{book.verses.toLocaleString()}</p>
                    <p class="text-sm text-gray-600">Verse</p>
                  </div>
                  <div class="bg-gray-50 rounded-lg p-4">
                    <p class="text-2xl font-bold text-gray-800">{book.chapters}</p>
                    <p class="text-sm text-gray-600">Kapitel</p>
                  </div>
                  {#if book.cantos}
                    <div class="bg-gray-50 rounded-lg p-4">
                      <p class="text-2xl font-bold text-gray-800">{book.cantos}</p>
                      <p class="text-sm text-gray-600">Cantos</p>
                    </div>
                  {/if}
                  {#if book.divisions}
                    <div class="bg-gray-50 rounded-lg p-4">
                      <p class="text-2xl font-bold text-gray-800">{book.divisions}</p>
                      <p class="text-sm text-gray-600">Teile</p>
                    </div>
                  {/if}
                </div>
                
                <!-- Features -->
                <h4 class="font-semibold mb-3">Hauptthemen:</h4>
                <ul class="space-y-2 mb-6">
                  {#each book.features as feature}
                    <li class="flex items-start gap-2">
                      <Icon icon="mdi:bookmark" class="w-5 h-5 text-primary-500 mt-0.5" />
                      <span class="text-gray-700">{feature}</span>
                    </li>
                  {/each}
                </ul>
                
                <!-- CTA -->
                <Button 
                  href="/literature?filter={book.id}"
                  variant="premium"
                  size="lg"
                >
                  <Icon icon="mdi:book-open-variant" class="w-5 h-5" />
                  {book.title} lesen
                </Button>
              </div>
              
              <!-- Right: Quote -->
              <div class="bg-gradient-to-br {book.color} p-8 lg:p-12 text-white flex flex-col justify-center">
                <Icon icon="mdi:format-quote-open" class="w-12 h-12 opacity-50 mb-6" />
                
                {#if showSanskrit && book.quote.sanskrit}
                  <p class="text-2xl font-sanskrit mb-6 leading-relaxed">
                    {book.quote.sanskrit}
                  </p>
                {:else}
                  <p class="text-xl italic mb-6 leading-relaxed">
                    "{book.quote.translation}"
                  </p>
                {/if}
                
                <cite class="text-sm opacity-90">
                  - {book.quote.reference}
                </cite>
              </div>
            </div>
          </div>
        {/if}
      {/each}
    </TabSection>
  </div>
</section>

<!-- Additional Scriptures -->
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-12">
      Weitere wichtige Schriften
    </h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
      {#each additionalScriptures as scripture}
        <div class="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
          <div class="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center mb-4">
            <Icon icon={scripture.icon} class="w-6 h-6 text-primary-500" />
          </div>
          <h3 class="font-semibold text-lg mb-2">{scripture.title}</h3>
          <p class="text-gray-600 text-sm">{scripture.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Study Resources -->
<section class="py-16">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 text-white">
      <h2 class="text-3xl font-bold mb-6">Vedische Schriften studieren</h2>
      <p class="text-lg mb-8 opacity-90">
        Vertiefen Sie Ihr Verständnis durch systematisches Studium mit erfahrenen Lehrern
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white/20 backdrop-blur-sm rounded-lg p-6">
          <Icon icon="mdi:school" class="w-8 h-8 mb-3" />
          <h3 class="font-semibold mb-2">Bhakti Sastri Kurs</h3>
          <p class="text-sm opacity-90">Systematisches Studium der Grundlagentexte</p>
        </div>
        
        <div class="bg-white/20 backdrop-blur-sm rounded-lg p-6">
          <Icon icon="mdi:video" class="w-8 h-8 mb-3" />
          <h3 class="font-semibold mb-2">Online Klassen</h3>
          <p class="text-sm opacity-90">Tägliche Bhagavatam & Gita Klassen</p>
        </div>
        
        <div class="bg-white/20 backdrop-blur-sm rounded-lg p-6">
          <Icon icon="mdi:account-group" class="w-8 h-8 mb-3" />
          <h3 class="font-semibold mb-2">Studiengruppen</h3>
          <p class="text-sm opacity-90">Gemeinsames Lernen in kleinen Gruppen</p>
        </div>
      </div>
      
      <div class="flex flex-wrap gap-4">
        <Button 
          href="/literature"
          variant="secondary"
          size="lg"
          class="text-primary-500"
        >
          <Icon icon="mdi:library" class="w-5 h-5" />
          Zur Bibliothek
        </Button>
        <Button 
          href="/events?category=studium"
          variant="outline"
          size="lg"
          class="border-white text-white hover:bg-white/10"
        >
          <Icon icon="mdi:calendar-clock" class="w-5 h-5" />
          Studienkreise finden
        </Button>
      </div>
    </div>
  </div>
</section>

<!-- Navigation -->
<NavigationSection {navigation} />