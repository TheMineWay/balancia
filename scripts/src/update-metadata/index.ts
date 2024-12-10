import { input } from "@inquirer/prompts";
import { replaceProjectMetadata } from "./replace-project-metadata";

(async () => {
  const projectName = await input({
    message: "Enter project name",
    default: "project-name",
  });

  replaceProjectMetadata({
    name: projectName,
  });

  console.log(`Project "${projectName}" initialized`);
})();
