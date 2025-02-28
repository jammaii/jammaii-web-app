"use client";

import { withProtectedRoute } from "@/components/general/protected-route";
import { ProfilePage } from "@/features/users/pages/profile-page";

function Page() {
  return <ProfilePage />;
}

export default withProtectedRoute(Page, {
  allowedRoles: ["USER", "ADMIN", "SUPER_ADMIN"],
});
