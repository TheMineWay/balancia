import type { UseTable } from "@common/components/table/hooks/use-table";
import type { TableColumn } from "@common/components/table/types/table-column.type";
import { Table as MTable } from "@mantine/core";
import { memo, type ReactNode } from "react";

export type TableProps<TData extends object> = {
  table: UseTable<TData>;
};

export const Table = <TData extends object>({
  table,
}: TableProps<TData>): ReactNode => {
  const { columns } = table;

  return (
    <MTable>
      <MTable.Thead>
        <Columns<TData> columns={columns} />
      </MTable.Thead>
      <MTable.Tbody></MTable.Tbody>
    </MTable>
  );
};

/* Internal */
type ColumnProps<TData extends object> = {
  columns: TableColumn<TData>[];
};

const ColumnsComponent = <TData extends object>({
  columns,
}: ColumnProps<TData>): ReactNode => {
  return (
    <MTable.Tr>
      {columns.map((column) => (
        <MTable.Th key={column.accessorKey as string}>{column.label}</MTable.Th>
      ))}
    </MTable.Tr>
  );
};
const Columns = memo(ColumnsComponent) as <TData extends object>(
  props: ColumnProps<TData>
) => ReactNode;
