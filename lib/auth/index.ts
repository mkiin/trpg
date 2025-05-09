import { betterAuth } from "better-auth";
import { username, admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db/index"; // your drizzle instance
import { env } from "@/env";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  baseURL: env.BETTER_AUTH_URL,
  plugins: [username(), admin(), nextCookies()],
});
