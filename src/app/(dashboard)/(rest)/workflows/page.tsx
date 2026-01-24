import { WorkflowsList , WorkflowContainer } from '@/features/workflows/component/workflow';
import { prefetchWorkflows } from '@/features/workflows/server/prefetch';
import { requireAuth } from '@/lib/auth-utils'
import { HydrateClient } from '@/trpc/server';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { SearchParams } from 'nuqs';
import { workflowParamsLoader } from '@/features/workflows/server/workflow-loader';


type Props = {
  searchParams : Promise<SearchParams>
}

const page = async ({searchParams} : Props) => {

  await requireAuth();

  const params = await workflowParamsLoader(searchParams);
  prefetchWorkflows(params);

  return (
    <WorkflowContainer>
    <HydrateClient>
      <ErrorBoundary fallback={<p>Error!</p>}>
        <Suspense fallback={<p>Loading...</p>}>
            <WorkflowsList/>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
    </WorkflowContainer>
  )
}


export default page