import {
  CoreAssistantMessage,
  CoreMessage,
  CoreToolMessage,
  Message,
  ToolInvocation,
} from "ai";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type Message as DBMessage } from "@/lib/db/schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMostRecentUserMessage(messages: Array<CoreMessage>) {
  const userMessages = messages.filter((message) => message.role === "user");
  return userMessages.at(-1);
}

/**
 * roleがtoolの場合に、toolInvocationsプロパティのresult更新関数
 */
function addToolMessageToChat({
  toolMessage,
  messages,
}: {
  toolMessage: CoreToolMessage;
  messages: Array<Message>;
}) {
  return messages.map((message) => {
    if (message.toolInvocations) {
      return {
        ...message,
        toolInvocations: message.toolInvocations.map((toolInvocation) => {
          const toolResult = toolMessage.content.find(
            (tool) => tool.toolCallId === toolInvocation.toolCallId
          );
          if (toolResult) {
            return {
              ...toolInvocation,
              state: "result",
              result: toolResult.result,
            };
          }
        }),
      };
    }
  });
}

/**
 * DBから取得したメッセージ配列をUIで表示する用に変換する
 * 型定義参照:https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-chat#usechat
 */
export function convertToUIMessages(
  messages: Array<DBMessage>
): Array<Message> {
  return messages.reduce((chatMessage: Array<Message>, message) => {
    if (message.role === "tool") {
      addToolMessageToChat({
        toolMessage: message as CoreToolMessage,
        messages: chatMessage,
      });
    }

    let textContent = "";
    const toolInvocations: Array<ToolInvocation> = [];

    if (typeof message.content === "string") {
      textContent = message.content;
    } else if (Array.isArray(message.content)) {
      for (const content of message.content) {
        if (content.type === "text") {
          textContent += content.type;
        } else if (content.type === "tool-call") {
          toolInvocations.push({
            state: "call",
            toolCallId: content.toolCallId,
            toolName: content.toolName,
            args: content.args,
          });
        }
      }
    }
    chatMessage.push({
      id: message.id,
      role: message.role as Message["role"],
      content: textContent,
      toolInvocations,
    });

    return chatMessage;
  }, []);
}

/**
 * メッセージ配列内のtoolInvocationを整理する
 */
export function sanitizeUImessage(messages: Array<Message>): Array<Message> {
  const messagesBySanitizedToolInvocations = messages.map((message) => {
    if (message.role !== "assistant") return message;
    if (!message.toolInvocations) return message;

    const toolResultIds: Array<string> = [];

    for (const toolInvocation of message.toolInvocations) {
      if (toolInvocation.state === "result") {
        toolResultIds.push(toolInvocation.toolCallId);
      }
    }

    const sanitizeToolInvocations = message.toolInvocations.filter(
      (toolInvocation) =>
        toolInvocation.state === "result" ||
        toolResultIds.includes(toolInvocation.toolCallId)
    );

    return {
      ...message,
      toolInvocations: sanitizeToolInvocations,
    };
  });

  return messagesBySanitizedToolInvocations.filter(
    (message) =>
      message.content.length > 0 ||
      (message.toolInvocations && message.toolInvocations.length > 0)
  );
}

/**
 * メッセージ配列内のコンテントプロパティについて、tool呼び出しの結果のみを抽出しサニタイズする関数
 */
export function sanitizeResponseMessages(
  messages: Array<CoreToolMessage | CoreAssistantMessage>
): Array<CoreAssistantMessage | CoreToolMessage> {
  const toolResultIds: Array<string> = [];

  for (const message of messages) {
    if (message.role === "tool") {
      for (const content of message.content) {
        if (content.type === "tool-result") {
          toolResultIds.push(content.toolCallId);
        }
      }
    }
  }

  const messagesBySanitizedContent = messages.map((message) => {
    if (message.role !== "assistant") return message;

    if (typeof message.content === "string") return message;

    const sanitizedContent = message.content.filter((content) => {
      return content.type === "tool-call"
        ? toolResultIds.includes(content.toolCallId)
        : content.type === "text"
        ? content.text.length > 0
        : true;
    });

    return {
      ...message,
      content: sanitizedContent,
    };
  });
  return messagesBySanitizedContent.filter(
    (message) => message.content.length > 0
  );
}

export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
