import type { DeviceContact } from "@fts/social/contacts/contacts/lib/device-contact-picker";
import { useTranslation } from "@i18n/use-translation";
import {
	Button,
	Card,
	Input,
	InputWrapper,
	Select,
	Stack,
} from "@mantine/core";
import type { ContactCreateModel } from "@shared/models";
import { uniq } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { IoBuild } from "react-icons/io5";

type Item = {
	device: DeviceContact;
	contact: ContactCreateModel;
};

type DeviceContactsRefinerProps = {
	contacts: DeviceContact[];
	onSuccess?: (refinedContacts: ContactCreateModel[]) => void;
};

export const DeviceContactsRefiner: FC<DeviceContactsRefinerProps> = ({
	contacts: _initialContacts,
	onSuccess,
}) => {
	const { t } = useTranslation("common");

	// Transform DeviceContact to Item structure
	const initialContacts = useMemo<Item[]>(() => {
		return _initialContacts.map((deviceContact) => {
			const [name, ...lastName] = (deviceContact.name?.[0] || "").split(" ");
			if (!name) throw new Error("Device contact name is missing");

			const contactCreateModel: ContactCreateModel = {
				name,
				lastName: lastName.join(" ") || null,
				email: deviceContact.email?.[0] || null,
				phone: deviceContact.tel?.[0] || null,
			};

			return {
				device: deviceContact,
				contact: contactCreateModel,
			};
		});
	}, [_initialContacts]);
	const [contacts, setContacts] = useState<Item[]>(initialContacts);

	const setItem = useCallback((index: number, newItem: Item) => {
		setContacts((prev) => {
			const updated = [...prev];
			updated[index] = newItem;
			return updated;
		});
	}, []);

	return (
		<Stack gap="md">
			{/* Render refined device contacts here */}
			{contacts.map((item, index) => (
				<Card key={item.contact.email || item.contact.phone || index}>
					<DeviceContactItemRefiner
						item={item}
						setItem={(newItem) => setItem(index, newItem)}
					/>
				</Card>
			))}
			<Button
				leftSection={<IoBuild />}
				onClick={() => onSuccess?.(contacts.map((item) => item.contact))}
			>
				{t().expressions.Refine}
			</Button>
		</Stack>
	);
};

type DeviceContactItemRefinerProps = {
	item: Item;
	setItem: (item: Item) => void;
};

export const DeviceContactItemRefiner: FC<DeviceContactItemRefinerProps> = ({
	item: { device, contact },
	setItem,
}) => {
	const { t } = useTranslation("social");

	// Extract unique names, emails, and phones
	const { emails, phones } = useMemo(() => {
		const { email, tel } = device;
		return {
			emails: uniq(email || []),
			phones: uniq(tel || []),
		};
	}, [device]);

	const onChange = useCallback(
		(field: keyof ContactCreateModel, value: string) => {
			setItem({
				device,
				contact: {
					...contact,
					[field]: value || null,
				},
			});
		},
		[device, contact, setItem],
	);

	return (
		<Stack gap="xs">
			{/* Name selection */}
			<InputWrapper label={t().contact.models.contact.name.Label}>
				<Input
					value={contact.name}
					onChange={(event) =>
						onChange("name", event.currentTarget.value ?? "")
					}
				/>
			</InputWrapper>
			{/* Last name selection */}
			<InputWrapper label={t().contact.models.contact.lastName.Label}>
				<Input
					value={contact.lastName || ""}
					onChange={(event) =>
						onChange("lastName", event.currentTarget.value ?? "")
					}
				/>
			</InputWrapper>
			{/* Email selection */}
			<InputWrapper label={t().contact.models.contact.email.Label}>
				<Select
					value={contact.email || ""}
					data={emails}
					onChange={(value) => {
						if (!value) return;
						onChange("email", value ?? "");
					}}
				/>
			</InputWrapper>
			{/* Phone selection */}
			<InputWrapper label={t().contact.models.contact.phone.Label}>
				<Select
					value={contact.phone || ""}
					data={phones}
					onChange={(value) => {
						if (!value) return;
						onChange("phone", value ?? "");
					}}
				/>
			</InputWrapper>
		</Stack>
	);
};
