import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  /* Ignore build + generated files */
  globalIgnores([
    "dist",
    "node_modules",
    ".vite",
    "*.config.js",
    "*.config.ts",
  ]),

  {
    files: ["**/*.{ts,tsx}"],

    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    rules: {
      /* ----------------------------------
       * React / Hooks
       * ---------------------------------- */
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      /* Disable noisy rule (shadcn/ui compatible) */
      "react-refresh/only-export-components": "off",

      /* ----------------------------------
       * TypeScript rules (balanced strictness)
       * ---------------------------------- */
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-empty-object-type": "off",

      /* ----------------------------------
       * General quality rules
       * ---------------------------------- */
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",
      "no-unused-expressions": "off",
    },
  },
]);
