import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import replaceStr from "@rollup/plugin-replace";
import terser from "@rollup/plugin-terser";
import url from "@rollup/plugin-url";
import { createFilter } from "@rollup/pluginutils";
import autoprefixer from "autoprefixer";
import fs from "fs";
import path from "path";
import postcssPlugin from "rollup-plugin-postcss";
const pkgURL = new URL("./package.json", import.meta.url);
const pkg = JSON.parse(fs.readFileSync(pkgURL, "utf8"));
const encodeImage = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  const data = fs.readFileSync(filePath);
  const encodeToBase64 = Buffer.from(data).toString("base64");
  const svgPath = `data:image/svg+xml;base64,${encodeToBase64}`;
  const otherPath = `data:image/${ext.substring(1)};base64,${encodeToBase64}`;
  return ext === ".svg" ? svgPath : otherPath;
};
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
    terser({ compress: true }),
    {
      name: "inline-css-scss",
      transform(code, id) {
        if (id.includes("node_modules")) return { code, map: null };
        const filter = createFilter(["**/*.css", "**/*.scss"]);
        if (!filter(id)) return { code, map: null };
        if (!id.endsWith(".css") && !id.endsWith(".scss"))
          return { map: null, code };
        const regex = /url\("(.+?)"\)/g;
        let match;
        const baseDir = "src";
        while ((match = regex.exec(code)) !== null) {
          const imageUrl = match[1];
          const imagePath = path.join(baseDir, imageUrl);
          let dataUrl;
          try {
            dataUrl = encodeImage(imagePath);
          } catch (error) {
            this.error(`failed to inline ${imageUrl} at ${imagePath}`);
          }
          code = code.replace(imageUrl, `${dataUrl}`);
        }
        return {
          map: null,
          code,
        };
      },
    },
    postcssPlugin({
      plugins: [autoprefixer()],
      extract: "index.scss",
      minimize: true,
      // sourceMap: true,
    }),
    commonjs({
      transformMixedEsModules: true,
      ignoreGlobal: true,
    }),
    image(),
  ],
};
export default config;
