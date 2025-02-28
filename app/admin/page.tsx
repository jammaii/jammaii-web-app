"use client";

import { withProtectedRoute } from "@/components/general/protected-route";
import { DashboardPage } from "@/features/admin/pages/dashboard-page";

function Page() {
  return <DashboardPage />;
}

export default withProtectedRoute(Page, {
  allowedRoles: ["ADMIN", "SUPER_ADMIN"],
});
