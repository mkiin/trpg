"use client";

import { createContext, useContext, ReactNode } from "react";
import {
  CharacterSheetStep,
  CharacterAbilities,
  CharacterSheet
} from "../types/character-sheet-types";
import { OccupationValue } from "../constants/job-lists";
import { useCharacterSheet } from "../hooks/use-character-sheet";

// コンテキストの型定義
interface CharacterSheetContextType {
  // 現在のステップ
  currentStep: CharacterSheetStep;
  setCurrentStep: (step: CharacterSheetStep) => void;

  // 入力値
  occupation: OccupationValue | "";
  setOccupation: (occupation: OccupationValue | "") => void;
  age: number;
  setAge: (age: number) => void;
  gender: string;
  setGender: (gender: string) => void;

  // 生成されたデータ
  abilities: CharacterAbilities | null;
  setAbilities: (abilities: CharacterAbilities | null) => void;
  characterSheet: CharacterSheet | null;
  setCharacterSheet: (characterSheet: CharacterSheet | null) => void;

  // ローディング状態
  isLoading: boolean;

  // アクション
  generateAbilitiesAction: () => Promise<void>;
  generateCharacterSheetAction: () => Promise<void>;
  resetForm: () => void;

  // ステップ管理
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: CharacterSheetStep) => void;
}

const CharacterSheetContext = createContext<CharacterSheetContextType | undefined>(undefined);

export function CharacterSheetProvider({ children }: { children: ReactNode }) {
  // カスタムフックを使用して状態とアクションを取得
  const characterSheetState = useCharacterSheet();

  return (
    <CharacterSheetContext.Provider value={characterSheetState}>
      {children}
    </CharacterSheetContext.Provider>
  );
}

export function useCharacterSheetContext() {
  const context = useContext(CharacterSheetContext);
  if (context === undefined) {
    throw new Error("useCharacterSheetContext must be used within a CharacterSheetProvider");
  }
  return context;
}