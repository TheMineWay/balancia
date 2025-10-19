import { MonthRangePicker } from "@common/extended-ui/date/components/range/month-range-picker";
import {
	DateRange,
	useDateRange,
} from "@common/extended-ui/date/hooks/use-date-range";
import { useMyAccountMonthlyStatsQuery } from "@fts/analytics/my-analytics/api/use-my-account-monthly-stats.query";
import { MonthlyCashFlowChart } from "@fts/analytics/my-analytics/components/expenses/monthly-cash-flow.chart";
import type { AccountModel } from "@shared/models";
import { addMonths } from "date-fns";

const DEFAULT_RANGE: DateRange = {
	from: addMonths(new Date(), -6),
	to: new Date(),
};

type Props = {
	mainAccountId: AccountModel["id"];
};

export const MainAnalyticsDashboard: FC<Props> = ({ mainAccountId }) => {
	const monthlyStatsRange = useDateRange();
	const { data: monthlyStats } = useMyAccountMonthlyStatsQuery(mainAccountId, {
		range: monthlyStatsRange.range,
	});

	return (
		<div className="flex flex-col gap-2 h-100">
			<MonthRangePicker
				value={monthlyStatsRange.range}
				onChange={monthlyStatsRange.setRange}
			/>
			<MonthlyCashFlowChart data={monthlyStats?.stats} />
		</div>
	);
};
