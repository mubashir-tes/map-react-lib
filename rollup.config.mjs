import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import replaceStr from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import fs from "fs";
import postcssUrl from "postcss-url";
import postcssPlugin from "rollup-plugin-postcss";
const pkgURL = new URL("./package.json", import.meta.url);
const pkg = JSON.parse(fs.readFileSync(pkgURL, "utf8"));
const sourcemap = process.env.SOURCEMAP === "true";
/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: "src/index.jsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: sourcemap ? "inline" : false,
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: sourcemap ? "inline" : false,
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
      exclude: /node_modules/,
      sourceMaps: sourcemap ? "inline" : false,
    }),
    replaceStr({
      preventAssignment: true,
      values: {
        "use client": "",
        "process.env.NODE_ENV": JSON.stringify("production"),
      },
    }),
    terser({
      compress: true,
      format: {
        semicolons: true,
      },
      sourceMap: sourcemap ? true : false,
    }),
    postcssPlugin({
      plugins: [
        autoprefixer(),
        postcssUrl({ url: "inline" }),
        cssnano({ preset: "default" }),
      ],
      extract: true,
      extensions: [".css", ".scss", ".less", ".stylus"],
      sourceMap: sourcemap ? "inline" : false,
    }),
    commonjs({
      transformMixedEsModules: true,
      ignoreGlobal: true,
      sourceMap: sourcemap ? true : false,
    }),
    image(),
  ],
};
export default config;
