import { useSafeForm } from "@/hooks/use-safe-form";
import { skillsAtom } from "@/features/character-sheets/atoms/character-sheet-atoms";
import { useAtom } from "jotai/react";
import { useMemo } from "react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import {
	skillsFormSchema,
	SkillsFormSchema,
} from "../types/schemas/skill-schema";
import { useBasicForm } from "./use-basic-form";
import { OCCUPATION_SKILL_MAP } from "../constants/occupation-lists";

export function useSkillForm() {
	const { basicInfo } = useBasicForm();

	const [skills, setSkills] = useAtom(skillsAtom); // 生成したスキル値を管理する状態変数
	const [form, fields] = useSafeForm<SkillsFormSchema>({
		id: "skills-form",
		constraint: getZodConstraint(skillsFormSchema),
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: skillsFormSchema });
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
		defaultValue: {},
	});

	// 職業に応じた選択可能なスキルリスト
	const definedOccupationSkills = useMemo(() => {
		if (!basicInfo?.occupation) return [];
		// OccupationValue 型にキャストして安全性を高める
		const occupationKey = basicInfo.occupation;
		return OCCUPATION_SKILL_MAP[occupationKey] || [];
	}, [basicInfo?.occupation]);

	return {
		skills,
		setSkills,
		form,
		fields,
		definedOccupationSkills,
	};
}
