import { useSafeForm } from "@/hooks/use-safe-form";
import { useQueryState, parseAsInteger } from "nuqs";
import { CharacterSheetStep } from "../types/character-sheet-types";
import { useCallback } from "react";

export function useCharacterSheet() {
	// URLパラメータからステップを取得し、整数として解析
	// デフォルト値としてBASIC_INFOを設定
	const [currentStep, setCurrentStep] = useQueryState(
		"step",
		parseAsInteger.withDefault(CharacterSheetStep.BASIC_INFO),
	);

	// 次のステップへ更新
	const nextStep = useCallback(() => {
		if (currentStep < CharacterSheetStep.RESULT) {
			setCurrentStep((prev) => prev + 1);
		}
	}, [currentStep, setCurrentStep]);

	const prevStep = useCallback(() => {
		if (currentStep > CharacterSheetStep.BASIC_INFO) {
			setCurrentStep((prev) => prev - 1);
		}
	}, [currentStep, setCurrentStep]);

	return { currentStep, prevStep, nextStep };
}
