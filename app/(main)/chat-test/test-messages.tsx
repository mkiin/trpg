"use client";
import { useChat } from "ai/react";

export function TestMessages({ id, modelId }: { id: string; modelId: string }) {
  const { messages, error } = useChat({
    id,
    api: "/api/chat-test",
    body: {
      id,
      modelId,
    },
  });
  return (
    <>
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}
      {error && (
        <>
          <div className="">{error.name}</div>
          <div className="">{error.message}</div>
        </>
      )}
    </>
  );
}
