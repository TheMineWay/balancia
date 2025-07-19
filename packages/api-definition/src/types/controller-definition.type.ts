import { Path } from "@ts-types/path/path.type";

export type ControllerDefinition<P extends Record<string, string> = {}> =
  Path<P>;
