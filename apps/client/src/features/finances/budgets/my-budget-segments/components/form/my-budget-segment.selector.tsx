import {
	SelectSearch,
	type SelectSearchProps,
} from "@common/extended-ui/form/components/search/select-search";
import { useSearch } from "@common/extended-ui/form/hooks/use-search";
import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import { useMyBudgetSegmentsByBudgetQuery } from "@fts/finances/budgets/my-budget-segments/api/use-my-budget-segments-by-budget.query";
import { useTranslation } from "@i18n/use-translation";
import { MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION } from "@shared/api-definition";
import type { BudgetModel, BudgetSegmentModel } from "@shared/models";
import { useCallback, useMemo } from "react";
import { BiListUl } from "react-icons/bi";

type Props = {
	budgetId: BudgetModel["id"];
	onChange?: (segmentId: BudgetSegmentModel["id"] | null) => void;
	value: BudgetSegmentModel["id"] | null;
	allowClear?: boolean;
} & Omit<
	SelectSearchProps<BudgetSegmentModel["id"]>,
	"data" | "search" | "value" | "setValue" | "getKey"
>;

export const MyBudgetSegmentSelector: FC<Props> = ({
	budgetId,
	onChange,
	value,
	...props
}) => {
	const { t } = useTranslation("budget");
	const { request } = useAuthenticatedRequest();

	const search = useSearch<BudgetSegmentModel>({});
	const { data: segments = [] } = useMyBudgetSegmentsByBudgetQuery({
		budgetId,
	});

	const options = useMemo(
		() =>
			segments.map((item) => ({
				label: item.name,
				value: item.id,
			})),
		[segments],
	);

	// Fetch segment details by id. In case it has not been fetched
	const valueFetch = useCallback(
		async (id: BudgetSegmentModel["id"]) => {
			const selectedSegment = await endpointQuery(
				MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION,
				"get",
				{ segmentId: id.toString() },
				request,
				{},
			)();

			return {
				value: selectedSegment.id,
				label: selectedSegment.name,
			};
		},
		[request],
	);

	return (
		<SelectSearch<BudgetSegmentModel["id"]>
			data={options}
			getKey={(v) => v}
			search={search.debouncedSearchManager}
			setValue={(v) => onChange?.(v)}
			value={value}
			valueFetch={valueFetch}
			leftSection={<BiListUl />}
			aria-label={t().expressions["Budget-segment"]}
			{...props}
		/>
	);
};
