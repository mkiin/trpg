"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback
} from "react";
import {
  CharacterSheet,
  CharacterSheetStep,
  CharacterAbilities,
  Occupation
} from "../types/character-sheet-types";
import { generateAbilities, generateCharacterSheet } from "../actions/generate-character-actions";

interface CharacterSheetContextType {
  // 現在のステップ
  currentStep: CharacterSheetStep;
  setCurrentStep: (step: CharacterSheetStep) => void;

  // 入力値
  occupation: Occupation | "";
  setOccupation: (occupation: Occupation | "") => void;
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
  // 現在のステップ
  const [currentStep, setCurrentStep] = useState<CharacterSheetStep>(CharacterSheetStep.BASIC_INFO);

  // 入力値
  const [occupation, setOccupation] = useState<Occupation | "">("");
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<string>("男性");

  // 生成されたデータ
  const [abilities, setAbilities] = useState<CharacterAbilities | null>(null);
  const [characterSheet, setCharacterSheet] = useState<CharacterSheet | null>(null);

  // ローディング状態
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 能力値を生成するアクション
  const generateAbilitiesAction = useCallback(async () => {
    const newAbilities = await generateAbilities();
    setAbilities(newAbilities);
  }, []);

  // キャラクターシートを生成するアクション
  const generateCharacterSheetAction = useCallback(async () => {
    if (!occupation) return;

    setIsLoading(true);
    try {
      const newCharacterSheet = await generateCharacterSheet(
        occupation as Occupation,
        age,
        gender
      );
      setCharacterSheet(newCharacterSheet);
      setIsLoading(false);
    } catch (error) {
      console.error("Error generating character sheet:", error);
      setIsLoading(false);
    }
  }, [occupation, age, gender]);

  // フォームをリセットするアクション
  const resetForm = useCallback(() => {
    setCurrentStep(CharacterSheetStep.BASIC_INFO);
    setOccupation("");
    setAge(30);
    setGender("男性");
    setAbilities(null);
    setCharacterSheet(null);
  }, []);

  // 次のステップに進む
  const nextStep = useCallback(() => {
    if (currentStep < CharacterSheetStep.RESULT) {
      setCurrentStep((prev) => (prev + 1) as CharacterSheetStep);
    }
  }, [currentStep]);

  // 前のステップに戻る
  const prevStep = useCallback(() => {
    if (currentStep > CharacterSheetStep.BASIC_INFO) {
      setCurrentStep((prev) => (prev - 1) as CharacterSheetStep);
    }
  }, [currentStep]);

  // 特定のステップに移動
  const goToStep = useCallback((step: CharacterSheetStep) => {
    setCurrentStep(step);
  }, []);

  const value = {
    currentStep,
    setCurrentStep,
    occupation,
    setOccupation,
    age,
    setAge,
    gender,
    setGender,
    abilities,
    setAbilities,
    characterSheet,
    setCharacterSheet,
    isLoading,
    generateAbilitiesAction,
    generateCharacterSheetAction,
    resetForm,
    nextStep,
    prevStep,
    goToStep
  };

  return (
    <CharacterSheetContext.Provider value={value}>
      {children}
    </CharacterSheetContext.Provider>
  );
}

export function useCharacterSheet() {
  const context = useContext(CharacterSheetContext);
  if (context === undefined) {
    throw new Error("useCharacterSheet must be used within a CharacterSheetProvider");
  }
  return context;
}