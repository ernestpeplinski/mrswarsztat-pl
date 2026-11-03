// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Lokalnie i na własnej domenie: domyślne wartości poniżej.
// Wdrożenie testowe na github.io można odtworzyć, ustawiając SITE_URL, BASE_PATH i PUBLIC_NOINDEX=true w workflow.
const site = process.env.SITE_URL ?? 'https://mrswarsztat.pl';
const base = process.env.BASE_PATH ?? '/';

/**
 * Astro zostawia komentarze HTML z szablonów w gotowych stronach (widać je w „Pokaż źródło strony”).
 * Notatki w plikach .astro zostają w kodzie, ale po buildzie usuwamy je z plików .html.
 * @returns {import('astro').AstroIntegration}
 */
const stripHtmlComments = () => ({
  name: 'strip-html-comments',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const root = fileURLToPath(dir);
      for (const entry of await readdir(root, { recursive: true })) {
        if (!entry.endsWith('.html')) continue;
        const file = join(root, entry);
        const html = await readFile(file, 'utf8');
        await writeFile(file, html.replace(/<!--[\s\S]*?-->/g, ''));
      }
    },
  },
});

// https://astro.build/config
export default defineConfig({
  // Używane do canonical, og:url i (później) sitemapy.
  site,
  base,
  // Jednolite adresy ze slashem na końcu (/wulkanizacja-koscierzyna/) – brak duplikatów dla Google.
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
  integrations: [stripHtmlComments()],
  vite: {
    plugins: [tailwindcss()],
  },
});
