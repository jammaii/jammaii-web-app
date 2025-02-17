import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  CircleDollarSignIcon,
  TrendingUpIcon,
  LayoutGridIcon,
  CalendarIcon,
  ChevronRightIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserProjectsResponseDto } from '@/features/users/types/app';

interface UserDashboardPageProps {
  userProjects: UserProjectsResponseDto;
}

export function UserDashboardPage({ userProjects }: UserDashboardPageProps) {
  // Calculate user statistics
  const totalInvested = userProjects.project.reduce(
    (acc, project) => acc + project.slots * project.slotPrice,
    0
  );

  const activeProjects = userProjects.project.filter(
    (p) => p.status === 'Approved'
  ).length;

  const totalSlots = userProjects.project.reduce(
    (acc, project) => acc + project.slots,
    0
  );

  return (
    <Card>
      <CardContent>
        <div className="container mx-auto space-y-8 py-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Welcome back, {userProjects.user.firstName}!
            </h2>
            <p className="text-muted-foreground">
              Here's an overview of your investment portfolio
            </p>
          </div>

          {/* Investment Overview */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Invested
                </CardTitle>
                <CircleDollarSignIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₦{totalInvested.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across {userProjects.project.length} projects
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Projects
                </CardTitle>
                <LayoutGridIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeProjects}</div>
                <p className="text-xs text-muted-foreground">
                  Currently active investments
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Slots
                </CardTitle>
                <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalSlots}</div>
                <p className="text-xs text-muted-foreground">Slots purchased</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Latest Investment
                </CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Date(
                    userProjects.project[0]?.boughtAt ?? ''
                  ).toLocaleDateString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Last transaction date
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Your Investments */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Your Investments</CardTitle>
                  <CardDescription>
                    Overview of your real estate investments
                  </CardDescription>
                </div>
                <Link href="/projects">
                  <Button variant="ghost" className="gap-2">
                    View All
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userProjects.project.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{project.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {project.slots} slots purchased
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          ₦
                          {(project.slots * project.slotPrice).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Total investment
                        </p>
                      </div>
                      <div>
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                            project.status === 'Approved'
                              ? 'bg-green-100 text-green-700'
                              : project.status === 'Rejected'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
