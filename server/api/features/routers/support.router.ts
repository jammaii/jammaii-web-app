import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from '@/server/api/trpc';
import {
  paginationRequestSchema,
  sendSupportMessage
} from '@/features/general/types/app';
import { getRequestUserFromSession } from '@/server/api/utils/get-request-user';
import { SupportMessageService } from '@/server/api/features/services/support.service';
import { updateSupportMessageSchema } from '@/features/admin/types/app';

export const supportRouter = createTRPCRouter({
  sendMessage: publicProcedure
    .input(sendSupportMessage)
    .mutation(async ({ input }) => {
      return SupportMessageService.sendMessage(input);
    }),

  getMessages: protectedProcedure
    .input(paginationRequestSchema)
    .query(async ({ ctx, input }) => {
      const requestUser = getRequestUserFromSession(ctx);
      return SupportMessageService.getMessages(input);
    }),

  updateMessageStatus: protectedProcedure
    .input(updateSupportMessageSchema)
    .mutation(async ({ input }) => {
      return SupportMessageService.updateMessageStatus(
        input.id,
        input.isResolved
      );
    })
});
