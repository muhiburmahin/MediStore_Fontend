import path from "node:path";
import { fileURLToPath } from "node:url";

// Tailwind v4 PostCSS uses `base` (default: process.cwd()) for resolving
// `@import "tailwindcss"` and scanning sources. When the dev server is started
// with cwd at the repo root, cwd is wrong — pin base to this app directory.
const appDir = path.dirname(fileURLToPath(import.meta.url));

const config = {
  plugins: {
    "@tailwindcss/postcss": {
      base: appDir,
    },
  },
};

export default config;
