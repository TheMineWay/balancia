import { useDateFormat } from "@common/extended-ui/date/hooks/use-date-format";
import {
	SelectSearch,
	type SelectSearchProps,
} from "@common/extended-ui/form/components/search/select-search";
import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import { useSearch } from "@core/search/hooks/use-search";
import { useMyTransactionsQuery } from "@fts/finances/transactions/my-transactions/api/use-my-transactions.query";
import { useTranslation } from "@i18n/use-translation";
import { MY_TRANSACTION_CONTROLLER } from "@shared/api-definition";
import type { TransactionModel } from "@shared/models";
import { useCallback, useMemo } from "react";
import { BiTransfer } from "react-icons/bi";

type Props = {
	onChange?: (transactionId: TransactionModel["id"] | null) => void;
	value?: TransactionModel["id"] | null;
	allowClear?: boolean;
} & Omit<
	SelectSearchProps<TransactionModel["id"]>,
	"data" | "search" | "value" | "setValue"
>;

export const MyTransactionsSelector: FC<Props> = ({
	onChange,
	value = null,
	...props
}) => {
	const { t } = useTranslation("finances");
	const { formatDateTime } = useDateFormat();

	const pagination = usePagination();
	const search = useSearch<TransactionModel>({});
	const { request } = useAuthenticatedRequest();

	const { data: transactions = { items: [], total: 0 } } =
		useMyTransactionsQuery({
			pagination,
			search,
		});

	const options = useMemo(
		() =>
			transactions.items.map((item) => ({
				label: `${item.subject} | ${item.amount}€ | ${formatDateTime(item.performedAt, "short")}`,
				value: item.id,
			})),
		[transactions, formatDateTime],
	);

	// Fetch transaction details by id. In case it has not been fetched
	const valueFetch = useCallback(
		async (id: TransactionModel["id"]) => {
			const response = await endpointQuery(
				MY_TRANSACTION_CONTROLLER,
				"getTransactionsList",
				{},
				request,
				{
					query: {
						page: 1,
						limit: 1,
					},
				},
			)();

			const selectedTransaction = response.items.find((item) => item.id === id);

			if (!selectedTransaction) {
				return {
					value: id,
					label: `Transaction #${id}`,
				};
			}

			return {
				value: selectedTransaction.id,
				label: `${selectedTransaction.subject} - ${selectedTransaction.amount}€`,
			};
		},
		[request],
	);

	return (
		<SelectSearch<TransactionModel["id"]>
			data={options}
			search={search.debouncedSearchManager}
			setValue={(v) => onChange?.(v)}
			value={value}
			valueFetch={valueFetch}
			leftSection={<BiTransfer />}
			aria-label={t().transaction.models.transaction.subject.Label}
			{...props}
		/>
	);
};
