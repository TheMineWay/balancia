export const NAMING_STRATEGY_EXTENSIONS: Array<NamingStrategyExtension> = [
  {
    extension: "util",
    description: "A file that contains a single utility method.",
  },
  {
    extension: "utils",
    description: "A file that contains multiple utilities grouped by scope.",
  },
  {
    extension: "controller-definition",
    description: "File that contains the definition of a controller.",
    client: false,
    server: false,
    onlyOnPackages: ["@shared/api-definition"],
  },
  {
    extension: "controller",
    description: "Used to define NestJS controllers.",
    client: false,
    packages: false,
  },
  {
    extension: "module",
    description: "Used to define NestJS modules.",
    client: false,
    packages: false,
  },
];

export type NamingStrategyExtension = {
  extension: string;
  description: string;
  client?: boolean;
  server?: boolean;
  packages?: boolean;
  onlyOnPackages?: Array<string>;
};
