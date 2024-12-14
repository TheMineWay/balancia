import { selectRunner } from "../utils/select-runner.util";
import { generateDockerComposeDatabase } from "./generate-docker-compose-database";

export const generate = async () => {
  await selectRunner(
    [
      {
        label: "📚 Database docker-compose",
        run: generateDockerComposeDatabase,
      },
    ],
    "🤖 Select option to generate"
  );
};
