import { DEPENDENCIES } from "@site/src/constants/dependencies/dependencies.constant";
import { ProjectDependency } from "@site/src/types/dependencies/dependency.type";
import { DevProp } from "@site/src/types/dependencies/with-dev-prop.type";

const codes: Array<{ dep: (typeof DEPENDENCIES)[number]["code"] } & DevProp> = [
  { dep: "@hookform/resolvers" },
  { dep: "zod" },
  { dep: "react-hook-form" },
  { dep: "@tanstack/react-query" },
  { dep: "@tanstack/react-router" },
  { dep: "antd" },
  { dep: "clsx" },
  { dep: "luxon" },
  { dep: "rc-picker" },
  { dep: "react" },
  { dep: "react-dom" },
  { dep: "@eslint/js", isDevelopment: true },
  { dep: "@tanstack/router-devtools", isDevelopment: true },
  { dep: "@tanstack/router-plugin", isDevelopment: true },
  { dep: "@testing-library/jest-dom", isDevelopment: true },
  { dep: "@testing-library/react", isDevelopment: true },
  { dep: "@testing-library/user-event", isDevelopment: true },
  { dep: "@types/luxon", isDevelopment: true },
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
