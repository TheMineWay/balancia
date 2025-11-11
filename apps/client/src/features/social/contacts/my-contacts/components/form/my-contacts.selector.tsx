import {
	SelectSearch,
	type SelectSearchProps,
} from "@common/extended-ui/form/components/search/select-search";
import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import { useSearch } from "@core/search/hooks/use-search";
import { useMyContactsQuery } from "@fts/social/contacts/my-contacts/api/use-my-contacts.query";
import { useTranslation } from "@i18n/use-translation";
import { MY_CONTACTS_CONTROLLER } from "@shared/api-definition";
import type { ContactModel } from "@shared/models";
import { getContactName } from "@shared/utils";
import { useCallback, useMemo } from "react";
import { IoPersonSharp } from "react-icons/io5";

type Props = {
	onChange?: (contactId: ContactModel["id"] | null) => void;
	value: ContactModel["id"] | null;
	allowClear?: boolean;
} & Omit<
	SelectSearchProps<ContactModel["id"]>,
	"data" | "search" | "value" | "setValue" | "valueFetch" | "getKey"
>;

export const MyContactsSelector: FC<Props> = ({
	onChange,
	value,
	...props
}) => {
	const { t } = useTranslation("social");
	const { request } = useAuthenticatedRequest();
	const pagination = usePagination();
	const search = useSearch<ContactModel>({});

	const { data: contacts = { items: [], total: 0 } } = useMyContactsQuery({
		pagination,
		search,
	});

	const options = useMemo(
		() =>
			contacts.items.map((item) => ({
				label: getContactName(item),
				value: item.id,
			})),
		[contacts],
	);

	// Fetch account details by id. In case it has not been fetched
	const valueFetch = useCallback(
		async (id: ContactModel["id"]) => {
			const selectedContact = await endpointQuery(
				MY_CONTACTS_CONTROLLER,
				"getById",
				{ id: id.toString() },
				request,
				{},
			)();

			return {
				value: selectedContact.id,
				label: selectedContact.name,
			};
		},
		[request],
	);

	return (
		<SelectSearch<ContactModel["id"]>
			data={options}
			getKey={(v) => v}
			search={search.debouncedSearchManager}
			setValue={(v) => onChange?.(v)}
			value={value}
			valueFetch={valueFetch}
			leftSection={<IoPersonSharp />}
			aria-label={t().contact.models.contact.fullName.Label}
			{...props}
		/>
	);
};
