import {
  CustomDate,
  FormatDateArgs,
  GetDateFnsLocaleArgs,
  TimeUnit
} from '@/types/dates';
import {
  format,
  subDays,
  type Locale,
  subHours,
  subMinutes,
  subSeconds,
  subMilliseconds,
  addDays,
  addHours,
  addMinutes,
  addSeconds,
  addMilliseconds,
  addMonths,
  addYears,
  addWeeks,
  subYears,
  subMonths,
  subWeeks
} from 'date-fns';
import * as dateFnsLocales from 'date-fns/locale';
import { removeHyphen } from './utils';
import { DEFAULT_LOCALE_WITH_HYPHEN } from '@/constants/dates';

export const getDate = (date?: CustomDate | null) => {
  return date ? new Date(date) : new Date();
};

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

export const getDateTimeString = (date: CustomDate = new Date()): string =>
  new Date(date).getTime().toString();

export const addToDate = (
  date: CustomDate,
  amount: number,
  degree: TimeUnit = 'days'
) => {
  const baseDate = getDate(date);
  if (amount === 0) {
    return baseDate;
  } else if (amount < 0) {
    return subtractFromDate(date, Math.abs(amount), degree);
  }

  switch (degree) {
    case 'years':
      return addYears(baseDate, amount);
    case 'months':
      return addMonths(baseDate, amount);
    case 'weeks':
      return addWeeks(baseDate, amount);
    case 'days':
      return addDays(baseDate, amount);
    case 'hours':
      return addHours(baseDate, amount);
    case 'minutes':
      return addMinutes(baseDate, amount);
    case 'seconds':
      return addSeconds(baseDate, amount);
    case 'milliseconds':
      return addMilliseconds(baseDate, amount);
    default:
      return addDays(baseDate, amount);
  }
};

const subtractFromDate = (
  date: CustomDate,
  amount: number,
  degree: TimeUnit = 'days'
) => {
  const baseDate = getDate(date);

  switch (degree) {
    case 'years':
      return subYears(baseDate, amount);
    case 'months':
      return subMonths(baseDate, amount);
    case 'weeks':
      return subWeeks(baseDate, amount);
    case 'days':
      return subDays(baseDate, amount);
    case 'hours':
      return subHours(baseDate, amount);
    case 'minutes':
      return subMinutes(baseDate, amount);
    case 'seconds':
      return subSeconds(baseDate, amount);
    case 'milliseconds':
      return subMilliseconds(baseDate, amount);
    default:
      return subDays(baseDate, amount);
  }
};
