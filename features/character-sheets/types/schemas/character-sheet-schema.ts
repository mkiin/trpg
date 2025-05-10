import { z } from "zod";

export const characterSheetSchema = z.object({
	// basic info
	occupation: z.string().min(1, "職業を選択してください"),
	age: z.number({ required_error: "年齢を入力してください" }),
	gender: z.enum(["man", "woman", "else"]),
	// abilities
});
