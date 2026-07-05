import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  base: '/NaeesSecurity/',
  site: 'https://naees.github.io/NaeesSecurity',
  integrations: [sitemap()],
});
