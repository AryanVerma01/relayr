"use client";
import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { useNodeStatus } from "@/features/execution/hooks/use-node-status";
import { NodeStatus } from "@/components/react-flow/node-status-indicator";
import { GoogleFormTriggerDialog } from "./dialog";
import { fetchGoogleFormTriggerRealtimeToken } from "./action";
import { googleFormTriggerChannel } from "@/inngest/channel/google-form-trigger";

export const GoogleFormTrigger = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const nodeStatus: NodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: googleFormTriggerChannel().name,
    topic: "status",
    refreshToken: fetchGoogleFormTriggerRealtimeToken,
  });

  const handleOpenSettings = () => setDialogOpen(true);

  return (
    <>
      <GoogleFormTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <BaseTriggerNode
        {...props}
        icon="/logos/googleform.svg"
        name="When form is submitted"
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      ></BaseTriggerNode>
    </>
  );
});
