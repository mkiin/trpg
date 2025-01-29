import { createFactory } from "hono/factory";
import { Env } from "./types";
import { db } from "@/lib/db";

export default createFactory<Env>({
  initApp: (app) => {
    app.use(async (c, next) => {
      c.set("db", db);
      await next();
    });
  },
});
