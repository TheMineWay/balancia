import { Table } from "@common/extended-ui/table/components/table";
import { TABLE_ACTION_PROPS } from "@common/extended-ui/table/constants/table.constants";
import { useTable } from "@common/extended-ui/table/hooks/use-table";
import { useTranslation } from "@i18n/use-translation";
import { ActionIcon, Group } from "@mantine/core";
import type { TagModel } from "@shared/models";
import { BiEdit, BiTrash } from "react-icons/bi";
import { RiRobot3Line } from "react-icons/ri";

type Props = {
	tags?: TagModel[];
	loading?: boolean;

	onEditClick?: (tag: TagModel) => void;
	onDeleteClick?: (tag: TagModel) => void;
	onTriggerManagerClick?: (tag: TagModel) => void;
};

export const TagsTable: FC<Props> = ({
	tags = [],
	loading = false,

	// Events
	onEditClick,
	onDeleteClick,
	onTriggerManagerClick,
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
						{onTriggerManagerClick && (
							<ActionIcon
								{...TABLE_ACTION_PROPS.default}
								onClick={() => onTriggerManagerClick(item)}
								aria-label={
									commonT().components.automatisms["auto-matcher"].Title
								}
							>
								<RiRobot3Line />
							</ActionIcon>
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

	return <Table table={table} loading={loading} />;
};
