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
import { UserColumn } from './user-column';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserResponse } from '@/features/users/types/app';
import { PaginationProps } from '@/features/general/types/app';
import { PaginationInput } from '@/components/general/pagination-input';

interface UsersTableProps {
  users: UserResponse[];
  meta: PaginationProps;
  isLoading: boolean;
  isError: boolean;
  onSearchChange: (value: string) => void;
  onPaginationChange: (page: number, perPage: number) => void;
}

export function UsersTable({
  users,
  meta,
  isLoading,
  isError,
  onSearchChange,
  onPaginationChange
}: UsersTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>
          Manage platform users and their assets.
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
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Role</TableHead>
              <TableHead className="hidden md:table-cell">Joined</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <UserColumn key={user.id} user={user} />
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
