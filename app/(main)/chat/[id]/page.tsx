import React from "react";
import { cookies } from "next/headers";
import { Chat } from "@/features/chat/components/chat";
import { DEFAULT_MODEL_NAME, models } from "@/lib/ai/models";

export default async function ChatPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;
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
