import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { UserResponse } from '@/features/users/types/app';
import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';
import { UserSingleProjectResponse } from '@/features/projects/types/app';

interface ProjectUserColumnProps {
  response: UserSingleProjectResponse;
}

export function ProjectUserColumn({ response }: ProjectUserColumnProps) {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Avatar>
          <AvatarImage
            src={response.user.image ?? ''}
            alt={response.user.firstName ?? ''}
          />
          <AvatarFallback>
            {response.user.firstName?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell className="font-medium">{`${response.user.firstName} ${response.user.middleName ?? ''} ${response.user.lastName}`}</TableCell>
      <TableCell>{response.user.email}</TableCell>
      <TableCell className="hidden md:table-cell">
        {response.totalSlots}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {response.totalAmount}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {new Date(response.user.metaCreatedAt).toLocaleDateString()}
      </TableCell>
      <TableCell>
        <Link href={`/admin/users/${response.user.id}`}>
          <ArrowUpRightIcon className="h-4 w-4" />
        </Link>
      </TableCell>
    </TableRow>
  );
}
