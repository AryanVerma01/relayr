import { NodeType } from "@/generated/prisma/enums";
import { NodeExecutor, NodeExecutorParams, WorkflowContext } from "../types";
import { manualTriggerExecutor } from "@/features/trigger/manual-trigger/executor";
import { HttpRequestExecutor } from "../components/http-request/executor";
import { googleFormTriggerExecutor } from "@/features/trigger/google-form-trigger/executor";
import { stripeTriggerExecutor } from "@/features/trigger/stripe-trigger/executor";
import { GeminiExecutor } from "../components/gemini/executor";
import { OpenAIExecutor } from "../components/openai/executor";
import { AnthropicExecutor } from "../components/anthropic/executor";
import { discordExecutor } from "../components/discord/executor";
import { slackExecutor } from "../components/slack/executor";

export const executorRegistry: Record<NodeType, NodeExecutor<any>> = {
  [NodeType.INITIAL]: manualTriggerExecutor,
  [NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
  [NodeType.HTTP_REQUEST]: HttpRequestExecutor,
  [NodeType.GOOGLE_FORM_TRIGGER]: googleFormTriggerExecutor,
  [NodeType.STRIPE_TRIGGER]: stripeTriggerExecutor,
  [NodeType.GEMINI]: GeminiExecutor,
  [NodeType.ANTHROPIC]: AnthropicExecutor,
  [NodeType.OPENAI]: OpenAIExecutor,
  [NodeType.DISCORD]: discordExecutor,
  [NodeType.SLACK]: slackExecutor,
};

export const getExecutor = (type: NodeType): NodeExecutor<any> => {
  const executor = executorRegistry[type];

  if (!executor) {
    throw new Error(`No executor found for the node type: ${type}`);
  }

  return executor;
};
