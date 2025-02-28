import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
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

/**
 * Safely parse a string to JSON.
 * Returns `undefined` when the string is an invalid json.
 */
export const safeParseJSON = <T = unknown>(value: string) => {
  if (!value) return undefined;

  try {
    return JSON.parse(value) as T;
  } catch {
    return undefined;
  }
};

export const isString = (value: unknown): value is string =>
  typeof value === 'string';

export const formatCurrency = (value: number) => value.toLocaleString();

export function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}
