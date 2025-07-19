import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    target: "es2020",
    outDir: "dist",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      //preserveModules: true,
      //preserveModulesRoot: "src",
      output: {
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
      //tsConfigFilePath: "./tsconfig.json",
      include: ["src"],
      exclude: ["src/definitions", "**/*.spec.ts"],
    }),
  ],
});
