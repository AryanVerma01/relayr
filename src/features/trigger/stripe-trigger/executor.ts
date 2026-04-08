import { NodeExecutor } from "@/features/execution/types";
import { manualTriggerChannel } from "@/inngest/channel/manual-trigger";
import { stripeTriggerChannel } from "@/inngest/channel/stripe-trigger";

type StripeTriggerData = Record<string, unknown>;

export const stripeTriggerExecutor: NodeExecutor<StripeTriggerData> = async ({
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish(
    stripeTriggerChannel().status({
      nodeId: nodeId,
      status: "loading",
    }),
  );

  const result = await step.run("stripe-trigger", async () => context);

  await publish(
    stripeTriggerChannel().status({
      nodeId: nodeId,
      status: "success",
    }),
  );

  return result;
};
