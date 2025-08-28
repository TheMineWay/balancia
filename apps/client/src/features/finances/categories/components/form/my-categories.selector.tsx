import {
	SelectSearch,
	type SelectSearchProps,
} from "@common/extended-ui/form/components/search/select-search";
import { useDebouncedSearch } from "@common/extended-ui/form/components/search/use-debounced-search";
import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import { useMyCategoriesQuery } from "@fts/finances/categories/api/use-my-categories.query";
import { MY_CATEGORY_CONTROLLER } from "@shared/api-definition";
import type { CategoryModel } from "@shared/models";
import { useCallback, useMemo } from "react";

type Props = {
	onChange?: (categoryId: CategoryModel["id"] | null) => void;
	value: CategoryModel["id"] | null;
} & Omit<
	SelectSearchProps<CategoryModel["id"]>,
	"data" | "search" | "value" | "setValue"
>;

export const MyCategoriesSelector: FC<Props> = ({
	onChange,
	value,
	...props
}) => {
	const pagination = usePagination();
	const search = useDebouncedSearch();
	const { request } = useAuthenticatedRequest();

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

	const valueFetch = useCallback(
		async (categoryId: CategoryModel["id"]) => {
			const selectedCategory = await endpointQuery(
				MY_CATEGORY_CONTROLLER,
				"getCategory",
				{ id: categoryId.toString() },
				request,
				{},
			)();

			return {
				value: selectedCategory.id,
				label: selectedCategory.name,
			};
		},
		[request],
	);

	return (
		<SelectSearch<CategoryModel["id"]>
			data={options}
			search={search}
			setValue={(v) => onChange?.(v)}
			value={value}
			valueFetch={valueFetch}
			{...props}
		/>
	);
};
