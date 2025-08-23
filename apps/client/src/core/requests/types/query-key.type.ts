type Return = Array<object | string | number | Date>;

export type QueryKey = () => Return;
export type ParametrizedQueryKey<T> = (params: T) => Return;
