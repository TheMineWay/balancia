type NumberOptions = { min: number; max: number };
type StringOptions = { minLength: number; maxLength: number };

type CommonOptions = { default?: unknown };

type ModelValue = (NumberOptions | StringOptions) & CommonOptions;
export type ModelValues = Partial<Record<string, Partial<ModelValue>>>;
