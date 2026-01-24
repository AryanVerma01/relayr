"use client";
// ! this component get all workflow using suspence

import React from "react";
import { useCreateWorkflows, useSuspenseWorkflows } from "../hooks/use-workflow";
import { EntityContainer, EntityHeader, EntityPagination, EntitySearch } from "@/components/entity-components";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "@/hooks/use-entity-search";


export const WorkFlowPagination = () => {
  const workflows = useSuspenseWorkflows();
  const [params , setParams] = useWorkflowsParams();


  return <EntityPagination
    disabled = {workflows.isPending}
    totalPages={workflows.data.totalPages}
    page={workflows.data.page}
    onPageChange={(page) => setParams({... params, page })}
  >
    
  </EntityPagination>
} 

export const WorkflowsSearch =  () => {

  const [params, setParams] = useWorkflowsParams() 
  const { searchValue,onSearchChange } = useEntitySearch(params,setParams);

  return <EntitySearch
    value={searchValue}
    placeholder="Search Workflows"
    onChange={onSearchChange}
  >
  </EntitySearch>
}


export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();

  return <div>{JSON.stringify(workflows.data, null, 2)}</div>;
};

export const WorkflowHeader = ({ disabled }: { disabled?: boolean }) => {

  const createWorkflow = useCreateWorkflows();      // Resulable Code

  const handleCreate = () => {
      createWorkflow.mutate(undefined,{
        onError : (error) => {
          console.error(error);
        }
      })
  }

  return (
    <EntityHeader
      title="Workflows"
      description="Create and Manage your workflows"
      onNew={handleCreate}
      newButtonLabel="New workFlow"
      disabled={disabled}
      isCreating={createWorkflow.isPending}
    />
  );
};

export const WorkflowContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  return <EntityContainer
    header = {<WorkflowHeader/>}
    search = {<WorkflowsSearch/>}
    pagination = {<WorkFlowPagination/>}
  >
   
    {children}
  </EntityContainer>
};


