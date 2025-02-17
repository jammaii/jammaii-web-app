export type StringOrNumber = string | number;

export type ChildrenProps = { children: React.ReactNode };
export type ClassNameProps = { className: string };

/**
 * Makes specific keys required.
 *
 * @example
 * type Test = RequireKeys<{
 *   a: number;
 *   b?: number;
 * }, "b">;
 * Result: { a: number; b: number }
 */
export type RequireKeys<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type VoidCallback = () => void;

export type GetValidityDisplayOptions = {
  validDisplay?: string;
  invalidDisplay?: string;
};
