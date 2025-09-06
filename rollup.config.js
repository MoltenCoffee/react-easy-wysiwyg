import { jsx } from "react/jsx-runtime";
import postcss from "rollup-plugin-postcss";

const config = {
  input: "src/index.js",
  moduleContext: () => "this",
  output: {
    dir: "dist",
    format: "esm",
    // preserveModules: true,
  },
  jsx: "react",
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
  ],
};

export default config;
