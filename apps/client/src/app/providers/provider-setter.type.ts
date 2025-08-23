export type ProviderSetter<T> = {
	setContext: (data: T) => void;
	context: T;
};
