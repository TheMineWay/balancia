import pkg from "@site/package.json";
import type { EnvConfig } from "@site/src/components/tools/config-generator/config-generator.tool";
import { Section } from "@site/src/constants/config/env-config.type";

export const generateEnvFile = (
	schema: Section[],
	config: EnvConfig,
): string[] => {
	const parsedConfig = Object.entries(config).reduce(
		(acc, [key, value]) => {
			if (!value) return acc;

			if (Array.isArray(value)) {
				acc[key] = value.join(",");
			} else {
				acc[key] = String(value);
			}
			return acc;
		},
		{} as Record<string, string>,
	);

	const envFileContent: string[] = [
		"##########",
		`# v${pkg.version}`,
		"##########",
	];

	// Generate env file content per section
	for (const section of schema) {
		envFileContent.push(`\n# [ ${section.name.toUpperCase()} ]`);

		// Generate env file content per item in the section
		for (const [key, item] of Object.entries(section.items)) {
			let prefix = "";
			let suffix = "";

			if (item.description || item.default) {
				suffix = ` #`;
				if (item.description) suffix += ` ${item.description}`;
				if (item.default) suffix += ` (default: "${item.default}")`;
			}

			let value = parsedConfig[key] || null;
			if (!value && item.required !== true) prefix = "#";
			if (!value) value = "";

			envFileContent.push(`${prefix}${key.toUpperCase()}="${value}"${suffix}`);
		}
	}

	return envFileContent;
};
