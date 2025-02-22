import path from "path";
import { defineProject, mergeConfig } from "vitest/config";
import sharedConfig from "../vitest.shared";

export default mergeConfig(
  sharedConfig,
  defineProject({
    test: {
      globals: true,
      environment: "node",
      include: ["**/*.spec.*"],
    },
    resolve: {
      alias: {
        "@site": path.resolve(__dirname, "./"),
      },
    },
  })
);
