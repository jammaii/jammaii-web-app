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
import { ProjectColumn } from "./project-column";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectResponse } from "@/features/projects/types/app";

export function ProjectsTable({
  projects,
  offset,
  totalProjects,
}: {
  projects: ProjectResponse[];
  offset: number;
  totalProjects: number;
}) {
  let router = useRouter();
  let itemsPerPage = 5;

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/?offset=${offset}`, { scroll: false });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <CardDescription>
          Manage your projects and view their sales performance.
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
        <form className="flex w-full items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <strong>
              {Math.max(0, Math.min(offset - itemsPerPage, totalProjects) + 1)}-
              {offset}
            </strong>{" "}
            of <strong>{totalProjects}</strong> projects
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === itemsPerPage}
              leftIcon={<ChevronLeft className="mr-2 h-4 w-4" />}
            >
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + itemsPerPage > totalProjects}
              rightIcon={<ChevronRight className="ml-2 h-4 w-4" />}
            >
              Next
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
