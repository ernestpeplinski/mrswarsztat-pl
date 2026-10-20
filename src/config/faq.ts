import { SITE } from './site';
import { SEASONS, getSeason } from './season';

/**
 * Pytania i odpowiedzi – widoczne w sekcji FAQ oraz w JSON-LD (FaqSchema). Jedno źródło,
 * więc treść na stronie i w danych strukturalnych jest identyczna.
 * Zasada: bez cen, terminów i gwarancji, których nie podał właściciel.
 */
export interface FaqItem {
  question: string;
  answer: string;
}

const season = SEASONS[getSeason()].tires;
const phones = SITE.phones.map((phone) => phone.display).join(' lub ');

export const FAQ: FaqItem[] = [
  {
    question: 'Gdzie dokładnie jest warsztat?',
    answer: `${SITE.name} znajduje się w miejscowości ${SITE.address.locality}, pod adresem ${SITE.fullAddress} – kilka kilometrów od Kościerzyny. Przycisk „Wyznacz trasę” otworzy nawigację w Mapach Google.`,
  },
  {
    question: 'W jakich godzinach jesteście otwarci?',
    answer: `Jesteśmy czynni w dni robocze (${SITE.hours.label}). Przed przyjazdem warto zadzwonić: ${phones}.`,
  },
  {
    question: `Jak ustalić termin wymiany opon na ${season}?`,
    answer: `Najprościej zadzwonić: ${phones}. Możesz też wysłać zapytanie przez formularz kontaktowy na tej stronie.`,
  },
  {
    question: 'Czym zajmuje się warsztat?',
    answer:
      `Wulkanizacją (wymiana opon na ${season}, wyważanie kół), serwisem klimatyzacji (serwis, odgrzybianie, naprawa) oraz mechaniką, w tym diagnostyką komputerową i bieżącymi naprawami.`,
  },
  {
    question: 'Czy sprawdzicie przyczynę świecącej kontrolki lub stukania w aucie?',
    answer:
      'Tak, wykonujemy diagnostykę komputerową i szukamy przyczyny niepokojących objawów, takich jak świecąca kontrolka czy stukanie. Opisz problem przez telefon lub formularz, a podpowiemy, jak działać dalej.',
  },
];
