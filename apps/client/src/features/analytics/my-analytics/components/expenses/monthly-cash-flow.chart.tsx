import { ChartWrapper } from "@common/extended-ui/chart/components/wrapper/chart-wrapper";
import { useChart } from "@common/extended-ui/chart/hooks/use-chart";
import type { TFunction } from "@i18n/types/t-function.type";
import { useTranslation } from "@i18n/use-translation";
import { type LineSeries, ResponsiveLine } from "@nivo/line";
import type { MonthlyCashFlowModel } from "@shared/models";
import { format } from "date-fns";
import { useMemo } from "react";

type Props = {
	data?: MonthlyCashFlowModel[];
};

export const MonthlyCashFlowChart: FC<Props> = ({ data: rawData = [] }) => {
	const { t } = useTranslation("common");

	const { control } = useChart();
	const data = useMemo<LineSeries[]>(
		() => getChartData(rawData, t),
		[rawData, t],
	);

	return (
		<ChartWrapper>
			<ResponsiveLine
				{...control}
				data={data}
				margin={{ top: 50, right: 100, bottom: 50, left: 60 }}
				yScale={{
					type: "linear",
					min: "auto",
					max: "auto",
					stacked: false,
					reverse: false,
				}}
				axisBottom={{ legend: t().expressions.dates.Month, legendOffset: 36 }}
				axisLeft={{
					legend: t().expressions.Amount,
					legendOffset: -40,
					format: (value) => `${value} €`,
				}}
				pointSize={10}
				pointBorderWidth={1}
				useMesh={true}
				legends={[
					{
						anchor: "right",
						direction: "column",
						translateX: 100,
						itemWidth: 80,
						itemHeight: 22,
						symbolShape: "circle",
					},
				]}
			/>
		</ChartWrapper>
	);
};

/* Internal */
type LineSeriesItem = {
	x: string;
	y: number;
};

const getChartData = (
	items: MonthlyCashFlowModel[],
	t: TFunction<"common">,
): LineSeries[] => {
	const incomeSeries: LineSeriesItem[] = [];
	const outcomeSeries: LineSeriesItem[] = [];

	items.forEach((entry) => {
		const date = new Date(entry.year, entry.month - 1);
		const label = format(date, "MMM yyyy");
		incomeSeries.push({ x: label, y: entry.income });
		outcomeSeries.push({ x: label, y: entry.outcome });
	});

	return [
		{ id: t().expressions.Income, data: incomeSeries },
		{ id: t().expressions.Outcome, data: outcomeSeries },
	];
};
