import {
	SelectSearch,
	type SelectSearchProps,
} from "@common/extended-ui/form/components/search/select-search";
import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import { useSearch } from "@core/search/hooks/use-search";
import { useMyContactsQuery } from "@fts/social/contacts/my-contacts/api/use-my-contacts.query";
import { MyContactCreateManager } from "@fts/social/contacts/my-contacts/components/managers/my-contact-create-manager";
import { useTranslation } from "@i18n/use-translation";
import { ActionIcon, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MY_CONTACTS_CONTROLLER } from "@shared/api-definition";
import type { ContactModel } from "@shared/models";
import { getContactName } from "@shared/utils";
import clsx from "clsx";
import { useCallback, useMemo } from "react";
import { IoAddOutline, IoPersonSharp } from "react-icons/io5";

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
	const [
		createContactOpened,
		{ open: openCreateContact, close: closeCreateContact },
	] = useDisclosure();

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
		<>
			<Group>
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
					className={clsx("flex-grow", props.className)}
				/>
				<ActionIcon
					onClick={openCreateContact}
					aria-label={t().contact.create.Title}
				>
					<IoAddOutline />
				</ActionIcon>
			</Group>

			{/* Contact create */}
			<Modal
				title={t().contact.create.Title}
				opened={createContactOpened}
				onClose={closeCreateContact}
			>
				<MyContactCreateManager
					onSuccess={(contact) => {
						onChange?.(contact.id);
						closeCreateContact();
					}}
				/>
			</Modal>
		</>
	);
};
