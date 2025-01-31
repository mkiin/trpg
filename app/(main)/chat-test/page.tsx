"use client";
import { Textarea } from "@/components/ui/textarea";
import { generateId } from "ai";
import { useChat } from "ai/react";

export default function ChatTestPage() {
  const id = generateId();
  const modelId = "gemini-2.0-flash-exp";
  const { messages, input, error, handleInputChange, handleSubmit } = useChat({
    body: { id, modelId },
  });
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
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

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 w-full max-w-md mb-8 border border-gray-300 rounded shadow-xl">
        <Textarea
          className="w-full p-2"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
