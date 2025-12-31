import { useSearch } from "@common/extended-ui/form/hooks/use-search";
import { Pagination } from "@core/pagination/components/pagination";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { useMyTransactionDeleteByIdMutation } from "@fts/finances/transactions/my-transactions/api/use-my-transaction-delete-by-id.mutation";
import { useMyTransactionsQuery } from "@fts/finances/transactions/my-transactions/api/use-my-transactions.query";
import { MyTransactionsImportManager } from "@fts/finances/transactions/my-transactions/components/manager/import/my-transactions-import-manager";
import { MyTransactionCreateManager } from "@fts/finances/transactions/my-transactions/components/manager/my-transaction-create-manager";
import { MyTransactionUpdateManager } from "@fts/finances/transactions/my-transactions/components/manager/my-transaction-update-manager";
import { MyTransactionTagsManager } from "@fts/finances/transactions/my-transactions/components/manager/tags/my-transaction-tags-manager";
import { TransactionFilters } from "@fts/finances/transactions/transactions/components/filters/transaction-filters";
import { TransactionsTable } from "@fts/finances/transactions/transactions/components/transactions-table";
import { useTranslation } from "@i18n/use-translation";
import { ManagerLayout } from "@layouts/manager/manager.layout";
import { ActionsLayout } from "@layouts/shared/actions/actions.layout";
import { TableLayout } from "@layouts/table/table.layout";
import { ActionIcon, Button, Drawer, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import type { TransactionFiltersModel, TransactionModel } from "@shared/models";
import { useCallback, useState } from "react";
import { CiImport } from "react-icons/ci";
import { IoAddOutline, IoReload, IoTrash } from "react-icons/io5";

export const MyTransactionsManager: FC = () => {
	const { t, interpolated } = useTranslation("finances");
	const { t: commonT } = useTranslation("common");

	const pagination = usePagination();
	const search = useSearch<TransactionFiltersModel>({});

	const {
		data: transactions,
		isLoading: isLoadingTransactions,
		refetch: refetchTransactions,
		isFetching: isFetchingTransactions,
	} = useMyTransactionsQuery({ pagination, search });
	const { mutate: deleteTransaction } = useMyTransactionDeleteByIdMutation();

	const [isCreateOpen, { open: openCreate, close: closeCreate }] =
		useDisclosure();
	const [isImportOpen, { open: openImport, close: closeImport }] =
		useDisclosure();
	const [transactionToUpdate, setTransactionToUpdate] =
		useState<TransactionModel | null>(null);
	const [transactionToManageTags, setTransactionToManageTags] =
		useState<TransactionModel | null>(null);

	const onDeleteClick = useCallback(
		(item: TransactionModel) => {
			modals.openConfirmModal({
				title: interpolated((t) => t.transaction.delete.confirm.Title, {
					name: item.subject || item.id.toString(),
				}),
				children: <Text>{t().transaction.delete.confirm.Message}</Text>,
				labels: {
					cancel: commonT().templates["confirm-modal"].Cancel,
					confirm: t().transaction.delete.confirm.Action,
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
								<TransactionFilters search={search} />
							</ActionsLayout.Row>
							<ActionsLayout.Row>
								<Button
									size="xs"
									onClick={openImport}
									leftSection={<CiImport />}
									variant="outline"
								>
									{commonT().expressions.Import}
								</Button>
								<Button
									size="xs"
									onClick={openCreate}
									leftSection={<IoAddOutline />}
								>
									{t().transaction["my-transactions"].manager.Actions.Register}
								</Button>
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
								onEditClick={setTransactionToUpdate}
								onTagsManageClick={setTransactionToManageTags}
								showAccount
							/>
						</TableLayout.Table>
						<TableLayout.Pagination>
							<Pagination pagination={pagination} />
						</TableLayout.Pagination>
					</TableLayout.Root>
				</ManagerLayout.Content>
			</ManagerLayout.Root>

			{/* Modals & Drawers */}

			{/* Create transaction */}
			<Drawer
				position="right"
				opened={isCreateOpen}
				onClose={closeCreate}
				title={t().transaction.create.Title}
			>
				<MyTransactionCreateManager onSuccess={closeCreate} />
			</Drawer>

			{/* Update transaction */}
			<Drawer
				position="right"
				opened={Boolean(transactionToUpdate)}
				onClose={() => setTransactionToUpdate(null)}
				title={interpolated((t) => t.transaction.update.Title, {
					name: transactionToUpdate?.subject || `${transactionToUpdate?.id}`,
				})}
			>
				{transactionToUpdate && (
					<MyTransactionUpdateManager
						transaction={transactionToUpdate}
						onSuccess={() => setTransactionToUpdate(null)}
					/>
				)}
			</Drawer>

			{/* Manage transaction tags */}
			<Drawer
				position="right"
				opened={Boolean(transactionToManageTags)}
				onClose={() => setTransactionToManageTags(null)}
				title={interpolated((t) => t.transaction.managers.tags.Title, {
					name:
						transactionToManageTags?.subject ||
						`${transactionToManageTags?.id}`,
				})}
			>
				{transactionToManageTags && (
					<MyTransactionTagsManager
						transactionId={transactionToManageTags.id}
					/>
				)}
			</Drawer>

			{/* Import transactions */}
			<Modal
				opened={isImportOpen}
				onClose={closeImport}
				title={t().transaction.managers.import.Title}
				size="xl"
			>
				<MyTransactionsImportManager onSuccess={closeImport} />
			</Modal>
		</>
	);
};
