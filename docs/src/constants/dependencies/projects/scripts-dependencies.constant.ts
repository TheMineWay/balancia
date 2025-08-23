import { DEPENDENCIES } from "@site/src/constants/dependencies/dependencies.constant";
import { ProjectDependency } from "@site/src/types/dependencies/dependency.type";
import { DevProp } from "@site/src/types/dependencies/with-dev-prop.type";

const codes: Array<{ dep: (typeof DEPENDENCIES)[number]["code"] } & DevProp> = [
	{ dep: "@inquirer/prompts" },
	{ dep: "fs" },
	{ dep: "typescript", isDevelopment: true },
	{
		dep: "@types/node",
		isDevelopment: true,
	},
];

export const SCRIPTS_DEPENDENCIES: Array<ProjectDependency> = DEPENDENCIES.map(
	(dep) => {
		const code = codes.find((c) => c.dep === dep.code);
		if (!code) return null;
		return {
			...dep,
			isDevelopment: code.isDevelopment,
		};
	},
).filter(Boolean);
