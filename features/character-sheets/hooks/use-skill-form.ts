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
import {
	CategorizedOccupationSkills,
	OCCUPATION_SKILL_MAP,
} from "../constants/occupation-lists";

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

	const rawOccupationSkills = useMemo(() => {
		if (!basicInfo?.occupation) return [];
		// OccupationValue 型にキャストして安全性を高める
		const occupationKey = basicInfo.occupation;
		return OCCUPATION_SKILL_MAP[occupationKey] || [];
	}, [basicInfo?.occupation]);

	const categorizedOccupationSkills = useMemo(() => {
		const categorized: CategorizedOccupationSkills = {
			fixedSkills: [],
			customizableSkills: [],
			choiceSkills: [],
			freeChoiceSkills: [],
			otherSkills: [],
		};

		if (!rawOccupationSkills || rawOccupationSkills.length === 0) {
			return categorized;
		}

		for (const skill of rawOccupationSkills) {
			switch (skill.type) {
				case "fixed":
				case "fixed_specific": // FixedSpecificSkill も fixedSkills に含める
					categorized.fixedSkills.push(skill);
					break;
				case "customizable":
					categorized.customizableSkills.push(skill);
					break;
				case "choice":
					categorized.choiceSkills.push(skill);
					break;
				case "free_choice":
					categorized.freeChoiceSkills.push(skill);
					break;
				case "other":
					categorized.otherSkills.push(skill);
					break;
				default:
					break;
			}
		}
		return categorized;
	}, [rawOccupationSkills]);

	return {
		skills,
		setSkills,
		form,
		fields,
		rawOccupationSkills, // 元の配列も必要であれば返す
		categorizedOccupationSkills, // 分類されたスキルオブジェクト
	};
}
