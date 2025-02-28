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
import { LoadingSkeleton } from '@/components/general/loading-skeleton';
import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { formatDate } from '@/lib/dates';
import { UserInvestments } from '@/features/users/components/user-investments';
import { useUser } from '@/hooks/use-user';

export function UserDashboardPage() {
  const { data, isLoading } = api.user.getDashboard.useQuery();
  const { user } = useUser();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!data || !user) {
    return <div>Oops something went wrong, try again</div>;
  }

  return (
    <Card>
      <CardContent>
        <div className="container mx-auto space-y-8 py-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Hello, {user.firstName}!
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
                  ₦{formatCurrency(data.totalAmountInvested)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across {data.totalProjects} projects
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
                <div className="text-2xl font-bold">
                  {data.totalActiveProjects}
                </div>
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
                <div className="text-2xl font-bold">{data.totalSlots}</div>
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
                  {formatDate(data.latestInvestmentDate)}
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
                <Link href="/user/investments">
                  <Button
                    variant="ghost"
                    className="gap-2"
                    rightIcon={<ChevronRightIcon className="h-4 w-4" />}
                  >
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <UserInvestments investments={data.recentInvestments} />
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
