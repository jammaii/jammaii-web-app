import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { UserResponseDto } from '@/features/users/types/app';
import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';

interface UserColumnProps {
  user: UserResponseDto;
}

export function UserColumn({ user }: UserColumnProps) {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Avatar>
          <AvatarImage src={user.profilePicture} alt={user.firstName} />
          <AvatarFallback>
            {user.firstName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell className="font-medium">{`${user.firstName} ${user.middleName ?? ''} ${user.lastName}`}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge
          variant={user.status === 'active' ? 'default' : 'secondary'}
          className="capitalize"
        >
          {user.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant="outline" className="capitalize">
          {user.role}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {new Date(user.createdAt).toLocaleDateString()}
      </TableCell>
      <TableCell>
        <Link href={`/users/${user.id}`}>
          <ArrowUpRightIcon className="h-4 w-4" />
        </Link>
      </TableCell>
    </TableRow>
  );
}
