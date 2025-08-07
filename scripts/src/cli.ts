import { developmentMenu } from "./development";
import { generate } from "./generate/index";
import { updateMetadata } from "./update-metadata/index";
import { selectRunner } from "./utils/select-runner.util.js";

(async () => {
	console.log("NestFlux tools");
	await selectRunner(
		[
			{
				run: updateMetadata,
				label: "Update project metadata",
			},
			{
				run: generate,
				label: "Generate",
			},
      {
        run: developmentMenu,
        label: "Development",
      },
		],
		"🛠️ Select tool to run",
	);
})();
