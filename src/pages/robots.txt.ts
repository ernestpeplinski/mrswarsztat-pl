import type { APIRoute } from 'astro';
import { url } from '../utils/url';

/**
 * Wdrożenie testowe (PUBLIC_NOINDEX=true) blokuje roboty; produkcja wpuszcza je i wskazuje sitemapę.
 * Uwaga: roboty czytają tylko robots.txt z głównego katalogu domeny, więc na github.io/<repo>/ ten plik
 * jest dla nich nieistotny – wtedy chroni meta robots noindex z Layout.astro.
 */
export const GET: APIRoute = ({ site }) => {
  const hidden = import.meta.env.PUBLIC_NOINDEX === 'true';
  const body = hidden
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL(url('/sitemap.xml'), site).href}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
