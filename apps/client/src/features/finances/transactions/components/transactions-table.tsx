import { DateRender } from "@common/extended-ui/date/components/date-render";
import { DatetimeRender } from "@common/extended-ui/date/components/datetime-render";
import { Table } from "@common/extended-ui/table/components/table";
import { useTable } from "@common/extended-ui/table/hooks/use-table";
import { useTranslation } from "@i18n/use-translation";
import { ActionIcon, Group } from "@mantine/core";
import { TimePrecision, type TransactionModel } from "@shared/models";
import { BiEdit, BiTrash } from "react-icons/bi";

type Props = {
	data?: TransactionModel[];
	loading?: boolean;
	onDeleteClick?: (item: TransactionModel) => void;
};

export const TransactionsTable: FC<Props> = ({ data, loading = false, onDeleteClick }) => {
	const { t } = useTranslation("transaction");
	const { t: commonT } = useTranslation("common");

	const table = useTable<TransactionModel>({
		rowKey: "id",
		data,
		columns: [
			{
				label: t().models.transaction.subject.Label,
				accessorKey: "subject",
			},
			{
				label: t().models.transaction.amount.Label,
				accessorKey: "amount",
			},
			{
				label: t().models.transaction.performedAt.Label,
				accessorKey: "performedAt",
				render: (row) =>
					row.performedAtPrecision === TimePrecision.DATE ? (
						<DateRender date={row.performedAt} />
					) : (
						<DatetimeRender date={row.performedAt} />
					),
			},
			{
				label: commonT().expressions.Actions,
				render: (item) => (
					<Group>
						<ActionIcon aria-label={commonT().expressions.Edit}>
							<BiEdit />
						</ActionIcon>
						{onDeleteClick && <ActionIcon onClick={() => onDeleteClick(item)} color="red" aria-label={commonT().expressions.Delete}>
							<BiTrash />
						</ActionIcon>}
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
