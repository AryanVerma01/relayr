"use client";

import { BaseExecutionNode } from "../base-execution-node";
import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { memo, useState } from "react";
import { GeminiDialog } from "./dialog";
import { GeminiFormValues } from "./dialog";
import { useNodeStatus } from "../../hooks/use-node-status";
import { fetchGeminiRealtimeToken } from "./action";
import { NodeStatus } from "@/components/react-flow/node-status-indicator";
import { geminiChannel } from "@/inngest/channel/gemini";

type GeminiNodeData = {
  model?: string;
  systemPrompt?: string;
  userPrompt?: string;
  variableName?: string;
  [key: string]: unknown; // ? other fields
};

type GeminiNodeType = Node<GeminiNodeData>;

// ! memo is used to restrict re-renders of node

export const GeminiNode = memo((props: NodeProps<GeminiNodeType>) => {
  const { setNodes } = useReactFlow();
  const nodeData = props.data;
  const description = nodeData.userPrompt
    ? `${nodeData.model || "gemini-1.5-flash"} : ${nodeData.userPrompt.slice(0, 50)}...`
    : `Not Configured`;

  const nodeStatus: NodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: geminiChannel().name,
    topic: "status",
    refreshToken: fetchGeminiRealtimeToken,
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenSettings = () => setDialogOpen(true);

  const handleSubmit = (values: GeminiFormValues) => {
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
      <GeminiDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      ></GeminiDialog>
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon="/logos/gemini.svg"
        name="Gemini"
        description={description}
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      ></BaseExecutionNode>
    </>
  );
});

GeminiNode.displayName = "GeminiNode";
