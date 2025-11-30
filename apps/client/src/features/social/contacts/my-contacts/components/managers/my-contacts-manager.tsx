import { DebouncedSearch } from "@common/extended-ui/form/components/search/debounced-search";
import { DangerousActionConfirm } from "@common/verifications/dangerous-action/components/dangerous-action-confirm";
import { usePagination } from "@core/pagination/hooks/use-pagination";
import { useSearch } from "@core/search/hooks/use-search";
import { ContactsTable } from "@fts/social/contacts/contacts/components/contacts.table";
import { DeviceContactsSelector } from "@fts/social/contacts/contacts/components/device/device-contacts-selector";
import { useMyContactDeleteByIdMutation } from "@fts/social/contacts/my-contacts/api/use-my-contact-delete-by-id.mutation";
import { useMyContactsBulkCreateMutation } from "@fts/social/contacts/my-contacts/api/use-my-contacts-bulk-create.mutation";
import { useMyContactsQuery } from "@fts/social/contacts/my-contacts/api/use-my-contacts.query";
import { MyContactCreateManager } from "@fts/social/contacts/my-contacts/components/managers/my-contact-create-manager";
import { MyContactUpdateManager } from "@fts/social/contacts/my-contacts/components/managers/my-contact-update-manager";
import { useTranslation } from "@i18n/use-translation";
import { ManagerLayout } from "@layouts/manager/manager.layout";
import { ActionsLayout } from "@layouts/shared/actions/actions.layout";
import { TableLayout } from "@layouts/table/table.layout";
import { ActionIcon, Button, Drawer, Pagination } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import type { ContactCreateModel, ContactModel } from "@shared/models";
import { getContactName } from "@shared/utils";
import { useCallback, useState } from "react";
import { IoAddOutline, IoReload } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

export const MyContactsManager: FC = () => {
	const { t, interpolated } = useTranslation("social");
	const { t: commonT } = useTranslation("common");

	// #region List fetch & management
	const search = useSearch({});
	const pagination = usePagination();
	const {
		data: contacts,
		isLoading: isLoadingContacts,
		refetch: refetchContacts,
		isFetching: isFetchingContacts,
	} = useMyContactsQuery({ pagination, search });
	const { mutate: deleteContact } = useMyContactDeleteByIdMutation();

	const [isCreateOpen, { open: openCreate, close: closeCreate }] =
		useDisclosure();
	const [contactToUpdate, setContactToUpdate] = useState<ContactModel | null>(
		null,
	);
	const [contactToDelete, setContactToDelete] = useState<ContactModel | null>(
		null,
	);

	// #endregion

	// #region Import from device
	const { mutate: bulkCreateContacts, isPending: isCreatingContacts } =
		useMyContactsBulkCreateMutation();

	const onSelectDeviceContacts = useCallback(
		(contacts: ContactCreateModel[]) => {
			const notification = notifications.show({
				message: t().contact.import.status.ongoing.Title,
				loading: true,
				autoClose: false,
				withCloseButton: false,
			});
			bulkCreateContacts(contacts, {
				onSuccess: () => {
					notifications.update({
						id: notification,
						message: t().contact.import.status.completed.Title,
						autoClose: 2000,
						loading: false,
					});
				},
				onError: () => {
					notifications.update({
						id: notification,
						title: t().contact.import.status.failed.Title,
						message: t().contact.import.status.failed.Message,
						color: "red",
						autoClose: 4000,
						loading: false,
					});
				},
			});
		},
		[bulkCreateContacts, t],
	);

	// #endregion

	return (
		<>
			<ManagerLayout.Root>
				<ManagerLayout.Title>
					{t().contact["my-contacts"].manager.Title}
				</ManagerLayout.Title>
				<ManagerLayout.Content>
					{/* TABLE */}
					<TableLayout.Root>
						<TableLayout.Actions>
							<ActionsLayout.Row>
								<DebouncedSearch
									manager={search.debouncedSearchManager}
									size="xs"
									placeholder={commonT().expressions.Search}
								/>
							</ActionsLayout.Row>
							<ActionsLayout.Row>
								<DeviceContactsSelector
									onSelect={onSelectDeviceContacts}
									buttonProps={{ loading: isCreatingContacts }}
								/>
								<Button
									size="xs"
									onClick={openCreate}
									leftSection={<IoAddOutline />}
								>
									{t().contact["my-contacts"].manager.Actions.Create}
								</Button>
								<ActionIcon
									loading={isFetchingContacts}
									onClick={() => refetchContacts()}
									aria-label={commonT().expressions.Reload}
								>
									<IoReload />
								</ActionIcon>
							</ActionsLayout.Row>
						</TableLayout.Actions>
						<TableLayout.Table>
							<ContactsTable
								data={contacts?.items}
								loading={isLoadingContacts}
								onEditClick={setContactToUpdate}
								onDeleteClick={setContactToDelete}
							/>
						</TableLayout.Table>
						<TableLayout.Pagination>
							<Pagination {...pagination.control} />
						</TableLayout.Pagination>
					</TableLayout.Root>
				</ManagerLayout.Content>
			</ManagerLayout.Root>

			{/* Modals & Drawers */}
			<Drawer
				position="right"
				opened={isCreateOpen}
				onClose={closeCreate}
				title={t().contact.create.Title}
			>
				<MyContactCreateManager onSuccess={closeCreate} />
			</Drawer>

			<Drawer
				position="right"
				opened={Boolean(contactToUpdate)}
				onClose={() => setContactToUpdate(null)}
				title={interpolated((t) => t.contact.update.Title, {
					name: contactToUpdate ? getContactName(contactToUpdate) : "",
				})}
			>
				{contactToUpdate && (
					<MyContactUpdateManager
						onSuccess={() => setContactToUpdate(null)}
						contact={contactToUpdate}
					/>
				)}
			</Drawer>

			<DangerousActionConfirm
				open={Boolean(contactToDelete)}
				onClose={() => setContactToDelete(null)}
				texts={{
					title: interpolated((t) => t.contact.delete.confirm.Title, {
						name: contactToDelete ? getContactName(contactToDelete) : "",
					}),
					description: t().contact.delete.confirm.Message,
					confirm: t().contact.delete.confirm.Action,
				}}
				writeToDelete={{
					label: t().contact.delete.confirm["Write-to-delete"],
					confirmValue: contactToDelete
						? getContactName(contactToDelete)
						: null,
				}}
				confirmIcon={<MdDeleteOutline />}
				onConfirm={() => {
					if (contactToDelete) deleteContact(contactToDelete.id);
					setContactToDelete(null);
				}}
			/>
		</>
	);
};
