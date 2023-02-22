import { swc } from "rollup-plugin-swc3";
import postcss from "rollup-plugin-postcss";

const config = {
  input: "src/index.js",
  moduleContext: () => "this",
  output: {
    dir: "dist",
    format: "esm",
    // preserveModules: true,
  },
  external: [
    "react",
    "react-dom",
    "tiptap-unique-id",
    "@tiptap/extension-link",
    "@tiptap/extension-underline",
    "@tiptap/extension-character-count",
    "@tiptap/react",
    "@tiptap/starter-kit",
    "lucide-react",
    "react/jsx-runtime"
  ],
  plugins: [
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
