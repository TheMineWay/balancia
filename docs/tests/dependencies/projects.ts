import { CLIENT_DEPENDENCIES } from "@site/src/constants/dependencies/projects/client-dependencies.constant";
import { ProjectDependency } from "@site/src/types/dependencies/dependency.type";
import * as path from "path";

export const PROJECTS = {
  client: {
    dependencies: CLIENT_DEPENDENCIES,
    projectPath: path.join(__dirname, "..", "..", "..", "apps", "client"),
  },
} satisfies Record<
  string,
  {
    dependencies: Array<ProjectDependency>;
    projectPath: string;
  }
>;
