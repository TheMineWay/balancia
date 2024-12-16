import path from "path";
import { defineProject, mergeConfig } from "vitest/config";
import configShared from "../vitest.shared";

export default mergeConfig(
  configShared,
  defineProject({
    test: {
      globals: true,
      environment: "node",
      include: ["**/*.spec.*"],
      environmentMatchGlobs: [["**/*.spec.ts", "node"]],
    },
    resolve: {
      alias: {
        "@site": path.resolve(__dirname, "./"),
      },
    },
  })
);
