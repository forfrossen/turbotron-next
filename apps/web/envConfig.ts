import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
console.debug("projectDir: ", projectDir);
loadEnvConfig(projectDir);
