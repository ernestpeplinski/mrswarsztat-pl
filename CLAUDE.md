# MRS Serwis Samochodowy – nowa strona (Astro + Tailwind)

Statyczna strona-wizytówka warsztatu (Kaliska Kościerskie, SEO pod Kościerzynę). Hosting: GitHub Pages.
Docelowa domena: https://mrswarsztat.pl (na razie wdrożenie testowe na `*.github.io`, z `noindex`).
Priorytet biznesowy: konwersja z telefonów na usługę wymiany opon na zimowe (przycisk „Zadzwoń” i „Wyznacz trasę”).

## Komendy
- `npm run dev` – podgląd (http://localhost:4321)
- `npm run build` – build do `dist/`
- Node ≥ 22.19 (starsze dają tylko ostrzeżenie o `undici`).

## Stack i zasady
- Astro (SSG), Tailwind CSS v4 (`@tailwindcss/vite`, tokeny w `src/styles/global.css` → `@theme`), TypeScript tam, gdzie trzeba.
- Brak frameworków JS i bibliotek ikon: ikony to inline SVG w `src/components/icons/Icon.astro` (ścieżki Lucide; nowe dopisuj do mapy `paths`).
- Mobile-first. Dolny pasek `StickyMobileBar` (telefon + mapa) zawsze na telefonach; `body` ma pod niego padding.
- Wszystkie linki wewnętrzne przez `url()` z `src/utils/url.ts` (prefiks `base` na GitHub Pages). Nigdy `href="/..."` na sztywno.
- Dane firmy (NAP, godziny, social, współrzędne, wizytówka Google, formularz) tylko w `src/config/site.ts`. Usługi: `config/services.ts`, opinie: `config/reviews.ts`.
- Teksty: nic nie wymyślamy (ceny, terminy, gwarancje, liczby). Opinie klientów wstawiamy dosłownie. Frazy lokalne wplatamy naturalnie; adres jest w Kaliskach Kościerskich „kilka km od Kościerzyny” – nie piszemy, że warsztat jest w Kościerzynie.
- Logo ma wbudowane kwadratowe tło → wygaszane maską `.logo-fade` (`global.css`); w Headerze wystaje poza pasek, rozmiar to zmienna `--logo` w `Header.astro`.

## Struktura `src/`
`components/{layout,ui,sections,cards,seo,icons}`, `config/`, `layouts/Layout.astro`, `pages/`, `styles/`, `utils/`, `assets/images/`.
JSON-LD: `LocalBusinessSchema` jest globalnie w `Layout`; `ServiceSchema` i `FaqSchema` wstawiamy na stronach przez `slot="head"`.

## Gotowe
Layout (SEO head, slot JSON-LD), Header, StickyMobileBar, Footer, PrimaryButton, Section, Hero, Usługi, Opinie, Kontakt + formularz (Web3Forms), 404, konfiguracja GitHub Pages (`.github/workflows/deploy.yml`, ustawia `SITE_URL`, `BASE_PATH`, `PUBLIC_NOINDEX`).

## Do zrobienia (kolejność luźna)
1. **PRZYPOMNIĆ UŻYTKOWNIKOWI:** ocena Google (4,9/5, 125 opinii) jest wpisana ręcznie w `config/reviews.ts` (`GOOGLE_RATING`) – zmienić na dynamiczną: pobieranie z Google Places API przy buildzie (klucz w sekretach GitHuba) + cykliczny rebuild (cron w workflow). Wymaga atrybucji Google. Własne 3 opinie zostają ręczne.
2. Podmienić `SITE.google.writeReviewUrl` na oficjalny link z Profilu Firmy Google („Zbierz więcej opinii”).
3. ~~Klucz Web3Forms~~ – wpisany; przetestować wysyłkę na stronie testowej.
4. Sekcja FAQ + `FaqSchema` (uwaga: Google nie pokazuje już rozwijanych FAQ dla zwykłych firm – FAQ głównie dla klientów).
5. Galeria (prawdziwe zdjęcia warsztatu; na start placeholdery).
6. ~~Podstrony usług~~ – gotowe: `/wulkanizacja-koscierzyna/`, `/klimatyzacja-koscierzyna/`, `/mechanik-koscierzyna/` (wspólny szablon `layouts/ServicePage.astro`, `ServiceSchema`, na klimatyzacji i mechanice też FAQ + `FaqSchema`). Ewentualnie osobna podstrona dla diagnostyki komputerowej.
7. ~~Polityka prywatności~~ – gotowa (`/polityka-prywatnosci/`, dane firmy w `SITE.company`, link w stopce i przy formularzu zamiast checkboxa zgody). Pkt 3–5 oparte na DPA Web3Forms v1.0 (13.07.2026, kopia: `dpaWeb3forms.txt`) i ustawieniu retencji w panelu Web3Forms = 30 dni (zmiana ustawienia = zmiana pkt 5) – po zmianie DPA/dostawcy zaktualizować. Do sprawdzenia: okres przechowywania u nas, czy cookies/analityka się nie zmieniły.
8. Własna domena: usunąć `PUBLIC_NOINDEX`, `SITE_URL`, `BASE_PATH` z workflow, dodać `public/CNAME`, sitemap + robots.txt.
9. Grafika OG 1200×630 (teraz kwadratowe logo), prawdziwe zdjęcie w Hero, logo z przezroczystym tłem (zamiast maski).
10. Wizytówka Google ma w nazwie upchane frazy („…Mechanika, wulkanizacja i klimatyzacja.Kościerzyna…”) – zalecić użytkownikowi poprawę (ryzyko zawieszenia).

## Sezon na opony
Teksty o oponach zimowych/letnich zależą od pory roku (`src/config/season.ts`: zima paź–lut, lato mar–wrz). `SeasonText.astro` (hero, plakietka usługi) poprawia się w przeglądarce według daty; meta, FAQ i JSON-LD ustawia build, a workflow przebudowuje stronę 1. dnia miesiąca (`schedule`). Nowe teksty o sezonie: używaj `SEASONS[getSeason()]`, nie wpisuj „zimowe” na sztywno.

## Uwagi
- Commity robi użytkownik (lub Claude lokalnie, jeśli poprosi).
- Po każdej sekcji sprawdzaj wygląd na telefonie (375 px) i desktopie oraz konsolę przeglądarki.
