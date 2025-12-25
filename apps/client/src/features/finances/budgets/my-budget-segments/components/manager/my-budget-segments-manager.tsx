import { DebouncedSearch } from "@common/extended-ui/form/components/search/debounced-search";
import { useDebouncedSearch } from "@common/extended-ui/form/components/search/use-debounced-search";
import { DangerousActionConfirm } from "@common/verifications/dangerous-action/components/dangerous-action-confirm";
import { BudgetSummary } from "@fts/finances/budgets/budgets/components/summary/budget-summary";
import { useMyBudgetSegmentDeleteByIdMutation } from "@fts/finances/budgets/my-budget-segments/api/use-my-budget-segment-delete-by-id.mutation";
import { useMyBudgetSegmentsByBudgetQuery } from "@fts/finances/budgets/my-budget-segments/api/use-my-budget-segments-by-budget.query";
import { MyBudgetSegmentCreateManager } from "@fts/finances/budgets/my-budget-segments/components/manager/my-budget-segment-create-manager";
import { MyBudgetSegmentUpdateManager } from "@fts/finances/budgets/my-budget-segments/components/manager/my-budget-segment-update-manager";
import { BudgetSegmentsTable } from "@fts/finances/budgets/segments/components/budget-segments.table";
import { useTranslation } from "@i18n/use-translation";
import { ManagerLayout } from "@layouts/manager/manager.layout";
import { ActionsLayout } from "@layouts/shared/actions/actions.layout";
import { TableLayout } from "@layouts/table/table.layout";
import { ActionIcon, Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { BUDGET_MAX_SEGMENTS_PER_BUDGET } from "@shared/constants";
import type { BudgetModel, BudgetSegmentModel } from "@shared/models";
import { useMemo, useState } from "react";
import { IoAddOutline, IoReload } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

type Props = {
	budget: BudgetModel;
};

export const MyBudgetSegmentsManager: FC<Props> = ({ budget }) => {
	const { t, interpolated } = useTranslation("budget");
	const { t: commonT } = useTranslation("common");

	const {
		data: segments = [],
		isLoading: isLoadingSegments,
		refetch: refetchSegments,
		isFetching: isFetchingSegments,
	} = useMyBudgetSegmentsByBudgetQuery({ budgetId: budget.id });
	const { mutate: deleteSegment } = useMyBudgetSegmentDeleteByIdMutation();
	const debouncedSearch = useDebouncedSearch();

	const [isCreateOpen, { open: openCreate, close: closeCreate }] =
		useDisclosure();
	const [segmentToUpdate, setSegmentToUpdate] =
		useState<BudgetSegmentModel | null>(null);
	const [segmentToDelete, setSegmentToDelete] =
		useState<BudgetSegmentModel | null>(null);

	const filteredSegments = useMemo(
		() =>
			segments.filter((segment) =>
				segment.name
					.toLowerCase()
					.includes(debouncedSearch.value.toLowerCase()),
			),
		[segments, debouncedSearch.value],
	);

	return (
		<>
			{/* SUMMARY */}
			<BudgetSummary budget={budget} segments={segments} />

			{/* SEGMENTS */}
			<ManagerLayout.Root>
				<ManagerLayout.Title>
					{t()["my-budget-segments"].manager.Title}
				</ManagerLayout.Title>
				<ManagerLayout.Content>
					{/* TABLE */}
					<TableLayout.Root>
						<TableLayout.Actions>
							<ActionsLayout.Row>
								<DebouncedSearch size="xs" manager={debouncedSearch} />
							</ActionsLayout.Row>
							<ActionsLayout.Row>
								<Button
									size="xs"
									onClick={openCreate}
									leftSection={<IoAddOutline />}
									disabled={
										filteredSegments.length >= BUDGET_MAX_SEGMENTS_PER_BUDGET
									}
								>
									{t()["my-budget-segments"].manager.Actions.Create}
								</Button>
								<ActionIcon
									loading={isFetchingSegments}
									onClick={() => refetchSegments()}
									aria-label={commonT().expressions.Reload}
								>
									<IoReload />
								</ActionIcon>
							</ActionsLayout.Row>
						</TableLayout.Actions>
						<TableLayout.Table>
							<BudgetSegmentsTable
								data={filteredSegments}
								loading={isLoadingSegments}
								onEditClick={setSegmentToUpdate}
								onDeleteClick={setSegmentToDelete}
							/>
						</TableLayout.Table>
					</TableLayout.Root>
				</ManagerLayout.Content>
			</ManagerLayout.Root>

			{/* Modals & Drawers */}
			<Drawer
				position="right"
				opened={isCreateOpen}
				onClose={closeCreate}
				title={t().budget.managers.create.Title}
			>
				<MyBudgetSegmentCreateManager
					onSuccess={closeCreate}
					budgetId={budget.id}
				/>
			</Drawer>

			<Drawer
				position="right"
				opened={Boolean(segmentToUpdate)}
				onClose={() => setSegmentToUpdate(null)}
				title={interpolated((t) => t.budget.managers.update.Title, {
					name: segmentToUpdate?.name ?? "",
				})}
			>
				{segmentToUpdate && (
					<MyBudgetSegmentUpdateManager
						onSuccess={() => setSegmentToUpdate(null)}
						segment={segmentToUpdate}
					/>
				)}
			</Drawer>

			<DangerousActionConfirm
				open={Boolean(segmentToDelete)}
				onClose={() => setSegmentToDelete(null)}
				texts={{
					title: interpolated((t) => t.budget.managers.delete.confirm.Title, {
						name: segmentToDelete?.name ?? "",
					}),
					description: t().budget.managers.delete.confirm.Message,
					confirm: t().budget.managers.delete.confirm.Action,
				}}
				writeToDelete={{
					label: t().budget.managers.delete.confirm["Write-to-delete"],
					confirmValue: segmentToDelete?.name ?? null,
				}}
				confirmIcon={<MdDeleteOutline />}
				onConfirm={() => {
					if (segmentToDelete) deleteSegment(segmentToDelete.id);
					setSegmentToDelete(null);
				}}
			/>
		</>
	);
};
