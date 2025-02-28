import { z } from "zod";
import {
  invalidFieldWhiteSpaceErrorMessage,
  WEAK_PASSWORD_ERROR_MESSAGE,
  invalidEmailErrorMessage,
  invalidErrorMessage,
  invalidUsernameErrorMessage,
  lowerLimitErrorMessage,
  noNumberErrorMessage,
  noSpecialCharErrorMessage,
  requiredErrorMessage,
  upperLimitErrorMessage,
} from "./error-message";
import type { NonEmptyArray } from "../types";
import type { FileType } from "@/features/file-upload/types";
import { MAX_FILE_SIZE_IN_BYTES } from "@/constants/files";
import type { File } from "buffer";
import {
  S_C_SPACE_PERIOD_COMMA_REGEX,
  NUMBER_REGEX,
  PASSWORD_REGEX,
  SPECIAL_CHARACTER_REGEX,
  USERNAME_REGEX,
  WHITESPACE_REGEX,
} from "@/constants/regex";

/**
 * @description Schema function for validating a string field.
 * @param fieldName - Name of field. In human readable format. This is shown on the frontend.
 * @param lowerLimit - What is the least character length the string should contain? This defaults to 2.
 * @param upperLimit - Maximum character length the string should contain. This defaults to 200.
 * @param allowPeriodAndComma - Should periods and commas be allowed in the string? Defaults to false.
 * @param includeSpecialChar - Should special characters (all) be allowed in the string? Defaults to false.
 * @param disallowNumbers - Should numbers be disallowed in the string? Defaults to false.
 */
export const genericStringSchema = (
  fieldName: string,
  lowerLimit?: number,
  upperLimit?: number,
  allowPeriodAndComma?: boolean,
  includeSpecialChar?: boolean,
  disallowNumbers?: boolean,
) =>
  z
    .string({
      required_error: requiredErrorMessage(fieldName),
      invalid_type_error: invalidErrorMessage(fieldName),
    })
    .trim()
    .max(upperLimit || 200, {
      message: upperLimitErrorMessage(
        fieldName,
        upperLimit || 200,
        "character",
      ),
    })
    // Used "??" for nullish check to allow 0 as a value.
    .min(lowerLimit ?? 2, {
      message: lowerLimitErrorMessage(fieldName, lowerLimit || 2, "character"),
    })
    .refine(
      (arg) => {
        if (includeSpecialChar) return true;

        return !arg.match(
          allowPeriodAndComma
            ? S_C_SPACE_PERIOD_COMMA_REGEX
            : SPECIAL_CHARACTER_REGEX,
        );
      },
      { message: noSpecialCharErrorMessage(fieldName) },
    )
    .refine(
      (arg) => {
        return disallowNumbers ? !arg.match(NUMBER_REGEX) : true;
      },
      { message: noNumberErrorMessage(fieldName) },
    );

export const dateSchema = (fieldName: string) =>
  z.preprocess(
    (arg) => {
      if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
    },
    z.date({
      required_error: requiredErrorMessage(fieldName),
      invalid_type_error: invalidErrorMessage(fieldName),
    }),
  );

export const durationSchema = z.object({
  validFrom: dateSchema("validFrom"),
  validTo: dateSchema("validTo").optional(),
});

export const idSchema = (fieldName: string) =>
  z
    .string({
      required_error: requiredErrorMessage(fieldName),
      invalid_type_error: invalidErrorMessage(fieldName),
    })
    .uuid(invalidErrorMessage(fieldName));

export const cuidSchema = (fieldName: string) =>
  z
    .string({
      required_error: requiredErrorMessage(fieldName),
      invalid_type_error: invalidErrorMessage(fieldName),
    })
    .cuid2(invalidErrorMessage(fieldName));

export const stringNumberSchema = (fieldName: string) =>
  z
    .string({
      required_error: requiredErrorMessage(fieldName),
      invalid_type_error: invalidErrorMessage(fieldName),
    })
    .refine(
      (arg) => {
        if (!Number(arg)) return false;
        return true;
      },
      { message: invalidErrorMessage(fieldName) },
    );

export const numberSchema = (
  fieldName: string,
  options: {
    min?: number;
    max?: number;
  } = {},
) => {
  let schema = z.coerce.number({
    required_error: requiredErrorMessage(fieldName),
    invalid_type_error: invalidErrorMessage(fieldName),
  });

  if (typeof options.max === "number") {
    schema = schema.max(options.max, {
      message: upperLimitErrorMessage(fieldName, options.max),
    });
  }

  if (typeof options.min === "number") {
    schema = schema.min(options.min, {
      message: lowerLimitErrorMessage(fieldName, options.min),
    });
  }

  schema.refine((arg) => !!Number(arg), {
    message: invalidErrorMessage(fieldName),
  });

  return schema;
};

export const dateSearchSchema = z.object({
  searchFrom: dateSchema("searchFrom"),
  searchTo: dateSchema("searchTo"),
});

export const emailSchema = (fieldName: string) =>
  z
    .string({
      required_error: requiredErrorMessage(fieldName),
      invalid_type_error: invalidErrorMessage(fieldName),
    })
    .email(invalidEmailErrorMessage(fieldName));

export const passwordSchema = (fieldName: string) =>
  z
    .string({
      required_error: requiredErrorMessage(fieldName),
      invalid_type_error: invalidErrorMessage(fieldName),
    })
    .trim()
    .refine((password) => !password.match(WHITESPACE_REGEX), {
      message: invalidFieldWhiteSpaceErrorMessage(fieldName),
    })
    .refine((password) => Boolean(password.match(PASSWORD_REGEX)), {
      message: WEAK_PASSWORD_ERROR_MESSAGE,
    });

export const usernameSchema = (fieldName: string) => {
  const LOWERLIMIT = 3;
  const UPPERLIMIT = 16;

  return z
    .string({
      required_error: requiredErrorMessage(fieldName),
      invalid_type_error: invalidErrorMessage(fieldName),
    })
    .trim()
    .max(UPPERLIMIT, {
      message: upperLimitErrorMessage(fieldName, UPPERLIMIT),
    })
    .min(LOWERLIMIT, {
      message: lowerLimitErrorMessage(fieldName, LOWERLIMIT),
    })
    .refine(
      (arg) => {
        return !arg.match(USERNAME_REGEX);
      },
      {
        message: invalidUsernameErrorMessage(fieldName),
      },
    )
    .refine((arg) => !arg.match(WHITESPACE_REGEX), {
      message: invalidFieldWhiteSpaceErrorMessage(fieldName),
    });
};

export const urlSchema = (fieldName: string) =>
  genericStringSchema(fieldName, 5, undefined, undefined, true);

/**
 * A common error with using instanceof to check for a file type with zod, this a fallback that ensures the type is file.
 * https://github.com/colinhacks/zod/issues/387#issuecomment-1191390673
 *
 */
export const fileSchema = (
  fieldName: string,
  formats: NonEmptyArray<FileType>,
  maxSizeInBytes?: number,
) => {
  const fileSizeLimit = maxSizeInBytes || MAX_FILE_SIZE_IN_BYTES;

  return z
    .custom<File>()
    .refine((file) => !!file, requiredErrorMessage(fieldName))
    .refine(
      (file) => !file || !(file.size > fileSizeLimit),
      "File size exceeded",
    );
};

export const booleanSchema = (fieldName: string) =>
  z.boolean({
    required_error: requiredErrorMessage(fieldName),
    invalid_type_error: invalidErrorMessage(fieldName),
  });
