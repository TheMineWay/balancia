import { usePagination } from "@core/pagination/hooks/use-pagination";
import { useMyTransactionsQuery } from "@fts/finances/my-transactions/api/use-my-transactions.query";
import { TransactionsTable } from "@fts/finances/transactions/components/transactions-table";
import { useTranslation } from "@i18n/use-translation";
import { ManagerLayout } from "@layouts/manager/manager.layout";
import { TableLayout } from "@layouts/table/table.layout";
import { Pagination } from "@mantine/core";

export const MyTransactionsManager: FC = () => {
	const { t } = useTranslation('transaction');
	const pagination = usePagination();
	const { data: transactions, isLoading: isLoadingTransactions } = useMyTransactionsQuery({ pagination });

	return (
		<ManagerLayout.Root>
			<ManagerLayout.Title>{t()["my-transactions"].manager.Title}</ManagerLayout.Title>
			<ManagerLayout.Content>
				{/* Table */}
				<TableLayout.Root>
					<TableLayout.Table>
						<TransactionsTable data={transactions?.items} loading={isLoadingTransactions} />
					</TableLayout.Table>
					<TableLayout.Pagination>
						<Pagination {...pagination.control}/>
					</TableLayout.Pagination>
				</TableLayout.Root>
			</ManagerLayout.Content>
		</ManagerLayout.Root>
	);
};
