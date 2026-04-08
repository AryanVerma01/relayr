import { prefetch, trpc } from "@/trpc/server";
import { inferInput } from "@trpc/tanstack-react-query";

// ? this infer the type of TRPC request to find all Inputs for request
type Input = inferInput<typeof trpc.credentials.getMany>;

// ! This hook prefetch all the credentials
export const prefetchCredentials = (params: Input) => {
  return prefetch(trpc.credentials.getMany.queryOptions(params));
};

// ! this hook prefetch one credential
export const prefetchCredential = (id: string) => {
  return prefetch(trpc.credentials.getOne.queryOptions({ id }));
};
