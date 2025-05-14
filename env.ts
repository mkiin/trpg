import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		NODE_ENV: z.enum(["development", "production"]),
		POSTGRES_URL: z.string(),
		BETTER_AUTH_SECRET: z.string(),
		BETTER_AUTH_URL: z.string().url(),
		GOOGLE_GENERATIVE_AI_API_KEY: z.string(),
	},
	client: {
		NEXT_PUBLIC_APP_URL: z.string().url(),
	},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		POSTGRES_URL: process.env.POSTGRES_URL,
		BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
		BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
		GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
	},
});
