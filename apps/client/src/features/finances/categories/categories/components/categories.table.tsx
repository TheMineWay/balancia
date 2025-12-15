import { Table } from "@common/extended-ui/table/components/table";
import { TABLE_ACTION_PROPS } from "@common/extended-ui/table/constants/table.constants";
import { useTable } from "@common/extended-ui/table/hooks/use-table";
import { useTranslation } from "@i18n/use-translation";
import { ActionIcon, Group } from "@mantine/core";
import type { CategoryModel } from "@shared/models";
import { BiEdit, BiTrash } from "react-icons/bi";

type Props<T = CategoryModel> = {
	categories?: T[];
	loading?: boolean;

	// Events
	onEditClick?: (item: T) => void;
	onDeleteClick?: (item: T) => void;
};

export const CategoriesTable: FC<Props> = ({
	categories = [],
	loading = false,

	// Events
	onDeleteClick,
	onEditClick,
}) => {
	const { t } = useTranslation("finances");
	const { t: commonT } = useTranslation("common");

	const table = useTable<CategoryModel>({
		rowKey: "id",
		data: categories,
		columns: [
			{
				label: t().category.models.category.name.Label,
				accessorKey: "name",
			},
			{
				label: t().category.models.category.description.Label,
				accessorKey: "description",
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

	return (
		<Table
			table={table}
			loading={loading}
			classNames={{ root: "max-h-[25rem]" }}
		/>
	);
};
