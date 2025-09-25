import { usePagination } from "@core/pagination/hooks/use-pagination";
import { useSearch } from "@core/search/hooks/use-search";
import { useMyTagAutoMatchersListQuery } from "@fts/finances/tags/my-tags/api/auto-match/use-my-tag-auto-matchers-list.query";
import { MyTagAutoMatchCreateManager } from "@fts/finances/tags/my-tags/components/manager/auto-match/my-tag-auto-match-create-manager";
import { useTranslation } from "@i18n/use-translation";
import { ManagerLayout } from "@layouts/manager/manager.layout";
import { ActionsLayout } from "@layouts/shared/actions/actions.layout";
import { TableLayout } from "@layouts/table/table.layout";
import { ActionIcon, Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { AutoAssignMetadataModel, TagModel } from "@shared/models";
import { IoAddOutline, IoReload } from "react-icons/io5";

type Props = {
	tag: TagModel;
};

export const MyTagAutoMatchManager: FC<Props> = ({ tag }) => {
	const { t: commonT } = useTranslation("common");
	const [isCreateOpen, { open: openCreate, close: closeCreate }] =
		useDisclosure();

	const search = useSearch<AutoAssignMetadataModel>({});
	const pagination = usePagination();

	const { isFetching: isFetchingTags, refetch: refetchTags } =
		useMyTagAutoMatchersListQuery({ tagId: tag.id, search, pagination });

	return (
		<>
			<ManagerLayout.Root>
				<ManagerLayout.Content>
					{/* Table */}
					<TableLayout.Root>
						<TableLayout.Actions>
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
		</>
	);
};
