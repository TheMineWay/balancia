import * as fs from "fs";
import path from "path";

type Metadata = {
	name?: string;
	version?: string;
};

export const replaceProjectMetadata = (metadata: Metadata) => {
	console.log("Updating metadata");

	updatePackageJsons(metadata);
};

const updatePackageJsons = (metadata: Metadata) => {
	const pks = findPackageJsonFiles("../");

	for (const pkPath of pks) {
		const pk = JSON.parse(fs.readFileSync(pkPath, "utf-8")) as Record<
			string,
			unknown
		>;

		if (metadata.name)
			pk["name"] = generatePackageJsonName(pkPath, metadata.name);

		if (metadata.version) pk["version"] = metadata.version;

		fs.writeFileSync(pkPath, JSON.stringify(pk, null, 2) + "\n");
	}
};

const generatePackageJsonName = (path: string, name: string) => {
	const parts = path.split("/");

	if (parts.length <= 2) return name;

	const scope = parts[1];

	if (scope === "apps")
		return name + "-" + transformPathToPackageJsonName(path);
	if (scope === "docs") return "docs";
};

function transformPathToPackageJsonName(inputPath: string): string {
	// Normalize and split the input path into components
	const pathParts = inputPath.split(path.sep);

	// Ensure there are enough directories to remove the first two and the last one
	if (pathParts.length <= 3) {
		throw new Error("The path does not contain enough directories to process.");
	}

	// Remove the first two and the last directory
	const resultParts = pathParts.slice(2, pathParts.length - 1);

	// Join the remaining parts with a hyphen
	return resultParts.join("-");
}

function findPackageJsonFiles(dir: string): string[] {
	let packageJsonPaths: string[] = [];

	// Get the base directory name (to check against the exclusion list)
	const baseDirName = path.basename(dir);

	// Skip the search if the directory is excluded
	if (["node_modules", "scripts", "packages"].includes(baseDirName)) {
		return packageJsonPaths;
	}

	// Read all files and subdirectories in the given directory
	const files = fs.readdirSync(dir);

	for (const file of files) {
		const fullPath = path.join(dir, file);
		const stats = fs.statSync(fullPath);

		if (stats.isDirectory()) {
			// If the current file is a directory, recursively search for package.json inside it
			packageJsonPaths = packageJsonPaths.concat(
				findPackageJsonFiles(fullPath),
			);
		} else if (file === "package.json") {
			// If the file is package.json, add its path to the result list
			packageJsonPaths.push(fullPath);
		}
	}

	return packageJsonPaths;
}
