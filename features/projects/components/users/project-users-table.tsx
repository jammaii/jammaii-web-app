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
import { ProjectUserColumn } from './project-user-column';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserSingleProjectResponse } from '@/features/projects/types/app';
import { downloadExcelFile } from '@/features/projects/utils';
import { useState } from 'react';
import { PaginationProps } from '@/features/general/types/app';
import { PaginationInput } from '@/components/general/pagination-input';

interface ProjectUsersTableProps {
  users: UserSingleProjectResponse[];
  projectId: string;
  meta: PaginationProps;
  onSearchChange: (value: string) => void;
  onPaginationChange: (page: number, perPage: number) => void;
}

export function ProjectUsersTable({
  users,
  projectId,
  meta,
  onSearchChange,
  onPaginationChange
}: ProjectUsersTableProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    await downloadExcelFile(projectId);
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Affiliate Developers</CardTitle>
        <CardDescription className="flex justify-between">
          <div>Funders of this project</div>
          <Button
            size="sm"
            variant="outline"
            className="h-8 gap-1"
            leftIcon={<Upload className="h-3.5 w-3.5" />}
            isLoading={isLoading}
            onClick={handleDownload}
          >
            <span className="sr-only sm:not-sr-only">Export</span>
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Avatar</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">
                Total Slots
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Total Amount
              </TableHead>
              <TableHead className="hidden md:table-cell">Joined</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <ProjectUserColumn key={user.user.id} response={user} />
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
