import { BudgetSegmentsUsageChart } from "@fts/finances/budgets/charts/budget-segments-usage.chart";
import { Divider, Text, Title } from "@mantine/core";
import type { BudgetModel, BudgetSegmentModel } from "@shared/models";

type Props = {
	budget: BudgetModel;
	segments: BudgetSegmentModel[];
};

export const BudgetSummary: FC<Props> = ({ budget, segments }) => {
	return (
		<div className="flex flex-col gap-2">
			<Title>{budget.name}</Title>
			{budget.description && <Text>{budget.description}</Text>}
			<Divider />

			{/* Segment usage chart */}
			<div className="h-20 my-2">
				<BudgetSegmentsUsageChart segments={segments} />
			</div>
		</div>
	);
};
