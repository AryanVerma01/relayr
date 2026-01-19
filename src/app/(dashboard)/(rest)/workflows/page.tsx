import { WorkflowsList , WorkflowContainer } from '@/features/workflows/component/workflow';
import { prefetchWorkflows } from '@/features/workflows/server/prefetch';
import { requireAuth } from '@/lib/auth-utils'
import { HydrateClient } from '@/trpc/server';
import { HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const page = async () => {

  await requireAuth();
  prefetchWorkflows();

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