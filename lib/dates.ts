import {
  CustomDate,
  FormatDateArgs,
  GetDateFnsLocaleArgs
} from '@/types/dates';
import { format, Locale } from 'date-fns';
import * as dateFnsLocales from 'date-fns/locale';
import { removeHyphen } from './utils';
import { DEFAULT_LOCALE_WITH_HYPHEN } from '@/constants/dates';

export function getDateFnsLocale({ locale }: GetDateFnsLocaleArgs): Locale {
  return dateFnsLocales[locale] ?? dateFnsLocales.enUS;
}

/**
 * The function `getUserDefaultLocale` returns the user's default locale, either from the browser's
 * `navigator.language` property or a default value if `navigator` is undefined.
 * @returns an object with two properties: "localeWithoutHyphen" and "localeWithHyphen".
 */
export function getUserDefaultLocale() {
  /* `if (typeof window !== "undefined")` checks if the `window` object is defined,
     so next js can have access to the navigator object and not throw an error.
    */
  if (typeof window !== 'undefined')
    return {
      localeWithoutHyphen: removeHyphen(
        navigator.language
      ) as GetDateFnsLocaleArgs['locale'],
      localeWithHyphen: navigator.language
    };
  return {
    localeWithoutHyphen: removeHyphen(
      DEFAULT_LOCALE_WITH_HYPHEN
    ) as GetDateFnsLocaleArgs['locale'],
    localeWithHyphen: DEFAULT_LOCALE_WITH_HYPHEN
  };
}

export const formatDate = (
  date: CustomDate = new Date(),
  options: Partial<FormatDateArgs> = {}
): string => {
  const { dateFormat = 'P' } = options;
  const actualDate = new Date(date);
  return format(actualDate, dateFormat, {
    locale: getDateFnsLocale({
      locale: getUserDefaultLocale().localeWithoutHyphen
    })
  });
};
