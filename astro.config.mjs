import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Salida 100% estatica -> compatible con Vercel (deteccion automatica de Astro)
// y con cPanel/Namecheap (subir el contenido de dist/ a public_html).
export default defineConfig({
  site: 'https://wlicargo.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [sitemap()],
  compressHTML: true,
  vite: {
    build: {
      assetsInlineLimit: 2048,
      rollupOptions: { output: { assetFileNames: 'assets/[name].[hash][extname]' } },
    },
  },
});
