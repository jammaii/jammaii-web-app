'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { ProjectColumn } from './project-column';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectResponse } from '@/features/projects/types/app';
import { PaginationInput } from '@/components/general/pagination-input';
import { PaginationProps } from '@/features/general/types/app';
import { LoadingSkeleton } from '@/components/general/loading-skeleton';

interface ProjectsTableProps {
  projects: ProjectResponse[];
  meta: PaginationProps;
  isLoading: boolean;
  isError: boolean;
  onSearchChange: (value: string) => void;
  onPaginationChange: (page: number, perPage: number) => void;
}

export function ProjectsTable({
  projects,
  meta,
  isLoading,
  isError,
  onSearchChange,
  onPaginationChange
}: ProjectsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <CardDescription>
          Create, manage & monitor projects and their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Slots</TableHead>
              <TableHead className="hidden md:table-cell">Slot price</TableHead>
              <TableHead className="hidden md:table-cell">Start date</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <ProjectColumn key={project.id} project={project} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <PaginationInput meta={meta} onPaginationChange={onPaginationChange} />
      </CardFooter>
    </Card>
  );
}
