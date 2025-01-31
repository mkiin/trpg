import React from "react";
import { cookies } from "next/headers";
import { Chat } from "@/features/chat/chat";
import { DEFAULT_MODEL_NAME, models } from "@/lib/ai/models";
import { generateUUID } from "@/lib/utils";

export default async function ChatPage() {
  const id = generateUUID();
  const cookiesStore = await cookies();
  const modelIdFromCookie = cookiesStore.get("model-id")?.value;
  const selectedModelId =
    models.find((model) => model.id === modelIdFromCookie)?.id ??
    DEFAULT_MODEL_NAME;

  return (
    <>
      <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
        <Chat
          key={id}
          id={id}
          initialMessages={[]}
          selectedModelId={selectedModelId}
        />
      </div>
    </>
  );
}
