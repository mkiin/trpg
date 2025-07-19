import { z } from "zod";

export const basicInfoFormSchema = z.object({
	occupation: z.string(),
	age: z.number(),
	gender: z.enum(["man", "woman", "else"]),
});

export const basicInfoSchema = z
	.object({
		name: z.string(),
		occupation: z.string(),
		age: z.number(),
		gender: z.enum(["man", "woman", "else"]),
		height: z.number(),
		weight: z.number(),
		birthplace: z.string(),
		background: z.string().min(180).max(320),
		behavior: z.string().min(80).max(220),
	})
	.required();

export type BasicInfoFormSchema = z.infer<typeof basicInfoFormSchema>;