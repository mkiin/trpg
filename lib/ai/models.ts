export interface Model {
  id: string;
  label: string;
  description: string;
}

export const models: Array<Model> = [
  {
    id: "gemini-2.0-flash-001",
    label: "Gemini 2.0 Flash",
    description: "Gemini 2.0 Flash",
  },
  {
    id: "gemini-2.5-pro-exp-03-25",
    label: "Gemini 2.5 pro Experimental",
    description: "Gemini 2.5 pro Experimental model",
  },
] as const;

export type ModelId = (typeof models)[number]["id"];

export const DEFAULT_MODEL_NAME = "gemini-1.5-flash";
