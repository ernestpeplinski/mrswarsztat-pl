// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Domena produkcyjna – używana do canonical, og:url i (później) sitemapy.
  site: 'https://mrswarsztat.pl',
  // Jednolite adresy ze slashem na końcu (/wulkanizacja-koscierzyna/) – brak duplikatów dla Google.
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
  },
});
