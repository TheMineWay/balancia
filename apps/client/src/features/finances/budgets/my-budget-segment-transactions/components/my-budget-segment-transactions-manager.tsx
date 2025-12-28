import { useSearch } from "@common/extended-ui/form/hooks/use-search";
import { Pagination } from "@core/pagination/components/pagination";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { BudgetSegmentTransactionsTable } from "@fts/finances/budgets/budget-segment-transactions/components/tables/budget-segment-transactions.table";
import { useMyBudgetSegmentTransactionsListQuery } from "@fts/finances/budgets/my-budget-segment-transactions/api/use-my-budget-segment-transactions-list.query";
import { TransactionFilters } from "@fts/finances/transactions/transactions/components/filters/transaction-filters";
import { useTranslation } from "@i18n/use-translation";
import { ManagerLayout } from "@layouts/manager/manager.layout";
import { ActionsLayout } from "@layouts/shared/actions/actions.layout";
import { TableLayout } from "@layouts/table/table.layout";
import { ActionIcon, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import type {
	BudgetSegmentImputationWithTransactionModel,
	BudgetSegmentModel,
	TransactionFiltersModel,
} from "@shared/models";
import { useCallback } from "react";
import { IoCloseOutline, IoReload } from "react-icons/io5";

type Props = {
	segment: BudgetSegmentModel;
};

export const MyBudgetSegmentTransactionsManager: FC<Props> = ({ segment }) => {
	const { t: commonT } = useTranslation("common");
	const { t, interpolated } = useTranslation("budget");

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

	// TODO: implement delete mutation
	const deleteImputation = (id: number) => {};

	const onImputationRemoveClick = useCallback(
		(item: BudgetSegmentImputationWithTransactionModel) => {
			modals.openConfirmModal({
				title: interpolated(
					(t) => t["budget-segment-imputation"].managers.delete.confirm.Title,
					{
						name: item.transaction.subject || item.id.toString(),
					},
				),
				children: (
					<Text>
						{t()["budget-segment-imputation"].managers.delete.confirm.Message}
					</Text>
				),
				labels: {
					cancel: commonT().templates["confirm-modal"].Cancel,
					confirm:
						t()["budget-segment-imputation"].managers.delete.confirm.Action,
				},
				confirmProps: { color: "red", leftSection: <IoCloseOutline /> },
				onConfirm: () => deleteImputation(item.id),
			});
		},
		[t, commonT, interpolated],
	);

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
						<BudgetSegmentTransactionsTable
							data={transactions?.items}
							loading={isLoadingTransactions}
							onRemoveImputationClick={onImputationRemoveClick}
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
