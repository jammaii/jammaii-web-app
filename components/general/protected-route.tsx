'use client';

import { UserRole } from '@/features/users/types/app';
import { useUser } from '@/hooks/use-user';
import { redirect } from 'next/navigation';
import { type ComponentType } from 'react';
import { LoadingScreen } from './loading-screen';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export function withProtectedRoute<T extends object>(
  WrappedComponent: ComponentType<T>,
  { allowedRoles }: ProtectedRouteProps = {}
) {
  return function ProtectedComponent(props: T) {
    const { user, status } = useUser();

    if (status === 'loading') {
      return <LoadingScreen fullScreen size="lg" />;
    }

    if (status === 'unauthenticated') {
      redirect('/signin');
    }

    if (!user?.profileCompleted) {
      redirect('/complete-profile');
    }

    // If no roles specified, allow all authenticated users
    if (!allowedRoles || allowedRoles.length === 0) {
      return <WrappedComponent {...props} />;
    }

    // Check if user has required role
    const userRole = user?.role;
    if (userRole && !allowedRoles.includes(userRole)) {
      redirect('/');
    }

    return <WrappedComponent {...props} />;
  };
}
