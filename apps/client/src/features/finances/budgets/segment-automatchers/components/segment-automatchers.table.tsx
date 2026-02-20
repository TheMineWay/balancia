import { Table } from "@common/extended-ui/table/components/table";
import { useTable } from "@common/extended-ui/table/hooks/use-table";
import { useTranslation } from "@i18n/use-translation";
import { ActionIcon, Group } from "@mantine/core";
import type {
	BudgetSegmentCategoryAutoMatcherListItemModel,
	BudgetSegmentCategoryAutoMatcherModel,
} from "@shared/models";
import type { FC } from "react";
import { BiTrash } from "react-icons/bi";

export interface SegmentAutomatchersTableProps {
	data?: BudgetSegmentCategoryAutoMatcherListItemModel[];
	loading?: boolean;
	onDeleteClick?: (matcher: BudgetSegmentCategoryAutoMatcherModel) => void;

	// Customization
	hideCategoryColumn?: boolean;
	hideSegmentColumn?: boolean;
}

export const SegmentAutomatchersTable: FC<SegmentAutomatchersTableProps> = ({
	data = [],
	loading = false,
	onDeleteClick,

	// Customization
	hideCategoryColumn = false,
	hideSegmentColumn = false,
}) => {
	const { t } = useTranslation("budget");
	const { t: commonT } = useTranslation("common");
	const { t: financesT } = useTranslation("finances");

	const table = useTable<BudgetSegmentCategoryAutoMatcherListItemModel>({
		rowKey: (row) => `${row.segmentId}-${row.categoryId}`,
		data,
		columns: [
			{
				label: t().models["budget-segment"].name?.Label ?? "Segment",
				accessorKey: "segmentName",
				hidden: hideSegmentColumn,
			},
			{
				label: financesT().category.expressions.Category,
				accessorKey: "categoryName",
				hidden: hideCategoryColumn,
			},
			{
				label: commonT().expressions.Actions,
				render: (item) => (
					<Group>
						{onDeleteClick && (
							<ActionIcon
								color="red"
								variant="light"
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
		<Table<BudgetSegmentCategoryAutoMatcherListItemModel>
			table={table}
			loading={loading}
			classNames={{ root: "max-h-[25rem]" }}
		/>
	);
};
