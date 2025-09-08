import { DebouncedSearch } from "@common/extended-ui/form/components/search/debounced-search";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { useSearch } from "@core/search/hooks/use-search";
import { useMyTagsListQuery } from "@fts/finances/tags/my-tags/api/use-my-tags-list.query";
import { TagsTable } from "@fts/finances/tags/tags/components/tags.table";
import { useTranslation } from "@i18n/use-translation";
import { ManagerLayout } from "@layouts/manager/manager.layout";
import { ActionsLayout } from "@layouts/shared/actions/actions.layout";
import { TableLayout } from "@layouts/table/table.layout";
import { ActionIcon, Button, Pagination } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { TagModel } from "@shared/models";
import { IoAddOutline, IoReload } from "react-icons/io5";

export const MyTagsManager: FC = () => {
	const { t } = useTranslation("finances");
	const { t: commonT } = useTranslation("common");

	const pagination = usePagination();
	const search = useSearch<TagModel>({});

	const {
		data: tags,
		isLoading: isLoadingTags,
		refetch: refetchTags,
	} = useMyTagsListQuery({
		pagination,
		search,
	});

	const [isCreateOpen, { open: openCreate, close: closeCreate }] =
		useDisclosure();

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
									{t().tag["my-tags"].manager.Title}
								</Button>
								<ActionIcon
									aria-label={commonT().expressions.Reload}
									onClick={() => refetchTags()}
								>
									<IoReload />
								</ActionIcon>
							</ActionsLayout.Row>
						</TableLayout.Actions>
						<TableLayout.Table>
							<TagsTable tags={tags?.items} loading={isLoadingTags} />
						</TableLayout.Table>
						<TableLayout.Pagination>
							<Pagination {...pagination.control} />
						</TableLayout.Pagination>
					</TableLayout.Root>
				</ManagerLayout.Content>
			</ManagerLayout.Root>

			{/* Managers */}
		</>
	);
};
