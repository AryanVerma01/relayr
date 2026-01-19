"use client";
// ! this component get all workflow using suspence

import React from "react";
import { useCreateWorkflows, useSuspenseWorkflows } from "../hooks/use-workflow";
import { EntityContainer, EntityHeader } from "@/components/entity-components";

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
    search = {<></>}
    pagination = {<></>}
  >
   
    {children}
  </EntityContainer>
};
