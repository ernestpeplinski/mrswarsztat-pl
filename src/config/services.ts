import { SEASONS, getSeason } from './season';
import type { ComponentProps } from 'astro/types';
import type Icon from '../components/icons/Icon.astro';

/**
 * Lista usług – jedno źródło dla kart na stronie głównej, menu i (później) schematów Service.
 * Teksty są krótkie i oparte na profilu firmy; rozbudowane opisy trafią na podstrony usług.
 */
export interface Service {
  /** Adres podstrony usługi (silos SEO). */
  href: string;
  title: string;
  description: string;
  icon: ComponentProps<typeof Icon>['name'];
  /** Opcjonalna etykieta na karcie, np. usługa priorytetowa w danym sezonie. */
  badge?: string;
  /** Plakietka zależna od pory roku (SeasonText). */
  seasonalBadge?: boolean;
}

export const SERVICES: Service[] = [
  {
    href: '/wulkanizacja-koscierzyna/',
    title: 'Wulkanizacja i wymiana opon',
    description:
      `Szybka wymiana opon na ${SEASONS[getSeason()].tires}, wyważanie kół i profesjonalny serwis. Dobra jakość w uczciwej cenie.`,
    icon: 'tire',
    seasonalBadge: true,
  },
  {
    href: '/klimatyzacja-koscierzyna/',
    title: 'Serwis klimatyzacji',
    description:
      'Serwis, odgrzybianie i naprawa klimatyzacji. Znamy się na nietypowych problemach, z którymi inni mają kłopot.',
    icon: 'snowflake',
  },
  {
    href: '/mechanik-koscierzyna/',
    title: 'Mechanika i diagnostyka komputerowa',
    description:
      'Bieżące naprawy oraz diagnostyka komputerowa – znajdziemy przyczynę stukania czy świecącej kontrolki.',
    icon: 'wrench',
  },
];
