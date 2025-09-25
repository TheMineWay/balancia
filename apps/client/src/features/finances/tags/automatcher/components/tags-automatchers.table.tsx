import { Table } from "@common/extended-ui/table/components/table";
import { useTable } from "@common/extended-ui/table/hooks/use-table";
import type { TagAutomatcherModel } from "@shared/models";

type Props = {
	automatchers?: TagAutomatcherModel[];
	loading?: boolean;
};

export const TagsAutomatchersTable: FC<Props> = ({
	automatchers = [],
	loading = false,
}) => {
	const table = useTable<TagAutomatcherModel>({
		rowKey: "id",
		columns: [],
		data: automatchers,
	});

	return <Table table={table} loading={loading} />;
};
