import {
	SelectSearch,
	type SelectSearchProps,
} from "@common/extended-ui/form/components/search/select-search";
import { useMyUserPreferencesQuery } from "@common/user/preferences/api/use-my-user-preferences.query";
import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import { useSearch } from "@core/search/hooks/use-search";
import { useMyAccountsQuery } from "@fts/finances/my-accounts/api/use-my-accounts.query";
import { useTranslation } from "@i18n/use-translation";
import { MY_ACCOUNTS_CONTROLLER } from "@shared/api-definition";
import type { AccountModel } from "@shared/models";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LuPiggyBank } from "react-icons/lu";

type Props = {
	onChange?: (accountId: AccountModel["id"] | null) => void;
	value: AccountModel["id"] | null;
	allowClear?: boolean;
	autoFill?: boolean;
} & Omit<
	SelectSearchProps<AccountModel["id"]>,
	"data" | "search" | "value" | "setValue"
>;

export const MyAccountsSelector: FC<Props> = ({
	onChange,
	value,
	autoFill = true,
	...props
}) => {
	const { t } = useTranslation("finances");
	const pagination = usePagination();
	const search = useSearch<AccountModel>({});
	const { request } = useAuthenticatedRequest();

	const [needsInitialAccount, setNeedsInitialAccount] = useState(
		Boolean(value),
	);
	const { data: userPreferences } = useMyUserPreferencesQuery();
	const { data: accounts = { items: [], total: 0 } } = useMyAccountsQuery({
		pagination,
		search,
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
		if (
			accounts.items.length > 0 &&
			!needsInitialAccount &&
			userPreferences &&
			autoFill
		) {
			setNeedsInitialAccount(true);
			if (accounts.items.length === 1) onChange?.(accounts.items[0].id);
			else onChange?.(userPreferences?.preferences?.mainAccount ?? null);
		}
	}, [
		accounts,
		accounts.items,
		onChange,
		needsInitialAccount,
		userPreferences,
		autoFill,
	]);

	// Fetch account details by id. In case it has not been fetched
	const valueFetch = useCallback(
		async (id: AccountModel["id"]) => {
			const selectedAccount = await endpointQuery(
				MY_ACCOUNTS_CONTROLLER,
				"get",
				{ id: id.toString() },
				request,
				{},
			)();

			return {
				value: selectedAccount.id,
				label: selectedAccount.name,
			};
		},
		[request],
	);

	return (
		<SelectSearch<AccountModel["id"]>
			data={options}
			search={search.debouncedSearchManager}
			setValue={(v) => onChange?.(v)}
			value={value}
			valueFetch={valueFetch}
			leftSection={<LuPiggyBank />}
			aria-label={t().account.expressions.Account}
			{...props}
		/>
	);
};
