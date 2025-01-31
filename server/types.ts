import type { Session, User } from "better-auth";

export type ContextVariables = {
  session: Session | null;
  user: User | null;
};
