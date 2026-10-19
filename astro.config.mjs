// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Lokalnie i na własnej domenie: domyślne wartości poniżej.
// Wdrożenie testowe na GitHub Pages ustawia SITE_URL i BASE_PATH w .github/workflows/deploy.yml.
const site = process.env.SITE_URL ?? 'https://mrswarsztat.pl';
const base = process.env.BASE_PATH ?? '/';

// https://astro.build/config
export default defineConfig({
  // Używane do canonical, og:url i (później) sitemapy.
  site,
  base,
  // Jednolite adresy ze slashem na końcu (/wulkanizacja-koscierzyna/) – brak duplikatów dla Google.
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
  },
});
