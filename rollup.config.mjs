import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import replaceStr from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import url from "@rollup/plugin-url";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import fs from "fs";
import postcssUrl from "postcss-url";
import postcssPlugin from "rollup-plugin-postcss";
const pkgURL = new URL("./package.json", import.meta.url);
const pkg = JSON.parse(fs.readFileSync(pkgURL, "utf8"));
/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: "src/index.jsx",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      // sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      // sourcemap: true,
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
    }),
    replaceStr({
      preventAssignment: true,
      values: {
        "use client": "",
        "process.env.NODE_ENV": process.env.NODE_ENV,
      },
    }),
    url({
      include: [
        "**/*.svg",
        "**/*.png",
        "**/*.jpg",
        "**/*.gif",
        "**/*.woff",
        "**/*.woff2",
        "**/*.ttf",
      ],
      limit: 8192,
      emitFiles: true,
      fileName: "[name][hash][extname]",
    }),
    terser({
      compress: true,
      format: {
        semicolons: true,
      },
    }),
    postcssPlugin({
      plugins: [
        autoprefixer(),
        postcssUrl({ url: "inline" }),
        cssnano({ preset: "default" }),
      ],
      extract: true,
      extensions: [".css", ".scss", ".less", ".stylus"],
      // sourceMap: "inline",
    }),
    commonjs({
      transformMixedEsModules: true,
      ignoreGlobal: true,
    }),
    image(),
  ],
};
export default config;
