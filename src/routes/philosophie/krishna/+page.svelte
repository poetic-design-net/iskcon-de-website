<script lang="ts">
  import Icon from '@iconify/svelte';
  import { onMount } from 'svelte';
  import { Button } from '$lib/components/ui/button';
  import CTASection from '$lib/components/sections/CTASection.svelte';
  import NavigationSection from '$lib/components/sections/NavigationSection.svelte';
  import HeroSection from '$lib/components/sections/HeroSection.svelte';
  import FeatureGrid from '$lib/components/sections/FeatureGrid.svelte';
  import TabSection from '$lib/components/sections/TabSection.svelte';
  
  import type { PageData } from './$types';
  
  export let data: PageData;
  const { navigation } = data;
  
  // State for interactive elements
  let selectedLila = 0;
  let showMantra = false;
  let activeAvatara = 0;
  
  // Krishna's divine qualities
  const divineQualities = [
    { title: 'Sac-cid-ānanda', subtitle: 'Ewigkeit, Wissen und Glückseligkeit', icon: 'mdi:infinity', description: '' },
    { title: 'Bhagavān', subtitle: 'Der Besitzer aller Füllen', icon: 'mdi:crown', description: '' },
    { title: 'Govinda', subtitle: 'Die Quelle aller Freude', icon: 'mdi:heart', description: '' },
    { title: 'Bhakta-vatsala', subtitle: 'Der Seinen Geweihten zugetan ist', icon: 'mdi:account-heart', description: '' }
  ];
  
  // Krishna's pastimes (lilas)
  const lilas = [
    {
      title: 'Krishnas Geburt',
      description: 'Die Erscheinung des Herrn im Gefängnis von Kamsa, um Seine Geweihten zu beschützen.',
      image: 'https://www.harekrsna.de/artikel/kb/138.jpg',
      verse: 'yadā yadā hi dharmasya glānir bhavati bhārata',
      translation: 'Wann immer es einen Niedergang der Religion gibt, erscheine Ich.'
    },
    {
      title: 'Govardhana-līlā',
      description: 'Krishna hebt den Govardhana-Hügel, um die Bewohner Vrindavanas zu beschützen.',
      image: '/images/krishna/govardhana.jpg',
      verse: 'giridhārī gopāla',
      translation: 'Der Träger des Berges, der Beschützer der Kühe.'
    },
    {
      title: 'Rāsa-līlā',
      description: 'Der transzendentale Tanz mit den Gopis - die höchste Manifestation göttlicher Liebe.',
      image: '/images/krishna/rasa.jpg',
      verse: 'vṛndāvanaṁ parityajya padam ekaṁ na gacchati',
      translation: 'Krishna verlässt Vrindavana niemals, nicht einen einzigen Schritt.'
    },
    {
      title: 'Kāliya-damana',
      description: 'Krishna tanzt auf den Häuptern der giftigen Schlange Kaliya und befreit den Yamuna-Fluss.',
      image: '/images/krishna/kaliya.jpg',
      verse: 'kāliya-phani-maṇi-gaṇa-ujjvala',
      translation: 'Strahlend auf den juwelenbesetzten Hauben von Kaliya.'
    }
  ];
  
  // Tabs for lilas
  const lilaTabs = lilas.map((lila, index) => ({
    id: `lila-${index}`,
    label: lila.title
  }));
  
  $: activeLilaTab = `lila-${selectedLila}`;
  
  // Dasavatara - Ten incarnations
  const avataras = [
    { 
      name: 'Matsya', 
      subtitle: 'Der Fisch-Avatar', 
      icon: 'mdi:fish',
      image: 'https://wiki.yoga-vidya.de/images/f/f9/Matsya_avatar.jpg',
      description: 'Matsya erschien am Ende des letzten Manvantara, um die Veden vor der großen Flut zu retten. Er führte König Satyavrata und die sieben Weisen in einem Boot, das an seinem Horn befestigt war.',
      purpose: 'Rettung der vedischen Schriften und des Lebens vor der kosmischen Flut',
      mantra: 'oṁ namo bhagavate matsya-devāya',
      special: 'Erster Avatar im gegenwärtigen Kalpa'
    },
    { 
      name: 'Kurma', 
      subtitle: 'Die Schildkröte', 
      icon: 'mdi:turtle',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Kurma_Avatar_of_Vishnu%2C_below_Mount_Mandara%2C_with_Vasuki_wrapped_around_it%2C_during_Samudra_manthan%2C_the_churning_of_the_ocean_of_milk.jpg/800px-Kurma_Avatar_of_Vishnu%2C_below_Mount_Mandara%2C_with_Vasuki_wrapped_around_it%2C_during_Samudra_manthan%2C_the_churning_of_the_ocean_of_milk.jpg',
      description: 'Als die Devas und Asuras den Milchozean quirlten, um Nektar zu erlangen, erschien Kurma und trug den Berg Mandara auf seinem Rücken als Quirlstab.',
      purpose: 'Unterstützung beim Quirlen des Milchozeans für amṛta (Nektar)',
      mantra: 'oṁ namo bhagavate kūrma-devāya',
      special: 'Verkörperung von Stabilität und Ausdauer'
    },
    { 
      name: 'Varaha', 
      subtitle: 'Der Eber-Avatar', 
      icon: 'mdi:pig',
      description: 'Varaha rettete die Erde (Bhumi-devi) aus den Tiefen des Garbhodaka-Ozeans, nachdem der Dämon Hiranyaksha sie dorthin verschleppt hatte.',
      purpose: 'Rettung der Erde und Vernichtung des Dämons Hiranyaksha',
      mantra: 'oṁ namo bhagavate varāha-devāya',
      special: 'Symbol für Schutz und Stärke'
    },
    { 
      name: 'Narasimha', 
      subtitle: 'Der Löwenmensch', 
      icon: 'lucide:cat',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Narasimha_Disemboweling_Hiranyakashipu%2C_Folio_from_a_Bhagavata_Purana_%28Ancient_Stories_of_the_Lord%29_LACMA_M.82.42.8_%281_of_2%29.jpg/600px-Narasimha_Disemboweling_Hiranyakashipu%2C_Folio_from_a_Bhagavata_Purana_%28Ancient_Stories_of_the_Lord%29_LACMA_M.82.42.8_%281_of_2%29.jpg',
      description: 'Halb Mensch, halb Löwe erschien Narasimha aus einer Säule, um seinen Geweihten Prahlada zu beschützen und den Dämon Hiranyakashipu zu vernichten.',
      purpose: 'Schutz der Geweihten und Vernichtung des Dämons Hiranyakashipu',
      mantra: 'oṁ namo bhagavate narasiṁha-devāya',
      special: 'Zornvolle Form zum Schutz der Devotees'
    },
    { 
      name: 'Vamana', 
      subtitle: 'Der Zwerg-Brahmane', 
      icon: 'mdi:human-child',
      description: 'Als Zwerg-Brahmane bat Vamana König Bali um drei Schritte Land. Mit zwei Schritten bedeckte er das gesamte Universum und stellte die Herrschaft Indras wieder her.',
      purpose: 'Wiederherstellung der kosmischen Ordnung',
      mantra: 'oṁ namo bhagavate vāmana-devāya',
      special: 'Trivikrama - der drei Schritte machte'
    },
    { 
      name: 'Parasurama', 
      subtitle: 'Der Krieger-Brahmane', 
      icon: 'mdi:axe',
      description: 'Mit seiner Axt besiegte Parasurama 21 Mal die korrupten Kshatriyas, um die Erde von tyrannischen Herrschern zu befreien.',
      purpose: 'Beseitigung korrupter Herrscher und Wiederherstellung des Dharma',
      mantra: 'oṁ namo bhagavate paraśurāma-devāya',
      special: 'Einziger Avatar, der noch auf der Erde weilt'
    },
    { 
      name: 'Rama', 
      subtitle: 'Der ideale König', 
      icon: 'mdi:bow-arrow',
      description: 'Rama, der Prinz von Ayodhya, ist das Vorbild für rechtschaffenes Verhalten. Er besiegte Ravana und etablierte Rama-rajya, die ideale Herrschaft.',
      purpose: 'Vernichtung Ravanas und Etablierung des idealen Königreichs',
      mantra: 'oṁ namo bhagavate rāma-candrāya',
      special: 'Maryada-purushottama - der perfekte Mensch'
    },
    { 
      name: 'Krishna', 
      subtitle: 'Die ursprüngliche Persönlichkeit', 
      icon: 'mdi:feather',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Krishna_with_flute.jpg/600px-Krishna_with_flute.jpg',
      description: 'Krishna ist svayam bhagavān - die ursprüngliche Persönlichkeit Gottes. Alle anderen Avatare sind Seine Erweiterungen. Er sprach die Bhagavad-gita und zeigte transzendentale Spiele.',
      purpose: 'Offenbarung der höchsten spirituellen Wahrheit',
      mantra: 'oṁ namo bhagavate vāsudevāya',
      special: 'Svayam Bhagavan - die Quelle aller Inkarnationen'
    },
    { 
      name: 'Buddha', 
      subtitle: 'Der Erleuchtete', 
      icon: 'mdi:meditation',
      description: 'Buddha erschien, um Gewaltlosigkeit zu lehren und die Menschen von nutzlosen Tieropfern abzubringen, die im Namen der Veden durchgeführt wurden.',
      purpose: 'Etablierung von Ahimsa (Gewaltlosigkeit) und Mitgefühl',
      mantra: 'oṁ namo bhagavate buddha-devāya',
      special: 'Lehrte Mitgefühl und Entsagung'
    },
    { 
      name: 'Kalki', 
      subtitle: 'Der zukünftige Avatar', 
      icon: 'lucide:sword',
      description: 'Am Ende des Kali-yuga wird Kalki auf einem weißen Pferd erscheinen, um die Dämonen zu vernichten und das Satya-yuga einzuleiten.',
      purpose: 'Vernichtung des Bösen und Beginn eines neuen Zeitalters',
      mantra: 'oṁ namo bhagavate kalki-devāya',
      special: 'Wird in etwa 427.000 Jahren erscheinen'
    }
  ];
</script>

<svelte:head>
  <title>Krishna - Die Höchste Persönlichkeit Gottes | ISKCON Deutschland</title>
  <meta name="description" content="Erfahren Sie mehr über Krishna, die Höchste Persönlichkeit Gottes. Seine Namen, Formen, Eigenschaften und transzendentalen Spiele." />
</svelte:head>

<!-- Hero Section with Krishna Image -->
<HeroSection
  title="Krishna"
  subtitle="Die Höchste Persönlichkeit Gottes - die Quelle aller Inkarnationen und die ursprüngliche Form des Herrn"
  backgroundType="image"
  backgroundImage="/static/img/krishna-hero.jpg"
  minHeight="min-h-screen"
  textColor="light"
  button={{
    text: 'Maha-Mantra',
    onClick: () => showMantra = !showMantra,
    icon: 'mdi:music-note',
    variant: 'outline'
  }}
>
  <p class="text-2xl md:text-3xl text-gray-200 mb-4 font-sanskrit -mt-2">कृष्ण</p>
  
  {#if showMantra}
    <div class="mt-8 bg-white/10 backdrop-blur-md rounded-xl p-6 max-w-2xl mx-auto animate-fade-in">
      <p class="text-2xl font-sanskrit text-white mb-4">
        हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे<br>
        हरे राम हरे राम राम राम हरे हरे
      </p>
      <p class="text-lg text-gray-200">
        Hare Krishna Hare Krishna Krishna Krishna Hare Hare<br>
        Hare Rama Hare Rama Rama Rama Hare Hare
      </p>
    </div>
  {/if}
  
  <!-- Scroll Indicator -->
  <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
    <Icon icon="mdi:chevron-double-down" class="w-8 h-8 text-white/60" />
  </div>
</HeroSection>

<!-- Divine Qualities Section -->
<section class="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
  <div class="container mx-auto px-4">
    <FeatureGrid
      title="Krishnas göttliche Eigenschaften"
      subtitle="Die vedischen Schriften beschreiben Krishnas unendliche transzendentale Eigenschaften"
      features={divineQualities}
      columns={4}
      variant="cards"
      iconSize="large"
    />
    
    <!-- Six Opulences -->
    <div class="mt-16 max-w-4xl mx-auto">
      <div class="bg-gradient-to-r from-gray-100 to-gray-50 border border-primary-500/20 rounded-2xl p-8 md:p-12">
        <h3 class="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
          Die sechs Füllen (Ṣaḍ-aiśvarya)
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-3 bg-primary-500/10 rounded-full flex items-center justify-center">
              <Icon icon="mdi:diamond" class="w-8 h-8 text-primary-500" />
            </div>
            <h4 class="font-semibold text-gray-800">Reichtum</h4>
            <p class="text-sm text-primary-500 font-sanskrit">Aiśvarya</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-3 bg-primary-500/10 rounded-full flex items-center justify-center">
              <Icon icon="mdi:arm-flex" class="w-8 h-8 text-primary-500" />
            </div>
            <h4 class="font-semibold text-gray-800">Stärke</h4>
            <p class="text-sm text-primary-500 font-sanskrit">Vīrya</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-3 bg-primary-500/10 rounded-full flex items-center justify-center">
              <Icon icon="mdi:star-circle" class="w-8 h-8 text-primary-500" />
            </div>
            <h4 class="font-semibold text-gray-800">Ruhm</h4>
            <p class="text-sm text-primary-500 font-sanskrit">Yaśas</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-3 bg-primary-500/10 rounded-full flex items-center justify-center">
              <Icon icon="mdi:sparkles" class="w-8 h-8 text-primary-500" />
            </div>
            <h4 class="font-semibold text-gray-800">Schönheit</h4>
            <p class="text-sm text-primary-500 font-sanskrit">Śrī</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-3 bg-primary-500/10 rounded-full flex items-center justify-center">
              <Icon icon="mdi:head-lightbulb" class="w-8 h-8 text-primary-500" />
            </div>
            <h4 class="font-semibold text-gray-800">Wissen</h4>
            <p class="text-sm text-primary-500 font-sanskrit">Jñāna</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-3 bg-primary-500/10 rounded-full flex items-center justify-center">
              <Icon icon="mdi:meditation" class="w-8 h-8 text-primary-500" />
            </div>
            <h4 class="font-semibold text-gray-800">Entsagung</h4>
            <p class="text-sm text-primary-500 font-sanskrit">Vairāgya</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Krishna's Pastimes (Lilas) -->
<section class="py-16 md:py-24 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="text-4xl md:text-5xl font-bold text-center mb-4">
      Krishnas Spiele (Līlās)
    </h2>
    <p class="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
      Die ewigen transzendentalen Spiele des Herrn, die Seine Geweihten erfreuen
    </p>
    
    <div class="max-w-6xl mx-auto">
      <TabSection 
        tabs={lilaTabs} 
        bind:activeTab={activeLilaTab}
        variant="pills"
        let:activeTab
      >
        {#each lilas as lila, index}
          {#if activeTab === `lila-${index}`}
            <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-xl mt-8">
              <div class="grid grid-cols-1 lg:grid-cols-2">
                <!-- Image -->
                <div class="h-96 lg:h-auto bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                  {#if lila.image && (lila.image.startsWith('http') || lila.image.startsWith('/'))}
                    <img 
                      src={lila.image} 
                      alt={lila.title} 
                      class="w-full h-full object-cover" 
                    />
                  {:else}
                    <Icon icon="mdi:image" class="w-32 h-32 text-white/50" />
                  {/if}
                </div>
                
                <!-- Content -->
                <div class="p-8 lg:p-12">
                  <h3 class="text-3xl font-bold mb-4">{lila.title}</h3>
                  <p class="text-lg text-gray-700 mb-6">{lila.description}</p>
                  
                  {#if lila.verse}
                    <div class="bg-white/50 rounded-lg p-6">
                      <p class="text-xl font-sanskrit text-primary-500 mb-2">{lila.verse}</p>
                      <p class="text-gray-600 italic">"{lila.translation}"</p>
                    </div>
                  {/if}
                  
                  <Button 
                    href="/literature?search={lila.title}"
                    variant="link"
                    class="mt-6 text-primary-500 hover:text-primary-600"
                  >
                    <Icon icon="mdi:book-open-variant" class="w-5 h-5" />
                    Mehr in den Schriften lesen
                  </Button>
                </div>
              </div>
            </div>
          {/if}
        {/each}
      </TabSection>
    </div>
  </div>
</section>

<!-- Dasavatara Section -->
<section class="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
  <div class="container mx-auto px-4">
    <h2 class="text-4xl md:text-5xl font-bold text-center mb-4">
      Die zehn Hauptinkarnationen (Daśāvatāra)
    </h2>
    <p class="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
      Krishna erscheint in verschiedenen Formen, um die Prinzipien der Religion zu etablieren
    </p>
    
    <div class="max-w-6xl mx-auto">
      <!-- Avatar Display -->
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {#each avataras as avatara, index}
          <button
            on:click={() => activeAvatara = index}
            class="group relative p-6 rounded-lg transition-all
                   {activeAvatara === index 
                     ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-xl scale-105' 
                     : 'bg-white hover:bg-gray-50 shadow-md'}"
          >
            <Icon 
              icon={avatara.icon} 
              class="w-12 h-12 mx-auto mb-2 {activeAvatara === index ? 'text-white' : 'text-primary-500'}" 
            />
            <h4 class="font-semibold text-sm">{avatara.name}</h4>
            <p class="text-xs opacity-80">{avatara.subtitle}</p>
            
            {#if index === 7}
              <div class="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                Svayam
              </div>
            {/if}
          </button>
        {/each}
      </div>
      
      <!-- Avatar Detail Display -->
      <div class="bg-gradient-to-r from-gray-50 to-white rounded-xl overflow-hidden border border-primary-500/20 shadow-lg">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <!-- Image Section -->
          <div class="h-64 lg:h-auto bg-white flex items-center justify-center p-8">
            {#if avataras[activeAvatara].image}
              <img 
                src={avataras[activeAvatara].image} 
                alt="{avataras[activeAvatara].name} - {avataras[activeAvatara].subtitle}"
                class="w-full h-full object-contain max-h-96"
              />
            {:else}
              <div class="text-center">
                <div class="w-32 h-32 mx-auto mb-4 rounded-full bg-primary-500/5 shadow-lg flex items-center justify-center">
                  <Icon icon={avataras[activeAvatara].icon} class="w-20 h-20 text-primary-500/70" />
                </div>
                <p class="text-sm text-gray-500 italic">Platzhalter für {avataras[activeAvatara].name} Bildnis</p>
              </div>
            {/if}
          </div>
          
          <!-- Content Section -->
          <div class="p-6 lg:p-8">
            <div class="flex items-start gap-4 mb-4">
              <Icon icon="mdi:information" class="w-6 h-6 text-primary-500/60 flex-shrink-0 mt-1" />
              <div class="flex-1">
                <h3 class="font-bold text-xl mb-1 text-gray-800">{avataras[activeAvatara].name}</h3>
                <p class="text-gray-600 mb-3">{avataras[activeAvatara].subtitle}</p>
              </div>
              {#if activeAvatara === 7}
                <span class="bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Svayam Bhagavan
                </span>
              {/if}
            </div>
            
            <p class="text-gray-700 mb-4">
              {avataras[activeAvatara].description}
            </p>
            
            <div class="space-y-3">
              <div class="flex items-start gap-3">
                <Icon icon="mdi:target" class="w-5 h-5 text-primary-500/60 mt-0.5" />
                <div>
                  <p class="text-sm font-semibold text-gray-700">Zweck:</p>
                  <p class="text-sm text-gray-600">{avataras[activeAvatara].purpose}</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <Icon icon="mdi:om" class="w-5 h-5 text-primary-500/60 mt-0.5" />
                <div>
                  <p class="text-sm font-semibold text-gray-700">Mantra:</p>
                  <p class="text-sm font-sanskrit text-primary-500">{avataras[activeAvatara].mantra}</p>
                </div>
              </div>
              
              {#if avataras[activeAvatara].special}
                <div class="flex items-start gap-3">
                  <Icon icon="mdi:star" class="w-5 h-5 text-primary-500/60 mt-0.5" />
                  <div>
                    <p class="text-sm font-semibold text-gray-700">Besonderheit:</p>
                    <p class="text-sm text-gray-600">{avataras[activeAvatara].special}</p>
                  </div>
                </div>
              {/if}
            </div>
            
            {#if activeAvatara === 7}
              <blockquote class="mt-4 pl-4 border-l-4 border-primary-500/50 bg-primary-500/5 p-3 rounded">
                <p class="font-sanskrit text-primary-500 text-sm">ete cāṁśa-kalāḥ puṁsaḥ kṛṣṇas tu bhagavān svayam</p>
                <p class="text-xs text-gray-600 mt-1">
                  "Alle aufgeführten Inkarnationen sind entweder vollständige Erweiterungen oder Teile der vollständigen 
                  Erweiterungen des Herrn, aber Krishna ist die Persönlichkeit Gottes Selbst." 
                  <cite class="block mt-1">- Śrīmad-Bhāgavatam 1.3.28</cite>
                </p>
              </blockquote>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Names of Krishna -->
<section class="py-16 md:py-24 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="text-4xl md:text-5xl font-bold text-center mb-4">
      Die 108 Namen Krishnas
    </h2>
    <p class="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto">
      Jeder Name offenbart einen besonderen Aspekt von Krishnas Persönlichkeit
    </p>
    
    <div class="max-w-4xl mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div class="bg-gray-50 rounded-lg p-6">
          <h3 class="font-bold text-lg mb-3">Namen der Schönheit</h3>
          <ul class="space-y-2 text-gray-700">
            <li><span class="font-sanskrit">Śyāmasundara</span> - Der Schöne mit dunkler Hautfarbe</li>
            <li><span class="font-sanskrit">Manohara</span> - Der das Herz stiehlt</li>
            <li><span class="font-sanskrit">Madana-mohana</span> - Der sogar Cupido betört</li>
          </ul>
        </div>
        
        <div class="bg-primary-500/5 rounded-lg p-6">
          <h3 class="font-bold text-lg mb-3">Namen der Liebe</h3>
          <ul class="space-y-2 text-gray-700">
            <li><span class="font-sanskrit">Rādhā-ramaṇa</span> - Der Geliebte Radhas</li>
            <li><span class="font-sanskrit">Gopī-vallabha</span> - Der Geliebte der Gopis</li>
            <li><span class="font-sanskrit">Vraja-rāja</span> - Der König von Vraja</li>
          </ul>
        </div>
        
        <div class="bg-gray-50 rounded-lg p-6">
          <h3 class="font-bold text-lg mb-3">Namen der Taten</h3>
          <ul class="space-y-2 text-gray-700">
            <li><span class="font-sanskrit">Govardhana-dhārī</span> - Der Träger des Govardhana</li>
            <li><span class="font-sanskrit">Makhana-cora</span> - Der Butterdieb</li>
            <li><span class="font-sanskrit">Dāmodara</span> - Der um den Bauch Gebundene</li>
          </ul>
        </div>
        
        <div class="bg-primary-500/5 rounded-lg p-6">
          <h3 class="font-bold text-lg mb-3">Namen der Herrlichkeit</h3>
          <ul class="space-y-2 text-gray-700">
            <li><span class="font-sanskrit">Jagannātha</span> - Der Herr des Universums</li>
            <li><span class="font-sanskrit">Vāsudeva</span> - Der Sohn Vasudevas</li>
            <li><span class="font-sanskrit">Keśava</span> - Der schönes Haar hat</li>
          </ul>
        </div>
        
        <div class="bg-gray-50 rounded-lg p-6">
          <h3 class="font-bold text-lg mb-3">Namen der Beschützer</h3>
          <ul class="space-y-2 text-gray-700">
            <li><span class="font-sanskrit">Govinda</span> - Der Beschützer der Kühe</li>
            <li><span class="font-sanskrit">Gopāla</span> - Der Kuhhirte</li>
            <li><span class="font-sanskrit">Nanda-nandana</span> - Der Sohn Nandas</li>
          </ul>
        </div>
        
        <div class="bg-primary-500/5 rounded-lg p-6">
          <h3 class="font-bold text-lg mb-3">Namen der Freude</h3>
          <ul class="space-y-2 text-gray-700">
            <li><span class="font-sanskrit">Ānanda-sāgara</span> - Der Ozean der Glückseligkeit</li>
            <li><span class="font-sanskrit">Navīna-nīrada</span> - Die frische Regenwolke</li>
            <li><span class="font-sanskrit">Rasika-śekhara</span> - Der Höchste Genießer</li>
          </ul>
        </div>
      </div>
      
      <div class="mt-8 text-center">
        <Button 
          href="/practice/japa"
          variant="premium"
          size="lg"
        >
          <Icon icon="mdi:counter" class="w-5 h-5" />
          Lernen Sie die 108 Namen zu chanten
        </Button>
      </div>
    </div>
  </div>
</section>

<!-- Custom CTA Section with background image -->
<section class="py-16 md:py-24 relative text-white">
  <!-- Background Image -->
  <div class="absolute inset-0">
    <img 
      src="https://w0.peakpx.com/wallpaper/148/834/HD-wallpaper-krishna-radha-krishna-radha-lord-god.jpg"
      alt="Krishna und Radha"
      class="w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/50"></div>
  </div>
  
  <div class="container mx-auto px-4 text-center relative z-10">
    <h2 class="text-4xl md:text-5xl font-bold mb-6">
      Krishnas Liebe erfahren
    </h2>
    <p class="text-xl mb-12 max-w-3xl mx-auto opacity-90">
      Beginnen Sie Ihre persönliche Beziehung zu Krishna durch praktische spirituelle Übungen
    </p>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
      <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <Icon icon="mdi:music-note" class="w-16 h-16 mx-auto mb-4" />
        <h3 class="text-xl font-semibold mb-2">Kirtan</h3>
        <p class="opacity-90">Gemeinsames Singen der heiligen Namen</p>
      </div>
      
      <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <Icon icon="mdi:flower-tulip" class="w-16 h-16 mx-auto mb-4" />
        <h3 class="text-xl font-semibold mb-2">Deity Worship</h3>
        <p class="opacity-90">Persönlicher Dienst für Krishna</p>
      </div>
      
      <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <Icon icon="mdi:book-heart" class="w-16 h-16 mx-auto mb-4" />
        <h3 class="text-xl font-semibold mb-2">Studium</h3>
        <p class="opacity-90">Krishnas Lehren verstehen</p>
      </div>
    </div>
    
    <div class="flex flex-wrap gap-4 justify-center">
      <Button 
        href="/tempel" 
        variant="secondary"
        size="lg"
        class="text-primary-500"
      >
        <Icon icon="mdi:temple-hindu" class="w-5 h-5" />
        Krishna im Tempel besuchen
      </Button>
      <Button 
        href="/events?category=festival" 
        variant="outline"
        size="lg"
        class="border-white text-white hover:bg-white/10"
      >
        <Icon icon="mdi:party-popper" class="w-5 h-5" />
        Krishna-Feste feiern
      </Button>
    </div>
  </div>
</section>

<!-- Call to Action -->
<CTASection
  title="Beginnen Sie Ihre spirituelle Reise mit Krishna"
  subtitle="Entdecken Sie die transformierende Kraft der göttlichen Liebe"
  primaryButton={{
    text: 'Bhakti-Yoga praktizieren',
    href: '/philosophie/bhakti-yoga',
    icon: 'mdi:meditation'
  }}
  secondaryButton={{
    text: 'Krishna-Literatur',
    href: '/literature?topic=krishna',
    icon: 'mdi:book-heart'
  }}
/>

<!-- Navigation -->
<NavigationSection {navigation} />

<style>
  /* Fade In Animation */
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-in {
    animation: fade-in 0.5s ease-out;
  }
  
  /* Sanskrit Font */
  .font-sanskrit {
    font-family: 'Noto Sans Devanagari', sans-serif;
  }
</style>