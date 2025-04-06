import * as schema from "#db/schema";
import "#dotenv.config";
import { getEnvVariable } from "#utils/get-env-var";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({ url: getEnvVariable("DATABASE_URL") });

export const db = drizzle(client, { schema });
