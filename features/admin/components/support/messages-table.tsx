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
import { SupportMessageResponse } from '@/features/general/types/app';
import { SupportMessageColumn } from './message-column';

interface SupportMessagesTableProps {
  messages: SupportMessageResponse[];
  page: number;
  totalPages: number;
  onPageChangeAction: (page: number) => void;
}

export function SupportMessagesTable({
  messages,
  page,
  totalPages,
  onPageChangeAction
}: SupportMessagesTableProps) {
  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage + 1;
  const end = Math.min(page * itemsPerPage, messages.length);

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
        <div className="flex w-full items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {start}-{end}
            </strong>{' '}
            of <strong>{messages.length}</strong> messages
          </div>
          <div className="flex">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPageChangeAction(page - 1)}
              disabled={page === 1}
              leftIcon={<ChevronLeft className="mr-2 h-4 w-4" />}
            >
              Prev
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPageChangeAction(page + 1)}
              disabled={page >= totalPages}
              rightIcon={<ChevronRight className="ml-2 h-4 w-4" />}
            >
              Next
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
