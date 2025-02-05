import { type UseChatOptions } from "ai/react";
export type ChatProps = {
  chatId: string;
  modelId: string;
} & UseChatOptions;
