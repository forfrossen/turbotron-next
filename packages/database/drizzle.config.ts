import { getEnvVariable } from "#utils/get-env-var";
import { defineConfig } from "drizzle-kit";

console.log("Loading drizzle config...");
console.log("DATABASE_URL:", process.env.DATABASE_URL);

console.log("ENVIRONMENT VARIABLES: ", process.env);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("DRIZZLE_CONFIG_PATH:", process.env.DRIZZLE_CONFIG_PATH);
console.log("DRIZZLE_OUT:", process.env.DRIZZLE_OUT);
console.log("DRIZZLE_DIALECT:", process.env.DRIZZLE_DIALECT);
console.log("DRIZZLE_SCHEMA:", process.env.DRIZZLE_SCHEMA);
console.log("DRIZZLE_DB_CREDENTIALS:", process.env.DRIZZLE_DB_CREDENTIALS);
console.log("DRIZZLE_DB_CREDENTIALS_URL:", process.env.DRIZZLE_DB_CREDENTIALS_URL);

export default defineConfig({
  out: "./drizzle",
  dialect: "sqlite",
  schema: "src/db/schema.ts",

  dbCredentials: {
    url: getEnvVariable("DATABASE_URL")
  }
});

console.log("Drizzle config loaded successfully");
