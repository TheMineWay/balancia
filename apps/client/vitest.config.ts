import { defineConfig, mergeConfig } from "vitest/config";
import sharedConfig from "../../vitest.shared";
import viteConfig from "./vite.config";

export default mergeConfig(
  mergeConfig(viteConfig, sharedConfig),
  defineConfig({
    test: {
      globals: true,
      workspace: [
        {
          extends: true,
          test: {
            environment: "node",
            include: ["**/*.spec.*"],
          },
        },
        {
          extends: true,
          test: {
            environment: "jsdom",
            include: ["**/*.spec.dom.*"],
          },
        },
      ],
    },
  })
);
