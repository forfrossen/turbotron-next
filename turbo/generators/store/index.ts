import { PlopTypes } from "@turbo/gen";
import { kebab, pascal } from "case";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { mkdir } from "fs/promises";
import { join, resolve } from "path";

// Define absolute paths to ensure correct resolution
const PROJECT_ROOT = resolve(__dirname, "../../../");
const STORE_DIR = resolve(PROJECT_ROOT, "apps/web/store");
const TEMPLATES_DIR = resolve(__dirname, "templates");

// Define interface for the answers object
interface StoreAnswers {
  name: string;
  [key: string]: any;
}

// Define custom action function for directory creation
function createStoreDir(): PlopTypes.CustomActionFunction {
  return async function (answers: unknown) {
    const { name } = answers as StoreAnswers;
    if (!name) return "Store name is required";

    // Convert to kebab case for directory name
    const kebabName = kebab(name);

    const storePath = join(STORE_DIR, kebabName);
    try {
      await mkdir(storePath, { recursive: true });
      return `Created store directory: ${storePath}`;
    } catch (e) {
      return `Failed to create store directory: ${e}`;
    }
  };
}

// Define custom action function for updating the store registry
function updateStoreRegistry(): PlopTypes.CustomActionFunction {
  return function (answers: unknown) {
    const { name } = answers as StoreAnswers;
    if (!name) return "Store name is required";

    // Convert to kebab case for directory/import
    const kebabName = kebab(name);

    const registryPath = join(STORE_DIR, "store-registry.ts");

    // Create the registry file if it doesn't exist
    if (!existsSync(registryPath)) {
      writeFileSync(registryPath, "// Store registry\n", "utf8");
    }

    // Read the current content
    const content = readFileSync(registryPath, "utf8");

    // Convert store name to PascalCase for the export name
    const pascalName = pascal(name);

    // Check if the export is already there
    const exportLine = `export * as ${pascalName}Store from './${kebabName}'`;
    if (content.includes(exportLine)) {
      return `Export for ${pascalName}Store already exists in registry`;
    }

    // Append the new export
    const newContent = content.endsWith("\n")
      ? `${content}${exportLine}\n`
      : `${content}\n${exportLine}\n`;

    writeFileSync(registryPath, newContent, "utf8");

    return `Updated store registry with ${pascalName}Store`;
  };
}

// Define custom action function for the final success message
function successMessage(): PlopTypes.CustomActionFunction {
  return function () {
    return "Store generated successfully!";
  };
}

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // Add kebab helper for filename formatting
  plop.setHelper("kebabCase", (text) => kebab(text));

  plop.setGenerator("store", {
    description: "Generate a new RxJS store module",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the store?",
        validate: (input: string) => {
          if (input.trim() === "") {
            return "Store name is required";
          }

          // Check if store already exists using the kebab-case name
          const storePath = join(STORE_DIR, kebab(input));
          if (existsSync(storePath)) {
            return `Store "${input}" already exists at ${storePath}`;
          }

          return true;
        },
      },
    ],
    actions: [
      // Create store directory
      createStoreDir(),

      // Create state.ts
      {
        type: "add",
        path: join(
          STORE_DIR,
          "{{kebabCase name}}",
          "{{kebabCase name}}.state.ts"
        ),
        templateFile: join(TEMPLATES_DIR, "state.hbs"),
      },

      // Create selectors.ts
      {
        type: "add",
        path: join(
          STORE_DIR,
          "{{kebabCase name}}",
          "{{kebabCase name}}.selectors.ts"
        ),
        templateFile: join(TEMPLATES_DIR, "selectors.hbs"),
      },

      // Create hooks.ts
      {
        type: "add",
        path: join(
          STORE_DIR,
          "{{kebabCase name}}",
          "{{kebabCase name}}.hooks.ts"
        ),
        templateFile: join(TEMPLATES_DIR, "hooks.hbs"),
      },

      // Create index.ts
      {
        type: "add",
        path: join(STORE_DIR, "{{kebabCase name}}", "index.ts"),
        templateFile: join(TEMPLATES_DIR, "index.hbs"),
      },

      // Update store registry
      updateStoreRegistry(),

      // Final message
      successMessage(),
    ],
  });
}
