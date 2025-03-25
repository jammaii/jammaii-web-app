'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectsTable } from '@/features/projects/components/projects-table';
import Link from 'next/link';
import { api } from '@/lib/api';
import { LoadingScreen } from '@/components/general/loading-screen';
import { useState } from 'react';

export const ProjectsPage = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { data, isLoading, isError } = api.project.getProjects.useQuery({
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
    return <LoadingScreen fullScreen />;
  }

  if (!data) {
    return <div>Oops something went wrong, try again</div>;
  }

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          {/* <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger> */}
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/admin/projects/create">
            <Button
              size="sm"
              className="h-8 gap-1"
              leftIcon={<PlusCircle className="h-3.5 w-3.5" />}
            >
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Project
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <TabsContent value="all">
        <ProjectsTable
          projects={data.projects}
          meta={data?.meta || { page: 1, perPage: 10, total: 0, totalPages: 0 }}
          isLoading={isLoading}
          isError={isError}
          onSearchChange={handleSearchChange}
          onPaginationChange={handlePaginationChange}
        />
      </TabsContent>
    </Tabs>
  );
};
