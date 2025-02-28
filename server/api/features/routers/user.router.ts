import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { getRequestUserFromSession } from "@/server/api/utils/get-request-user";
import { UserService } from "@/server/api/features/services/user.service";
import { profileUpdateSchema } from "@/features/auth/types/app";
import {
  getByIdOptionalSchema,
  getByIdSchema,
  paginationRequestSchema,
} from "@/features/general/types/app";

export const userRouter = createTRPCRouter({
  hello: publicProcedure.query(async () => {
    try {
      console.log("Hello world");
      return { hello: "world" };
    } catch (err: unknown) {
      console.log("failed to say hello", err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message:
          err instanceof Error ? err.message : "An unknown error occurred",
        cause: err,
      });
    }
  }),

  getUser: protectedProcedure
    .input(getByIdOptionalSchema)
    .query(async ({ ctx, input }) => {
      const requestUser = getRequestUserFromSession(ctx);
      return UserService.getUserById(input?.id ?? requestUser.id);
    }),

  getUserWithInvestments: protectedProcedure
    .input(getByIdSchema)
    .query(async ({ ctx, input }) => {
      const requestUser = getRequestUserFromSession(ctx);
      return UserService.getUserWithInvestments(input.id);
    }),

  updateUserProfile: protectedProcedure
    .input(profileUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const requestUser = getRequestUserFromSession(ctx);
      return UserService.updateUser(requestUser.id, input);
    }),

  getUsers: protectedProcedure
    .input(paginationRequestSchema)
    .query(({ ctx, input }) => {
      const requestUser = getRequestUserFromSession(ctx);
      return UserService.getUsers(requestUser, input);
    }),

  getDashboard: protectedProcedure.query(async ({ ctx }) => {
    const requestUser = getRequestUserFromSession(ctx);
    return UserService.getUserDashboard(requestUser.id);
  }),
});
