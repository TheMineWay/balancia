import { MonthRangePicker } from "@common/extended-ui/date/components/range/month-range-picker";
import type { DateRange } from "@common/extended-ui/date/hooks/use-date-range";
import { useMonthDateRange } from "@common/extended-ui/date/hooks/use-month-date-range";
import { useMyAccountCategoryExpensesStats } from "@fts/analytics/my-analytics/api/use-my-account-category-expenses-stats.query";
import { useMyAccountMonthlyStatsQuery } from "@fts/analytics/my-analytics/api/use-my-account-monthly-stats.query";
import { CategoryExpensesDonutChart } from "@fts/analytics/my-analytics/components/charts/category-expenses-donut.chart";
import { MonthlyCashFlowChart } from "@fts/analytics/my-analytics/components/charts/monthly-cash-flow.chart";
import { MyAccountsSelector } from "@fts/finances/accounts/my-accounts/components/form/my-accounts.selector";
import { MAX_STATS_MONTH_DATE_DIFF } from "@shared/constants";
import type { AccountModel } from "@shared/models";
import { addMonths } from "date-fns";
import { useState } from "react";

const DEFAULT_RANGE: DateRange = {
	from: addMonths(new Date(), -6),
	to: new Date(),
};

type Props = {
	mainAccountId: AccountModel["id"];
};

export const MainAnalyticsDashboard: FC<Props> = ({ mainAccountId }) => {
	const [accountId, setAccountId] = useState(mainAccountId);
	const monthlyStatsRange = useMonthDateRange({
		initialRange: DEFAULT_RANGE,
	});
	const { data: monthlyStats } = useMyAccountMonthlyStatsQuery(accountId, {
		range: monthlyStatsRange.range,
	});
	const { data: categoryExpensesStats } = useMyAccountCategoryExpensesStats(
		accountId,
		{
			range: monthlyStatsRange.range,
		},
	);

	return (
		<div className="flex flex-col gap-2">
			<MyAccountsSelector
				value={accountId}
				onChange={(id) => {
					if (id) setAccountId(id);
				}}
				size="xs"
			/>
			<MonthRangePicker
				value={monthlyStatsRange.range}
				onChange={monthlyStatsRange.setRange}
				maxDiff={MAX_STATS_MONTH_DATE_DIFF}
			/>
			<div className="grid gap-2">
				<div className="h-100">
					<CategoryExpensesDonutChart data={categoryExpensesStats?.stats} />
				</div>
				<div className="h-100">
					<MonthlyCashFlowChart data={monthlyStats?.stats} />
				</div>
			</div>
		</div>
	);
};
