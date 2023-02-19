import { stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";

const dir = dirname(fileURLToPath(import.meta.url));

try {
  await stat(resolve(dir, "../node_modules"));
} catch (error) {
  console.error("Please run `npm install` first in demo directory");
  process.exitCode = 1;
}

try {
  await stat(resolve(dir, "../../dist/index.js"));
} catch (error) {
  console.error("Please run `npm run build` first in root directory");
  process.exitCode = 1;
}
