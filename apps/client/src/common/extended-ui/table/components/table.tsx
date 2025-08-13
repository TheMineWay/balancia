import type { WithChildren } from "@common/extended-ui/general/types/component.types";
import type { UseTable } from "@common/extended-ui/table/hooks/use-table";
import type { TableColumn } from "@common/extended-ui/table/types/table-column.type";
import type { TableValue } from "@common/extended-ui/table/types/table-value.type";
import { useTranslation } from "@i18n/use-translation";
import { Loader, Table as MTable, Text } from "@mantine/core";
import { memo, type ReactNode, useMemo } from "react";
import styles from "./table.module.pcss";

export type TableProps<TData extends TableValue> = {
	table: UseTable<TData>;
	loading?: boolean;
};

export const Table = <TData extends TableValue>({
	table,
	loading = false,
}: TableProps<TData>): ReactNode => {
	const { t } = useTranslation("common");

	const { columns } = table;

	const content = useMemo(() => {
		if (loading)
			return (
				<Status<TData> table={table}>
					<Loader />
				</Status>
			);
		if (table.data.length === 0)
			return (
				<Status<TData> table={table}>
					<Text size="sm">{t().status["no-data"].Description}</Text>
				</Status>
			);

		return <Rows<TData> table={table} />;
	}, [loading, table.data, table, t]);

	return (
		<div className="overflow-x-scroll">
			<MTable className={styles.table} withColumnBorders>
				<MTable.Thead className="h-12">
					<Headers<TData> columns={columns} />
				</MTable.Thead>
				<MTable.Tbody className="h-40">{content}</MTable.Tbody>
			</MTable>
		</div>
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
				<MTable.Th
					key={(column.accessorKey as string) ?? i}
					style={{ textAlign: "center" }}
				>
					<Text>{column.label}</Text>
				</MTable.Th>
			))}
		</MTable.Tr>
	);
};

const Headers = memo(HeadersComponent) as <TData extends TableValue>(
	props: HeadersProps<TData>,
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
				const content = column.render ? (
					column.render(item)
				) : (
					<Text>{`${value}`}</Text>
				);

				return (
					<MTable.Td
						className={column.classNames?.cell}
						style={{
							minWidth: "7rem",
							...column.styles?.cell,
						}}
						key={(column.accessorKey as string) ?? i}
					>
						<div
							className={
								column.classNames?.cellContent ?? "flex justify-center"
							}
							style={column.styles?.cellContent}
						>
							{content}
						</div>
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
	props: RowsProps<TData>,
) => ReactNode;

const Status = <TData extends TableValue>({
	children,
	table,
}: WithChildren & { table: UseTable<TData> }) => {
	return (
		<MTable.Tr className={styles.status} aria-hidden>
			<MTable.Td colSpan={table.columns.length}>
				<div className="flex items-center justify-center h-full">
					{children}
				</div>
			</MTable.Td>
		</MTable.Tr>
	);
};
