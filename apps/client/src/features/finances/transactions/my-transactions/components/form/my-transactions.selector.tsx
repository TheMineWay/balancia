import { useDateFormat } from "@common/extended-ui/date/hooks/use-date-format";
import {
	SelectSearch,
	type SelectSearchProps,
} from "@common/extended-ui/form/components/search/select-search";
import { useSearch } from "@common/extended-ui/form/hooks/use-search";
import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import { useMyTransactionsQuery } from "@fts/finances/transactions/my-transactions/api/use-my-transactions.query";
import { useTranslation } from "@i18n/use-translation";
import { MY_TRANSACTION_CONTROLLER } from "@shared/api-definition";
import type { TransactionModel } from "@shared/models";
import { useCallback, useMemo } from "react";
import { BiTransfer } from "react-icons/bi";

type Option = {
	label: string;
	value: TransactionModel;
	disabled?: boolean;
};

type Props = {
	onChange?: (transaction: TransactionModel | null) => void;
	value?: TransactionModel["id"] | null;
	allowClear?: boolean;
	mapOption?: (option: Option) => Option;
} & Omit<
	SelectSearchProps<TransactionModel["id"], TransactionModel>,
	"data" | "search" | "value" | "setValue" | "getKey"
>;

export const MyTransactionsSelector: FC<Props> = ({
	onChange,
	value = null,
	mapOption,
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

	const options: Option[] = useMemo(() => {
		const options = transactions.items.map((item) => ({
			label: `${item.subject} | ${item.amount}€ | ${formatDateTime(item.performedAt, "short")}`,
			value: item,
		}));

		if (mapOption) {
			return options.map(mapOption);
		}

		return options;
	}, [transactions, formatDateTime, mapOption]);

	// Fetch transaction details by id. In case it has not been fetched
	const valueFetch = useCallback(
		async (id: TransactionModel["id"]) => {
			const response = await endpointQuery(
				MY_TRANSACTION_CONTROLLER,
				"getById",
				{
					id: id.toString(),
				},
				request,
				{},
			)();
			if (!response) return null;

			return {
				value: response,
				label: `${response.subject} - ${response.amount}€`,
			};
		},
		[request],
	);

	return (
		<SelectSearch<TransactionModel["id"], TransactionModel>
			data={options}
			getKey={(v) => v.id ?? v.performedAt}
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
