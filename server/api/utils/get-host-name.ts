import { headers } from "next/headers";

/**
 * Gets host name on server side.
 */
export const getHostName = async () => {
  const headerList = headers();

  const host =
    (await headerList).get("host") ||
    (await headerList).get("x-forwarded-host");
  const protocol = (await headerList).get("x-forwarded-proto") || "http";

  return `${protocol}://${host}`;
};
