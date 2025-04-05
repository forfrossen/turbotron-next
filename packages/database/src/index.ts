import * as schema from "#db/schema";
import { getEnvVariable } from "#utils/get-env-var";
import { createClient } from "@libsql/client";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({ url: getEnvVariable("DB_FILE_NAME") });

export const db = drizzle(client, { schema });
