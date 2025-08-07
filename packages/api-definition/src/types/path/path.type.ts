export type Path<P extends Record<string, string> = {}> = {
  getPath: (params: P) => string[];
  paramsMapping: Record<keyof P, string>;
};
