import { ChatRequestOptions } from "ai";
import { Message } from "ai/react";

export type ChatProps = {
  id: string;
  initialMessages: Array<Message>;
  selectedModelId: string;
};

export type TextInputProps = {
  chatId: string;
  input: string;
  isLoading: boolean;
  handleInputChange: (
    event:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => void;
  stop: () => void;
  messages: Array<Message>;
  setMessages: (
    messages: Array<Message> | ((messages: Message[]) => Message[])
  ) => void;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
};

export type StopButtonProps = Pick<
  TextInputProps,
  "stop" | "messages" | "setMessages"
>;

export type SendButtonProps = Pick<TextInputProps, "input">;
