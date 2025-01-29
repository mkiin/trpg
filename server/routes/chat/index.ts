import factory from "../../factory";
import { zValidator } from "@hono/zod-validator";
import { stream } from "hono/streaming";

import { createChatSchema } from "./schema";
import { createDataStream, smoothStream, streamText } from "ai";

import { customModel } from "@/lib/ai";
import { generateUUID, getMostRecentUserMessage } from "@/lib/utils";
import { vertex } from "@ai-sdk/google-vertex";

const chatRoute = factory.createApp();

chatRoute.get("/", async (c) => {
  return c.json({ message: "hello" });
});

chatRoute.post("/", async (c) => {
  const receiveData = c.req;
  const { id, messages, modelId } = receiveData;

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

  const userMessageId = generateUUID();

  // await saveMessages({
  //   messages: [
  //     { ...userMessages, id: userMessageId, createdAt: new Date(), chatId: id },
  //   ],
  // });

  const dataStream = createDataStream({
    execute: async (dataStreamWriter) => {
      dataStreamWriter.writeData({
        type: "user-message-id",
        content: userMessageId,
      });
      const result = streamText({
        model: vertex(modelId),
        system: "Invent a new holiday and describe its traditions.",
        messages: messages,
        maxSteps: 5,
        experimental_transform: smoothStream({ chunking: "word" }),
      });
      result.mergeIntoDataStream(dataStreamWriter);
    },
    onError: (error) => {
      return error instanceof Error ? error.message : String(error);
    },
  });
  c.header("X-Vercel-AI-Data-Stream", "v1");
  c.header("Content-Type", "text/plain; charset=utf-8");

  return stream(c, (stream) =>
    stream.pipe(dataStream.pipeThrough(new TextEncoderStream()))
  );
});

export default chatRoute;
