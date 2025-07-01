declare module 'virtual:icons/mdi/*' {
  import type { SvelteComponent } from 'svelte';
  const component: typeof SvelteComponent;
  export default component;
}

declare module 'virtual:icons/*' {
  import type { SvelteComponent } from 'svelte';
  const component: typeof SvelteComponent;
  export default component;
}

declare module '~icons/*' {
  import type { SvelteComponent } from 'svelte';
  const component: typeof SvelteComponent;
  export default component;
}