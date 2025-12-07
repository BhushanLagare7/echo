import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import onlyWarn from "eslint-plugin-only-warn";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import simpleImportSort from "eslint-plugin-simple-import-sort";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ["dist/**"],
  },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Frameworks
            ["^react", "^next"],
            // Third-Party Libraries
            ["^[a-z]", "^@\\w"],
            // Internal Aliases (General)
            ["^@/"],
            // Specific for workspace backend
            ["^@workspace/backend"],
            // Specific for workspace ui
            ["^@workspace/ui"],
            // Specific Internal Feature Folders
            ["^@/lib"],
            ["^@/components", "^@/modules"],
            ["^@/utils", "^@/helpers"],
            ["^@/hooks"],
            // Parent Imports
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Sibling Imports
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Side Effect Imports
            ["^\\u0000"],
            // Catch-All
            ["^"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
];
