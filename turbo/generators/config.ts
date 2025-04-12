// Turbo Generator configuration file
import type { PlopTypes } from "@turbo/gen";

// Makes the plopfile the default export
export default function config(plop: PlopTypes.NodePlopAPI) {
  // Load all generators from the subdirectories
  plop.load("./store/index.ts");
}
