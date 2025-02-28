"use client";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectUserColumn } from "./project-user-column";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserResponse } from "@/features/users/types/app";
import { UserSingleProjectResponse } from "@/features/projects/types/app";

interface ProjectUsersTableProps {
  users: UserSingleProjectResponse[];
  page: number;
  totalPages: number;
  onPageChangeAction: (page: number) => void;
}

export function ProjectUsersTable({
  users,
  page,
  totalPages,
  onPageChangeAction,
}: ProjectUsersTableProps) {
  const itemsPerPage = 10;
  const start = (page - 1) * itemsPerPage + 1;
  const end = Math.min(page * itemsPerPage, users.length);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>
          Users that have invested in this project
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
        <div className="flex w-full items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <strong>
              {start}-{end}
            </strong>{" "}
            of <strong>{users.length}</strong> users
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
