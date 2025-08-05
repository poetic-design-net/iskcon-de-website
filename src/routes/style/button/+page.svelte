<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import Icon from '@iconify/svelte';
</script>

<svelte:head>
  <title>Button Showcase - ISKCON Deutschland</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 py-12">
  <div class="container mx-auto px-4">
    <h1 class="text-4xl font-bold text-center mb-12">Spezielle Button-Styles</h1>
    
    <!-- Existing Variants -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-6">Basis-Varianten</h2>
      <div class="flex flex-wrap gap-4">
        <Button variant="default">Standard Button</Button>
        <Button variant="premium">Premium Gradient</Button>
        <Button variant="soft">Soft Button</Button>
        <Button variant="outline">Outline Button</Button>
        <Button variant="ghost">Ghost Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link Style</Button>
      </div>
    </section>

    <!-- Special Creative Styles -->
    <section class="mb-16">
      <h2 class="text-2xl font-semibold mb-6">Kreative Spezial-Styles</h2>
      <div class="space-y-8">
        
        <!-- Glow Effect -->
        <div>
          <h3 class="text-lg font-medium mb-3">1. Spiritueller Glow-Effekt</h3>
          <div class="flex flex-wrap gap-4">
            <Button 
              variant="default"
              class="shadow-lg shadow-[#C6695D]/50 hover:shadow-xl hover:shadow-[#C6695D]/60 transition-all duration-300"
            >
              <Icon icon="mdi:white-balance-sunny" class="w-5 h-5" />
              Spiritueller Glow
            </Button>
            
            <Button 
              variant="premium"
              class="animate-pulse-slow shadow-2xl shadow-[#C6695D]/40"
            >
              Pulsierender Glow
            </Button>
          </div>
        </div>

        <!-- Lotus Border -->
        <div>
          <h3 class="text-lg font-medium mb-3">2. Lotus-Rahmen Style</h3>
          <div class="flex flex-wrap gap-4">
            <Button 
              variant="outline"
              class="relative overflow-hidden border-2 border-[#C6695D] hover:border-[#B85A4F] group"
            >
              <span class="relative z-10">Lotus Border</span>
              <div class="absolute inset-0 bg-gradient-to-r from-[#C6695D]/0 via-[#C6695D]/10 to-[#C6695D]/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Button>
            
            <Button 
              variant="soft"
              class="relative border-2 border-transparent bg-gradient-to-r from-[#C6695D]/10 to-[#9B4A40]/10 hover:from-[#C6695D]/20 hover:to-[#9B4A40]/20 before:absolute before:inset-0 before:border-2 before:border-[#C6695D]/20 before:rounded-lg before:p-[2px]"
            >
              Double Border Lotus
            </Button>
          </div>
        </div>

        <!-- 3D Effect -->
        <div>
          <h3 class="text-lg font-medium mb-3">3. 3D Tiefeneffekt</h3>
          <div class="flex flex-wrap gap-4">
            <Button 
              variant="default"
              class="transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-2xl relative before:absolute before:inset-x-0 before:-bottom-1 before:h-1 before:bg-[#9B4A40] before:rounded-b-lg"
            >
              3D Depth Button
            </Button>
            
            <Button 
              variant="secondary"
              class="bg-white shadow-[0_5px_0_0_#e5e7eb] hover:shadow-[0_3px_0_0_#e5e7eb] hover:translate-y-[2px] transition-all duration-150"
            >
              Pressed Effect
            </Button>
          </div>
        </div>

        <!-- Gradient Borders -->
        <div>
          <h3 class="text-lg font-medium mb-3">4. Gradient-Rahmen</h3>
          <div class="flex flex-wrap gap-4">
            <div class="p-[2px] bg-gradient-to-r from-[#C6695D] to-[#9B4A40] rounded-lg">
              <Button 
                variant="ghost"
                class="bg-white hover:bg-gray-50"
              >
                Gradient Border
              </Button>
            </div>
            
            <div class="p-[2px] bg-gradient-to-r from-[#C6695D] via-[#B85A4F] to-[#9B4A40] rounded-lg animate-gradient-shift">
              <Button 
                variant="ghost"
                class="bg-white hover:bg-gray-50"
              >
                Animated Gradient
              </Button>
            </div>
          </div>
        </div>

        <!-- Icon Animations -->
        <div>
          <h3 class="text-lg font-medium mb-3">5. Icon-Animationen</h3>
          <div class="flex flex-wrap gap-4">
            <Button 
              variant="default"
              class="group"
            >
              <Icon icon="mdi:arrow-right" class="w-5 h-5 transition-transform group-hover:translate-x-1" />
              Slide Icon
            </Button>
            
            <Button 
              variant="premium"
              class="group"
            >
              <Icon icon="mdi:heart" class="w-5 h-5 transition-transform group-hover:scale-125" />
              Scale Icon
            </Button>
            
            <Button 
              variant="soft"
              class="group"
            >
              <Icon icon="mdi:star" class="w-5 h-5 transition-transform group-hover:rotate-180 duration-500" />
              Rotate Icon
            </Button>
          </div>
        </div>

        <!-- Split Design -->
        <div>
          <h3 class="text-lg font-medium mb-3">6. Split-Design</h3>
          <div class="flex flex-wrap gap-4">
            <Button 
              variant="outline"
              class="relative overflow-hidden group border-2 border-[#C6695D]"
            >
              <span class="relative z-10 group-hover:text-white transition-colors">Split Hover</span>
              <div class="absolute inset-0 bg-[#C6695D] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </Button>
            
            <Button 
              variant="outline"
              class="relative overflow-hidden group border-2 border-gray-300"
            >
              <span class="relative z-10 group-hover:text-white transition-colors">Diagonal Split</span>
              <div class="absolute inset-0 bg-gradient-to-br from-[#C6695D] to-[#9B4A40] transform -translate-x-full -translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
            </Button>
          </div>
        </div>

        <!-- Neumorphism -->
        <div>
          <h3 class="text-lg font-medium mb-3">7. Neumorphismus</h3>
          <div class="flex flex-wrap gap-4 p-8 bg-gray-100 rounded-lg">
            <Button 
              variant="ghost"
              class="bg-gray-100 shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] transition-all duration-300"
            >
              Neumorphic
            </Button>
            
            <Button 
              variant="ghost"
              class="bg-gray-100 shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] hover:shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] transition-all duration-300"
            >
              Neumorphic Pressed
            </Button>
          </div>
        </div>

        <!-- Glass Effect -->
        <div>
          <h3 class="text-lg font-medium mb-3">8. Glassmorphismus</h3>
          <div class="flex flex-wrap gap-4 p-8 bg-gradient-to-br from-[#C6695D]/20 to-[#9B4A40]/20 rounded-lg">
            <Button 
              variant="ghost"
              class="bg-white/30 backdrop-blur-md border border-white/20 hover:bg-white/40 text-gray-800"
            >
              <Icon icon="mdi:leaf" class="w-5 h-5" />
              Glass Effect
            </Button>
            
            <Button 
              variant="ghost"
              class="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md border border-white/30 hover:from-white/30 hover:to-white/20 text-gray-800 shadow-lg"
            >
              Premium Glass
            </Button>
          </div>
        </div>

        <!-- Text Effects -->
        <div>
          <h3 class="text-lg font-medium mb-3">9. Text-Effekte</h3>
          <div class="flex flex-wrap gap-4">
            <Button 
              variant="ghost"
              class="group relative overflow-hidden"
            >
              <span class="relative z-10">
                <span class="inline-block transition-transform group-hover:-translate-y-full duration-300">Slide Up</span>
                <span class="absolute left-0 top-full transition-transform group-hover:-translate-y-full duration-300">Slide Up</span>
              </span>
            </Button>
            
            <Button 
              variant="soft"
              class="group"
            >
              <span class="bg-gradient-to-r from-[#C6695D] to-[#9B4A40] bg-clip-text text-transparent group-hover:from-[#9B4A40] group-hover:to-[#C6695D] transition-all duration-500">
                Gradient Text
              </span>
            </Button>
          </div>
        </div>

        <!-- Size Variations -->
        <div>
          <h3 class="text-lg font-medium mb-3">10. Größen-Kombinationen</h3>
          <div class="flex flex-wrap items-center gap-4">
            <Button variant="premium" size="icon" class="rounded-full shadow-xl">
              <Icon icon="mdi:om" class="w-5 h-5" />
            </Button>
            <Button variant="soft" size="sm">Klein</Button>
            <Button variant="default" size="default">Standard</Button>
            <Button variant="premium" size="lg">Groß</Button>
            <Button variant="outline" size="xl" class="border-3">Extra Groß</Button>
          </div>
        </div>

      </div>
    </section>
  </div>
</div>

<style>
  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  .animate-gradient-shift {
    background-size: 200% 200%;
    animation: gradient-shift 3s ease infinite;
  }
  
  .animate-pulse-slow {
    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
</style>