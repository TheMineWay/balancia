export type Params<P extends Record<string, string> | null = null> =
  P extends null ? WithoutParams : WithParams<P extends null ? never : P>;

type WithParams<T extends Record<string, string>> = {
  getPath: (params: T) => string[];
  paramsMapping: Record<keyof T, string>;
};

type WithoutParams = {
  getPath: () => string[];
};
