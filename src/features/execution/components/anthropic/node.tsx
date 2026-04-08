"use client";

import { BaseExecutionNode } from "../base-execution-node";
import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { memo, useState } from "react";
import { useNodeStatus } from "../../hooks/use-node-status";
import { NodeStatus } from "@/components/react-flow/node-status-indicator";
import { anthropicChannel } from "@/inngest/channel/anthropic";
import { fetchAnthropicRealtimeToken } from "./action";
import { AnthropicDialog, AnthropicFormValues } from "./dialog";

type AnthropicNodeData = {
  model?: string;
  systemPrompt?: string;
  userPrompt?: string;
  variableName?: string;
  [key: string]: unknown; // ? other fields
};

type AnthropicNodeType = Node<AnthropicNodeData>;

// ! memo is used to restrict re-renders of node

export const AnthropicNode = memo((props: NodeProps<AnthropicNodeType>) => {
  const { setNodes } = useReactFlow();
  const nodeData = props.data;
  const description = nodeData.userPrompt
    ? `${nodeData.model || "gemini-1.5-flash"} : ${nodeData.userPrompt.slice(0, 50)}...`
    : `Not Configured`;

  const nodeStatus: NodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: anthropicChannel().name,
    topic: "status",
    refreshToken: fetchAnthropicRealtimeToken,
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenSettings = () => setDialogOpen(true);

  const handleSubmit = (values: AnthropicFormValues) => {
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
      <AnthropicDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      ></AnthropicDialog>
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon="/logos/anthropic.svg"
        name="Anthropic"
        description={description}
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      ></BaseExecutionNode>
    </>
  );
});

AnthropicNode.displayName = "AnthropicNode";
