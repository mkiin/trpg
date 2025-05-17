import { useSafeForm } from "@/hooks/use-safe-form";
import { skillsAtom } from "@/features/character-sheets/atoms/character-sheet-atoms";
import { useAtom } from "jotai/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import {
	skillsFormSchema,
	SkillsFormSchema,
} from "../types/schemas/skill-schema";

export function useSkillForm() {
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

	return {
		skills,
		setSkills,
		form,
		fields,
	};
}
