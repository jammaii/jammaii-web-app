'use client';

import { notFound, useParams } from 'next/navigation';
import { withProtectedRoute } from '@/components/general/protected-route';
import {
  ProfilePage,
  ProfileSkeleton
} from '@/features/users/pages/profile-page';
import { api } from '@/lib/api';

function Page() {
  const route = useParams();
  const { id } = route;

  if (!id || Array.isArray(id)) {
    notFound();
  }

  const { data: user, isLoading } = api.user.getUser.useQuery({ id });

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (!user) {
    return <div> Something went wrong</div>;
  }

  return <ProfilePage user={user} proxy />;
}

export default withProtectedRoute(Page, {
  allowedRoles: ['ADMIN', 'SUPER_ADMIN']
});
