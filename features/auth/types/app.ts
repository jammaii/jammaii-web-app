import { isValidPhoneNumber } from '@/features/auth/utils';
import {
  booleanSchema,
  emailSchema,
  genericStringSchema
} from 'validation/shared.schema';
import { z } from 'zod';

export const signinSchema = z.object({
  email: emailSchema('Email')
});
export type SignInRequestDto = z.infer<typeof signinSchema>;

export const bankDetailsSchema = z.object({
  bank: genericStringSchema('Bank name', 3, 50),
  code: genericStringSchema('Bank code', 3, 6),
  accountNumber: genericStringSchema('Account number', 3, 100),
  accountName: genericStringSchema('Account name', 3, 100)
});

export const profileUpdateSchema = z.object({
  firstName: genericStringSchema('First Name', 2, 50, true, true),
  lastName: genericStringSchema('Last Name', 2, 50, true, true),
  middleName: genericStringSchema('Middle Name', 2, 50, true, true).optional(),
  phoneNumber: z.string().refine((value) => {
    return isValidPhoneNumber(value);
  }, 'Invalid phone number'),
  image: genericStringSchema('Image', 2, 50, true, true).optional(),
  isNewUser: booleanSchema('isNewUser').optional(),
  bankDetails: bankDetailsSchema.optional()
});
export type ProfileUpdateRequestDto = z.infer<typeof profileUpdateSchema>;
