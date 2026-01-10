'use client'

import { Button } from "@/components/ui/button";
import Logout from "@/features/auth/logout";
import { requireAuth } from "@/lib/auth-utils";
import { useTRPC } from "@/trpc/client";
import { caller } from "@/trpc/server";
import { useMutation, useQuery } from "@tanstack/react-query";


const page = () => {

  // await requireAuth();

  const trpc = useTRPC();
  const testAI = useMutation(trpc.testAI.mutationOptions())
  
  const workflowss = useQuery(trpc.getWorkflows.queryOptions());

  return <div>Protected Page
    <Button variant={'default'} disabled={testAI.isPending} onClick={()=>{
      testAI.mutate()
    }}>
        TestAI
    </Button>
    
    {JSON.stringify(testAI.data )}
    {JSON.stringify(workflowss.data)}
  </div>;
};

export default page;
