import { DebouncedSearch } from "@common/extended-ui/form/components/search/debounced-search";
import type { UseSearch } from "@common/extended-ui/form/hooks/use-search";
import { MyAccountsSelector } from "@fts/finances/accounts/my-accounts/components/form/my-accounts.selector";
import { MyCategoriesSelector } from "@fts/finances/categories/my-categories/components/form/my-categories.selector";
import { useTranslation } from "@i18n/use-translation";
import type { TransactionFiltersModel } from "@shared/models";

type FilterOptions = {
	search: UseSearch<TransactionFiltersModel>;
};

export const TransactionFilters: FC<FilterOptions> = ({ search }) => {
	const { t } = useTranslation("finances");
	const { t: commonT } = useTranslation("common");

	const { filters, setFilter, debouncedSearchManager } = search;

	return (
		<>
			<DebouncedSearch
				manager={debouncedSearchManager}
				size="xs"
				placeholder={commonT().expressions.Search}
			/>
			<MyAccountsSelector
				value={filters.accountId ?? null}
				placeholder={t().account.expressions.Account}
				onChange={(value) => setFilter("accountId", value)}
				allowClear
				size="xs"
				autoFill={false}
			/>
			<MyCategoriesSelector
				noCategoryOption
				value={filters.categoryId ?? null}
				placeholder={t().category.expressions.Category}
				onChange={(value) => setFilter("categoryId", value)}
				allowClear
				size="xs"
			/>
			{/* <DayRangePicker
				onChange={(range) => {
					if (range) {
						setFilter("fromDate", range.from);
						setFilter("toDate", range.to);
					}
				}}
			/> */}
		</>
	);
};
