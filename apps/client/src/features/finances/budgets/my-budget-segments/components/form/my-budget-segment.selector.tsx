import {
	SelectSearch,
	type SelectSearchProps,
} from "@common/extended-ui/form/components/search/select-search";
import { useSearch } from "@common/extended-ui/form/hooks/use-search";
import { useMyBudgetSegmentsByBudgetQuery } from "@fts/finances/budgets/my-budget-segments/api/use-my-budget-segments-by-budget.query";
import { useTranslation } from "@i18n/use-translation";
import type { BudgetModel, BudgetSegmentModel } from "@shared/models";
import { useMemo } from "react";
import { BiListUl } from "react-icons/bi";

type Props = {
	budgetId: BudgetModel["id"];
	onChange?: (segment: BudgetSegmentModel | null) => void;
	value: BudgetSegmentModel["id"] | null;
	allowClear?: boolean;
} & Omit<
	SelectSearchProps<BudgetSegmentModel["id"], BudgetSegmentModel>,
	"data" | "search" | "value" | "setValue" | "getKey"
>;

export const MyBudgetSegmentSelector: FC<Props> = ({
	budgetId,
	onChange,
	value,
	...props
}) => {
	const { t } = useTranslation("budget");

	const search = useSearch<BudgetSegmentModel>({});
	const { data: segments = [] } = useMyBudgetSegmentsByBudgetQuery({
		budgetId,
	});

	const options = useMemo(
		() =>
			segments.map((item) => ({
				label: item.name,
				value: item,
			})),
		[segments],
	);

	return (
		<SelectSearch<BudgetSegmentModel["id"], BudgetSegmentModel>
			data={options}
			getKey={(v) => v.id}
			search={search.debouncedSearchManager}
			setValue={(v) => onChange?.(v)}
			value={value}
			leftSection={<BiListUl />}
			aria-label={t().expressions["Budget-segment"]}
			{...props}
		/>
	);
};
