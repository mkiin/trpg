import { google, vertex } from "@/lib/ai";
import { createDataStream, streamText } from "ai";
import { Hono } from "hono";
import { stream } from "hono/streaming";

const chatTest = new Hono();

chatTest.post("/", async (c) => {
  const { modelId, messages } = await c.req.json();
  // immediately start streaming the response
  const dataStream = createDataStream({
    execute: async (dataStreamWriter) => {
      dataStreamWriter.writeData("initialized call");

      const result = streamText({
        model: google(modelId),
        prompt: "Invent a new holiday and describe its traditions.",
      });

      result.mergeIntoDataStream(dataStreamWriter);
    },
    onError: (error) => {
      console.error(error);
      return error instanceof Error ? error.message : String(error);
    },
  });

  // Mark the response as a v1 data stream:
  c.header("X-Vercel-AI-Data-Stream", "v1");
  c.header("Content-Type", "text/plain; charset=utf-8");

  return stream(c, (stream) =>
    stream.pipe(dataStream.pipeThrough(new TextEncoderStream()))
  );
});

export { chatTest };
