type TableSupportedPrimitiveValue =
  | string
  | number
  | boolean
  | Date
  | null
  | undefined;
type TableSupportedValue =
  | TableSupportedPrimitiveValue
  | Record<string, TableSupportedPrimitiveValue>
  | Array<TableSupportedPrimitiveValue>;
export type TableValue = Record<string, TableSupportedValue>;
