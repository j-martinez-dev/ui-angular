import { type Locale } from 'date-fns';
import { fr, enUS, es } from 'date-fns/locale';

export const LOCALE_MAP: Record<string, Locale> = {
  'fr-FR': fr,
  'en-US': enUS,
  'es-ES': es,
};
