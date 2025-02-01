import React from "react";
import { Chat } from "@/features/chat/components/chat";
import { DEFAULT_MODEL_NAME, models } from "@/lib/ai/models";
import { generateUUID } from "@/lib/utils";

export default async function ChatPage() {
  const id = generateUUID();
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
