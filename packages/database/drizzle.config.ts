import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const getEnvVariable = (name: string) => {
  const value = process.env[name];
  if (value == null) throw new Error(`environment variable ${name} not found`);
  return value;
};

export default defineConfig({
  out: "./drizzle",
  dialect: "sqlite",
  schema: "./src/db/schemas",

  dbCredentials: {
    url: getEnvVariable("DB_FILE_NAME"),
  },
});
