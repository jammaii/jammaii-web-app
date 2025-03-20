import { ProjectStatus } from '@/features/projects/types/app';

export const getProjectStatus = (
  startDate: Date,
  endDate: Date
): ProjectStatus => {
  const now = new Date();
  if (now < startDate) {
    return 'CROWDFUNDING';
  }

  if (now >= startDate && now <= endDate) {
    return 'CONSTRUCTION';
  }

  return 'COMPLETED';
};
