"use client";

import { notFound, useParams } from "next/navigation";
import { withProtectedRoute } from "@/components/general/protected-route";
import { ProfilePage } from "@/features/users/pages/profile-page";

function Page() {
  const route = useParams();
  const { id } = route;

  if (!id || Array.isArray(id)) {
    notFound();
  }

  return <ProfilePage id={id} />;
}

export default withProtectedRoute(Page, {
  allowedRoles: ["ADMIN", "SUPER_ADMIN"],
});
