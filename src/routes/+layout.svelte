<script lang="ts">
  import '../app.css';
  import Navbar from '$lib/components/global/Navbar.svelte';
  import Footer from '$lib/components/global/Footer.svelte';
  import { page } from '$app/stores';
  import type { LayoutData } from './$types';

  export let data: LayoutData;
  
  // Homepage soll keinen padding-top haben (für Hero Section)
  $: isHomepage = $page.route.id === '/';
</script>

<div class="relative min-h-screen overflow-x-hidden">
  <Navbar navigationData={data.navigationData} />
  <main class={isHomepage ? '' : 'pt-24'}>
    <slot />
  </main>
  <Footer />
</div>
