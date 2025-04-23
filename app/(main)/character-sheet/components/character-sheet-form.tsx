"use client";

import { useCharacterSheet } from "./character-sheet-context";
import { BasicInfoForm } from "./basic-info-form";
import { AbilitiesForm } from "./abilities-form";
import { SkillsForm } from "./skills-form";
import { ResultView } from "./result-view";
import { CharacterSheetStep } from "../types";

export function CharacterSheetForm() {
  const { currentStep } = useCharacterSheet();

  // 現在のステップに応じたコンポーネントを表示
  const renderStep = () => {
    switch (currentStep) {
      case CharacterSheetStep.BASIC_INFO:
        return <BasicInfoForm />;
      case CharacterSheetStep.ABILITIES:
        return <AbilitiesForm />;
      case CharacterSheetStep.SKILLS:
        return <SkillsForm />;
      case CharacterSheetStep.RESULT:
        return <ResultView />;
      default:
        return <BasicInfoForm />;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">TRPGキャラクターシート作成</h1>

      {/* ステッパー */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <StepIndicator
            step={CharacterSheetStep.BASIC_INFO}
            currentStep={currentStep}
            label="基本情報"
          />
          <StepDivider active={currentStep > CharacterSheetStep.BASIC_INFO} />
          <StepIndicator
            step={CharacterSheetStep.ABILITIES}
            currentStep={currentStep}
            label="能力値"
          />
          <StepDivider active={currentStep > CharacterSheetStep.ABILITIES} />
          <StepIndicator
            step={CharacterSheetStep.SKILLS}
            currentStep={currentStep}
            label="技能"
          />
          <StepDivider active={currentStep > CharacterSheetStep.SKILLS} />
          <StepIndicator
            step={CharacterSheetStep.RESULT}
            currentStep={currentStep}
            label="結果"
          />
        </div>
      </div>

      {/* 現在のステップのフォーム */}
      {renderStep()}
    </div>
  );
}

// ステップインジケーターコンポーネント
function StepIndicator({
  step,
  currentStep,
  label
}: {
  step: CharacterSheetStep;
  currentStep: CharacterSheetStep;
  label: string;
}) {
  const isActive = currentStep >= step;
  const isCurrent = currentStep === step;

  return (
    <div className="flex flex-col items-center">
      <div
        className={`
          w-10 h-10 rounded-full flex items-center justify-center text-white font-bold
          ${isCurrent ? 'bg-blue-600 ring-4 ring-blue-100' : isActive ? 'bg-blue-600' : 'bg-gray-300'}
        `}
      >
        {step + 1}
      </div>
      <div
        className={`
          mt-2 text-sm font-medium
          ${isActive ? 'text-blue-600' : 'text-gray-500'}
        `}
      >
        {label}
      </div>
    </div>
  );
}

// ステップ間の区切り線
function StepDivider({ active }: { active: boolean }) {
  return (
    <div className="flex-1 mx-2">
      <div
        className={`h-1 ${active ? 'bg-blue-600' : 'bg-gray-300'}`}
      ></div>
    </div>
  );
}