"use client";
import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { useNodeStatus } from "@/features/execution/hooks/use-node-status";
import { NodeStatus } from "@/components/react-flow/node-status-indicator";
import { StripeTriggerDialog } from "./dialog";
import { stripeTriggerChannel } from "@/inngest/channel/stripe-trigger";
import { fetchStripeTriggerRealtimeToken } from "./action";

export const StripeTriggerNode = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const nodeStatus: NodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: stripeTriggerChannel().name,
    topic: "status",
    refreshToken: fetchStripeTriggerRealtimeToken,
  });

  const handleOpenSettings = () => setDialogOpen(true);

  return (
    <>
      <StripeTriggerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <BaseTriggerNode
        {...props}
        icon="/logos/stripe.svg"
        name="Stripe"
        description="When stripe event is captured"
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      ></BaseTriggerNode>
    </>
  );
});
