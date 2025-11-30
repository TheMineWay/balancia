interface ContactInfo {
	address: string;
	email: string[];
	icon: Blob[];
	name: string[];
	tel: string[];
}

type ManagerSelectOptions = { multiple: boolean };

interface ContactsManager {
	select(
		properties: (keyof ContactInfo)[],
		options: ManagerSelectOptions,
	): Promise<ContactInfo[]>;
}

export type DeviceContact = ContactInfo;

const pickDeviceContacts = async (
	manager: ContactsManager,
	options: ManagerSelectOptions,
): Promise<DeviceContact[] | null> => {
	const selected = await manager.select(
		["name", "email", "address", "tel", "icon"],
		options,
	);
	return selected;
};

type PickOptions = {
	multiple?: boolean;
};

export const generateDeviceContactPicker = () => {
	const contactsManager =
		"contacts" in navigator ? (navigator.contacts as ContactsManager) : null;
	if (!contactsManager) return null;

	return {
		async pick({ multiple = true }: PickOptions = {}) {
			return (await pickDeviceContacts(contactsManager, { multiple })) ?? [];
		},
	};
};
