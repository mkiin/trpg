import React from "react";
import { Chat } from "@/features/chat/components/chat";
import { DEFAULT_MODEL_NAME, models } from "@/lib/ai/models";
import { generateId } from "ai";

export default async function ChatPage() {
  const id = generateId();
  const selectedModelId = DEFAULT_MODEL_NAME;

  return (
    <>
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
        selectedModelId={selectedModelId}
      />
    </>
  );
}
