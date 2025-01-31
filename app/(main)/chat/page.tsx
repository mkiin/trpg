import React from "react";
import { cookies } from "next/headers";
import { Chat } from "@/features/chat/components/chat";
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
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
        selectedModelId={selectedModelId}
      />
    </>
  );
}
