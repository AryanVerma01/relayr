"use client";

import { BaseExecutionNode } from "../base-execution-node";
import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { memo, useState } from "react";
import { OpenAIDialog, OpenAIFormValues } from "./dialog";
import { useNodeStatus } from "../../hooks/use-node-status";
import { NodeStatus } from "@/components/react-flow/node-status-indicator";
import { openAIChannel } from "@/inngest/channel/openai";
import { fetchOpenAiRealtimeToken } from "./action";

type OpenAINodeData = {
  model?: string;
  systemPrompt?: string;
  userPrompt?: string;
  variableName?: string;
  [key: string]: unknown; // ? other fields
};

type OpenAINodeType = Node<OpenAINodeData>;

// ! memo is used to restrict re-renders of node

export const OpenAINode = memo((props: NodeProps<OpenAINodeType>) => {
  const { setNodes } = useReactFlow();
  const nodeData = props.data;
  const description = nodeData.userPrompt
    ? `${nodeData.model || "chatgpt-4o-latest"} : ${nodeData.userPrompt.slice(0, 50)}...`
    : `Not Configured`;

  const nodeStatus: NodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: openAIChannel().name,
    topic: "status",
    refreshToken: fetchOpenAiRealtimeToken,
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenSettings = () => setDialogOpen(true);

  const handleSubmit = (values: OpenAIFormValues) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              ...values,
            },
          };
        }
        return node;
      }),
    );
  };

  return (
    <>
      <OpenAIDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      ></OpenAIDialog>
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon="/logos/openai.svg"
        name="OpenAI"
        description={description}
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      ></BaseExecutionNode>
    </>
  );
});

OpenAINode.displayName = "OpenAINode";
