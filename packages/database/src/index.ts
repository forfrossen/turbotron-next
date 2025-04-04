import { getEnvVariable } from "#utils/get-env-var";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { pathToFileURL } from "url";

const filename = getEnvVariable("DB_FILE_NAME");

if (!filename) {
  throw new Error("DB_FILE_NAME is required");
}

export const db = drizzle(pathToFileURL(filename).href);
