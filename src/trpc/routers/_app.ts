import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "../init";
import { workflowsRouter } from "@/features/workflows/server/router";
import { credentialsRouter } from "@/features/credentials/server/router";
import { executionsRouter } from "@/features/execution/server/routers";

export const appRouter = createTRPCRouter({
  workflows: workflowsRouter,
  credentials: credentialsRouter,
  executions: executionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
