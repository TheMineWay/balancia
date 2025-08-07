import fs from "fs";
import { expect, it } from "vitest";

function isValidLanguageCode(name: string): boolean {
	// Match lowercase language codes, optionally with a region subtag
	return /^[a-z]{2}(-[a-z]{2})?$/.test(name);
}

it("All locale folders should follow the language code naming strategy", () => {
	const testDir = __dirname;
	const items = fs.readdirSync(testDir, { withFileTypes: true });

	const folders = items
		.filter((item) => item.isDirectory())
		.map((dir) => dir.name);

	folders.forEach((folderName) => {
		expect(isValidLanguageCode(folderName)).toBe(true);
	});
});
