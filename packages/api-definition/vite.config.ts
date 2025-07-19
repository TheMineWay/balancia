import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    target: "es2020",
    outDir: "dist",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"), // entry is still required in lib mode
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        // ✅ CORRECT PLACE FOR preserveModules
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
      },
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
    }),
  ],
});
