import { BudgetSegmentsDistributionChart } from "@fts/finances/budgets/charts/budget-segments-distribution.chart";
import { Title } from "@mantine/core";
import type { BudgetModel, BudgetSegmentModel } from "@shared/models";

type Props = {
	budget: BudgetModel;
	segments: BudgetSegmentModel[];
};

export const BudgetSummary: FC<Props> = ({ budget, segments }) => {
	return (
		<div className="flex flex-col gap-2">
			<Title>{budget.name}</Title>

			{/* Segment usage chart */}
			<div className="h-20">
				<BudgetSegmentsDistributionChart segments={segments} />
			</div>
		</div>
	);
};
