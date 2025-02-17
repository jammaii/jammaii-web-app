import { UserProjectsResponseDto } from '../types/app';
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
  BadgeCheckIcon
} from 'lucide-react';
import { formatDate } from '@/lib/dates';

interface SingleUserPageProps {
  userData: UserProjectsResponseDto;
}

export function SingleUserPage({ userData }: SingleUserPageProps) {
  const { user, project: projects } = userData;
  const fullName = [user.firstName, user.middleName, user.lastName]
    .filter(Boolean)
    .join(' ');

  return (
    <Card>
      <CardContent>
        <div className="container mx-auto space-y-8 py-8">
          {/* User Profile Header */}
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.profilePicture} />
              <AvatarFallback className="text-lg">
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{fullName}</h1>
                <Badge
                  variant={user.role === 'admin' ? 'default' : 'secondary'}
                >
                  {user.role}
                </Badge>
                <Badge
                  variant={user.status === 'active' ? 'default' : 'destructive'}
                >
                  {user.status}
                </Badge>
              </div>
              <div className="flex gap-4 text-sm text-muted-foreground">
                {user.email && (
                  <div className="flex items-center gap-1">
                    <MailIcon className="h-4 w-4" />
                    {user.email}
                  </div>
                )}
                {user.phoneNumber && (
                  <div className="flex items-center gap-1">
                    <PhoneIcon className="h-4 w-4" />
                    {user.phoneNumber}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  Joined {formatDate(user.createdAt)}
                </div>
              </div>
            </div>
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
                  {projects
                    .reduce((acc, p) => acc + p.slots * p.slotPrice, 0)
                    .toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across {projects.length} projects
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
                  {projects.reduce((acc, p) => acc + p.slots, 0)}
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
                  {formatDate(projects[0]?.boughtAt)}
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
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">
                        {project.name}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            project.status === 'Approved'
                              ? 'default'
                              : project.status === 'Rejected'
                                ? 'destructive'
                                : 'secondary'
                          }
                        >
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{project.slots}</TableCell>
                      <TableCell>
                        ₦{(project.slots * project.slotPrice).toLocaleString()}
                      </TableCell>
                      <TableCell>{formatDate(project.boughtAt)}</TableCell>
                    </TableRow>
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
