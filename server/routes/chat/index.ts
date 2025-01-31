import { zValidator } from "@hono/zod-validator";
import { stream } from "hono/streaming";

import { createChatSchema } from "./schema";
import { createDataStream, streamText } from "ai";

import { google, vertex } from "@/lib/ai";
import { getMostRecentUserMessage } from "@/lib/utils";
import { Hono } from "hono";
import { ContextVariables } from "@/server/types";

const chatRoute = new Hono<{
  Variables: ContextVariables;
}>();

chatRoute.get("/", async (c) => {
  return c.json({ message: "hello" });
});

chatRoute.post("/", zValidator("json", createChatSchema), async (c) => {
  const receiveData = c.req.valid("json");
  const { id, messages, modelId } = receiveData;
  console.log("receiveData", receiveData);

  const userMessages = getMostRecentUserMessage(messages);

  if (!userMessages) {
    return c.text("No user message found", 404);
  }
  // const chat = await getChatById({ id });
  // if (!chat) {
  //   const title = "test";
  //   const userId = generateUUID();
  //   await saveChat({ id, userId, title });
  // }

  // await saveMessages({
  //   messages: [
  //     { ...userMessages, id: userMessageId, createdAt: new Date(), chatId: id },
  //   ],
  // });

  const dataStream = createDataStream({
    execute: async (dataStreamWriter) => {
      dataStreamWriter.writeData("initialized call");

      const result = streamText({
        model: vertex(""),
        messages: messages,
      });

      result.mergeIntoDataStream(dataStreamWriter);
    },
    onError: (error) => {
      // Error messages are masked by default for security reasons.
      // If you want to expose the error message to the client, you can do so here:
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

export default chatRoute;
