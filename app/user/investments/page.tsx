'use client';

import { withProtectedRoute } from '@/components/general/protected-route';
import { UserInvestmentsPage } from '@/features/users/pages/investments-page';

function Page() {
  return <UserInvestmentsPage />;
}

export default withProtectedRoute(Page, { allowedRoles: ['USER'] });
