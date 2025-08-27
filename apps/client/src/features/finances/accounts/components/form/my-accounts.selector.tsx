import {
	SelectSearch,
	type SelectSearchProps,
} from "@common/extended-ui/form/components/search/select-search";
import { useDebouncedSearch } from "@common/extended-ui/form/components/search/use-debounced-search";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { useMyAccountsQuery } from "@fts/finances/accounts/api/use-my-accounts.query";
import type { AccountModel } from "@shared/models";
import { useMemo } from "react";

type Props = {
	onChange?: (accountId: AccountModel["id"] | null) => void;
	value: AccountModel["id"] | null;
	allowClear?: boolean;
} & Omit<
	SelectSearchProps<AccountModel["id"]>,
	"data" | "search" | "value" | "setValue"
>;

export const MyAccountsSelector: FC<Props> = ({
	onChange,
	value,
	...props
}) => {
	const pagination = usePagination();
	const search = useDebouncedSearch();

	const { data: accounts = { items: [], total: 0 } } = useMyAccountsQuery({
		pagination,
		search: { search: search.debouncedValue },
	});

	const options = useMemo(
		() =>
			accounts.items.map((item) => ({
				label: item.name,
				value: item.id,
			})),
		[accounts],
	);

	return (
		<SelectSearch<AccountModel["id"]>
			data={options}
			search={search}
			setValue={(v) => onChange?.(v)}
			value={value}
			{...props}
		/>
	);
};
