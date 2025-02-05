import { defineConfig } from "drizzle-kit";
import { env } from "@/env";

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://postgres:password@db:5432/postgres",
  },
});
