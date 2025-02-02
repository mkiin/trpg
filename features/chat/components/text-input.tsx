"use client";

import type React from "react";
import { memo, useCallback, useRef } from "react";
import { ArrowUpIcon, StopIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { SendButtonProps, StopButtonProps } from "../types";
import { MessProps } from "@/features/message/types";
import { useChat } from "ai/react";

function PureTextInput({ chatId, modelId }: MessProps) {
  const {
    input,
    messages,
    setMessages,
    handleSubmit,
    handleInputChange,
    stop,
    isLoading,
  } = useChat({
    id: chatId,
    body: { id: chatId, modelId },
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const wrapHandleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      handleInputChange(event);
    },
    [handleInputChange]
  );

  const submitForm = useCallback(() => {
    window.history.replaceState({}, "", `/chat/${chatId}`);
    handleSubmit();
  }, [chatId, handleSubmit]);

  return (
    <form className="w-full bottom-0 max-w-md mb-8 border border-gray-300 rounded shadow-xl">
      <Textarea
        className="resize-none"
        placeholder="Send a message..."
        value={input}
        onChange={wrapHandleOnChange}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            if (isLoading) {
              console.log("Loading...");
            } else {
              submitForm();
            }
          }
        }}
      />
      <div className="flex items-center justify-between sm:mt-5 mb-2 mt-1">
        {isLoading ? (
          <StopButton
            stop={stop}
            messages={messages}
            setMessages={setMessages}
          />
        ) : (
          <SendButton input={input} submitForm={submitForm} />
        )}
      </div>
    </form>
  );
}

export const TextInput = memo(PureTextInput, () => {
  return true;
});

function PureSendButton({
  submitForm,
  input,
}: SendButtonProps & { submitForm: () => void }) {
  return (
    <Button
      className=""
      onClick={(event) => {
        event.preventDefault();
        submitForm();
      }}
      disabled={input.length === 0}>
      <ArrowUpIcon size={14} />
    </Button>
  );
}

const SendButton = memo(PureSendButton, (prevProps, nextProps) => {
  if (prevProps.input !== nextProps.input) return false;
  return true;
});

function PureStopButton({ stop, messages, setMessages }: StopButtonProps) {
  return (
    <Button
      onClick={(event) => {
        event.preventDefault();
        stop();
        setMessages(messages);
      }}>
      <StopIcon size={16} className="" />
    </Button>
  );
}
const StopButton = memo(PureStopButton);
