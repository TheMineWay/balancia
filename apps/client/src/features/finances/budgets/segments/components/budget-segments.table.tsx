import { RenderCurrency } from "@common/extended-ui/currency/render-currency";
import { Table } from "@common/extended-ui/table/components/table";
import { TABLE_ACTION_PROPS } from "@common/extended-ui/table/constants/table.constants";
import { useTable } from "@common/extended-ui/table/hooks/use-table";
import { useTranslation } from "@i18n/use-translation";
import { ActionIcon, Badge, Group, Text } from "@mantine/core";
import type { BudgetModel, BudgetSegmentModel } from "@shared/models";
import { BiEdit, BiTrash } from "react-icons/bi";

type Props<T extends BudgetSegmentModel> = {
	data?: T[];
	loading?: boolean;

	// Budget
	budget?: BudgetModel;

	// Events
	onEditClick?: (item: T) => void;
	onDeleteClick?: (item: T) => void;
};

export const BudgetSegmentsTable = <
	T extends BudgetSegmentModel = BudgetSegmentModel,
>({
	data = [],
	loading = false,

	// Budget
	budget,

	// Events
	onEditClick,
	onDeleteClick,
}: Readonly<Props<T>>) => {
	const { t } = useTranslation("budget");
	const { t: commonT } = useTranslation("common");

	const table = useTable<T>({
		rowKey: "id",
		data,
		columns: [
			{
				label: t().models["budget-segment"].name.Label,
				accessorKey: "name",
			},
			{
				label: t().models["budget-segment"].description.Label,
				accessorKey: "description",
			},
			{
				label: t().models["budget-segment"].percent.Label,
				accessorKey: "percent",
				render: (item) => (
					<Group gap="xs">
						<Text>{`${item.percent}%`}</Text>
						{budget && (
							<Badge variant="outline" size="sm">
								<RenderCurrency
									amount={(budget.amount * item.percent) / 100}
									size="sm"
								/>
							</Badge>
						)}
					</Group>
				),
			},
			{
				label: commonT().expressions.Actions,
				render: (item) => (
					<Group>
						{onEditClick && (
							<ActionIcon
								{...TABLE_ACTION_PROPS.default}
								onClick={() => onEditClick(item)}
								aria-label={commonT().expressions.Edit}
							>
								<BiEdit />
							</ActionIcon>
						)}
						{onDeleteClick && (
							<ActionIcon
								{...TABLE_ACTION_PROPS.danger}
								onClick={() => onDeleteClick(item)}
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

	return <Table<T> table={table} loading={loading} />;
};
