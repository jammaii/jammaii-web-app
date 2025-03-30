'use client';

import { type UserResponse } from '@/features/users/types/app';
import { api } from '@/lib/api';
import { useSession } from 'next-auth/react';
import { useUserStore } from '@/hooks/stores/user.store';
import { useEffect } from 'react';

export interface UseUserReturnType {
  user?: UserResponse;
  status: 'authenticated' | 'loading' | 'unauthenticated';
  isAuthenticated: boolean;
}

export const useUser = (): UseUserReturnType => {
  const session = useSession();
  const status = session.status;
  const isAuthenticated = status === 'authenticated';

  const storedUser = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const { data: user, isLoading } = api.user.getUser.useQuery(
    {},
    {
      enabled: isAuthenticated && !storedUser,
      refetchOnWindowFocus: false,
      retry: false, // Disable retries
      retryOnMount: false, // Prevent retry on component mount
      refetchOnMount: false, // Prevent refetch on component mount
      refetchOnReconnect: false // Prevent refetch on reconnect
    }
  );

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  // Clear user from store when session ends
  useEffect(() => {
    if (!isAuthenticated) {
      useUserStore.getState().clearUser();
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return {
      status: 'loading',
      isAuthenticated
    };
  }

  return {
    user: storedUser ?? user,
    status,
    isAuthenticated
  };
};
