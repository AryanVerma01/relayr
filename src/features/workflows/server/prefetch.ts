// ! Tgis hook prefetch all the workflows

import { prefetch, trpc } from "@/trpc/server"
import { inferInput } from "@trpc/tanstack-react-query"

// ? this infer the type of TRPC request to find all Inputs for request 
type Input = inferInput<typeof trpc.workflows.getMany>


export const prefetchWorkflows = (params: Input) => {
    return prefetch(trpc.workflows.getMany.queryOptions(params))
}