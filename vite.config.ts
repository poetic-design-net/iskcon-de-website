import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
  plugins: [
    sveltekit(),
    Icons({
      compiler: 'svelte',
      defaultStyle: 'display: inline-block; vertical-align: middle;',
      defaultClass: 'inline-block align-middle text-current',
      scale: 1,
      autoInstall: true,
      customCollections: {
        mdi: {
          loadingMode: 'sync'
        }
      }
    })
  ],
  optimizeDeps: {
    exclude: ['@sveltejs/kit'],
    include: ['@lucide/svelte']
  },
  ssr: {
    noExternal: ['@lucide/svelte']
  },
  resolve: {
    dedupe: ['svelte']
  }
});
