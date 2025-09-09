import { Table } from "@common/extended-ui/table/components/table";
import { useTable } from "@common/extended-ui/table/hooks/use-table";
import { useTranslation } from "@i18n/use-translation";
import { ActionIcon, Group } from "@mantine/core";
import type { TagModel } from "@shared/models";
import { BiEdit, BiTrash } from "react-icons/bi";

type Props = {
	tags?: TagModel[];
	loading?: boolean;

	onEditClick?: (tag: TagModel) => void;
	onDeleteClick?: (tag: TagModel) => void;
};

export const TagsTable: FC<Props> = ({
	tags = [],
	loading = false,
	onEditClick,
	onDeleteClick,
}) => {
	const { t } = useTranslation("finances");
	const { t: commonT } = useTranslation("common");

	const table = useTable({
		rowKey: "id",
		data: tags,
		columns: [
			{
				accessorKey: "name",
				label: t().tag.models.tag.name.Label,
			},
			{
				accessorKey: "description",
				label: t().tag.models.tag.description.Label,
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
	});

	return <Table table={table} loading={loading} />;
};
