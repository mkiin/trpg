import { useSafeForm } from "@/hooks/use-safe-form";
import { skillsAtom } from "@/features/character-sheets/atoms/character-sheet-atoms";
import { useAtom } from "jotai/react";

export function useSkillForm() {
	const [skills, setSkills] = useAtom(skillsAtom);
	const [form, fields] = useSafeForm<skillsFormSchema>({
		id: "skills-form",
		constraint: getZodConstraint(skillsFormSchema),
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: skillsFormSchema });
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
		onSubmit(event, context) {
			event.preventDefault();
			if (context.submission && context.submission.status === "success") {
				setSkills({
					...skills,
					...context.submission.value,
				});
			}
		},
	});

	return {
		skills,
		setSkills,
		form,
		fields,
	};
}
