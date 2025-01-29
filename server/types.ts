import { db } from "@/lib/db/index";

export type Env = {
  Variables: {
    db: typeof db;
  };
};
