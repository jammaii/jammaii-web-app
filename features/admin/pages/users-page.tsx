'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UsersTable } from '@/features/admin/components/users-table';
import { api } from '@/lib/api';
import { LoadingScreen } from '@/components/general/loading-screen';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';

export const UsersPage = () => {
  const { data, isLoading } = api.user.getUsers.useQuery({});
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);

  if (isLoading) return <LoadingScreen fullScreen />;

  if (!data || data.users.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p>No users found</p>
      </div>
    );
  }

  return (
    <Tabs defaultValue="all" className="space-y-4">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <TabsList>
          <TabsTrigger value="all">
            All Users ({data?.meta.total || 0})
          </TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <div className="flex w-full items-center gap-2 sm:w-auto">
          <div className="relative w-full sm:w-[200px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button
            size="sm"
            variant="outline"
            className="h-8 gap-1"
            leftIcon={<Upload className="h-3.5 w-3.5" />}
          >
            <span className="sr-only sm:not-sr-only">Export</span>
          </Button>
        </div>
      </div>

      <TabsContent value="all" className="space-y-4">
        <UsersTable
          users={data.users}
          page={page}
          totalPages={Math.ceil((data?.meta.total || 0) / 10)}
          onPageChangeAction={setPage}
        />
      </TabsContent>

      <TabsContent value="active" className="space-y-4">
        <UsersTable
          users={data.users.filter((user) => user.profileCompleted)}
          page={page}
          totalPages={Math.ceil((data?.meta.total || 0) / 10)}
          onPageChangeAction={setPage}
        />
      </TabsContent>

      <TabsContent value="inactive" className="space-y-4">
        <UsersTable
          users={data.users.filter((user) => !user.profileCompleted)}
          page={page}
          totalPages={Math.ceil((data?.meta.total || 0) / 10)}
          onPageChangeAction={setPage}
        />
      </TabsContent>
    </Tabs>
  );
};
