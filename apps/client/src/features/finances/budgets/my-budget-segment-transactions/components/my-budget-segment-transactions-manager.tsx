import { useSearch } from "@common/extended-ui/form/hooks/use-search";
import { Pagination } from "@core/pagination/components/pagination";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { useMyBudgetSegmentTransactionsListQuery } from "@fts/finances/budgets/my-budget-segment-transactions/api/use-my-budget-segment-transactions-list.query";
import { TransactionFilters } from "@fts/finances/transactions/transactions/components/filters/transaction-filters";
import { TransactionsTable } from "@fts/finances/transactions/transactions/components/transactions-table";
import { useTranslation } from "@i18n/use-translation";
import { ManagerLayout } from "@layouts/manager/manager.layout";
import { ActionsLayout } from "@layouts/shared/actions/actions.layout";
import { TableLayout } from "@layouts/table/table.layout";
import { ActionIcon } from "@mantine/core";
import type {
	BudgetSegmentModel,
	TransactionFiltersModel,
} from "@shared/models";
import { IoReload } from "react-icons/io5";

type Props = {
	segment: BudgetSegmentModel;
};

export const MyBudgetSegmentTransactionsManager: FC<Props> = ({ segment }) => {
	const { t: commonT } = useTranslation("common");

	const pagination = usePagination();
	const search = useSearch<TransactionFiltersModel>({});
	const {
		data: transactions,
		isLoading: isLoadingTransactions,
		isFetching: isFetchingTransactions,
		refetch: refetchTransactions,
	} = useMyBudgetSegmentTransactionsListQuery({
		segmentId: segment.id,
		pagination,
		search,
	});

	return (
		<ManagerLayout.Root>
			<ManagerLayout.Title></ManagerLayout.Title>
			<ManagerLayout.Content>
				{/* TABLE */}
				<TableLayout.Root>
					{/* Actions */}
					<TableLayout.Actions>
						<ActionsLayout.Row>
							<TransactionFilters search={search} />
						</ActionsLayout.Row>
						<ActionsLayout.Row>
							<ActionIcon
								loading={isFetchingTransactions}
								onClick={() => refetchTransactions()}
								aria-label={commonT().expressions.Reload}
							>
								<IoReload />
							</ActionIcon>
						</ActionsLayout.Row>
					</TableLayout.Actions>

					{/* Table */}
					<TableLayout.Table>
						<TransactionsTable
							data={transactions?.items}
							loading={isLoadingTransactions}
							showAccount
						/>
					</TableLayout.Table>
				</TableLayout.Root>
				<TableLayout.Pagination>
					<Pagination pagination={pagination} />
				</TableLayout.Pagination>
			</ManagerLayout.Content>
		</ManagerLayout.Root>
	);
};
