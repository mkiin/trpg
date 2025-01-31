import chatRoute from "./routes/chat/index";
import { Hono } from "hono";
import { ContextVariables } from "./types";
import { auth } from "@/lib/betterauth";

const app = new Hono<{
  Variables: ContextVariables;
}>().basePath("/api");

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) {
    c.set("session", null);
    c.set("user", null);
    return next();
  }
  c.set("session", session.session);
  c.set("user", session.user);
});

app.on(["GET", "POST"], "/auth/*", (c) => auth.handler(c.req.raw));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/chat", chatRoute);

export type AppType = typeof routes;
export default app;
