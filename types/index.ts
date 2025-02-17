export type StringToTypeMap<T> = { [key in string]: T };

export type DivProps = React.HTMLAttributes<HTMLDivElement>;
export type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
export type FormProps = React.FormHTMLAttributes<HTMLFormElement>;

export type NonEmptyArray<T> = [T, ...T[]];

export type ObscenityFilter = {
  phrase: string;
  patterns: string[];
  whitelistedPatterns: string[];
};

export type NullableFields<T> = {
  [P in keyof T]: T[P] | null;
};

export type AnyEvent = Event | React.SyntheticEvent;
