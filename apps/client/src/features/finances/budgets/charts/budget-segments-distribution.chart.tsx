import { ChartWrapper } from "@common/extended-ui/chart/components/wrapper/chart-wrapper";
import { useChart } from "@common/extended-ui/chart/hooks/use-chart";
import { useTranslation } from "@i18n/use-translation";
import { Flex, Pill } from "@mantine/core";
import { ResponsiveBar } from "@nivo/bar";
import type { BudgetSegmentModel } from "@shared/models";
import { useMemo } from "react";
import { IoAlert } from "react-icons/io5";

type Props = {
	segments: BudgetSegmentModel[];
};

export const BudgetSegmentsDistributionChart: FC<Props> = ({ segments }) => {
	const { t } = useTranslation("charts");

	const { control } = useChart("bar");

	const segmentsMap = useMemo(() => {
		const map: Record<string, { name: string }> = {};
		segments.forEach((segment) => {
			map[segment.id] = {
				name: segment.name,
			};
		});

		map[0] = {
			name: t().budget["segments-distribution"].expressions.Remaining,
		};
		return map;
	}, [segments, t]);

	const { data } = useMemo(() => {
		const remainingPercent = Math.max(
			0,
			100 -
				Object.values(segments).reduce(
					(sum, segment) => sum + segment.percent,
					0,
				),
		);

		const data = Object.values(segments).reduce<
			Record<string, number | string>
		>((prev, curr) => {
			prev[curr.id] = curr.percent;
			return prev;
		}, {});

		if (remainingPercent > 0) {
			data[0] = remainingPercent;
		}

		data["budget"] = "";

		return { data, remainingPercent };
	}, [segments]);

	return (
		<ChartWrapper
			empty={Object.keys(data).length === 0}
			title={t().budget["segments-distribution"].Title}
		>
			<ResponsiveBar
				data={[data]}
				indexBy="budget"
				labelSkipWidth={12}
				labelSkipHeight={12}
				layout="horizontal"
				margin={{ right: 10, bottom: 25, left: 10 }}
				keys={Object.keys(data)}
				valueFormat={(value) => `${value}%`}
				markers={[
					{
						value: 100,
						axis: "x",
					},
				]}
				tooltip={(op) => (
					<Pill
						styles={{
							root: { backgroundColor: op.id === "0" ? "red" : undefined },
							label: { color: op.id === "0" ? "white" : undefined },
						}}
					>
						<Flex gap="xs" align="center" className="bg-content">
							{op.id === "0" && <IoAlert />} {segmentsMap[op.id]?.name}
						</Flex>
					</Pill>
				)}
				{...control}
			/>
		</ChartWrapper>
	);
};
