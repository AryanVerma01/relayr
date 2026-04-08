import { NodeExecutor } from "@/features/execution/types";
import { NonRetriableError } from "inngest";
import ky, { type Options } from "ky";
import Handlebars, { SafeString } from "handlebars";
import { httpRequestChannel } from "@/inngest/channel/http-request";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  return new Handlebars.SafeString(jsonString);
});

type HttpRequestData = {
  endpoint: string;
  method: "POST" | "GET" | "DELETE" | "PUT" | "PATCH";
  variableName?: string;
  body?: string;
};

export const HttpRequestExecutor: NodeExecutor<HttpRequestData> = async ({
  data,
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish(
    httpRequestChannel().status({
      nodeId: nodeId,
      status: "loading",
    }),
  );

  if (!data.endpoint) {
    await publish(
      httpRequestChannel().status({
        nodeId: nodeId,
        status: "error",
      }),
    );
    throw new NonRetriableError(`HTTP Request Node: No endpoint configured`);
  }

  if (!data.variableName) {
    await publish(
      httpRequestChannel().status({
        nodeId: nodeId,
        status: "error",
      }),
    );
    throw new NonRetriableError(
      `HTTP Request Node: Variable Name not Configured`,
    );
  }

  if (!data.method) {
    await publish(
      httpRequestChannel().status({
        nodeId: nodeId,
        status: "error",
      }),
    );
    throw new NonRetriableError(`HTTP Request Node: Method not configured`);
  }

  const variableName = data.variableName;

  const result = await step.run(`http-request-${nodeId}`, async () => {
    const rawEndpoint = Handlebars.compile(data.endpoint)(context).trim();
    const endpoint = rawEndpoint.replace(/[.,;:!?]+$/, "");
    const method = data.method || "GET";
    const options: Options = { method };

    console.log("--- HTTP Request Debug ---");
    console.log("Raw Template:", data.endpoint);
    console.log("Context Keys:", Object.keys(context));
    console.log("Resolved URL (before sanitize):", `|${rawEndpoint}|`);
    console.log("Resolved URL (after sanitize):", `|${endpoint}|`);
    console.log("Method:", method);

    // Validate the resolved URL
    try {
      new URL(endpoint);
    } catch {
      throw new NonRetriableError(
        `HTTP Request Node: Invalid URL after template resolution: "${endpoint}"`,
      );
    }

    if (["POST", "PUT", "PATCH"].includes(method) && data.body) {
      const resolved = Handlebars.compile(data.body || "{}")(context);
      options.body = resolved;
      options.headers = {
        "Content-Type": "application/json",
      };
      console.log("Parsed Body:", resolved);
    }

    console.log("Final Options:", JSON.stringify(options, null, 2));

    const response = await ky(endpoint, options);
    const contentType = response.headers.get("content-type");
    const responseData = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();

    const responsePayload = {
      httpResponse: {
        status: response.status,
        statusText: response.statusText,
        data: responseData,
      },
    };

    return {
      ...context,
      [variableName]: responsePayload,
    };
  });

  await publish(
    httpRequestChannel().status({
      nodeId: nodeId,
      status: "success",
    }),
  );

  return result;
};
