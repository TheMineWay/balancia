export type ProviderSetter<T> = {
  setProvider: (data: T) => void;
  provider: T;
};
