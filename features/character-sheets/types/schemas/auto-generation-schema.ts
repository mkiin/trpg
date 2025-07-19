import { z } from "zod";
import { OCCUPATIONS } from "../../constants/occupation-lists";

// 自動生成フォーム用スキーマ（ユーザーは職業のみ選択）
export const autoGenerationFormSchema = z.object({
	occupation: z
		.string()
		.min(1, "職業を選択してください")
		.refine(
			(val) => OCCUPATIONS.some((occ) => occ.value === val),
			"有効な職業を選択してください",
		),
});

export type AutoGenerationFormData = z.infer<typeof autoGenerationFormSchema>;