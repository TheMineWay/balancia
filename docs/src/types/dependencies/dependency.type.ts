import { BasicDependency } from "@site/src/types/dependencies/basic-dependency.type.js";

export type Dependency = BasicDependency & {
  docsUrl?: string;
  alternatives?: Array<BasicDependency>;
};
