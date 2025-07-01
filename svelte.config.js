import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      'virtual:icons': './src/lib/types/virtual-icons.d.ts',
      '~icons': './src/lib/types/virtual-icons.d.ts'
    }
  }
};

export default config;
