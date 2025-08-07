import { select } from "@inquirer/prompts";

type Option = { run: () => Promise<void>; label: string };
type Options = Array<Option>;

export const selectRunner = async (options: Options, title: string) => {
	const opt = await select({
		message: title,
		choices: options.map((op) => op.label),
	});

	return await options.find((op) => op.label === opt)?.run();
};
