'use client';

import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/dates';
import { useState } from 'react';
import { api } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';
import type { SupportMessageResponse } from '@/features/general/types/app';
import { CheckCircle, XCircle } from 'lucide-react';

interface SupportMessageColumnProps {
  message: SupportMessageResponse;
}

export function SupportMessageColumn({ message }: SupportMessageColumnProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toastSuccess, toastError } = useToast();

  const updateMessageStatus = api.support.updateMessageStatus.useMutation({
    onSuccess: () => {
      toastSuccess({ message: 'Message status updated successfully' });
      setIsOpen(false);
    },
    onError: () => {
      toastError({ message: 'Failed to update message status' });
    }
  });

  const handleResolve = () => {
    updateMessageStatus.mutate({
      id: message.id,
      isResolved: true
    });
  };

  return (
    <>
      <TableRow
        className="cursor-pointer hover:bg-muted/50"
        onClick={() => setIsOpen(true)}
      >
        <TableCell>{message.name}</TableCell>
        <TableCell>{message.email}</TableCell>
        <TableCell className="hidden md:table-cell">
          {message.subject}
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {message.content.slice(0, 50)}...
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Badge variant={message.isResolved ? 'default' : 'secondary'}>
            {message.isResolved ? 'Resolved' : 'Pending'}
          </Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {formatDate(message.metaCreatedAt)}
        </TableCell>
      </TableRow>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{message.subject}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  From
                </p>
                <p className="text-sm">{message.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Email
                </p>
                <p className="text-sm">{message.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Date
                </p>
                <p className="text-sm">{formatDate(message.metaCreatedAt)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Status
                </p>
                <Badge variant={message.isResolved ? 'default' : 'secondary'}>
                  {message.isResolved ? 'Resolved' : 'Pending'}
                </Badge>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Message
              </p>
              <div className="mt-1 rounded-lg bg-muted p-4">
                <p className="whitespace-pre-wrap text-sm">{message.content}</p>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="secondary"
              onClick={() => setIsOpen(false)}
              leftIcon={<XCircle className="mr-2 h-4 w-4" />}
            >
              Close
            </Button>
            {!message.isResolved && (
              <Button
                onClick={handleResolve}
                leftIcon={<CheckCircle className="mr-2 h-4 w-4" />}
                isLoading={updateMessageStatus.isPending}
              >
                Mark as Resolved
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
