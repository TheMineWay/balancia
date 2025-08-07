import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		environment: "node",
		setupFiles: ["dotenv/config"],
	},
	resolve: {
		alias: {
			"@pkg": resolve(__dirname, "./package.json"),
			"@utils": resolve(__dirname, "src/utils"),
			"@constants": resolve(__dirname, "src/constants"),
			"@dto": resolve(__dirname, "src/dto"),
			"@api": resolve(__dirname, "src/api"),
			"@database": resolve(__dirname, "src/database"),
			"@schemas": resolve(__dirname, "src/database/schemas"),
			"@core": resolve(__dirname, "src/core"),
			"@mocks": resolve(__dirname, "src/mocks"),
			"@ts-types": resolve(__dirname, "src/types"),
			"@guards": resolve(__dirname, "src/guards"),
		},
	},
});
