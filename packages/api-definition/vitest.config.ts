import path from "path";
import { defineProject, mergeConfig } from "vitest/config";
import configShared from "../../vitest.config";

export default mergeConfig(
	configShared,
	defineProject({
		resolve: {
			alias: {
				"@ts-types": path.resolve(__dirname, "src/types"),
				"@": path.resolve(__dirname, "src"),
			},
		},
	}),
);
