const eslintPluginPrettier = require("eslint-plugin-prettier");
const prettierConfig = require("eslint-config-prettier");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");

/** @type {import("eslint").ESLint.ConfigData[]} */
module.exports = [
    {
        files: ["**/*.ts", "**/*.js"],
        ignores: ["dist/", "node_modules/"],

        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
        },

        plugins: {
            "@typescript-eslint": tsPlugin,
            prettier: eslintPluginPrettier,
        },

        rules: {
            ...tsPlugin.configs.recommended.rules,
            ...prettierConfig.rules,
            "prettier/prettier": "error",
            "@typescript-eslint/no-unused-vars": ["error"],
        },
    },
];
