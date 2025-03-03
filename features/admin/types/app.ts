import { ProjectResponse } from '@/features/projects/types/app';
import { booleanSchema, idSchema } from '@/validation/shared.schema';
import { z } from 'zod';

export type AdminDashboardResponse = {
  totalAmountInvested: number;
  projects: {
    total: number;
    in_progress: number;
    pending: number;
    completed: number;
  };
  users: {
    total: number;
    active: number;
  };
  recentProjects: ProjectResponse[];
};

export const updateSupportMessageSchema = z.object({
  id: idSchema('id'),
  isResolved: booleanSchema('Is resolved')
});
export type UpdateSupportMessageRequest = z.infer<
  typeof updateSupportMessageSchema
>;
