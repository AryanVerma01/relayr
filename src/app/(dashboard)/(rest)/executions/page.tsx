import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { SearchParams } from "nuqs";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { executionsParamsLoader } from "@/features/execution/server/params-loader";
import { prefetchExecutions } from "@/features/execution/server/prefetch";
import {
  ExecutionsContainer,
  ExecutionsError,
  ExecutionsList,
  ExecutionsLoading,
} from "@/features/execution/components/executions";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  await requireAuth();
  const params = await executionsParamsLoader(searchParams);
  prefetchExecutions(params);

  return (
    <>
      <ExecutionsContainer>
        <HydrateClient>
          <ErrorBoundary fallback={<ExecutionsError />}>
            <Suspense fallback={<ExecutionsLoading />}>
              <ExecutionsList />
            </Suspense>
          </ErrorBoundary>
        </HydrateClient>
      </ExecutionsContainer>
    </>
  );
};

export default page;
