import { select } from "@inquirer/prompts";

type Option = { run: () => Promise<void>; label: string };
type Options = Array<Option>;

/**
 * Utility function that creates an interactive CLI selection menu.
 * Displays options to the user and executes the selected option's run function.
 */
export const selectRunner = async (options: Options, title: string) => {
	const opt = await select({
		message: title,
		choices: options.map((op) => op.label),
	});

	return await options.find((op) => op.label === opt)?.run();
};
