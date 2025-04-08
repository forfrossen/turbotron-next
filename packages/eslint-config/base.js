import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import drizzlePlugin from "eslint-plugin-drizzle";
import onlyWarn from "eslint-plugin-only-warn";
import turboPlugin from "eslint-plugin-turbo";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export default defineConfig([
  js.configs.recommended,
  eslintConfigPrettier,
  tseslint.configs.recommended,
  {
    files: ["**/*.js, **/*.ts"],
    plugins: {
      js,
      turbo: turboPlugin,
      drizzle: drizzlePlugin
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
      "drizzle/enforce-delete-with-where": "error",
      "drizzle/enforce-update-with-where": "error"
    }
  },
  {
    plugins: {
      onlyWarn
    }
  },
  {
    ignores: ["dist/**"]
  }
]);
