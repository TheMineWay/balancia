import { DebouncedSearch } from "@common/extended-ui/form/components/search/debounced-search";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { type UseSearch, useSearch } from "@core/search/hooks/use-search";
import { DebtsTable } from "@fts/finances/debts/debts/components/debts-table";
import { useTranslation } from "@i18n/use-translation";
import { ManagerLayout } from "@layouts/manager/manager.layout";
import { ActionsLayout } from "@layouts/shared/actions/actions.layout";
import { TableLayout } from "@layouts/table/table.layout";
import { ActionIcon, Pagination } from "@mantine/core";
import type { DebtModel } from "@shared/models";
import { IoReload } from "react-icons/io5";

export const MyDebtsManager: FC = () => {
	const { t } = useTranslation("finances");
	const { t: commonT } = useTranslation("common");

	const pagination = usePagination();
	const search = useSearch<DebtModel>({});

	// TODO: Implement query to fetch debts
	const isFetchingDebts = false;
	const refetchDebts = () => {};

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
							<DebtsTable data={[]} />
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
