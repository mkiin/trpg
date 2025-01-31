export interface Model {
  id: string;
  label: string;
  description: string;
}

export const models: Array<Model> = [
  {
    id: "gemini-1.5-flash",
    label: "Gemini 2.0 Flash Experimental",
    description: "Gemini 2.0 Flash Experimental model",
  },
  {
    id: "gemini-1.5-pro",
    label: "Gemini 1.5 Pro",
    description: "Gemini 1.5 Pro model",
  },
] as const;

export type ModelId = (typeof models)[number]["id"];

export const DEFAULT_MODEL_NAME = "gemini-1.5-flash";
