import { DebouncedSearch } from "@common/extended-ui/form/components/search/debounced-search";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { type UseSearch, useSearch } from "@core/search/hooks/use-search";
import { MyAccountsSelector } from "@fts/finances/accounts/accounts/components/form/my-accounts.selector";
import { MyCategoriesSelector } from "@fts/finances/categories/my-categories/components/form/my-categories.selector";
import { useMyTransactionDeleteByIdMutation } from "@fts/finances/transactions/my-transactions/api/use-my-transaction-delete-by-id.mutation";
import { useMyTransactionsQuery } from "@fts/finances/transactions/my-transactions/api/use-my-transactions.query";
import { MyTransactionCreateManager } from "@fts/finances/transactions/my-transactions/components/manager/my-transaction-create-manager";
import { MyTransactionUpdateManager } from "@fts/finances/transactions/my-transactions/components/manager/my-transaction-update-manager";
import { TransactionsTable } from "@fts/finances/transactions/transactions/components/transactions-table";
import { useTranslation } from "@i18n/use-translation";
import { ManagerLayout } from "@layouts/manager/manager.layout";
import { ActionsLayout } from "@layouts/shared/actions/actions.layout";
import { TableLayout } from "@layouts/table/table.layout";
import { ActionIcon, Button, Drawer, Pagination, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import type { TransactionModel } from "@shared/models";
import { useCallback, useState } from "react";
import { IoAddOutline, IoReload, IoTrash } from "react-icons/io5";

export const MyTransactionsManager: FC = () => {
	const { t, interpolated } = useTranslation("finances");
	const { t: commonT } = useTranslation("common");

	const pagination = usePagination();
	const search = useSearch<TransactionModel>({});

	const {
		data: transactions,
		isLoading: isLoadingTransactions,
		refetch: refetchTransactions,
		isFetching: isFetchingTransactions,
	} = useMyTransactionsQuery({ pagination, search });
	const { mutate: deleteTransaction } = useMyTransactionDeleteByIdMutation();

	const [isCreateOpen, { open: openCreate, close: closeCreate }] =
		useDisclosure();
	const [transactionToUpdate, setTransactionToUpdate] =
		useState<TransactionModel | null>(null);
	const [transactionToManageTags, setTransactionToManageTags] =
		useState<TransactionModel | null>(null);

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
								<Filters search={search} />
							</ActionsLayout.Row>
							<ActionsLayout.Row>
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

			<Drawer
				position="right"
				opened={Boolean(transactionToUpdate)}
				onClose={() => setTransactionToUpdate(null)}
				title={interpolated((t) => t.transaction.update.Title, {
					name:
						transactionToUpdate?.subject ??
						transactionToUpdate?.id.toString() ??
						"",
				})}
			>
				{transactionToUpdate && (
					<MyTransactionUpdateManager
						transaction={transactionToUpdate}
						onSuccess={() => setTransactionToUpdate(null)}
					/>
				)}
			</Drawer>
		</>
	);
};

type FilterOptions = {
	search: UseSearch<TransactionModel>;
};

const Filters: FC<FilterOptions> = ({ search }) => {
	const { t } = useTranslation("finances");
	const { t: commonT } = useTranslation("common");

	const { filters, setFilter, debouncedSearchManager } = search;

	return (
		<>
			<DebouncedSearch
				manager={debouncedSearchManager}
				size="xs"
				placeholder={commonT().expressions.Search}
			/>
			<MyAccountsSelector
				value={filters.accountId ?? null}
				placeholder={t().account.expressions.Account}
				onChange={(value) => setFilter("accountId", value)}
				allowClear
				size="xs"
				autoFill={false}
			/>
			<MyCategoriesSelector
				value={filters.categoryId ?? null}
				placeholder={t().category.expressions.Category}
				onChange={(value) => setFilter("categoryId", value)}
				allowClear
				size="xs"
			/>
		</>
	);
};
