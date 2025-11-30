interface ContactInfo {
	address: string;
	email: string[];
	icon: Blob[];
	name: string[];
	tel: string[];
}

interface ContactsManager {
	select(
		properties: (keyof ContactInfo)[],
		options: { multiple: boolean },
	): Promise<ContactInfo[]>;
}

export type DeviceContact = ContactInfo;

const pickDeviceContacts = async (
	manager: ContactsManager,
): Promise<DeviceContact[] | null> => {
	const selected = await manager.select(
		["name", "email", "address", "tel", "icon"],
		{
			multiple: true,
		},
	);
	return selected;
};

// TODO: remove. This is a temporary implementation for development purposes.
const manager: ContactsManager = {
	async select() {
		return [
			{
				address: "123 Main St, Anytown, USA",
				email: [
					"example@example.com",
					"secondary@example.com",
					"secondary@example.com",
				],
				icon: [],
				name: ["John Doe"],
				tel: ["123-456-7890", "098-765-4321"],
			},
		];
	},
};

export const generateDeviceContactPicker = () => {
	const contactsManager =
		"contacts" in navigator ? (navigator.contacts as ContactsManager) : manager; // TODO: replace manager with null when implemented
	if (!contactsManager) return null;

	return {
		async pick() {
			return (await pickDeviceContacts(contactsManager)) ?? [];
		},
	};
};
