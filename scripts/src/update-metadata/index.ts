import { input } from "@inquirer/prompts";
import { selectRunner } from "../utils/select-runner.util";
import { replaceProjectMetadata } from "./replace-project-metadata";

export const updateMetadata = async () => {
	await selectRunner(
		[
			{
				run: updateVersion,
				label: "⏫ Update version",
			},
			{
				run: updateName,
				label: "✏️  Update project name",
			},
		],
		"Select metadata to update",
	);
};

const updateName = async () => {
	const projectName = await input({
		message: "Enter project name",
		default: "project-name",
	});

	replaceProjectMetadata({
		name: projectName,
	});

	console.log(`Project "${projectName}" initialized`);
};

const updateVersion = async () => {
	const version = await input({
		message: "Enter project version (use semantic versioning)",
		default: "1.0.0",
	});

	replaceProjectMetadata({
		version,
	});
};
