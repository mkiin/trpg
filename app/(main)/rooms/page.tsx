import React from "react";
import { DEFAULT_MODE } from "@/lib/ai/models";
import { generateUUID } from "@/lib/utils";
import { Messages } from "@/features/message/components/messages";
import { TextInput } from "@/features/chat/components/text-input";
import ChatPageHeader from "@/features/chat/components/chat-header";

export default async function ChatPage() {
  const id = generateUUID();
  const selectedModelId = DEFAULT_MODE;
  console.log(selectedModelId);

  return (
    <>
      <div className="flex flex-col min-w-0 h-svh bg-background">
        <ChatPageHeader />
        <Messages chatId={id} modelId={selectedModelId} />
        <TextInput chatId={id} modelId={selectedModelId} />
      </div>
    </>
  );
}
