import { db } from '@/server/db';
import { userSchema } from '@/server/db/schemas/auth/user.schema';
import { and, desc, eq, like, or, sql } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import {
  UserDashboardResponse,
  UserInvestmentsResponse,
  UserResponse,
  UsersResponse
} from '@/features/users/types/app';
import { ProfileUpdateRequestDto } from '@/features/auth/types/app';
import { project, user, userInvestment } from '@/server/db/schema';
import { PaginationRequest } from '@/features/general/types/app';
import { ApiRequestUser } from '@/server/api/types';
import { addToDate } from '@/lib/dates';
import { MailService } from './mail.service';
import { WelcomeEmailTemplate } from '@/features/email/templates/welcome-template';
import { getHostName } from '@/server/api/utils/get-host-name';

export class UserService {
  static async getUserById(id: string): Promise<UserResponse> {
    try {
      const [userRecord] = await db.select().from(user).where(eq(user.id, id));

      if (!userRecord) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found'
        });
      }

      return userRecord;
    } catch (error) {
      if (error instanceof TRPCError) throw error;

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch user',
        cause: error
      });
    }
  }

  static async updateUser(
    id: string,
    data: ProfileUpdateRequestDto
  ): Promise<UserResponse> {
    try {
      const [updatedUser] = await db
        .update(user)
        .set({
          ...data,
          profileCompleted: true,
          metaUpdatedAt: new Date()
        })
        .where(eq(userSchema.id, id))
        .returning();

      if (!updatedUser) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found'
        });
      }

      if (data.isNewUser) {
        const hostName = await getHostName();
        const userType = updatedUser.role === 'USER' ? 'user' : 'admin';
        const dashboardUrl = `${hostName}/${userType}`;

        await MailService.sendEmail({
          to: updatedUser.email,
          subject: 'Welcome to JAMMAII',
          template: WelcomeEmailTemplate({
            name: `${updatedUser.firstName} ${updatedUser.lastName}`,
            dashboardUrl
          })
        });
      }

      return updatedUser;
    } catch (error) {
      if (error instanceof TRPCError) throw error;

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to update user',
        cause: error
      });
    }
  }

  static async getUserWithInvestments(
    userId: string
  ): Promise<UserInvestmentsResponse> {
    try {
      const [userRecord] = await db
        .select()
        .from(user)
        .where(eq(user.id, userId));

      if (!userRecord) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found'
        });
      }

      const investments = await db
        .select({
          investment: userInvestment,
          projectDetails: project
        })
        .from(userInvestment)
        .innerJoin(project, eq(userInvestment.projectId, project.id))
        .where(eq(userInvestment.userId, userId))
        .orderBy(desc(userInvestment.metaCreatedAt));

      const mappedInvestments = investments.map((item) => ({
        id: item.investment.id,
        slots: item.investment.slots,
        slotPrice: item.projectDetails.slotPrice,
        transactionStatus: item.investment.status,
        metaCreatedAt: item.investment.metaCreatedAt,
        project: {
          id: item.projectDetails.id,
          name: item.projectDetails.name,
          description: item.projectDetails.description,
          status: item.projectDetails.status,
          location: item.projectDetails.location,
          startDate: item.projectDetails.startDate,
          endDate: addToDate(
            item.projectDetails.startDate,
            item.projectDetails.duration,
            'months'
          )
        }
      }));

      return {
        user: userRecord,
        investments: mappedInvestments
      };
    } catch (error) {
      if (error instanceof TRPCError) throw error;

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch user with investments',
        cause: error
      });
    }
  }

  static async getUsers(
    requestUser: ApiRequestUser,
    { page = 1, limit = 10, offset = 0, search = '' }: PaginationRequest
  ): Promise<UsersResponse> {
    try {
      let whereClause = undefined;

      if (search) {
        whereClause = or(
          like(user.firstName, `%${search}%`),
          like(user.lastName, `%${search}%`)
        );
      }

      const [total, results] = await Promise.all([
        db
          .select({ count: sql<number>`count(*)` })
          .from(user)
          .where(whereClause)
          .execute()
          .then((res) => Number(res[0].count)),

        db
          .select()
          .from(user)
          .where(whereClause)
          .orderBy(desc(user.id))
          .limit(limit)
          .offset(offset)
      ]);

      return {
        users: results,
        meta: {
          page,
          limit,
          total
        }
      };
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch users',
        cause: error
      });
    }
  }

  static async getUserDashboard(
    userId: string
  ): Promise<UserDashboardResponse> {
    try {
      const investments = await db
        .select({
          userInvestment: userInvestment,
          project: project,
          userRecord: user
        })
        .from(userInvestment)
        .innerJoin(project, eq(userInvestment.projectId, project.id))
        .innerJoin(user, eq(user.id, userInvestment.userId))
        .where(eq(userInvestment.userId, userId))
        .orderBy(desc(userInvestment.metaCreatedAt));

      if (!investments.length) {
        return {
          totalAmountInvested: 0,
          totalProjects: 0,
          totalActiveProjects: 0,
          totalSlots: 0,
          latestInvestmentDate: 0,
          recentInvestments: []
        };
      }

      const mappedInvestments = investments.map((item) => ({
        id: item.userInvestment.id,
        slots: item.userInvestment.slots,
        transactionStatus: item.userInvestment.status,
        slotPrice: item.project.slotPrice,
        metaCreatedAt: item.userInvestment.metaCreatedAt,
        project: {
          id: item.project.id,
          name: item.project.name,
          description: item.project.description,
          status: item.project.status,
          location: item.project.location,
          startDate: item.project.startDate,
          endDate: addToDate(
            item.project.startDate,
            item.project.duration,
            'months'
          )
        }
      }));

      return {
        totalAmountInvested: investments.reduce(
          (total, inv) =>
            total + inv.userInvestment.slots * inv.project.slotPrice,
          0
        ),
        totalActiveProjects: investments.filter(
          (inv) => inv.project.status === 'IN_PROGRESS'
        ).length,
        totalProjects: investments.length,
        totalSlots: investments.reduce(
          (total, inv) => total + inv.userInvestment.slots,
          0
        ),
        latestInvestmentDate:
          investments[0]?.userInvestment.metaCreatedAt.getTime() || 0,
        recentInvestments: mappedInvestments.slice(0, 5)
      };
    } catch (error) {
      if (error instanceof TRPCError) throw error;

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch user dashboard',
        cause: error
      });
    }
  }
}
