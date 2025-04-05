import { getEnvVariable } from "#utils/get-env-var";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  dialect: "sqlite",
  schema: "src/db/schema.ts",

  dbCredentials: {
    url: getEnvVariable("DB_FILE_NAME")
  }
});
