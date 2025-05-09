import { zValidator } from "@hono/zod-validator";
import { stream } from "hono/streaming";

import { createChatSchema } from "./schema";
import { createDataStream, smoothStream, streamText } from "ai";

import { google, vertex } from "@/lib/ai/google-ai";
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

chatRoute.post("/", zValidator("json", createChatSchema), async (c) => {
	const receiveData = c.req.valid("json");
	const { id, messages, modelId } = receiveData;

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

	const result = streamText({
		model: google(modelId),
		messages: messages,
		system: systemPrompt,
		experimental_transform: smoothStream({ chunking: "word" }),
	});

	// Mark the response as a v1 data stream:
	c.header("X-Vercel-AI-Data-Stream", "v1");
	c.header("Content-Type", "text/plain; charset=utf-8");

	return stream(c, (stream) => stream.pipe(result.toDataStream()));
});

export default chatRoute;
