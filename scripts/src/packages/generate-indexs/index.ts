import * as fs from "fs";
import * as path from "path";

function getDirectories(source: string): string[] {
	return fs
		.readdirSync(source)
		.filter((name) => fs.statSync(path.join(source, name)).isDirectory());
}

function isDirectoryEmpty(dir: string): boolean {
	try {
		// Check if the directory exists
		if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
			return false;
		}

		// Read the directory contents
		const items = fs.readdirSync(dir).filter((item) => item !== "index.ts");

		// Recursively check if subdirectories are empty
		for (const item of items) {
			const fullPath = path.join(dir, item);
			if (fs.statSync(fullPath).isDirectory()) {
				if (!isDirectoryEmpty(fullPath)) {
					return false;
				}
			} else {
				return false; // Found a non-index.ts file, so directory is not empty
			}
		}

		return true; // All subdirectories are empty, and no files exist except index.ts
	} catch (error) {
		console.error(`Error checking directory: ${error}`);
		return false;
	}
}

function writePackageIndexes(dir: string): void {
	// Check if the directory exists
	if (!fs.existsSync(dir)) {
		console.error(`Directory not found: ${dir}`);
		return;
	}

	// Define the path for index.ts
	const indexPath = path.join(dir, "index.ts");

	// If index.ts exists, remove it
	if (fs.existsSync(indexPath)) {
		fs.unlinkSync(indexPath);
	}

	// Get all files and directories in the current directory
	const items = fs.readdirSync(dir);
	const subdirs: string[] = [];

	// Collect all directories
	items.forEach((item) => {
		const fullPath = path.join(dir, item);
		if (fs.statSync(fullPath).isDirectory()) {
			subdirs.push(fullPath);
		}
	});

	// Write the new index.ts file
	const indexContent = items
		.map((item) => {
			if (isDirectoryEmpty(item)) return null;

			let name = path.basename(item);

			if (name.includes(".spec.")) return null;

			if (name.endsWith(".ts")) {
				name = name.replace(/\.ts$/, "");
			}
			return `export * from './${name}';`;
		})
		.filter(Boolean)
		.join("\n");

	fs.writeFileSync(indexPath, indexContent);
	console.log(`Created: ${indexPath}`);

	// Recursively process subdirectories
	subdirs.forEach((subdir) => writePackageIndexes(subdir));
}

(() => {
	const base = path.join(__dirname, "../../../../packages");
	const packagesDirs = getDirectories(base);
	packagesDirs.forEach((p) => writePackageIndexes(path.join(base, p, "src")));
})();
