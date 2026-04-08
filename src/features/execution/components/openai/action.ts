"use server";
import { getSubscriptionToken } from "@inngest/realtime";
import { inngest } from "@/inngest/client";
import { openAIChannel } from "@/inngest/channel/openai";

export async function fetchOpenAiRealtimeToken() {
  const token = await getSubscriptionToken(inngest, {
    channel: openAIChannel(),
    topics: ["status"],
  });

  return token;
}
