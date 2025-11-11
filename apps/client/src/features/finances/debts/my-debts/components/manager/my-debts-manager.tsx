import { DebouncedSearch } from "@common/extended-ui/form/components/search/debounced-search";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { type UseSearch, useSearch } from "@core/search/hooks/use-search";
import {
	DebtLinker,
	DebtLinkers,
} from "@fts/finances/debts/debts/components/debt-linkers";
import { DebtsTable } from "@fts/finances/debts/debts/components/debts.table";
import { useMyDebtDeleteMutation } from "@fts/finances/debts/my-debts/api/use-my-debt-delete.mutation";
import { useMyDebtsListQuery } from "@fts/finances/debts/my-debts/api/use-my-debts.query";
import { MyDebtOriginLinkManager } from "@fts/finances/debts/my-debts/components/manager/links/my-debt-origin-link-manager";
import { MyDebtCreateManager } from "@fts/finances/debts/my-debts/components/manager/my-debt-create-manager";
import { MyDebtUpdateManager } from "@fts/finances/debts/my-debts/components/manager/my-debt-update-manager";
import { useTranslation } from "@i18n/use-translation";
import { ManagerLayout } from "@layouts/manager/manager.layout";
import { ActionsLayout } from "@layouts/shared/actions/actions.layout";
import { TableLayout } from "@layouts/table/table.layout";
import {
	ActionIcon,
	Button,
	Drawer,
	Modal,
	Pagination,
	Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import type { DebtListModel, DebtModel } from "@shared/models";
import { getContactName } from "@shared/utils";
import { useCallback, useState } from "react";
import { IoAddOutline, IoReload, IoTrash } from "react-icons/io5";

type DebtLinkState = {
	debt: DebtModel;
	linker: DebtLinker;
};

export const MyDebtsManager: FC = () => {
	const { t, interpolated } = useTranslation("finances");
	const { t: commonT } = useTranslation("common");

	const [isCreateOpen, { open: openCreate, close: closeCreate }] =
		useDisclosure();
	const [debtToUpdate, setDebtToUpdate] = useState<DebtListModel | null>(null);

	const { mutate: deleteDebt } = useMyDebtDeleteMutation();

	const [debtToLink, setDebtToLink] = useState<DebtModel | null>(null);
	const [debtLinkState, setDebtLinkState] = useState<DebtLinkState | null>(
		null,
	);

	const onDeleteClick = useCallback(
		(item: DebtModel) => {
			modals.openConfirmModal({
				title: interpolated((t) => t.debt.delete.confirm.Title, {
					name: item.reason || `${item.amount}€` || item.id.toString(),
				}),
				children: <Text>{t().debt.delete.confirm.Message}</Text>,
				labels: {
					cancel: commonT().templates["confirm-modal"].Cancel,
					confirm: t().debt.delete.confirm.Action,
				},
				confirmProps: { color: "red", leftSection: <IoTrash /> },
				onConfirm: () => deleteDebt(item.id),
			});
		},
		[t, commonT, deleteDebt, interpolated],
	);

	const pagination = usePagination();
	const search = useSearch<DebtModel>({});

	// TODO: Implement query to fetch debts
	const {
		data: debts,
		isFetching: isFetchingDebts,
		refetch: refetchDebts,
	} = useMyDebtsListQuery({ pagination, search });

	return (
		<>
			<ManagerLayout.Root>
				<ManagerLayout.Title>
					{t().debt["my-debts"].manager.Title}
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
									{t().debt["my-debts"].manager.Actions.Create}
								</Button>
								<ActionIcon
									loading={isFetchingDebts}
									onClick={() => refetchDebts()}
									aria-label={commonT().expressions.Reload}
								>
									<IoReload />
								</ActionIcon>
							</ActionsLayout.Row>
						</TableLayout.Actions>

						{/* Table */}
						<TableLayout.Table>
							<DebtsTable
								data={debts?.items}
								onEditClick={setDebtToUpdate}
								onDeleteClick={onDeleteClick}
								onLinkClick={setDebtToLink}
							/>
						</TableLayout.Table>
						<TableLayout.Pagination>
							<Pagination {...pagination.control} />
						</TableLayout.Pagination>
					</TableLayout.Root>
				</ManagerLayout.Content>
			</ManagerLayout.Root>

			{/* Managers */}
			<Drawer
				opened={isCreateOpen}
				onClose={closeCreate}
				title={t().debt.create.Title}
				position="right"
			>
				<MyDebtCreateManager onSuccess={closeCreate} />
			</Drawer>

			<Drawer
				position="right"
				opened={Boolean(debtToUpdate)}
				onClose={() => setDebtToUpdate(null)}
				title={interpolated((t) => t.debt.update.Title, {
					debtor: debtToUpdate ? getContactName(debtToUpdate.debtor) : "",
				})}
			>
				{debtToUpdate && (
					<MyDebtUpdateManager
						onSuccess={() => setDebtToUpdate(null)}
						debt={debtToUpdate}
					/>
				)}
			</Drawer>

			{/* Linkers */}
			<Modal
				title={t().debt.link.Title}
				opened={Boolean(debtToLink)}
				onClose={() => setDebtToLink(null)}
			>
				<DebtLinkers
					onSelect={(linker) => {
						if (debtToLink) {
							setDebtLinkState({
								linker,
								debt: debtToLink,
							});
						}
						setDebtToLink(null);
					}}
				/>
			</Modal>

			<Modal
				opened={Boolean(debtLinkState)}
				onClose={() => setDebtLinkState(null)}
				size="xl"
			>
				{debtLinkState &&
					(debtLinkState?.linker === DebtLinker.ORIGIN ? (
						<MyDebtOriginLinkManager debt={debtLinkState.debt} />
					) : null)}
			</Modal>
		</>
	);
};

type FilterOptions = {
	search: UseSearch<DebtModel>;
};

const Filters: FC<FilterOptions> = ({ search }) => {
	const { t: commonT } = useTranslation("common");

	const { debouncedSearchManager } = search;

	return (
		<>
			<DebouncedSearch
				manager={debouncedSearchManager}
				size="xs"
				placeholder={commonT().expressions.Search}
			/>
			{/* TODO: Contact selector */}
		</>
	);
};
