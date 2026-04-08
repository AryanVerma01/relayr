"use server";
import { getSubscriptionToken, Realtime } from "@inngest/realtime";
import { inngest } from "@/inngest/client";
import { httpRequestChannel } from "@/inngest/channel/http-request";

export async function fetchHttpRequestRealtimeToken() {
  const token = await getSubscriptionToken(inngest, {
    channel: httpRequestChannel(),
    topics: ["status"],
  });

  return token;
}
