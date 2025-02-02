import React from "react";
import { DEFAULT_MODEL_NAME } from "@/lib/ai/models";
import { generateUUID } from "@/lib/utils";
import { Messages } from "@/features/message/components/messages";
import { TextInput } from "@/features/chat/components/text-input";

export default async function ChatPage() {
  const id = generateUUID();
  const selectedModelId = DEFAULT_MODEL_NAME;

  return (
    <>
      <div className="@container/thread flex-1 overflow-hidden">
        <Messages chatId={id} modelId={selectedModelId} />
      </div>
      <div className="relative z-10 flex w-full flex-col bg-background mx-auto max-w-3xl px-2 sm:px-3 md:px-4 pb-0 sm:pb-0 md:pb-0">
        <TextInput chatId={id} modelId={selectedModelId} />
      </div>
    </>
  );
}
