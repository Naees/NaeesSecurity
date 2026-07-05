import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  base: '/NaeesWrites/',
  site: 'https://naees.github.io/NaeesWrites',
  integrations: [sitemap()],
});
