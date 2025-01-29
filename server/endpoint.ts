import factory from "./factory";
import chatRoute from "./routes/chat/index";

const app = factory.createApp().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/chat", chatRoute);

export type AppType = typeof routes;
export default app;
