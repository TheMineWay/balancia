import { DatetimeRender } from "@common/extended-ui/date/components/datetime-render";
import { Table } from "@common/extended-ui/table/components/table";
import { useTable } from "@common/extended-ui/table/hooks/use-table";
import type { TableColumn } from "@common/extended-ui/table/types/table-column.type";
import { useTranslation } from "@i18n/use-translation";
import { ActionIcon, Group } from "@mantine/core";
import type { TagAutomatcherModel } from "@shared/models";
import { useMemo } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";

type Props = {
	automatchers?: TagAutomatcherModel[];
	loading?: boolean;

	// Events
	onDeleteClick?: (automatcher: TagAutomatcherModel) => void;
	onEditClick?: (automatcher: TagAutomatcherModel) => void;
};

export const TagsAutomatchersTable: FC<Props> = ({
	automatchers = [],
	loading = false,

	// Events
	onDeleteClick,
	onEditClick,
}) => {
	const { t } = useTranslation("common");

	const columns = useMemo<TableColumn<TagAutomatcherModel>[]>(
		() => [
			{
				accessorKey: "name",
				label:
					t().components.automatisms["auto-matcher"].table.columns.name.Title,
			},
			{
				accessorKey: "description",
				label:
					t().components.automatisms["auto-matcher"].table.columns.description
						.Title,
			},
			{
				accessorKey: "createdAt",
				label: t().expressions["Created-at"],
				render: (row) => <DatetimeRender date={row.createdAt} />,
			},
			{
				label: t().expressions.Actions,
				render: (item) => (
					<Group>
						{onEditClick && (
							<ActionIcon
								onClick={() => onEditClick(item)}
								aria-label={t().expressions.Edit}
							>
								<BiEdit />
							</ActionIcon>
						)}
						{onDeleteClick && (
							<ActionIcon
								onClick={() => onDeleteClick(item)}
								aria-label={t().expressions.Delete}
								color="red"
							>
								<BiTrash />
							</ActionIcon>
						)}
					</Group>
				),
			},
		],
		[t, onDeleteClick, onEditClick],
	);

	const table = useTable<TagAutomatcherModel>({
		rowKey: "id",
		columns,
		data: automatchers,
	});

	return <Table table={table} loading={loading} />;
};
