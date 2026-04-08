import { InitialNode } from "@/components/initial-node";
import { AnthropicNode } from "@/features/execution/components/anthropic/node";
import { GeminiNode } from "@/features/execution/components/gemini/node";
import { HttpRequestNode } from "@/features/execution/components/http-request/node";
import { OpenAINode } from "@/features/execution/components/openai/node";
import { GoogleFormTrigger } from "@/features/trigger/google-form-trigger/node";
import { ManualTriggerNode } from "@/features/trigger/manual-trigger/node";
import { StripeTriggerNode } from "@/features/trigger/stripe-trigger/node";
import { NodeType } from "@/generated/prisma/enums";
import { NodeTypes } from "@xyflow/react";
import { DiscordNode } from "../features/execution/components/discord/node";
import { SlackNode } from "../features/execution/components/slack/node";

// ? This display NodeType for each Node

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.HTTP_REQUEST]: HttpRequestNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
  [NodeType.GOOGLE_FORM_TRIGGER]: GoogleFormTrigger,
  [NodeType.STRIPE_TRIGGER]: StripeTriggerNode,
  [NodeType.GEMINI]: GeminiNode,
  [NodeType.OPENAI]: OpenAINode,
  [NodeType.ANTHROPIC]: AnthropicNode,
  [NodeType.DISCORD]: DiscordNode,
  [NodeType.SLACK]: SlackNode,
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof nodeComponents;
