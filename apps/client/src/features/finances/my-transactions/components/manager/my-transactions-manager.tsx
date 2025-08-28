import { usePagination } from "@core/pagination/hooks/use-pagination";
import { useMyTransactionDeleteByIdMutation } from "@fts/finances/my-transactions/api/use-my-transaction-delete-by-id.mutation";
import { useMyTransactionsQuery } from "@fts/finances/my-transactions/api/use-my-transactions.query";
import { MyTransactionCreateManager } from "@fts/finances/my-transactions/components/manager/my-transaction-create-manager";
import { TransactionsTable } from "@fts/finances/transactions/components/transactions-table";
import { useTranslation } from "@i18n/use-translation";
import { ManagerLayout } from "@layouts/manager/manager.layout";
import { ActionsLayout } from "@layouts/shared/actions/actions.layout";
import { TableLayout } from "@layouts/table/table.layout";
import { ActionIcon, Button, Drawer, Pagination, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import type { TransactionModel } from "@shared/models";
import { useCallback } from "react";
import { IoAddOutline, IoReload, IoTrash } from "react-icons/io5";

export const MyTransactionsManager: FC = () => {
	const { t, interpolated } = useTranslation("finances");
	const { t: commonT } = useTranslation("common");

	const pagination = usePagination();
	const {
		data: transactions,
		isLoading: isLoadingTransactions,
		refetch: refetchTransactions,
		isFetching: isFetchingTransactions,
	} = useMyTransactionsQuery({ pagination });
	const { mutate: deleteTransaction } = useMyTransactionDeleteByIdMutation();

	const [isCreateOpen, { open: openCreate, close: closeCreate }] =
		useDisclosure();

	const onDeleteClick = useCallback(
		(item: TransactionModel) => {
			modals.openConfirmModal({
				title: interpolated((t) => t.transaction["delete"].confirm.Title, {
					name: item.subject || item.id.toString(),
				}),
				children: <Text>{t().transaction["delete"].confirm.Message}</Text>,
				labels: {
					cancel: commonT().templates["confirm-modal"].Cancel,
					confirm: t().transaction["delete"].confirm.Action,
				},
				confirmProps: { color: "red", leftSection: <IoTrash /> },
				onConfirm: () => deleteTransaction(item.id),
			});
		},
		[t, commonT, deleteTransaction, interpolated],
	);

	return (
		<>
			<ManagerLayout.Root>
				<ManagerLayout.Title>
					{t().transaction["my-transactions"].manager.Title}
				</ManagerLayout.Title>
				<ManagerLayout.Content>
					{/* Table */}
					<TableLayout.Root>
						{/* Actions */}
						<TableLayout.Actions>
							<ActionsLayout.Row>
								<Button onClick={openCreate} leftSection={<IoAddOutline />}>
									{t().transaction["my-transactions"].manager.Actions.Register}
								</Button>
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

						{/* Table component */}
						<TableLayout.Table>
							<TransactionsTable
								data={transactions?.items}
								loading={isLoadingTransactions}
								onDeleteClick={onDeleteClick}
								showAccount
							/>
						</TableLayout.Table>
						<TableLayout.Pagination>
							<Pagination {...pagination.control} />
						</TableLayout.Pagination>
					</TableLayout.Root>
				</ManagerLayout.Content>
			</ManagerLayout.Root>

			{/* Modals & Drawers */}

			<Drawer
				position="right"
				opened={isCreateOpen}
				onClose={closeCreate}
				title={t().transaction.create.Title}
			>
				<MyTransactionCreateManager onSuccess={closeCreate} />
			</Drawer>
		</>
	);
};
