import { DEPENDENCIES } from "@site/src/constants/dependencies/dependencies.constant";
import { ProjectDependency } from "@site/src/types/dependencies/dependency.type";
import { DevProp } from "@site/src/types/dependencies/with-dev-prop.type";

const codes: Array<{ dep: (typeof DEPENDENCIES)[number]["code"] } & DevProp> = [
  {
    dep: "@nestjs/common",
  },
  {
    dep: "@nestjs/core",
  },
  {
    dep: "@nestjs/platform-express",
  },
  {
    dep: "reflect-metadata",
  },
  {
    dep: "@nestjs/cli",
    isDevelopment: true,
  },
  {
    dep: "@nestjs/schematics",
    isDevelopment: true,
  },
  {
    dep: "@types/node",
    isDevelopment: true,
  },
  {
    dep: "typescript",
    isDevelopment: true,
  },
  {
    dep: "vitest",
    isDevelopment: true,
  },
];

export const SERVER_DEPENDENCIES: Array<ProjectDependency> = DEPENDENCIES.map(
  (dep) => {
    const code = codes.find((c) => c.dep === dep.code);
    if (!code) return null;
    return {
      ...dep,
      isDevelopment: code.isDevelopment,
    };
  }
).filter(Boolean);
