import { DEPENDENCIES } from "@site/src/constants/dependencies/dependencies.constant";
import { PROJECTS } from "@site/tests/dependencies/projects";
import * as fs from "fs";
import * as path from "path";
import { beforeEach, describe, expect, it } from "vitest";

/**
 * Recursively scans a directory for package.json files, excluding those in node_modules.
 * @param dir - The directory to start scanning from.
 * @returns An array of paths to package.json files.
 */
export function findPackageJsonFiles(dir: string): string[] {
  const result: string[] = [];

  function scanDirectory(currentDir: string): void {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        // Skip node_modules directories
        if (entry.name === "node_modules") {
          continue;
        }
        // Recursively scan subdirectories
        scanDirectory(fullPath);
      } else if (entry.isFile() && entry.name === "package.json") {
        result.push(fullPath);
      }
    }
  }

  scanDirectory(dir);
  return result;
}

const listAllDeps = (pkPaths: Array<string>) => {
  const devDeps = new Set<string>();
  const deps = new Set<string>();

  for (const pkPath of pkPaths) {
    const content = JSON.parse(fs.readFileSync(pkPath, "utf-8"));
    const { dependencies, devDependencies } = content as Record<
      string,
      Record<string, Record<string, string>>
    >;

    if (dependencies) Object.keys(dependencies).forEach((d) => deps.add(d));
    if (devDependencies)
      Object.keys(devDependencies).forEach((d) => devDeps.add(d));
  }

  return {
    devDeps,
    deps,
  };
};

const cleanDepsList = (deps: Array<string>) => {
  return removeLocalDeps(
    deps
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => a.localeCompare(b))
  );
};

const removeLocalDeps = (deps: Array<string>) => {
  return deps.filter((dep) => !dep.startsWith("@shared/"));
};

describe("dependencies constant", () => {
  let dependencies: Set<string>;
  let devDependencies: Set<string>;

  beforeEach(() => {
    const { deps, devDeps } = listAllDeps(
      findPackageJsonFiles(path.join(__dirname, "..", "..", ".."))
    );

    dependencies = deps;
    devDependencies = devDeps;
  });

  it("should include all dependencies present in all projects", () => {
    const expected: string[] = cleanDepsList(DEPENDENCIES.map((d) => d.code));
    const actual = cleanDepsList([...dependencies, ...devDependencies]);

    const missingItems = expected.filter((item) => !actual.includes(item));
    const extraItems = actual.filter((item) => !expected.includes(item));

    // Provide feedback on missing or extra items
    if (missingItems.length > 0 || extraItems.length > 0) {
      let message = "Comparison failed.\n";
      if (missingItems.length > 0) {
        message += `Dependencies that are present on the documentation but are not being used: ${missingItems.join(", ")}\n`;
      }
      if (extraItems.length > 0) {
        message += `Dependencies that need to be included on the documentation: ${extraItems.join(", ")}\n`;

        const recommendation = JSON.stringify(
          extraItems.map((name) => ({
            code: name,
            name: name.replaceAll("/", " ").toLowerCase(),
            url: "https://www.npmjs.com/package/" + name,
          }))
        );

        message += `Recommendation (add this in the dependencies.constant.ts):\n${recommendation}`;
      }

      console.warn(message);
    }

    expect(expected).toEqual(actual);
  });
});

// Automatic testing for each project
for (const [name, projectConfig] of Object.entries(PROJECTS)) {
  describe(`on ${name} project`, () => {
    const { deps, devDeps } = listAllDeps([
      path.join(projectConfig.projectPath, "package.json"),
    ]);

    const actualDeps = cleanDepsList(
      projectConfig.dependencies
        .filter((dep) => !dep.isDevelopment)
        .map((dep) => dep.code)
    );
    const actualDevDeps = cleanDepsList(
      projectConfig.dependencies
        .filter((dep) => dep.isDevelopment)
        .map((dep) => dep.code)
    );

    describe("should match dependencies with its dependencies constant", () => {
      it("dependencies", () => {
        expect(cleanDepsList([...deps])).toEqual(actualDeps);
      });

      it("devDependencies", () => {
        expect(cleanDepsList([...devDeps])).toEqual(actualDevDeps);
      });
    });
  });
}
