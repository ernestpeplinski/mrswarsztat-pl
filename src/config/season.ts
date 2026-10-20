/**
 * Sezon na opony – steruje tekstami o wymianie opon (hero, plakietka usługi, opisy).
 * Okres zimowy: październik–luty, letni: marzec–wrzesień. Granice zmień w SUMMER_MONTHS.
 *
 * Teksty ze `SeasonText.astro` są ustawiane przy buildzie i poprawiane w przeglądarce według
 * daty odwiedzającego, więc zmieniają się same. Pozostałe teksty (meta, FAQ, JSON-LD) są
 * ustawiane tylko przy buildzie – dlatego workflow przebudowuje stronę 1. dnia każdego miesiąca.
 */
export type Season = 'winter' | 'summer';

/** Miesiące (0 = styczeń), w których wymieniamy na opony letnie. */
const SUMMER_MONTHS = [2, 3, 4, 5, 6, 7, 8];

export const SEASONS = {
  winter: { tires: 'zimowe', badge: 'Sezon na zimówki' },
  summer: { tires: 'letnie', badge: 'Sezon na opony letnie' },
} as const satisfies Record<Season, Record<string, string>>;

export type SeasonField = keyof (typeof SEASONS)['winter'];

export function getSeason(date: Date = new Date()): Season {
  return SUMMER_MONTHS.includes(date.getMonth()) ? 'summer' : 'winter';
}
