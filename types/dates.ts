import type * as dateFnsLocales from "date-fns/locale";
import { type DATE_TIME_FORMATS } from "@/constants/dates";

export type CustomDate = Date | string | number;

export type TimeUnit =
  | "years"
  | "months"
  | "weeks"
  | "days"
  | "hours"
  | "minutes"
  | "seconds"
  | "milliseconds";

export type FormatDateArgs = {
  dateFormat?: string;
};

export type GetDateFnsLocaleArgs = {
  locale: keyof typeof dateFnsLocales;
};

export type DateRange = {
  start: Date;
  end: Date;
};

export type ResolvedSearchDatesOptions = {
  defaultGapInDays: number;
  maximumGapInDays: number;
};

export type ValidityRange = {
  validFrom: CustomDate;
  validTo: CustomDate | null;
};

export type DateTimeFormat =
  (typeof DATE_TIME_FORMATS)[keyof typeof DATE_TIME_FORMATS];
