import {
	SelectSearch,
	type SelectSearchProps,
} from "@common/extended-ui/form/components/search/select-search";
import { useDebouncedSearch } from "@common/extended-ui/form/components/search/use-debounced-search";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { useMyAccountsQuery } from "@fts/finances/accounts/api/use-my-accounts.query";
import type { AccountModel } from "@shared/models";
import { useEffect, useMemo, useState } from "react";

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

	const [hasSetInitialAccount, setHasSetInitialAccount] = useState(false);
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

	useEffect(() => {
		if (accounts.items.length > 0 && !hasSetInitialAccount) {
			setHasSetInitialAccount(true);
			onChange?.(autoPick(accounts.items)?.id ?? null);
		}
	}, [accounts, accounts.items, onChange, hasSetInitialAccount]);

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

/* Internal */

const autoPick = (accounts: AccountModel[]): AccountModel | null => {
	if (accounts.length === 1) {
		return accounts[0];
	}
	return null;
};
