import { RenderCurrency } from "@common/extended-ui/currency/render-currency";
import { DateRender } from "@common/extended-ui/date/components/date-render";
import { DatetimeRender } from "@common/extended-ui/date/components/datetime-render";
import { Table } from "@common/extended-ui/table/components/table";
import { useTable } from "@common/extended-ui/table/hooks/use-table";
import type { TableColumn } from "@common/extended-ui/table/types/table-column.type";
import { useTranslation } from "@i18n/use-translation";
import { ActionIcon, Group, Text } from "@mantine/core";
import {
	type AccountModel,
	type CategoryModel,
	type TransactionModel as RawTransactionModel,
	TimePrecision,
} from "@shared/models";
import { BiEdit, BiTrash } from "react-icons/bi";

/**
 * As this component accepts transactions with account and category, its type is extended
 */
type TransactionModel = RawTransactionModel & {
	category: CategoryModel | null;
	account?: AccountModel;
};

type Props<T extends TransactionModel> = {
	data?: T[];
	loading?: boolean;
	onDeleteClick?: (item: TransactionModel) => void;
	onEditClick?: (item: TransactionModel) => void;

	// Extensions
	showAccount?: boolean;
};

export const TransactionsTable = <
	T extends TransactionModel = TransactionModel,
>({
	data,
	loading = false,
	onDeleteClick,
	onEditClick,
	showAccount = false,
}: Readonly<Props<T>>) => {
	const { t } = useTranslation("finances");
	const { t: commonT } = useTranslation("common");

	const table = useTable<T>({
		rowKey: "id",
		data,
		columns: [
			{
				label: t().transaction.models.transaction.subject.Label,
				accessorKey: "subject",
			},
			{
				label: t().transaction.models.transaction.amount.Label,
				accessorKey: "amount",
				render: (row) => <RenderCurrency amount={row.amount} />,
			},
			{
				label: t().transaction.models.transaction.performedAt.Label,
				accessorKey: "performedAt",
				render: (row) =>
					row.performedAtPrecision === TimePrecision.DATE ? (
						<DateRender date={row.performedAt} />
					) : (
						<DatetimeRender date={row.performedAt} />
					),
			},
			{
				label: t().category.expressions.Category,
				render: (row) => <Text>{row.category?.name}</Text>,
				classNames: { cellContent: "min-w-[8rem] text-center" },
			},
			...(showAccount
				? [
						{
							label: t().account.expressions.Account,
							render: (row) => <Text>{row.account?.name}</Text>,
							classNames: { cellContent: "min-w-[8rem] text-center" },
						} satisfies TableColumn<T>,
					]
				: []),
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
	});

	return (
		<div>
			<Table
				table={table}
				loading={loading}
				classNames={{ root: "max-h-[25rem]" }}
			/>
		</div>
	);
};
