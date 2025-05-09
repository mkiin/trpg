import { z } from "zod";

export const basicInfoSchema = z
	.object({
		name: z.string(),
		occupation: z.string(),
		age: z.number(),
		gender: z.enum(["man", "woman"]),
		height: z.number(),
		weight: z.number(),
		birthplace: z.string(),
		background: z.string().min(200).max(300),
		behavior: z.string().min(100).max(200),
	})
	.required();
