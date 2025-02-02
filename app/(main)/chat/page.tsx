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
      <div className="flex-1 overflow-hidden  @container/thread">
        <Messages chatId={id} modelId={selectedModelId} />
      </div>
      <div className="flex flex-1 gap-4 text-base md:gap-5 mx-auto w-full lg:gap-6 md:max-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
        <TextInput chatId={id} modelId={selectedModelId} />
      </div>
    </>
  );
}
