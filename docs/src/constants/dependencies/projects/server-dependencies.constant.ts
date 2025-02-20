import { DEPENDENCIES } from "@site/src/constants/dependencies/dependencies.constant";
import { ProjectDependency } from "@site/src/types/dependencies/dependency.type";
import { DevProp } from "@site/src/types/dependencies/with-dev-prop.type";

const codes: Array<{ dep: (typeof DEPENDENCIES)[number]["code"] } & DevProp> = [
  {
    dep: "@nestjs/testing",
    isDevelopment: true,
  },
  {
    dep: "@nestjs/jwt",
  },
  {
    dep: "@nestjs/swagger",
  },
  {
    dep: "@nestjs/throttler",
  },
  {
    dep: "drizzle-orm",
  },
  {
    dep: "helmet",
  },
  {
    dep: "mysql2",
  },
  {
    dep: "otpauth",
  },
  {
    dep: "drizzle-kit",
    isDevelopment: true,
  },
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
  {
    dep: "dotenv",
    isDevelopment: true,
  },
  { dep: "zod" },
  { dep: "@types/express", isDevelopment: true },
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
