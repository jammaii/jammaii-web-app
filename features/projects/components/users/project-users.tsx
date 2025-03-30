'use client';

import { ProjectUsersTable } from './project-users-table';
import { useState } from 'react';
import { api } from '@/lib/api';
import { LoadingScreen } from '@/components/general/loading-screen';

interface ProjectUsersProps {
  projectId: string;
}

export const ProjectUsers = ({ projectId }: ProjectUsersProps) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);

  const { data, isLoading } = api.project.getProjectUsers.useQuery({
    id: projectId,
    page,
    perPage,
    search
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handlePaginationChange = (page: number, perPage: number) => {
    setPage(page);
    setPerPage(perPage);
  };

  if (isLoading) {
    <LoadingScreen />;
  }

  return (
    <ProjectUsersTable
      users={data?.users || []}
      projectId={projectId}
      meta={data?.meta || { page, perPage, total: 0, totalPages: 0 }}
      onSearchChange={handleSearchChange}
      onPaginationChange={handlePaginationChange}
    />
  );
};
