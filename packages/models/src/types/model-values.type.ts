type NumberOptions = { min: number; max: number };
type StringOptions = { minLength: number; maxLength: number };

type ModelValue = NumberOptions | StringOptions;
export type ModelValues = Partial<Record<string, Partial<ModelValue>>>;
