import "server-only";
import { createVertex } from "@ai-sdk/google-vertex/edge";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { env } from "@/env";

export const vertex = createVertex({
  project: env.GOOGLE_VERTEX_PROJECT,
  location: env.GOOGLE_VERTEX_LOCATION,
  googleCredentials: {
    clientEmail: env.GOOGLE_CLIENT_EMAIL,
    privateKey: env.GOOGLE_PRIVATE_KEY,
    privateKeyId: env.GOOGLE_PRIVATE_KEY_ID,
  },
});

export const google = createGoogleGenerativeAI({
  apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY,
});
