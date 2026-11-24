import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

// Editorul Keystatic (/keystatic) există doar când rulezi `npm run dev`.
// Site-ul publicat rămâne 100% static: fără server, fără login public de atacat.
// Integrarea e activată doar când Astro rulează comanda `dev` (nu la build/preview).
function devOnly(integration) {
  let active = false;
  const hooks = {};
  for (const [name, fn] of Object.entries(integration.hooks)) {
    hooks[name] = async (opts) => {
      if (name === 'astro:config:setup') active = opts.command === 'dev';
      if (active) return fn(opts);
    };
  }
  return { ...integration, hooks };
}

export default defineConfig({
  // Schimbă după ce ai domeniul (sau setează variabila SITE_URL la hosting).
  site: process.env.SITE_URL ?? 'https://omihaila.com',
  trailingSlash: 'ignore',
  integrations: [
    markdoc(),
    sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', ro: 'ro' } } }),
    devOnly(react()),
    devOnly(keystatic()),
  ],
  vite: { plugins: [tailwindcss()] },
});
