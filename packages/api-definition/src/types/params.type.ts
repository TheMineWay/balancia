export type Params<P extends Record<string, string> | null = null> =
	WithoutParams & WithParams<P extends null ? never : P>;

type WithParams<T extends Record<string, string>> = {
	pathMode: "dynamic";
	getPath: (params: T) => string[];
	paramsMapping: Record<keyof T, string>;
};

type WithoutParams = {
	pathMode: "static";
	getPath: () => string[];
};
