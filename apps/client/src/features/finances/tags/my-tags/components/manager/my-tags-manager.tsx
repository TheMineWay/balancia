import { DebouncedSearch } from "@common/extended-ui/form/components/search/debounced-search";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { useSearch } from "@core/search/hooks/use-search";
import { useMyTagDeleteMutation } from "@fts/finances/tags/my-tags/api/use-my-tag-delete.mutation";
import { useMyTagsListQuery } from "@fts/finances/tags/my-tags/api/use-my-tags-list.query";
import { MyTagAutoMatchManager } from "@fts/finances/tags/my-tags/components/manager/auto-match/my-tag-auto-match-create-manager";
import { MyTagCreateManager } from "@fts/finances/tags/my-tags/components/manager/my-tag-create-manager";
import { MyTagUpdateManager } from "@fts/finances/tags/my-tags/components/manager/my-tag-update-manager";
import { TagsTable } from "@fts/finances/tags/tags/components/tags.table";
import { useTranslation } from "@i18n/use-translation";
import { ManagerLayout } from "@layouts/manager/manager.layout";
import { ActionsLayout } from "@layouts/shared/actions/actions.layout";
import { TableLayout } from "@layouts/table/table.layout";
import { ActionIcon, Button, Drawer, Pagination, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import type { TagModel } from "@shared/models";
import { useCallback, useState } from "react";
import { IoAddOutline, IoReload, IoTrash } from "react-icons/io5";

export const MyTagsManager: FC = () => {
	const { t, interpolated } = useTranslation("finances");
	const { t: commonT, interpolated: commonInterpolated } =
		useTranslation("common");

	const pagination = usePagination();
	const search = useSearch<TagModel>({});

	const {
		data: tags,
		isLoading: isLoadingTags,
		refetch: refetchTags,
		isFetching: isFetchingTags,
	} = useMyTagsListQuery({
		pagination,
		search,
	});
	const { mutate: deleteTag } = useMyTagDeleteMutation();

	const [tagToEdit, setTagToEdit] = useState<TagModel | null>(null);
	const [isCreateOpen, { open: openCreate, close: closeCreate }] =
		useDisclosure();
	const [tagToAutomatchEdit, setTagToAutomatchEdit] = useState<TagModel | null>(
		null,
	);

	const onDeleteClick = useCallback(
		(item: TagModel) => {
			modals.openConfirmModal({
				title: interpolated((t) => t.tag["delete"].confirm.Title, {
					name: item.name || item.id.toString(),
				}),
				children: <Text>{t().tag["delete"].confirm.Message}</Text>,
				labels: {
					cancel: commonT().templates["confirm-modal"].Cancel,
					confirm: t().tag["delete"].confirm.Action,
				},
				confirmProps: { color: "red", leftSection: <IoTrash /> },
				onConfirm: () => deleteTag(item.id),
			});
		},
		[t, commonT, deleteTag, interpolated],
	);

	return (
		<>
			<ManagerLayout.Root>
				<ManagerLayout.Title>
					{t().tag["my-tags"].manager.Title}
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
									leftSection={<IoAddOutline />}
									onClick={openCreate}
									size="xs"
								>
									{t().tag["my-tags"].manager.actions.Create}
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
						<TableLayout.Table>
							<TagsTable
								tags={tags?.items}
								loading={isLoadingTags}
								onEditClick={setTagToEdit}
								onDeleteClick={onDeleteClick}
								onTriggerManagerClick={setTagToAutomatchEdit}
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
				title={t().tag.create.Title}
			>
				<MyTagCreateManager onSuccess={closeCreate} />
			</Drawer>

			<Drawer
				position="right"
				opened={Boolean(tagToEdit)}
				onClose={() => setTagToEdit(null)}
				title={interpolated((t) => t.tag.update.Title, {
					name: tagToEdit?.name ?? "",
				})}
			>
				{tagToEdit && (
					<MyTagUpdateManager
						tag={tagToEdit}
						onSuccess={() => setTagToEdit(null)}
					/>
				)}
			</Drawer>

			<Drawer
				position="right"
				opened={Boolean(tagToAutomatchEdit)}
				onClose={() => setTagToAutomatchEdit(null)}
				title={commonInterpolated(
					(t) => t.components.automatisms["auto-matcher"]["Entity-title"],
					{ name: tagToAutomatchEdit?.name ?? "" },
				)}
			>
				{tagToAutomatchEdit && (
					<MyTagAutoMatchManager tag={tagToAutomatchEdit} />
				)}
			</Drawer>
		</>
	);
};
