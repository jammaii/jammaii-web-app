"use client";

import { withProtectedRoute } from "@/components/general/protected-route";
import { UserDashboardPage } from "@/features/users/pages/user-dashboard-page";

function Page() {
  return <UserDashboardPage />;
}

export default withProtectedRoute(Page, { allowedRoles: ["USER"] });
