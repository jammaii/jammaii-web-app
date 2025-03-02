'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  PhoneIcon,
  MailIcon,
  CalendarIcon,
  BadgeCheckIcon,
  EditIcon
} from 'lucide-react';
import { formatDate } from '@/lib/dates';
import { api } from '@/lib/api';
import { LoadingScreen } from '@/components/general/loading-screen';
import { InvestmentDetailsDialog } from '@/features/users/components/investment-details-dialog';
import Link from 'next/link';

interface SingleUserPageProps {
  id: string;
}

export function SingleUserPage({ id }: SingleUserPageProps) {
  const { data, isLoading } = api.user.getUserWithInvestments.useQuery({ id });

  if (isLoading) return <LoadingScreen fullScreen />;

  if (!data) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p>No users found</p>
      </div>
    );
  }

  const fullName = [
    data.user?.firstName,
    data.user?.middleName,
    data.user?.lastName
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Card>
      <CardContent>
        <div className="space-y-8 py-8">
          {/* User Profile Header */}
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={data.user?.image ?? ''} />
              <AvatarFallback className="text-lg">
                {data.user?.firstName}
                {data.user?.lastName}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{fullName}</h1>
                <Badge
                  variant={
                    data.user.role === 'ADMIN' ||
                    data.user.role === 'SUPER_ADMIN'
                      ? 'default'
                      : 'secondary'
                  }
                >
                  {data.user.role}
                </Badge>
                <Badge
                  variant={
                    data.user.profileCompleted ? 'default' : 'destructive'
                  }
                >
                  {data.user.profileCompleted}
                </Badge>
              </div>
              <div className="flex gap-4 text-sm text-muted-foreground">
                {data.user.email && (
                  <div className="flex items-center gap-1">
                    <MailIcon className="h-4 w-4" />
                    {data.user.email}
                  </div>
                )}
                {data.user.phoneNumber && (
                  <div className="flex items-center gap-1">
                    <PhoneIcon className="h-4 w-4" />
                    {data.user.phoneNumber}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  Joined {formatDate(data.user.metaCreatedAt)}
                </div>
              </div>
            </div>
          </div>

          {/* Edit user link */}
          <div>
            <Link href={`/admin/users/edit/${data.user.id}`}>
              <div className="flex items-center gap-1">
                <EditIcon className="h-4 w-4" />
                Edit user
              </div>
            </Link>
          </div>

          {/* Investment Summary */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Investment
                </CardTitle>
                <BadgeCheckIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₦
                  {data.investments
                    .reduce((acc, p) => acc + p.slots * p.slotPrice, 0)
                    .toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across {data.investments.length} projects
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Slots
                </CardTitle>
                <BadgeCheckIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.investments.reduce((acc, p) => acc + p.slots, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Active investments
                </p>
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
                  {formatDate(data.investments[0]?.metaCreatedAt)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Last transaction date
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Projects Table */}
          <Card>
            <CardHeader>
              <CardTitle>Investment History</CardTitle>
              <CardDescription>
                Overview of all projects invested in by {fullName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Slots</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.investments.map((investment) => (
                    <InvestmentDetailsDialog
                      key={investment.id}
                      investment={investment}
                    >
                      <TableRow>
                        <TableCell className="font-medium">
                          {investment.project.name}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              investment.project.status === 'IN_PROGRESS'
                                ? 'default'
                                : investment.project.status === 'PENDING'
                                  ? 'destructive'
                                  : 'secondary'
                            }
                          >
                            {investment.project.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{investment.slots}</TableCell>
                        <TableCell>
                          ₦
                          {(
                            investment.slots * investment.slotPrice
                          ).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {formatDate(investment.metaCreatedAt)}
                        </TableCell>
                      </TableRow>
                    </InvestmentDetailsDialog>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
