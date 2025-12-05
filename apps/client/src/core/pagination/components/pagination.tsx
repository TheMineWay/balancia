import { PageSizeSelector } from "@core/pagination/components/page-size-selector";
import type { UsePagination } from "@core/pagination/hooks/use-pagination";
import { Group, Pagination as MantinePagination } from "@mantine/core";

type Props = {
	pagination: UsePagination;
};

export const Pagination: FC<Props> = ({ pagination }) => {
	return (
		<Group>
			<MantinePagination size="sm" {...pagination.control} total={200} />
			<PageSizeSelector
				size="sm"
				value={pagination.pagination.limit}
				onChange={pagination.setLimit}
			/>
		</Group>
	);
};
