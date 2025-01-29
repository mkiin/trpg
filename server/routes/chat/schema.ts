import { z } from "zod";
import { CoreMessage } from "ai";
import type { ModelId } from "@/lib/ai/models";

export const createChatSchema = z.object({
  id: z.string(),
  messages: z.record(z.any()).transform((v) => v as CoreMessage[]),
  modelId: z.string().refine((v) => v as ModelId),
});
