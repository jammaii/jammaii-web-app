'use client';

import { LoadingScreen } from '@/components/general/loading-screen';
import { useUser } from '@/hooks/use-user';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function AuthPage() {
  const { user, status } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      if (!user) {
        router.push('/signin');
        return;
      }

      if (!user.profileCompleted) {
        router.push('/complete-profile');
        return;
      }

      if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
        router.push('/admin');
        return;
      }

      router.push('/user');
    }
  }, [user, status, router]);

  return <LoadingScreen fullScreen size="lg" />;
}
