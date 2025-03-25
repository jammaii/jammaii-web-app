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
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  PaginationProps,
  SupportMessageResponse
} from '@/features/general/types/app';
import { SupportMessageColumn } from './message-column';
import { PaginationInput } from '@/components/general/pagination-input';
interface SupportMessagesTableProps {
  messages: SupportMessageResponse[];
  meta: PaginationProps;
  isLoading: boolean;
  isError: boolean;
  onSearchChange: (value: string) => void;
  onPaginationChange: (page: number, perPage: number) => void;
}

export function SupportMessagesTable({
  messages,
  meta,
  isLoading,
  isError,
  onSearchChange,
  onPaginationChange
}: SupportMessagesTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>
          Manage platform users and their complaints.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">Subject</TableHead>
              <TableHead className="hidden md:table-cell">Content</TableHead>
              <TableHead className="hidden md:table-cell">Resolved</TableHead>
              <TableHead className="hidden md:table-cell">
                Date Created
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <SupportMessageColumn key={message.id} message={message} />
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
