import {
	SelectSearch,
	type SelectSearchProps,
} from "@common/extended-ui/form/components/search/select-search";
import { useSearch } from "@common/extended-ui/form/hooks/use-search";
import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import { useMyBudgetsQuery } from "@fts/finances/budgets/my-budgets/api/use-my-budgets.query";
import { useTranslation } from "@i18n/use-translation";
import { MY_BUDGET_CONTROLLER_DEFINITION } from "@shared/api-definition";
import type { BudgetModel } from "@shared/models";
import { useCallback, useMemo } from "react";
import { LuWallet } from "react-icons/lu";

type Props = {
	onChange?: (budgetId: BudgetModel["id"] | null) => void;
	value: BudgetModel["id"] | null;
	allowClear?: boolean;
} & Omit<
	SelectSearchProps<BudgetModel["id"]>,
	"data" | "search" | "value" | "setValue" | "getKey"
>;

export const MyBudgetsSelector: FC<Props> = ({ onChange, value, ...props }) => {
	const { t } = useTranslation("budget");
	const pagination = usePagination();
	const search = useSearch<BudgetModel>({});
	const { request } = useAuthenticatedRequest();

	const { data: budgets = { items: [], total: 0 } } = useMyBudgetsQuery({
		pagination,
		search,
	});

	const options = useMemo(
		() =>
			budgets.items.map((item) => ({
				label: item.name,
				value: item.id,
			})),
		[budgets],
	);

	// Fetch budget details by id. In case it has not been fetched
	const valueFetch = useCallback(
		async (id: BudgetModel["id"]) => {
			const selectedBudget = await endpointQuery(
				MY_BUDGET_CONTROLLER_DEFINITION,
				"get",
				{ budgetId: id.toString() },
				request,
				{},
			)();

			return {
				value: selectedBudget.id,
				label: selectedBudget.name,
			};
		},
		[request],
	);

	return (
		<SelectSearch<BudgetModel["id"]>
			data={options}
			getKey={(v) => v}
			search={search.debouncedSearchManager}
			setValue={(v) => onChange?.(v)}
			value={value}
			valueFetch={valueFetch}
			leftSection={<LuWallet />}
			aria-label={t().expressions.Budget}
			{...props}
		/>
	);
};
