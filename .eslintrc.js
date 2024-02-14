module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "eslint:recommended",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  ignorePatterns: [
    "*jquery*",
    "*min.js",
    "libs/*",
    "node_modules/*",
    "models/*",
    "*tinymce*",
    "*sandbox-console.js",
    "*howler*",
    "*evo-calendar*",
    "face/js/*",
    "info.js"
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-unused-vars": "off",
    "no-undef": "off"
  },
};
