"use client";
import { PreviewMessage, ThinkingMessage } from "./message";
import { memo } from "react";
import { useChat } from "ai/react";
import type { ChatProps } from "@/features/shared/shared-chat-types";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";

function PureMessages({ chatId, modelId, initialMessages }: ChatProps) {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();
  const { messages, setMessages, reload, isLoading } = useChat({
    id: chatId,
    body: { id: chatId, modelId },
    initialMessages,
  });

  return (
    <div
      className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4"
      ref={messagesContainerRef}>
      {messages.map((message) => (
        <PreviewMessage
          key={message.id}
          message={message}
          setMessages={setMessages}
          reload={reload}
        />
      ))}
      {isLoading &&
        messages.length > 0 &&
        messages[messages.length - 1].role === "user" && <ThinkingMessage />}
      <div
        ref={messagesEndRef}
        className="shrink-0 min-w-[24px] min-h-[24px]"
      />
    </div>
  );
}

export const Messages = memo(PureMessages);
