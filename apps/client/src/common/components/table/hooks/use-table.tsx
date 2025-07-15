import type { TableColumn } from "@common/components/table/types/table-column.type";
import type { TableValue } from "@common/components/table/types/table-value.type";

export type UseTableOptions<TData extends TableValue> = {
  data?: TData[];
  columns?: TableColumn<TData>[];
  rowKey: keyof TData;
};

/**
 * Manage general table state and logic.
 */
export const useTable = <TData extends TableValue>({
  data = [],
  columns = [],
  rowKey,
}: UseTableOptions<TData>) => {
  return { data, columns, rowKey };
};

export type UseTable<TData extends TableValue> = ReturnType<
  typeof useTable<TData>
>;
