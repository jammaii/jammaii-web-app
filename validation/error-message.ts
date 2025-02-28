import { pluralize } from "@/lib/utils";
import type { NonEmptyArray } from "@/types/index";

export const requiredErrorMessage = (fieldName: string) => {
  return `${fieldName} is required`;
};

export const invalidErrorMessage = (fieldName: string) => {
  return `${fieldName} is invalid`;
};

/**
 * Generates an error message for when a value is below the minimum limit.
 * @param fieldName - The name of the field being validated
 * @param limit - The minimum allowed value – length or amount
 * @param appendage - Optional singular unit (e.g., "character", "item") to
 * append to the message
 * @returns Formatted error message
 */
export const lowerLimitErrorMessage = (
  fieldName: string,
  limit: number,
  appendage?: string,
) => {
  const base = `${fieldName} should be at least ${limit}`;
  if (!appendage) return base;
  return `${base} ${pluralize(limit, appendage)}`;
};

/**
 * Generates an error message for when a value is above the maximum limit.
 * @param fieldName - The name of the field being validated
 * @param limit - The minimum allowed value – length or amount
 * @param appendage - Optional singular unit (e.g., "character", "item") to
 * append to the message
 * @returns Formatted error message
 */
export const upperLimitErrorMessage = (
  fieldName: string,
  limit: number,
  appendage?: string,
) => {
  const base = `${fieldName} should not be more than ${limit}`;
  if (!appendage) return base;
  return `${base} ${pluralize(limit, appendage)}`;
};

export const noNumberErrorMessage = (fieldName: string) => {
  return `${fieldName} cannot contain numbers`;
};

export const noSpecialCharErrorMessage = (fieldName: string) => {
  return `${fieldName} cannot have special character`;
};

export const invalidEmailErrorMessage = (fieldName: string) => {
  return `${fieldName} must be a valid email`;
};

export const invalidUsernameErrorMessage = (fieldName: string) => {
  return `${fieldName} should contain only letters, numbers and underscores`;
};

export const WEAK_PASSWORD_ERROR_MESSAGE =
  "Weak password. Password must have atleast 8 characters";

export const invalidFieldWhiteSpaceErrorMessage = (fieldName: string) =>
  `${fieldName} should not contain space`;

export const emptyArrayErrorMessage = (fieldName: string) =>
  `${fieldName} should not be empty`;

export const oneOfFieldsIsRequiredErrorMessage = (
  fields: NonEmptyArray<string>,
  type: "onlyOneOf" | "atLeastOneOf" = "atLeastOneOf",
) => {
  const firstItem = fields[0];
  if (fields.length === 1) return requiredErrorMessage(firstItem);

  const lastItem = fields.pop();

  if (!lastItem) return requiredErrorMessage(firstItem);

  const firstWord = type === "atLeastOneOf" ? "At least" : "Only";

  return `${firstWord} one of ${fields.join(", ")} or ${lastItem} is required`;
};

/** Only either IBAN or account number is allowed, not both. */
export const EXCLUSIVE_IBAN_OR_ACCOUNT_NUMBER_ERROR_MESSAGE =
  "Either IBAN or account number needs to be provided, not both.";
export const SEPA_PAYMENT_REQUIRES_IBAN_ERROR_MESSAGE =
  "For SEPA payments, you must provide an IBAN.";
export const SEPA_PAYMENT_REQUIRES_NO_ACCOUNT_NUMBER_ERROR_MESSAGE =
  "For SEPA payments, you must not provide an account number.";
