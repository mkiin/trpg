import { z } from "zod";

export const createChatSchema = z.object({
  id: z.string(),
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string(),
      id: z.string().optional(),
      createdAt: z.string().optional(),
      experimental_attachments: z.array(z.any()).optional(),
      data: z.any().optional(),
      annotations: z.any().optional(),
      toolInvocations: z.array(z.any()).optional(),
    })
  ),
  modelId: z.string(), // modelIdは例として追加
});
