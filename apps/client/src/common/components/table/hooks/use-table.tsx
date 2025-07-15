import type { TableColumn } from "@common/components/table/types/table-column.type";

export type UseTableOptions<TData extends object> = {
  data?: TData[];
  columns?: TableColumn<TData>[];
};

/**
 * Manage general table state and logic.
 */
export const useTable = <TData extends object>({
  data = [],
  columns = [],
}: UseTableOptions<TData> = {}) => {
  return { data, columns };
};

export type UseTable<TData extends object> = ReturnType<typeof useTable<TData>>;
