import { swc } from "rollup-plugin-swc3";
import postcss from "rollup-plugin-postcss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

const config = {
  input: "src/index.js",
  moduleContext: () => "this",
  output: {
    dir: "dist",
    format: "esm",
    // preserveModules: true,
  },
  plugins: [
    peerDepsExternal(),
    postcss({
      extract: "styles.css",
      modules: true,
      minimize: true,
      autoModules: true,
      use: ["sass"],
    }),
    swc({
      minify: true,
      jsc: {
        transform: { react: { runtime: "automatic" } },
        target: "es2019",
        parser: {
          jsx: true,
        },
      },
    }),
  ],
};

export default config;
