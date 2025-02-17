import { CustomDate, FormatDateArgs } from '@/types/dates';
import { type ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import * as dateFnsLocales from 'date-fns/locale';
import { WHITESPACE_GLOBAL_REGEX } from '@/constants/regex';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Gets the singular or plural version of a word based on its count. */
export const pluralize = (
  count: number,
  singular: string,
  plural?: string
): string => {
  return count === 1 ? singular : plural || singular + 's';
};

export function removeHyphen(text: string) {
  return text.replace(WHITESPACE_GLOBAL_REGEX, '-');
}
