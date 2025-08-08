import { selectProject } from "../utils/select-project.util";
import { selectRunner } from "../utils/select-runner.util";
import { createFeature } from "./create-feature";

export const developmentMenu = async () => {
	await selectRunner(
		[
			{
				label: "➕ Create feature",
				run: () => selectProject(createFeature),
			},
		],
		"🤖 Select what you want to do",
	);
};
