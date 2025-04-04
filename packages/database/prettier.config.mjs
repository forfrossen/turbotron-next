import defaultConfig from "@repo/prettier-config";
/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */

const config = {
  ...defaultConfig,
  printWidth: 220
};

export default config;
