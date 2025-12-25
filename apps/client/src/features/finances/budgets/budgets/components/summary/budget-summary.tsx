import { Title } from "@mantine/core";
import type { BudgetModel } from "@shared/models";

type Props = {
	budget: BudgetModel;
};

export const BudgetSummary: FC<Props> = ({ budget }) => {
	return (
		<div className="flex flex-col gap-2">
			<Title>{budget.name}</Title>
		</div>
	);
};
