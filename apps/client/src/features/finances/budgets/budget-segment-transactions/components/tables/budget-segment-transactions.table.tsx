import { RenderCurrency } from "@common/extended-ui/currency/render-currency";
import { DateRender } from "@common/extended-ui/date/components/date-render";
import { DatetimeRender } from "@common/extended-ui/date/components/datetime-render";
import { Table } from "@common/extended-ui/table/components/table";
import { TABLE_ACTION_PROPS } from "@common/extended-ui/table/constants/table.constants";
import { useTable } from "@common/extended-ui/table/hooks/use-table";
import { useTranslation } from "@i18n/use-translation";
import { ActionIcon, Badge, Group, Text } from "@mantine/core";
import {
	type BudgetSegmentImputationWithTransactionModel,
	TimePrecision,
} from "@shared/models";
import { BiArrowToRight, BiCross } from "react-icons/bi";

type Props<T extends BudgetSegmentImputationWithTransactionModel> = {
	data?: T[];
	loading?: boolean;
	onRemoveImputationClick?: (
		item: BudgetSegmentImputationWithTransactionModel,
	) => void;
};

export const BudgetSegmentTransactionsTable = <
	T extends
		BudgetSegmentImputationWithTransactionModel = BudgetSegmentImputationWithTransactionModel,
>({
	data,
	loading = false,
	onRemoveImputationClick,
}: Readonly<Props<T>>) => {
	const { t } = useTranslation("finances");
	const { t: commonT } = useTranslation("common");

	const table = useTable<T>({
		rowKey: "id",
		data,
		columns: [
			{
				label: t().transaction.models.transaction.subject.Label,
				render: (row) => <Text>{row.transaction.subject}</Text>,
			},
			{
				label: t().transaction.models.transaction.amount.Label,
				render: (row) => (
					<Group justify="center" gap="xs">
						<RenderCurrency amount={row.transaction.amount} />
						{row.percent !== 100 && <BiArrowToRight />}
						{row.percent !== 100 && (
							<Badge variant="outline">
								<RenderCurrency
									amount={row.transaction.amount * (row.percent / 100)}
								/>
							</Badge>
						)}
					</Group>
				),
				classNames: { cellContent: "min-w-[6rem] text-center" },
			},
			{
				label: "%",
				render: (row) => (
					<Badge size="md" variant={row.percent === 100 ? "filled" : "outline"}>
						{row.percent}%
					</Badge>
				),
			},
			{
				label: t().transaction.models.transaction.performedAt.Label,
				render: ({ transaction }) =>
					transaction.performedAtPrecision === TimePrecision.DATE ? (
						<DateRender date={transaction.performedAt} />
					) : (
						<DatetimeRender date={transaction.performedAt} />
					),
			},
			{
				label: t().category.expressions.Category,
				render: (row) => <Text>{row.category?.name}</Text>,
				classNames: { cellContent: "min-w-[8rem] text-center" },
			},
			{
				label: t().account.expressions.Account,
				render: (row) => <Text>{row.account?.name}</Text>,
				classNames: { cellContent: "min-w-[8rem] text-center" },
			},
			{
				label: commonT().expressions.Actions,
				render: (item) => (
					<Group>
						{onRemoveImputationClick && (
							<ActionIcon
								{...TABLE_ACTION_PROPS.danger}
								onClick={() => onRemoveImputationClick(item)}
								aria-label={commonT().expressions.Delete}
							>
								<BiCross />
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
