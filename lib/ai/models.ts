type GoogleGenerativeAIModelId =
	| "gemini-2.0-flash-lite-preview-02-05"
	| "gemini-2.0-flash-thinking-exp-01-21"
	| "gemini-2.0-flash-exp"
	| (string & {});

export interface Model {
	id: GoogleGenerativeAIModelId;
	label: string;
}

export const models: Array<Model> = [
	{
		id: "gemini-2.0-flash-lite-preview-02-05",
		label: "Gemini 2.0 Flash Lite Preview 2 05",
	},
	{
		id: "gemini-2.0-flash-thinking-exp-01-21",
		label: "Gemini 2.0 Flash Thinking Exp 01 21",
	},
	{
		id: "gemini-2.0-flash-exp",
		label: "Gemini 2.0 Flash Exp",
	},
] as const;

export const DEFAULT_MODE = models[0];
