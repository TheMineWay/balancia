import { input } from "@inquirer/prompts";
import { replaceProjectName } from "./replace-project-name";

(async () => {
  const projectName = await input({
    message: "Enter project name",
    default: "project-name",
  });

  replaceProjectName(projectName);

  console.log(`Project "${projectName}" initialized`);
})();
