'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ProjectUsersTable } from './project-users-table';
import { AdminProjectDetails } from '../../types/app';
import { useState } from 'react';

interface ProjectUsersProps {
  details: Pick<AdminProjectDetails, 'investors'>;
  projectId: string;
}

export const ProjectUsers = ({ details, projectId }: ProjectUsersProps) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  return (
    <ProjectUsersTable
      users={details.investors.users}
      totalPages={Math.ceil((details?.investors.meta.total || 0) / 10)}
      projectId={projectId}
      page={page}
      onPageChangeAction={setPage}
    />
  );
};
