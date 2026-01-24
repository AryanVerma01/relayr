// ! Hook to fetch all workflows using Suspence

import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from 'next/navigation'
import { toast } from "sonner";
import { useWorkflowsParams } from "./use-workflows-params";
import { useEntitySearch } from "@/hooks/use-entity-search";


export const useSuspenseWorkflows = () => {
    const trpc = useTRPC();
    const [params, setParams] = useWorkflowsParams();

    return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params))
}


export const useCreateWorkflows = () => {
    const trpc = useTRPC();
    const router = useRouter()
    const queryClient = useQueryClient();

    return useMutation(trpc.workflows.create.mutationOptions({
        onSuccess: (data) => {
            toast.success(`Workflow ${data.name} Created`);
            router.push(`/workflows/${data.id}`);

            // ? trigger data refresh
            queryClient.invalidateQueries(
                trpc.workflows.getMany.queryOptions()
            )
        },
        onError: (error) => {
            toast.error(`Failed to create workflow: ${error.message}`)
        }
    }))
}