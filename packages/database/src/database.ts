import * as schema from "#db/schemas/index";
import { createClient } from "@libsql/client";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql/node";

const getEnvVariable = (name: string) => {
  const value = process.env[name];
  if (value == null) throw new Error(`environment variable ${name} not found`);
  return value;
};

export const client = createClient({ url: getEnvVariable("DB_FILE_NAME") });

export const db = drizzle(client, { schema });
