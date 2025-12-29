import { RenderCurrency } from "@common/extended-ui/currency/render-currency";
import { DateRender } from "@common/extended-ui/date/components/date-render";
import { Table } from "@common/extended-ui/table/components/table";
import { TABLE_ACTION_PROPS } from "@common/extended-ui/table/constants/table.constants";
import { useTable } from "@common/extended-ui/table/hooks/use-table";
import { useTranslation } from "@i18n/use-translation";
import { ActionIcon, Group } from "@mantine/core";
import type { BudgetModel } from "@shared/models";
import { Link } from "@tanstack/react-router";
import { BiEdit, BiTrash } from "react-icons/bi";
import { MdOutlineCategory } from "react-icons/md";

type Props<T extends BudgetModel> = {
	data?: T[];
	loading?: boolean;

	// Events
	onEditClick?: (item: T) => void;
	onDeleteClick?: (item: T) => void;

	// Actions
	segmentPlannerEnabled?: boolean;
};

export const BudgetsTable = <T extends BudgetModel = BudgetModel>({
	data = [],
	loading = false,

	// Events
	onEditClick,
	onDeleteClick,
	segmentPlannerEnabled = true,
}: Readonly<Props<T>>) => {
	const { t } = useTranslation("budget");
	const { t: commonT } = useTranslation("common");

	const table = useTable<T>({
		rowKey: "id",
		data,
		columns: [
			{
				label: t().models.budget.name.Label,
				accessorKey: "name",
			},
			{
				label: t().models.budget.description.Label,
				accessorKey: "description",
			},
			{
				label: t().models.budget.amount.Label,
				accessorKey: "amount",
				render: (item) => <RenderCurrency amount={item.amount} />,
			},
			{
				label: t().models.budget["from-date"].Label,
				accessorKey: "fromDate",
				render: (item) => <DateRender date={item.fromDate} />,
			},
			{
				label: t().models.budget["to-date"].Label,
				accessorKey: "toDate",
				render: (item) => <DateRender date={item.toDate} />,
			},
			{
				label: commonT().expressions.Actions,
				render: (item) => (
					<Group>
						{segmentPlannerEnabled && (
							<Link
								to="/finances/budgets/segments/$segment-id"
								params={{ "segment-id": item.id.toString() }}
							>
								<ActionIcon
									{...TABLE_ACTION_PROPS.default}
									aria-label={
										t()["my-budgets"].manager.Actions["Manage-segments"]
									}
								>
									<MdOutlineCategory />
								</ActionIcon>
							</Link>
						)}
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

	return (
		<Table<T>
			table={table}
			loading={loading}
			classNames={{ root: "max-h-[25rem]" }}
		/>
	);
};
