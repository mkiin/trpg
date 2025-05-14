import { useSafeForm } from "@/hooks/use-safe-form";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { useAtom } from "jotai/react";

import {
	basicInfoFormSchema,
	BasicInfoFormSchema,
} from "../types/schemas/basic-info-schema";
import { basicInfoAtom } from "../atoms/character-sheet-atoms";
import { useCharacterSheet } from "./use-character-sheet";

/**
 * 1. useFormによるbasic formの初期化
 * 2. basic formのjotaiのatomのsetterとgetter作成
 */
export function useBasicForm() {
	const [basicInfo, setBasicInfo] = useAtom(basicInfoAtom);
	const { nextStep } = useCharacterSheet();

	const [form, fields] = useSafeForm<BasicInfoFormSchema>({
		constraint: getZodConstraint(basicInfoFormSchema),
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: basicInfoFormSchema });
		},
		shouldValidate: "onSubmit",
		defaultValue: {
			occupation: "",
			age: 0,
			gender: "",
		},
		onSubmit(event) {
			event.preventDefault();
			const formData = new FormData(event.currentTarget);
			const submission = parseWithZod(formData, {
				schema: basicInfoFormSchema,
			});
			if (submission.status === "success") {
				setBasicInfo({
					...basicInfo,
					...submission.value,
				});
				nextStep();
			}
		},
	});
	return {
		form,
		fields,
	};
}
