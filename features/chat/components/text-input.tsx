"use client";

import type { Message, ChatRequestOptions } from "ai";
import type React from "react";
import {
  memo,
  useCallback,
  useEffect,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react";
import { ArrowUpIcon, StopIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { SendButtonProps, StopButtonProps, TextInputProps } from "../types";
import { useWindowSize } from "usehooks-ts";
import { ArrowRight, ArrowUp } from "lucide-react";
function PureTextInput({
  chatId,
  input,
  handleInputChange,
  isLoading,
  messages,
  setMessages,
  handleSubmit,
  stop,
  className,
}: TextInputProps & { className?: string }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${
        textareaRef.current.scrollHeight + 2
      }px`;
    }
  };

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
    <form className="relative flex  w-full md:max-w-3xl">
      <Textarea
        ref={textareaRef}
        placeholder="Send a message..."
        value={input}
        className="min-h-[100px] pr-12 bg-muted resize-none"
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
      <div className="absolute bottom-0 right-0 p-2 w-fit flex flex-row justify-end">
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

export const TextInput = memo(PureTextInput, (prevProps, nextProps) => {
  if (prevProps.input !== nextProps.input) return false;
  if (prevProps.isLoading !== nextProps.isLoading) return false;
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
