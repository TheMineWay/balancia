import type { UseTable } from "@common/components/table/hooks/use-table";
import type { TableColumn } from "@common/components/table/types/table-column.type";
import type { TableValue } from "@common/components/table/types/table-value.type";
import { Table as MTable } from "@mantine/core";
import { memo, type ReactNode } from "react";
import styles from "./table.module.pcss";

export type TableProps<TData extends TableValue> = {
  table: UseTable<TData>;
};

export const Table = <TData extends TableValue>({
  table,
}: TableProps<TData>): ReactNode => {
  const { columns } = table;

  return (
    <MTable className={styles.table}>
      <MTable.Thead>
        <Headers<TData> columns={columns} />
      </MTable.Thead>
      <MTable.Tbody>
        <Rows<TData> table={table} />
      </MTable.Tbody>
    </MTable>
  );
};

/* Internal */

/**
 * Header components.
 * These are used to render the table headers based on the provided columns.
 */
type HeadersProps<TData extends TableValue> = {
  columns: TableColumn<TData>[];
};

const HeadersComponent = <TData extends TableValue>({
  columns,
}: HeadersProps<TData>): ReactNode => {
  return (
    <MTable.Tr>
      {columns.map((column, i) => (
        <MTable.Th key={(column.accessorKey as string) ?? i}>
          {column.label}
        </MTable.Th>
      ))}
    </MTable.Tr>
  );
};

const Headers = memo(HeadersComponent) as <TData extends TableValue>(
  props: HeadersProps<TData>
) => ReactNode;

/**
 * Rows components.
 * These are used to render the table rows based on the provided data.
 */

const Row = <TData extends TableValue>({
  item,
  table,
}: {
  item: TData;
  table: UseTable<TData>;
}): ReactNode => {
  return (
    <MTable.Tr>
      {table.columns.map((column, i) => {
        const value = column.accessorKey ? item[column.accessorKey] : null;

        // Custom render or default rendering
        const content = column.render ? column.render(item) : <>{`${value}`}</>;

        return (
          <MTable.Td
            className={column.classNames?.cell}
            style={column.styles?.cell}
            key={(column.accessorKey as string) ?? i}
          >
            {content}
          </MTable.Td>
        );
      })}
    </MTable.Tr>
  );
};

type RowsProps<TData extends TableValue> = {
  table: UseTable<TData>;
};

const RowsComponent = <TData extends TableValue>({
  table,
}: RowsProps<TData>): ReactNode => {
  const { data: items } = table;

  return items.map((item) => (
    <Row item={item} table={table} key={`${item[table.rowKey]}`} />
  ));
};

const Rows = memo(RowsComponent) as <TData extends TableValue>(
  props: RowsProps<TData>
) => ReactNode;
