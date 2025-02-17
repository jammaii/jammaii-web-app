export const ONLY_SPECIAL_CHARACTER_REGEX = /[^a-zA-Z0-9]/;

export const SPECIAL_CHARACTER_REGEX = /[^a-zA-Z0-9 ]/;

// S_C is short for SPECIAL_CHARACTER.
export const S_C_SPACE_PERIOD_COMMA_REGEX = /[^a-zA-Z0-9., ]/;
export const USERNAME_REGEX = /[^a-zA-Z0-9_ ]/;
export const NUMBER_REGEX = /\d/;
export const PASSWORD_REGEX = /^\S{8,}$/;

// Matches all whitespace characters.
export const WHITESPACE_REGEX = /\s/;
// Matches all whitespace characters, not only one.
export const WHITESPACE_GLOBAL_REGEX = /\s+/g;
