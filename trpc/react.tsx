"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  TRPCClientError,
  loggerLink,
  unstable_httpBatchStreamLink,
} from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { useState } from "react";

import { type AppRouter } from "@/server/api/root";
import { getUrl, transformer } from "./shared";
import { signOut } from "next-auth/react";

/**
 * This shouldn't be used externally (e.g. in components).
 *
 * Use `import { api } from "~/utils/api";` instead.
 */
const api = createTRPCReact<AppRouter>();

export function TRPCReactProvider(props: {
  children: React.ReactNode;
  cookies: string;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            // Signout any inactive account.
            if (
              error instanceof TRPCClientError &&
              // TRPC only allows us set the message property of errors,
              // So there is currently no way to get this check by errorCode instead
              // of error message. We are sticking to this until there is a better solution.
              [
                "This account is not active",
                "Action cannot be completed because user is banned",
                "Action cannot be completed because user is suspended",
              ].includes(error.message)
            )
              void signOut();
          },
        }),
      }),
  );

  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          url: getUrl(),
          headers() {
            return {
              cookie: props.cookies,
              "x-trpc-source": "react",
            };
          },
          transformer,
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}
