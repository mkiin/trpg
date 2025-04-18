"use client";

import { TextInput } from "./text-input";
import { useChat } from "ai/react";
import { Messages } from "@/features/message/components/messages";
import { ChatProps } from "../types";

export function Chat({ id, initialMessages, selectedModelId }: ChatProps) {
  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    handleInputChange,
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
    <>
      <Messages
        chatId={id}
        isLoading={isLoading}
        messages={messages}
        setMessages={setMessages}
        reload={reload}
      />
      <TextInput
        chatId={id}
        input={input}
        handleInputChange={handleInputChange}
        isLoading={isLoading}
        stop={stop}
        messages={messages}
        setMessages={setMessages}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
