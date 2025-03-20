'use client';

import { LoadingScreen } from '@/components/general/loading-screen';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { api } from '@/lib/api';
import {
  CircleDollarSignIcon,
  Users2Icon,
  HomeIcon,
  ActivityIcon,
  ClockIcon,
  CheckCircleIcon
} from 'lucide-react';
import Link from 'next/link';

export function DashboardPage() {
  const { data, isLoading } = api.project.getDashboardStats.useQuery();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!data) {
    return <div>Failed to load dashboard data</div>;
  }

  return (
    <Card>
      <CardContent>
        <div className="space-y-8 py-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">
              Platform Overview; Engagements & Activities.
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Total Investment Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Funding
                </CardTitle>
                <CircleDollarSignIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₦{data.totalAmountInvested.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across all projects
                </p>
              </CardContent>
            </Card>

            {/* Total Projects Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Projects
                </CardTitle>
                <HomeIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.projects.total}</div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{data.projects.construction} construction</span>
                  <span>•</span>
                  <span>{data.projects.crowdfunding} crowdfunding</span>
                  <span>•</span>
                  <span>{data.projects.completed} completed</span>
                </div>
              </CardContent>
            </Card>

            {/* Users Overview Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Users
                </CardTitle>
                <Users2Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.users.total}</div>
                <p className="text-xs text-muted-foreground">
                  {data.users.active} affiliate developers
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Project Status Overview */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">Active</CardTitle>
                <ActivityIcon className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.projects.crowdfunding}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">
                  Crowdfunding
                </CardTitle>
                <ClockIcon className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.projects.crowdfunding}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircleIcon className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.projects.completed}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">
                  Affiliate Developers
                </CardTitle>
                <Users2Icon className="h-4 w-4 text-violet-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.users.active}</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>
                Latest projects added to the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recentProjects.slice(0, 3).map((project) => (
                  <Link
                    key={project.id}
                    href={`/admin/projects/${project.id}`}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{project.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {project.type}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          ₦{project.slotPrice.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          per slot
                        </p>
                      </div>
                      <div>
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                            project.status === 'CONSTRUCTION'
                              ? 'bg-blue-100 text-blue-700'
                              : project.status === 'COMPLETED'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
