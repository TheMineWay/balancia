import {
	SelectSearch,
	type SelectSearchProps,
} from "@common/extended-ui/form/components/search/select-search";
import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import { useSearch } from "@core/search/hooks/use-search";
import { useMyCategoriesQuery } from "@fts/finances/my-categories/api/use-my-categories.query";
import { useTranslation } from "@i18n/use-translation";
import { MY_CATEGORY_CONTROLLER } from "@shared/api-definition";
import type { AccountModel, CategoryModel } from "@shared/models";
import { useCallback, useMemo } from "react";
import { FaRegFolder } from "react-icons/fa6";

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
	const { t } = useTranslation("finances");
	const pagination = usePagination();
	const search = useSearch<AccountModel>({});
	const { request } = useAuthenticatedRequest();

	const { data: categories = { items: [], total: 0 } } = useMyCategoriesQuery({
		pagination,
		search,
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
			search={search.debouncedSearchManager}
			setValue={(v) => onChange?.(v)}
			value={value}
			valueFetch={valueFetch}
			leftSection={<FaRegFolder />}
			aria-label={t().category.expressions.Category}
			{...props}
		/>
	);
};
