import { MyBudgetSegmentsManager } from "@fts/finances/budgets/my-budget-segments/components/manager/my-budget-segments-manager";
import type { BudgetModel } from "@shared/models";

type Props = {
	budget: BudgetModel;
};

export const MyBudgetSegmentsDashboard: FC<Props> = ({ budget }) => {
	return (
		<div>
			<MyBudgetSegmentsManager budgetId={budget.id} />
		</div>
	);
};
