import { SelectSearch } from "@common/extended-ui/form/components/search/select-search";
import { useDebouncedSearch } from "@common/extended-ui/form/components/search/use-debounced-search";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { useMyCategoriesQuery } from "@fts/finances/categories/api/use-my-categories.query";
import type { CategoryModel } from "@shared/models";
import { useMemo } from "react";

type Props = {
	onChange?: (categoryId: CategoryModel["id"] | null) => void;
	value: CategoryModel["id"] | null;
	allowClear?: boolean;
};

export const MyCategoriesSelector: FC<Props> = ({
	onChange,
	value,
	allowClear,
}) => {
	const pagination = usePagination();
	const search = useDebouncedSearch();

	const { data: categories = { items: [], total: 0 } } = useMyCategoriesQuery({
		pagination,
		search: { search: search.debouncedValue },
	});

	const options = useMemo(
		() =>
			categories.items.map((item) => ({
				label: item.name,
				value: item.id,
			})),
		[categories],
	);

	return (
		<SelectSearch<CategoryModel["id"]>
			data={options}
			search={search}
			setValue={(v) => onChange?.(v)}
			value={value}
			allowClear={allowClear}
		/>
	);
};
