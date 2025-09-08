import { Table } from "@common/extended-ui/table/components/table";
import { useTable } from "@common/extended-ui/table/hooks/use-table";
import { useTranslation } from "@i18n/use-translation";
import type { TagModel } from "@shared/models";

type Props = {
	tags?: TagModel[];
	loading?: boolean;

	onEditClick?: (tag: TagModel) => void;
	onDeleteClick?: (tag: TagModel) => void;
};

export const TagsTable: FC<Props> = ({ tags = [], loading = false }) => {
	const { t } = useTranslation("finances");

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
		],
	});

	return <Table table={table} />;
};
