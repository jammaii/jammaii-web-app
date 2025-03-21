import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { AdminProjectDetails } from '@/features/projects/types/app';
import { formatCurrency } from '@/lib/utils';
import { CircleDollarSignIcon, HomeIcon, Users2Icon } from 'lucide-react';
import { UpdateProjectDialog } from './update-project-dialog';

interface AdminProjectHeaderProps {
  name: string;
  totalSlots: number;
  totalSlotsSold: number;
  overview: AdminProjectDetails;
  projectId: string;
  startDate: Date;
}

export const AdminProjectHeader = ({
  name,
  totalSlots,
  totalSlotsSold,
  overview,
  projectId,
  startDate
}: AdminProjectHeaderProps) => {
  return (
    <Card>
      <CardContent>
        <div className="space-y-8 py-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{name}</h2>
            <p className="text-muted-foreground">Project Overview</p>
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
                  {formatCurrency(overview.totalAmountInvested)}
                </div>
                {/* <p className="text-xs text-muted-foreground">
                  Across all projects
                </p> */}
              </CardContent>
            </Card>

            {/* Total Projects Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Slots Sold
                </CardTitle>
                <HomeIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalSlotsSold}</div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>•</span>
                  <span>{totalSlots} total slots</span>
                </div>
              </CardContent>
            </Card>

            {/* Users Overview Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Affiliate Developers
                </CardTitle>
                <Users2Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {overview.totalInvestors}
                </div>
                {/* <p className="text-xs text-muted-foreground">
                  {20} active users
                </p> */}
              </CardContent>
            </Card>

            <UpdateProjectDialog projectId={projectId} startDate={startDate} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
