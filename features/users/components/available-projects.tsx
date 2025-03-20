'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { api } from '@/lib/api';
import { CircleDollarSign } from 'lucide-react';
import { formatCurrency, truncateText } from '@/lib/utils';
import { LoadingSkeleton } from '@/components/general/loading-skeleton';
import Link from 'next/link';
import Image from 'next/image';

export function AvailableProjects() {
  const { data, isLoading } = api.project.getProjects.useQuery({});

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!data) {
    return <div>Oops something went wrong, try again</div>;
  }

  return (
    <div className="space-y-8">
      {/* Available Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Available Projects</CardTitle>
          <CardDescription>
            Explore new crowdfunding opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data.projects?.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              No projects available for crowdfunding at the moment.
            </div>
          ) : (
            <div className="space-y-4">
              {data.projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/user/project/${project.id}`}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{project.name}</p>
                    <Image
                      src={
                        project.images[0].fileUploadUrl ?? '/jammaii-logo.png'
                      }
                      height={200}
                      width={250}
                      alt="Avatar"
                    />
                    <p className="text-sm text-muted-foreground">
                      {truncateText(project.description, 100)}
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <CircleDollarSign className="h-4 w-4" />
                      <span>₦{formatCurrency(project.slotPrice)} per slot</span>
                    </div>
                  </div>
                  {/* <div>
                    <Button asChild>
                      <a href={`/user/project/${project.id}`}>View Details</a>
                    </Button>
                  </div> */}
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
