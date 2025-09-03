import { DebouncedSearch } from "@common/extended-ui/form/components/search/debounced-search";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { useSearch } from "@core/search/hooks/use-search";
import { AccountsTable } from "@fts/finances/accounts/components/accounts.table";
import { useMyAccountDeleteByIdMutation } from "@fts/finances/my-accounts/api/use-my-account-delete-by-id.mutation";
import { useMyAccountsQuery } from "@fts/finances/my-accounts/api/use-my-accounts.query";
import { MyAccountCreateManager } from "@fts/finances/my-accounts/components/manager/my-acount-create-manager";
import { MyAccountUpdateManager } from "@fts/finances/my-accounts/components/manager/my-acount-update-manager";
import { useTranslation } from "@i18n/use-translation";
import { ManagerLayout } from "@layouts/manager/manager.layout";
import { ActionsLayout } from "@layouts/shared/actions/actions.layout";
import { TableLayout } from "@layouts/table/table.layout";
import { ActionIcon, Button, Drawer, Pagination } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AccountModel } from "@shared/models";
import { useCallback, useState } from "react";
import { IoAddOutline, IoReload } from "react-icons/io5";

export const MyAccountsManager: FC = () => {
	const { t } = useTranslation("finances");
	const { t: commonT } = useTranslation("common");

	const search = useSearch({});
	const pagination = usePagination();
	const {
		data: accounts,
		isLoading: isLoadingAccounts,
		refetch: refetchAccounts,
		isFetching: isFetchingAccounts,
	} = useMyAccountsQuery({ pagination, search });
	const { mutate: deleteAccount } = useMyAccountDeleteByIdMutation();

	const [isCreateOpen, { open: openCreate, close: closeCreate }] =
		useDisclosure();
	const [accountToUpdate, setAccountToUpdate] = useState<AccountModel | null>(
		null,
	);

	const onDeleteClick = useCallback(
		(account: AccountModel) => {
			deleteAccount(account.id);
		},
		[deleteAccount],
	);

	return (
		<>
			<ManagerLayout.Root>
				<ManagerLayout.Title>
					{t().account["my-accounts"].manager.Title}
				</ManagerLayout.Title>
				<ManagerLayout.Content>
					{/* TABLE */}
					<TableLayout.Root>
						<TableLayout.Actions>
							<ActionsLayout.Row>
								<DebouncedSearch
									manager={search.debouncedSearchManager}
									size="xs"
									placeholder={commonT().expressions.Search}
								/>
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
									loading={isFetchingAccounts}
									onClick={() => refetchAccounts()}
									aria-label={commonT().expressions.Reload}
								>
									<IoReload />
								</ActionIcon>
							</ActionsLayout.Row>
						</TableLayout.Actions>
						<TableLayout.Table>
							<AccountsTable
								data={accounts?.items}
								loading={isLoadingAccounts}
								onEditClick={setAccountToUpdate}
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
			<Drawer
				position="right"
				opened={isCreateOpen}
				onClose={closeCreate}
				title={t().account.create.Title}
			>
				<MyAccountCreateManager onSuccess={closeCreate} />
			</Drawer>

			<Drawer
				position="right"
				opened={Boolean(accountToUpdate)}
				onClose={() => setAccountToUpdate(null)}
				title={t().account.update.Title}
			>
				{accountToUpdate && (
					<MyAccountUpdateManager
						onSuccess={() => setAccountToUpdate(null)}
						account={accountToUpdate}
					/>
				)}
			</Drawer>
		</>
	);
};
