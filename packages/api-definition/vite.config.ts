import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  build: {
    target: "es2020",
    outDir: "dist",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"], // ✅ ESM + CommonJS
    },
    rollupOptions: {
      output: [
        {
          format: "es",
          preserveModules: true,
          preserveModulesRoot: "src",
          dir: "dist/esm",
          entryFileNames: "[name].mjs",
        },
        {
          format: "cjs",
          preserveModules: true,
          preserveModulesRoot: "src",
          dir: "dist/cjs",
          entryFileNames: "[name].cjs",
          exports: "named",
        },
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@ts-types": path.resolve(__dirname, "src/types"),
    },
  },
  plugins: [
    dts({
      tsconfigPath: "./tsconfig.json",
      include: ["src"],
      outDir: ["dist/esm", "dist/cjs"], // ✅ generate .d.ts for both
    }),
  ],
});
