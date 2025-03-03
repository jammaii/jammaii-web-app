import { PaginatedResponse } from '@/features/general/types/app';
import { ProjectStatus } from '@/features/projects/types/app';
import { USER_ROLES } from '@/server/db/schemas/auth/enums/user-roles';
import { TRANSACTION_STATUSES } from '@/server/db/schemas/project/enums/transaction-status.schema';
import { numberSchema } from '@/validation/shared.schema';
import { z } from 'zod';

export const purchaseFormSchema = z.object({
  slots: numberSchema('Slots', { min: 1, max: 20 })
});
export type PurchaseFormRequest = z.infer<typeof purchaseFormSchema>;

export type UserRole = (typeof USER_ROLES)[number];

export type TransactionStatus = (typeof TRANSACTION_STATUSES)[number];

export interface UserResponse {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  phoneNumber: string | null;
  role: UserRole;
  profileCompleted: boolean;
  image: string | null;
  metaCreatedAt: Date;
}

export interface UsersResponse {
  users: UserResponse[];
  meta: PaginatedResponse;
}

export type UserInvestmentResponse = {
  id: string;
  project: {
    id: string;
    name: string;
    description: string;
    status: ProjectStatus;
    location: string;
    startDate: Date;
    endDate: Date;
  };
  slots: number;
  slotPrice: number;
  transactionStatus: TransactionStatus;
  metaCreatedAt: Date;
};

export type UserInvestmentsResponse = {
  user: UserResponse;
  investments: UserInvestmentResponse[];
};

export type UserDashboardResponse = {
  totalAmountInvested: number;
  totalProjects: number;
  totalActiveProjects: number;
  totalSlots: number;
  latestInvestmentDate: number;
  recentInvestments: UserInvestmentResponse[];
};
