import { DEPENDENCIES } from "@site/src/constants/dependencies/dependencies.constant";
import { ProjectDependency } from "@site/src/types/dependencies/dependency.type";
import { DevProp } from "@site/src/types/dependencies/with-dev-prop.type";

const codes: Array<{ dep: (typeof DEPENDENCIES)[number]["code"] } & DevProp> = [
  {
    dep: "@tanstack/react-router-devtools",
    isDevelopment: true,
  },
  {
    dep: "@themineway/smart-storage-js",
  },
  {
    dep: "@themineway/smart-storage-react",
  },
  {
    dep: "lodash",
  },
  {
    dep: "oidc-client-ts",
  },
  {
    dep: "@types/lodash",
    isDevelopment: true,
  },
  { dep: "@mantine/modals" },
  { dep: "@mantine/notifications" },
  { dep: "@mantine/core" },
  { dep: "@mantine/hooks" },
  { dep: "postcss-preset-mantine", isDevelopment: true },
  { dep: "postcss-simple-vars", isDevelopment: true },
  { dep: "react-icons" },
  { dep: "axios" },
  { dep: "@hookform/resolvers" },
  { dep: "zod" },
  { dep: "react-hook-form" },
  { dep: "@tanstack/react-query" },
  { dep: "@tanstack/react-router" },
  { dep: "clsx" },
  { dep: "date-fns" },
  { dep: "rc-picker" },
  { dep: "react" },
  { dep: "react-dom" },
  { dep: "@eslint/js", isDevelopment: true },
  { dep: "@tanstack/router-plugin", isDevelopment: true },
  { dep: "@testing-library/jest-dom", isDevelopment: true },
  { dep: "@testing-library/react", isDevelopment: true },
  { dep: "@testing-library/user-event", isDevelopment: true },
  { dep: "@types/react", isDevelopment: true },
  { dep: "@types/react-dom", isDevelopment: true },
  { dep: "@vitejs/plugin-react-swc", isDevelopment: true },
  { dep: "autoprefixer", isDevelopment: true },
  { dep: "eslint", isDevelopment: true },
  { dep: "eslint-import-resolver-typescript", isDevelopment: true },
  { dep: "eslint-plugin-react-hooks", isDevelopment: true },
  { dep: "eslint-plugin-react-refresh", isDevelopment: true },
  { dep: "globals", isDevelopment: true },
  { dep: "jsdom", isDevelopment: true },
  { dep: "postcss", isDevelopment: true },
  { dep: "tailwindcss", isDevelopment: true },
  {
    dep: "@tailwindcss/postcss",
    isDevelopment: true,
  },
  { dep: "typescript", isDevelopment: true },
  { dep: "typescript-eslint", isDevelopment: true },
  { dep: "vite", isDevelopment: true },
  { dep: "vitest", isDevelopment: true },
];

export const CLIENT_DEPENDENCIES: Array<ProjectDependency> = DEPENDENCIES.map(
  (dep) => {
    const code = codes.find((c) => c.dep === dep.code);
    if (!code) return null;
    return {
      ...dep,
      isDevelopment: code.isDevelopment,
    };
  }
).filter(Boolean);
