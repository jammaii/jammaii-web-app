'use client';

import { withProtectedRoute } from '@/components/general/protected-route';
import { CreateProjectPage } from '@/features/projects/pages/create-project-page';

function Page() {
  return <CreateProjectPage />;
}

export default withProtectedRoute(Page, {
  allowedRoles: ['ADMIN', 'SUPER_ADMIN']
});
