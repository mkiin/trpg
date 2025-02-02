"use client";
import { PreviewMessage, ThinkingMessage } from "./message";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { memo } from "react";
import { useChat } from "ai/react";
import { MessProps } from "../types";

function PureMessages({ chatId, modelId }: MessProps) {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();
  const { messages, setMessages, reload, isLoading } = useChat({
    id: chatId,
    body: { id: chatId, modelId },
  });

  return (
    <div
      ref={messagesContainerRef}
      className="flex flex-col gap-6 flex-1 overflow-y-scroll pt-4">
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

export const Messages = memo(PureMessages, () => {
  return true;
});
