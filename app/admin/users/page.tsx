"use client";

import { withProtectedRoute } from "@/components/general/protected-route";
import { UsersPage } from "@/features/admin/pages/users-page";

function Page() {
  return <UsersPage />;
}

export default withProtectedRoute(Page, {
  allowedRoles: ["ADMIN", "SUPER_ADMIN"],
});
