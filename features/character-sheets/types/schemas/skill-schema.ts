import { z } from "zod";

// 補正値のスキーマ
const correctionValueSchema = z.enum(["high", "medium", "low"]);

// 固定スキル（fixed）のスキーマ
// 「fixed」は必ず補正値を選択する
const fixedSkillSchema = z.object({
	skill: z.string(),
	correctionValue: correctionValueSchema,
});

// カスタマイズ可能スキル（customizable）のスキーマ
// 「customizable」はlabel値を入力し、補正値を必ず選択する
const customizableSkillSchema = z.object({
	examples: z.array(z.string()).optional(),
	inputValue: z.string().min(1, "詳細を入力してください"),
	skill: z.string(),
	correctionValue: correctionValueSchema,
});

// その他スキル（other）のスキーマ
// 「other」は必ず補正値を選択する
const otherSkillSchema = z.object({
	label: z.string(),
	correctionValue: correctionValueSchema,
});

// 選択肢スキル（choice）のスキーマ
// 「choice」はcount値の個数示されたスキル一覧から選択する
// 選択したスキルは補正値を必ず選択する
// 示されたスキル一覧に「customizable」がある場合はlabel値を入力する
const choiceSkillSchema = z
	.object({
		count: z.number().int().positive(),
		// 選択されたスキルの配列
		selectedSkills: z.array(
			z.union([fixedSkillSchema, customizableSkillSchema, otherSkillSchema]),
		),
	})
	.refine(
		(data) => data.selectedSkills.length === data.count,
		(data) => ({
			message: `選択するスキルは${data.count}個にしてください。`,
			path: ["selectedSkills"],
		}),
	);

// 自由選択スキル（free_choice）のスキーマ
// 「free choice」はcount値の個数分、全スキルから選択する
// 選択したスキルは補正値を必ず選択する
// 示されたスキル一覧に「customizable」がある場合はlabel値を入力する
const freeChoiceSkillSchema = z
	.object({
		count: z.number().int().positive(),
		// 選択されたスキルの配列
		selectedSkills: z.array(
			z.union([fixedSkillSchema, customizableSkillSchema, otherSkillSchema]),
		),
	})
	.refine(
		(data) => data.selectedSkills.length === data.count,
		(data) => ({
			message: `選択するスキルは${data.count}個にしてください。`,
			path: ["selectedSkills"],
		}),
	);

// スキル定義のユニオン型
export const skillDefinitionSchema = z.union([
	fixedSkillSchema,
	customizableSkillSchema,
	choiceSkillSchema,
	freeChoiceSkillSchema,
	otherSkillSchema,
]);

// スキルフォームのスキーマ
export const skillsFormSchema = z.object({
	skills: z.array(skillDefinitionSchema),
});

// 型定義のエクスポート
export type SkillsFormSchema = z.infer<typeof skillsFormSchema>;
export type FixedSkillSchema = z.infer<typeof fixedSkillSchema>;
export type CustomizableSkillSchema = z.infer<typeof customizableSkillSchema>;
export type ChoiceSkillSchema = z.infer<typeof choiceSkillSchema>;
export type FreeChoiceSkillSchema = z.infer<typeof freeChoiceSkillSchema>;
export type OtherSkillSchema = z.infer<typeof otherSkillSchema>;
export type SkillDefinitionSchema = z.infer<typeof skillDefinitionSchema>;
