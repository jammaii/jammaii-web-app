import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRightIcon } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { ProjectResponse } from '@/features/projects/types/app';
import Link from 'next/link';

export const ProjectColumn = ({ project }: { project: ProjectResponse }) => {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Project image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={project.images[0].fileUploadUrl}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{project.name}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {project.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{project.slots}</TableCell>
      <TableCell className="hidden md:table-cell">
        {`NGN ${project.slotPrice.toLocaleString()}`}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {project.startDate.toLocaleDateString('en-US')}
      </TableCell>
      <TableCell>
        <Link href={`/admin/projects/${project.id}`}>
          <ArrowUpRightIcon />
        </Link>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form action={deleteProduct}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </TableCell>
    </TableRow>
  );
};
