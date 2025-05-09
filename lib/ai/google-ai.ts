import "server-only";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { env } from "@/env";

export const google = createGoogleGenerativeAI({
	apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
});
