import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "url";

const compat = new FlatCompat({
  baseDirectory: fileURLToPath(new URL(".", import.meta.url)),
  recommendedConfig: true,
});
export default compat.config({
  plugins: ["jsx-a11y", "promise", "react", "react-hooks", "unicorn"],
  rules: {
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "promise/always-return": "error",
    "promise/catch-or-return": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
  ignorePatterns: ["dist", "node_modules", "example", "banner.*", "config.*"],
  root: true,
  parser: "@babel/eslint-parser",
  globals: {},
  parserOptions: {
    requireConfigFile: false,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
});
