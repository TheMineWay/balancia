import { join } from "path";
import { featureHierarchyDefinition } from "../config/hirearchy/feature-hierarchy.definition";
import { selectRunner } from "../utils/select-runner.util";

export const createFeature = async (path: string) => {
  const feats = featureHierarchyDefinition.map((feat) => ({
    label: feat.name,
    run: async () => {
      const p = join(path, "src", "features", feat.name);
    },
  }));

  selectRunner(feats, "🎈 Select a feature to create");
};
