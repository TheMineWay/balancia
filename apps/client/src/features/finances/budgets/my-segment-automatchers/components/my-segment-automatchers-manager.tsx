import { ExtraActions } from "@common/extended-ui/button/actions/components/extra-actions/extra-actions";
import { DebouncedSearch } from "@common/extended-ui/form/components/search/debounced-search";
import { useSearch } from "@common/extended-ui/form/hooks/use-search";
import { DangerousActionConfirm } from "@common/verifications/dangerous-action/components/dangerous-action-confirm";
import { Pagination } from "@core/pagination/components/pagination";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { SegmentAutomatchersTable } from "@fts/finances/budgets/segment-automatchers/components/segment-automatchers.table";
import { useTranslation } from "@i18n/use-translation";
import { ManagerLayout } from "@layouts/manager/manager.layout";
import { ActionsLayout } from "@layouts/shared/actions/actions.layout";
import { TableLayout } from "@layouts/table/table.layout";
import { ActionIcon, Button, Drawer, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import type {
	BudgetSegmentCategoryAutoMatcherModel,
	CategoryModel,
} from "@shared/models";
import type { FC } from "react";
import { useState } from "react";
import { IoAddOutline, IoReload } from "react-icons/io5";
import { MdDeleteOutline, MdPlayArrow } from "react-icons/md";
import { useMySegmentAutomatchersRunMutation } from "../api/use-my-segment-automatchers-run.mutation";
import { useMySegmentCategoryMatcherDeleteMutation } from "../api/use-my-segment-category-matcher-delete.mutation";
import { useMySegmentCategoryMatchersQueryList } from "../api/use-my-segment-category-matchers-list.query";
import { MySegmentAutomatcherCreateManager } from "./manager/my-segment-automatcher-create-manager";
export const MySegmentAutomatchersManager: FC<{ segmentId: number }> = ({
	segmentId,
}) => {
	const { t: commonT } = useTranslation("common");
	const { t } = useTranslation("budget");

	const pagination = usePagination();
	const search = useSearch<CategoryModel>({}); // Category as it filters by category fields

	const { data, isLoading, refetch, isFetching } =
		useMySegmentCategoryMatchersQueryList({
			segmentId,
			pagination,
			search,
		});
	const { mutate: deleteMatcher } = useMySegmentCategoryMatcherDeleteMutation();
	const { mutate: runAutoMatchers, isPending: isRunningAutoMatchers } =
		useMySegmentAutomatchersRunMutation();

	const [isCreateOpen, { open: openCreate, close: closeCreate }] =
		useDisclosure();
	const [matcherToDelete, setMatcherToDelete] =
		useState<BudgetSegmentCategoryAutoMatcherModel | null>(null);

	const handleRunAutoMatchers = () => {
		runAutoMatchers(
			{ segmentId },
			{
				onError: () => {
					notifications.show({
						title: "Error",
						message: "Failed to run auto matchers",
						color: "red",
					});
				},
			},
		);
	};

	return (
		<>
			<ManagerLayout.Root>
				<ManagerLayout.Title>
					{t()["budget-segment-auto-matchers"].Title}
				</ManagerLayout.Title>
				<ManagerLayout.Content>
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
									{t()["budget-segment-auto-matchers"].managers.create.Action}
								</Button>
								<ActionIcon
									loading={isFetching}
									onClick={() => refetch()}
									aria-label={commonT().expressions.Reload}
								>
									<IoReload />
								</ActionIcon>
								<ExtraActions>
									<Menu.Item
										leftSection={<MdPlayArrow />}
										onClick={handleRunAutoMatchers}
										disabled={isRunningAutoMatchers}
									>
										{
											t()["budget-segment-auto-matchers"].actions[
												"run-auto-matchers"
											].Trigger
										}
									</Menu.Item>
								</ExtraActions>
							</ActionsLayout.Row>
						</TableLayout.Actions>
						<TableLayout.Table>
							<SegmentAutomatchersTable
								data={data?.items}
								loading={isLoading}
								onDeleteClick={setMatcherToDelete}
								hideSegmentColumn
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
				title={t()["budget-segment-auto-matchers"].managers.create.Title}
			>
				<MySegmentAutomatcherCreateManager
					segmentId={segmentId}
					onSuccess={closeCreate}
				/>
			</Drawer>

			{/* ACTIONS */}
			<DangerousActionConfirm
				open={Boolean(matcherToDelete)}
				onClose={() => setMatcherToDelete(null)}
				texts={{
					title:
						t()["budget-segment-auto-matchers"].managers.delete.confirm.Title,
					description:
						t()["budget-segment-auto-matchers"].managers.delete.confirm.Message,
					confirm:
						t()["budget-segment-auto-matchers"].managers.delete.confirm.Action,
				}}
				confirmIcon={<MdDeleteOutline />}
				onConfirm={() => {
					if (matcherToDelete)
						deleteMatcher(
							{
								segmentId: matcherToDelete.segmentId,
								categoryId: matcherToDelete.categoryId,
							},
							{
								onSuccess: () => {
									setMatcherToDelete(null);
								},
							},
						);
				}}
			/>
		</>
	);
};
