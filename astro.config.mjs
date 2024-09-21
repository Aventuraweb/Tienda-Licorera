// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

import viteConfig from './vite.config';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  vite: viteConfig, // Aquí se integra la configuración de Vite
});