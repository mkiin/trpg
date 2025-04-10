"use client";

import { memo, useCallback, useRef } from "react"; // Added React import
import { ArrowUpIcon, StopIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { SendButtonProps } from "../types";
import type { ChatProps } from "@/features/shared/shared-chat-types";
import { useChat } from "ai/react";

function PureTextInput({ chatId, modelId }: ChatProps) {
  const { input, handleSubmit, handleInputChange, stop, isLoading } = useChat({
    id: chatId,
    body: { id: chatId, modelId },
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const submitForm = useCallback(() => {
    handleSubmit(undefined);
  }, [handleSubmit]);

  return (
    <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
      <div className="relative w-full flex flex-col gap-4">
        <Textarea
          ref={textareaRef}
          className="resize-none overflow-hidden w-full bg-background p-3 text-sm outline-none border rounded-md focus:ring-2 focus:ring-primary"
          placeholder="メッセージを入力..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              if (!isLoading) {
                submitForm();
              }
            }
          }}
          rows={1}
        />
      </div>
      <div className="flex space-x-2">
        <SendButton
          input={input}
          submitForm={submitForm}
          isLoading={isLoading}
        />
        {isLoading && <StopButton stop={stop} />}
      </div>
    </form>
  );
}

export const TextInput = memo(PureTextInput);

function PureSendButton({
  submitForm,
  input,
  isLoading,
}: SendButtonProps & { submitForm: () => void; isLoading: boolean }) {
  return (
    <Button
      className="bg-primary text-primary-foreground hover:bg-primary/90"
      size="icon"
      onClick={(event) => {
        event.preventDefault();
        submitForm();
      }}
      disabled={input.length === 0 || isLoading}>
      <ArrowUpIcon size={14} />
    </Button>
  );
}

const SendButton = memo(PureSendButton);

function PureStopButton({ stop }: { stop: () => void }) {
  return (
    <Button
      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
      size="icon"
      onClick={(event) => {
        event.preventDefault();
        stop();
      }}>
      <StopIcon size={16} />
    </Button>
  );
}
const StopButton = memo(PureStopButton);
