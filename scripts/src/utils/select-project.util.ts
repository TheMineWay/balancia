import { readdirSync } from "fs";
import path from "path";
import { selectRunner } from "./select-runner.util";

type Options = {
  include?: ("packages" | "apps")[];
};

export const selectProject = async (
  fn: (path: string) => Promise<void>,
  { include = ["apps", "packages"] }: Options = {}
) => {
  const root = __dirname + "/../../..";

  // Read all folders present in /apps
  const projects = readdirSync(path.join(root, "apps"));
  const packages = readdirSync(path.join(root, "packages"));

  const all = [
    ...(include.includes("apps")
      ? projects.map((project) => ({
          label: `📁 ${project}`,
          run: () => fn(path.join(root, `apps/${project}`)),
        }))
      : []),
    ...(include.includes("packages")
      ? packages.map((packageName) => ({
          label: `📦 ${packageName}`,
          run: () => fn(path.join(root, `packages/${packageName}`)),
        }))
      : []),
  ];

  return await selectRunner(all, "📓 Select a project");
};
