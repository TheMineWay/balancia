import { ChartWrapper } from "@common/extended-ui/chart/components/wrapper/chart-wrapper";
import { useChart } from "@common/extended-ui/chart/hooks/use-chart";
import { useTranslation } from "@i18n/use-translation";
import { ResponsivePie } from "@nivo/pie";
import type { CategoryExpensesModel } from "@shared/models";
import { useMemo } from "react";

type Props = {
	data?: CategoryExpensesModel[];
};

export const CategoryExpensesDonutChart: FC<Props> = ({
	data: rawData = [],
}) => {
	const { t } = useTranslation("charts");
	const { t: tFinances } = useTranslation("finances");
	const { control } = useChart("pie");

	const data = useMemo(() => {
		return rawData.map((item) => ({
			id: item.category?.id ?? "no-category",
			label:
				item.category?.name ??
				tFinances().category.expressions["Without-category"],
			value: item.outcome,
		}));
	}, [rawData, tFinances]);

	return (
		<ChartWrapper
			empty={data.length === 0}
			title={t().charts["category-expenses-donut"].Title}
		>
			<ResponsivePie
				{...control}
				margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
				data={data}
				innerRadius={0.5}
				padAngle={0.6}
				cornerRadius={2}
				activeOuterRadiusOffset={8}
				arcLinkLabelsSkipAngle={10}
				arcLinkLabelsThickness={2}
				arcLinkLabelsColor={{ from: "color" }}
				arcLabelsSkipAngle={10}
				arcLabel={(d) => `${d.value} €`}
			/>
		</ChartWrapper>
	);
};
