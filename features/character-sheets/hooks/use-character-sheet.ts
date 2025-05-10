import { useQueryState, parseAsInteger } from "nuqs";
import {
	CharacterSheetStep,
	CharacterAbilities,
	CharacterSheet,
} from "../types/character-sheet-types";
import { OccupationValue } from "../constants/job-lists";
import { useCallback, useState } from "react";
import {
	generateAbilities,
	generateCharacterSheet,
} from "../actions/generate-character-actions";

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

	// 前のステップに戻る
	const prevStep = useCallback(() => {
		if (currentStep > CharacterSheetStep.BASIC_INFO) {
			setCurrentStep((prev) => prev - 1);
		}
	}, [currentStep, setCurrentStep]);

	// 特定のステップに移動
	const goToStep = useCallback(
		(step: CharacterSheetStep) => {
			setCurrentStep(step);
		},
		[setCurrentStep],
	);

	// 入力値
	const [occupation, setOccupation] = useState<OccupationValue | "">("");
	const [age, setAge] = useState<number>(30);
	const [gender, setGender] = useState<string>("男性");

	// 生成されたデータ
	const [abilities, setAbilities] = useState<CharacterAbilities | null>(null);
	const [characterSheet, setCharacterSheet] = useState<CharacterSheet | null>(
		null,
	);

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
				occupation,
				age,
				gender,
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
	}, [setCurrentStep]);

	return {
		currentStep,
		setCurrentStep: goToStep,
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
		goToStep,
	};
}
