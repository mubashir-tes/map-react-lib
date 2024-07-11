import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import autoprefixer from "autoprefixer";
import { readFileSync } from "fs";
import postcss from "rollup-plugin-postcss";
const pkgURL = new URL("./package.json", import.meta.url);
const pkg = JSON.parse(readFileSync(pkgURL, "utf8"));
/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: "src/index.jsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
    },
  ],
  external: Object.keys(pkg.peerDependencies),
  plugins: [
    resolve({
      extensions: [".js", ".jsx"],
    }),
    json({
      preferConst: true,
    }),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-react"],
      extensions: [".js", ".jsx"],
    }),
    terser(),
    postcss({ plugins: [autoprefixer()], extract: "index.scss" }),
    commonjs(),
    image(),
  ],
};
export default config;
