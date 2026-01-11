import { generateText } from "ai";
import { inngest } from "./client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';

const google = createGoogleGenerativeAI();
const openai = createOpenAI();
const anthropic = createAnthropic();

export const execute = inngest.createFunction(
  {id : 'execute-ai'},
  {event : 'execute/ai'},

  async ({event,step}) => {
    const { steps: geministeps } = await step.ai.wrap("gemini-text-generate",
      generateText, {
        model: google('gemini-2.5-flash'),
        system: 'you are helpful chef',
        prompt: 'lasagnia recipe',
        experimental_telemetry: {                // ? For Sentry   
          isEnabled: true,                      
          recordInputs: true,
          recordOutputs: true,
        },
      }) 

      const { steps: openaisteps } = await step.ai.wrap("openai-text-generate",
        generateText, {
          model: openai("gpt-4"),
          system: 'you are helpful chef',
          prompt: 'lasagnia recipe',
          experimental_telemetry: {             // ? For Sentry
            isEnabled: true,
            recordInputs: true,
            recordOutputs: true,
          },
        }) 

        const { steps : anthropicsteps } = await step.ai.wrap("anthropic-text-generate",
          generateText, {
            model: anthropic('claude-3-7-sonnet-latest'),
            system: 'you are helpful chef',
            prompt: 'lasagnia recipe',
            experimental_telemetry: {             // ? For Sentry
              isEnabled: true,
              recordInputs: true,
              recordOutputs: true,
            },
          }) 

    return {
      geministeps,
      openaisteps,
      anthropicsteps
    };
  }
)