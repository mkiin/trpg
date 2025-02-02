"use client";
import { useChat } from "ai/react";
import { Textarea } from "@/components/ui/textarea";

export function TestInput({ id, modelId }: { id: string; modelId: string }) {
  const { input, handleSubmit, handleInputChange } = useChat({
    id,
    api: "/api/chat-test",
    body: {
      id,
      modelId,
    },
  });
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 w-full max-w-md mb-8 border border-gray-300 rounded shadow-xl">
        <Textarea
          className="w-full p-2 resize-none"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
