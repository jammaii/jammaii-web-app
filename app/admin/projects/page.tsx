'use client';

import { withProtectedRoute } from '@/components/general/protected-route';
import { ProjectsPage } from '@/features/projects/pages/projects-page';

function Page() {
  return <ProjectsPage />;
}

export default withProtectedRoute(Page, {
  allowedRoles: ['ADMIN', 'SUPER_ADMIN']
});
