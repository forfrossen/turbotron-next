import { getEnvVariable } from "#get-env-var";
import { defineConfig } from "drizzle-kit";
import path from "path";

export default defineConfig({
  out: "./drizzle",
  dialect: "sqlite",
  schema: "src/db/schema.ts",

  dbCredentials: {
    url: path.normalize(getEnvVariable("DB_FILE_NAME"))
  }
});
