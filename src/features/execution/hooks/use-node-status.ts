import { Realtime } from "@inngest/realtime";
import { useInngestSubscription } from "@inngest/realtime/hooks";
import type { NodeStatus } from "@/components/react-flow/node-status-indicator";
import { useEffect, useState } from "react";

// ? This hook finds and updates the node status from inngest

export function useNodeStatus({
  nodeId,
  channel,
  topic,
  refreshToken,
}: {
  nodeId: string;
  channel: string;
  topic: string;
  refreshToken: () => Promise<Realtime.Subscribe.Token>;
}) {
  const [status, setStatus] = useState("initial");

  const { data } = useInngestSubscription({
    refreshToken,
    enabled: true,
  });

  useEffect(() => {
    if (!data.length) {
      return;
    }

    // ? Find the latest msg for this node

    const latestMessage = data
      .filter(
        (msg) =>
          msg.kind === "data" &&
          msg.channel === channel &&
          msg.topic === topic &&
          msg.data.nodeId === nodeId,
      )
      .sort((a, b) => {
        if (a.kind === "data" && b.kind === "data") {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        return 0;
      })[0];

    if (latestMessage && latestMessage.kind === "data") {
      setStatus(latestMessage.data.status);
    }
  }, [data, nodeId, channel, topic]);

  return status as NodeStatus;
}
