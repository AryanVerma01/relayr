import React, { Suspense } from 'react'
import { caller, getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import Client from './Client';

const page = async () => {

  const queryClient = getQueryClient();
  
  void queryClient.prefetchQuery(trpc.hello.queryOptions());

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Loading...</p>}>
          <Client/>
        </Suspense>
      </HydrationBoundary>
    </div>
  )
}

export default page