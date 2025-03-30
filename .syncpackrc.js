// @ts-check

/** @type {import("syncpack").RcFile} */
const config = {
  sortPackages: true,
  versionGroups: [
    {
      label: "Use workspace protocol when developing local packages",
      dependencies: ["@repo/*"],
      dependencyTypes: ["dev", "prod"],
      pinVersion: "workspace:*",
    },
  ],

  sortFirst: [
    "name",
    "description",
    "version",
    "author",
    "private",
    "type",
    "prettier",
    "imports",
    "exports",
    "scripts",
    "packageManager",
    "pnpm",
    "engines",
    "dependencies",
    "devDependencies",
    "peerDependencies",
  ],

  sortAz: [
    "bin",
    "contributors",
    "dependencies",
    "devDependencies",
    "keywords",
    "peerDependencies",
    "resolutions",
    "scripts",
  ],

  sortExports: [
    "types",
    "node-addons",
    "node",
    "browser",
    "import",
    "require",
    "development",
    "production",
    "default",
  ],
};

module.exports = config;
