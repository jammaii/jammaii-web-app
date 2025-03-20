import { db } from '@/server/db';
import { TRPCError } from '@trpc/server';
import { projectSchema } from '@/server/db/schemas/project/project.schema';
import type {
  CreateProjectRequestDto,
  CreateUserInvestmentDto,
  ProjectResponse,
  ProjectsResponse,
  UserSingleProjectResponse
} from '@/features/projects/types/app';
import { generateUUID } from '@/lib/ids';
import { and, desc, eq, inArray, like, or, sql } from 'drizzle-orm';
import { PaginationRequest } from '@/features/general/types/app';
import { project, user, userInvestment } from '@/server/db/schema';
import { UserInvestmentsResponse } from '@/features/users/types/app';
import { map } from 'zod';
import { addToDate } from '@/lib/dates';
import { AdminDashboardResponse } from '@/features/admin/types/app';
import { MailService } from './mail.service';
import { getHostName } from '@/server/api/utils/get-host-name';
import { InvestmentConfirmationTemplate } from '@/features/email/templates/investment-confirmation-template';
import writeXlsxFile from 'write-excel-file/node';
import internal from 'stream';
import { userProjectSchema } from '@/features/projects/constants';
import { getProjectStatus } from '../../utils/get-project-status';

export class ProjectService {
  static async createProject(userId: string, data: CreateProjectRequestDto) {
    try {
      const [project] = await db
        .insert(projectSchema)
        .values({
          id: generateUUID(),
          userId,
          ...data.propertyDetails,
          ...data.mediaDetails,
          ...data.investmentDetails,
          status: 'CROWDFUNDING',
          metaCreatedAt: new Date(),
          metaUpdatedAt: new Date()
        })
        .returning();

      if (!project) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create project'
        });
      }

      return project;
    } catch (error) {
      if (error instanceof TRPCError) throw error;

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to create project',
        cause: error
      });
    }
  }

  static async getProjectById(
    id: string,
    isAdmin?: boolean
  ): Promise<ProjectResponse> {
    try {
      const [projectData] = await db
        .select()
        .from(project)
        .where(eq(project.id, id));

      // Get total slots sold for the project
      const [slotsData] = await db
        .select({
          totalSlotsSold:
            sql<number>`COALESCE(SUM(${userInvestment.slots}), 0)`.as(
              'total_slots'
            )
        })
        .from(userInvestment)
        .where(eq(userInvestment.projectId, id));

      if (!projectData || !slotsData) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Project not found'
        });
      }

      const projectDataWithSlotsData = {
        ...projectData,
        totalSlotsSold: Number(slotsData?.totalSlotsSold) || 0
      };

      // Get admin stats if required
      if (isAdmin) {
        const [adminStats] = await db
          .select({
            totalInvestors:
              sql<number>`COUNT(DISTINCT ${userInvestment.userId})`.as(
                'total_investors'
              ),
            totalSlotsSold:
              sql<number>`COALESCE(SUM(${userInvestment.slots}), 0)`.as(
                'total_slots'
              ),
            totalAmountInvested:
              sql<number>`COALESCE(SUM(${userInvestment.slots} * ${project.slotPrice}), 0)`.as(
                'total_amount'
              )
          })
          .from(userInvestment)
          .innerJoin(project, eq(project.id, userInvestment.projectId))
          .where(eq(userInvestment.projectId, id));

        // Get investors for admin details
        const investors = await db
          .select({
            user: {
              id: user.id,
              image: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              middleName: user.middleName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              role: user.role,
              profileCompleted: user.profileCompleted,
              bankDetail: user.bankDetail,
              metaCreatedAt: user.metaCreatedAt
            },
            totalSlots: sql<number>`SUM(${userInvestment.slots})`.as(
              'total_slots'
            ),
            totalAmount:
              sql<number>`SUM(${userInvestment.slots} * ${project.slotPrice})`.as(
                'total_amount'
              )
          })
          .from(userInvestment)
          .innerJoin(user, eq(userInvestment.userId, user.id))
          .innerJoin(project, eq(project.id, userInvestment.projectId))
          .where(eq(userInvestment.projectId, id))
          .groupBy(user.id)
          .orderBy(desc(user.metaCreatedAt))
          .limit(10);

        return {
          ...projectDataWithSlotsData,
          adminDetails: {
            totalInvestors: Number(adminStats?.totalInvestors) || 0,
            totalAmountInvested: Number(adminStats?.totalAmountInvested) || 0,
            investors: {
              users: investors.map((i) => {
                return {
                  ...i,
                  totalSlots: Number(i?.totalSlots) || 0,
                  totalAmount: Number(i?.totalAmount) || 0
                };
              }),
              meta: {
                page: 1,
                limit: 10,
                total: Number(adminStats?.totalInvestors) || 0
              }
            }
          }
        };
      }

      return {
        ...projectDataWithSlotsData,
        images: projectData.images || [],
        videos: projectData.videos || [],
        brochure: projectData.brochure || null
      };
    } catch (error) {
      if (error instanceof TRPCError) throw error;

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch project',
        cause: error
      });
    }
  }

  static async getProjects({
    page = 1,
    limit = 10,
    offset = 0,
    search = ''
  }: PaginationRequest): Promise<ProjectsResponse> {
    try {
      let whereClause = undefined;

      if (search) {
        whereClause = or(
          like(projectSchema.name, `%${search}%`),
          like(projectSchema.description, `%${search}%`)
        );
      }

      const [total, results] = await Promise.all([
        db
          .select({ count: sql<number>`count(*)` })
          .from(projectSchema)
          .where(whereClause)
          .execute()
          .then((res) => Number(res[0].count)),

        db
          .select()
          .from(projectSchema)
          .where(whereClause)
          .orderBy(desc(projectSchema.metaCreatedAt))
          .limit(limit)
          .offset(offset)
      ]);

      return {
        projects: results.map((project) => ({
          ...project,
          totalSlotsSold: 0,
          images: project.images || [],
          videos: project.videos || [],
          brochure: project.brochure || null
        })),
        meta: {
          page,
          limit,
          total
        }
      };
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch projects',
        cause: error
      });
    }
  }

  static async createInvestment(
    userId: string,
    data: CreateUserInvestmentDto
  ): Promise<{ id: string }> {
    try {
      const [investment] = await db
        .insert(userInvestment)
        .values({
          ...data,
          id: generateUUID(),
          userId,
          metaCreatedAt: new Date()
        })
        .returning();

      if (!investment) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create investment'
        });
      }

      const [investmentData] = await db
        .select({
          project: {
            name: project.name,
            id: project.id
          },
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }
        })
        .from(userInvestment)
        .innerJoin(project, eq(userInvestment.projectId, project.id))
        .innerJoin(user, eq(userInvestment.userId, user.id))
        .where(eq(userInvestment.id, investment.id));

      const hostName = await getHostName();
      const investmentstUrl = `${hostName}/user/investments`;

      await MailService.sendEmail({
        to: investmentData.user.email,
        subject: 'Congratulations on your investment!',
        template: InvestmentConfirmationTemplate({
          name: `${investmentData.user.firstName} ${investmentData.user.lastName}`,
          investmentstUrl,
          transactionReference: data.transactionReference,
          totalAmount: data.totalAmount,
          slots: data.slots,
          projectName: investmentData.project.name
        })
      });

      return { id: investment.id };
    } catch (error) {
      if (error instanceof TRPCError) throw error;

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to create investment',
        cause: error
      });
    }
  }

  static async getUserInvestments(
    userId: string,
    { page = 1, limit = 10, offset = 0 }: PaginationRequest
  ): Promise<UserInvestmentsResponse> {
    try {
      const userWithInvestments = await db
        .select({
          userInvestment: userInvestment,
          project: project
        })
        .from(userInvestment)
        .innerJoin(project, eq(userInvestment.projectId, project.id))
        .where(eq(userInvestment.userId, userId));

      const [userRecord] = await db
        .select()
        .from(user)
        .where(eq(user.id, userId));

      if (!userWithInvestments || !userRecord) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found'
        });
      }

      const investments = userWithInvestments.map((item) => {
        const endDate = addToDate(
          item.project.startDate,
          item.project.duration,
          'months'
        );

        return {
          id: item.userInvestment.id,
          slots: item.userInvestment.slots,
          transactionStatus: item.userInvestment.status,
          slotPrice: item.project.slotPrice,
          metaCreatedAt: item.userInvestment.metaCreatedAt,

          project: {
            id: item.project.id,
            name: item.project.name,
            description: item.project.description,
            roi: Number(item.project.roi),
            status: getProjectStatus(item.project.startDate, endDate),
            location: item.project.location,
            startDate: item.project.startDate,
            endDate
          }
        };
      });

      return {
        user: userRecord,
        investments
      };
    } catch (error) {
      if (error instanceof TRPCError) throw error;

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch user investments',
        cause: error
      });
    }
  }

  static async getDashboardStats(): Promise<AdminDashboardResponse> {
    try {
      // Get total investment and project stats
      const [stats] = await db
        .select({
          totalAmountInvested: sql<number>`
            COALESCE(SUM(${userInvestment.slots} * ${project.slotPrice}), 0)
          `.as('total_investment'),
          totalProjects: sql<number>`COUNT(DISTINCT ${project.id})`.as(
            'total_projects'
          ),
          inProgressProjects: sql<number>`
            COUNT(CASE WHEN ${project.status} = 'CONSTRUCTION' THEN 1 END)
          `.as('construction'),
          pendingProjects: sql<number>`
            COUNT(CASE WHEN ${project.status} = 'CROWDFUNDING' THEN 1 END)
          `.as('crowdfunding'),
          completedProjects: sql<number>`
            COUNT(CASE WHEN ${project.status} = 'COMPLETED' THEN 1 END)
          `.as('completed')
        })
        .from(project)
        .leftJoin(userInvestment, eq(userInvestment.projectId, project.id));

      // Get user stats
      const [userStats] = await db
        .select({
          total: sql<number>`COUNT(*)`.as('total_users'),
          active: sql<number>`
            COUNT(CASE WHEN ${user.profileCompleted} = true THEN 1 END)
          `.as('active_users')
        })
        .from(user);

      // Get recent projects
      const recentProjects = await db
        .select()
        .from(project)
        .orderBy(desc(project.metaCreatedAt))
        .limit(5);

      // Get total slots sold for recent projects
      const projectIds = recentProjects.map((p) => p.id);

      const slotsData = await db
        .select({
          projectId: userInvestment.projectId,
          totalSlotsSold:
            sql<number>`COALESCE(SUM(${userInvestment.slots}), 0)`.as(
              'total_slots'
            )
        })
        .from(userInvestment)
        .where(inArray(userInvestment.projectId, projectIds))
        .groupBy(userInvestment.projectId);

      const slotsSoldMap = new Map(
        slotsData.map((item) => [item.projectId, Number(item.totalSlotsSold)])
      );

      return {
        totalAmountInvested: Number(stats?.totalAmountInvested) || 0,
        projects: {
          total: Number(stats?.totalProjects) || 0,
          construction: Number(stats?.inProgressProjects) || 0,
          crowdfunding: Number(stats?.pendingProjects) || 0,
          completed: Number(stats?.completedProjects) || 0
        },
        users: {
          total: Number(userStats?.total) || 0,
          active: Number(userStats?.active) || 0
        },
        recentProjects: recentProjects.map((project) => {
          const endDate = addToDate(
            project.startDate,
            project.duration,
            'months'
          );

          return {
            ...project,
            status: getProjectStatus(project.startDate, endDate),
            totalSlotsSold: slotsSoldMap.get(project.id) || 0,
            images: project.images || [],
            videos: project.videos || [],
            brochure: project.brochure || null
          };
        })
      };
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch dashboard stats',
        cause: error
      });
    }
  }

  static async getProjectUsers(
    projectId: string,
    isAdmin?: boolean
  ): Promise<internal.Readable> {
    // Get investors for project details
    const investors = await db
      .select({
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          middleName: user.middleName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          profileCompleted: user.profileCompleted,
          image: user.image,
          bankDetail: user.bankDetail,
          metaCreatedAt: user.metaCreatedAt
        },
        totalSlots: sql<number>`SUM(${userInvestment.slots})`.as('total_slots'),
        totalAmount:
          sql<number>`SUM(${userInvestment.slots} * ${project.slotPrice})`.as(
            'total_amount'
          )
      })
      .from(userInvestment)
      .innerJoin(user, eq(userInvestment.userId, user.id))
      .innerJoin(project, eq(project.id, userInvestment.projectId))
      .where(eq(userInvestment.projectId, projectId))
      .groupBy(user.id)
      .orderBy(desc(user.metaCreatedAt))
      .limit(10);

    const [projectRecord] = await db
      .select({ id: project.id, roi: project.roi })
      .from(project)
      .where(eq(project.id, projectId));

    const roi = projectRecord.roi;
    const processedInvestors: UserSingleProjectResponse[] = investors.map(
      (investor) => {
        const totalSlots = Number(investor.totalSlots);
        const totalAmount = Number(investor.totalAmount);

        const payoutAmount = (roi / 100) * totalAmount + totalAmount;

        return {
          ...investor,
          payoutAmount,
          totalSlots,
          totalAmount,
          roi
        };
      }
    );

    return await writeXlsxFile(processedInvestors, {
      schema: userProjectSchema
    });
  }
}
