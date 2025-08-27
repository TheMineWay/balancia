import { usePagination } from "@core/pagination/hooks/use-pagination";
import { useMyTransactionDeleteByIdMutation } from "@fts/finances/my-transactions/api/use-my-transaction-delete-by-id.mutation";
import { useMyTransactionsQuery } from "@fts/finances/my-transactions/api/use-my-transactions.query";
import { TransactionsTable } from "@fts/finances/transactions/components/transactions-table";
import { useTranslation } from "@i18n/use-translation";
import { ManagerLayout } from "@layouts/manager/manager.layout";
import { ActionsLayout } from "@layouts/shared/actions/actions.layout";
import { TableLayout } from "@layouts/table/table.layout";
import { ActionIcon, Button, Pagination, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { TransactionModel } from "@shared/models";
import { useCallback } from "react";
import { IoAddOutline, IoReload, IoTrash } from "react-icons/io5";

export const MyTransactionsManager: FC = () => {
	const { t } = useTranslation("transaction");
	const { t: commonT } = useTranslation("common");

	const pagination = usePagination();
	const { data: transactions, isLoading: isLoadingTransactions, refetch: refetchTransactions, isFetching: isFetchingTransactions } =
		useMyTransactionsQuery({ pagination });
	const { mutate: deleteTransaction } = useMyTransactionDeleteByIdMutation();

	const onDeleteClick = useCallback((item: TransactionModel) => {
		modals.openConfirmModal({
			title: t()["delete-transaction"].confirm.Title,
			children: (<Text>
				{t()["delete-transaction"].confirm.Message}
			</Text>),
			labels: {
				cancel: commonT().templates["confirm-modal"].Cancel,
				confirm: t()["delete-transaction"].confirm.Action,
			},
			confirmProps: { color: "red", leftSection: <IoTrash /> },
			onConfirm: () => deleteTransaction(item.id),
		});
	}, [t, commonT, deleteTransaction]);

	return (
		<>
			<ManagerLayout.Root>
				<ManagerLayout.Title>
					{t()["my-transactions"].manager.Title}
				</ManagerLayout.Title>
				<ManagerLayout.Content>
					{/* Table */}
					<TableLayout.Root>
						{/* Actions */}
						<TableLayout.Actions>
							<ActionsLayout.Row>
								<Button leftSection={<IoAddOutline />}>{t()["my-transactions"].manager.Actions.Register}</Button>
							</ActionsLayout.Row>
							<ActionsLayout.Row>
								<ActionIcon loading={isFetchingTransactions} onClick={() => refetchTransactions()} aria-label={commonT().expressions.Reload}>
									<IoReload />
								</ActionIcon>
							</ActionsLayout.Row>
						</TableLayout.Actions>

						{/* Table component */}
						<TableLayout.Table>
							<TransactionsTable
								data={transactions?.items}
								loading={isLoadingTransactions}
								onDeleteClick={onDeleteClick}
							/>
						</TableLayout.Table>
						<TableLayout.Pagination>
							<Pagination {...pagination.control} />
						</TableLayout.Pagination>
					</TableLayout.Root>
				</ManagerLayout.Content>
			</ManagerLayout.Root>

			{/* Modals & Drawers */}

		</>
	);
};
