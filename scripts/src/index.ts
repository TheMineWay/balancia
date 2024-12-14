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
    ],
    "🛠️ Select tool to run"
  );
})();
