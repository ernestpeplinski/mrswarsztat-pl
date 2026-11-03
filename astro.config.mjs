// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Lokalnie i na własnej domenie: domyślne wartości poniżej.
// Wdrożenie testowe na github.io można odtworzyć, ustawiając SITE_URL, BASE_PATH i PUBLIC_NOINDEX=true w workflow.
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
