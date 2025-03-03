'use client';

import { withProtectedRoute } from '@/components/general/protected-route';
import { SingleProjectPage } from '@/features/projects/pages/single-project-page';
import { notFound, useParams } from 'next/navigation';

function Page() {
  const route = useParams();
  const { id } = route;

  if (!id || Array.isArray(id)) {
    notFound();
  }

  return <SingleProjectPage id={id} isAdmin />;
}

export default withProtectedRoute(Page, {
  allowedRoles: ['ADMIN', 'SUPER_ADMIN']
});
