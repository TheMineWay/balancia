import { RenderCurrency } from "@common/extended-ui/currency/render-currency";
import { DatetimeRender } from "@common/extended-ui/date/components/datetime-render";
import { Table } from "@common/extended-ui/table/components/table";
import { useTable } from "@common/extended-ui/table/hooks/use-table";
import type { TableColumn } from "@common/extended-ui/table/types/table-column.type";
import { useTranslation } from "@i18n/use-translation";
import { ActionIcon, Group, Text } from "@mantine/core";
import type { DebtListModel } from "@shared/models";
import { getContactName } from "@shared/utils";
import { useMemo } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";

type Props = {
	data?: DebtListModel[];
	loading?: boolean;

	// Events
	onEditClick?: (item: DebtListModel) => void;
	onDeleteClick?: (item: DebtListModel) => void;
};

export const DebtsTable: FC<Props> = ({
	data = [],
	loading = false,

	// Events
	onEditClick,
	onDeleteClick,
}) => {
	const { t } = useTranslation("finances");
	const { t: commonT } = useTranslation("common");

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
					row.notifiedAt ? <DatetimeRender date={row.notifiedAt} /> : null,
			},
			{
				label: commonT().expressions.Actions,
				render: (item) => (
					<Group>
						{onEditClick && (
							<ActionIcon
								onClick={() => onEditClick(item)}
								aria-label={commonT().expressions.Edit}
							>
								<BiEdit />
							</ActionIcon>
						)}
						{onDeleteClick && (
							<ActionIcon
								onClick={() => onDeleteClick(item)}
								color="red"
								aria-label={commonT().expressions.Delete}
							>
								<BiTrash />
							</ActionIcon>
						)}
					</Group>
				),
			},
		],
		[t, commonT, onEditClick, onDeleteClick],
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
