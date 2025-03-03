'use client';

import { withProtectedRoute } from '@/components/general/protected-route';
import { SupportMessagePage } from '@/features/admin/pages/support-message-page';

function Page() {
  return <SupportMessagePage />;
}

export default withProtectedRoute(Page, {
  allowedRoles: ['ADMIN', 'SUPER_ADMIN']
});
