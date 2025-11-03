import { RenderCurrency } from "@common/extended-ui/currency/render-currency";
import { DateRender } from "@common/extended-ui/date/components/date-render";
import { Table } from "@common/extended-ui/table/components/table";
import { useTable } from "@common/extended-ui/table/hooks/use-table";
import type { TableColumn } from "@common/extended-ui/table/types/table-column.type";
import { useTranslation } from "@i18n/use-translation";
import { Text } from "@mantine/core";
import type { DebtListModel } from "@shared/models";
import { getContactName } from "@shared/utils";
import { useMemo } from "react";

type Props = {
	data?: DebtListModel[];
	loading?: boolean;
};

export const DebtsTable: FC<Props> = ({ data = [], loading = false }) => {
	const { t } = useTranslation("finances");

	const columns = useMemo<TableColumn<DebtListModel>[]>(
		() => [
			{
				label: t().debt.models.debt.debtorId.Label,
				accessorKey: "debtorId",
				render: (row) => <Text>{getContactName(row.debtor)}</Text>,
			},
			{
				label: t().debt.models.debt.amount.Label,
				accessorKey: "amount",
				render: (row) => <RenderCurrency amount={row.amount} />,
			},
			{
				label: t().debt.models.debt.reason.Label,
				accessorKey: "reason",
			},
			{
				label: t().debt.models.debt.notifiedAt.Label,
				accessorKey: "notifiedAt",
				render: (row) =>
					row.notifiedAt ? <DateRender date={row.notifiedAt} /> : null,
			},
		],
		[t],
	);
	const table = useTable<DebtListModel>({ data, rowKey: "id", columns });

	return (
		<Table<DebtListModel>
			table={table}
			loading={loading}
			classNames={{ root: "max-h-[25rem]" }}
		/>
	);
};
