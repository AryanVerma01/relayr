import { NodeExecutor } from "@/features/execution/types";
import { googleFormTriggerChannel } from "@/inngest/channel/google-form-trigger";

type GoogleFormData = Record<string, unknown>;

export const googleFormTriggerExecutor: NodeExecutor<GoogleFormData> = async ({
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish(
    googleFormTriggerChannel().status({
      nodeId: nodeId,
      status: "loading",
    }),
  );

  const result = await step.run("google-form-trigger", async () => context);

  await publish(
    googleFormTriggerChannel().status({
      nodeId: nodeId,
      status: "success",
    }),
  );

  return result;
};
