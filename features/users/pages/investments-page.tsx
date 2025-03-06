'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { api } from '@/lib/api';
import { AvailableProjects } from '@/features/users/components/available-projects';
import { ProjectStatus } from '@/features/projects/types/app';
import { LoadingSkeleton } from '@/components/general/loading-skeleton';
import { UserInvestments } from '@/features/users/components/user-investments';

export function UserInvestmentsPage() {
  const { data, isLoading } = api.project.getUserInvestments.useQuery({});

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!data) {
    return <div>Oops something went wrong, try again</div>;
  }

  return (
    <div className="space-y-8">
      {/* User's Current Investments */}
      <Card>
        <CardHeader>
          <CardTitle>My Assets</CardTitle>
          <CardDescription>
            Track your current property development assets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserInvestments investments={data.investments} />
        </CardContent>
      </Card>

      {/* Available Projects */}
      <AvailableProjects />
    </div>
  );
}

function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const statusStyles = {
    COMPLETED: 'bg-green-100 text-green-700',
    IN_PROGRESS: 'bg-blue-100 text-blue-700',
    PENDING: 'bg-yellow-100 text-yellow-700'
  };

  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
        statusStyles[status as keyof typeof statusStyles]
      }`}
    >
      {status}
    </span>
  );
}
