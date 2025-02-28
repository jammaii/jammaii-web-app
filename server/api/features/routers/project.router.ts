import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { ProjectService } from "@/server/api/features/services/project.service";
import {
  createProjectSchema,
  createUserInvestmentSchema,
  getSingleProjectSchema,
} from "@/features/projects/types/app";
import { getRequestUserFromSession } from "@/server/api/utils/get-request-user";
import { paginationRequestSchema } from "@/features/general/types/app";

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(createProjectSchema)
    .mutation(async ({ ctx, input }) => {
      const requestUser = getRequestUserFromSession(ctx);
      return ProjectService.createProject(requestUser.id, input);
    }),

  getProjectById: protectedProcedure
    .input(getSingleProjectSchema)
    .query(({ input }) => {
      return ProjectService.getProjectById(input.id, input?.isAdmin);
    }),

  getProjects: protectedProcedure
    .input(paginationRequestSchema)
    .query(({ input }) => {
      return ProjectService.getProjects(input);
    }),

  createInvestment: protectedProcedure
    .input(createUserInvestmentSchema)
    .mutation(async ({ ctx, input }) => {
      const requestUser = getRequestUserFromSession(ctx);
      return ProjectService.createInvestment(requestUser.id, input);
    }),

  getUserInvestments: protectedProcedure
    .input(paginationRequestSchema)
    .query(({ ctx, input }) => {
      const requestUser = getRequestUserFromSession(ctx);
      return ProjectService.getUserInvestments(requestUser.id, input);
    }),

  getDashboardStats: protectedProcedure.query(async () => {
    return ProjectService.getDashboardStats();
  }),
});
