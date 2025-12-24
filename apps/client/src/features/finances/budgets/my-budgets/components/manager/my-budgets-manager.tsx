import { DebouncedSearch } from "@common/extended-ui/form/components/search/debounced-search";
import {
	type UseSearch,
	useSearch,
} from "@common/extended-ui/form/hooks/use-search";
import { DangerousActionConfirm } from "@common/verifications/dangerous-action/components/dangerous-action-confirm";
import { Pagination } from "@core/pagination/components/pagination";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { BudgetsTable } from "@fts/finances/budgets/budgets/components/budgets.table";
import { useMyBudgetDeleteByIdMutation } from "@fts/finances/budgets/my-budgets/api/use-my-budget-delete-by-id.mutation";
import { useMyBudgetsQuery } from "@fts/finances/budgets/my-budgets/api/use-my-budgets.query";
import { MyBudgetCreateManager } from "@fts/finances/budgets/my-budgets/components/manager/my-budget-create-manager";
import { MyBudgetUpdateManager } from "@fts/finances/budgets/my-budgets/components/manager/my-budget-update-manager";
import { useTranslation } from "@i18n/use-translation";
import { ManagerLayout } from "@layouts/manager/manager.layout";
import { ActionsLayout } from "@layouts/shared/actions/actions.layout";
import { TableLayout } from "@layouts/table/table.layout";
import { ActionIcon, Button, Drawer } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import type { BudgetFiltersModel, BudgetModel } from "@shared/models";
import { addDays } from "date-fns";
import { useState } from "react";
import { IoAddOutline, IoReload } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

export const MyBudgetsManager: FC = () => {
	const { t, interpolated } = useTranslation("budget");
	const { t: commonT } = useTranslation("common");

	const search = useSearch({});
	const pagination = usePagination();
	const {
		data: budgets,
		isLoading: isLoadingBudgets,
		refetch: refetchBudgets,
		isFetching: isFetchingBudgets,
	} = useMyBudgetsQuery({ pagination, search });
	const { mutate: deleteBudget } = useMyBudgetDeleteByIdMutation();

	const [isCreateOpen, { open: openCreate, close: closeCreate }] =
		useDisclosure();
	const [budgetToUpdate, setBudgetToUpdate] = useState<BudgetModel | null>(
		null,
	);
	const [budgetToDelete, setBudgetToDelete] = useState<BudgetModel | null>(
		null,
	);

	return (
		<>
			<ManagerLayout.Root>
				<ManagerLayout.Title>
					{t()["my-budgets"].manager.Title}
				</ManagerLayout.Title>
				<ManagerLayout.Content>
					{/* TABLE */}
					<TableLayout.Root>
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
									{t()["my-budgets"].manager.Actions.Create}
								</Button>
								<ActionIcon
									loading={isFetchingBudgets}
									onClick={() => refetchBudgets()}
									aria-label={commonT().expressions.Reload}
								>
									<IoReload />
								</ActionIcon>
							</ActionsLayout.Row>
						</TableLayout.Actions>
						<TableLayout.Table>
							<BudgetsTable
								data={budgets?.items}
								loading={isLoadingBudgets}
								onEditClick={setBudgetToUpdate}
								onDeleteClick={setBudgetToDelete}
							/>
						</TableLayout.Table>
						<TableLayout.Pagination>
							<Pagination pagination={pagination} />
						</TableLayout.Pagination>
					</TableLayout.Root>
				</ManagerLayout.Content>
			</ManagerLayout.Root>

			{/* Modals & Drawers */}
			<Drawer
				position="right"
				opened={isCreateOpen}
				onClose={closeCreate}
				title={t().create.Title}
			>
				<MyBudgetCreateManager onSuccess={closeCreate} />
			</Drawer>

			<Drawer
				position="right"
				opened={Boolean(budgetToUpdate)}
				onClose={() => setBudgetToUpdate(null)}
				title={interpolated((t) => t.update.Title, {
					name: budgetToUpdate?.name ?? "",
				})}
			>
				{budgetToUpdate && (
					<MyBudgetUpdateManager
						onSuccess={() => setBudgetToUpdate(null)}
						budget={budgetToUpdate}
					/>
				)}
			</Drawer>

			<DangerousActionConfirm
				open={Boolean(budgetToDelete)}
				onClose={() => setBudgetToDelete(null)}
				texts={{
					title: interpolated((t) => t.delete.confirm.Title, {
						name: budgetToDelete?.name ?? "",
					}),
					description: t().delete.confirm.Message,
					confirm: t().delete.confirm.Action,
				}}
				writeToDelete={{
					label: t().delete.confirm["Write-to-delete"],
					confirmValue: budgetToDelete?.name ?? null,
				}}
				confirmIcon={<MdDeleteOutline />}
				onConfirm={() => {
					if (budgetToDelete) deleteBudget(budgetToDelete.id);
					setBudgetToDelete(null);
				}}
			/>
		</>
	);
};

type FilterProps = {
	search: UseSearch<BudgetFiltersModel>;
};

const Filters: FC<FilterProps> = ({ search }) => {
	const { t: commonT } = useTranslation("common");
	const { t } = useTranslation("budget");

	return (
		<>
			<DebouncedSearch
				manager={search.debouncedSearchManager}
				size="xs"
				placeholder={commonT().expressions.Search}
			/>

			<DatePickerInput
				size="xs"
				placeholder={t().models.budget.fromDate.Label}
				value={search.filters.fromDate || null}
				onChange={(v) => search.setFilter("fromDate", v ? new Date(v) : null)}
				className="min-w-24"
				maxDate={
					search.filters.toDate ? addDays(search.filters.toDate, -1) : undefined
				}
				allowDeselect
			/>
			<DatePickerInput
				size="xs"
				placeholder={t().models.budget.toDate.Label}
				value={search.filters.toDate || null}
				onChange={(v) => search.setFilter("toDate", v ? new Date(v) : null)}
				className="min-w-24"
				minDate={
					search.filters.fromDate
						? addDays(search.filters.fromDate, 1)
						: undefined
				}
				allowDeselect
			/>
		</>
	);
};
