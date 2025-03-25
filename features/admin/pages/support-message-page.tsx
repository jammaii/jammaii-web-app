'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from '@/lib/api';
import { LoadingScreen } from '@/components/general/loading-screen';
import { useState } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { SupportMessagesTable } from '@/features/admin/components/support/messages-table';

export const SupportMessagePage = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const { data, isLoading, isError } = api.support.getMessages.useQuery({
    page,
    perPage,
    search
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handlePaginationChange = (page: number, perPage: number) => {
    setPage(page);
    setPerPage(perPage);
  };

  if (isLoading) return <LoadingScreen fullScreen />;

  if (!data || data.messages.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p>No messages found</p>
      </div>
    );
  }

  return (
    <Tabs defaultValue="all" className="space-y-4">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <TabsList>
          <TabsTrigger value="all">
            All Messages ({data?.meta.total || 0})
          </TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="unresolved">Unresolved</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="all" className="space-y-4">
        <SupportMessagesTable
          messages={data.messages}
          meta={data?.meta || { page: 1, perPage: 10, total: 0, totalPages: 0 }}
          isLoading={isLoading}
          isError={isError}
          onSearchChange={handleSearchChange}
          onPaginationChange={handlePaginationChange}
        />
      </TabsContent>

      <TabsContent value="resolved" className="space-y-4">
        <SupportMessagesTable
          messages={data.messages.filter((message) => message.isResolved)}
          meta={data?.meta || { page: 1, perPage: 10, total: 0, totalPages: 0 }}
          isLoading={isLoading}
          isError={isError}
          onSearchChange={handleSearchChange}
          onPaginationChange={handlePaginationChange}
        />
      </TabsContent>

      <TabsContent value="unresolved" className="space-y-4">
        <SupportMessagesTable
          messages={data.messages.filter((message) => !message.isResolved)}
          meta={data?.meta || { page: 1, perPage: 10, total: 0, totalPages: 0 }}
          isLoading={isLoading}
          isError={isError}
          onSearchChange={handleSearchChange}
          onPaginationChange={handlePaginationChange}
        />
      </TabsContent>
    </Tabs>
  );
};
