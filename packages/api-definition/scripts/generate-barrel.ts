import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.resolve(__dirname, "../src");
const INDEX_FILE = path.resolve(SRC_DIR, "index.ts");

async function walk(dir: string): Promise<string[]> {
	const dirents = await fs.readdir(dir, { withFileTypes: true });
	const files = await Promise.all(
		dirents.map((dirent) => {
			const res = path.resolve(dir, dirent.name);
			if (dirent.isDirectory()) return walk(res);
			else if (
				res.endsWith(".ts") &&
				!res.endsWith(".spec.ts") &&
				!res.endsWith("index.ts")
			)
				return [res];
			else return [];
		}),
	);
	return files.flat();
}

async function generateIndex() {
	// Ensure SRC_DIR exists
	try {
		await fs.access(SRC_DIR);
	} catch {
		await fs.mkdir(SRC_DIR, { recursive: true });
	}

	const files = await walk(SRC_DIR);
	// convert to relative paths from src/index.ts without extension
	const exports = files.map((f) => {
		const relPath = "./" + path.relative(SRC_DIR, f).replace(/\.ts$/, "");
		return `export * from "${relPath}";`;
	});

	const content = exports.join("\n");
	const space = content === "\n" ? "" : "\n";
	await fs.writeFile(INDEX_FILE, content + space);
	console.log("Generated src/index.ts with exports for all source files.");
}

generateIndex().catch(console.error);
