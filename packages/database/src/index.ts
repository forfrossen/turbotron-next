import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";

const getEnvVariable = (name: string) => {
  const value = process.env[name];
  if (value == null) throw new Error(`environment variable ${name} not found`);
  return value;
};

export const db = drizzle(process.env.DB_FILE_NAME!);
