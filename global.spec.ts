/**
 * This file is aimed to contain general project tests.
 *
 * General requirements are tested here.
 */

import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";
import { describe, expect, it } from "vitest";

function scanAppsPackageJsons() {
	const appsDir = join(process.cwd(), "apps");
	const appFolders = readdirSync(appsDir).filter((item) => {
		const fullPath = join(appsDir, item);
		return statSync(fullPath).isDirectory();
	});

	const packageJsons: Record<string, any> = {};

	for (const appFolder of appFolders) {
		try {
			const packageJsonPath = join(appsDir, appFolder, "package.json");
			const packageJsonContent = JSON.parse(
				readFileSync(packageJsonPath, "utf8"),
			);
			packageJsons[appFolder] = packageJsonContent;
		} catch (error) {
			console.warn(
				`Could not read package.json for ${appFolder}:`,
				error.message,
			);
			packageJsons[appFolder] = null;
		}
	}

	return packageJsons as { version: string }[];
}

describe("version should", () => {
	it("be consistent across all the monorepo", () => {
		const pk = require("./package.json");
		const version = pk.version;

		expect(version).toBeTypeOf("string");

		const appsPackageJsons = scanAppsPackageJsons();

		// Check each app's version against root version
		Object.entries(appsPackageJsons).forEach(([, packageJson]) => {
			expect(packageJson.version).toBe(version);
		});

		// Ensure we found at least one app
		expect(Object.keys(appsPackageJsons).length).toBeGreaterThan(0);
	});
});
