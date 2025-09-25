import { Table } from "@common/extended-ui/table/components/table";
import { useTable } from "@common/extended-ui/table/hooks/use-table";
import type { TableColumn } from "@common/extended-ui/table/types/table-column.type";
import { useTranslation } from "@i18n/use-translation";
import type { TagAutomatcherModel } from "@shared/models";
import { useMemo } from "react";

type Props = {
	automatchers?: TagAutomatcherModel[];
	loading?: boolean;
};

export const TagsAutomatchersTable: FC<Props> = ({
	automatchers = [],
	loading = false,
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
		],
		[t],
	);

	const table = useTable<TagAutomatcherModel>({
		rowKey: "id",
		columns,
		data: automatchers,
	});

	return <Table table={table} loading={loading} />;
};
