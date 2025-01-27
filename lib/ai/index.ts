import { vertex } from "@ai-sdk/google-vertex";

export const customModel = (apiIdentifier: string) => {
  return vertex(apiIdentifier);
};
