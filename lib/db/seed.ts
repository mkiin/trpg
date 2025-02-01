import { user } from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";

/**
 * userをランダムに作成する pn db:seedで実行
 */
async function main() {
  const db = drizzle("postgres://postgres:postgres@db:5432/postgres");
  await seed(db, { user });
}

main();
