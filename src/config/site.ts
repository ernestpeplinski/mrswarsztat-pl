/**
 * Jedno źródło prawdy o firmie (NAP: Name, Address, Phone).
 * Header, stopka, pasek mobilny i JSON-LD czytają stąd – dzięki temu dane są
 * identyczne w całym serwisie, co jest ważne dla Local SEO.
 */

const address = {
  street: 'ul. Pogodna 4',
  postalCode: '83-400',
  locality: 'Kaliska Kościerskie',
  region: 'pomorskie',
  country: 'PL',
} as const;

const fullAddress = `${address.street}, ${address.postalCode} ${address.locality}`;

export const SITE = {
  name: 'MRS Serwis Samochodowy',
  shortName: 'MRS Serwis',
  url: 'https://mrswarsztat.pl',
  /** Stały identyfikator encji firmy w JSON-LD – inne schematy odwołują się do niego przez @id. */
  businessId: 'https://mrswarsztat.pl/#business',
  /** Obszar działania (JSON-LD areaServed). Warsztat jest w Kaliskach Kościerskich, obsługuje też okolice Kościerzyny. */
  areaServed: ['Kościerzyna', 'Kaliska Kościerskie'],
  locale: 'pl_PL',
  /** Domyślny obraz OG – tymczasowo logo; docelowo grafika 1200×630. */
  defaultOgImage: '/img/og-default.png',

  address,
  fullAddress,

  phones: [
    { display: '727 470 300', href: 'tel:+48727470300', e164: '+48727470300' },
    { display: '886 160 080', href: 'tel:+48886160080', e164: '+48886160080' },
  ],
  email: 'mrs-warsztat@wp.pl',

  hours: {
    label: 'Pon–Pt 8:00–17:00',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '17:00',
  },

  /** Przycisk „Wyznacz trasę” – otwiera nawigację w aplikacji Mapy Google. */
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${address.street}, ${address.postalCode} ${address.locality}`,
  )}`,

  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61581669183592',
    instagram: 'https://www.instagram.com/mrsserwissamochodowy',
    tiktok: 'https://www.tiktok.com/@mrs.serwis.samoch',
  },
} as const;

/** Główne menu. Podstrony silosowe powstaną w kolejnych krokach. */
export const NAV = [
  { label: 'Wulkanizacja', href: '/wulkanizacja-koscierzyna/' },
  { label: 'Klimatyzacja', href: '/klimatyzacja-koscierzyna/' },
  { label: 'Mechanika', href: '/mechanik-koscierzyna/' },
  { label: 'Opinie', href: '/#opinie' },
  { label: 'Kontakt', href: '/#kontakt' },
] as const;
