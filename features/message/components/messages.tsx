"use client";
import { PreviewMessage, ThinkingMessage } from "./message";
import { memo, useEffect, useRef, useCallback } from "react";
import { useChat } from "ai/react";
import type { ChatProps } from "@/features/shared/shared-chat-types";
import { motion } from "framer-motion";

function PureMessages({ chatId, modelId, initialMessages }: ChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, setMessages, reload, isLoading } = useChat({
    id: chatId,
    body: { id: chatId, modelId },
    initialMessages,
  });

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <div>
      {messages.map((message) => (
        <PreviewMessage key={message.id} message={message} />
      ))}
      {isLoading &&
        messages.length > 0 &&
        messages[messages.length - 1].role === "user" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}>
            <ThinkingMessage />
          </motion.div>
        )}
      <div ref={messagesEndRef} />
    </div>
  );
}

export const Messages = memo(PureMessages);
