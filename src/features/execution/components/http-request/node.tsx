"use client";

import { BaseExecutionNode } from "../base-execution-node";
import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { memo, useState } from "react";
import { HttpRequestDialog } from "./dialog";
import { HttpRequestFormValues } from "./dialog";
import { useNodeStatus } from "../../hooks/use-node-status";
import { httpRequestChannel } from "@/inngest/channel/http-request";
import { fetchHttpRequestRealtimeToken } from "./action";
import { NodeStatus } from "@/components/react-flow/node-status-indicator";

type HttpRequestNodeData = {
  endpoint?: string;
  method?: "POST" | "GET" | "DELETE" | "PUT" | "PATCH";
  body?: string;
  variableName?: string;
  [key: string]: unknown; // ? other fields
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;

// ! memo is used to restrict re-renders of node

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const { setNodes } = useReactFlow();
  const nodeData = props.data;
  const description = nodeData.endpoint
    ? ` ${nodeData.method || "GET"} : ${nodeData.endpoint} `
    : "Not Configured";

  const nodeStatus: NodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: httpRequestChannel().name,
    topic: "status",
    refreshToken: fetchHttpRequestRealtimeToken,
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenSettings = () => setDialogOpen(true);

  const handleSubmit = (values: HttpRequestFormValues) => {
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
      <HttpRequestDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      ></HttpRequestDialog>
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon={GlobeIcon}
        name="HTTP Request"
        description={description}
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      ></BaseExecutionNode>
    </>
  );
});

HttpRequestNode.displayName = "HttpRequestNode";
