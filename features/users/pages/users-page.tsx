import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, PlusCircle, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UsersTable } from '@/features/users/components/users-table';
import Link from 'next/link';
import { defaultUsers } from '@/constants/mock';

interface UsersPageProps {
  searchParams: Promise<{ q: string; offset: string }>;
}

export const UsersPage = async ({ searchParams }: UsersPageProps) => {
  const params = await searchParams;
  const search = params.q ?? '';
  const offset = params.offset ?? 0;

  return (
    <Tabs defaultValue="all" className="space-y-4">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <Upload className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Import</span>
          </Button>
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <Download className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Export</span>
          </Button>
          <Link href="/users/invite">
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Invite User</span>
            </Button>
          </Link>
        </div>
      </div>

      <TabsContent value="all" className="space-y-4">
        <UsersTable
          users={defaultUsers}
          offset={Number(offset) ?? 5}
          totalUsers={defaultUsers.length}
        />
      </TabsContent>

      <TabsContent value="active" className="space-y-4">
        <UsersTable
          users={defaultUsers.filter((user) => user.status === 'active')}
          offset={Number(offset) ?? 5}
          totalUsers={
            defaultUsers.filter((user) => user.status === 'active').length
          }
        />
      </TabsContent>

      <TabsContent value="inactive" className="space-y-4">
        <UsersTable
          users={defaultUsers.filter((user) => user.status === 'inactive')}
          offset={Number(offset) ?? 5}
          totalUsers={
            defaultUsers.filter((user) => user.status === 'inactive').length
          }
        />
      </TabsContent>
    </Tabs>
  );
};
