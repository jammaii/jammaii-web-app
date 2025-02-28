"use client";

import { SingleUserPage } from "@/features/admin/pages/single-user-page";
import { notFound, useParams } from "next/navigation";
import { withProtectedRoute } from "@/components/general/protected-route";

function Page() {
  const route = useParams();
  const { id } = route;

  if (!id || Array.isArray(id)) {
    notFound();
  }

  return <SingleUserPage id={id} />;
}

export default withProtectedRoute(Page, {
  allowedRoles: ["ADMIN", "SUPER_ADMIN"],
});
