import { DebouncedSearch } from "@common/extended-ui/form/components/search/debounced-search";
import { useSearch } from "@common/extended-ui/form/hooks/use-search";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { TagsAutomatchersTable } from "@fts/finances/tags/automatcher/components/tags-automatchers.table";
import { useMyAutoMatcherDeleteByIdMutation } from "@fts/finances/tags/my-automatcher/api/use-my-auto-matcher-delete-by-id.mutation";
import { useMyTagAutoMatchersListQuery } from "@fts/finances/tags/my-automatcher/api/use-my-tag-auto-matchers-list.query";
import { MyTagAutoMatchCreateManager } from "@fts/finances/tags/my-automatcher/components/my-tag-auto-match-create-manager";
import { MyTagAutoMatchUpdateManager } from "@fts/finances/tags/my-automatcher/components/my-tag-auto-match-update-manager";
import { useTranslation } from "@i18n/use-translation";
import { ManagerLayout } from "@layouts/manager/manager.layout";
import { ActionsLayout } from "@layouts/shared/actions/actions.layout";
import { TableLayout } from "@layouts/table/table.layout";
import { ActionIcon, Button, Drawer, Pagination, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import type {
	AutoAssignMetadataModel,
	TagAutomatcherModel,
	TagModel,
} from "@shared/models";
import { useCallback, useState } from "react";
import { IoAddOutline, IoReload, IoTrash } from "react-icons/io5";

type Props = {
	tag: TagModel;
};

export const MyTagAutoMatchManager: FC<Props> = ({ tag }) => {
	const { t: commonT, interpolated: commonInterpolated } =
		useTranslation("common");
	const [isCreateOpen, { open: openCreate, close: closeCreate }] =
		useDisclosure();

	const search = useSearch<AutoAssignMetadataModel>({});
	const pagination = usePagination();

	const [autoMatcherToEdit, setTagToAutomatchEdit] =
		useState<TagAutomatcherModel | null>(null);

	const {
		data: tagAutoMatchers,
		isFetching: isFetchingTags,
		refetch: refetchTags,
	} = useMyTagAutoMatchersListQuery({ tagId: tag.id, search, pagination });
	const { mutate: deleteAutomatcher } = useMyAutoMatcherDeleteByIdMutation();

	const onDeleteClick = useCallback(
		(automatcher: TagAutomatcherModel) => {
			modals.openConfirmModal({
				title: commonInterpolated(
					(t) => t.components.automatisms["auto-matcher"].managers.delete.Title,
					{ name: automatcher.name },
				),
				children: (
					<Text>
						{
							commonT().components.automatisms["auto-matcher"].managers.delete
								.Description
						}
					</Text>
				),
				labels: {
					cancel: commonT().templates["confirm-modal"].Cancel,
					confirm:
						commonT().components.automatisms["auto-matcher"].managers.delete
							.Confirm,
				},
				confirmProps: { color: "red", leftSection: <IoTrash /> },
				onConfirm: () => deleteAutomatcher(automatcher.id),
			});
		},
		[commonT, commonInterpolated, deleteAutomatcher],
	);

	return (
		<>
			<ManagerLayout.Root>
				<ManagerLayout.Content>
					{/* Table */}
					<TableLayout.Root>
						<TableLayout.Actions>
							{/* Search */}
							<ActionsLayout.Row>
								<DebouncedSearch
									size="xs"
									manager={search.debouncedSearchManager}
									placeholder={commonT().expressions.Search}
								/>
							</ActionsLayout.Row>

							{/* Table actions */}
							<ActionsLayout.Row>
								<Button
									size="xs"
									leftSection={<IoAddOutline />}
									onClick={openCreate}
								>
									{
										commonT().components.automatisms["auto-matcher"].actions
											.Create
									}
								</Button>
								<ActionIcon
									aria-label={commonT().expressions.Reload}
									onClick={() => refetchTags()}
									loading={isFetchingTags}
								>
									<IoReload />
								</ActionIcon>
							</ActionsLayout.Row>
						</TableLayout.Actions>
						{/* Table */}
						<TableLayout.Table>
							<TagsAutomatchersTable
								automatchers={tagAutoMatchers?.items}
								onDeleteClick={onDeleteClick}
								onEditClick={setTagToAutomatchEdit}
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
				title={commonT().components.automatisms["auto-matcher"].Title}
				position="right"
				opened={isCreateOpen}
				onClose={closeCreate}
			>
				<MyTagAutoMatchCreateManager tag={tag} onSuccess={closeCreate} />
			</Drawer>

			<Drawer
				position="right"
				opened={Boolean(autoMatcherToEdit)}
				title={commonInterpolated(
					(t) => t.components.automatisms["auto-matcher"].managers.edit.Title,
					{ name: autoMatcherToEdit?.name ?? "" },
				)}
				onClose={() => setTagToAutomatchEdit(null)}
			>
				{autoMatcherToEdit && (
					<MyTagAutoMatchUpdateManager
						tag={tag}
						autoMatcher={autoMatcherToEdit}
						onSuccess={() => setTagToAutomatchEdit(null)}
					/>
				)}
			</Drawer>
		</>
	);
};
