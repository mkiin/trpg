import React from "react";
import { Chat } from "@/features/chat/components/chat";
import { DEFAULT_MODEL_NAME, models } from "@/lib/ai/models";
import { getChatById, getMessagesByChatId } from "@/lib/db/queries";
import { notFound } from "next/navigation";
import { convertToUIMessages } from "@/lib/utils";

export default async function ChatPage(props: {
  params: Promise<{ id: string }>;
}) {
  const id = (await props.params).id;
  const chat = await getChatById({ id });

  if (!chat) {
    notFound();
  }

  const messagesFromDb = await getMessagesByChatId({ id });
  if (!messagesFromDb) notFound();
  const initialMessages = convertToUIMessages(messagesFromDb);

  const selectedModelId = DEFAULT_MODEL_NAME;

  return (
    <>
      <Chat
        key={id}
        id={id}
        initialMessages={initialMessages}
        selectedModelId={selectedModelId}
      />
    </>
  );
}
