import { DebouncedSearch } from "@common/extended-ui/form/components/search/debounced-search";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { useSearch } from "@core/search/hooks/use-search";
import { CategoriesTable } from "@fts/finances/categories/categories/components/categories.table";
import { useMyCategoriesQuery } from "@fts/finances/categories/my-categories/api/use-my-categories.query";
import { useMyCategoryDeleteByIdMutation } from "@fts/finances/categories/my-categories/api/use-my-category-delete-by-id.mutation";
import { MyCategoryCreateManager } from "@fts/finances/categories/my-categories/components/manager/my-category-create-manager";
import { MyCategoryUpdateManager } from "@fts/finances/categories/my-categories/components/manager/my-category-update-manager";
import { useTranslation } from "@i18n/use-translation";
import { ManagerLayout } from "@layouts/manager/manager.layout";
import { ActionsLayout } from "@layouts/shared/actions/actions.layout";
import { TableLayout } from "@layouts/table/table.layout";
import { ActionIcon, Button, Drawer, Pagination, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import type { CategoryModel } from "@shared/models";
import { useCallback, useState } from "react";
import { IoAddOutline, IoReload, IoTrash } from "react-icons/io5";

export const MyCategoriesManager: FC = () => {
	const { t, interpolated } = useTranslation("finances");
	const { t: commonT } = useTranslation("common");

	const pagination = usePagination();
	const search = useSearch({});

	const {
		data: categories,
		isLoading: isLoadingCategories,
		isFetching: isFetchingAccounts,
		refetch: refetchAccounts,
	} = useMyCategoriesQuery({ pagination, search });
	const { mutate: deleteCategory } = useMyCategoryDeleteByIdMutation();

	const [isCreateOpen, { open: openCreate, close: closeCreate }] =
		useDisclosure();
	const [categoryToEdit, setCategoryToEdit] = useState<CategoryModel | null>(
		null,
	);

	const onDeleteClick = useCallback(
		(item: CategoryModel) => {
			modals.openConfirmModal({
				title: interpolated((t) => t.category["delete"].confirm.Title, {
					name: item.name || item.id.toString(),
				}),
				children: <Text>{t().category["delete"].confirm.Message}</Text>,
				labels: {
					cancel: commonT().templates["confirm-modal"].Cancel,
					confirm: t().category["delete"].confirm.Action,
				},
				confirmProps: { color: "red", leftSection: <IoTrash /> },
				onConfirm: () => deleteCategory(item.id),
			});
		},
		[t, commonT, deleteCategory, interpolated],
	);

	return (
		<>
			<ManagerLayout.Root>
				<ManagerLayout.Title>
					{t().category["my-categories"].manager.Title}
				</ManagerLayout.Title>
				<ManagerLayout.Content>
					{/* Table */}
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
									{t().category["my-categories"].manager.Actions.Create}
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
							<CategoriesTable
								categories={categories?.items}
								loading={isLoadingCategories}
								onEditClick={setCategoryToEdit}
								onDeleteClick={onDeleteClick}
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
				position="right"
				opened={isCreateOpen}
				onClose={closeCreate}
				title={t().category.create.Title}
			>
				<MyCategoryCreateManager onSuccess={closeCreate} />
			</Drawer>

			<Drawer
				position="right"
				opened={Boolean(categoryToEdit)}
				onClose={() => setCategoryToEdit(null)}
				title={interpolated((t) => t.category.update.Title, {
					name: categoryToEdit?.name ?? "",
				})}
			>
				{categoryToEdit && (
					<MyCategoryUpdateManager
						category={categoryToEdit}
						onSuccess={() => setCategoryToEdit(null)}
					/>
				)}
			</Drawer>
		</>
	);
};
