import { NodeExecutor } from "@/features/execution/types";
import { models, NonRetriableError } from "inngest";
import Handlebars, { SafeString } from "handlebars";
import { openAIChannel } from "@/inngest/channel/openai";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import prisma from "@/lib/db";
import { decrypt } from "../../lib/encryption";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  return new Handlebars.SafeString(jsonString);
});

type OpenAIData = {
  model?: string;
  variableName?: string;
  userPrompt?: string;
  systemPrompt?: string;
  credentialId?: string;
};

export const OpenAIExecutor: NodeExecutor<OpenAIData> = async ({
  data,
  nodeId,
  context,
  step,
  userId,
  publish,
}) => {
  await publish(
    openAIChannel().status({
      nodeId: nodeId,
      status: "loading",
    }),
  );

  if (!data.variableName) {
    await publish(
      openAIChannel().status({
        nodeId,
        status: "error",
      }),
    );
    throw new NonRetriableError(`OpenAI Node: Variable name is missing`);
  }

  if (!data.credentialId) {
    await publish(
      openAIChannel().status({
        nodeId,
        status: "error",
      }),
    );
    throw new NonRetriableError(`OpenAI Node: Credential ID is missing`);
  }

  if (!data.userPrompt) {
    await publish(
      openAIChannel().status({
        nodeId,
        status: "error",
      }),
    );
    throw new NonRetriableError(`OpenAI Node: User Prompt is missing`);
  }

  // ? Handlebars will will fill the variable with the context form previous node (Templating)
  const systemPrompt = data.systemPrompt
    ? Handlebars.compile(data.systemPrompt)(context)
    : "You are a helpful assistant";
  const userPrompt = Handlebars.compile(data.userPrompt)(context);

  const credential = await step.run("get-credential", () => {
    return prisma.credential.findUnique({
      where: { id: data.credentialId, userId },
    });
  });

  if (!credential) {
    throw new NonRetriableError("OpenAI Node: Credential Not found");
  }

  const openai = createOpenAI({
    apiKey: decrypt(credential.value),
  });

  try {
    const { text } = await step.ai.wrap("openai-generate-text", generateText, {
      model: openai("chatgpt-4o-latest"),
      system: systemPrompt,
      prompt: userPrompt,
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    });

    await publish(
      openAIChannel().status({
        nodeId,
        status: "success",
      }),
    );

    return {
      ...context,
      [data.variableName]: {
        aiResponse: text,
      },
    };
  } catch (error) {
    await publish(
      openAIChannel().status({
        nodeId,
        status: "error",
      }),
    );

    throw error;
  }
};
