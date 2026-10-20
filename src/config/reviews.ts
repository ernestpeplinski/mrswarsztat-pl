/**
 * Opinie klientów (dosłowne cytaty, bez przeróbek). Nowe opinie dopisuj na końcu listy.
 * Nie dodajemy ocen gwiazdkowych ani znaczników Review/aggregateRating w JSON-LD:
 * Google nie honoruje ich dla opinii umieszczanych przez samą firmę na własnej stronie.
 */
export interface Review {
  author: string;
  text: string;
}

export const REVIEWS: Review[] = [
  {
    author: 'Anna V.',
    text: 'Chciałbym podziękować pracownikom warsztatu za profesjonalną i sprawną obsługę. Naprawa została wykonana szybko, wszystko dokładnie wyjaśniono. Miła obsługa i wysoki poziom usług. Zdecydowanie polecam!',
  },
  {
    author: 'jankes',
    text: 'Świetna obsługa, super podejście do klienta, jakość wykonanych usług na najwyższym poziomie, dobre ceny. W końcu jakieś miejsce w Kościerzynie w którym bez zastanowienia można zostawić swój samochód i być pewnym, że wszystko będzie zrobione tak jak należy. Polecam!',
  },
  {
    author: 'Patryk S.',
    text: 'Szczerze polecam ten warsztat! Robiłem tu większy serwis: wymiana wahaczy, amortyzatorów oraz olejów i filtrów. Dodatkowo kupiłem na miejscu komplet nowych opon. Wszystko przebiegło bardzo sprawnie i profesjonalnie. Auto prowadzi się teraz idealnie, a obsługa klienta jest na najwyższym poziomie. Na pewno będę tu wracać!',
  },
];

/**
 * Średnia ocena w Google – WPISANE RĘCZNIE (stan na 2026-10-20).
 * Docelowo pobierane automatycznie podczas budowania strony (Places API), wtedy ten obiekt zniknie.
 */
export const GOOGLE_RATING = { rating: 4.9 };
