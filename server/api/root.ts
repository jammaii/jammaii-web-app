import { projectRouter } from "./features/routers/project.router";
import { supportRouter } from "./features/routers/support.router";
import { userRouter } from "./features/routers/user.router";
import { createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  user: userRouter,
  project: projectRouter,
  support: supportRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
