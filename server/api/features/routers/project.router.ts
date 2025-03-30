import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';
import { ProjectService } from '@/server/api/features/services/project.service';
import {
  createProjectSchema,
  createUserInvestmentSchema,
  getSingleProjectSchema,
  updateProjectSchema
} from '@/features/projects/types/app';
import { getRequestUserFromSession } from '@/server/api/utils/get-request-user';
import { searchAndPaginationSchema } from '@/features/general/types/app';

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
    .input(searchAndPaginationSchema)
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
    .input(searchAndPaginationSchema)
    .query(({ ctx, input }) => {
      const requestUser = getRequestUserFromSession(ctx);
      return ProjectService.getUserInvestments(requestUser.id, input);
    }),

  getDashboardStats: protectedProcedure.query(async () => {
    return ProjectService.getDashboardStats();
  }),

  getProjectUsers: protectedProcedure
    .input(getSingleProjectSchema)
    .query(async ({ input }) => {
      return ProjectService.getProjectUsers(input);
    }),

  downloadProjectUsers: protectedProcedure
    .input(getSingleProjectSchema)
    .mutation(async ({ input }) => {
      return ProjectService.downloadProjectUsers(input.id, input?.isAdmin);
    }),

  updateProject: protectedProcedure
    .input(updateProjectSchema)
    .mutation(async ({ input }) => {
      return ProjectService.updateProject(input);
    })
});
