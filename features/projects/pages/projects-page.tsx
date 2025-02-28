'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { File, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectsTable } from '@/features/projects/components/projects-table';
import Link from 'next/link';
import { api } from '@/lib/api';
import { LoadingScreen } from '@/components/general/loading-screen';

export const ProjectsPage = () => {
  const { data, isLoading } = api.project.getProjects.useQuery({});

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
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
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
          offset={10}
          totalProjects={data.projects.length}
        />
      </TabsContent>
    </Tabs>
  );
};
