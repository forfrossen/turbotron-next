/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */

const config = {
  experimentalTernaries: true,
  trailingComma: "none",
  "arrow-body-style": ["error", "as-needed"],
  arrowParens: "always",
  bracketSameLine: false,
  bracketSpacing: false,
  endOfLine: "lf",
  experimentalTernaries: true,
  extends: ["prettier", "plugin:prettier/recommended"],
  importOrder: ["^react", "^node", "^express", "<THIRD_PARTY_MODULES>", "^@server/(.*)$", "^@shared/(.*)$", "^[./]"],
  importOrderGroupNamespaceSpecifiers: true,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  jsxSingleQuote: false,
  printWidth: 120,
  proseWrap: "never",
  quoteProps: "as-needed",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  useTabs: false
};

export default config;
