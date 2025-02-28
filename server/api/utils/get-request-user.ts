import { type Session } from "next-auth";
import { ApiRequestUser } from "@/server/api/types";

/**
 * This retrieves the API request user from TRPC session.
 * It should be used specifically for the TRPC endpoints.
 * @returns ApiRequestUser
 */
export const getRequestUserFromSession = <
  T extends { session: Session | null },
>({
  session,
}: T): ApiRequestUser => {
  return {
    id: session?.user.id ?? "",
  };
};
