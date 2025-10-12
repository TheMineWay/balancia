import { MonthRangePicker } from "@common/extended-ui/date/components/range/month-range-picker";
import { useMyAccountMonthlyStatsQuery } from "@fts/analytics/my-analytics/api/use-my-account-monthly-stats.query";
import { MonthlyCashFlowChart } from "@fts/analytics/my-analytics/components/expenses/monthly-cash-flow.chart";
import type { AccountModel } from "@shared/models";

type Props = {
	mainAccountId: AccountModel["id"];
};

export const MainAnalyticsDashboard: FC<Props> = ({ mainAccountId }) => {
	const { data: monthlyStats } = useMyAccountMonthlyStatsQuery(mainAccountId);

	return (
		<div className="flex flex-col gap-2 h-100">
			<MonthRangePicker />
			<MonthlyCashFlowChart data={monthlyStats?.stats} />
		</div>
	);
};
