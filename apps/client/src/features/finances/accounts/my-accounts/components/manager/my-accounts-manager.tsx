import { DebouncedSearch } from "@common/extended-ui/form/components/search/debounced-search";
import { DangerousActionConfirm } from "@common/verifications/dangerous-action/components/dangerous-action-confirm";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { useSearch } from "@core/search/hooks/use-search";
import { AccountsTable } from "@fts/finances/accounts/accounts/components/accounts.table";
import { useMyAccountDeleteByIdMutation } from "@fts/finances/accounts/my-accounts/api/use-my-account-delete-by-id.mutation";
import { useMyAccountsQuery } from "@fts/finances/accounts/my-accounts/api/use-my-accounts.query";
import { MyAccountCreateManager } from "@fts/finances/accounts/my-accounts/components/manager/my-acount-create-manager";
import { MyAccountUpdateManager } from "@fts/finances/accounts/my-accounts/components/manager/my-acount-update-manager";
import { useTranslation } from "@i18n/use-translation";
import { ManagerLayout } from "@layouts/manager/manager.layout";
import { ActionsLayout } from "@layouts/shared/actions/actions.layout";
import { TableLayout } from "@layouts/table/table.layout";
import { ActionIcon, Button, Drawer, Pagination } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { AccountModel } from "@shared/models";
import { useState } from "react";
import { IoAddOutline, IoReload } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

export const MyAccountsManager: FC = () => {
	const { t, interpolated } = useTranslation("finances");
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
	const [accountToDelete, setAccountToDelete] = useState<AccountModel | null>(
		null,
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
									{t().account["my-accounts"].manager.Actions.Create}
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
								onDeleteClick={setAccountToDelete}
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
				title={interpolated((t) => t.account.update.Title, {
					name: accountToUpdate?.name ?? "",
				})}
			>
				{accountToUpdate && (
					<MyAccountUpdateManager
						onSuccess={() => setAccountToUpdate(null)}
						account={accountToUpdate}
					/>
				)}
			</Drawer>

			<DangerousActionConfirm
				open={Boolean(accountToDelete)}
				onClose={() => setAccountToDelete(null)}
				texts={{
					title: interpolated((t) => t.account.delete.confirm.Title, {
						name: accountToDelete?.name ?? "",
					}),
					description: t().account.delete.confirm.Message,
					confirm: t().account.delete.confirm.Action,
				}}
				writeToDelete={{
					label: t().account.delete.confirm["Write-to-delete"],
					confirmValue: accountToDelete?.name ?? null,
				}}
				confirmIcon={<MdDeleteOutline />}
				onConfirm={() => {
					if (accountToDelete) deleteAccount(accountToDelete.id);
					setAccountToDelete(null);
				}}
			/>
		</>
	);
};
