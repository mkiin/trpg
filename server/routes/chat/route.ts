import { zValidator } from "@hono/zod-validator";
import { stream } from "hono/streaming";

import { createChatSchema } from "./schema";
import { createDataStream, streamText } from "ai";

import { vertex } from "@/lib/ai";
import {
  generateUUID,
  getMostRecentUserMessage,
  sanitizeResponseMessages,
} from "@/lib/utils";
import { Hono } from "hono";
import { ContextVariables } from "@/server/types";
import { getChatById, saveChat, saveMessages } from "@/lib/db/queries";
import { generateTitleFromUserMessage } from "@/features/chat/actions/index";
import { systemPrompt } from "@/lib/ai/prompts";

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

  const chat = await getChatById({ id });
  const userId = "0o7OL5YTTE";

  if (!chat) {
    const title = await generateTitleFromUserMessage({ message: userMessages });
    await saveChat({ id, userId, title });
  }

  const userMessageId = generateUUID();

  // ユーザが送信したメッセージを保存
  await saveMessages({
    messages: [
      {
        ...userMessages,
        id: userMessageId,
        chatId: id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });

  const dataStream = createDataStream({
    execute: async (dataStreamWriter) => {
      dataStreamWriter.writeData({
        type: "user-message-id",
        content: userMessageId,
      });

      const result = streamText({
        model: vertex(modelId),
        messages: messages,
        system: systemPrompt,
        maxSteps: 5,
        onFinish: async ({ response }) => {
          try {
            const responseMessagesWithoutIncompleteToolCalls =
              sanitizeResponseMessages(response.messages);
            await saveMessages({
              messages: responseMessagesWithoutIncompleteToolCalls.map(
                (message) => {
                  const messageId = generateUUID();
                  if (message.role === "assistant") {
                    dataStreamWriter.writeMessageAnnotation({
                      messageIdFromServer: messageId,
                    });
                  }

                  return {
                    id: messageId,
                    chatId: id,
                    role: message.role,
                    content: message.content,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  };
                }
              ),
            });
          } catch (error) {
            console.error(error);
          }
        },
      });

      result.mergeIntoDataStream(dataStreamWriter);
    },
    onError: (error) => {
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
