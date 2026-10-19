/**
 * Dokleja prefiks `base` do wewnętrznej ścieżki, np. url('/uslugi/') → '/mrswarsztat-pl/uslugi/'.
 * Na GitHub Pages (project page) strona działa w podkatalogu, a na własnej domenie base = '/',
 * więc wtedy funkcja zwraca ścieżkę bez zmian. Zewnętrzne adresy, tel:, mailto: i kotwice przechodzą bez zmian.
 */
export function url(path: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
