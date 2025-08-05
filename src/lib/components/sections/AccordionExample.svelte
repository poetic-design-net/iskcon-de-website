<script lang="ts">
  import Accordion from '$lib/components/ui/accordion.svelte';
  import Icon from '@iconify/svelte';
  
  // Beispiel: Nine Processes mit der globalen Accordion-Komponente
  const nineProcesses = [
    {
      id: 1,
      title: 'Shravanam',
      subtitle: 'Hören',
      icon: 'mdi:ear-hearing',
      content: {
        description: 'Das Hören über Krishna aus autoritativen Quellen...',
        benefits: ['Reinigt das Herz', 'Erweckt Verständnis', 'Stärkt Glauben'],
        practice: 'Täglich 30 Minuten aus Schriften hören',
        example: 'Maharaja Parikshit erreichte Perfektion durch Hören',
        image: null
      }
    }
    // ... weitere Prozesse
  ];
</script>

<section class="py-16 md:py-24">
  <div class="container mx-auto px-4">
    <h2 class="text-4xl font-bold text-center mb-12">
      Beispiel: Nine Processes mit globalem Accordion
    </h2>
    
    <div class="max-w-4xl mx-auto">
      <Accordion items={nineProcesses} defaultOpen={0}>
        <!-- Custom Content Slot -->
        <div slot="content" let:item>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Content Column -->
            <div class="lg:col-span-2 pl-0 lg:pl-[7.5rem] space-y-6">
              <p class="text-gray-700 leading-relaxed">
                {item.content.description}
              </p>
              
              {#if item.content.benefits}
                <div>
                  <h4 class="font-semibold mb-3 flex items-center gap-2">
                    <Icon icon="mdi:star" class="w-5 h-5 text-gray-500" />
                    Nutzen
                  </h4>
                  <ul class="space-y-2">
                    {#each item.content.benefits as benefit}
                      <li class="flex items-start gap-3">
                        <Icon icon="mdi:check-circle" class="w-5 h-5 text-gray-500 mt-0.5" />
                        <span class="text-gray-700">{benefit}</span>
                      </li>
                    {/each}
                  </ul>
                </div>
              {/if}
              
              {#if item.content.practice}
                <div>
                  <h4 class="font-semibold mb-3 flex items-center gap-2">
                    <Icon icon="mdi:yoga" class="w-5 h-5 text-gray-500" />
                    Praxis
                  </h4>
                  <p class="text-gray-700">{item.content.practice}</p>
                </div>
              {/if}
              
              {#if item.content.example}
                <div class="bg-white rounded-lg p-4 shadow-sm">
                  <h4 class="font-semibold mb-2 flex items-center gap-2">
                    <Icon icon="mdi:account-star" class="w-5 h-5 text-gray-600" />
                    Beispiel aus den Schriften
                  </h4>
                  <p class="text-gray-700">{item.content.example}</p>
                </div>
              {/if}
            </div>
            
            <!-- Image Column -->
            <div class="lg:col-span-1 order-first lg:order-last">
              <!-- Placeholder Image -->
              <div class="rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 h-48 lg:h-full flex items-center justify-center p-8">
                <div class="text-center">
                  <div class="w-24 h-24 mx-auto mb-4 rounded-full bg-white shadow-lg flex items-center justify-center">
                    <Icon icon={item.icon} class="w-12 h-12 text-gray-600" />
                  </div>
                  <h4 class="text-2xl font-bold text-gray-700 mb-2">{item.title}</h4>
                  <p class="text-sm text-gray-600">{item.subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Custom Footer -->
        <div slot="footer" class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-start gap-4">
            <Icon icon="mdi:information" class="w-6 h-6 text-gray-500 flex-shrink-0 mt-1" />
            <div>
              <h3 class="font-semibold text-gray-900 mb-2">Flexibilität in der Praxis</h3>
              <p class="text-gray-700">
                Man kann einen, einige oder alle neun Prozesse praktizieren...
              </p>
            </div>
          </div>
        </div>
      </Accordion>
    </div>
  </div>
</section>