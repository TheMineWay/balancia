import type { TableColumn } from "@common/extended-ui/table/types/table-column.type";
import type { TableValue } from "@common/extended-ui/table/types/table-value.type";
import { useMemo } from "react";

export type UseTableOptions<TData extends TableValue> = {
	data?: TData[];
	columns?: TableColumn<TData>[];
	rowKey?: keyof TData | ((row: TData) => string | number);
	onRowClick?: (
		row: TData,
		e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
	) => void;
};

/**
 * Manage general table state and logic.
 */
export const useTable = <TData extends TableValue>({
	data = [],
	columns = [],
	rowKey,
	onRowClick,
}: UseTableOptions<TData>) => {
	const events = useMemo(
		() => ({
			triggerRowClick: onRowClick,
		}),
		[onRowClick],
	);

	return { data, columns, rowKey, events };
};

export type UseTable<TData extends TableValue> = ReturnType<
	typeof useTable<TData>
>;
