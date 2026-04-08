import { prefetch, trpc } from "@/trpc/server";
import { inferInput } from "@trpc/tanstack-react-query";

// ? this infer the type of TRPC request to find all Inputs for request
type Input = inferInput<typeof trpc.workflows.getMany>;

// ! This hook prefetch all the workflows
export const prefetchWorkflows = (params: Input) => {
  return prefetch(trpc.workflows.getMany.queryOptions(params));
};

// ! this hook prefetch one workflow
export const prefetchWorkflow = (id: string) => {
  return prefetch(trpc.workflows.getOne.queryOptions({ id }));
};
