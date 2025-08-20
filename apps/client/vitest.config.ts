import { defineConfig, mergeConfig } from "vitest/config";
import sharedConfig from "../../vitest.config";
import viteConfig from "./vite.config";

export default mergeConfig(
  mergeConfig(viteConfig, sharedConfig),
  defineConfig({
    test: {
      pool: 'threads',
      environment: "jsdom",
      globals: true,
      include: [
        "**/*.spec.ts",
        "**/*.spec.tsx", 
        "**/*.spec.dom.ts",
        "**/*.spec.dom.tsx"
      ],
      exclude: [
        "**/routes/**/*",
        "**/node_modules/**"
      ],
      projects: [
        {
          extends: true,
          test: {
            environment: 'jsdom',
            include: [
              "**/*.spec.dom.ts",
              "**/*.spec.dom.tsx"
            ]
          }
        },
        {
          extends: true,
          test: {
            environment: 'node',
            include: [
              "**/*.spec.ts",
              "**/*.spec.tsx"
            ]
          }
        }
      ],
    },
  })
);
