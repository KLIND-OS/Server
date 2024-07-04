import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      "**/*jquery*",
      "**/*min.js",
      "libs/*",
      "node_modules/*",
      "models/*",
      "**/*tinymce*",
      "**/*sandbox-console.js",
      "**/*howler*",
      "**/*evo-calendar*",
      "face/js/*",
      "**/info.js",
      "base64.js",
      "eslint.config.mjs"
    ],
  },
  ...compat.extends("eslint:recommended"),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      ecmaVersion: "latest",
      sourceType: "script",
    },

    rules: {
      indent: ["error", 2],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "no-unused-vars": "off",
      "no-undef": "off",
    },
  },
  {
    files: ["**/.eslintrc.{js,cjs}"],

    languageOptions: {
      globals: {
        ...globals.node,
      },

      ecmaVersion: 5,
      sourceType: "commonjs",
    },
  },
];
