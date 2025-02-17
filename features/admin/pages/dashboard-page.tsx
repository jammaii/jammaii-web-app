import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { defaultProject, defaultUsers } from '@/constants/mock';
import {
  CircleDollarSignIcon,
  Users2Icon,
  HomeIcon,
  ActivityIcon,
  ClockIcon,
  CheckCircleIcon
} from 'lucide-react';

export function DashboardPage() {
  // Calculate statistics
  const totalProjects = defaultProject.length;
  const activeProjects = defaultProject.filter(
    (p) => p.status === 'Active'
  ).length;
  const pendingProjects = defaultProject.filter(
    (p) => p.status === 'Pending'
  ).length;
  const completedProjects = defaultProject.filter(
    (p) => p.status === 'Completed'
  ).length;

  const totalInvestment = defaultProject.reduce(
    (acc, project) =>
      acc +
      project.investmentDetails.slots * project.investmentDetails.slotPrice,
    0
  );

  const totalUsers = defaultUsers.length;
  const activeUsers = defaultUsers.filter((u) => u.status === 'active').length;

  return (
    <Card>
      <CardContent>
        <div className="container mx-auto space-y-8 py-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">
              Your real estate investment platform overview.
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Total Investment Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Investment
                </CardTitle>
                <CircleDollarSignIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₦{totalInvestment.toLocaleString()}
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
                <div className="text-2xl font-bold">{totalProjects}</div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{activeProjects} active</span>
                  <span>•</span>
                  <span>{pendingProjects} pending</span>
                  <span>•</span>
                  <span>{completedProjects} completed</span>
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
                <div className="text-2xl font-bold">{totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  {activeUsers} active users
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
                <div className="text-2xl font-bold">{activeProjects}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <ClockIcon className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingProjects}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircleIcon className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedProjects}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">
                  Active Users
                </CardTitle>
                <Users2Icon className="h-4 w-4 text-violet-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeUsers}</div>
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
                {defaultProject.slice(0, 3).map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">
                        {project.propertyDetails.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {project.propertyDetails.type}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          ₦
                          {project.investmentDetails.slotPrice.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          per slot
                        </p>
                      </div>
                      <div>
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                            project.status === 'Active'
                              ? 'bg-blue-100 text-blue-700'
                              : project.status === 'Completed'
                                ? 'bg-green-100 text-green-700'
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
