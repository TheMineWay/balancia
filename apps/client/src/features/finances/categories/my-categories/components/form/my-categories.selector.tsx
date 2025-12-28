import {
	SelectSearch,
	type SelectSearchProps,
} from "@common/extended-ui/form/components/search/select-search";
import { useSearch } from "@common/extended-ui/form/hooks/use-search";
import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import { useMyCategoriesQuery } from "@fts/finances/categories/my-categories/api/use-my-categories.query";
import { useTranslation } from "@i18n/use-translation";
import { MY_CATEGORY_CONTROLLER } from "@shared/api-definition";
import type { AccountModel, CategoryModel } from "@shared/models";
import { useCallback, useMemo } from "react";
import { FaRegFolder } from "react-icons/fa6";

type Props = {
	onChange?: (categoryId: CategoryModel["id"] | null) => void;
	value: CategoryModel["id"] | null;
	noCategoryOption?: boolean;
} & Omit<
	SelectSearchProps<CategoryModel["id"]>,
	"data" | "search" | "value" | "setValue" | "getKey"
>;

export const MyCategoriesSelector: FC<Props> = ({
	onChange,
	value,
	noCategoryOption = false,
	...props
}) => {
	const { t } = useTranslation("finances");
	const pagination = usePagination();
	const search = useSearch<AccountModel>({});
	const { request } = useAuthenticatedRequest();

	const WITHOUT_CATEGORY_OPTION = useMemo(
		() => ({
			value: -1,
			label: t().category.expressions["Without-category"],
		}),
		[t],
	);

	const { data: categories = { items: [], total: 0 } } = useMyCategoriesQuery({
		pagination,
		search,
	});

	const options = useMemo(() => {
		const _cats = categories.items.map((item) => ({
			label: item.name,
			value: item.id,
		}));

		if (noCategoryOption) {
			_cats.unshift(WITHOUT_CATEGORY_OPTION);
		}

		return _cats;
	}, [categories, noCategoryOption, WITHOUT_CATEGORY_OPTION]);

	const valueFetch = useCallback(
		async (categoryId: CategoryModel["id"]) => {
			if (noCategoryOption && categoryId === -1) {
				return WITHOUT_CATEGORY_OPTION;
			}

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
		[request, noCategoryOption, WITHOUT_CATEGORY_OPTION],
	);

	return (
		<SelectSearch<CategoryModel["id"]>
			data={options}
			getKey={(v) => v}
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
