type Return = Array<string>;

export type QueryKey = () => Return;
export type ParametrizedQueryKey<T> = (params: T) => Return;

