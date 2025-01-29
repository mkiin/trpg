export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
}

export const models: Array<Model> = [
  {
    id: "gemini-2.0-flash-exp",
    label: "Gemini 2.0 Flash Experimental",
    apiIdentifier: "gemini-2.0-flash-exp",
    description: "Gemini 2.0 Flash Experimental model",
  },
  {
    id: "Gemini 1.5 Pro",
    label: "Gemini 1.5 Pro",
    apiIdentifier: "gemini-1.5-pro",
    description: "Gemini 1.5 Pro model",
  },
] as const;

export type ModelId = (typeof models)[number]["id"];

export const DEFAULT_MODEL_NAME = "gemini-2.0-flash-exp";
