import {
  emailSchema,
  genericStringSchema,
  idSchema,
  numberSchema
} from '@/validation/shared.schema';
import { z } from 'zod';

export const paginationRequestSchema = z.object({
  page: numberSchema('Page', { min: 1 }).optional(),
  limit: numberSchema('Limit', { min: 1, max: 100 }).optional(),
  offset: numberSchema('Offset', { min: 0 }).optional(),
  search: z.string().optional()
});
export type PaginationRequest = z.infer<typeof paginationRequestSchema>;

export interface PaginatedResponse {
  total: number;
  page: number;
  limit: number;
}

export const getByIdSchema = z.object({
  id: idSchema('id')
});

export const getByIdOptionalSchema = z.object({
  id: idSchema('id').optional()
});

export const sendSupportMessage = z.object({
  name: genericStringSchema('Name', 1, 50),
  email: emailSchema('email'),
  subject: genericStringSchema('subject', 1, 100, true, true),
  content: genericStringSchema('content', 1, 2000, true, true)
});
export type SendSupportMessageRequest = z.infer<typeof sendSupportMessage>;

export interface SupportMessageResponse {
  id: string;
  name: string;
  email: string;
  subject: string;
  content: string;
  isResolved: boolean | null;
  metaCreatedAt: Date;
}

export interface SupportMessagesResponse {
  messages: SupportMessageResponse[];
  meta: PaginatedResponse;
}
