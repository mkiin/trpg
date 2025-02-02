"use client";

import { createContext, useContext, type ReactNode, useMemo } from "react";
import {
  useChat as useChatOriginal,
  UseChatHelpers,
  UseChatOptions,
} from "ai/react";

// 1. Context の型定義
export interface ChatContextType extends UseChatHelpers {
  id: string;
  selectedModelId: string;
}

// 2. Context の作成 (型引数を設定)
export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

// 3. useChat フック
export function useChat(): ChatContextType {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}

// 4. Provider コンポーネント
export function ChatProvider({
  children,
  ...useChatOptions // ...で残りのオプションをまとめる
}: {
  children: ReactNode;
} & UseChatOptions) {
  const chat = useChatOriginal({
    ...useChatOptions, //オプションをスプレッド構文で渡す
  });

  const contextValue = useMemo<ChatContextType>(
    () => ({
      ...chat),
    [chat, id, selectedModelId]
  );

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
}
