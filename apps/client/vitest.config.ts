import path from "path";
import { defineProject, mergeConfig } from "vitest/config";
import configShared from "../../vitest.shared";

export default mergeConfig(
  configShared,
  defineProject({
    test: {
      globals: true,
      environment: "node",
      include: ["**/*.spec.*"],
      environmentMatchGlobs: [
        // Use jsdom for files ending with .spec.dom.ts or .spec.dom.tsx
        ["**/*.spec.dom.ts", "jsdom"],
        ["**/*.spec.dom.tsx", "jsdom"],
        ["**/*.spec.ts", "node"],
      ],
    },
    resolve: {
      alias: {
        "@pkg": path.resolve(__dirname, "./package.json"),
        "@components": path.resolve(__dirname, "src/components"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@public": path.resolve(__dirname, "./public"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@providers": path.resolve(__dirname, "src/providers"),
        "@constants": path.resolve(__dirname, "src/constants"),
        "@i18n": path.resolve(__dirname, "src/i18n"),
        "@ts-types": path.resolve(__dirname, "src/types"),
        "@core": path.resolve(__dirname, "src/core"),
      },
    },
  })
);
