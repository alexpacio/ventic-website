// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://ventic.it',
  trailingSlash: 'always',
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'it',
        locales: { it: 'it-IT', en: 'en-GB' },
      },
      // Exclude nothing — all pages are indexable; add filter here if needed
    }),
  ],

  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()]
  },

  output: 'static',
});
