import type { APIRoute } from 'astro';
import { url } from '../utils/url';

/**
 * Mapa strony generowana z plików w src/pages (płaska struktura). Nowa podstrona .astro trafia tu sama.
 * Pomijamy 404. Bez <lastmod>: nie mamy wiarygodnych dat zmian treści, a Google ignoruje przypadkowe.
 */
const pages = import.meta.glob('./*.astro');

const paths = Object.keys(pages)
  .map((file) => file.replace(/^\.\//, '').replace(/\.astro$/, ''))
  .filter((name) => name !== '404')
  .map((name) => (name === 'index' ? '/' : `/${name}/`))
  .sort();

export const GET: APIRoute = ({ site }) => {
  const urls = paths.map((path) => `  <url><loc>${new URL(url(path), site).href}</loc></url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
