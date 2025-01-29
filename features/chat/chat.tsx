"use client";

import { TextInput } from "./text-input";
import { useChat } from "ai/react";
import type { Message } from "ai";
import { Messages } from "@/features/message/messages";

export function Chat({
  id,
  initialMessages,
  selectedModelId,
}: {
  id: string;
  initialMessages: Array<Message>;
  selectedModelId: string;
}) {
  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    isLoading,
    stop,
    reload,
  } = useChat({
    id,
    body: { id, modelId: selectedModelId },
    initialMessages,
    experimental_throttle: 500,
  });
  return (
    <div className="flex flex-col min-w-0 h-dvh bg-background">
      <Messages
        chatId={id}
        isLoading={isLoading}
        messages={messages}
        setMessages={setMessages}
        reload={reload}
      />
      <form action="flex mx-auto px-4 w-full md:max-2-3xl bg-background pb-4 md:pb-6 gap-2">
        <TextInput
          chatId={id}
          input={input}
          setInput={setInput}
          messages={messages}
          setMessages={setMessages}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          stop={stop}
        />
      </form>
    </div>
  );
}
