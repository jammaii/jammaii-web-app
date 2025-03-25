import { db } from '@/server/db';
import { TRPCError } from '@trpc/server';
import { and, desc, eq, sql } from 'drizzle-orm';
import { supportMessage } from '@/server/db/schema';
import type {
  SearchAndPaginationType,
  SendSupportMessageRequest,
  SupportMessageResponse,
  SupportMessagesResponse
} from '@/features/general/types/app';
import { generateUUID } from '@/lib/ids';

export class SupportMessageService {
  static async sendMessage(
    data: SendSupportMessageRequest
  ): Promise<SupportMessageResponse> {
    try {
      const [newMessage] = await db
        .insert(supportMessage)
        .values({
          ...data,
          id: generateUUID(),
          metaCreatedAt: new Date()
        })
        .returning();

      return newMessage;
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to send message',
        cause: error
      });
    }
  }

  static async getMessages({
    page = 1,
    perPage = 10,
    search = ''
  }: SearchAndPaginationType): Promise<SupportMessagesResponse> {
    try {
      const [total, messages] = await Promise.all([
        db
          .select({ count: sql<number>`count(*)` })
          .from(supportMessage)
          .then((res) => Number(res[0].count)),

        db
          .select()
          .from(supportMessage)
          .orderBy(desc(supportMessage.metaCreatedAt))
          .limit(perPage)
          .offset((page - 1) * perPage)
      ]);

      return {
        messages,
        meta: {
          page,
          perPage,
          total,
          totalPages: Math.ceil(total / perPage)
        }
      };
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch messages',
        cause: error
      });
    }
  }

  static async updateMessageStatus(id: string, isResolved: boolean) {
    try {
      const [updatedMessage] = await db
        .update(supportMessage)
        .set({ isResolved })
        .where(eq(supportMessage.id, id))
        .returning();

      return updatedMessage;
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to update message status',
        cause: error
      });
    }
  }
}
