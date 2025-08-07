import { BasicDependency } from "@site/src/types/dependencies/basic-dependency.type";
import { DevProp } from "@site/src/types/dependencies/with-dev-prop.type";

export type Dependency = BasicDependency & {
	docsUrl?: string;
	alternatives?: Array<BasicDependency>;
};

export type ProjectDependency = Dependency & DevProp;
