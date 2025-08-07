import { defineWorkspace } from "vitest/config";

// defineWorkspace provides a nice type hinting DX
export default defineWorkspace([
	// matches every folder and file inside the `packages` folder
	"packages/*",
	"apps/*",
	"docs/",
]);
