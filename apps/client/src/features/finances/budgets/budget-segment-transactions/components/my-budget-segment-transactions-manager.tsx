import { TransactionsTable } from "@fts/finances/transactions/transactions/components/transactions-table";
import { ManagerLayout } from "@layouts/manager/manager.layout";
import type { BudgetSegmentModel } from "@shared/models";

type Props = {
	segment: BudgetSegmentModel;
};

export const MyBudgetSegmentTransactionsManager: FC<Props> = () => {
	return (
		<ManagerLayout.Root>
			<ManagerLayout.Title></ManagerLayout.Title>
			<ManagerLayout.Content>
				{/* TABLE */}
				<TransactionsTable />
			</ManagerLayout.Content>
		</ManagerLayout.Root>
	);
};
