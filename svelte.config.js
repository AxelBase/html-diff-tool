// svelte.config.js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'docs',
      assets: 'docs',
      fallback: undefined,
      precompress: false
    }),
    paths: {
      base: '/html-diff-tool'
    },
    prerender: {
      entries: ['*'],
      handleMissingId: 'ignore',
      handleHttpError: 'warn'
    }
  }
};