'use client';

import { LoadingScreen } from '@/components/general/loading-screen';
import { withProtectedRoute } from '@/components/general/protected-route';
import {
  ProfilePage,
  ProfileSkeleton
} from '@/features/users/pages/profile-page';
import { useUser } from '@/hooks/use-user';

function Page() {
  const { user, status } = useUser();

  if (status === 'loading') {
    return <ProfileSkeleton />;
  }

  if (!user) {
    return <div> Something went wrong</div>;
  }

  return <ProfilePage user={user} />;
}

export default withProtectedRoute(Page, {
  allowedRoles: ['USER', 'ADMIN', 'SUPER_ADMIN']
});
